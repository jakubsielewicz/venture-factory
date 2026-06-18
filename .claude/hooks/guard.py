#!/usr/bin/env python3
"""PreToolUse guard for the venture-factory.

Registered in .claude/settings.json for Bash, Write|Edit|MultiEdit, and mcp__.*
tools. Reads the hook event JSON on stdin and decides allow/deny.

Deterministic guardrails (independent of what the model "decides"):
  1. The model may NOT write/edit ventures/<slug>/gates/ — gate state is written
     only by gate.py from real evidence.
  2. Deploy/publish commands are denied unless the relevant human gate is approved
     and tests are green+fresh (deploy) — see below.
  3. Resource-creation/spend is denied unless G2 is approved and within budget.
  4. Publishing/sending (social, email, ads — via Bash or an MCP send/post tool)
     is denied within a venture unless gates/marketing-publish.json is approved.
  5. Reading/exfiltrating a secret file (.env/.pem/.key ...) via shell is hard-denied.
  6. A handful of always-dangerous commands are hard-denied.

Decision protocol (https://code.claude.com/docs/en/hooks):
  exit 0 + no stdout  -> no decision (normal flow);  exit 0 + JSON -> honoured.
"""
from __future__ import annotations

import json
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import _vf  # noqa: E402

DEPLOY_PATTERNS = [re.compile(p) for p in [
    r"\bterraform\s+apply\b", r"\bpulumi\s+up\b", r"\bkubectl\s+apply\b",
    r"\bhelm\s+(install|upgrade)\b", r"\bserverless\s+deploy\b",
    r"\bvercel\b.*(deploy|--prod)", r"\bnetlify\s+deploy\b",
    r"\b(fly|flyctl)\s+deploy\b", r"\bwrangler\s+(deploy|publish)\b",
    r"\bgcloud\s+(run\s+deploy|app\s+deploy|functions\s+deploy)\b",
    r"\baws\s+(deploy|s3\s+sync|cloudformation\s+(deploy|create-stack)|ecs\s+update-service|lambda\s+update-function-code)\b",
    r"\beb\s+deploy\b", r"\bdocker\s+push\b",
]]

SPEND_PATTERNS = [re.compile(p) for p in [
    r"\bterraform\s+apply\b", r"\bpulumi\s+up\b",
    r"\baws\s+\w+\s+create", r"\bgcloud\s+\w+\s+create", r"\baz\s+\w+\s+create",
    r"\bstripe\b.*(--live|\blive\b)", r"\bgh\s+repo\s+create\b",
    r"\bnpm\s+publish\b", r"\btwine\s+upload\b",
]]

# Outbound publish/send via the shell.
PUBLISH_PATTERNS = [re.compile(p, re.I) for p in [
    r"\b(curl|wget)\b[^\n]*(api\.twitter|api\.x\.com|graph\.facebook|api\.linkedin|"
    r"hooks\.slack|discord(app)?\.com/api/webhooks|api\.mailchimp|sendgrid|api\.resend|"
    r"api\.buffer|api\.telegram)",
    r"\baws\s+(ses\s+send-email|sns\s+publish)\b",
    r"\bgh\s+release\s+create\b",
    r"\btwilio\b[^\n]*\b(send|message|create)\b",
]]

# Outbound publish/send via a non-Bash (MCP) tool, matched on tool NAME.
PUBLISH_TOOL_RE = re.compile(
    r"(slack|gmail|email|mail|twitter|linkedin|mailchimp|sendgrid|resend|discord|"
    r"telegram|buffer|hootsuite|facebook|instagram|twilio|sns)[a-z0-9_]*"
    r"(send|post|publish|tweet|message|broadcast|dispatch|email)"
    r"|(^|_|:)(send|post|publish|tweet|broadcast|dispatch)(_|$)", re.I)

HARD_DENY = [(re.compile(p, re.I), why) for p, why in [
    (r"rm\s+-rf\s+(/|~)(\s|$|/)", "recursive delete of a root/home path"),
    (r":\(\)\s*\{.*\}\s*;\s*:", "fork bomb"),
    (r"git\s+push\s+[^\n]*(--force|-f)\b[^\n]*\b(main|master)\b", "force-push to main/master"),
    (r"\b(curl|wget)\b[^\n]*\|\s*(sudo\s+)?(ba)?sh\b", "pipe-to-shell of remote content"),
]]

# Reading/exfiltrating a secret file via the shell.
SECRET_FILE_RE = re.compile(
    r"\b(cat|type|less|more|head|tail|xxd|base64|strings|curl|wget|scp|rsync|nc|dd)\b"
    r"[^\n|]*\.(env|pem|key|p12|pfx|crt)\b", re.I)

# Protect LIVE venture gates; framework dirs (_template, _eval) are not live ventures.
GATES_RE = re.compile(r"/ventures/(?!_)[^/]+/gates/")


def _scannable(cmd: str) -> str:
    """Strip comments and quoted spans so a keyword inside an echoed string or a
    '#' comment doesn't trip classification. Unquoted commands are unaffected."""
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
    sys.exit(0)


