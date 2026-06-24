# G0 Conviction-Signal Capability Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a G0 pre-scoring quality bar that harvests multi-source demand signals (keyless collectors + guided WebSearch) and scores them for *conviction* before an idea earns a full opportunity score.

**Architecture:** Two new skills mirroring the existing gather→score split: `signal-harvest` (gather a tell-tagged signal inventory, backed by a fail-graceful Python collector script) → `conviction-scoring` (score `frequency × intensity × WTP × addressability`, gate PASS/WEAK/FAIL, write the artifact). The `opportunity-scout` agent runs both as step 1; the artifact is enforced by adding it to G0 `required_artifacts`. The old `demand-signals` skill is retired and its heuristics migrated.

**Tech Stack:** Python 3 (stdlib only — `urllib`, `gzip`, `json`, `re`, `argparse`); Markdown skills/agents to venture-factory conventions; JSON manifest.

## Global Constraints

- **Cross-platform / stdlib only:** helper scripts are Python, no third-party deps (pytest is NOT installed). Tests are plain `assert` functions with a `__main__` runner, run via `python <path>`.
- **Fail-graceful:** the collector script ALWAYS exits 0; a failed collector or missing theme prints a marker (`DATA UNAVAILABLE` / `<name>: skipped (...)`) and the skill degrades to WebSearch.
- **Injection-safe:** the active theme is read from `manifest.json`/`brief.md`, NEVER from an interpolated shell argument.
- **No scraping:** the script hits only documented public APIs (HN Algolia, GitHub Search, Google autocomplete, StackExchange). ToS-risky tiers (reviews, marketplaces, job boards) go through the agent's WebSearch, never automated scraping.
- **Single-writer:** the script is read-only (prints to stdout). The agent/skill writes artifacts only inside `ventures/<slug>/research/`.
- **Least privilege:** `signal-harvest` allowed-tools = `Read, Bash, WebSearch, WebFetch`; `conviction-scoring` allowed-tools = `Read, Write`.
- **Cite-or-mark:** every load-bearing figure carries a dated source; unverifiable items are marked `unverified — resolve at G1`.
- **Conviction gate bands (verbatim):** normalised `≥60 PASS` · `35–59 WEAK` · `<35 FAIL`. Hard rule: any factor scored `1` ⇒ cannot PASS regardless of product.
- **HTTP helper must gzip-decompress** (StackExchange always sets `Content-Encoding: gzip`).
- **Commit messages** end with the repo's trailer:
  `Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>`

---

## File Structure

**Create:**
- `.claude/skills/signal-harvest/SKILL.md` — gather skill body.
- `.claude/skills/signal-harvest/scripts/harvest_signals.py` — fail-graceful keyless collector.
- `.claude/skills/signal-harvest/scripts/test_harvest_signals.py` — dependency-free tests.
- `.claude/skills/signal-harvest/references/tells.json` — language-tell lexicon (single source of truth).
- `.claude/skills/signal-harvest/references/source-tiers.md` — taxonomy + per-tier search-string guidance.
- `.claude/skills/signal-harvest/knowledge/ledger.md` — seeded, with migrated demand-signals heuristics.
- `.claude/skills/conviction-scoring/SKILL.md` — score+gate skill body.
- `.claude/skills/conviction-scoring/references/scoring-anchors.md` — 1–5 anchors per factor + worked examples + artifact template.
- `.claude/skills/conviction-scoring/knowledge/ledger.md` — seeded.

**Modify:**
- `.claude/agents/opportunity-scout.md` — skills list + procedure + gate-exit checklist.
- `ventures/_template/manifest.json` — add `research/conviction-signal.md` to G0 `required_artifacts`.
- `.claude/skills/opportunity-scoring/SKILL.md` — step-1 wording (demand-signals → conviction-scoring handoff).
- `SECRETS.md` — lines ~13 & ~21 (env-key references).
- `.env.example` — add optional collector env vars; deprecate `DEMAND_SIGNALS_API_KEY`.

**Delete:**
- `.claude/skills/demand-signals/` (entire dir) — AFTER its ledger heuristics are migrated (Task 6).

**Do NOT touch (historical artifacts):** `passive-income-agent-team-implementation-plan.md`, any `ventures/<slug>/research/*` or `ventures/<slug>/retro/*` files that mention `demand-signals`.

---

### Task 1: Collector script skeleton — theme resolution + HTTP helper (fail-graceful)

Stand up `harvest_signals.py` reusing the existing `pull_signals.py` theme-resolution pattern, plus a gzip-aware HTTP helper, and the test harness. No collectors yet — just the fail-graceful contract.

**Files:**
- Create: `.claude/skills/signal-harvest/scripts/harvest_signals.py`
- Test: `.claude/skills/signal-harvest/scripts/test_harvest_signals.py`

**Interfaces:**
- Produces:
  - `project_root() -> pathlib.Path`
  - `active_theme() -> str | None` — reads `one_liner`/`title`/dir-name from the active venture's `manifest.json` (resolved via `VF_ACTIVE_VENTURE` or first non-`_` venture dir).
  - `http_get_json(url: str, headers: dict | None = None, timeout: int = 8) -> dict | list` — GETs and JSON-decodes, decompressing gzip responses.
  - `main(argv: list[str] | None = None) -> int` — argparse with `--json`; if `active_theme()` is None prints `DATA UNAVAILABLE: ...` and returns 0.

- [ ] **Step 1: Write the failing tests**

Create `.claude/skills/signal-harvest/scripts/test_harvest_signals.py`:

```python
"""Dependency-free tests for harvest_signals (pytest is not installed).
Run: python .claude/skills/signal-harvest/scripts/test_harvest_signals.py
"""
import io, gzip, json, os, sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import harvest_signals as h


def test_active_theme_none_when_no_venture(tmp_env):
    # No VF_ACTIVE_VENTURE and a project root with no ventures/ -> None
    os.environ.pop("VF_ACTIVE_VENTURE", None)
    os.environ["CLAUDE_PROJECT_DIR"] = tmp_env
    assert h.active_theme() is None


def test_main_exits_zero_with_no_theme(tmp_env, capsys_buffer):
    os.environ.pop("VF_ACTIVE_VENTURE", None)
    os.environ["CLAUDE_PROJECT_DIR"] = tmp_env
    rc = h.main([])
    out = capsys_buffer.getvalue()
    assert rc == 0
    assert "DATA UNAVAILABLE" in out


def test_http_get_json_decompresses_gzip():
    payload = {"items": [{"score": 3}]}
    raw = gzip.compress(json.dumps(payload).encode("utf-8"))

    class FakeResp(io.BytesIO):
        headers = {"Content-Encoding": "gzip"}
        def __enter__(self): return self
        def __exit__(self, *a): return False

    def fake_urlopen(req, timeout=0):
        return FakeResp(raw)

    got = h.http_get_json("https://x", _urlopen=fake_urlopen)
    assert got == payload


# --- tiny harness (no pytest) ---------------------------------------------
def _run():
    import tempfile, contextlib
    failures = 0
    for name, fn in sorted(globals().items()):
        if not (name.startswith("test_") and callable(fn)):
            continue
        kwargs = {}
        td = None
        if "tmp_env" in fn.__code__.co_varnames:
            td = tempfile.mkdtemp(); kwargs["tmp_env"] = td
        buf = io.StringIO()
        if "capsys_buffer" in fn.__code__.co_varnames:
            kwargs["capsys_buffer"] = buf
        try:
            with contextlib.redirect_stdout(buf):
                fn(**kwargs)
            print(f"PASS {name}")
        except Exception as e:  # noqa: BLE001
            failures += 1
            print(f"FAIL {name}: {type(e).__name__}: {e}")
    print(f"\n{'OK' if not failures else 'FAILED'} ({failures} failure(s))")
    return 1 if failures else 0


if __name__ == "__main__":
    sys.exit(_run())
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `python .claude/skills/signal-harvest/scripts/test_harvest_signals.py`
Expected: FAIL — `ModuleNotFoundError: No module named 'harvest_signals'` (the harness prints the error; exit code 1).

- [ ] **Step 3: Write the skeleton implementation**

Create `.claude/skills/signal-harvest/scripts/harvest_signals.py`:

```python
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
import urllib.error
import urllib.parse
import urllib.request

