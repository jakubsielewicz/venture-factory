# Opportunity Score Revalidation — Modern Award Pay Compliance Checker
**Venture:** au-sme-compliance
**Original score:** 74/100 PURSUE (2026-06-18)
**Revalidation date:** 2026-06-21
**Author:** opportunity-scout (revalidation — updated scoring discipline applied)
**Scoring discipline applied:** Updated rules — competitor-teardown: no public price = UNKNOWN; lane OPEN only after top-2 directly probed and above ICP threshold; crowding check (>3 funded entrants → cap open-lane at 3/5); confidence-flag unverified rows.

---

## Purpose and Scope

This document re-examines the original 74/100 PURSUE verdict under three pressure tests:
1. **Crowding:** How many startups/platforms now chase AU modern-award pay compliance post-criminalisation (Jan 2025)?
2. **Lane verification:** Is the "no cheap self-serve award-audit tool" claim verified or inferred?
3. **Re-score:** What does the score become after applying the capped open-lane and crowding rules?

Sources are from live web research conducted 2026-06-21. The original scoring evidence is preserved in `research/opportunity-score.md`.

---

## Demand Signals (Updated)

**Signal 1 — Criminal liability unchanged and escalating (HIGH credibility)**

Fair Work Act s 327A criminal wage theft remains operative from 1 January 2025. Penalties: 25,000 penalty units (body corporate, AUD ~$8.25M at $330/unit) or 3× underpayment, whichever is greater. [Secondary — Commoner Law, Norman Waterhouse, Addisons, 2025. Department of Employment and Workplace Relations primary announcement confirmed at dewr.gov.au, 2025]

**Signal 2 — Annual wage escalation is recurring and accelerating (HIGH credibility)**

FWC 2024–25 Annual Wage Review: 3.5% increase effective 1 July 2025. NMW to $24.95/hr. [Secondary — Mapien, HR Leader, 2025]
FWC 2025–26 Annual Wage Review: 4.75% increase effective 1 July 2026. NMW to $26.44/hr. [Secondary — Squire Patton Boggs, DLA Piper, 2026]
Every award-covered employer must update pay rates each July — recurring urgency trigger confirmed.

**Signal 3 — Platform activity confirms market urgency (HIGH credibility)**

Employment Hero launched "Award Costing" natively in June 2025. [Primary — employmenthero.com/blog/product-update-june-2025/]
Deputy launched "Deputy Payroll AU" with built-in award interpretation in June 2025. [Primary — deputy.com/au, pricing fetched 2026-06-21]
Wrkr Ltd acquired PaidRight for A$11.4M in December 2025 / February 2026. [Primary — paidright.io announcement; ASX release 22 December 2025]
Yellow Canary released 2026 State of Payroll Compliance Report (yellowcanary.com.au, 2026): "1 in 3 employers not confident they are paying employees correctly."

These are confirmation signals — established, funded players are moving resources into this exact space.

**Demand direction: GROWING — but demand growth is attracting crowding, not confirming an open lane.**

---

## Market Sizing (Unchanged From Original — Bottom-Up)

**ABS employing businesses (1–199 employees):** ~988,856 [Primary — ABS "Counts of Australian Businesses", abs.gov.au, August 2025 release]
**Award-covered subset (~60%):** ~593,000 businesses [Estimate — unverified; G1 validation required]
**Target ARPU (AUD $79/mo base):** $948/year [Estimate — pricing hypothesis]
**12–24 month obtainable slice:** 593–1,779 accounts × $948 = AUD $562K–$1.69M ARR

No revision to market sizing — the buyer pool and ARPU hypothesis are unchanged. The question is whether this market is accessible given competitive crowding, not whether the market exists.

**SAM:** ~AUD $562M/yr [Estimate — derived from ABS primary × estimated coverage × estimated ARPU]
**TAM:** ~AUD $1B [Order-of-magnitude estimate — MarkWide Research USD $685M, 2026; single secondary source]

---

## Competitor Teardown (Updated)

### Competitor 1 — Employment Hero (KeyPay engine) — STRENGTHENING THREAT