def check_budget(slug: str):
    """Deny (and exit) if the venture is over its token or $ cap."""
    b = (_vf.load_json(_vf.venture_dir(slug) / "manifest.json") or {}).get("budget", {}) or {}
    spent, cap = b.get("api_spend_usd", 0), b.get("api_spend_cap_usd")
    if cap is not None and spent is not None and spent >= cap:
        deny(f"Venture '{slug}' has reached its API spend cap (${spent} / ${cap}). "
             f"A human must raise it in ventures/{slug}/manifest.json.")
    tok, tcap = b.get("tokens_spent", 0), b.get("token_budget_total")
    if tcap is not None and tok is not None and tok >= tcap:
        deny(f"Venture '{slug}' has reached its token budget ({tok} / {tcap}). "
             f"A human must raise it in ventures/{slug}/manifest.json.")


def main():
    raw = sys.stdin.read()
    try:
        event = json.loads(raw) if raw.strip() else {}
    except Exception:
        allow()

    tool = event.get("tool_name", "")
    ti = event.get("tool_input", {}) or {}
    cwd = event.get("cwd")

    # 1. Protect gate files from any model-driven write/edit.
    if tool in ("Write", "Edit", "MultiEdit"):
        fp = ti.get("file_path") or ti.get("filePath") or ""
        norm = "/" + fp.replace("\\", "/").lstrip("/")
        if GATES_RE.search(norm) or norm.rstrip("/").endswith("/gates"):
            deny("Gate files are written only by .claude/hooks/gate.py from real "
                 "evidence, or approved by a human editing them outside the agent "
                 "session. Use `python .claude/hooks/gate.py test|check <slug> ...`.")
        allow()

    # 2. Classify the action.
    is_deploy = is_spend = is_publish = False
    if tool == "Bash":
        cmd = ti.get("command", "") or ""
        scan = _scannable(cmd)
        low = scan.lower()
        for pat, why in HARD_DENY:
            if pat.search(scan):
                deny(f"Blocked by the venture-factory guard ({why}). A human must run "
                     f"it outside the agent session if genuinely required.")
        m = SECRET_FILE_RE.search(scan)
        if m and ".example" not in scan[m.start():m.start() + 64]:
            deny("Blocked: reading/transferring a secret file (.env/.pem/.key) via the "
                 "shell. Secrets load from env / a secret manager — never cat or upload "
                 "them. See SECRETS.md.")
        is_deploy = any(p.search(low) for p in DEPLOY_PATTERNS)
        is_spend = any(p.search(low) for p in SPEND_PATTERNS)
        is_publish = any(p.search(low) for p in PUBLISH_PATTERNS)
    elif tool not in ("Read", "Glob", "Grep"):
        # Non-Bash tools (e.g. MCP): gate the ones whose NAME implies sending/posting.
        is_publish = bool(PUBLISH_TOOL_RE.search(tool))

    if not (is_deploy or is_spend or is_publish):
        allow()

    # 3a. Publishing/sending is gated only within a venture context (a marketer run);
    #     outside a venture it's out of the factory's scope, so don't block general use.
    if is_publish and not (is_deploy or is_spend):
        slug = _vf.active_venture(cwd)
        if not slug:
            allow()
        check_budget(slug)
        g = _vf.load_json(_vf.gate_path(slug, "marketing-publish.json")) or {}
        if g.get("status") not in ("approved", "green"):
            deny(f"Publishing/sending is blocked: venture '{slug}' has no human "
                 f"marketing-publish approval (gates/marketing-publish.json is "
                 f"'{g.get('status', 'missing')}'). A human must approve before "
                 f"anything goes public.")
        allow()

    # 3b. Deploy / spend require a resolvable venture and fail closed.
    slug = _vf.active_venture(cwd)
    if not slug:
        deny("A deploy/spend command was attempted but no active venture is set. "
             "Set VF_ACTIVE_VENTURE=<slug> (or run from inside ventures/<slug>/).")
    check_budget(slug)

    if is_spend:
        g2 = _vf.load_json(_vf.gate_path(slug, "G2-decide.json")) or {}
        if g2.get("status") not in ("approved", "green"):
            deny(f"Resource-creation/spend is blocked: venture '{slug}' has not passed "
                 f"the G2 human go/no-go + spend gate (gates/G2-decide.json is "
                 f"'{g2.get('status', 'missing')}'). A human must approve G2 first.")
        allow()

    if is_deploy:
        g5 = _vf.load_json(_vf.gate_path(slug, "G5-test.json")) or {}
        if g5.get("status") != "green":
            deny(f"Deploy blocked: the G5 test gate for '{slug}' is "
                 f"'{g5.get('status', 'missing')}', not green. Run "
                 f"`python .claude/hooks/gate.py test {slug}` first.")
        stored = (g5.get("evidence") or {}).get("source_fingerprint")
        current = _vf.source_fingerprint(slug)
        if stored != current:
            deny(f"Deploy blocked: the G5 test gate for '{slug}' is STALE — source "
                 f"changed since tests passed (gate {stored}, current {current}). "
                 f"Re-run `python .claude/hooks/gate.py test {slug}`.")
        g6 = _vf.load_json(_vf.gate_path(slug, "G6-operate.json")) or {}
        if g6.get("status") not in ("approved", "green"):
            deny(f"Deploy blocked: venture '{slug}' has not passed the G6 human deploy "
                 f"approval (gates/G6-operate.json is '{g6.get('status', 'missing')}').")
        allow()

    allow()


if __name__ == "__main__":
    main()
