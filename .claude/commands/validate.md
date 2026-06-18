---
description: G1 — validate a scouted venture (advisor + analyst + research verification), stop at the G2 human gate.
argument-hint: <venture-slug>
---
Run **G1 validation** for venture: $ARGUMENTS

Engage the `venture-orchestrator`:
1. Set `VF_ACTIVE_VENTURE=$ARGUMENTS`. Confirm G0 is green (`gate.py status`).
2. Delegate to `financial-analyst` (viability) and `domain-advisor` (regulatory, risk, moat, go/no-go) — analyst first so the go/no-go memo can cite the unit economics; ask `growth-marketer` for a light ICP / willingness-to-pay input.
3. Run the `research-verification` pass over `research/` + `financials/` → write `advisory/verification.md`; surface any blockers.
4. `python .claude/hooks/gate.py check $ARGUMENTS G1`, then advance the manifest to G2.

STOP at the G2 human gate with the go/no-go package (verdict, verified numbers, spend ask, blockers). Never self-approve `gates/G2-decide.json`.