UA = "venture-factory-signal-harvest/1.0"


def project_root() -> pathlib.Path:
    r = os.environ.get("CLAUDE_PROJECT_DIR")
    return pathlib.Path(r) if r and pathlib.Path(r).is_dir() else pathlib.Path.cwd()


def active_theme():
    vdir = project_root() / "ventures"
    slug = os.environ.get("VF_ACTIVE_VENTURE")
    candidates = []
    if slug:
        candidates.append(vdir / slug)
    if vdir.is_dir():
        candidates += [p for p in sorted(vdir.iterdir())
                       if p.is_dir() and not p.name.startswith("_")]
    for v in candidates:
        m = v / "manifest.json"
        if m.exists():
            try:
                d = json.loads(m.read_text(encoding="utf-8"))
                return d.get("one_liner") or d.get("title") or v.name
            except Exception:
                continue
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


def main(argv=None) -> int:
    parser = argparse.ArgumentParser(description="Harvest demand signals (keyless).")
    parser.add_argument("--json", action="store_true", help="emit machine-readable JSON")
    args = parser.parse_args(argv)

    theme = active_theme()
    if not theme:
        print("DATA UNAVAILABLE: no active venture/theme found (set VF_ACTIVE_VENTURE).")
        print("Fall back to WebSearch for demand evidence and note the snapshot was unavailable.")
        return 0
    # Collectors wired in later tasks.
    print(f"DATA UNAVAILABLE: collectors not yet wired (theme: {theme}).")
    return 0


if __name__ == "__main__":
    sys.exit(main())
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `python .claude/skills/signal-harvest/scripts/test_harvest_signals.py`
Expected: `PASS test_active_theme_none_when_no_venture`, `PASS test_http_get_json_decompresses_gzip`, `PASS test_main_exits_zero_with_no_theme`, then `OK (0 failure(s))` (exit 0).

- [ ] **Step 5: Commit**

```bash
git add .claude/skills/signal-harvest/scripts/harvest_signals.py .claude/skills/signal-harvest/scripts/test_harvest_signals.py
git commit -m "feat(signal-harvest): fail-graceful collector skeleton + gzip HTTP helper

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 2: Language-tell lexicon + tagger

Create the shared tell lexicon and the pure tagging function used by both script and skill.

**Files:**
- Create: `.claude/skills/signal-harvest/references/tells.json`
- Modify: `.claude/skills/signal-harvest/scripts/harvest_signals.py`
- Test: `.claude/skills/signal-harvest/scripts/test_harvest_signals.py`

**Interfaces:**
- Consumes: `http_get_json` (Task 1).
- Produces:
  - `TELLS_PATH: pathlib.Path` — `references/tells.json`.
  - `load_tells(path=TELLS_PATH) -> dict[str, list[str]]` — returns `{}` on any error.
  - `tag_tells(text: str, tells: dict) -> list[str]` — categories whose phrases appear (case-insensitive), in lexicon order, deduped.

- [ ] **Step 1: Write the failing tests**

Append to `test_harvest_signals.py` (above the harness block):

```python
def test_load_tells_has_three_categories():
    tells = h.load_tells()
    assert set(tells) == {"unmet-need", "solution-seeking", "competitor-weakness"}
    assert all(isinstance(v, list) and v for v in tells.values())


def test_tag_tells_matches_unmet_need():
    tells = {"unmet-need": ["i wish", "built a spreadsheet"], "solution-seeking": ["alternative to"]}
    assert h.tag_tells("Honestly I wish there was a tool for this", tells) == ["unmet-need"]


def test_tag_tells_matches_multiple_categories_in_lexicon_order():
    tells = {"unmet-need": ["built a spreadsheet"], "solution-seeking": ["alternative to"]}
    got = h.tag_tells("I built a spreadsheet as an alternative to Foo", tells)
    assert got == ["unmet-need", "solution-seeking"]


def test_tag_tells_empty_on_no_match_or_blank():
    tells = {"unmet-need": ["i wish"]}
    assert h.tag_tells("", tells) == []
    assert h.tag_tells("just a neutral sentence", tells) == []


def test_load_tells_returns_empty_on_bad_path():
    assert h.load_tells(h.pathlib.Path("does-not-exist.json")) == {}
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `python .claude/skills/signal-harvest/scripts/test_harvest_signals.py`
Expected: the five new tests FAIL (`AttributeError: module 'harvest_signals' has no attribute 'load_tells'` / `tag_tells`); harness exit 1.

- [ ] **Step 3: Create the lexicon**

Create `.claude/skills/signal-harvest/references/tells.json`:

```json
{
  "unmet-need": [
    "i wish", "wish there was", "why isn't there", "why is there no",
    "there has to be a better way", "we spend hours", "spend hours every",
    "built a spreadsheet", "wrote a script to", "i built a", "hacked together",
    "by hand", "manually", "is there a tool", "does anyone know a tool"
  ],
  "solution-seeking": [
    "what do you use for", "recommendations for", "looking for a tool",
    "looking for a service", "alternative to", "is it worth paying",
    "how much does", "pricing for", "what should i pay", "any tool that",
    "best tool for", "best software for"
  ],
  "competitor-weakness": [
    "love it but", "if only it could", "switched because", "switched away",
    "deal-breaker", "dealbreaker", "the only problem with", "wish it could",
    "doesn't support", "lacks"
  ]
}
```

- [ ] **Step 4: Add `load_tells` / `tag_tells` to the script**

In `harvest_signals.py`, add after the `UA` constant:

```python
TELLS_PATH = pathlib.Path(__file__).resolve().parent.parent / "references" / "tells.json"
```

And add these functions after `http_get_json`:

```python
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
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `python .claude/skills/signal-harvest/scripts/test_harvest_signals.py`
Expected: all tests `PASS`, `OK (0 failure(s))`.

- [ ] **Step 6: Commit**

```bash
git add .claude/skills/signal-harvest/references/tells.json .claude/skills/signal-harvest/scripts/harvest_signals.py .claude/skills/signal-harvest/scripts/test_harvest_signals.py
git commit -m "feat(signal-harvest): language-tell lexicon + tagger

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 3: Signal record + dedupe

Define the normalized record builder and the dedup pass.

**Files:**
- Modify: `.claude/skills/signal-harvest/scripts/harvest_signals.py`
- Test: `.claude/skills/signal-harvest/scripts/test_harvest_signals.py`

**Interfaces:**
- Consumes: `tag_tells` (Task 2).
- Produces:
  - `make_record(source, url, date, text, engagement, tells) -> dict` — keys `source, url, date, text, engagement(int), tells(list)`; `engagement` coerces `None`/bad → 0; `tells` computed via `tag_tells(text, tells)`.
  - `dedupe(records: list[dict]) -> list[dict]` — drops later records sharing a `url` (or `text` when url falsy); preserves order.

