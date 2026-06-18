---
description: G5+G6 — test the build and prepare deploy. Deploy is a HARD human gate.
argument-hint: <venture-slug>
---
Run **G5 test → G6 prepare-deploy** for venture: $ARGUMENTS

Engage the `venture-orchestrator`:
1. Set `VF_ACTIVE_VENTURE=$ARGUMENTS`. Delegate G5 to `qa-engineer`: test plan, e2e suite, security checklist, perf smoke. Make G5 green ONLY via `python .claude/hooks/gate.py test $ARGUMENTS` (real exit code). If red, route failures back to `builder`.
2. Once G5 is green and fresh, delegate G6 prep to `operator`: write `runbook.md`, observability, cost pass, incident basics. Prepare the deploy command but DO NOT run it.

Deploy/publish is a HARD human gate: G5 must be green + fresh AND a human must approve `gates/G6-operate.json`; the deploy hook enforces it. STOP and present exactly what the human needs to approve. Never deploy or publish autonomously.
