# Venture brief — advantage-zone-sweep

> The living source of truth for this venture. **The venture-orchestrator is the sole writer.**
> Specialists propose changes in their own folder; the orchestrator integrates them here.

## One-liner
Cross-sector G0 discovery sweep, deliberately outside AU aged/health-care compliance. Result: **no
candidate clears PURSUE (>=70)**. Best of 16 candidates screened is a narrow AASB S2 (mandatory
climate-disclosure) Scope 1&2 starter-pack for newly-in-scope $50-150M-revenue AU entities — PARK
60/100 (conviction PASS, at the boundary).

## Current state
- **Gate:** G0 sweep COMPLETE (green). Verdict: **PARK across the board** — nothing clears PURSUE.
- **Status:** in-progress (recommendation: run the two cheap kill tests below before any further spend;
  do not proceed to G1 on any of the three survivors as-is)
- **Last updated:** 2026-07-20

## Why this sweep
The portfolio had PARKed several candidates on the same failure mode: real regulation, but no buyer-side
demand at a financially-stressed mid-market AU aged/health-care buyer (`cyber-defence-au` PARK 65,
`support-at-home-claims` PARK 49, `app17-adm-transparency` PARK 48, plus other aged/health-care-adjacent
scouts since parked or removed from the active portfolio). One other sweep independently found a
survivor outside that pattern that reached G2: `asleep-incumbent` (HVNL SMS, at G2 awaiting human);
`au-sme-compliance` (Modern Award pay-compliance, PURSUE 74) graduated past G2 to G6. This sweep
deliberately ranged into
sectors none of those cover — fintech/reg reporting, ESG/sustainability disclosure, property/strata,
legal ops, construction, gov procurement, franchising — to test for a genuinely new, >=70-scoring
candidate, rather than re-litigating aged/health-care compliance again.

## G0 verdict
**PARK across the board — nothing clears PURSUE.** 16 candidates longlisted across 7 hunting grounds;
13 killed outright by the six hard gates (mostly gate v, crowding — an entrenched incumbent or a swarm
of boutique consultants already occupies almost every AU regulatory-compliance lane that looks plausible
on a "law is real" test alone: StrataMax/MRI, Cm3/Avetta, Equifax, LeaseInfo, iPRO/Walk Free, Payapps,
InfoTrack-class resellers). This is the *same structural finding* as the aged/health-care PARK cluster,
just manifesting as crowding instead of buyer-financial-stress. 3 survivors were deep-dived and scored;
all landed in a tight 60-65 band:

| Rank | Candidate | Conviction | Score | Verdict |
|---|---|---|---|---|
| 1 | AASB S2 climate-disclosure readiness (Group 2/3 narrow wedge) | PASS (60, boundary) | **60** | PARK |
| 2 | Franchise Disclosure Register compliance-tracking (non-drafting) | WEAK (38) | **65** | PARK |
| 3 | Modern Slavery supply-chain risk monitoring | FAIL (29) | **62** | PARK |

**#1 (AASB S2)** genuinely clears the demand gate the aged/health-care cluster failed — buyers are
$50M+ revenue, non-distressed, already *paying* (FTE hires, $15-60k/yr vendor ACVs, $750k-1.6M Big4
engagements) — but is held down by the most severe crowding found in the sweep (11 named AU-active
vendors) and a build that needs carbon-accounting domain expertise outside the operator's stated edge
(entity resolution / registry pipelines, not climate science).

**#2 (Franchise Disclosure)** has the cleanest build-fit to the operator's actual edge (public register
data, entity resolution, deadline/audit-trail engine) and the least crowding of anything found this
sweep — but WTP is inferred one step removed from the proposed product (proven spend is on legal
drafting, not on tracking software), and the market is small (~1,100-1,344 systems; illustrative
$25-45k ARR ceiling at plausible capture) — echoing the sub-scale outcome found in `app17-adm-transparency`.

**#3 (Modern Slavery)** is the weakest: the penalty regime is not yet legislated (AVOID economics on a
hypothetical future penalty), and it is the most crowded field in the entire sweep (4+ direct
competitors).

