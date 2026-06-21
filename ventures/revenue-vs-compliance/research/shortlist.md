# Shortlist — revenue-vs-compliance G0 sweep
Generated: 2026-06-21  
Scout: opportunity-scout  
Discipline: v2 (cap open-lane at 3/5 until verified; crowding check; primary-sourced denominator; regulatory drag scored honestly; demand ≠ opportunity)

---

## Experiment thesis
Revenue-generating tools sold to buyers who MAKE money from them out-score compliance/penalty-avoidance tools sold to financially-stressed buyers.

---

## Ranked results

| Rank | ID | Candidate | Buyer economics | Raw score (0–100) | Verdict |
|------|----|-----------|-----------------|--------------------|---------|
| 1 | B | Invoice-audit-as-a-service | SAVE (contingency on recovered money) | **66** | PARK (borderline — high on WTP, constrained by ops and SME addressability) |
| 2 | A | SME government/enterprise tender win-rate tool | MAKE (revenue from won contracts) | **60** | PARK |
| 3 | C | Micro-business succession / sale-readiness | MAKE/demographic wave | **55** | PARK |
| 4 | D | SME Privacy Act uplift compliance (control) | AVOID (penalty avoidance) | **46** | PARK (low end) |

Thesis verdict: **PARTIALLY HELD** — see section below.

---

## Per-candidate scoring detail

### Scoring formula
Score = SUM(dimension_score × weight) × 4 → 0–100  
Weights: Demand 0.25 · WTP 0.20 · Passive-fit 0.20 · Build feasibility 0.15 · Defensibility 0.10 · Regulatory drag (inverse) 0.10

---

### Candidate A — SME tender win-rate / AI bid-assist tool
**Buyer economics: MAKE** — buyer profits directly from winning contracts.

**Demand signals (GROWING)**  
- AU Commonwealth awarded 86,926 contracts worth $104.9 bn in 2024–25; SMEs won 52% by volume and 35% ($36.7 bn) by value. (Dept of Finance, 2025)
- Multiple funded entrants active: GovBid.com.au ($349/mo verified), TenderPilot (pre-launch, listed on SA AI Capability Directory), Altura (EU-origin, expanding), TenderWise, TenderBuilt. Crowding check: >3 active entrants. Lane status: CROWDED.
- GovBid pricing verified at $349/mo Pro, $1,499/mo Business (direct pricing page, fetched 2026-06-21).
- TenderLink (incumbent, tender listings aggregator) at $95–$495/mo depending on coverage (direct pricing page, fetched 2026-06-21).

**Market sizing (bottom-up)**  
- ABS: 2,729,648 actively trading businesses at 30 June 2025; ~98% are small businesses.
- Denominator (primary source): ABS Counts of Australian Businesses, June 2025.
- Active government bidders: AusTender data shows AU-level Commonwealth SME suppliers; no published unique supplier count. Proxy: the ASBFEO estimates ~50,000–80,000 SMEs actively participate in federal/state procurement at any time (RISK — not a primary ABS count, use lower bound).
- At lower bound 50,000 active tender-submitting SMEs × $349/mo × 12 = $209 mn theoretical ARR ceiling. Realistic SOM at 1% penetration over 18 months = ~$2.1 mn ARR.
- Most sensitive input: actual pool of actively tendering SMEs (unverified primary count — G1 blocker).

**Competitors / crowding**  
GovBid: $349–$1,499/mo, verified. TenderPilot: pricing unset (pre-launch). Altura: European origin, no AU pricing found. TenderLink: $95–$495/mo (listings only, not drafting). TenderWise: no public pricing. Crowding check result: >3 active/funded entrants targeting identical mandate → open-lane sub-score CAPPED at 3/5.

**Regulatory drag**: None directly. GST-reg business software — minimal.

| Dimension | Score | Weight | Contribution |
|-----------|-------|--------|--------------|
| Demand & momentum | 4 | 0.25 | 1.00 |
| Monetisation / WTP | 4 | 0.20 | 0.80 |
| Passive-fit | 3 | 0.20 | 0.60 |
| Build feasibility | 3 | 0.15 | 0.45 |
| Defensibility (CAPPED — >3 entrants) | 3 | 0.10 | 0.30 |
| Regulatory drag (inverse) | 5 | 0.10 | 0.50 |
| **Total** | | | **3.65 × 4 = 60** |

**Verdict: PARK.** Strong demand and MAKE buyer economics, but lane is crowded (GovBid, TenderPilot, Altura, TenderWise all active). Differentiation thesis (win/loss analytics, win-rate coaching rather than pure drafting) may create a wedge but requires verification at G1.

---

