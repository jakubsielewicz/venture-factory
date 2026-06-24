# Venture brief - electrification-rebates

> Living source of truth. The venture-orchestrator is the sole writer.

## One-liner
A self-serve tool for AU electrification installers (solar/battery/electrical/heat-pump) to manage rebate eligibility + claim paperwork across the patchwork of federal + state schemes (STC/SRES, VEU, PDRS, REPS...): eligibility check, claim prep, certificate management, audit trail.

## Current state
- **Gate:** G0 deep scout COMPLETE (green). Verdict PARK 56 - **conditional PURSUE (~60) pending the lane probe + multi-scheme survey** (both cheap, non-build).
- **Status:** in-progress (recommendation: run the 2 cheap checks, then re-score / validate)
- **Last updated:** 2026-06-19

## Why this is the session's most promising LEAD (despite 56)
The score is held down almost entirely by UNVERIFIED things (lane status + multi-scheme-active %), NOT structural flaws. The fundamentals are the best scouted this session:
- **Buyer economics: MAKE + SAVE** (WTP 4/5 - the scout explicitly applied the new buyer-economics ledger heuristic). STC value $3-6k/job; agent fees ~10%; a $199-399/mo tool pays for itself on job 1.
- **Low regulatory drag (4/5):** "tool not adviser" - prepares claims, doesn't create/trade certificates (like tax-prep software).
- **Near-certain, growing demand:** CHBP expanded to $7.2B (Dec 2025); 160k+ battery installs in 5 months; 2M-install target by 2030; scheme complexity worsens each budget.
- **Probably-open lane:** 0 funded startups on cross-scheme self-serve claim management.

## Thesis
Installers MAKE money per job and drown in cross-scheme rebate admin that changes every budget. Existing players are managed-service ACPs (no self-serve) or single/dual-scheme tools. The cross-scheme, self-serve, multi-state claim layer appears unowned.

## G0 verdict
PARK 56 (conditional PURSUE ~60). The open-lane cap (lane UNKNOWN until probed) + a modest market + an unverified multi-scheme % hold it under threshold. This is a "verify two cheap things, then likely PURSUE" - not a structural PARK.

## Load-bearing evidence (verify at G1)
- CHBP expanded to $7.2B (DCCEEW Dec 2025); 160k+ battery installs in 5 months; 2M-install target by 2030. [verify]
- 8,088 solar-install businesses, none >5% share (IBISWorld 2024) -> SOM ~$240-500K/yr at 5%/2yr (lean solo-team viable, NOT venture-scale).
- MAKE+SAVE economics: STC value $3-6k/job; NSW PDRS admin so painful some installers abandon claims (SolarQuotes 2025) - exactly the pain this solves.

## Open risks / G1 unknowns
1. **LANE (make-or-break):** Alitsy's true scheme coverage + pricing + UX (covers VEU+ESS+STC; CHBP scope/price UNKNOWN). If Alitsy does 3+ schemes <$400/mo with good UX, it's a differentiation play, not an open lane. Probe drafted: research/lane-test.md (Alitsy, Ecovantage, Greenbank).
2. **Multi-scheme-active %:** SOM depends on 20-35% of the 8,088 regularly running 2+ schemes/job. Survey 30-50 installers. If <15%, SOM halves below viability.
3. **Registry API access:** CER / ESC Victoria (VEU Registry) / IPART - if any requires ACP status or imposes liability on a data-intermediary, scope drops to "claim preparation" only (less value). Contact integration teams at G1.

## Regulated-domain flag (for domain-advisor)
Tool is NOT a regulated product - must not position as creating/validating/trading certificates; scope = eligibility + claim prep + audit trail (like tax-prep software). Standard Privacy Act. Low drag.

## Artifacts by gate
- G0 research/ - opportunity-score.md, teardown.md, lane-test.md (green)
- G1 - on hold pending the lane probe + installer survey