- [ ] **Step 1: Write the failing tests**

Append to `test_harvest_signals.py`:

```python
def test_make_record_shape_and_tells():
    tells = {"unmet-need": ["i wish"]}
    r = h.make_record("hackernews", "https://hn/1", "2026-01-02", "I wish X existed", "5", tells)
    assert r == {"source": "hackernews", "url": "https://hn/1", "date": "2026-01-02",
                 "text": "I wish X existed", "engagement": 5, "tells": ["unmet-need"]}


def test_make_record_engagement_coerces_bad_values():
    assert h.make_record("s", "u", "", "t", None, {})["engagement"] == 0
    assert h.make_record("s", "u", "", "t", "notanumber", {})["engagement"] == 0


def test_dedupe_drops_repeat_urls_keeps_order():
    recs = [
        {"url": "u1", "text": "a"}, {"url": "u2", "text": "b"}, {"url": "u1", "text": "c"},
    ]
    out = h.dedupe(recs)
    assert [r["url"] for r in out] == ["u1", "u2"]


def test_dedupe_falls_back_to_text_when_no_url():
    recs = [{"url": "", "text": "same"}, {"url": "", "text": "same"}, {"url": "", "text": "diff"}]
    assert [r["text"] for r in h.dedupe(recs)] == ["same", "diff"]
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `python .claude/skills/signal-harvest/scripts/test_harvest_signals.py`
Expected: the four new tests FAIL (`AttributeError: ... 'make_record'` / `'dedupe'`).

- [ ] **Step 3: Implement `make_record` and `dedupe`**

Add to `harvest_signals.py` after `tag_tells`:

```python
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
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `python .claude/skills/signal-harvest/scripts/test_harvest_signals.py`
Expected: all `PASS`, `OK (0 failure(s))`.

- [ ] **Step 5: Commit**

```bash
git add .claude/skills/signal-harvest/scripts/harvest_signals.py .claude/skills/signal-harvest/scripts/test_harvest_signals.py
git commit -m "feat(signal-harvest): normalized signal record + dedupe

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 4: Collector parsers (HN, GitHub, Google autocomplete, StackExchange)

Add pure parser functions (raw API payload → records) and thin collector wrappers (build URL → fetch → parse). Parsers are tested against fixtures; no network in tests.

**Files:**
- Modify: `.claude/skills/signal-harvest/scripts/harvest_signals.py`
- Test: `.claude/skills/signal-harvest/scripts/test_harvest_signals.py`

**Interfaces:**
- Consumes: `make_record` (Task 3), `http_get_json` (Task 1).
- Produces (pure parsers — each `(data, tells) -> list[dict]`):
  - `parse_hn(data, tells)` — HN Algolia `hits[]` → records; engagement = `points + num_comments`; url = `https://news.ycombinator.com/item?id=<objectID>`; text = `title|story_text|comment_text`; date = `created_at`.
  - `parse_github(data, tells)` — GitHub search `items[]` → records; engagement = `reactions.total_count`; url = `html_url`; text = `title`; date = `created_at`.
  - `parse_google(data, tells)` — autocomplete `[query, [suggestions], ...]` → records; engagement = 0; url = google search URL for the suggestion; text = suggestion; date = "".
  - `parse_stackexchange(data, tells)` — SE `items[]` → records; engagement = `score + answer_count`; url = `link`; text = `title`; date = "" (epoch omitted for simplicity).
- Produces (collectors — each `(theme, tells, fetch=http_get_json) -> tuple[list[dict], str]` returning `(records, note)`):
  - `collect_hn`, `collect_github`, `collect_google`, `collect_stackexchange`.

- [ ] **Step 1: Write the failing tests**

Append to `test_harvest_signals.py`:

```python
def test_parse_hn_maps_fields_and_engagement():
    data = {"hits": [
        {"objectID": "42", "title": "I wish there was X", "points": 10,
         "num_comments": 5, "created_at": "2026-01-01T00:00:00Z", "url": None},
    ]}
    recs = h.parse_hn(data, {"unmet-need": ["i wish"]})
    assert len(recs) == 1
    r = recs[0]
    assert r["url"] == "https://news.ycombinator.com/item?id=42"
    assert r["engagement"] == 15
    assert r["tells"] == ["unmet-need"]
    assert r["source"] == "hackernews"


def test_parse_github_uses_reactions_total():
    data = {"items": [
        {"html_url": "https://gh/i/1", "title": "alternative to Foo",
         "created_at": "2026-02-02T00:00:00Z", "reactions": {"total_count": 7}},
    ]}
    recs = h.parse_github(data, {"solution-seeking": ["alternative to"]})
    assert recs[0]["engagement"] == 7
    assert recs[0]["tells"] == ["solution-seeking"]
    assert recs[0]["source"] == "github"


def test_parse_github_missing_reactions_is_zero():
    data = {"items": [{"html_url": "u", "title": "t", "created_at": "d"}]}
    assert h.parse_github(data, {})[0]["engagement"] == 0


def test_parse_google_makes_suggestion_records():
    data = ["best crm", ["best crm for plumbers", "best crm alternative"]]
    recs = h.parse_google(data, {"solution-seeking": ["alternative"]})
    assert [r["text"] for r in recs] == ["best crm for plumbers", "best crm alternative"]
    assert recs[1]["tells"] == ["solution-seeking"]
    assert recs[0]["source"] == "google-autocomplete"
    assert "best%20crm%20for%20plumbers" in recs[0]["url"].replace("+", "%20")


def test_parse_stackexchange_engagement_is_score_plus_answers():
    data = {"items": [
        {"link": "https://so/q/1", "title": "how do you all deal with X",
         "score": 4, "answer_count": 3},
    ]}
    recs = h.parse_stackexchange(data, {})
    assert recs[0]["engagement"] == 7
    assert recs[0]["source"] == "stackexchange"


def test_collector_returns_records_via_injected_fetch():
    captured = {}
    def fake_fetch(url, headers=None, timeout=8):
        captured["url"] = url
        return {"hits": [{"objectID": "1", "title": "I wish", "points": 1,
                          "num_comments": 0, "created_at": "d"}]}
    recs, note = h.collect_hn("payroll reconciliation", {"unmet-need": ["i wish"]}, fetch=fake_fetch)
    assert len(recs) == 1
    assert "payroll" in captured["url"].lower() or "payroll" in captured["url"].replace("+", " ").lower()
    assert note == ""
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `python .claude/skills/signal-harvest/scripts/test_harvest_signals.py`
Expected: the new tests FAIL (`AttributeError: ... 'parse_hn'` etc.).

- [ ] **Step 3: Implement parsers and collectors**

Add to `harvest_signals.py` after `dedupe`:

```python
def parse_hn(data, tells) -> list:
    out = []
    for hit in (data or {}).get("hits", []):
        text = hit.get("title") or hit.get("story_text") or hit.get("comment_text") or ""
        eng = (hit.get("points") or 0) + (hit.get("num_comments") or 0)
        url = f"https://news.ycombinator.com/item?id={hit.get('objectID')}"
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
```

Note for the implementer: the `fetch` signature is `fetch(url, headers=None, timeout=8)`. `collect_github` passes `headers=`; the other collectors omit it. The test's `fake_fetch` accepts `headers=None` to stay compatible.

- [ ] **Step 4: Run tests to verify they pass**

Run: `python .claude/skills/signal-harvest/scripts/test_harvest_signals.py`
Expected: all `PASS`, `OK (0 failure(s))`.

- [ ] **Step 5: Commit**

```bash
git add .claude/skills/signal-harvest/scripts/harvest_signals.py .claude/skills/signal-harvest/scripts/test_harvest_signals.py
git commit -m "feat(signal-harvest): HN/GitHub/Google/StackExchange collectors + parsers

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 5: Orchestration — `run_collectors`, digest, and `main` wiring

