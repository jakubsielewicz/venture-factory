#!/usr/bin/env python3
"""Assemble the venture-factory crew into an installable Claude Code plugin.

Copies the in-place `.claude/{agents,skills,commands,hooks}` into a self-contained
plugin layout under `dist/venture-factory/`, alongside `.claude-plugin/plugin.json`,
so the whole crew can be published to a marketplace and installed into any repo.

The in-place project keeps its components under `.claude/` (how Claude Code loads a
project); a plugin needs them at the plugin ROOT — this script bridges the two.
"""
from __future__ import annotations

import pathlib
import shutil
import sys

REPO = pathlib.Path(__file__).resolve().parent.parent
SRC = REPO / ".claude"
DIST = REPO / "dist" / "venture-factory"
IGNORE = shutil.ignore_patterns("__pycache__", "*.pyc")


def main() -> int:
    manifest = REPO / ".claude-plugin" / "plugin.json"
    if not manifest.exists():
        print("missing .claude-plugin/plugin.json", file=sys.stderr)
        return 1

    if DIST.exists():
        shutil.rmtree(DIST)
    DIST.mkdir(parents=True)

    # Plugin components live at the plugin ROOT (not under .claude/).
    for comp in ("agents", "skills", "commands", "hooks"):
        s = SRC / comp
        if s.is_dir():
            shutil.copytree(s, DIST / comp, ignore=IGNORE)

    (DIST / ".claude-plugin").mkdir()
    shutil.copy2(manifest, DIST / ".claude-plugin" / "plugin.json")

    n_agents = len(list((DIST / "agents").glob("*.md"))) if (DIST / "agents").is_dir() else 0
    n_skills = len(list((DIST / "skills").glob("*/SKILL.md"))) if (DIST / "skills").is_dir() else 0
    n_cmds = len(list((DIST / "commands").glob("*.md"))) if (DIST / "commands").is_dir() else 0
    print(f"built plugin at {DIST.relative_to(REPO).as_posix()}: "
          f"{n_agents} agents, {n_skills} skills, {n_cmds} commands")
    print("install: publish dist/venture-factory to a marketplace, or copy it into a target repo's plugins dir.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
