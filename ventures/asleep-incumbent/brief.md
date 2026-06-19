# Venture brief - asleep-incumbent

> Living source of truth. The venture-orchestrator is the sole writer.

## One-liner
A self-serve Safety Management System (SMS) SaaS for small Australian heavy-vehicle operators (1-20 trucks) to meet the HVNL 2026 SMS obligation: form-builder + evidence storage (incidents, pre-starts, training, fatigue) + audit-ready trail + alerts.

## Current state
- **Gate:** G0 sweep COMPLETE (green). Verdict PURSUE 74/100 (top score on the board). Next: G1 validate (`/validate asleep-incumbent`).
- **Status:** in-progress
- **Last updated:** 2026-06-18

## How we got here
G0 applied the learned **open-lane meta-filter** (strong demand + an asleep/enterprise-only/absent incumbent). Of 7 candidates swept, HVNL SMS was the only one with a real forcing function AND a genuinely open lane (see research/shortlist.md). The filter directly produced the result.

## Thesis
The amended Heavy Vehicle National Law commences **1 Aug 2026 with no grace period**: every accredited operator (NSW/VIC/QLD/SA/TAS/ACT) must hold a documented, AUDITABLE, *operating* SMS from day one; CoR penalties up to $10,000/breach. Incumbents (Netcorp, MTData, Teletrac Navman, Kynection, Logmaster, ATCC) are telematics-hardware-tied and enterprise/quote-only; NHVR's free PDF templates satisfy "documented" but not "operating". No affordable self-serve SMS exists for sub-20-truck operators - the open lane.

## G0 verdict
**PURSUE - 74/100.** Hard deadline + penalties, an open lane for small operators, a technically tractable build (fixed 5-category SMS Standard; form-builder + storage + alerts, no API deps, ~6-10 weeks solo), accruing switching cost, and LOW regulatory drag (no TGA/AFSL/advice boundary). Best opportunity found so far (ties au-sme-compliance on score, lower build/integration risk than [venture-removed]).

## Shortlist (ranked; see research/shortlist.md)
1. HVNL 2026 SMS for small operators - 74 - LANE OPEN (conditional) - SELECTED
2. AASB S2 mid-market climate disclosure - 55-62 - PARK (lane crowded: Carbonly/NetNada/Avarni/Sumday/Trace)
3. Psychosocial/People-at-Work SME tool - 52-58 - PARK (Clearhead live at $1/user/mo)
4. Labour-hire multi-state licence dashboard - 50-56 - PARK (narrow; bundled by recruitment platforms)
5. NSW self-managed strata compliance - 48-55 - PARK (UnitBuddy; tiny market)
6. Micro-RTO compliance - 48-54 - PARK (RTOSafe/Complynce/aXcelerate)
7. FSANZ 3.2.2A food-safety evidence - 42-48 - KILL (mandate 2yrs old; SafetyCulture + free templates)

## Load-bearing evidence (verify at G1)
- Forcing function: HVNL amendments commence 1 Aug 2026, no grace period; auditable SMS required; CoR penalties to $10k/breach; NHVR running free small-operator sessions (Netcorp HVNL guide 2026; NHVR SMS page 2026; Kynection 2026). [verify]
- Open lane: incumbents enterprise/quote-only + telematics-tied; ATCC demo-only no pricing; SafetyCulture generic ($24/seat); NHVR free PDFs fail the "operating" test (ATCC/Logmaster/Netcorp pages fetched Jun 2026; SelectHub). [verify]
- Tractable + defensible: SMS Standard 2026 is a fixed 5-category framework; ~6-10 weeks solo; evidence-trail switching cost; no regulated-advice boundary (NHVR SMS framework 2026). 

## Open risks / G1 unknowns
1. **Lane confirmation (make-or-break):** does ATCC (or an undiscovered tool) already serve 1-5 truck operators at an accessible price? Call ATCC for pricing + scan ATA/trucking forums. If filled, downgrade to PARK.
2. WTP at $79-99/mo vs defaulting to NHVR free PDFs - 10-15 owner-operator interviews (ATA, Owner Drivers Australia, FB groups); need >=5 purchase-intent.
3. Target count: est. 3,200-7,200 sub-20-truck accredited operators (8-12k total x 40-60%) - UNVERIFIED; check NHVR Annual Report 2024-25 + ABS.

## Regulated-domain flag (for domain-advisor)
Minimal vs prior ideas: driver records = personal info (Privacy Act 1988, standard data-processor obligations; AU hosting preferred). No software-vendor registration identified for the sector (confirm at G1). Decision-support only.

## Artifacts by gate
- G0 research/ - opportunity-score.md, shortlist.md (green)
- G1 - NEXT (domain-advisor + financial-analyst + research-verification)