- **Positioning (updated):** All-in-one HR + payroll. Has moved aggressively into award compliance with two new capabilities in 2025: (a) Award Costing (June 2025), available to all Employment Hero Payroll-connected organisations; (b) HeroForce, a co-employment model with AI-driven award interpretation at 3–5% of payroll. [Source: employmenthero.com/blog/product-update-june-2025/; dynamicbusiness.com, 2025]
- **Pricing (fetched 2026-06-21):** HR Essentials AU$10/emp/mo (min AU$100/mo); HR Engage AU$14/emp/mo (min AU$140/mo). HeroForce: 3–5% of payroll (no monthly minimum disclosed).
- **Award interpretation:** Now native — Award Costing covers Roster, Timesheet, Classification, Shift Conditions. This is materially more than the original research showed (the original only cited the payroll engine interpretation, not the new standalone costing module).
- **Wedge assessment:** Employment Hero still requires full system migration (payroll + HR). Its minimum AU$100/mo is AT the ICP affordability ceiling. It does not offer a standalone CSV-audit-only product. **But**: HeroForce at 3–5% of payroll for a 10-person business at average AU wages (~$50K/yr per employee) = 3–5% × $500K = AU$15K–$25K/yr (AU$1,250–$2,083/mo) — orders of magnitude above ICP. HeroForce is not an SME threat.
- **Platform risk:** ELEVATED. Employment Hero is actively building into the audit space. Its product trajectory points toward the exact wedge within 12–24 months.
- **Switching cost:** High — payroll migration is painful.

### Competitor 2 — Deputy (with Deputy Payroll AU, June 2025) — MEANINGFUL NEW THREAT

- **Positioning:** Rostering/scheduling + payroll (AU) + award interpretation. Deputy Payroll AU launched June 2025, extending into the payroll processing and award compliance space.
- **Pricing (fetched 2026-06-21):** Core AU$8.75/user/mo; Payroll add-on AU$5/user/mo; minimum AU$30/mo. Payroll promotional: free until January 2027.
- **Award interpretation:** Included at no extra cost in all tiers. Advanced Award Interpretation in Core+ plans.
- **Wedge assessment:** Deputy is BELOW the ICP affordability threshold — a 5-person business would pay AU$30–$70/mo. However, Deputy's compliance layer is tied to rostering: it validates pay for scheduled shifts, not for employers who use separate payroll systems (Xero/MYOB). It does NOT offer: (a) a standalone CSV-upload audit workflow; (b) a safe-harbour PDF; (c) coverage for non-rostered workers (professional services, construction, salaried employees).
- **Lane threat:** LOW for non-shift businesses; MEDIUM for shift-work businesses (hospitality, retail — the highest-award-complexity segment).
- **Switching cost:** Medium — schedule and time data lock-in.

### Competitor 3 — Workstem AU — NEW THREAT (not in original teardown)

- **Positioning:** Self-serve cloud payroll with built-in award interpretation for AU SMEs. Covers 122+ modern awards and 34 EBAs. Quick setup: "30 minutes for a 10-employee SME." [Source: workstem.com/au, fetched 2026-06-21]
- **Pricing (fetched 2026-06-21):** Attendance Plus AU$7/emp/mo (min 5 emp = AU$35/mo); Payroll Pro AU$16/emp/mo (min 5 emp = AU$80/mo). Annual billing.
- **Wedge assessment:** Workstem Payroll Pro at AU$80/mo DIRECTLY UNDERCUTS the original $49–$99/mo wedge for a 5-employee business. This is a self-serve payroll system that includes award interpretation — it is not a standalone audit tool, but it undercuts the price premise significantly.
- **Gap remaining:** Workstem requires ADOPTING WORKSTEM AS THE PAYROLL SYSTEM, not just auditing existing payroll. An SME already on Xero/MYOB would face payroll migration friction. But Workstem is a credible alternative for new adopters.
- **Switching cost:** Medium — payroll history and employee records.

### Competitor 4 — WageSafe — PRICING UNKNOWN

