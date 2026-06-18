#!/usr/bin/env python3
"""Committed regression tests for the deterministic guardrails (guard.py, gate.py,
spend.py). Runs each hook against an ISOLATED temp project (its own ventures/),
so it never touches the real repo and is safe in CI.

Run: python .claude/hooks/test_guard.py   (exit 0 = all pass, 1 = a failure)
"""
from __future__ import annotations

import json
import os
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

HOOKS = Path(__file__).resolve().parent
ROOT = HOOKS.parent.parent
TEMPLATE = ROOT / "ventures" / "_template"
GUARD, GATE, SPEND = HOOKS / "guard.py", HOOKS / "gate.py", HOOKS / "spend.py"

_fail = 0


def check(label: str, ok: bool, extra: str = "") -> None:
    global _fail
    print(f"  [{'PASS' if ok else 'FAIL'}] {label}" + (f" :: {extra}" if extra and not ok else ""))
    if not ok:
        _fail += 1


def main() -> int:
    proj = Path(tempfile.mkdtemp(prefix="vf-test-"))
    try:
        (proj / "ventures").mkdir()
        vdir = proj / "ventures" / "demo"
        shutil.copytree(TEMPLATE, vdir)
        env = dict(os.environ, CLAUDE_PROJECT_DIR=str(proj), VF_ACTIVE_VENTURE="demo")

        def guard(event: dict):
            p = subprocess.run([sys.executable, str(GUARD)], input=json.dumps(event),
                               text=True, capture_output=True, env=env)
            out = p.stdout.strip()
            if not out:
                return "allow", ""
            d = json.loads(out)["hookSpecificOutput"]
            return d["permissionDecision"], d.get("permissionDecisionReason", "")

        def gate(*args):
            p = subprocess.run([sys.executable, str(GATE), *args], text=True,
                               capture_output=True, env=env)
            return p.returncode, p.stdout + p.stderr

        def spend(*args):
            p = subprocess.run([sys.executable, str(SPEND), *args], text=True,
                               capture_output=True, env=env)
            return p.returncode, p.stdout + p.stderr

        def gpath(*parts):
            return str(vdir.joinpath(*parts)).replace("\\", "/")

        def manifest():
            return json.loads((vdir / "manifest.json").read_text(encoding="utf-8"))

        print("guard - gate-file protection & command classification")
        dec, _ = guard({"tool_name": "Write", "tool_input": {"file_path": gpath("gates", "G5-test.json")}})
        check("Write to gates/ is denied", dec == "deny")
        dec, _ = guard({"tool_name": "Write", "tool_input": {"file_path": gpath("research", "x.md")}})
        check("Write to research/ is allowed", dec == "allow")
        dec, _ = guard({"tool_name": "Bash", "tool_input": {"command": "ls -la"}})
        check("benign bash is allowed", dec == "allow")
        dec, _ = guard({"tool_name": "Bash", "tool_input": {"command": 'echo "docker push x"'}})
        check("deploy keyword inside quotes is allowed", dec == "allow")
        dec, _ = guard({"tool_name": "Bash", "tool_input": {"command": "ls  # docker push later"}})
        check("deploy keyword in a comment is allowed", dec == "allow")
        dec, _ = guard({"tool_name": "Bash", "tool_input": {"command": "docker push x"}})
        check("real deploy (G6 pending) is denied", dec == "deny")
        dec, _ = guard({"tool_name": "Bash", "tool_input": {"command": "aws s3 create-bucket --bucket x"}})
        check("spend without G2 is denied", dec == "deny")
        dec, _ = guard({"tool_name": "Bash", "tool_input": {"command": "rm -rf /"}})
        check("hard-deny (rm -rf /) is denied", dec == "deny")

        print("gate.py - artifact & test gates")
        rc, _ = gate("check", "demo", "G0")
        check("G0 check before artifact is blocked (rc!=0)", rc != 0)
        (vdir / "research").mkdir(exist_ok=True)
        (vdir / "research" / "opportunity-score.md").write_text("x", encoding="utf-8")
        rc, _ = gate("check", "demo", "G0")
        check("G0 check after artifact is green (rc==0)", rc == 0)
        (vdir / "check_pass.py").write_text("import sys; sys.exit(0)\n", encoding="utf-8")
        (vdir / "check_fail.py").write_text("import sys; sys.exit(1)\n", encoding="utf-8")
        rc, _ = gate("test", "demo", "--command", "python check_fail.py")
        g5 = json.loads((vdir / "gates" / "G5-test.json").read_text(encoding="utf-8"))
        check("failing tests -> G5 red (rc!=0)", rc != 0 and g5["status"] == "red")
        rc, _ = gate("test", "demo", "--command", "python check_pass.py")
        g5 = json.loads((vdir / "gates" / "G5-test.json").read_text(encoding="utf-8"))
        check("passing tests -> G5 green, set_by=gate.py", rc == 0 and g5["status"] == "green"
              and g5["set_by"] == "gate.py")
        rc, _ = gate("check", "nope", "G0")
        check("missing venture fails closed (rc!=0)", rc != 0)
        rc, _ = gate("check", "demo", "G9")
        check("gate not in manifest fails closed (rc!=0)", rc != 0)

        print("guard - deploy freshness + human G6 gate")
        g6 = json.loads((vdir / "gates" / "G6-operate.json").read_text(encoding="utf-8"))
        g6["status"] = "approved"
        (vdir / "gates" / "G6-operate.json").write_text(json.dumps(g6), encoding="utf-8")
        dec, _ = guard({"tool_name": "Bash", "tool_input": {"command": "docker push x"}})
        check("deploy allowed when G5 green+fresh AND G6 approved", dec == "allow")

        print("spend.py - budget accounting + guard enforcement")
        spend("add", "demo", "--tokens", "1000")
        check("spend add increments tokens_spent", manifest()["budget"]["tokens_spent"] == 1000)
        hook_ev = {"model_input_tokens": 500, "model_output_tokens": 700,
                   "cwd": str(proj), "agent_type": "builder"}
        p = subprocess.run([sys.executable, str(SPEND), "from-hook"], input=json.dumps(hook_ev),
                           text=True, capture_output=True, env=env)
        check("from-hook adds model_input+output tokens",
              manifest()["budget"]["tokens_spent"] == 2200, p.stdout + p.stderr)
        m = manifest(); m["budget"]["token_budget_total"] = 1000
        (vdir / "manifest.json").write_text(json.dumps(m), encoding="utf-8")
        dec, reason = guard({"tool_name": "Bash", "tool_input": {"command": "docker push x"}})
        check("deploy denied once over token budget (even with G6 approved)",
              dec == "deny" and "budget" in reason.lower())

        print(f"\n{'ALL PASS' if not _fail else str(_fail) + ' FAILURE(S)'}")
        return 1 if _fail else 0
    finally:
        shutil.rmtree(proj, ignore_errors=True)


if __name__ == "__main__":
    sys.exit(main())