Wire the collectors into `main`, with per-collector error isolation, a ranked human digest, and a `--json` mode.

**Files:**
- Modify: `.claude/skills/signal-harvest/scripts/harvest_signals.py`
- Test: `.claude/skills/signal-harvest/scripts/test_harvest_signals.py`

**Interfaces:**
- Consumes: the four collectors (Task 4), `dedupe` (Task 3), `load_tells` (Task 2), `active_theme` (Task 1).
- Produces:
  - `COLLECTORS: list[tuple[str, callable]]` — `[("hackernews", collect_hn), ("github", collect_github), ("google-autocomplete", collect_google), ("stackexchange", collect_stackexchange)]`.
  - `run_collectors(theme, tells, collectors=None) -> tuple[list[dict], list[str]]` — `collectors` defaults to `None` and resolves the module-level `COLLECTORS` at call time (so the test harness can monkeypatch `h.COLLECTORS`; a `collectors=COLLECTORS` default would bind the original list at def-time and defeat the monkeypatch). Runs each in try/except; a failing collector appends `"<name>: skipped (<ExceptionName>)"` to notes and contributes no records; returns `(dedupe(records), notes)`.
  - `format_digest(theme, records, notes) -> str` — header with theme + counts; records grouped by tell category, sorted by engagement desc, capped at 12 per category; a `notes` footer.
  - `main` (rewired) — resolves theme; runs collectors; prints `format_digest` or `json.dumps({"theme","records","notes"})` under `--json`; returns 0 even when zero records (prints guidance to use WebSearch).

- [ ] **Step 1: Write the failing tests**

Append to `test_harvest_signals.py`:

```python
def test_run_collectors_isolates_failures():
    def good(theme, tells, fetch=None):
        return [{"url": "u1", "text": "t", "engagement": 1, "tells": [], "source": "good"}], ""
    def bad(theme, tells, fetch=None):
        raise ValueError("boom")
    recs, notes = h.run_collectors("x", {}, collectors=[("good", good), ("bad", bad)])
    assert len(recs) == 1
    assert any("bad: skipped (ValueError)" in n for n in notes)


def test_format_digest_groups_and_ranks():
    recs = [
        {"source": "hackernews", "url": "u1", "date": "d", "text": "low", "engagement": 1, "tells": ["unmet-need"]},
        {"source": "hackernews", "url": "u2", "date": "d", "text": "high", "engagement": 99, "tells": ["unmet-need"]},
    ]
    out = h.format_digest("my theme", recs, ["github: skipped (HTTPError)"])
    assert "my theme" in out
    # higher-engagement signal listed before the lower one
    assert out.index("high") < out.index("low")
    assert "github: skipped (HTTPError)" in out


def test_main_json_mode_with_injected_collectors(monkeypatch_collectors, tmp_env, capsys_buffer):
    # a venture with a manifest so active_theme() resolves
    import json as _json, os as _os
    vdir = _os.path.join(tmp_env, "ventures", "demo")
    _os.makedirs(vdir)
    with open(_os.path.join(vdir, "manifest.json"), "w", encoding="utf-8") as f:
        _json.dump({"one_liner": "demo theme"}, f)
    _os.environ["CLAUDE_PROJECT_DIR"] = tmp_env
    _os.environ["VF_ACTIVE_VENTURE"] = "demo"
    rc = h.main(["--json"])
    payload = _json.loads(capsys_buffer.getvalue())
    assert rc == 0
    assert payload["theme"] == "demo theme"
    assert payload["records"][0]["source"] == "fake"
```

Add this fixture wiring to the harness `_run()` — replace the existing `_run` body's kwargs section with the version below (it adds `monkeypatch_collectors`, which temporarily swaps `COLLECTORS` to a single in-memory collector):

```python
def _run():
    import tempfile, contextlib, shutil
    failures = 0
    for name, fn in sorted(globals().items()):
        if not (name.startswith("test_") and callable(fn)):
            continue
        kwargs = {}
        td = None
        argnames = fn.__code__.co_varnames[: fn.__code__.co_argcount]
        if "tmp_env" in argnames:
            td = tempfile.mkdtemp(); kwargs["tmp_env"] = td
        buf = io.StringIO()
        if "capsys_buffer" in argnames:
            kwargs["capsys_buffer"] = buf
        saved = None
        if "monkeypatch_collectors" in argnames:
            def fake(theme, tells, fetch=None):
                return [{"source": "fake", "url": "u", "date": "", "text": "I wish",
                         "engagement": 3, "tells": ["unmet-need"]}], ""
            saved = h.COLLECTORS
            h.COLLECTORS = [("fake", fake)]
            kwargs["monkeypatch_collectors"] = True
        try:
            with contextlib.redirect_stdout(buf):
                fn(**kwargs)
            print(f"PASS {name}")
        except Exception as e:  # noqa: BLE001
            failures += 1
            print(f"FAIL {name}: {type(e).__name__}: {e}")
        finally:
            if saved is not None:
                h.COLLECTORS = saved
            if td:
                shutil.rmtree(td, ignore_errors=True)
    print(f"\n{'OK' if not failures else 'FAILED'} ({failures} failure(s))")
    return 1 if failures else 0
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `python .claude/skills/signal-harvest/scripts/test_harvest_signals.py`
Expected: new tests FAIL (`AttributeError: ... 'run_collectors'` / `'format_digest'`; `main` ignores `--json`).

- [ ] **Step 3: Implement orchestration and rewire `main`**

Add to `harvest_signals.py` after the collectors:

```python
COLLECTORS = [
    ("hackernews", collect_hn),
    ("github", collect_github),
    ("google-autocomplete", collect_google),
    ("stackexchange", collect_stackexchange),
]


def run_collectors(theme, tells, collectors=None):
    if collectors is None:  # resolve at call time so tests can monkeypatch module-level COLLECTORS
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
```

Then replace the body of `main` after `theme = active_theme()` (keep the no-theme branch) with:

```python
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
```

Note: a record may carry multiple tells; `format_digest` lists it under each matching category. The `untagged` bucket catches records with no tell.

- [ ] **Step 4: Run tests to verify they pass**

Run: `python .claude/skills/signal-harvest/scripts/test_harvest_signals.py`
Expected: all `PASS`, `OK (0 failure(s))`.

- [ ] **Step 5: Live smoke (network-dependent; informational)**

Run from repo root with a real venture set:
`VF_ACTIVE_VENTURE=[venture-removed] python .claude/skills/signal-harvest/scripts/harvest_signals.py`
Expected: either a `# Demand-signal harvest` digest, OR `DATA UNAVAILABLE`/`skipped` notes if offline. Either way exit code 0 (`echo $?` → 0). This confirms the fail-graceful contract end-to-end; it is not a unit test.

- [ ] **Step 6: Commit**