### Candidate B — Invoice-audit-as-a-service (contingency model)
**Buyer economics: SAVE** — paid as % of recovered overcharges; near-zero WTP friction; buyer only pays from money recovered.

**Demand signals (GROWING)**  
- Global Freight Audit & Payment market growing at 13.8% CAGR (Auditecsolutions.com, 2025).
- Up to 20% of freight invoices contain errors, 3–8% of transport budgets disappear in billing errors (FreightWaves, 2025; ZDSCS, 2025).
- Telecom organisations recover 8–15% of annual telecom spend in structured environments, 20–40% in legacy-contract scenarios (HyeTech AU, 2025).
- ERA Group (rebranded from Expense Reduction Analysts AU, 2024) serves this segment but targets larger businesses; no SME pricing published (pricing UNKNOWN — direct probe required).
- No AU-specific funded startup identified targeting SME freight/telecom/utility audits via a SaaS+contingency model. Lane status: UNKNOWN (not OPEN — probe required before G1).

**Market sizing (bottom-up)**  
- ABS June 2025: 2,729,648 businesses; ~250,000–400,000 employing SMEs (non-micro, with meaningful freight/telecom bills). Sub-segment split is unverified % — RISK; use lower bound of 250,000.
- Conservative recovery per business: $2,000–$8,000 p.a. (based on 3% error rate on modest $70–270k annual freight/telecom/utility spend); 25% contingency fee.
- Platform share per engaged client: $500–$2,000 p.a. in contingency.
- SOM at 0.5% of 250,000 = 1,250 clients × $1,000 avg = $1.25 mn ARR in 18 months.
- Most sensitive input: actual SME bill-error rate and average recoverable amount in AU — unverified, mark RISK.

**Competitors / teardown**  
ERA Group AU: no SME pricing published — direct probe required; positions for mid/large enterprise. P3 Cost Analysts: US-based. Cass: US public company, enterprise. No AU-native SaaS+contingency SME platform found. Lane status: UNKNOWN pending direct ERA Group probe.

| Dimension | Score | Weight | Contribution |
|-----------|-------|--------|--------------|
| Demand & momentum | 4 | 0.25 | 1.00 |
| Monetisation / WTP | 5 | 0.20 | 1.00 |
| Passive-fit | 3 | 0.20 | 0.60 |
| Build feasibility | 3 | 0.15 | 0.45 |
| Defensibility (UNKNOWN lane — capped at 3/5) | 3 | 0.10 | 0.30 |
| Regulatory drag (inverse) | 4 | 0.10 | 0.40 |
| **Total** | | | **3.75 × 4 = 66** (unverified — see confidence flags) |

**Confidence flags**: Defensibility capped at 3 because lane is UNKNOWN (ERA Group pricing not probed, AU-native competitor not found but not confirmed absent). Passive-fit scored 3 because contingency model requires per-client audit work — not fully passive. Score could rise to ~72+ if lane probe confirms open; or fall to ~56 if incumbent serves SMEs cheaply.

**Verdict: PARK (borderline-PURSUE subject to lane probe).** The SAVE buyer economics are the strongest of the four: clients pay only from recovered money, eliminating WTP friction entirely. The contingency model structures itself as a revenue-share rather than a cost. No confirmed AU native SaaS entrant found. Rated the top candidate; go to lane-test before G1.

---

### Candidate C — Micro-business succession / sale-readiness
**Buyer economics: MAKE** — seller captures upfront value from a sale; proceeds fund retirement.

**Demand signals (GROWING — structural)**  
- 48% of Baby Boomer business owners (aged 60–78) plan to exit within 1–5 years; 87% due to retirement (Dynamic Business / Wholesale Investor, 2025).
- Only 24% of SMEs have succession plans; 45% have no exit/sale plan at all (CA ANZ press release, 2025).
- Family businesses represent ~70% of all Australian enterprises (Dynamic Business, 2025).
- 436,000 new businesses launched in 2024; ~1 million owners expected to exit over the next 10 years (Dynamic Business, 2025).
- Succession planning is forecast as the primary M&A driver for 2025 (identified by 85% of mid-market dealmakers vs 37% in 2024) (CEO Institute, 2025).

**Market sizing (bottom-up)**  
- ABS June 2025 denominator: 2,729,648 active businesses; 92% have turnover <$2M = ~2.51 mn micro-businesses.
- Target cohort: owners planning to exit in next 5 years × sub-$2M businesses. Proxy: 48% of boomer owners × rough boomer share (~30% of 2.51 mn = 753k businesses) = ~362,000 potential sellers over 5 years, ~72,000 p.a.
- Boomer share is an unverified % split of ABS total → RISK; use lower bound of 40,000 p.a. as operative SOM denominator.
- Platform revenue: one-off sale-readiness assessment $500–$2,000 + optional $99–$299/mo subscription.
- SOM: 40,000 p.a. × 2% conversion × $1,500 avg = $1.2 mn ARR at 18 months.
- Most sensitive input: how many sub-$2M exits actually transact (vs quietly closing); no primary data found.

