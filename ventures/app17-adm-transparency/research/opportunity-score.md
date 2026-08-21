# Opportunity Score — app17-adm-transparency (G0 refinement pass)

**Idea:** "$4,500 ADM Inventory & Disclosure Pack" — fixed-price system/decision inventory workshop + ADM register + drafted APP 1.7-1.9 privacy-policy sections, positioned as compliance documentation for the client's own legal review, sold to AU health/aged-care mid-market privacy officers/compliance managers/COOs.
**Scored:** 2026-07-20
**Conviction input:** `research/conviction-signal.md` — **FAIL (12/100)**. Per the crew's standard gate this alone would normally stop the pipeline at a PARK. Sections below were completed anyway per explicit task instruction, for direct comparison against the operator's self-assessed 69/90.

---

## Market sizing (bottom-up)

| Input | Value | Source |
|---|---|---|
| Residential aged-care providers (AU) | 707 providers / 2,590 services, 30 Jun 2025 | AIHW GEN data snapshot 2025 (gen-agedcaredata.gov.au) |
| Home-care providers (AU) | 923 providers / 2,363 services, 30 Jun 2025 | AIHW GEN, as above |
| Home-support providers (AU) | 1,338 providers / 3,638 outlets, 30 Jun 2025 | AIHW GEN, as above |
| Deduplicated distinct aged-care provider organisations | **Not confirmed.** Many providers run more than one service type (residential + home care), so 707+923+1,338 overstates distinct organisations. No AIHW figure for the deduplicated org count was found this pass. **Treated as RISK per the market-sizing skill's rule; the lower bound (707, the residential-only count, i.e. the most-regulated and most health-provider-like segment) is used as the operative base**, not a summed total. |
| Private hospitals (AU) | 633 declared private hospitals, 10 Sept 2025 | Dept of Health "List of declared hospitals" (via APHA-sourced search summary) |
| Allied-health networks, day surgeries, smaller health-insurer entities | **UNAVAILABLE.** No AIHW/ABS breakdown found this pass giving a usable count for these sub-segments at the mid-market tier the operator described. Not invented; excluded from the base case rather than guessed. |
| **Base addressable universe (aged-care residential + private hospitals only)** | **Low 1,000 / Base 1,340 / High 1,700** orgs (707 residential + 633 hospitals ≈ 1,340 base; low bound trims for overlap/exclusions; high bound loosely allows for some home-care and allied-health inclusion not separately sourced) | Derived, see RISK flag above |

