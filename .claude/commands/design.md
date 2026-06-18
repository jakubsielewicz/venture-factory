---
description: G3 — design an approved venture (PRD, C4, API, NFRs + positioning). Requires human G2 approval.
argument-hint: <venture-slug>
---
Run **G3 design** for venture: $ARGUMENTS

Engage the `venture-orchestrator`:
1. Set `VF_ACTIVE_VENTURE=$ARGUMENTS`. Confirm `gates/G2-decide.json` is `approved` by a human — if it is `pending`, STOP and tell the user G2 must be approved first (the model cannot approve it).
2. Delegate to `product-architect` (PRD, C4, API contracts, NFRs, build-vs-buy) and to `growth-marketer` (positioning, ICP, pricing-page copy — drafts only, no publishing).
3. `python .claude/hooks/gate.py check $ARGUMENTS G3`.

Report the MVP scope, the riskiest design calls, and the build cost vs envelope. Do not build, spend, or deploy.
