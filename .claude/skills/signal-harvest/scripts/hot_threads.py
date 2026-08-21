#!/usr/bin/env python3
"""Hot-thread radar — rank *recent* demand threads by engagement x recency and
emit a SEARCHABLE / SPARSE verdict for the active theme's buyer.

Answers two questions the all-time harvest cannot:
  1. "What are the hottest, most-active *recent* threads that carry a signal?"
     -> a recency-weighted ranking (a 300-upvote thread from 2019 should not
        outrank a 40-upvote thread from last month).
  2. "Is this a searchable (consumer/prosumer) buyer, or a private B2B one?"
     -> SEARCHABLE gates whether the scout should run the `desk-sizing` skill;
        SPARSE means search/community silence is uninformative, so prefer a
        direct-outreach kill test instead.

Keyless, stdlib only, fail-graceful (ALWAYS exits 0; prints DATA UNAVAILABLE or
per-collector `skipped` notes so the skill degrades to WebSearch). Reuses the
theme resolver + helpers from harvest_signals.py — never an interpolated arg.
"""
from __future__ import annotations

import argparse
import json
import os
import sys
import time
import urllib.parse

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from harvest_signals import (  # noqa: E402  (path set above)
    active_theme, http_get_json, load_tells, tag_tells,
)

# --- tunables (days) ---
POOL_DAYS = 540        # candidate window (~18 months)
RECENT_DAYS = 365      # "recent" for the searchability verdict
HALFLIFE_DAYS = 180    # engagement half-life for the recency weight
ENGAGEMENT_FLOOR = 5   # min (upvotes+comments) for a thread to count as real
SEARCHABLE_MIN_THREADS = 5   # recent+signal threads needed to call it searchable
SEARCHABLE_MIN_PLATFORMS = 2  # ... across at least this many independent platforms


def _rec(source, url, ts, text, engagement, tells):
    try:
        eng = int(engagement)
    except (TypeError, ValueError):
        eng = 0
    try:
        ts = int(ts)
    except (TypeError, ValueError):
        ts = 0
    age_days = max(0.0, (time.time() - ts) / 86400.0) if ts else None
    weight = 0.5 ** (age_days / HALFLIFE_DAYS) if age_days is not None else 0.0
    return {
        "source": source, "url": url or "", "ts": ts,
        "date": time.strftime("%Y-%m-%d", time.gmtime(ts)) if ts else "",
        "age_days": round(age_days) if age_days is not None else None,
        "text": (text or "").strip(), "engagement": eng,
        "tells": tag_tells(text, tells),
        "hot_score": round(eng * weight, 1),
    }


def _cutoff_ts():
    return int(time.time() - POOL_DAYS * 86400)


def collect_hn(theme, tells, fetch=http_get_json):
    q = urllib.parse.quote_plus(theme)
    url = ("https://hn.algolia.com/api/v1/search_by_date?"
           f"query={q}&tags=story&numericFilters=created_at_i>{_cutoff_ts()}&hitsPerPage=50")
    out = []
    for h in (fetch(url) or {}).get("hits", []):
        text = h.get("title") or h.get("story_text") or ""
        eng = (h.get("points") or 0) + (h.get("num_comments") or 0)
        hn_url = f"https://news.ycombinator.com/item?id={h.get('objectID', '')}"
        out.append(_rec("hackernews", hn_url, h.get("created_at_i"), text, eng, tells))
    return out, ""


def collect_reddit(theme, tells, fetch=http_get_json):
    """Reddit's public search.json is keyless (UA required; may 429/403 — caught).
    VF_RADAR_SUBS (comma-separated) narrows to named subs; else a global search."""
    q = urllib.parse.quote_plus(theme)
    subs = [s.strip() for s in (os.environ.get("VF_RADAR_SUBS") or "").split(",") if s.strip()]
    urls = []
    if subs:
        for s in subs[:8]:
            urls.append(f"https://www.reddit.com/r/{urllib.parse.quote(s)}/search.json"
                        f"?q={q}&restrict_sr=1&sort=top&t=year&limit=25")
    else:
        urls.append(f"https://www.reddit.com/search.json?q={q}&sort=top&t=year&limit=50")
    out = []
    for url in urls:
        data = fetch(url)
        for c in (data or {}).get("data", {}).get("children", []):
            d = c.get("data", {})
            text = f"{d.get('title', '')} {d.get('selftext', '')[:200]}"
            eng = (d.get("score") or 0) + (d.get("num_comments") or 0)
            permalink = d.get("permalink") or ""
            out.append(_rec(f"reddit/r/{d.get('subreddit', '?')}",
                            "https://www.reddit.com" + permalink,
                            d.get("created_utc"), text, eng, tells))
    return out, ""


def collect_stackexchange(theme, tells, fetch=http_get_json):
    q = urllib.parse.quote_plus(theme)
    key = os.environ.get("STACKEX_KEY")
    key_param = f"&key={urllib.parse.quote_plus(key)}" if key else ""
    url = ("https://api.stackexchange.com/2.3/search/advanced?order=desc&sort=creation"
           f"&fromdate={_cutoff_ts()}&q={q}&site=stackoverflow&pagesize=50{key_param}")
    out = []
    for it in (fetch(url) or {}).get("items", []):
        eng = (it.get("score") or 0) + (it.get("answer_count") or 0)
        out.append(_rec("stackexchange", it.get("link"), it.get("creation_date"),
                        it.get("title"), eng, tells))
    return out, ""