**Price:** $4,500 fixed (operator's stated figure — not independently benchmarked against a probed competitor price; see `competitor-landscape.md`, pricing UNKNOWN for all three named boutique consultancies).

**Adoption rate — the most sensitive input.** Given the conviction FAIL (no confirmed buyer-side demand/WTP signal, zero brand/track record for a new solo entrant, at least 3 named consultancies with a head start already publishing readiness content since Jul 2025, and real sector financial stress), a realistic 12-24 month adoption rate for a new, unbranded solo operator is low:

| Scenario | Adoption rate | Orgs converted | Revenue (12-24mo) |
|---|---|---|---|
| Low | 0.5% | ~5 orgs (of 1,000) | **~$22,500** |
| Base | 1.0% | ~13 orgs (of 1,340) | **~$60,300** |
| High | 2.0% | ~34 orgs (of 1,700) | **~$153,000** |

**Sensitivity:** the size is most sensitive to (1) the adoption rate, which is currently a judgement call not an evidenced figure (see conviction FAIL), and (2) whether the deduplicated aged-care org count is meaningfully higher than the 707 conservative floor used here — if it is closer to ~1,500-2,000 distinct orgs (plausible given overlapping service types), the base case scales up proportionally but the adoption-rate uncertainty still dominates.

**Is the obtainable slice worth the build?** At the base case (~$60K over 12-24 months, ~13 clients at $4,500 each), this is a plausible side-income outcome for 10-15 hrs/week alongside a day job, but it is not close to the ceiling needed to justify treating this as the operator's primary venture, and it assumes a materially better conversion rate than the evidence currently supports. If the deadline-sprint failure mode in `competitor-landscape.md` is correct (demand decays sharply after Dec 2026 absent an engineered re-billing mechanism), this is closer to a one-time ~$20-60K side project than a durable business, before even weighing the licensed-advice-boundary risk.

---

## Hard-gate scoring (operator profile: ≤90 days, ≤$5,000 AUD, 10-15 hrs/week, AU-only, no licensure the operator lacks, no inventory-based business, no face-to-face-only delivery)

| # | Gate | Verdict | Reasoning |
|---|---|---|---|
| 1 | ≤90-day launch at 10-15 hrs/week | **PASS (marginal)** | A scoped consulting offer (workshop + register template + drafted-section methodology) is genuinely buildable and launchable within 90 days by a solo operator. Risk: OAIC's own final ADM guidance isn't due until ~Sept 2026, so an early launch means selling a methodology against a moving regulatory target — early clients must be told the methodology may need revision once guidance lands. |
| 2 | ≤$5,000 AUD capital, itemised | **PASS (tight)** | Legal review of engagement letter/disclaimers ~$1,500; professional indemnity insurance (first year, estimated range, not a sourced quote) ~$1,000-2,000; landing page/domain/basic tooling ~$300; IAPP ANZ membership + event access ~$400; register/template build (low-code) ~$300; contingency ~$500 → **~$3,700-4,900 total**. PI insurance is a real, non-trivial cost the operator's brief did not itemise — flagging it here closes that gap, and it is load-bearing given the licensed-advice-boundary risk in `verification-app17.md`. |
| 3 | Evidence of existing spend or acute pain (not just theoretical exposure) | **FAIL** | Per `conviction-signal.md`: no buyer-side spend or pain evidence found for this specific deliverable in any review/job/forum/marketplace/peak-body tier. Only analogous adjacent-service spend (PIAs, compliance software) and a real, but not-yet-felt, regulatory mechanism. This is the load-bearing failure among the six gates. |
| 4 | Nameable first-10-customer channel | **WEAK/PARTIAL PASS** | The Remediant network is real and named, but it is the same channel underlying a related, since-removed aged/health-care venture that PARKed at 56/100 citing exactly this buyer segment's financial-stress-driven WTP friction and long sales cycles. IAPP ANZ/LinkedIn and a boutique-law-firm partner channel are plausible but currently unproven (no named law firm partnership secured in this research pass). |
| 5 | Defensibility beyond "we use AI" / beyond a commodity a generalist consultant or GRC tool could replicate | **WEAK — unverified, capped** | The operator's claimed EA/architecture skill is a genuine, plausible differentiator versus a template-only approach — real judgement is needed to correctly apply the two-part "substantially and directly related" + "significantly affects rights or interests" test across a real system landscape. But at least 3 named boutique consultancies (IIS Partners, Helios Salinger, FMA Consulting) plus Big 4 privacy practices plus GRC tooling (OneTrust) are already positioning similar inventory/mapping methodologies — this trips the crew's crowding check (>3 active players chasing the same mandate caps the open-lane sub-score at 3/5), and no direct competitor pricing was probed, so the lane remains UNKNOWN rather than verified open. |
| 6 | Real why-now catalyst | **PARTIAL PASS** | The legal mechanism itself is real, dated, and correctly characterised (see `verification-app17.md` — CONFIRMED on date, mechanism, non-grandfathering, and test scope). But the sector-specific urgency amplification the operator's brief leans on (the Jan 2026 OAIC sweep, implied OAIC health-sector enforcement priority) does not hold up — the sweep targets unrelated retail sectors under a different APP, and the "OAIC named healthcare a priority sector" claim circulating in vendor content is unverified and contradicted by OAIC's actual published 2025-26 priorities. The catalyst is real for AU business broadly; the "why THIS sector, why urgently, right now" framing is weaker than presented. |

**Net: 2 clear PASS, 1 clear FAIL, 3 WEAK/PARTIAL.** Does not clear all six gates.

---

## Opportunity scorecard

| Dimension | Weight | Score (1-5) | Weighted | Rationale and source |
|---|---|---|---|---|
| Demand & search momentum | 0.25 | 2 | 0.50 | Conviction FAIL (12/100) — recurring professional/vendor commentary confirmed, but zero buyer-side search/community/review/job-board signal found despite direct searches across every relevant tier. |
| Monetisation clarity / WTP | 0.20 | 2 | 0.40 | Adjacent-service spend exists (PIAs, compliance software) in this exact buyer segment — real but analogous, not direct. Counterweighted by a quantified sector financial-stress signal (61% of aged-care homes lossmaking, StewartBrown Dec 2025) directly relevant to discretionary compliance spend. |
| Passive-fit: low ongoing ops after build | 0.20 | 2 | 0.40 | This is fundamentally a high-touch, project-based consulting delivery (workshop + tailored register + drafted text per client) — not self-serve or automatable in its current form. Some longer-run automation potential exists in the register/template tooling itself, but the core deliverable requires manual judgement per engagement. |
| Build feasibility (solo/small team) | 0.15 | 4 | 0.60 | Genuinely feasible for the operator specifically, given the claimed EA/architecture background and AI-agentic build skill — a scoped inventory methodology + register template is buildable in weeks, no exotic tech or large upfront data/capital required. |
| Defensibility / moat potential | 0.10 | 2 | 0.20 | Capped per the crew's rule (no verified competitor pricing probe conducted; >3 named players chasing a similar mandate trips the crowding check). The operator's architecture-skill edge is plausible but unverified as genuinely hard to substitute versus a generalist consultant or a maturing GRC tool feature. |
| Regulatory drag — inverse (5=none) | 0.10 | 3 | 0.30 | No licensing requirement for the venture itself, but the licensed-advice-boundary risk (`verification-app17.md`, verdict: manageable-with-framing, not clear) and the PI-insurance dependency are real, non-trivial obligations — a mid-range, not a "none," score. |

**Raw sum:** 0.50 + 0.40 + 0.40 + 0.60 + 0.20 + 0.30 = **2.40**
**Score (raw sum × 20):** 2.40 × 20 = **48 / 100**

### Disqualifier check

| Disqualifier | Status |
|---|---|
| Hard legal block | Not present — verdict is manageable-with-framing, not disqualifying (see `verification-app17.md`), contingent on routing scope determinations through a named lawyer, not resolving them unilaterally at $4,500 fixed-price volume |
| Single-platform dependency | Not present |
| Zero willingness-to-pay | Not present — WTP scored 2 (weak/analogous), not 0/zero; no automatic disqualifier triggered |

No automatic disqualifier triggered. Verdict stands on score.

---

## Verdict: PARK (48/100)

**48/100 falls in the PARK band (45-69), close to its floor.** This is a real, well-evidenced regulatory mechanism attached to a genuine deadline and real penalty exposure — the underlying "why" is not fabricated. But the venture does not clear PURSUE for three compounding reasons: (1) conviction is a clean FAIL — every piece of recurring signal found is professional/vendor anticipation, not buyer-side pain or spend; (2) the target buyer segment carries a quantified, directly-relevant financial-stress counter-signal (61% of aged-care homes lossmaking) that specifically undercuts discretionary compliance spend, and the same channel/segment combination already PARKed once in this portfolio (56/100, since removed) citing this exact friction; (3) defensibility is unverified — at least 3 named boutique consultancies already have a head start on readiness content and methodology positioning, with no competitor pricing probed to confirm an actual price/packaging gap exists.

## Divergence from the operator's self-assessed 69/90

The operator's own rubric places this at 69/90 ("pursue second"), which as a percentage (~77%) sits well into this crew's PURSUE band (≥70). This research's score of 48/100 is materially lower and lands in PARK, not PURSUE. **The divergence is concentrated almost entirely in the demand/conviction layer**: the operator's brief treats the regulatory mechanism's existence, the OAIC's general enforcement-power expansion, and the Jan 2026 compliance sweep as direct evidence of buyer urgency in this specific sector. Verification found the legal mechanism itself checks out (see `verification-app17.md`), but the sector-specific urgency amplification does not — the Jan 2026 sweep targets unrelated retail sectors under a different APP, and no buyer-side demand signal (reviews, jobs, forums, peak-body guidance, direct spend) was found anywhere for this specific deliverable, despite deliberate search. A secondary, smaller divergence is on defensibility — the operator's self-score likely credits the EA/architecture-skill edge more heavily than this research can currently support, given at least 3 named consultancies with a head start and no direct pricing probe confirming a real price/packaging gap.

---

## Top 3 unknowns for G1

1. **Real buyer WTP, tested directly.** Does direct outreach to 15-20 named privacy officers/compliance managers at AU health/aged-care orgs (via Remediant + IAPP ANZ + LinkedIn) produce ≥3 paid-deposit or signed-LOI commitments within 3 weeks (the threshold set in `conviction-signal.md`)? This is the single highest-leverage unknown — it directly overturns or confirms the conviction FAIL that drives this PARK verdict.
2. **Competitor pricing, probed directly.** What do IIS Partners and Helios Salinger actually quote a buyer-style enquiry for an ADM inventory/readiness engagement? This resolves both the "pricing UNKNOWN" competitive-lane status and materially changes the defensibility sub-score (currently capped/unverified).
3. **Licensed-advice-boundary sign-off.** Does a qualified AU privacy/technology lawyer confirm the "manageable-with-framing" verdict in `verification-app17.md` holds specifically for a high-volume, fixed-price, solo-operator delivery model (not just for the boutique consultancies already doing adjacent work at presumably lower volume/higher price with more built-in review time)? This determines whether PI insurance and a named law-firm sign-off gate are launch-blocking requirements, not optional mitigations.