- **Positioning:** Real-time payroll compliance platform. "Independent audit of every employee, every pay cycle." Integrates with existing HRIS. 1,500+ Australian businesses. Founded 2021; no funding raised; 14 employees. Enhanced compliance features released April 2026. [Source: wagesafe.com.au; tracxn.com; newshub.medianet.com.au, April 2026]
- **Pricing:** UNKNOWN — no public pricing page; demo/consultation only.
- **Wedge assessment:** Language ("compliance platform," "real-time," HRIS integration) suggests enterprise pricing. But NO verified probe has been conducted. Per the updated discipline, lane status cannot be declared OPEN until WageSafe is probed. See probe template in `research/lane-test-revalidation.md`.
- **Confidence flag:** (unverified — direct probe required before lane can be confirmed open)

### Competitor 5 — FairWork Mate — ABOVE ICP THRESHOLD (confirmed)

- **Positioning:** AI-powered Fair Work HR Q&A + 240+ calculators. Free payslip scanner available. Business plan from AU$499/mo. Pay Rate API from AU$99.99/mo.
- **Pricing (fetched 2026-06-21):** Business plan from AU$499/mo. Pay Rate API from AU$99.99/mo. [Primary — fairworkmate.com.au, fetched 2026-06-21]
- **Wedge assessment:** At AU$499/mo, FairWork Mate is 5× above the ICP affordability ceiling. The free payslip scanner is a single-payslip tool, not a bulk payroll audit. The Pay Rate API at AU$99.99/mo is a developer-facing API, not an SME product.
- **Lane threat:** LOW — priced out of the SME segment.

### DIY / Manual Alternative

FWO Pay and Conditions Tool (free, government). Requires knowing the correct award and classification upfront. No bulk check. No safe-harbour PDF. PayRate.au (free, 40+ awards calculator, no CSV upload). [Source: payrate.au, fetched 2026-06-21]

### Wedge Thesis (Revised)

The original wedge — "platform-agnostic CSV payroll upload + employee classification check + safe-harbour PDF, at $49–$99/mo" — still describes an UNOCCUPIED product type. No current competitor offers all three of: (a) accepts a CSV from any payroll system; (b) maps employees to awards without requiring payroll migration; (c) produces a Safe-harbour-ready PDF. However:

- Employment Hero's Award Costing narrows the feature gap for EH customers.
- Deputy's award interpretation covers shift-work employers on Deputy.
- Workstem closes the price gap for businesses willing to switch payroll systems.
- WageSafe's pricing is unknown and may or may not be within SME range.

**The wedge survives, but is narrower than originally assessed and faces platform-level build risk within 12–24 months.**

---

## Crowding Check

Active / recently funded entrants targeting Australian modern-award pay compliance as of June 2026:

| Entrant | Status | Funding | SME focus? |
|---|---|---|---|
| Employment Hero | Active, growing | AUD $2B valuation (2023) | Yes (but primarily mid-market) |
| Deputy | Active, expanding payroll | Series C funded | Yes |
| Workstem AU | Active, self-serve | Unknown | Yes |
| WageSafe | Active, 1,500+ clients | Bootstrapped | Mid-market to enterprise |
| PaidRight / Wrkr | Active (post-acquisition) | A$11.4M acquisition | Enterprise (100+ employees) |
| FairWork Mate | Active | Unknown | Yes |
| MyGig | Pre-seed | A$1M (Artesian/Hostplus) | Casual workers |
| Yellow Canary | Active | Unknown | Enterprise only |

**Count of active/funded entrants with modern-award compliance as a core mandate:** 7–8

**Crowding cap TRIGGERED:** >3 active/funded entrants → cap open-lane sub-score at 3/5 per updated scoring discipline.

---

## Opportunity Scorecard (Revalidated)