COLLECTORS = [("hackernews", collect_hn), ("reddit", collect_reddit),
              ("stackexchange", collect_stackexchange)]


def run(theme, tells, collectors=None):
    collectors = collectors or COLLECTORS
    recs, notes = [], []
    for name, fn in collectors:
        try:
            r, note = fn(theme, tells)
            recs.extend(r)
            if note:
                notes.append(f"{name}: {note}")
        except Exception as e:  # noqa: BLE001 — fail-graceful per collector
            notes.append(f"{name}: skipped ({type(e).__name__})")
    # dedupe by url/text
    seen, out = set(), []
    for r in sorted(recs, key=lambda r: r["hot_score"], reverse=True):
        k = r["url"] or r["text"]
        if k in seen:
            continue
        seen.add(k)
        out.append(r)
    return out, notes


def verdict(records, notes=None):
    """SEARCHABLE iff >= N recent threads clear the engagement floor, spread
    across >= M independent platforms. A recent+engaged thread counts as live
    discussion; a pain-tell is tracked separately (titles rarely carry it — the
    pain lives in the comments). If a major collector was skipped the verdict is
    marked DEGRADED so a SPARSE is not over-trusted (Reddit silence != absence)."""
    hot = [r for r in records
           if r["age_days"] is not None and r["age_days"] <= RECENT_DAYS
           and r["engagement"] >= ENGAGEMENT_FLOOR]
    with_tell = [r for r in hot if r["tells"]]
    platforms = {r["source"].split("/")[0] for r in hot}
    is_searchable = (len(hot) >= SEARCHABLE_MIN_THREADS
                     and len(platforms) >= SEARCHABLE_MIN_PLATFORMS)
    skipped = [n.split(":")[0] for n in (notes or []) if "skipped" in n]
    degraded = bool(skipped)
    if is_searchable:
        rec = "run desk-sizing (searchable buyer - search + community demand is measurable)"
    elif degraded:
        rec = (f"HOLD the classification - collectors {skipped} were unreachable; a SPARSE here "
               "may be a blocked collector, not real absence. Manually check the skipped "
               "platform(s) before deciding desk-sizing vs outreach.")
    else:
        rec = ("skip desk-sizing; use a direct-outreach kill test (named buyers, paid-LOI "
               "threshold) - search/community silence is uninformative for a private/B2B buyer")
    return {
        "verdict": ("SEARCHABLE" if is_searchable else "SPARSE") + (" (DEGRADED)" if degraded and not is_searchable else ""),
        "recent_signal_threads": len(hot),
        "recent_threads_with_tell": len(with_tell),
        "platforms": sorted(platforms),
        "skipped_collectors": skipped,
        "recommends": rec,
    }


def format_digest(theme, records, notes, v, top=12):
    lines = [f"# Hot-thread radar - theme: {theme}",
             f"**Buyer verdict: {v['verdict']}** - {v['recent_signal_threads']} recent engaged "
             f"thread(s) ({v['recent_threads_with_tell']} with an explicit pain-tell) across "
             f"{len(v['platforms'])} platform(s) ({', '.join(v['platforms']) or 'none'}).",
             f"-> {v['recommends']}", "",
             f"## Hottest recent threads (engagement x recency, top {top})"]
    ranked = [r for r in records if r["tells"]][:top] or records[:top]
    if not ranked:
        lines.append("- (none surfaced by keyless collectors — fall back to WebSearch)")
    for r in ranked:
        tells = ",".join(r["tells"]) or "untagged"
        lines.append(f"- [hot {r['hot_score']} | eng {r['engagement']} | {r['date'] or 'n/d'} "
                     f"| {tells}] {r['source']} — {r['text'][:130]} {r['url']}")
    if notes:
        lines += ["", "## collector notes"] + [f"- {n}" for n in notes]
    lines += ["", "_Thresholds: recent<=%dd, engagement>=%d, searchable>=%d threads/%d platforms. "
              "Tune in hot_threads.py._" % (RECENT_DAYS, ENGAGEMENT_FLOOR,
                                            SEARCHABLE_MIN_THREADS, SEARCHABLE_MIN_PLATFORMS)]
    return "\n".join(lines)


def main(argv=None):
    ap = argparse.ArgumentParser(description="Hot-thread radar (keyless, recency-ranked).")
    ap.add_argument("--json", action="store_true", help="machine-readable JSON")
    args = ap.parse_args(argv)
    try:  # keep captured output clean regardless of console codepage (Windows cp1252)
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass
    theme = active_theme()
    if not theme:
        print("DATA UNAVAILABLE: no theme (set VF_ACTIVE_VENTURE or VF_HARVEST_SEED).")
        return 0
    tells = load_tells()
    records, notes = run(theme, tells)
    v = verdict(records, notes)
    if args.json:
        print(json.dumps({"theme": theme, "verdict": v,
                          "records": records[:30], "notes": notes}, ensure_ascii=False))
        return 0
    print(format_digest(theme, records, notes, v))
    return 0


if __name__ == "__main__":
    sys.exit(main())
