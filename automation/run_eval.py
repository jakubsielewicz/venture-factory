#!/usr/bin/env python3
"""Re-run frozen golden cases through opportunity-scoring to catch judgment drift
after skill-curator edits. A DELIBERATE tool — it makes real LLM calls via the
Agent SDK (not for CI).

  pip install claude-agent-sdk
  export ANTHROPIC_API_KEY=...
  python automation/run_eval.py            # exit 0 = all cases within expected bands
"""
from __future__ import annotations

import asyncio
import json
import re
import sys
from pathlib import Path

try:
    from claude_agent_sdk import query, ClaudeAgentOptions
except ImportError:
    sys.exit("claude-agent-sdk not installed. Run: pip install claude-agent-sdk")

ROOT = Path(__file__).resolve().parent.parent
EVAL = ROOT / "ventures" / "_eval"
CASES = EVAL / "cases"

PROMPT = (
    "Use the opportunity-scoring skill to score this idea. Do your normal reasoning, "
    "then output ONLY a single JSON object on the FINAL line: "
    '{{"verdict":"PURSUE|PARK|KILL","score":<0-100 integer>,"flags":["short reason", ...]}}. '
    "Idea: {idea}"
)

JSON_RE = re.compile(r"\{[^{}]*\"verdict\"[^{}]*\}", re.S)


async def score(idea: str) -> dict:
    opts = ClaudeAgentOptions(
        cwd=str(ROOT),
        setting_sources=["project"],
        allowed_tools=["Read", "Glob", "Grep", "WebSearch", "WebFetch", "Skill", "Bash"],
        permission_mode="default",
    )
    out = ""
    async for m in query(prompt=PROMPT.format(idea=idea), options=opts):
        out += str(m)
    matches = JSON_RE.findall(out)
    if not matches:
        return {"verdict": "?", "score": None, "flags": [], "_parse_error": True}
    try:
        return json.loads(matches[-1])
    except Exception:
        return {"verdict": "?", "score": None, "flags": [], "_parse_error": True}


def judge(case: dict, got: dict):
    e = case["expect"]
    ok, notes = True, []
    if got.get("verdict") != e.get("verdict"):
        ok = False
        notes.append(f"verdict {got.get('verdict')} != {e.get('verdict')}")
    s = got.get("score")
    if isinstance(s, (int, float)):
        if "score_min" in e and s < e["score_min"]:
            ok = False
            notes.append(f"score {s} < {e['score_min']}")
        if "score_max" in e and s > e["score_max"]:
            ok = False
            notes.append(f"score {s} > {e['score_max']}")
    for f in e.get("must_flag", []):
        if not any(f.lower() in str(x).lower() for x in got.get("flags", [])):
            ok = False
            notes.append(f"missing flag ~'{f}'")
    return ok, notes


async def main() -> int:
    cases = [json.loads(p.read_text(encoding="utf-8")) for p in sorted(CASES.glob("*.json"))]
    if not cases:
        print("no eval cases found in ventures/_eval/cases/")
        return 0
    results, fails = [], 0
    for c in cases:
        got = await score(c["idea"])
        ok, notes = judge(c, got)
        fails += 0 if ok else 1
        print(f"[{'PASS' if ok else 'FAIL'}] {c['id']}: "
              f"verdict={got.get('verdict')} score={got.get('score')}"
              + (f"  -> {'; '.join(notes)}" if notes else ""))
        results.append({"id": c["id"], "got": got, "ok": ok, "notes": notes})
    (EVAL / "results").mkdir(exist_ok=True)
    (EVAL / "results" / "latest.json").write_text(json.dumps(results, indent=2), encoding="utf-8")
    print(f"\n{len(cases) - fails}/{len(cases)} cases passed")
    return 1 if fails else 0


if __name__ == "__main__":
    sys.exit(asyncio.run(main()))