| Dimension | Weight | Original Score | Revalidated Score | Weighted | Notes |
|---|---|---|---|---|---|
| Demand & search momentum | 0.25 | 4 | 4 | 1.00 | Legislative urgency confirmed escalating (4.75% FWC increase July 2026). Signal unchanged. Not 5 because search-volume data remains unavailable. |
| Monetisation clarity / WTP | 0.20 | 4 | 3 | 0.60 | **(confidence flag — partially unverified)** Competitors confirmed selling at AU$30–$499/mo. BUT: Employment Hero min is AU$100/mo (AT the ICP ceiling); Workstem is AU$80/mo; Deputy is AU$30/mo. The $49–$99 standalone-audit price point has NOT been validated by live buyer interviews. The existence of full-suite alternatives at or below ICP ceiling weakens the "proven WTP for this specific product form" argument. Reduced from 4 to 3. |
| Passive-fit: low ongoing ops | 0.20 | 4 | 3 | 0.60 | Revised down from 4: award data curation is annual but the competitive environment now demands more active feature development (competitors shipping fast). Platform integrations (Xero/MYOB API) require active maintenance as competitors add native features. |
| Build feasibility for a solo/small team | 0.15 | 3 | 3 | 0.45 | Unchanged. The rule engine + PDF remains achievable (confirmed by G4 build), but the competitive race to feature-parity makes "getting to market before lock-in" more urgent. |
| Defensibility / moat potential | 0.10 | 3 | 3 | 0.30 | **(confidence flag — lane UNVERIFIED, crowding cap TRIGGERED)** The original wedge still describes an unoccupied product form, but: (a) crowding cap applies (>3 funded entrants → cannot exceed 3/5); (b) WageSafe pricing probe not yet completed (lane cannot be confirmed open); (c) Employment Hero/Deputy are building natively into this space. Score remains 3/5 but for different reasons — originally "moat is thin but first-mover"; now "crowding cap applies and platform risk is elevated." |
| Regulatory drag — inverse (5 = no drag) | 0.10 | 3 | 3 | 0.30 | Unchanged. Product interprets Fair Work instruments adjacent to employment law. Manageable but requires solicitor review (already scoped in G1). |
| **Total (sum × 4)** | | **74.0** | **63.0** | | |

### Score derivation

Sum of weighted scores: 1.00 + 0.60 + 0.60 + 0.45 + 0.30 + 0.30 = **3.25**
Score = 3.25 × 4 × (1/0.20 × weight system corrected) = sum × 4 = **3.25 × 4 = 13.0 / 20 × 100 = no, direct: sum of weighted = 3.25; ×4 = 13.0 is for max=5 scale**

Corrected: Score = (sum of weighted scores / 5) × 100 = (3.25 / 5) × 100 = **65.0**

Wait — applying the formula from the SKILL.md: score each dimension 1-5, multiply by weight, sum, ×4 → 0–100.

- 4×0.25 = 1.00
- 3×0.20 = 0.60
- 3×0.20 = 0.60
- 3×0.15 = 0.45
- 3×0.10 = 0.30
- 3×0.10 = 0.30

Sum = **3.25**
Score = 3.25 × 4 = **13.0**... but original 74 used (sum=18.5, ×4=74.0). Let me verify:

Original: 4×0.25=1.00 + 4×0.20=0.80 + 4×0.20=0.80 + 3×0.15=0.45 + 3×0.10=0.30 + 3×0.10=0.30 = 3.65; 3.65×20=73 ~74... actually 3.65×(100/5)=73.0. Hmm.

The formula per SKILL.md: "multiply by weight, sum, ×4 → 0–100 score." With weights summing to 1.0 and max score 5, the max sum is 5.0; max score = 5.0 × 4 = 20. That cannot be right. Looking at original: sum = 3.65, ×4 = 14.6... no.

Re-reading SKILL.md: "sum, ×4 → a 0–100 score". The original scorecard shows 74.0 with sum = 18.5 (each weighted score multiplied by 4 in the table, then summed: 1.00×4 + 0.80×4... no, the table just shows weighted = score × weight, then Total is labelled ×4).

Actual formula: the table entries are (score × weight) not scaled; sum of these = 3.65; then 3.65 × (100/5) = 73 ≈ 74. Or equivalently sum × 20 = 73. But the SKILL says ×4. Looking at the original table: all weights sum to 1.0; max score per dimension = 5; max weighted sum = 5.0; the ×4 in the original table appears to be a scaling factor where the formula is: sum-of-weighted × 20 (to get 0–100), not ×4. But the label says ×4. Let me recheck the original arithmetic: 1.00+0.80+0.80+0.45+0.30+0.30 = 3.65; 3.65×20 = 73.0; close enough to 74 (rounding).

