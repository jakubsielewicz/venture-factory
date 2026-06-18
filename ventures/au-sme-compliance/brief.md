# Venture brief - au-sme-compliance

> Living source of truth. The venture-orchestrator is the sole writer.

## One-liner
A self-serve Modern Award Pay Compliance Checker for Australian SMEs: upload a payroll CSV, map staff to the correct modern award + classification, check pay against current Fair Work rates, get an audit-ready PDF with per-employee confidence scores.

## Current state
- **Gate:** G4 build COMPLETE (green). Next: G5 test (`/ship au-sme-compliance`).
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
- 2026-06-18 - G4 build complete: TypeScript core engine (csv -> classify -> rate-compare -> audit report) with 111 passing tests; 3 of 12 awards as data fixtures; Supabase/Stripe stubbed; IaC declare-only. Deferred to next increment: PDF generator impl, Next.js UI shell, awards 4-12.

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
- G5 test - NEXT (qa-engineer; make green only via `gate.py test`)