```bash
git add .claude/skills/signal-harvest/scripts/harvest_signals.py .claude/skills/signal-harvest/scripts/test_harvest_signals.py
git commit -m "feat(signal-harvest): collector orchestration, ranked digest, --json mode

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 6: `signal-harvest` skill body, references, and migrated ledger

Write the prose skill that drives the script + guided WebSearch, plus its references and seeded ledger (migrating demand-signals heuristics so they survive the retirement in Task 10).

**Files:**
- Create: `.claude/skills/signal-harvest/SKILL.md`
- Create: `.claude/skills/signal-harvest/references/source-tiers.md`
- Create: `.claude/skills/signal-harvest/knowledge/ledger.md`

**Interfaces:**
- Consumes: `harvest_signals.py` (Tasks 1–5), `references/tells.json` (Task 2).
- Produces: a structured **signal inventory** handed to `conviction-scoring` (Task 7).

- [ ] **Step 1: Write `SKILL.md`**

Create `.claude/skills/signal-harvest/SKILL.md`:

```markdown
---
name: signal-harvest
description: Use at G0 to harvest demand signals across the source taxonomy — keyless APIs (HN, GitHub, Google autocomplete, StackExchange) plus guided WebSearch for review/marketplace/job-board tiers — into one tell-tagged signal inventory. Triggers: "harvest signals", "is there real demand", "what are people saying", any G0 scout pass.
when_to_use: G0 demand gathering; building the evidence inventory that conviction-scoring scores. Supersedes the retired demand-signals skill (also covers trend trajectory & seasonality).
allowed-tools: Read, Bash, WebSearch, WebFetch
---

## Live harvest (keyless collectors)
```!
python "$CLAUDE_PROJECT_DIR/.claude/skills/signal-harvest/scripts/harvest_signals.py" 2>/dev/null || echo "DATA UNAVAILABLE: harvest script not reachable; fall back to WebSearch."
```

## Procedure
1. Read the harvest above. It pulls HN (Algolia), GitHub issues (👍 = votes), Google autocomplete (intent), and StackExchange — each signal tagged with a language-tell category and an engagement number. If it says `DATA UNAVAILABLE`/`skipped`, note it and lean harder on step 2.
2. **Cover the high-quality tiers the script does NOT pull** with guided WebSearch (NEVER scrape — public search only). For the active theme, search the tell strings against: competitor reviews (G2/Capterra/TrustRadius/Trustpilot/app stores, filtered to 1–3★), freelance marketplaces (Upwork/Fiverr — recurring same-task gigs), job boards (LinkedIn/Indeed/Seek — roles hired to do the manual task), and feature-request boards (Canny/UserVoice). See `references/source-tiers.md` for the per-tier search strings and what each tier proves.
3. Build ONE deduped **signal inventory** (do not write a file unless asked — hand it to `conviction-scoring`): each row = `source-tier · signal excerpt · dated link · engagement · tell category`. Keep the strongest ~20. Add a one-line **trend trajectory** read (growing / flat / declining + any seasonality) from Google Trends or dated source momentum.
4. Mark every figure with a dated source; tag anything you cannot verify `unverified — resolve at G1`. Hand the inventory + trajectory to `conviction-scoring`.

**Demand ≠ opportunity, and breadth ≠ conviction.** A loud single thread is not a signal. The bar is recurrence across *independent* sources, real intensity, willingness-to-pay evidence, and an existing workaround — `conviction-scoring` enforces that. Reddit/Product Hunt live collectors are not wired (keyed); cover them via WebSearch. Tell lexicon: `references/tells.json`. Source-reliability notes: `knowledge/ledger.md`.
```

- [ ] **Step 2: Write `references/source-tiers.md`**

Create `.claude/skills/signal-harvest/references/source-tiers.md`:

```markdown
# Source taxonomy & search-string guidance

Ordered by signal quality. The collector script covers HN, GitHub, Google
autocomplete, StackExchange. Everything else here is **guided WebSearch — never
scrape**; hit public search and cite dated results.

## Tier 1 — money already moving (highest quality)
- **Competitor reviews, 1–3★** (G2, Capterra, TrustRadius, GetApp, Trustpilot, app stores).
  Search: `"<category>" site:g2.com "love it but"`, `"<product>" review "switched because"`,
  `"<product>" "deal-breaker"`. Proves: unmet need inside a *paid* category.
- **Freelance marketplaces** (Upwork, Fiverr). Search: `site:upwork.com "<task>"`,
  `"<task>" freelancer hourly`. Recurring same-task gigs ≈ paid repetitive pain; volume ≈ market size.
- **Job postings** (LinkedIn, Indeed, Seek). Search: `"<manual task>" analyst hiring`,
  `"manually reconcile <X>" job`. A role hired to do it = a process a company will pay to automate.
- **Feature-request boards w/ votes** (Canny, UserVoice, GitHub 👍). Search:
  `site:canny.io "<category>"`, `"<product>" feature request votes`. Demand pre-quantified.

## Tier 2 — search intent (measurable volume)
- **Keyword/intent** — commercial-intent queries: `best <X> for <Y>`, `<X> alternative`,
  `<X> vs <Y>`, `<X> pricing`. Google autocomplete (script) is the keyless volume proxy;
  AnswerThePublic/AlsoAsked + "People also ask" for question shapes; Google Trends for trajectory.

## Tier 3 — raw latent need (highest volume, most validation)
- **HN** (script), **StackExchange** (script), **Reddit** (WebSearch: `site:reddit.com "<theme>" "i wish"`),
  vertical Discord/Slack/forums/Indie Hackers, social (X, LinkedIn comments, YouTube/TikTok
  tutorial comments), **Product Hunt** comments (`"would be great if it also"`).

## Language tells (canonical list lives in references/tells.json)
- **Unmet need:** "i wish", "why isn't there", "there has to be a better way",
  "we spend hours every week", and best of all a **workaround** ("I built a spreadsheet/script to…").
- **Solution-seeking / intent:** "what do you use for", "recommendations for",
  "looking for a tool/service that", "alternative to X", "is it worth paying", pricing questions.
- **Competitor weakness:** "love it but it doesn't", "if only it could", "switched because".
```

- [ ] **Step 3: Write `knowledge/ledger.md` (migrate demand-signals heuristics)**

Create `.claude/skills/signal-harvest/knowledge/ledger.md` (the three dated entries below are migrated verbatim from `.claude/skills/demand-signals/knowledge/ledger.md` so they survive its retirement):

```markdown
# Knowledge ledger - signal-harvest

> Dated, atomic heuristics and anti-patterns appended by the skill-curator after each venture.
> Entry format: `YYYY-MM-DD - <heuristic/anti-pattern> - evidence: <slug> - confidence: low|med|high (n=K)`
> The SKILL.md body loads only the most recent / highest-confidence entries; compact older ones into references/ periodically.
> (Migrated 2026-06-24 from the retired demand-signals skill.)

2026-06-19 - POSITIVE HEURISTIC: The "asleep-incumbent" meta-filter (strong regulatory demand + VERIFIED open lane, not just strong demand) measurably improves sourcing yield — found the top-ranked idea first try, correctly de-prioritised aged-care/AML on drag grounds. When scoring demand, pair every strong regulatory forcing function with an explicit lane-verification trigger: demand alone does not constitute opportunity if the lane is crowded or incumbents already serve the segment affordably. Retain as a sourcing principle. - evidence: asleep-incumbent (strong demand correctly identified; lane subsequently found narrowing), [venture-removed] (demand strong; correctly lower priority), aml-tranche2 (strong demand but crowded lane — correctly PARKed) - confidence: med (n=3)

