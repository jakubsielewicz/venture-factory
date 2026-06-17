---
name: go-no-go-memo
description: Use at the end of G1 to synthesise scouting, financials, regulatory, risk, and moat work into a single go/no-go memo for the human's G2 decision. Triggers: "write the go/no-go", "should we proceed", "G1 synthesis", "decision memo".
when_to_use: synthesising the validation case into a human-ready go/no-go at the G1→G2 boundary.
allowed-tools: Read, Write
---

## Procedure
1. Read the G0 score (`research/`), unit economics (`financials/`), and the regulatory/risk/moat work (`advisory/`). If any is missing, say so and stop — do not synthesise a decision on a partial case.
2. Write `ventures/<slug>/advisory/go-no-go-memo.md` with, in this order:
   - **Recommendation**: GO / GO-IF / NO-GO (one line, at the top).
   - **The case**: demand, unit economics (LTV:CAC, payback, break-even), and the wedge — each one line with its source.
   - **Decisive risks & blockers**: the 3 that matter, with mitigations.
   - **Spend being authorised**: what money/time G2 approval unlocks, and the budget envelope.
   - **GO-IF conditions**: the specific things that must be true to proceed (if applicable).
   - **Top unknowns** still open.
3. Keep it to one page. The human decides — your job is to frame the decision well, not to make it.

Decision-support, not licensed advice. Heuristics: `knowledge/ledger.md`.