## Load-bearing evidence (verify at G1, if either candidate is revived post-kill-test)
- AASB S2 Group 2 commences 1 Jul 2026, Group 3 1 Jul 2027, $50M rev / $25M assets / 100+ staff
  thresholds (AASB official standard, aasb.gov.au). [verified against primary source]
- AASB S2 vendor pricing $15-60k/yr; Big4 consulting $750k-1.6M (Treasury estimate via
  getgreener.webflow.io, 2026) — direct source not independently re-verified, flag for G1.
- AASB S2 "~6,000+ entities in scope" figure is an aggregated secondary estimate, no single named
  Treasury/ASIC primary source confirmed — **unverified, resolve at G1 if revived**.
- Franchise: 24% of register (496/2,073) marked "out of date" (MST Lawyers citing ACCC data, 2025-26);
  ACCC fined Cash Converters + MTA $16,500 each (Jun 2025) — both traceable to named sources.
- Franchise system count (~1,100-1,344) — Franchise Council of Australia / IBISWorld, 2025 — **not
  verified against a single named primary source, flag for G1 if revived**.

## Decisions (dated, append-only)
- 2026-07-20 — created venture shell for a cross-sector G0 discovery sweep — operator asked to widen the
  aperture beyond the aged/health-care compliance-buyer pattern that had PARKed 4x in this portfolio.
- 2026-07-20 — delegated ONE opportunity-scout discovery pass (longlist of 16 -> six hard gates -> 3
  survivors deep-dived -> conviction-scored -> opportunity-scored). Verdict: PARK across the board, no
  candidate clears PURSUE. Recorded honestly rather than inflating a score. `gate.py check
  advantage-zone-sweep G0` run; see gates/G0-scout.json for the real result.
- 2026-07-20 — recommendation: run the two pre-committed kill tests below (AASB S2 and Franchise
  Disclosure) before spending anything further; do not advance either to G1 without a pass.

## Open risks / next steps (both are validate-next kill tests, not G1 work)
1. **AASB S2 kill test:** 20 LinkedIn/email outreach contacts (CFOs/sustainability leads at $50-250M
   revenue AU entities, no existing Big4/ESG-vendor relationship) offering a Scope 1&2-only
   compliance-readiness report at a sub-$5k/yr price. **Pass: >=3/20 (15%) book a call or ask for
   pricing within 2-3 weeks. Fail: kill.** Cost <AUD $500, <2 weeks.
2. **Franchise Disclosure kill test:** 20 outreach contacts drawn from the register's own public
   "out of date" list (highest-intent segment) offering a $49-99/mo tracking dashboard. **Pass: >=2/20
   (10%) willing to pilot at that price within 2 weeks. Fail: kill.** Cost <AUD $500, <2 weeks.
3. **AASB S2 build-feasibility spike (if the kill test passes):** confirm NGA-factor-based Scope 1&2
   calculation is buildable on the operator's existing entity-resolution/Supabase pattern without hiring
   carbon-accounting domain expertise — a real skills-gap risk, not just a competitive one.
4. **Modern Slavery:** not recommended for any further spend; revisit only if the AG Department's
   penalty-regime consultation concludes with a confirmed, dated commencement (currently in consultation,
   not legislated).

## Regulated-domain flag (for domain-advisor, if either candidate is revived)
AASB S2 output is audit-adjacent (third-party reasonable assurance required from ~2030) — liability
framing must stay "readiness tool," not "compliance certification." Franchise Disclosure tracking risks
drifting into unlicensed legal practice if scope creeps from tracking into drafting/advice — same
caution as the `app17-adm-transparency` precedent in this portfolio. Both decision-support only.

## Artifacts by gate
- G0 research/ — shortlist.md (16-candidate longlist + six-gate elimination trace), conviction-signal.md
  (3-candidate conviction scoring), opportunity-score.md (3 deep-dives + ranked verdict table) — all green
- G1 — NOT STARTED. No candidate is currently G1-ready; both kill tests above must pass first.
