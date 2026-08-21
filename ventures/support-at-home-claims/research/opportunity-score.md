# Opportunity Score — support-at-home-claims (G0 pressure-test)

**Idea under test:** "Support at Home Claims Integrity & Pricing Position Report" — monthly report combining (a) claims-integrity/revenue-leakage analysis of rejected/underclaimed Services Australia claims and (b) price-position benchmarking vs published home-care pricing, sold to finance/ops managers at 50–500-participant registered Support at Home providers, $750–1,500/mo ($500 first-month pilot).
**Scored:** 2026-07-20
**Conviction gate:** `research/conviction-signal.md` — **FAIL** (score 15/100). Under the standard G0 procedure a FAIL stops the pipeline here (PARK on signal grounds). This scorecard is produced anyway per the orchestrator's explicit instruction for this pressure-test session (six-hard-gate checklist + comparison to the operator's 81/90 self-score). **Read the PURSUE/PARK/KILL verdict below as informed by an already-failed conviction gate, not as an independent green light.**

---

## Load-bearing claim verification

| # | Claim | Verdict | Evidence |
|---|---|---|---|
| a | Support at Home providers face material claiming errors/rejections and cash-flow pain, and an "emergency special payment" mechanism exists for cash-flow-blocked providers | **VERIFIED** | Dept of Health, Support at Home Special Payments — Provider Guidance v1.0, Feb 2026 (special payments exist explicitly for providers "experiencing cash flow issues due to barriers submitting their regular claims"; payments are fully recoverable, i.e. a debt, not a grant) — https://www.health.gov.au/sites/default/files/2026-02/support-at-home-special-payments-provider-guidance_1.pdf. Corroborated by named-operator pain: Silverchain, Mullein Care, IRT (The Weekly Source, 25 Jun 2026) — https://www.theweeklysource.com.au/support-at-home-claiming-problems-send-shocks-through-sector/ |
| b | ACQSC can order refunds from providers for pricing/overcharging under Support at Home | **VERIFIED** | Dept of Health media release "Strengthening consumer protections for older Australians" (~May 2026): Commission "empowered... to order refunds for services where providers are found to be overcharging" — https://www.health.gov.au/ministers/the-hon-sam-rae-mp/media/strengthening-consumer-protections-for-older-australians. Corroborated by Australian Ageing Agenda, "Price caps deferred, additional powers for regulator" (May 2026) and ACQSC Regulatory Bulletin RB 2026–1 (2026), https://www.agedcarequality.gov.au/sites/default/files/media/rb-2026-1-support-at-home_pricing-requirements.pdf |
| c | From 1 October 2026, personal care becomes fully government-funded under Support at Home | **VERIFIED — and distinct from the 1 Jul 2025 program start** | Dept of Health, "Personal care to be fully funded under Support at Home from October," https://www.health.gov.au/news/personal-care-to-be-fully-funded-under-support-at-home-from-october — personal care reclassified from the "independence" category to the fully-funded "clinical supports" category effective 1 Oct 2026; separately, My Aged Care confirms the same date and mechanism. This is confirmed as its own change, not a mix-up with the 1 Jul 2025 commencement. |
| d | Published, machine-usable home-care pricing data exists sufficient to build a benchmarking product | **PARTIALLY VERIFIED — the weakest claim, as flagged in the brief** | Published pricing data *exists*: (i) providers are required to publish standard prices on the My Aged Care "Find a provider" comparison tool; (ii) Dept of Health publishes a quarterly **National Summary of Support at Home Prices** (most recent covering Nov–Dec 2025) plus a "Summary of indicative Support at Home prices" — https://www.health.gov.au/resources/publications/summary-of-indicative-support-at-home-prices. However, **no bulk/machine-readable dataset (CSV/API/data.gov.au) was found** for either the per-provider "Find a provider" prices or the quarterly national summary — both appear to be published as web pages / PDF fact sheets, not structured data. Building a benchmark today would most likely require manual collection or scraping a government consumer-facing tool (a ToS and maintenance-cost risk, not a clean data pipeline). **Verdict: the underlying prices are public, but "machine-usable... sufficient to build a benchmarking product" is UNVERIFIED — resolve at G1 by inspecting the actual My Aged Care page structure and asking Health/Services Australia directly whether a bulk extract is available.** |