2026-06-18 - AU government data sources (.gov.au, ABS) are frequently unreachable during automated fetch. For AU-market demand research, prefer named trade publications (HR Leader, Mapien, Squire Patton Boggs, law firm blogs) as first-pass sources and flag .gov.au as "to confirm manually" rather than treating a failed fetch as a verification failure. - evidence: au-sme-compliance - confidence: low (n=1)

2026-06-19 - HEURISTIC: Pair demand signal strength with a buyer-economics read before concluding that demand = opportunity. Ask: does the buyer SAVE money (savings-funded, contingency), MAKE money (direct revenue uplift), or merely AVOID a penalty (compliance)? Strong mandate-driven demand is regularly observed for AVOID plays (privacy reform, payroll super, AML, FWO compliance) yet these consistently show depressed WTP (2/5) and downward price pressure toward free government templates. SAVE and MAKE buyer economics sustain substantially higher WTP (4–5/5) for the same demand-signal strength. Practically: when logging demand signals for a compliance/regulatory mandate, flag "AVOID buyer economics" and note the structural WTP ceiling risk before advancing the idea. Cross-reference: compliance-WTP-ceiling heuristic in opportunity-scoring/knowledge/ledger.md (n≥3 cleared). - evidence: revenue-vs-compliance (controlled head-to-head, 2026-06-19), au-sme-compliance, [venture-removed], payday-super, aml-tranche2 - confidence: med (n≥3 bar cleared for the compliance-WTP-ceiling claim; full SAVE>MAKE>AVOID ranking is n=1)
```

- [ ] **Step 4: Verify the skill is well-formed**

Run: `python -c "import pathlib,sys; t=pathlib.Path('.claude/skills/signal-harvest/SKILL.md').read_text(encoding='utf-8'); sys.exit(0 if t.startswith('---') and 'allowed-tools: Read, Bash, WebSearch, WebFetch' in t else 1)"`
Expected: exit 0 (frontmatter present with the least-privilege tool list).

- [ ] **Step 5: Commit**

```bash
git add .claude/skills/signal-harvest/SKILL.md .claude/skills/signal-harvest/references/source-tiers.md .claude/skills/signal-harvest/knowledge/ledger.md
git commit -m "feat(signal-harvest): skill body, source taxonomy, migrated ledger

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 7: `conviction-scoring` skill body, anchors, and ledger

Write the score+gate skill: the multiplicative formula, the gate bands, the hard rule, the artifact template, and worked 1–5 anchors.

**Files:**
- Create: `.claude/skills/conviction-scoring/SKILL.md`
- Create: `.claude/skills/conviction-scoring/references/scoring-anchors.md`
- Create: `.claude/skills/conviction-scoring/knowledge/ledger.md`

**Interfaces:**
- Consumes: the signal inventory from `signal-harvest` (Task 6).
- Produces: `ventures/<slug>/research/conviction-signal.md` (the artifact enforced in Task 9) and a one-line demand+WTP handoff to `opportunity-scoring`.

- [ ] **Step 1: Write `SKILL.md`**

Create `.claude/skills/conviction-scoring/SKILL.md`:

```markdown
---
name: conviction-scoring
description: Use at G0 right after signal-harvest to score whether a demand signal carries conviction — frequency × intensity × willingness-to-pay × addressability — and gate PURSUE-worthiness BEFORE a full opportunity score. Triggers: "is this a real signal", "score the conviction", "should we validate this", any G0 scout pass.
when_to_use: the upstream G0 gate — converting a harvested signal inventory into a PASS/WEAK/FAIL conviction verdict and a validate-next shortlist, feeding demand+WTP evidence to opportunity-scoring.
allowed-tools: Read, Write
---

## Procedure
1. Take the signal inventory from `signal-harvest` (recurrence, intensity, WTP evidence, addressability, dated sources). If no inventory was run, say so — do not score conviction from memory.
2. For each candidate pain, score four factors **1–5 each, every score backed by a cited signal** (anchors: `references/scoring-anchors.md`):
   - **Frequency** — recurrence across *independent* sources (not one loud thread).
   - **Intensity** — emotional load / quantified time-cost ("we spend hours every week").
   - **WTP** — evidence they already pay (freelancer/tool) or explicitly say they would.
   - **Addressability** — can a solo/small team actually serve it, low-ops.
3. Combine **multiplicatively**: `product = F × I × W × A` (max 625), then `score = round(product / 6.25)` → 0–100.
4. **Gate** on the normalised score: **≥60 PASS** · **35–59 WEAK** · **<35 FAIL**. **Hard rule:** if ANY factor is 1, the verdict cannot be PASS regardless of the product (a missing bar kills conviction — a signal must clear several bars at once).
5. Write `ventures/<slug>/research/conviction-signal.md` (template: `references/scoring-anchors.md`):
   - the signal-inventory table,
   - the 4-factor scorecard per candidate (each cell cites a signal) + product + normalised score + verdict,
   - the **validate-next** shortlist: top 1–3 to test by fake-door landing page or direct outreach *before building*,
   - a one-line **handoff** to `opportunity-scoring`: the demand + WTP evidence (seeds its Demand 0.25 and Monetisation 0.20 dimensions).
6. **A WEAK/FAIL is a PARK on signal grounds** — report it so the scout can stop before spending tokens on full sizing/scoring. PASS → proceed to market-sizing/competitor/opportunity-scoring.

Conviction ≠ opportunity score: this gate asks "is the pain real, recurring, and paid?"; `opportunity-scoring` then asks "is it a good business?". Anchors & worked examples: `references/scoring-anchors.md`. Heuristics: `knowledge/ledger.md`.
```

- [ ] **Step 2: Write `references/scoring-anchors.md`**

Create `.claude/skills/conviction-scoring/references/scoring-anchors.md`:

```markdown
# Conviction scoring — 1–5 anchors, worked examples, artifact template

`score = round((F × I × W × A) / 6.25)` → 0–100. Bands: ≥60 PASS · 35–59 WEAK · <35 FAIL.
Hard rule: any factor = 1 ⇒ cannot PASS regardless of product.

## Factor anchors
**Frequency** (independent sources showing the same pain)
- 1 = one loud thread / single source. 3 = recurs across 2–3 independent sources.
- 5 = recurs across 4+ independent source *types* (e.g. reviews + jobs + HN + a marketplace).

**Intensity** (emotional load / quantified cost)
- 1 = mild preference ("would be nice"). 3 = clear frustration.
- 5 = quantified pain + a built workaround ("we spend ~6h/week; I built a spreadsheet/script to cope").

**WTP — willingness to pay**
- 1 = no payment evidence / expects free. 3 = pays for an adjacent tool, or says "I'd pay".
- 5 = already pays a freelancer/tool for this exact task (price point visible).

**Addressability** (solo/small-team, low-ops feasibility)
- 1 = needs enterprise sales / heavy ongoing ops / regulated build. 3 = doable with moderate ops.
- 5 = clear thin-slice MVP a solo/small team ships and runs low-touch.

## Worked examples
- F4·I5·W5·A4 = 400 → 64 → **PASS**. Recurs across reviews+jobs+HN, quantified pain + workaround,
  already paying a freelancer, clean SaaS slice. Validate next.
- F5·I4·W2·A4 = 160 → 26 → **FAIL**. Loud, frustrated, feasible — but no WTP (compliance "AVOID"
  economics, expects a free gov template). Missing bar; do not advance on demand alone.
- F2·I5·W4·A3 = 120 → 19 → **FAIL** (also F=2 is weak). One intense source ≠ a market.
- F4·I3·W3·A1 = 36 → 6 → **FAIL** by hard rule (A=1: not addressable by a small team).

## Artifact template — ventures/<slug>/research/conviction-signal.md
```
# Conviction signal — <slug>

