#!/usr/bin/env python3
"""Unattended nightly G0 opportunity sweep via the Claude Agent SDK.

Runs the opportunity-scout across a theme, scores candidates, writes briefs to
ventures/, and stops before G1 — no spend, no deploy. Intended for cron.

The .claude/settings.json hooks (the deploy/spend guard) load via setting_sources,
so the deterministic guardrails apply even in this unattended run.

Setup:
  pip install claude-agent-sdk
  export ANTHROPIC_API_KEY=...                  # or your configured auth
  python automation/nightly_scout.py "compliance automation for AU SMEs"

Cron (run nightly at 02:00):
  0 2 * * *  cd /path/to/venture-factory && python automation/nightly_scout.py "your theme" >> automation/scout.log 2>&1
"""
from __future__ import annotations

import asyncio
import pathlib
import sys

try:
    from claude_agent_sdk import query, ClaudeAgentOptions
except ImportError:
    sys.exit("claude-agent-sdk not installed. Run: pip install claude-agent-sdk")

REPO = str(pathlib.Path(__file__).resolve().parent.parent)


async def nightly_scout(theme: str) -> None:
    options = ClaudeAgentOptions(
        cwd=REPO,
        # Load .claude/agents + .claude/skills + settings (incl. the guard hooks) from disk.
        setting_sources=["project"],
        # Read-mostly + delegation. NO deploy/spend tools in the unattended loop;
        # the guard hook blocks them anyway, but keep the surface small.
        allowed_tools=["Read", "Write", "Glob", "Grep", "WebSearch", "WebFetch", "Bash", "Skill", "Agent"],
        permission_mode="default",
    )
    prompt = (
        f"Run G0 (opportunity-scout) across the theme '{theme}'. "
        "For each promising idea: create a venture under ventures/<slug>/ from ventures/_template/, "
        "score it with the opportunity-scoring skill, and write the brief + research/opportunity-score.md. "
        "Produce a one-line go/no-go shortlist across the ideas. "
        "Do NOT proceed past G1, and do NOT spend or deploy — stop and leave everything for human review."
    )
    async for message in query(prompt=prompt, options=options):
        print(message)


if __name__ == "__main__":
    theme = " ".join(sys.argv[1:]) or "low-ops B2B micro-SaaS for regulated SMEs"
    asyncio.run(nightly_scout(theme))