---

## Six hard gates (pass/fail, operator's constraints)

| Gate | Verdict | Reason |
|---|---|---|
| Launchable within ≤90 days at 10–15 hrs/week | **FAIL** | The price-benchmark half is plausibly launchable solo in 90 days (reuses the existing pipeline, public data). The claims-integrity half cannot start until a paying customer hands over actual Services Australia claims/rejection data — a chicken-and-egg dependency (no customer-independent access path found) that is unlikely to close inside 90 days without a pre-committed design partner, which is not evidenced. |
| Total build-to-first-revenue capital ≤AUD $5,000, itemised | **PASS (for the narrowed price-benchmark scope only)** | Hosting/infra ~$50–150/mo, LLM/API costs ~$100–300/mo, ABN/business admin/insurance ~$500–1,000 one-off, pipeline reuse = ~$0 marginal build cost. Estimated ≈$1,500–3,000 to a first pilot. Excludes any legal/data-sharing-agreement cost the claims-integrity half would add if pursued — not currently budgeted. |
| Evidence of existing spend or acute pain (not just plausible pain) | **WEAK / FAIL as targeted** | Acute pain is real but evidenced only at the largest-provider tier (Silverchain, IRT — top-5/large NFPs) and via a consultancy (Ansell Strategic) selling board-level analysis to "some of the largest home care providers." No evidence of existing spend or acute pain reported by the actual 50–500-participant ICP. |
| A reachable, nameable first-10-customers channel | **FAIL / UNVERIFIED** | Providers are *nameable* (AIHW GEN / My Aged Care provider lists give ~923 home care providers as of 30 Jun 2025), but no warm channel (association, forum, conference, LinkedIn group) was found or evidenced as accessible to the operator. This is cold B2B outreach against a list, not a proven channel. |
| Defensibility beyond "we use AI" (a real moat mechanism) | **FAIL** | Report subscriptions carry low switching costs by design (easy to cancel, no embedded workflow lock-in). No proprietary data advantage: pricing data is public to all, and claims data belongs to the customer, not the operator. Incumbents (Mirus Australia: "Revenue Integrity," "Mirus Metrics," years of sector benchmarking data; Ansell Strategic: existing enterprise relationships) already hold real moats (proprietary benchmarking datasets, brand, existing trust) that a solo entrant would need years to replicate. |
| A real why-now catalyst (not evergreen pain repackaged as urgent) | **PASS** | Three independently dated, verified regulatory events create a genuine window: ACQSC refund powers + quarterly price transparency (~May 2026), 1 Oct 2026 personal-care billing reconfiguration, and ongoing, still-unresolved SaH claiming-system teething problems reported as recently as 25 Jun 2026. |

**Score: 2/6 clear passes, 1 partial, 3 fails.**

---

## Market Sizing (bottom-up)