## Signal inventory
| tier | signal (excerpt) | dated source | engagement | tell |
|---|---|---|---|---|
| ... | ... | ... | ... | ... |

Trend trajectory: <growing/flat/declining + seasonality>

## Conviction scorecard
| candidate pain | F | I | W | A | product | score | verdict |
|---|---|---|---|---|---|---|---|
| ... | 4 | 5 | 5 | 4 | 400 | 64 | PASS |
(each score cites a signal row above)

## Verdict: PASS | WEAK | FAIL
<one paragraph: why, and the load-bearing evidence>

## Validate next (before building)
1. <pain> — <fake-door landing page | outreach to N prospects> — success metric: <e.g. ≥X signups / ≥Y replies>

## Handoff to opportunity-scoring
Demand: <one line, cited>. WTP: <one line, cited>.
```
```

- [ ] **Step 3: Write `knowledge/ledger.md`**

Create `.claude/skills/conviction-scoring/knowledge/ledger.md`:

```markdown
# Knowledge ledger - conviction-scoring

> Dated, atomic heuristics and anti-patterns appended by the skill-curator after each venture.
> Entry format: `YYYY-MM-DD - <heuristic/anti-pattern> - evidence: <slug> - confidence: low|med|high (n=K)`
> The SKILL.md body loads only the most recent / highest-confidence entries; compact older ones into references/ periodically.

2026-06-24 - SEED: Multiplicative scoring is deliberate — a single missing bar (esp. WTP) must tank the verdict. AVOID-economics compliance plays repeatedly show strong F/I but WTP≤2; the hard rule (any factor=1 ⇒ no PASS) encodes "a signal must clear several bars at once." Watch for false PASS when F is inflated by one source echoed across reposts — require independent source *types*, not raw count. - evidence: design rationale (cross-ref signal-harvest buyer-economics heuristic) - confidence: low (n=0, seed)
```

- [ ] **Step 4: Verify the skill is well-formed**

Run: `python -c "import pathlib,sys; t=pathlib.Path('.claude/skills/conviction-scoring/SKILL.md').read_text(encoding='utf-8'); sys.exit(0 if t.startswith('---') and 'allowed-tools: Read, Write' in t else 1)"`
Expected: exit 0.

- [ ] **Step 5: Commit**

```bash
git add .claude/skills/conviction-scoring/
git commit -m "feat(conviction-scoring): formula, gate bands, anchors, artifact template

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 8: Enhance the `opportunity-scout` agent

Wire both skills into the agent as the G0 step-1 conviction gate, and require the artifact at gate exit.

**Files:**
- Modify: `.claude/agents/opportunity-scout.md`

**Interfaces:**
- Consumes: `signal-harvest`, `conviction-scoring` (Tasks 6–7).

- [ ] **Step 1: Update the `skills:` frontmatter list**

In `.claude/agents/opportunity-scout.md`, replace the `skills:` block:

```yaml
skills:
  - opportunity-scoring
  - demand-signals
  - market-sizing
  - competitor-teardown
```

with:

```yaml
skills:
  - signal-harvest
  - conviction-scoring
  - opportunity-scoring
  - market-sizing
  - competitor-teardown
```

- [ ] **Step 2: Insert the conviction gate as procedure step 1**

Replace the existing procedure step 2 line:

```
2. Pull the live demand snapshot (`demand-signals`) and size the market bottom-up (`market-sizing`). Cite every number to a dated source; if data is unavailable, say so — never invent figures.
```

with the two-step conviction-first flow (renumber the remaining steps so the list reads 1–6):

```
2. **Conviction gate (do this first).** Harvest demand signals (`signal-harvest`) into a tell-tagged inventory, then score it (`conviction-scoring`) → write `research/conviction-signal.md`. If the verdict is **WEAK/FAIL**, STOP and report a PARK on signal grounds — do not spend tokens on sizing/scoring. Only a **PASS** proceeds.
3. Size the market bottom-up (`market-sizing`), seeded by the conviction handoff. Cite every number to a dated source; if data is unavailable, say so — never invent figures.
```

(The original steps 3→"Tear down competitors", 4→"Score with opportunity-scoring", 5→"Name top-3 unknowns" become steps 4, 5, 6.)

- [ ] **Step 3: Update the gate-exit checklist**

In the "Gate exit criteria" list, add as the first checkbox:

```
- [ ] `research/conviction-signal.md` exists with a PASS verdict (a WEAK/FAIL is reported as a PARK, not advanced)
```

- [ ] **Step 4: Verify no stale `demand-signals` reference remains in the agent**

Run: `python -c "import pathlib,sys; t=pathlib.Path('.claude/agents/opportunity-scout.md').read_text(encoding='utf-8'); sys.exit(1 if 'demand-signals' in t else 0)"`
Expected: exit 0 (no `demand-signals` mention left in the agent).

- [ ] **Step 5: Commit**

```bash
git add .claude/agents/opportunity-scout.md
git commit -m "feat(opportunity-scout): run conviction gate (signal-harvest + conviction-scoring) at G0 step 1

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 9: Enforce the artifact + update opportunity-scoring handoff

Make the artifact gate require `conviction-signal.md`, and fix the one live cross-reference in `opportunity-scoring`.

**Files:**
- Modify: `ventures/_template/manifest.json`
- Modify: `.claude/skills/opportunity-scoring/SKILL.md`

- [ ] **Step 1: Add the artifact to G0 `required_artifacts`**

In `ventures/_template/manifest.json`, change the G0 line:

```json
    "G0": { "name": "scout", "type": "agent", "owner": "opportunity-scout", "status": "pending", "required_artifacts": ["research/opportunity-score.md"] },
```

to:

```json
    "G0": { "name": "scout", "type": "agent", "owner": "opportunity-scout", "status": "pending", "required_artifacts": ["research/conviction-signal.md", "research/opportunity-score.md"] },
```

- [ ] **Step 2: Verify the manifest is still valid JSON**

Run: `python -c "import json; json.load(open('ventures/_template/manifest.json', encoding='utf-8')); print('valid')"`
Expected: `valid`.

- [ ] **Step 3: Update the `opportunity-scoring` step-1 cross-reference**

In `.claude/skills/opportunity-scoring/SKILL.md`, replace:

```
1. Gather inputs for the idea: the demand snapshot (from the `demand-signals` skill if preloaded), market size, and 2–4 competitors with pricing. Cite every figure to a dated source; mark anything you cannot verify as "unverified — resolve at G1".
```

with:

```
1. Gather inputs for the idea: the conviction handoff (from `conviction-scoring` — demand + WTP evidence; this must be a PASS to be here), market size, and 2–4 competitors with pricing. Cite every figure to a dated source; mark anything you cannot verify as "unverified — resolve at G1".
```

- [ ] **Step 4: Verify the artifact gate behaves (red without the file, green with it)**

