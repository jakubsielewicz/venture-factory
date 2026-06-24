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
TELLS_PATH = pathlib.Path(__file__).resolve().parent.parent / "references" / "tells.json"


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
