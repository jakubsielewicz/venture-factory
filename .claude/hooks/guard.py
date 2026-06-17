#!/usr/bin/env python3
"""PreToolUse guard for the venture-factory.

Registered in .claude/settings.json for the Bash and Write|Edit|MultiEdit tools.
Reads the hook event JSON on stdin and decides whether to allow or deny the call.

Deterministic guardrails (independent of what the model "decides"):
  1. The model may NOT write or edit anything under ventures/<slug>/gates/.
     Gate state is written only by gate.py from real evidence (e.g. the actual
     test exit code), so a subagent cannot fake a green gate.
  2. Deploy / publish commands are denied unless the venture's G5 test gate is
     GREEN and FRESH (its source fingerprint matches the current build) AND the
     G6 deploy gate has been human-approved.
  3. Resource-creation / spend commands are denied unless the G2 gate has been
     human-approved AND the venture is within budget. (Defence in depth: these
     tools are also kept off the auto-allow list so they prompt a human.)
  4. A handful of always-dangerous commands are hard-denied.

Decision protocol (https://code.claude.com/docs/en/hooks):
  - exit 0, no stdout            -> no decision; normal permission flow applies
  - exit 0 + permissionDecision  -> the hook's decision is honoured
"""
from __future__ import annotations

import json
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import _vf  # noqa: E402

# --- command classification --------------------------------------------------

DEPLOY_PATTERNS = [re.compile(p) for p in [
    r"\bterraform\s+apply\b",
    r"\bpulumi\s+up\b",
    r"\bkubectl\s+apply\b",
    r"\bhelm\s+(install|upgrade)\b",
    r"\bserverless\s+deploy\b",
    r"\bvercel\b.*(deploy|--prod)",
    r"\bnetlify\s+deploy\b",
    r"\b(fly|flyctl)\s+deploy\b",
    r"\bwrangler\s+(deploy|publish)\b",
    r"\bgcloud\s+(run\s+deploy|app\s+deploy|functions\s+deploy)\b",
    r"\baws\s+(deploy|s3\s+sync|cloudformation\s+(deploy|create-stack)|ecs\s+update-service|lambda\s+update-function-code)\b",
    r"\beb\s+deploy\b",
    r"\bdocker\s+push\b",
]]

SPEND_PATTERNS = [re.compile(p) for p in [
    r"\bterraform\s+apply\b",
    r"\bpulumi\s+up\b",
    r"\baws\s+\w+\s+create",
    r"\bgcloud\s+\w+\s+create",
    r"\baz\s+\w+\s+create",
    r"\bstripe\b.*(--live|\blive\b)",
    r"\bgh\s+repo\s+create\b",
    r"\bnpm\s+publish\b",
    r"\btwine\s+upload\b",
]]

HARD_DENY = [(re.compile(p, re.I), why) for p, why in [
    (r"rm\s+-rf\s+(/|~)(\s|$|/)", "recursive delete of a root/home path"),
    (r":\(\)\s*\{.*\}\s*;\s*:", "fork bomb"),
    (r"git\s+push\s+[^\n]*(--force|-f)\b[^\n]*\b(main|master)\b", "force-push to main/master"),
    (r"\b(curl|wget)\b[^\n]*\|\s*(sudo\s+)?(ba)?sh\b", "pipe-to-shell of remote content"),
]]

GATES_RE = re.compile(r"/ventures/[^/]+/gates/")


def _scannable(cmd: str) -> str:
    """Strip comments and quoted spans so a deploy/spend keyword sitting inside
    an echoed string or a '#' comment doesn't trip classification. Real,
    unquoted commands are unaffected (e.g. `docker push x` still matches, but
    `echo "docker push x"` and `# docker push x` no longer do)."""
    no_comments = re.sub(r"#[^\n]*", " ", cmd)
    no_dquotes = re.sub(r'"(?:[^"\\]|\\.)*"', " ", no_comments)
    no_squotes = re.sub(r"'(?:[^'\\]|\\.)*'", " ", no_dquotes)
    return no_squotes


def deny(reason: str):
    print(json.dumps({"hookSpecificOutput": {
        "hookEventName": "PreToolUse",
        "permissionDecision": "deny",
        "permissionDecisionReason": reason,
    }}))
    sys.exit(0)


def allow():
    # No output => no decision => normal permission flow applies.
    sys.exit(0)