Run a throwaway check using the template (no venture is harmed):
```bash
python - <<'PY'
import json, pathlib, shutil, tempfile, subprocess, os
root = pathlib.Path.cwd()
tmp = pathlib.Path(tempfile.mkdtemp())
slug = "tmp-gate-check"
v = root / "ventures" / slug
shutil.copytree(root / "ventures" / "_template", v)
m = json.loads((v / "manifest.json").read_text(encoding="utf-8"))
m["slug"] = slug
(v / "manifest.json").write_text(json.dumps(m, indent=2), encoding="utf-8")
def check():
    r = subprocess.run(["python", ".claude/hooks/gate.py", "check", slug, "G0"],
                       capture_output=True, text=True)
    return r.stdout + r.stderr
print("BEFORE:", check().strip())          # expect blocked; missing conviction-signal.md + opportunity-score.md
(v / "research").mkdir(exist_ok=True)
(v / "research" / "conviction-signal.md").write_text("# stub", encoding="utf-8")
(v / "research" / "opportunity-score.md").write_text("# stub", encoding="utf-8")
print("AFTER :", check().strip())          # expect green
shutil.rmtree(v)
print("cleaned up", slug)
PY
```
Expected: `BEFORE` mentions `blocked` / `missing` including `research/conviction-signal.md`; `AFTER` shows `green`; prints `cleaned up tmp-gate-check`. Confirm `ventures/tmp-gate-check/` no longer exists (`ls ventures/ | grep tmp-gate-check` → no output).

- [ ] **Step 5: Commit**

```bash
git add ventures/_template/manifest.json .claude/skills/opportunity-scoring/SKILL.md
git commit -m "feat(g0): enforce conviction-signal.md as a G0 required artifact; update scoring handoff

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 10: Retire the `demand-signals` skill

Heuristics were migrated in Task 6; remove the skill and clean up the remaining live references. Leave historical artifacts untouched.

**Files:**
- Delete: `.claude/skills/demand-signals/` (whole dir)
- Modify: `SECRETS.md` (lines ~13 and ~21)
- Modify: `.env.example`

- [ ] **Step 1: Confirm the ledger heuristics were migrated**

Run: `python -c "import pathlib; a=pathlib.Path('.claude/skills/demand-signals/knowledge/ledger.md').read_text(encoding='utf-8'); b=pathlib.Path('.claude/skills/signal-harvest/knowledge/ledger.md').read_text(encoding='utf-8'); print('asleep-incumbent migrated:', 'asleep-incumbent meta-filter' in b or 'asleep-incumbent' in b); print('buyer-economics migrated:', 'SAVE money' in b)"`
Expected: both `True`. (If not, complete Task 6 step 3 before deleting.)

- [ ] **Step 2: Delete the skill directory**

```bash
git rm -r .claude/skills/demand-signals
```

- [ ] **Step 3: Update `SECRETS.md`**

In `SECRETS.md`, line ~13, replace `DEMAND_SIGNALS_API_KEY` with the new optional collector vars. Change:

```
| Scout / advisor / analyst (G0–G1) | research/data API keys only (e.g. `DEMAND_SIGNALS_API_KEY`); **no** prod credentials |
```

to:

```
| Scout / advisor / analyst (G0–G1) | research/data API keys only (e.g. optional `GITHUB_TOKEN`, `STACKEX_KEY` for higher harvest rate-limits); **no** prod credentials |
```

And line ~21, change:

```
See `.env.example`. The dynamic-injection scripts (`demand-signals`, `unit-economics`) read their key from the environment and **fail gracefully** (print `DATA UNAVAILABLE`) when it's absent — so the crew runs without secrets, just with less live data.
```

to:

```
See `.env.example`. The dynamic-injection scripts (`signal-harvest`, `unit-economics`) read any keys from the environment and **fail gracefully** (print `DATA UNAVAILABLE`) when absent — so the crew runs without secrets, just with less live data. `signal-harvest` works fully keyless; `GITHUB_TOKEN`/`STACKEX_KEY` only raise rate limits.
```

- [ ] **Step 4: Update `.env.example`**

Open `.env.example`, find the `DEMAND_SIGNALS_API_KEY` line and replace it with the new optional vars (keep the file's existing comment style):

```
# signal-harvest (G0) — all collectors work keyless; these only raise rate limits (optional)
GITHUB_TOKEN=
STACKEX_KEY=
# Future signal-harvest collectors (not yet wired): REDDIT_CLIENT_ID/REDDIT_SECRET, PRODUCT_HUNT_TOKEN
```

- [ ] **Step 5: Verify no stale live references remain**

Run: `python -c "import subprocess,sys; r=subprocess.run(['git','grep','-l','demand-signals'],capture_output=True,text=True); files=[f for f in r.stdout.split() if not f.startswith('ventures/') and f not in ('passive-income-agent-team-implementation-plan.md','docs/superpowers/specs/2026-06-24-g0-conviction-signal-design.md','docs/superpowers/plans/2026-06-24-g0-conviction-signal.md')]; print('STALE LIVE REFS:', files); sys.exit(1 if files else 0)"`
Expected: `STALE LIVE REFS: []`, exit 0. (Per-venture artifacts, the historical implementation-plan, and these spec/plan docs are allowed to retain the name.)

- [ ] **Step 6: Run the full script test suite once more (regression)**

Run: `python .claude/skills/signal-harvest/scripts/test_harvest_signals.py`
Expected: `OK (0 failure(s))`.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "chore: retire demand-signals skill (folded into signal-harvest); update secrets/env refs

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

## Self-Review

**Spec coverage:**
- Component 1 `signal-harvest` skill → Task 6. ✓
- Component 2 `conviction-scoring` skill → Task 7. ✓
- Component 3 `harvest_signals.py` (4 keyless collectors, tells.json, fail-graceful, gzip, injection-safe, read-only) → Tasks 1–5. ✓
- Component 4 enhance `opportunity-scout` → Task 8. ✓
- Component 5 enforcement (G0 required_artifacts) → Task 9. ✓
- Component 6 retire `demand-signals` (migrate heuristics first) → Tasks 6 (migrate) + 10 (delete). ✓
- Component 7 housekeeping (references + ledgers, /new-skill conventions) → Tasks 6, 7. ✓
- Gate bands ≥60/35–59/<35 + factor=1 hard rule → Task 7 SKILL.md + anchors. ✓
- No-scrape / guided WebSearch tiers → Task 6 SKILL.md + source-tiers.md. ✓
- Reddit/PH extension hooks documented, not wired → Task 4 (env reads absent) + Task 6 SKILL.md + Task 10 .env.example note. ✓
- Testing (script unit, fail-graceful, gate integration) → Tasks 1–5 tests + Task 9 step 4. ✓

**Placeholder scan:** No TBD/TODO/"handle edge cases"; every code step shows complete code; every command has expected output. ✓

**Type/name consistency:** `make_record(source,url,date,text,engagement,tells)`, `tag_tells(text,tells)`, `dedupe`, `parse_hn/parse_github/parse_google/parse_stackexchange`, `collect_hn/collect_github/collect_google/collect_stackexchange`, `run_collectors`, `format_digest`, `http_get_json(url,headers,timeout,_urlopen)`, `COLLECTORS` — used consistently across Tasks 1–5 and the tests. `collect_google` (not `collect_google_autocomplete`) used everywhere. ✓
- Note resolved: the `_run` harness is introduced in Task 1 and **replaced wholesale** in Task 5 (the plan says "replace the existing `_run` body") to add the `monkeypatch_collectors` fixture — not two divergent copies.
```
