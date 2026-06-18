# Venture brief - au-sme-compliance

> Living source of truth. The venture-orchestrator is the sole writer.

## One-liner
A self-serve Modern Award Pay Compliance Checker for Australian SMEs: upload a payroll CSV, map staff to the correct modern award + classification, check pay against current Fair Work rates, get an audit-ready PDF with per-employee confidence scores.

## Current state
- **Gate:** G5 test COMPLETE (green, 171/171). G6 deploy PREPARED - AWAITING HUMAN (deploy hard-blocked until approved).
- **Status:** in-progress
- **Last updated:** 2026-06-18

## Thesis
A legislatively permanent demand catalyst (Fair Work Act s327A criminal wage-theft, operative Jan 2025) turns award compliance into a board-level risk for employing SMEs, while an unoccupied price band sits between free government tools and expensive full-suite platforms.

## Decisions (dated, append-only)
- 2026-06-18 - G0 PURSUE (74/100) - selected the award pay-compliance checker.
- 2026-06-18 - G1 analyst VIABLE; advisor GO-IF (3 conditions).
- 2026-06-18 - Pre-G2 verification: 5/7 blockers resolved, 2 partial, 0 blocking.
- 2026-06-18 - G2 APPROVED by human (spend authorised, envelope AUD $77.2K base / $120K ceiling).
- 2026-06-18 - G3 design complete: CSV-first MVP, 12 awards at launch, deterministic rule engine (the moat), Supabase + Vercel + Stripe. Marketing drafted - unpublished, pending solicitor sign-off.
- 2026-06-18 - G4 build complete: TS core engine + 111 tests; 3/12 awards; stubs; IaC declare-only. Deferred: PDF gen, Next.js shell, awards 4-12.
- 2026-06-18 - G5 test GREEN (set_by=gate.py, npm test exit 0): 171/171 (qa added 60 gap tests). Security: 0 critical; majors = brute-force lock, award scope/disclaimer (pre-launch). Perf: <4ms vs 90s budget.
- 2026-06-18 - G6 prepared (operator): runbook + observability + cost (~$70/mo) + incident. Deploy command staged but NOT run; verified hard-blocked by the guard (G6 pending).

## Design summary (G3)
- **MVP:** Next.js/Vercel + Supabase web app; CSV upload (<=500 rows) -> award questionnaire (12 FWC awards) -> deterministic classification + rate comparison -> PDF audit report with HIGH/MED/LOW confidence per employee. Stripe billing (Starter $49 / Pro $79, 14-day trial). Thesis validated at 200 waitlist + 10% trial->paid + ~AUD $1.6K MRR in 90 days.
- **Riskiest calls:** (1) deterministic rule engine (no ML) -> a LOW-confidence bucket may drive support/NPS risk; (2) single-vendor Supabase concentration; (3) pdfkit report rendering (design-iteration friction).
- **Build cost:** ~AUD $77.2K - sits ON the base envelope with ZERO contingency; any scope creep (more awards, Xero integration, legal overrun) eats the $42.8K buffer to the $120K ceiling. Infra ~AUD $70/mo vs $800/mo budget.

## Open risks (decisive, carried from G1 + G3)
- Rule-engine liability (20/25) - employment-solicitor sign-off on rule logic + ToS required pre-launch (GO-IF 1).
- Misleading safe-harbour marketing claim (16/25) - all copy solicitor-reviewed; marketing already constrained to "tool not adviser", no Code claims.
- Accessorial liability s550 (15/25) - "tool not adviser" posture + PI insurance.
- Build budget has zero contingency (G3) - guard scope tightly at G4.
- Classification accuracy across the 12 launch awards (G3) - drives the LOW-confidence rate; validate during G5.

## Artifacts by gate
- G0 research/ - opportunity-score.md, shortlist.md (green)
- G1 advisory/ - risk-register.md, go-no-go-memo.md, verification.md ; financials/ - unit-economics.md (green)
- G2 - APPROVED by human
- G3 product/design/ - prd.md, c4.md, api-contract.md, nfr.md, build-vs-buy.md (green) ; marketing/ - positioning.md, icp.md, seo.md, launch.md, pricing-page.md (drafts)
- G4 product/src + product/tests - engine, API handlers, stubs, iac/ (green). Test command: `npm test` (run from product/; needs one-time `npm install`).
- G5 product/tests - TEST-PLAN.md + gaps.test.ts; 171/171 (green, set_by=gate.py)
- G6 runbook.md + product/ops/{alerts.json,load-test.js} - PREPARED; deploy awaits human approval + 7 launch blockers