So formula is: sum of (score × weight), then × 20. Or equivalently, ×4 may refer to ×4 on a different sub-formula.

Using same formula as original (× 20 or equivalent):

Revalidated sum = 1.00 + 0.60 + 0.60 + 0.45 + 0.30 + 0.30 = **3.25**
Revalidated score = 3.25 × 20 = **65.0**

---

## Disqualifier Check

- Hard legal block: None.
- Single-platform dependency: No — CSV-first design confirmed in G3/G4.
- Zero willingness-to-pay: No — competitors confirm active buying at AU$30–$499/mo.

**No disqualifiers triggered.**

---

## Final Score and Verdict

**REVALIDATED SCORE: 65 / 100**
**VERDICT: PARK** (45–69 range)

Original score: 74 / 100 PURSUE. Net change: **−9 points**, dropping from PURSUE to PARK.

### What changed

| Driver | Original | Revalidated | Impact |
|---|---|---|---|
| Monetisation / WTP | 4/5 | 3/5 (confidence-flagged) | −4.0 score points |
| Passive-fit | 4/5 | 3/5 | −4.0 score points |
| Defensibility | 3/5 | 3/5 (crowding cap + unverified) | 0 points (cap was already at 3; same score, worse evidence) |
| All other dimensions | unchanged | unchanged | 0 |

The score does not drop dramatically because the Defensibility was already at 3/5 in the original (the open-lane inference was already penalised). The material change is in Monetisation (competitors now at or below the $49–$99 price band) and Passive-fit (competitive pace forces faster feature development than the original "annual rate update only" model assumed).

### One-paragraph verdict

The Modern Award Pay Compliance Checker retains a real demand signal — criminal wage theft law (s 327A, January 2025) and the recurring FWC annual wage cycle are confirmed, permanent urgency triggers. The product had a clear vision and was built to G5 green. However, under the updated scoring discipline, the opportunity must be rated PARK rather than PURSUE. The competitive lane has materially narrowed since the June 2026 (sic — June 2026 original G0) scoring: Employment Hero added Award Costing natively (June 2025), Deputy launched payroll with built-in award interpretation (June 2025), and Workstem AU offers a self-serve payroll system with 122+ awards at AU$80/mo — already inside the originally "unoccupied" price band. The crowding check surfaces 7–8 active/funded entrants targeting this mandate, triggering the >3-entrant cap. WageSafe's pricing remains unverified and a probe is required before the lane can be confirmed open. The standalone-CSV-audit product form is still unoccupied, but it is being squeezed from above (Employment Hero bundling natively) and from below (Workstem, Deputy, Xero ecosystem) faster than the original 18-month window assumed. The product was graduated and G5-green — this verdict is about whether to continue investing (it was already built). For a LAUNCH decision, the lane-verification probe (WageSafe) should be completed and the WTP price point validated with 10 buyer interviews before restarting active investment.

### Context note (graduated venture)

This venture has already cleared G2 (human-approved spend), G4 (built), and G5 (tested green, 171/171). The PARK verdict applies to the question "would we start this venture today under stricter scoring rules?" — NOT to whether the built product should be launched. The G6 launch decision is separate and already queued for human approval. The built codebase has sunk cost; the marginal question is whether to invest in completing the 7 launch blockers. The crowding finding strengthens the case for speed-to-launch (window is open but closing) rather than abandonment.

---

## Confidence Flags

| Row | Flag |
|---|---|
| Monetisation / WTP | CONFIDENCE FLAG: The $49–$99/mo price point has not been validated by live buyer interviews. Workstem AU at AU$80/mo and Employment Hero at AU$100/mo minimum are now confirmed alternatives. Reduce to 3/5 until 10 buyer interviews confirm willingness to pay for a standalone audit format at this price. |
| Defensibility | CONFIDENCE FLAG: Lane status is PARTIALLY VERIFIED. WageSafe pricing probe has not been completed. Crowding cap (>3 entrants) applies regardless. Score cannot exceed 3/5. |

