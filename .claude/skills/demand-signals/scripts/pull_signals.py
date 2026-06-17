#!/usr/bin/env python3
"""Pull a live demand snapshot for the active venture's theme.

Fails gracefully (plan rule): prints a `DATA UNAVAILABLE` marker and exits 0 if
it can't get real data, so the skill still works on model knowledge. Reads the
theme from the venture's manifest/brief — NOT from an interpolated argument — to
avoid shell injection.
"""
from __future__ import annotations

import json
import os
import pathlib
import sys


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


def main() -> int:
    theme = active_theme()
    if not theme:
        print("DATA UNAVAILABLE: no active venture/theme found (set VF_ACTIVE_VENTURE).")
        return 0
    key = os.environ.get("DEMAND_SIGNALS_API_KEY")
    if not key:
        print(f"DATA UNAVAILABLE: no DEMAND_SIGNALS_API_KEY set; cannot pull live signals for: {theme}")
        print("Fall back to web searches for demand evidence and note the snapshot was unavailable.")
        return 0
    # TODO (Phase 1+): wire a real trends/SEO/marketplace API here using `key` and `theme`.
    print(f"DATA UNAVAILABLE: live demand source not yet wired (theme: {theme}).")
    return 0


if __name__ == "__main__":
    sys.exit(main())