| Input | Value | Source |
|---|---|---|
| Total home care providers (AU) | 923 providers / 2,363 services at 30 Jun 2025 | AIHW GEN, "Providers of aged care," https://www.gen-agedcaredata.gov.au/topics/providers-of-aged-care (pre-SaH-transition base; SaH replaced HCP/CHSP from 1 Jul 2025–1 Nov 2025 largely with the same provider base — GEN notes updated SaH-specific provider counts were not yet published as of this research date) |
| People using home care | 293,000 at 30 Jun 2025 | AIHW GEN, "People using aged care," https://www.gen-agedcaredata.gov.au/topics/people-using-aged-care |
| Average participants per provider | ≈317 (293,000 / 923) | Derived — **not a distribution**, just a mean; likely skewed by a small number of very large providers (e.g. Silverchain, Bolton Clarke) |
| Target segment: providers with 50–500 participants | **UNSOURCED — RISK, not a base case** | No named source (AIHW/GEN/regulator) was found giving a size-band breakdown of home care/Support at Home providers by participant count (unlike residential aged care, where AIHW does publish a bed-size distribution — 31%/32%/36% small/medium/large — which does **not** transfer to home care and was not used here). Per the market-sizing rule, this must be flagged as a **G1/G2 blocker**, not estimated as a base case. |
| Operative SOM (RISK-labelled lower bound) | ≈150 providers (≈16% of 923, an illustrative floor, not sourced) | RISK — resolve at G1 via a NAPS/Aged Care Provider Portal extract or a direct FOI/data request to the Department for a participant-count-by-provider distribution before this number is used in any financial plan |
| Price (operator's assumption) | $750–1,500/mo, first month $500 | Brief — **unvalidated**; no WTP evidence found at this segment/price (see conviction-signal.md) |
| Illustrative SOM at RISK floor, 5% adoption, $1,000/mo avg, 24mo | ≈7–8 customers × $12,000/yr ≈ **$84–96K ARR** | Illustrative only — built on an unsourced provider-count floor and an unvalidated price |
| SAM (all 923 providers, if segment restriction is dropped) | 923 × $1,000/mo × 12 = $11.1M ceiling at 100% penetration; realistic 2% capture ≈ **$222K ARR** | Derived from AIHW GEN base count only |
| TAM | Not sourced — unavailable | No sector-wide claims-leakage or pricing-overcharge dollar figure was found for Support at Home specifically (the residential-aged-care $368M government overpayment figure found in research is a *different* program and *government-side* reconciliation error — not transferable) |

**Sensitivity:** the entire sizing is most sensitive to the (currently unsourced) 50–500-participant segment size. Until that distribution is obtained from a named source, any ARR projection for this specific ICP is not defensible — the $84–96K illustrative SOM above should not be used for planning.

**Is the obtainable slice worth the build?** Marginal even before accounting for the sizing risk — the illustrative SOM (~$90K ARR at 24 months) is small relative to even a bootstrapped solo effort's opportunity cost, and it rests on an unsourced denominator and an unvalidated price.

---

## Competitor Teardown

| Competitor | Positioning | Pricing | Claims-integrity coverage | Pricing-benchmark coverage | Gaps / notes |
|---|---|---|---|---|---|
| **ShiftCare** | Care-management software (NDIS + aged + home care) with "QuickClaim" — syncs client balances from Services Australia and generates/validates SaH claim files in the required format | Published: Basic $9/staff/mo, Professional $15/staff/mo, Premium $25/staff/mo (ex GST), min. 5 licences (ShiftCare pricing page, 2026, https://shiftcare.com/pricing) | Yes, at point-of-claim (validation, not retrospective leakage analysis) | No | Embeds claim-quality into the platform mid-size providers already run — reduces the addressable "rejected claims" pain over time as adoption grows; does not (yet) do retrospective revenue-leakage audit or pricing benchmarking |
| **AlayaCare** | Enterprise/mid-market ANZ home-care software; first vendor certified by Services Australia for SaH claiming (Nov 2025); processed first live SaH invoice via the government API | **UNKNOWN** — no published price found; would require direct probe | Yes, at point-of-claim (compliant claims pathway) | No | Same substitution dynamic as ShiftCare — reduces claims-error volume at the source for its own customer base |
| **Mirus Australia** | Established aged-care advisory/software incumbent (previously scored in a prior internal venture's research, since removed, for the *residential* side); markets a "Revenue Integrity" service line plus "Mirus Metrics," "ACFI Optimisation," "Revenue Management" | **UNKNOWN** — no published price for any home-care-specific offer found | INFERRED (brand/capability exists; extension into Support at Home specifically not confirmed) | INFERRED | Years of sector benchmarking data and existing enterprise relationships (per the prior teardown, benchmarks ~50% of AU residential aged care) — a real moat this idea cannot match quickly |
| **Ansell Strategic** | Aged-care consultancy; already produces a recurring Board Pack for large home-care provider boards, including SaH pricing-vs-national-median analysis | **UNKNOWN** (likely bespoke consulting rates, not a $750–1,500/mo subscription) — no published price found | No (pricing focus, not claims) | **Yes — already doing exactly this analysis** for "some of the largest home care providers" (The Weekly Source, 27 Nov 2025) | Direct evidence the *price-benchmark* half of this idea already has a paying buyer — but only at the top of the market, served by an established, trusted advisory brand |
| **The spreadsheet / bookkeeper** | Manual reconciliation or outsourced bookkeeping (e.g. Scale Suite-style embedded finance teams) | Bookkeeping/fractional-CFO market rates, not itemised for SaH specifically | Partial, manual | No | Default incumbent behaviour for mid-size providers absorbing claims admin as a bookkeeping cost rather than buying a dedicated product |

**No published price was found for the two most direct comparables (AlayaCare, Mirus)** — per the competitor-teardown rule, this makes the competitive lane **UNKNOWN, not open**. A direct buyer-style pricing probe of at least Mirus and Ansell is required before any "open lane" claim can be scored above 3/5.

**Wedge thesis (one sentence):** there is a real, uncaptured gap — no vendor currently sells a standalone, low-cost, neutral, non-software-vendor monthly report combining claims-integrity and price-benchmarking specifically packaged for 50–500-participant Support at Home providers — but it is uncaptured because incumbents are moving *into* it from both directions (platforms absorbing claims-quality at the point of entry; consultancies extending pricing analysis down-market), not because it is defensible once occupied.

**Switching cost:** low (report subscriptions, easily cancelled) — this is itself a disqualifying signal for the defensibility dimension below.

**Platform dependency:** moderate — the claims-integrity half depends on Services Australia's claim-data formats and a customer's willingness to share exports; the pricing half depends on the Department of Health continuing to publish price transparency data in its current (or a better) form.

---

## Scorecard

| Dimension | Weight | Score (1–5) | Weighted | Rationale and source |
|---|---|---|---|---|
| Demand and search momentum | 0.25 | 2 | 0.50 | Real, dated regulatory/operational pain (claims a, verified) but evidenced only at the largest-provider tier — no evidence it reaches the 50–500-participant ICP as an active, budgeted problem (conviction-signal.md, FAIL/15). |
| Monetisation clarity / WTP | 0.20 | 2 | 0.40 | The only comparable paid product (Ansell Strategic's board-pack pricing review) sells to the largest providers, not this ICP, and no price is published for it; the operator's $750–1,500/mo is an unvalidated assumption. |
| Passive-fit: low ongoing ops after build | 0.20 | 3 | 0.60 | Report generation off a reusable pipeline is plausible, but each customer's claims-data onboarding is a recurring, non-automatable relationship task, and regulatory content (pricing rules, ACQSC changes, quarterly price summaries) needs ongoing maintenance. |
| Build feasibility (solo/small team) | 0.15 | 3 | 0.45 | Genuine plus: reusable entity-resolution/report pipeline and AU aged/home-care domain knowledge. Genuine minus: claims-data access has a chicken-and-egg dependency (hard gate 1, FAIL) and pricing data's machine-usability is unconfirmed (claim d). |
| Defensibility / moat potential | 0.10 | 2 | 0.20 | **Capped ≤3 by rule** (lane unverified by direct competitor price probe) — actual score below the cap: low switching cost by design, no proprietary data advantage, and incumbents (Mirus, Ansell) hold real moats (years of benchmarking data, existing trust) this idea has no near-term way to match. (unverified — direct pricing probe of Mirus/Ansell required before this can move) |
| Regulatory drag — inverse (5=none) | 0.10 | 3 | 0.30 | No licensure required for the report itself, but it touches participant financial data (Privacy Act) and sits adjacent to a live regulatory enforcement mechanism (ACQSC refund power) — the product must avoid appearing to give compliance/financial advice about a client's own overcharging exposure. Moderate, not extreme, drag. |

**Raw sum:** 0.50 + 0.40 + 0.60 + 0.45 + 0.20 + 0.30 = **2.45**
**Score (raw sum × 20):** 2.45 × 20 = **49 / 100**

---

## Verdict: PARK (bordering KILL)

Score of 49 sits at the low end of the PARK band (45–69), and that number should be read alongside a **FAIL conviction gate (15/100)** that would have stopped this pipeline before any scoring under the standard G0 procedure. Combined with 3 of 6 hard-gate fails (90-day launch, first-10-customers channel, defensibility) and one weak-pass (acute pain evidenced at the wrong buyer tier), the honest read is: **this specific idea, at this specific ICP and price point, is not ready to advance to G1 as scoped.** It is not an automatic KILL only because the underlying regulatory catalysts are real and dated, the operator's pipeline/domain-expertise assets are genuine, and one half of the idea (price-benchmarking) has a directly analogous, already-paying precedent (Ansell Strategic) — just not yet at this segment or price. If pursued further, it should be re-scoped (see G1 unknowns) rather than built as currently specified.

### Disqualifier check
| Disqualifier | Status |
|---|---|
| Hard legal block | Not present — no licensure required for report generation; Privacy Act obligations apply and must be designed for |
| Single-platform dependency | Not a single platform, but claims-integrity half depends on Services Australia's claim-data formats and customer cooperation |
| Zero willingness-to-pay | Not literally zero (Ansell Strategic proves adjacent WTP exists) but zero *at this segment/price point* — borderline |

No automatic disqualifier triggers by the strict definition, but the WTP borderline is load-bearing for the PARK-not-PURSUE call.

---

## Comparison to operator's self-score (81/90)

The operator scored this 81/90 (90%) on their own rubric. The crew's independent score is **49/100**, and the conviction gate underlying it is a **FAIL (15/100)** — a large gap. The operator was over-optimistic on:

1. **Willingness to pay at the target segment.** The operator's thesis assumes 50–500-participant providers will pay $750–1,500/mo. Every piece of real WTP evidence found (Ansell Strategic, Mirus Revenue Integrity) belongs to the *largest* providers, served by established advisory relationships — a different buyer with a different budget line. This is the single biggest gap between the operator's score and the crew's.
2. **Defensibility ("neutral, not-the-vendor-you'd-audit").** This positioning is real but thin — it does not survive contact with the fact that Mirus and Ansell already have years of benchmarking data and existing trust, and that report subscriptions carry near-zero switching cost. The operator's rubric likely credited the "not a software vendor" angle as a moat; it is a positioning choice, not a moat mechanism.
3. **90-day launch feasibility.** The operator's time/capital constraints are realistic for the price-benchmark half alone, but the claims-integrity half has a customer-data chicken-and-egg problem the operator's rubric does not appear to have weighted — you cannot analyse claims you don't have, and no independent access path to Services Australia claims data was found.

Where the operator was *not* wrong: the four load-bearing regulatory claims (a–c fully verified, d partially) are real, and the reusable Remediant pipeline is a genuine, evidenced asset for build feasibility. The gap is concentrated in demand/WTP-at-segment and defensibility, not in the regulatory premise.

---

## Top 3 G1 unknowns

1. **Willingness to pay at the actual 50–500-participant ICP and $750–1,500/mo price point** — currently zero direct evidence; the only comparable paid product serves a different (larger) tier. Resolve via 15–20 direct outreach conversations with named mid-size providers and a concrete $500-pilot fake-door offer.
2. **Claims-data access mechanism** — is there any way to build or demo the claims-integrity analysis before a customer is signed (e.g. a design-partner data-sharing agreement, delegated ACPP access), or does this product require a paying customer before the core analytic engine can even be tested? This determines whether the 90-day/≤$5K constraints are achievable at all for that half of the product.
3. **Machine-usability of Support at Home pricing data** — is the quarterly National Summary of Support at Home Prices or the My Aged Care "Find a provider" pricing data available as a bulk extract/API, or does the price-benchmark half require ongoing manual collection/scraping of a government consumer tool (cost, maintenance burden, and possible ToS risk)? Resolve by directly inspecting the underlying page/data structure and asking the Department whether a bulk dataset exists.