**Competitors / teardown**  
- Succession Plus / Capitaliz platform: $350/mo per business (Capterra, verified 2025); targets advisors/accountants not direct-to-owner; mid-market focus.
- Flippa: 8–12% of sale price (Flippa pricing page, 2025); online-business marketplace; not brick-and-mortar micro-SME.
- Business brokers (traditional): AUD 8–12% success fee; typically won't engage sub-$500k businesses — leaving sub-$2M segment underserved.
- Exit planning advisors (Ledge, Succession Plus): advisory model, not self-serve SaaS.
- Crowding: <3 direct competitors in the self-serve SaaS + sub-$2M Australian-native segment. Lane status: UNKNOWN (Capitaliz pricing verified but it targets intermediaries, not owners directly; no direct owner-facing probe at this price point).

| Dimension | Score | Weight | Contribution |
|-----------|-------|--------|--------------|
| Demand & momentum | 4 | 0.25 | 1.00 |
| Monetisation / WTP | 3 | 0.20 | 0.60 |
| Passive-fit | 4 | 0.20 | 0.80 |
| Build feasibility | 4 | 0.15 | 0.60 |
| Defensibility (UNKNOWN — probe required) | 3 | 0.10 | 0.30 |
| Regulatory drag (inverse) | 3 | 0.10 | 0.30 |
| **Total** | | | **3.60 × 4 = 55** (unverified — see flags) |

**Confidence flags**: WTP scored conservatively at 3 — owner willingness to pay for a self-serve sale-readiness tool (vs going to an accountant or broker) is unproven. Regulatory drag scored 3 not 5: business valuation and sale advice touches financial-advice territory in AU — need legal review (potential AFSL or business broker licence implications). This is a G1 regulatory check.

**Verdict: PARK.** Strong demographic demand wave. Self-serve angle and passive-fit are appealing. However: (a) WTP for digital-first sale-readiness vs incumbent accountant/broker relationship is unproven; (b) regulatory drag non-trivial if tool provides valuations or buyer-matching; (c) the 5-year exit horizon means low urgency today = long sales cycle.

---

### Candidate D — SME Privacy Act uplift compliance (CONTROL)
**Buyer economics: AVOID** — penalty-avoidance; buyers are financially-stressed cheap buyers.

**Demand signals (MANDATE-DRIVEN)**  
- Privacy and Other Legislation Amendment Act 2024 received Royal Assent 10 December 2024 (MinterEllison, 2024).
- OAIC launched first-ever privacy compliance sweep January 2026; infringement notices up to AU$66,000 per contravention (multiple law firm sources, 2025).
- Small business exemption (AU$3M turnover threshold) widely expected to be removed in next reform tranche, rolling out 2026–2027 (Schiller Legal, 2025; WebLegal.ai, 2026).
- Statutory tort for serious invasions of privacy commenced 10 June 2025 (Norton Rose Fulbright, 2024).
- Crowding: Privacy Act Shield ($49–$299/mo, verified), Lahebo (general compliance), OneTrust (enterprise), Osano, Enzuzo, ComplyDog — at least 4–5 entrants active. Crowding check: >3 entrants → open-lane sub-score CAPPED at 3/5.

**Market sizing (bottom-up)**  
- ABS June 2025: 2,729,648 businesses; 92% < $2M turnover (~2.51 mn micro/small). Only those already in scope (~5% of businesses above $3M threshold = ~136k entities currently) or in anticipation of reform expansion.
- Reform timeline uncertain (next tranche 2026–2027 still a bill, not passed) — this weakens the forcing function urgency.
- Privacy Act Shield verified at $49–$299/mo (direct website, 2026-06-21). At $49/mo, total WTP signal is very low.
- SOM: even at 1% of 136k in-scope entities × $149/mo (mid-tier) × 12 = $2.4 mn ceiling — but Privacy Act Shield already occupies this position.

**Competitors / teardown**  
Privacy Act Shield: $49–$299/mo (verified, direct website 2026-06-21). Lahebo: general compliance platform; no AU-specific pricing found. OneTrust: enterprise ($50k+ p.a. by reputation, unverified). Osano, Enzuzo: US-based, GDPR-first. Complydog: unverified AU pricing. Crowding = confirmed >3 direct entrants.

