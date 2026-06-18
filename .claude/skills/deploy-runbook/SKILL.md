---
name: deploy-runbook
description: Use at G6 to capture the exact, reproducible deploy/run/rollback recipe as a runbook. Triggers: "deploy runbook", "how do we ship this", "rollback procedure", "release steps", G6 operate.
when_to_use: writing the reproducible deploy/run/rollback runbook at G6.
allowed-tools: Read, Write, Edit, Bash
---

## Recent change being shipped
```!
git -C "$CLAUDE_PROJECT_DIR" diff --stat HEAD~1 2>/dev/null || echo "DATA UNAVAILABLE: no git diff (fresh repo or git not reachable)."
```

## Procedure
1. Document prerequisites: accounts, secrets (names only, sourced from a manager), the IaC apply command, and the env vars required.
2. Write the deploy steps as an exact, copy-paste sequence that works from a clean environment — no tribal knowledge.
3. Write the ROLLBACK steps and the trigger for using them.
4. Note the smoke check to run immediately after deploy (the one thing that proves it's live).
5. Write `ventures/<slug>/runbook.md`.

Deploy is gated: G5 must be green + fresh and a human must approve `gates/G6-operate.json`; the deploy hook enforces it. Document the command; let the human run it. Heuristics: `knowledge/ledger.md`.
