# Venture brief — support-at-home-claims

> Living source of truth. The venture-orchestrator is the sole writer.

## One-liner
Monthly "Claims Integrity & Revenue Leakage Report" for Australian Support at Home (home care) providers — rejected/underclaimed Services Australia claims, coding-error patterns, and price-position benchmarking vs published pricing — built on the operator's existing Remediant entity-resolution/report-generation pipeline pointed at Support at Home instead of residential aged care.

## Current state
- **Gate:** G0 scout artifact-complete (green — both `research/conviction-signal.md` and `research/opportunity-score.md` exist). **Conviction gate FAILED (15/100)**; Opportunity Score **49/100 → PARK bordering KILL**. Green G0 here means the required artifacts exist, not that the idea is ready to advance — under the standard procedure a conviction FAIL stops the pipeline before G1.
- **Status:** in-progress (recommendation: do not advance to G1 as currently scoped; re-scope or park)
- **Last updated:** 2026-07-20

## Thesis (operator's hypothesis — under test, not yet accepted)
Support at Home (the new home-care program) creates claiming friction and cash-flow risk for providers, and the Aged Care Quality & Safety Commission's new power to order pricing refunds creates fresh downside exposure. A neutral, non-software-vendor report — reusing the operator's existing entity-resolution + report-generation pattern (Supabase/tooling) already built for AN-ACC/government aged-care data — could be repointed at Support at Home claims data and published pricing schedules to sell a monthly integrity + benchmarking report to finance/ops managers at mid-size (50–500 participant) registered providers, at $750–1,500/mo (first month $500 pilot).

## Decisions (dated, append-only)
- 2026-07-20 — Created venture as a G0 refinement pass on an operator-drafted thesis (not a fresh sweep) — scope is to pressure-test, verify load-bearing claims, and score, not to accept the idea at face value.
- 2026-07-20 — G0 scout pass complete. Conviction gate FAIL (15/100): all real WTP evidence found belongs to the largest home-care providers (Ansell Strategic, Mirus Revenue Integrity), not the 50–500-participant ICP; two funded incumbents (ShiftCare QuickClaim, AlayaCare) already embed claims-quality at point-of-claim inside the software this ICP already runs. Opportunity Score 49/100 (PARK bordering KILL), well below the operator's self-score of 81/90. See `research/conviction-signal.md` and `research/opportunity-score.md`.

## Operator context (read before scoring)
- Unfair advantages: enterprise/solution architecture, AI-agentic system builds, data-pipeline engineering, AU aged/home-care domain knowledge; reusable Remediant pipeline pattern (entity resolution + report generation, Supabase).
- Capital ceiling: ~AUD $5,000 to first revenue. Time budget: 10–15 hrs/week alongside a day job. Geography: Australia-first.
- Explicit exclusions: nothing requiring licensure the operator lacks, no inventory, no face-to-face delivery.
- Related prior work in this portfolio (a related aged-care venture, G0/PARK 56/100, since removed) covers **residential** aged care (AN-ACC/QI/Standards) — adjacent but a *different program* from Support at Home (home care, commenced 1 Jul 2025, replacing HCP/CHSP). Reuse its evidence on sector financial stress, Mirus/competitor landscape, and AIHW data conventions where applicable; do not assume residential findings transfer directly to home care without a citation of their own.

## Load-bearing assumptions (verified at G0 — see research/opportunity-score.md for citations)
1. Support at Home providers experience material claiming errors/rejections and cash-flow pain, with an "emergency special payment" mechanism. **VERIFIED** (Dept of Health Special Payments Provider Guidance v1.0, Feb 2026; named-operator pain — Silverchain, Mullein Care, IRT — The Weekly Source, 25 Jun 2026).
2. The Aged Care Quality & Safety Commission can order refunds for pricing/overcharging under Support at Home. **VERIFIED** (Dept of Health media release ~May 2026; ACQSC Regulatory Bulletin RB 2026-1).
3. From 1 October 2026, personal care becomes fully government-funded under Support at Home. **VERIFIED**, and confirmed distinct from the 1 Jul 2025 program start (Dept of Health, "Personal care to be fully funded under Support at Home from October").
4. Published/benchmarkable home-care pricing data exists in a form a benchmarking product could actually use. **PARTIALLY VERIFIED**: prices are publicly required/published (My Aged Care comparison tool; quarterly National Summary of Support at Home Prices) but no bulk/machine-readable dataset (CSV/API) was found — likely scraping, not a clean pipeline. Unresolved.
5. (New, surfaced by G0) Willingness to pay at the 50–500-participant ICP and the $750–1,500/mo price point. **UNVERIFIED / negative signal** — every real WTP data point found (Ansell Strategic board-pack pricing reviews, Mirus "Revenue Integrity") belongs to the largest providers, not this segment.

## Open risks (post-G0)
- **Confirmed:** operator's self-score (81/90) was over-optimistic on WTP-at-segment, defensibility, and 90-day feasibility for the claims-integrity half — see comparison in `research/opportunity-score.md`.
- Confirmed competitor risk: ShiftCare (QuickClaim) and AlayaCare already embed claims validation at point-of-claim inside the care-management software this ICP already runs, absorbing the pain at the source rather than leaving it for a downstream report. Mirus Australia ("Revenue Integrity") and Ansell Strategic already serve the pricing-benchmark half — but only at the largest-provider tier.
- Neutrality/moat claim ("not the software vendor whose errors you'd audit") did not survive: low switching cost by design, no proprietary data advantage (pricing is public, claims data belongs to the customer). Capped ≤3/5 per the crew's scoring rule pending a direct competitor pricing probe (Mirus, Ansell) — not yet run.
- Market-sizing blocker: no source found for a Support at Home provider count broken out by the 50–500-participant band (unlike residential aged care, which has a published bed-size distribution). Any ARR projection for this exact ICP is currently undefensible.

## Artifacts by gate
- G0 research/ — conviction-signal.md (FAIL, 15/100), opportunity-score.md (49/100, PARK bordering KILL) — both green/present, gate check passes on artifact existence
- G1 advisory/, financials/ — NOT started; recommend re-scoping (see kill test below) before committing G1 effort, given the conviction FAIL
- G3 product/design/ — pending
- G4 product/src/ — pending
- G5 product/tests/ — pending
- G6 runbook.md — pending