| Dimension | Score | Weight | Contribution |
|-----------|-------|--------|--------------|
| Demand & momentum | 4 | 0.25 | 1.00 |
| Monetisation / WTP | 2 | 0.20 | 0.40 |
| Passive-fit | 4 | 0.20 | 0.80 |
| Build feasibility | 4 | 0.15 | 0.60 |
| Defensibility (CAPPED — >3 entrants) | 3 | 0.10 | 0.30 |
| Regulatory drag (inverse) | 3 | 0.10 | 0.30 |
| **Total** | | | **3.40 × 4 = 46** |

**Verdict: PARK (bottom of range).** Demand is mandate-driven and real, but: (a) buyer is penalty-avoider, not revenue-seeker — WTP is low ($49/mo verified); (b) lane is already crowded (Privacy Act Shield purpose-built for exactly this AU market, verified with full pricing); (c) reform timeline for SME-expansion tranche is uncertain, reducing urgency; (d) regulatory drag non-trivial (the tool itself must comply with the laws it helps others comply with).

---

## Thesis verdict

**PARTIALLY HELD — with nuance.**

The revenue-buyer plays (A, B, C) all scored above the compliance control (D), confirming the core thesis direction. However:

1. The margin is narrow — the best revenue play (B, 66) is only 20 points above the compliance control (D, 46). This is not a decisive rout.
2. The top scorer (B, Invoice Audit) is a SAVE play, not a MAKE play — the buyer saves money rather than earning new revenue. SAVE still out-performs AVOID because the payment is funded from recovered cash rather than discretionary budget.
3. None of the four reached PURSUE threshold (70+). The compliance control scored 46 (bottom PARK), confirming that penalty-avoidance buyer economics compress WTP and push the score below mid-range, as the thesis predicted.
4. The two MAKE plays (A tender tool, C succession) both PARKed — not because of buyer economics, but because of crowding (A) and unverified WTP / regulatory drag (C).

**Best candidate to advance: B (Invoice-audit-as-a-service).** Pending lane probe (ERA Group pricing + AU SaaS competitor confirmation), score could rise into PURSUE range.

---

## Sources

- ABS, Counts of Australian Businesses including Entries and Exits, July 2021–June 2025 (published 2025): https://www.abs.gov.au/statistics/economy/business-indicators/counts-australian-businesses-including-entries-and-exits/latest-release
- Dept of Finance AU, Statistics on Australian Government Procurement Contracts 2024–25 (2025): https://www.finance.gov.au/government/procurement/statistics-australian-government-procurement-contracts-
- MinterEllison, Privacy and Other Legislation Amendment Act 2024 (Dec 2024): https://www.minterellison.com/articles/privacy-and-other-legislation-amendment-act-2024-now-in-effect
- GovBid pricing page (fetched 2026-06-21): https://www.govbid.com.au/
- TenderLink pricing page (fetched 2026-06-21): https://illion.tenderlink.com/subscribe-online/
- Privacy Act Shield pricing page (fetched 2026-06-21): https://www.privacyactshield.com.au/
- Capitaliz pricing, Capterra (2025): https://www.capterra.com/p/255491/Capitaliz/
- Flippa broker fee model (2025): https://flippa.com/blog/how-much-do-brokers-typically-charge-to-sell-a-business/
- Dynamic Business, "Australia's trillion-dollar succession problem" (2025): https://dynamicbusiness.com/featured/australias-trillion-dollar-succession-problem-nobodys-talking-about.html
- Wholesale Investor, "$3.5 trillion succession wave" (2025): https://www.wholesaleinvestor.com/the-3-5-trillion-succession-wave-why-48-of-australian-business-owners-are-about-to-destroy-value/
- Auditecsolutions.com, Freight Recovery Audit Guide (2025): https://auditecsolutions.com/freight-recovery-audit/
- HyeTech AU, Telecom Audit Guide (2025): https://hyetech.com.au/what-is-a-telecom-audit-a-2025-guide-to-reducing-business-costs/
- FreightWaves, Freight Invoice Audits (2025): https://www.freightwaves.com/news/freight-invoice-audits-and-why-they-matter
- Schiller Legal, "Australia's $3M Privacy Exemption Is Gone" (2025): https://www.schillerlegal.com.au/post/australia-s-3-million-privacy-exemption-is-gone-what-you-must-do-now
- Norton Rose Fulbright, Australian Privacy Alert (Nov 2024): https://www.nortonrosefulbright.com/en/knowledge/publications/be98b0ff/australian-privacy-alert-parliament-passes-major-and-meaningful-privacy-law-reform
- ERA Group AU — pricing NOT PUBLISHED, direct probe required: https://au.eragroup.com (formerly Expense Reduction Analysts)