def main():
    raw = sys.stdin.read()
    try:
        event = json.loads(raw) if raw.strip() else {}
    except Exception:
        allow()  # never break the session on malformed hook input

    tool = event.get("tool_name", "")
    ti = event.get("tool_input", {}) or {}
    cwd = event.get("cwd")

    # 1. Protect gate files from any model-driven write/edit.
    if tool in ("Write", "Edit", "MultiEdit"):
        fp = ti.get("file_path") or ti.get("filePath") or ""
        norm = "/" + fp.replace("\\", "/").lstrip("/")
        if GATES_RE.search(norm) or norm.rstrip("/").endswith("/gates"):
            deny("Gate files are written only by .claude/hooks/gate.py from real "
                 "evidence (e.g. the actual test exit code), or approved by a human "
                 "editing them outside the agent session. Run "
                 "`python .claude/hooks/gate.py test <slug>` (G5) or "
                 "`python .claude/hooks/gate.py check <slug> <Gn>` (artifact gates).")
        allow()

    if tool != "Bash":
        allow()

    cmd = ti.get("command", "") or ""
    scan = _scannable(cmd)
    low = scan.lower()

    # 2. Hard denies. Evaluated on the de-quoted command so a keyword inside an
    #    echo/comment doesn't trigger (e.g. `echo "docker push ..."`).
    for pat, why in HARD_DENY:
        if pat.search(scan):
            deny(f"Blocked by the venture-factory guard ({why}). If this is "
                 f"genuinely required, a human must run it outside the agent session.")

    is_deploy = any(p.search(low) for p in DEPLOY_PATTERNS)
    is_spend = any(p.search(low) for p in SPEND_PATTERNS)
    if not (is_deploy or is_spend):
        allow()

    # 3. Side-effecting command: resolve the venture and enforce gates + budget.
    slug = _vf.active_venture(cwd)
    if not slug:
        deny("A deploy/spend command was attempted but no active venture is set. "
             "Set VF_ACTIVE_VENTURE=<slug> (or run from inside ventures/<slug>/) so "
             "the guard can check that venture's gates and budget.")

    manifest = _vf.load_json(_vf.venture_dir(slug) / "manifest.json") or {}
    budget = manifest.get("budget", {}) or {}
    spent, cap = budget.get("api_spend_usd", 0), budget.get("api_spend_cap_usd")
    if cap is not None and spent is not None and spent >= cap:
        deny(f"Venture '{slug}' has reached its API spend cap (${spent} / ${cap}). "
             f"A human must raise it in ventures/{slug}/manifest.json.")
    tok, tok_cap = budget.get("tokens_spent", 0), budget.get("token_budget_total")
    if tok_cap is not None and tok is not None and tok >= tok_cap:
        deny(f"Venture '{slug}' has reached its token budget ({tok} / {tok_cap}). "
             f"A human must raise it in ventures/{slug}/manifest.json.")

    if is_spend:
        g2 = _vf.load_json(_vf.gate_path(slug, "G2-decide.json")) or {}
        if g2.get("status") not in ("approved", "green"):
            deny(f"Resource-creation/spend is blocked: venture '{slug}' has not "
                 f"passed the G2 human go/no-go + spend gate "
                 f"(gates/G2-decide.json is '{g2.get('status', 'missing')}'). "
                 f"A human must approve G2 first.")
        allow()  # approved and within budget

    if is_deploy:
        g5 = _vf.load_json(_vf.gate_path(slug, "G5-test.json")) or {}
        if g5.get("status") != "green":
            deny(f"Deploy blocked: the G5 test gate for '{slug}' is "
                 f"'{g5.get('status', 'missing')}', not green. Run "
                 f"`python .claude/hooks/gate.py test {slug}` and make tests pass first.")
        stored = (g5.get("evidence") or {}).get("source_fingerprint")
        current = _vf.source_fingerprint(slug)
        if stored != current:
            deny(f"Deploy blocked: the G5 test gate for '{slug}' is STALE — the "
                 f"source changed since tests last passed (gate fingerprint {stored}, "
                 f"current {current}). Re-run `python .claude/hooks/gate.py test {slug}`.")
        g6 = _vf.load_json(_vf.gate_path(slug, "G6-operate.json")) or {}
        if g6.get("status") not in ("approved", "green"):
            deny(f"Deploy blocked: venture '{slug}' has not passed the G6 human deploy "
                 f"approval (gates/G6-operate.json is '{g6.get('status', 'missing')}'). "
                 f"A human must approve the deploy.")
        allow()

    allow()


if __name__ == "__main__":
    main()
