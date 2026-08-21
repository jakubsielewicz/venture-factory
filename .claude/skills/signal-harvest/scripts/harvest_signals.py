#!/usr/bin/env python3
"""Harvest demand signals for the active venture's theme from keyless public APIs.

Fail-graceful: ALWAYS exits 0. Prints a `DATA UNAVAILABLE` marker (no theme) or
per-collector `skipped` notes (a collector erred) so the skill degrades to
WebSearch. Reads the theme from the venture manifest/brief — never an
interpolated argument — to avoid shell injection. Stdlib only.
"""
from __future__ import annotations

import argparse
import gzip
import json
import os
import pathlib
import sys
import urllib.parse
import urllib.request

UA = "venture-factory-signal-harvest/1.0"
TELLS_PATH = pathlib.Path(__file__).resolve().parent.parent / "references" / "tells.json"


def project_root() -> pathlib.Path:
    r = os.environ.get("CLAUDE_PROJECT_DIR")
    if r:
        p = pathlib.Path(r)
        if p.is_dir():
            return p
    return pathlib.Path.cwd()


def _theme_from_venture(v):
    m = v / "manifest.json"
    if not m.exists():
        return None
    try:
        d = json.loads(m.read_text(encoding="utf-8"))
        # search_theme is a clean keyword phrase; one_liner is prose (poor query).
        return d.get("search_theme") or d.get("one_liner") or d.get("title") or v.name
    except Exception:
        return None


def _resolve_slug():
    """Reuse the hooks' canonical active-venture resolver so harvest targets the
    SAME venture the guard/spend hooks do (env -> cwd-inside-ventures -> the sole
    venture; never a first-of-many guess when the choice is ambiguous)."""
    try:
        sys.path.insert(0, str(project_root() / ".claude" / "hooks"))
        import _vf  # noqa: WPS433
        return _vf.active_venture()
    except Exception:
        return os.environ.get("VF_ACTIVE_VENTURE")


def active_theme():
    """Resolve the harvest query. Precedence: explicit active venture, then a
    discovery seed (VF_HARVEST_SEED — lets harvest run before any venture exists
    so signals can *inform* the theme), then the canonical cwd/sole-venture
    resolver. Returns None (never a wrong guess) when the venture is ambiguous."""
    vdir = project_root() / "ventures"
    # 1. explicit active venture
    slug = os.environ.get("VF_ACTIVE_VENTURE")
    if slug:
        t = _theme_from_venture(vdir / slug)
        if t:
            return t
    # 2. explicit discovery seed (no venture required)
    seed = os.environ.get("VF_HARVEST_SEED")
    if seed and seed.strip():
        return seed.strip()
    # 3. canonical resolver (cwd-inside-ventures, or the sole venture)
    s = _resolve_slug()
    if s:
        t = _theme_from_venture(vdir / s)
        if t:
            return t
    return None


def http_get_json(url, headers=None, timeout=8, _urlopen=None):
    opener = _urlopen or urllib.request.urlopen
    hdrs = {"User-Agent": UA, "Accept-Encoding": "gzip"}
    if headers:
        hdrs.update(headers)
    req = urllib.request.Request(url, headers=hdrs)
    with opener(req, timeout=timeout) as resp:
        data = resp.read()
        enc = (resp.headers.get("Content-Encoding") or "").lower()
        if enc == "gzip":
            data = gzip.decompress(data)
        return json.loads(data.decode("utf-8"))


def load_tells(path=TELLS_PATH) -> dict:
    try:
        return json.loads(pathlib.Path(path).read_text(encoding="utf-8"))
    except Exception:
        return {}


def tag_tells(text, tells) -> list:
    low = (text or "").lower()
    hits = []
    for category, phrases in tells.items():
        if any(p.lower() in low for p in phrases):
            hits.append(category)
    return hits


def make_record(source, url, date, text, engagement, tells) -> dict:
    try:
        eng = int(engagement)
    except (TypeError, ValueError):
        eng = 0
    return {"source": source, "url": url or "", "date": date or "",
            "text": text or "", "engagement": eng, "tells": tag_tells(text, tells)}


def dedupe(records) -> list:
    seen, out = set(), []
    for r in records:
        key = r.get("url") or r.get("text")
        if key in seen:
            continue
        seen.add(key)
        out.append(r)
    return out


def parse_hn(data, tells) -> list:
    out = []
    for hit in (data or {}).get("hits", []):
        text = hit.get("title") or hit.get("story_text") or hit.get("comment_text") or ""
        eng = (hit.get("points") or 0) + (hit.get("num_comments") or 0)
        url = f"https://news.ycombinator.com/item?id={hit.get('objectID', '')}"
        out.append(make_record("hackernews", url, hit.get("created_at"), text, eng, tells))
    return out


def parse_github(data, tells) -> list:
    out = []
    for it in (data or {}).get("items", []):
        eng = (it.get("reactions") or {}).get("total_count", 0)
        out.append(make_record("github", it.get("html_url"), it.get("created_at"),
                               it.get("title"), eng, tells))
    return out