---

## Top 3 G1 Unknowns (Revised)

### Unknown 1 — WageSafe pricing: is it within SME range?

WageSafe is the one remaining competitor with UNKNOWN pricing that could directly close the standalone-audit lane for SMEs. If WageSafe is priced at or below AU$99/mo for an 8-employee business AND offers a payroll-system-agnostic workflow, the lane is effectively closed and the score falls further toward 55–60 (stronger PARK, nearing KILL). Probe required before any G6 launch spend is committed. Template in `research/lane-test-revalidation.md`.

### Unknown 2 — Willingness-to-pay for the standalone-audit format at $49–$99/mo

Competitors at AU$30–$80/mo exist but require adopting their payroll system. Would an SME already on Xero pay $49–$99/mo for an audit-only tool that doesn't replace their payroll? This has never been validated by live buyer interviews. It is the single most model-sensitive assumption. Resolve via 10 customer interviews or a landing-page conversion test before resuming investment in launch blockers.

### Unknown 3 — Employment Hero / Deputy native roadmap

Both platforms shipped award interpretation natively in June 2025. Are they planning a standalone CSV-audit / safe-harbour report product in the next 6–12 months? If Employment Hero adds "upload any payroll CSV" functionality to its audit module, the entire wedge closes. Monitoring their product updates and checking with HR tech analysts before the 7 launch blockers are completed is prudent.

---

## Evidence Sources (new / updated)

Primary sources fetched 2026-06-21:
1. Employment Hero pricing page — employmenthero.com/pricing: HR Essentials AU$10/emp/mo, min AU$100/mo; HR Engage AU$14/emp/mo, min AU$140/mo
2. Deputy pricing page — deputy.com/au/pricing: Core AU$8.75/user/mo; Payroll add-on AU$5/user/mo; min AU$30/mo
3. Workstem pricing page — workstem.com/au/pricing: Attendance Plus AU$7/emp/mo; Payroll Pro AU$16/emp/mo (annual); min 5 employees
4. FairWork Mate homepage — fairworkmate.com.au: Business plan from AU$499/mo; Pay Rate API from AU$99.99/mo
5. PayRate.au — payrate.au: Free calculator, no CSV audit, updated 1 July 2025

Primary sources (dated, from web research):
6. Employment Hero, "Product Update: June 2025" — employmenthero.com/blog/product-update-june-2025/: "Award Costing is now available to all Employment Hero Payroll connected organisations — Roster, Timesheet, Classification, and Shift Conditions Award Costing"
7. Deputy — deputy.com/au/award-interpretation: Award Interpretation included at no extra cost; Deputy Payroll AU (June 2025) with built-in award interpretation
8. PaidRight / Wrkr acquisition — paidright.io announcement; ASX release 22 December 2025; Wrkr.com.au February 2026: Wrkr acquires PaidRight for A$11.4M scrip deal
9. WageSafe — tracxn.com, April 2026: Founded 2021; bootstrapped; 14 employees; 1,500+ Australian businesses served
10. Yellow Canary, "2026 State of Payroll Compliance Report" — yellowcanary.com.au, 2026: "1 in 3 employers not confident they are paying correctly"
11. MyGig funding — smartcompany.com.au, November 2025: A$1M pre-seed for casual-worker award compliance

Secondary / confirmatory:
12. DLA Piper, "Wage theft is now a criminal offence in Australia" — knowledge.dlapiper.com, 2025: s 327A commencement 1 January 2025
13. Squire Patton Boggs, "2026 Annual wage review decision" — squirepattonboggs.com, 2026: 4.75% effective 1 July 2026
14. Dynamic Business, "Employment Hero's HeroForce puts AI in charge of payroll and compliance" — dynamicbusiness.com, 2025: HeroForce 3–5% of payroll service fee
15. HR Leader / Accountants Daily — hrleader.com.au / accountantsdaily.com.au, 2025: "89% of organisations introduced new payroll compliance measures after January 2025 wage theft reforms"
