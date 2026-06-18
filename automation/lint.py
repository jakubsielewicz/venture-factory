#!/usr/bin/env python3
"""Structural lint for the venture-factory crew.

Catches the classes of mistake we have hit by hand: invalid agent tool specs
(comma-packed Agent()), missing/oversized skill frontmatter, missing curator
ledgers, malformed JSON, and broken venture template/schema. Dependency-free.

Run: python automation/lint.py   (exit 0 = clean, 1 = issues found)
"""
from __future__ import annotations

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SKILLS = ROOT / ".claude" / "skills"
AGENTS = ROOT / ".claude" / "agents"

issues: list = []
checked = {"skills": 0, "agents": 0, "json": 0}


def err(msg: str) -> None:
    issues.append(msg)


def frontmatter(text: str):
    m = re.match(r"^---\n(.*?)\n---\n", text, re.S)
    return m.group(1) if m else None


def fm_value(fm: str, key: str):
    """Single-line scalar value for `key:` in a frontmatter block (best-effort)."""
    m = re.search(rf"^{re.escape(key)}:[ \t]*(.+)$", fm, re.M)
    return m.group(1).strip().strip("'\"") if m else None


def lint_skills() -> None:
    if not SKILLS.is_dir():
        return
    for d in sorted(p for p in SKILLS.iterdir() if p.is_dir()):
        checked["skills"] += 1
        sk = d / "SKILL.md"
        if not sk.exists():
            err(f"skill '{d.name}': missing SKILL.md")
            continue
        fm = frontmatter(sk.read_text(encoding="utf-8"))
        if fm is None:
            err(f"skill '{d.name}': no YAML frontmatter")
            continue
        name = fm_value(fm, "name")
        desc = fm_value(fm, "description")
        when = fm_value(fm, "when_to_use") or ""
        if not name:
            err(f"skill '{d.name}': frontmatter missing name")
        if not desc:
            err(f"skill '{d.name}': frontmatter missing description")
        if desc and len((desc + " " + when).strip()) > 1536:
            err(f"skill '{d.name}': description + when_to_use exceeds 1536 chars "
                f"({len((desc + ' ' + when).strip())}) - it will be truncated in the listing")
        if not (d / "knowledge" / "ledger.md").exists():
            err(f"skill '{d.name}': missing knowledge/ledger.md (curator has no home)")


AGENT_RE = re.compile(r"Agent\(([^)]*)\)")


def lint_agents() -> None:
    if not AGENTS.is_dir():
        return
    for f in sorted(AGENTS.glob("*.md")):
        checked["agents"] += 1
        fm = frontmatter(f.read_text(encoding="utf-8"))
        if fm is None:
            err(f"agent '{f.stem}': no YAML frontmatter")
            continue
        if not fm_value(fm, "name"):
            err(f"agent '{f.stem}': frontmatter missing name")
        if not fm_value(fm, "description"):
            err(f"agent '{f.stem}': frontmatter missing description")
        tools = fm_value(fm, "tools") or ""
        for inner in AGENT_RE.findall(tools):
            if "," in inner:
                err(f"agent '{f.stem}': comma-packed Agent({inner.strip()}) - the tool "
                    f"grammar splits on commas; use separate tokens: "
                    f"{', '.join('Agent(' + t.strip() + ')' for t in inner.split(','))}")


def lint_json() -> None:
    for j in sorted(ROOT.glob(".claude/**/*.json")) + sorted(ROOT.glob("ventures/_*/**/*.json")) \
            + sorted(ROOT.glob(".claude-plugin/*.json")):
        if "node_modules" in j.parts or "dist" in j.parts:
            continue
        checked["json"] += 1
        try:
            json.loads(j.read_text(encoding="utf-8"))
        except Exception as e:
            err(f"invalid JSON: {j.relative_to(ROOT).as_posix()}: {e}")


def lint_template() -> None:
    m = ROOT / "ventures" / "_template" / "manifest.json"
    if not m.exists():
        err("ventures/_template/manifest.json missing")
        return
    try:
        d = json.loads(m.read_text(encoding="utf-8"))
    except Exception:
        return  # already reported by lint_json
    for key in ("slug", "current_gate", "status", "budget", "gates"):
        if key not in d:
            err(f"_template/manifest.json: missing required key '{key}'")
    for b in ("token_budget_total", "tokens_spent", "api_spend_cap_usd", "api_spend_usd"):
        if b not in d.get("budget", {}):
            err(f"_template/manifest.json: budget missing '{b}'")


def main() -> int:
    lint_skills()
    lint_agents()
    lint_json()
    lint_template()
    print(f"lint: checked {checked['skills']} skills, {checked['agents']} agents, "
          f"{checked['json']} JSON files")
    if issues:
        print(f"\n{len(issues)} ISSUE(S):")
        for i in issues:
            print(f"  - {i}")
        return 1
    print("OK - no issues")
    return 0


if __name__ == "__main__":
    sys.exit(main())
