# Venture brief - au-sme-compliance

> Living source of truth. The venture-orchestrator is the sole writer.

## One-liner
A self-serve Modern Award Pay Compliance Checker for Australian SMEs: ingest payroll data, map staff to the correct modern award + classification, check pay against current Fair Work rates, output an audit-ready report.

## Current state
- **Gate:** G2 (HUMAN go/no-go + spend authorisation) - AWAITING HUMAN
- **Status:** awaiting-human (verification blockers resolved)
- **Last updated:** 2026-06-18

## Thesis
A legislatively permanent demand catalyst (Fair Work Act s327A criminal wage-theft, operative Jan 2025) turns award compliance into a board-level risk for employing SMEs, while an unoccupied price band sits between free government tools and expensive full-suite platforms.

## Decisions (dated, append-only)
- 2026-06-18 - G0 PURSUE (score 74/100) - selected the award pay-compliance checker over BAS/WHS/privacy alternatives.
- 2026-06-18 - G1 advisor recommends GO-IF (3 conditions); analyst verdict VIABLE.
- 2026-06-18 - Pre-G2 verification flagged 7 blockers; sent back for re-grounding (G2 option 1).
- 2026-06-18 - Re-grounding complete: 5/7 resolved, 2 partial (documentation hygiene), 0 blocking. Net: ready-with-noted-estimates. Decision deferred to human at G2.

## Load-bearing assumptions (verification status after re-grounding)
- Criminal penalties: **RESOLVED** - $8.25M body corporate / $1.65M individual confirmed internally consistent (25,000 / 5,000 penalty units x $330 current rate); multi-source secondary, AustLII primary unreachable. [secondary]
- s327A commencement 1 Jan 2025: **PARTIAL** - four secondary sources agree; no primary fetch. Substance uncontested.
- ABS business counts/percentages: **RESOLVED** - corrected to 92.6% small / 6.8% medium; counts reconcile to 994,178; SAM ~AUD $562M.
- FWC 2025-26 wage review (3.5%, $24.95/hr): **PARTIAL** - multi-source secondary; no primary FWC decision fetch.
- TAM: **RESOLVED-as-estimate** - prior $1.2B dropped; now order-of-magnitude (~AUD $1.05B) clearly labelled.
- Stripe fees: **RESOLVED** - corrected to AU domestic 1.7% + A$0.30; gross margin 91.0%, LTV:CAC 14.97x, payback 2.67mo.
- Financial assumptions (churn 2.5%, CAC ~$192, 20 acquisitions/mo): internal assumptions, unvalidated - decisive lever is churn.

## Open risks (decisive)
- Rule-engine liability (exposure 20/25) - needs employment-solicitor sign-off pre-launch.
- Misleading safe-harbour marketing claim (exposure 16/25) - product meets 1 of 7 Code requirements; all copy must be solicitor-reviewed.
- Accessorial liability s550 (exposure 15/25) - maintain "tool not adviser" posture + PI insurance.

## Artifacts by gate
- G0 research/ - opportunity-score.md, shortlist.md (green)
- G1 advisory/ - risk-register.md, go-no-go-memo.md, verification.md ; financials/ - unit-economics.md (green)
- G2 - awaiting human go/no-go + spend authorisation (GO-IF recommended; blockers resolved)