def parse_google(data, tells) -> list:
    suggestions = data[1] if isinstance(data, list) and len(data) > 1 else []
    out = []
    for s in suggestions:
        url = "https://www.google.com/search?q=" + urllib.parse.quote_plus(s)
        out.append(make_record("google-autocomplete", url, "", s, 0, tells))
    return out


def parse_stackexchange(data, tells) -> list:
    out = []
    for it in (data or {}).get("items", []):
        eng = (it.get("score") or 0) + (it.get("answer_count") or 0)
        out.append(make_record("stackexchange", it.get("link"), "", it.get("title"), eng, tells))
    return out


def collect_hn(theme, tells, fetch=http_get_json):
    q = urllib.parse.quote_plus(theme)
    url = f"https://hn.algolia.com/api/v1/search?query={q}&tags=(story,comment)&hitsPerPage=30"
    return parse_hn(fetch(url), tells), ""


def collect_github(theme, tells, fetch=http_get_json):
    q = urllib.parse.quote_plus(theme + " in:title,body")
    url = f"https://api.github.com/search/issues?q={q}&sort=reactions&order=desc&per_page=30"
    hdrs = {"Accept": "application/vnd.github+json"}
    tok = os.environ.get("GITHUB_TOKEN")
    if tok:
        hdrs["Authorization"] = f"Bearer {tok}"
    return parse_github(fetch(url, headers=hdrs), tells), ""


def collect_google(theme, tells, fetch=http_get_json):
    q = urllib.parse.quote_plus("best " + theme)
    url = f"https://suggestqueries.google.com/complete/search?client=firefox&q={q}"
    return parse_google(fetch(url), tells), ""


def collect_stackexchange(theme, tells, fetch=http_get_json):
    q = urllib.parse.quote_plus(theme)
    key = os.environ.get("STACKEX_KEY")
    key_param = f"&key={urllib.parse.quote_plus(key)}" if key else ""
    url = ("https://api.stackexchange.com/2.3/search/advanced"
           f"?order=desc&sort=relevance&q={q}&site=stackoverflow&pagesize=30{key_param}")
    return parse_stackexchange(fetch(url), tells), ""


COLLECTORS = [
    ("hackernews", collect_hn),
    ("github", collect_github),
    ("google-autocomplete", collect_google),
    ("stackexchange", collect_stackexchange),
]


def run_collectors(theme, tells, collectors=None):
    if collectors is None:
        collectors = COLLECTORS
    records, notes = [], []
    for name, fn in collectors:
        try:
            recs, note = fn(theme, tells)
            records.extend(recs)
            if note:
                notes.append(f"{name}: {note}")
        except Exception as e:  # noqa: BLE001 — fail-graceful per collector
            notes.append(f"{name}: skipped ({type(e).__name__})")
    return dedupe(records), notes


def format_digest(theme, records, notes) -> str:
    lines = [f"# Demand-signal harvest — theme: {theme}",
             f"{len(records)} signal(s) across {len({r['source'] for r in records})} source(s).", ""]
    cats = ["unmet-need", "solution-seeking", "competitor-weakness", "untagged"]
    for cat in cats:
        group = [r for r in records if (r.get("tells") or ["untagged"])[0:1] == [cat]
                 or (cat == "untagged" and not r.get("tells"))
                 or (cat != "untagged" and cat in (r.get("tells") or []))]
        if not group:
            continue
        group = sorted(group, key=lambda r: r.get("engagement", 0), reverse=True)[:12]
        lines.append(f"## {cat} ({len(group)})")
        for r in group:
            lines.append(f"- [{r['engagement']}] {r['source']} — {r['text'][:140]} "
                         f"({r['date'] or 'n/d'}) {r['url']}")
        lines.append("")
    if notes:
        lines.append("## collector notes")
        lines += [f"- {n}" for n in notes]
    return "\n".join(lines)


def main(argv=None) -> int:
    parser = argparse.ArgumentParser(description="Harvest demand signals (keyless).")
    parser.add_argument("--json", action="store_true", help="emit machine-readable JSON")
    args = parser.parse_args(argv)
    try:  # source titles carry non-ASCII (em dashes etc.); don't die on a cp1252 console
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass

    theme = active_theme()
    if not theme:
        print("DATA UNAVAILABLE: no theme found (set VF_ACTIVE_VENTURE, or VF_HARVEST_SEED for discovery).")
        print("Fall back to WebSearch for demand evidence and note the snapshot was unavailable.")
        return 0
    tells = load_tells()
    records, notes = run_collectors(theme, tells)
    if args.json:
        print(json.dumps({"theme": theme, "records": records, "notes": notes}, ensure_ascii=False))
        return 0
    if not records:
        print(f"DATA UNAVAILABLE: collectors returned no signals (theme: {theme}).")
        print("Fall back to WebSearch for demand evidence; see notes below.")
        for n in notes:
            print(f"- {n}")
        return 0
    print(format_digest(theme, records, notes))
    return 0


if __name__ == "__main__":
    sys.exit(main())
