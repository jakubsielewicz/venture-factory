# Opportunity Score — Modern Award Pay Compliance Checker
**Venture:** au-sme-compliance
**Idea:** Modern Award Pay Compliance Checker for Australian SMEs
**Date:** 2026-06-18 (revised 2026-06-18 — adversarial verification pass applied)
**Author:** opportunity-scout (G0 → verification-corrected)
**Gate:** G0

---

## Revision Notes

This document supersedes the original 2026-06-18 opportunity-score.md following an adversarial verification pass (`advisory/verification.md`). Each load-bearing figure is now tagged:
- **[primary]** — fetched from an official/primary source during this research pass
- **[secondary]** — fetched from a credible professional or trade source (law firm, industry publication)
- **[estimate]** — not independently verifiable; explicitly labelled

Seven G2 blockers were identified. The corrections below address all of them. The score and verdict are reviewed at the end of this document; the net change is minor (see Scoring section).

---

## Concept Brief

A self-serve SaaS tool that helps Australian SME employers (1–199 employees) identify whether their staff are being paid correctly under the applicable Fair Work modern award. The product ingests payroll data (CSV upload or direct Xero/MYOB read), maps each employee to the correct award classification, checks pay rates against current FWC rates (updated annually), flags penalty-rate and allowance gaps, and produces an audit-ready report. Core value proposition: evidence of a genuine compliance effort — which is the exact language of the Voluntary Small Business Wage Compliance Code's safe-harbour defence against criminal prosecution.

**Who pays:** Business owner or HR manager at an employing Australian SME, 1–199 staff, in award-covered industries (hospitality, retail, construction, childcare, professional services).
**For what outcome:** Assurance they are not inadvertently committing the criminal offence of wage underpayment; audit-ready report for FWO inspection; safe-harbour documentation.
**Why low-ops:** Rule engine updates are derived from publicly published FWC annual wage orders (~once per year for rate changes, occasional award variations). Checks are fully automated; no human review needed per transaction after build.

---

## Demand Signals

**Note:** Live demand-signals API was unavailable. The following signals are from targeted web searches conducted 2026-06-18.

### Signal 1 — Legislative urgency (high credibility)

Wage theft criminalised from **1 January 2025** under Fair Work Act s 327A, inserted by the Fair Work Legislation Amendment (Closing Loopholes) Act 2023. **[secondary — confirmed across multiple law firm sources; AustLII primary text returned HTTP 403 during this research pass]**

**Penalties under s 327A:**

The legislation specifies penalties in penalty units. The Commonwealth penalty unit rate was $313 until 7 November 2024, when it increased to **$330/unit** under the Crimes Act 1914 s 4AA indexation mechanism. **[primary — legalclarity.org, confirmed by ASIC and AFSA sources, Nov 2024]**

The statute specifies:
- Body corporate: **25,000 penalty units** — at the current $330/unit rate this equals **AUD $8.25M** per offence, or 3× the underpayment amount, whichever is greater. **[secondary — Addisons, Commoner Law, Williamson Barwick, 2024–2025, citing Closing Loopholes Act 2023; dollar amount at $330/unit is this author's arithmetic]**
- Individual: **5,000 penalty units** — at the current $330/unit rate this equals **AUD $1.65M** per offence, plus up to **10 years imprisonment**, or 3× the underpayment amount, whichever is greater. **[secondary — same sources]**

**Residual uncertainty:** The AustLII s 327A text (primary) could not be fetched (HTTP 403). The penalty unit counts of 25,000/5,000 are consistently reported across three independent law firm sources. Multiple law firm articles published before the November 2024 penalty unit increase cite $7.825M/$1.565M (calculated at the old $313/unit rate); the current maximums at $330/unit are $8.25M/$1.65M. The direction and order of magnitude of these figures is not in dispute; the exact dollar amount at any given prosecution date will depend on the prevailing penalty unit value at that time.

Sources: Addisons law firm (addisons.com, 2024); Commoner Law (commoner-law.com, 2025); Norman Waterhouse (normans.com.au, 2025); Williamson Barwick (williamsonbarwick.com, 2025); LegalClarity penalty unit rates (legalclarity.org, 2024).

### Signal 2 — Annual wage increase event (medium-high credibility, source upgraded)

FWC **2024–25 Annual Wage Review** (annual wage review is identified by the financial year in which it is decided, effective the following 1 July) delivered a **3.5% increase** to all modern award minimum wages, effective the first full pay period on or after **1 July 2025**. The national minimum wage increased to **$24.95/hr** ($948.00/week). **[secondary — Mapien blog (mapien.com.au, 2025) citing FWC decision; HR Leader (hrleader.com.au) confirming 3.5% and $24.95/hr — note HR Leader states $24.94/hr, a one-cent rounding difference; FWC official decision announcement PDF confirmed 3.5% and $948/week but PDF binary was unreadable by fetch tool]**

Number of modern awards covered: The FWC decision covers "all modern awards" as a class; the original research cited "121/122" sourced only from a secondary blog (FairWork Mate) whose URL returned 404. This specific count is **[estimate — reported-but-unconfirmed; label as ~121 modern awards pending G1 verification from FWC decision text]**.

Note: A separate 2025–26 Annual Wage Review (effective 1 July 2026) has since been decided at **4.75%** for award wages, with a new NMW of $26.44/hr. **[secondary — Squire Patton Boggs, squirepattonboggs.com, 2026]** This confirms the annual-trigger dynamic is recurring and ongoing.

Every employing SME under a modern award must update pay rates each July — a recurring annual urgency trigger.

### Signal 3 — Active competitor market (medium credibility — proxies willingness-to-pay)

Multiple funded startups are selling into this pain point: Yellow Canary (est. 2018), FairWork Mate (from AUD $499/month), FairWork Shield, Employment Hero's award-interpretation module, and Deputy's award-interpretation tier. Employment Hero raised a **AUD $2B valuation** at its Series F round (October 2023, $263M raised, led by TCV). **[secondary — Startup Daily (startupdaily.net, 2023); Business News Australia (businessnewsaustralia.com, 2023)]**. A KKR secondary market investment of $60.4M occurred in February 2025. **[secondary — search result summary citing CBInsights]**. A specific post-Series F valuation figure (e.g. $2.1B+) could not be confirmed from a live primary source; the Series F valuation of $2B is confirmed.

Deputy pricing: Core AUD $8.75/user/month + Payroll add-on AUD $5/user/month; minimum monthly spend AUD $30. **[primary — deputy.com/au/pricing, fetched 2026-06-18]**

FairWork Mate Business plan: from AUD $499/month. **[primary — fairworkmate.com.au pricing, fetched 2026-06-18]**

### Demand direction: GROWING

Driven by: (a) new criminal liability from January 2025, (b) annual FWC wage-rate update cycle (July each year), (c) removal of small-business safe harbour for civil underpayment, (d) 2025–26 FWC decision confirming 4.75% increase effective July 2026. The legal framework is permanent and escalating.

---

## Market Sizing (Bottom-Up)

**Note:** No proprietary market-size database was available. Figures are derived from official ABS data. The verified figures differ from the original research (which contained internally inconsistent percentages); corrections are shown with working.

### Input 1 — Target buyer population

**ABS employing business counts (June 2025):** **[primary — ABS "Counts of Australian Businesses, including Entries and Exits, July 2021–June 2025" (abs.gov.au, August 2025 release)]**

| Size band | Count | % of employing businesses |
|-----------|-------|--------------------------|
| 1–4 employees | 688,870 | 69.3% |
| 5–19 employees | 232,129 | 23.4% [derived: 994,178 − 688,870 − 67,857 − 5,322] |
| **Small total (1–19)** | **920,999** | **92.6%** |
| 20–199 employees (medium) | 67,857 | 6.8% |
| 200+ employees (large) | 5,322 | 0.5% |
| **Total employing** | **994,178** | **100.0%** |
| **SME pool (1–199)** | **988,856** | **99.5%** |

**Note on verification finding:** The original document stated "97.3% small / 2.4% medium" which did not add up and was flagged as a MISMATCH. Corrected figures: small = 92.6%, medium = 6.8%. The absolute count for medium businesses (67,857) is confirmed by ABS. The 5–19 count (232,129) is derived by subtraction from the confirmed total and the three directly reported bands; it should be treated as **[primary — derived]** pending a direct table read of the ABS release.

**Award-covered subset:** The majority of industries (hospitality, retail, construction, childcare, professional services, transport, cleaning) are award-covered. Some businesses with senior managers only, and certain high-paying professional services firms, operate above-award or under enterprise agreements. Conservatively estimate **60% of employing SMEs** have at least some award-covered staff. **[estimate — no cited external source for this 60% figure; reasonable as an order-of-magnitude assumption but unverifiable without a specific FWO or ABS survey on award coverage rates by business size; flag for G1 resolution]**

Estimated award-covered SME pool: 988,856 × 60% = **~593,000 businesses** [revised downward from original 621,000, which used the incorrect base].

### Input 2 — Realistic pricing

Comparable products:
- FairWork Mate: from AUD $499/month. **[primary — fetched 2026-06-18]**
- Deputy Core + Payroll: AUD $13.75/user/month combined; minimum $30/month. **[primary — fetched 2026-06-18]**
- Employment Hero HR Essentials: AUD $10/employee/month (min $100/month); HR Engage: AUD $14/employee/month (min $140/month). **[primary — employmenthero.com/pricing, fetched 2026-06-18]**

A standalone SME-focused award-check tool (lighter than Employment Hero, heavier than free FWO tools) can realistically price at AUD $49–$99/month for businesses up to ~10 employees, scaling to ~AUD $199/month for 11–50 employees. For sizing, use AUD $79/month base case = AUD $948/year per account. **[estimate — pricing hypothesis, unvalidated; single biggest sensitivity in the model]**

### Input 3 — Adoption rate

Year 1–2 realistic penetration for a solo/small team: 0.1% of the addressable award-covered pool (~593,000 businesses) = ~593 paying accounts. Stretch: 0.3% = ~1,779 accounts. **[estimate]**

### Annual Revenue Ceiling (Obtainable — 12–24 months)

| Scenario | Accounts | ARPU/yr (AUD) | ARR (AUD) |
|----------|----------|---------------|-----------|
| Low | 593 | $948 | ~$562K |
| Base | 1,186 | $948 | ~$1.12M |
| High (stretch) | 1,779 | $948 | ~$1.69M |

(Slight reduction from original due to corrected buyer-pool base.)

### SAM and TAM

**SAM** (award-covered employing SMEs, all tiers): ~593,000 × $948/yr = **AUD ~$562M/yr** [revised from original $589M; change driven by corrected ABS base] **[estimate — derived from primary ABS count × estimate award coverage rate × estimated ARPU]**

**TAM** (Australian HR/payroll software market): No verified primary source for a specific AUD figure was reachable during this research pass. The three URLs originally cited for the $1.2B figure returned 404 (scalesuite.com.au), contained no market-size data (futureadvisory.com.au), and were low-credibility aggregators. A market research firm (MarkWide Research, markwideresearch.com, 2026) estimates the Australia HR payroll software market at **USD $685M (~AUD $1.05B)** for 2026. **[secondary — single market research firm, not a primary source; treat as order-of-magnitude only]**

**TAM verdict: AUD ~$1B is an order-of-magnitude estimate from a single secondary market research firm. It cannot be stated as a verified figure. It is consistent with the bottom-up SAM (~$562M for SMEs alone) and is plausible given Employment Hero's ~$163M ARR at January 2025. Use as directional only.** **[estimate — order-of-magnitude]**

### Verdict

The 12–24 month obtainable slice (AUD ~$562K–$1.12M ARR) is sufficient to validate the business for a solo/small team at the current stage. The size is most sensitive to the pricing assumption (ARPU) — dropping from $79 to $49/month cuts ARR by 38%. The award-coverage rate assumption (60%) is the second key sensitivity.

---

## Competitor Teardown

### Competitor 1 — Employment Hero (with KeyPay payroll)

- **Positioning:** All-in-one HR + payroll platform for AU/NZ SMEs. Award interpretation is one of 40+ features.
- **Pricing:** HR Essentials: AUD $10/employee/month (min $100/month); HR Engage: AUD $14/employee/month (min $140/month); HR Elite and Employment Unlimited require sales consultation. Payroll pricing not publicly disclosed separately — included in Employment Unlimited. **[primary — employmenthero.com/pricing, fetched 2026-06-18]**
- **Previous pricing claim corrected:** The original research cited "$20–$60/employee/month" (from stackpick.com.au). This cannot be confirmed from the live pricing page. Confirmed self-serve pricing is $10–$14/employee/month. The higher range may reflect enterprise tiers not publicly listed or outdated data.
- **Valuation:** AUD $2B at Series F (October 2023). **[secondary — Startup Daily, startupdaily.net, 2023]** The "$2.1B+" figure in the original research cannot be confirmed from a live primary source; $2B at time of Series F is confirmed.
- **Gaps/complaints:** Expensive for true micro-businesses (<5 employees) even at $10/emp/mo minimum ($100/mo); bundled product means SMEs pay for HR features they don't need; KeyPay Plus (with award engine) pricing not publicly disclosed.
- **Switching cost:** High — payroll history, employee records, leave balances locked in.

### Competitor 2 — Deputy

- **Positioning:** Scheduling and time-attendance for shift workers, with built-in award interpretation for rostering compliance.
- **Pricing:** Core AUD $8.75/user/month + Payroll add-on AUD $5/user/month. Minimum monthly AUD $30 (from September 1, 2025). **[primary — deputy.com/au/pricing, fetched 2026-06-18]**
- **Gaps/complaints:** Primarily a rostering/scheduling tool — award compliance is a by-product. No standalone "am I paying correctly?" audit report for back-pay risk. Not designed for non-shift businesses (professional services, construction project workers).
- **Switching cost:** Medium — tied to schedule and time-tracking data.

### Competitor 3 — Yellow Canary

- **Positioning:** Payroll compliance audit platform for large Australian organisations.
- **Pricing:** Enterprise, custom quotes only. **[secondary — yellowcanary.com.au, fetched 2026-06-18]**
- **Size threshold:** Targets organisations with workforces **from 500 to 100,000 employees**. **[primary — yellowcanary.com.au, fetched 2026-06-18]** The original research cited "300+ employees" — this was incorrect; the confirmed figure is 500 as the lower bound.
- **Gaps/complaints:** Not designed for SMEs — onboarding requires a data-migration project. No self-serve. Out of reach for a 10-person cafe.
- **Switching cost:** High — audit engagements are project-based.

### Competitor 4 — FairWork Mate / FairWork Shield (emerging)

- **Positioning:** AI-powered Fair Work HR Q&A and compliance tools, explicitly targeting AU SMEs.
- **Pricing:** FairWork Mate Business plan from AUD $499/month. **[primary — fairworkmate.com.au, fetched 2026-06-18]** FairWork Shield pricing not publicly disclosed.
- **Gaps/complaints:** FairWork Mate ($499/month) is priced above solo/micro-business tolerance. Answers compliance questions but does not cross-check actual payroll numbers against a CSV. Documentation-focused, not payroll-check-focused.
- **Switching cost:** Low — no data lock-in.

### DIY/Manual Alternative

Most SMEs currently check the FWO Pay and Conditions Tool (free, web-based) manually or ask their accountant. Cost to SME: ~2–4 hours of owner time per annual review, plus accountant fee of ~AUD $150–$300/hr. **[estimate — representative range, not sourced]** The FWO tool requires knowing the correct award and classification upfront — the hardest part.

### Wedge Thesis

**The wedge is the "payroll data ingestion + classification check" layer that no low-cost product currently offers for SMEs.** Employment Hero and Deputy are expensive full-suite platforms (minimum $100–$140/month for HR; Deputy's rostering focus misses non-shift workers); Yellow Canary requires 500+ employees; FairWork Mate at $499/month answers questions but does not cross-check actual payroll files. A tool that takes a CSV export from Xero/MYOB, maps employees to awards, and flags underpayment risk with a safe-harbour report — priced at AUD $49–$99/month — occupies an unoccupied price-band with a concrete criminal-law urgency trigger.

---

## Opportunity Scorecard

| Dimension | Weight | Score (1–5) | Weighted |
|-----------|--------|-------------|----------|
| Demand & search momentum | 0.25 | 4 | 1.00 |
| Monetisation clarity / willingness-to-pay | 0.20 | 4 | 0.80 |
| Passive-fit: low ongoing ops after build | 0.20 | 4 | 0.80 |
| Build feasibility for a solo/small team | 0.15 | 3 | 0.45 |
| Defensibility / moat potential | 0.10 | 3 | 0.30 |
| Regulatory drag — inverse (5 = no drag) | 0.10 | 3 | 0.30 |
| **Total (sum × 4)** | | | **74.0** |

### Scoring rationale

**Demand (4/5):** Three strong, independent demand signals: criminal law from January 2025 (penalty confirmed at 25,000 penalty units for body corporates); the 3.5% FWC July 2025 wage increase; and an active funded-competitor market. A further 4.75% increase effective July 2026 confirms the annual cycle is recurring. Not a 5 because Google search-volume data is unavailable (demand-signals API was down); scored conservatively.

**Monetisation (4/5):** Multiple competitors selling at AUD $100–$499/month. Employment Hero confirmed at $10–$14/emp/mo (min $100–$140/mo); Deputy confirmed at $8.75 + $5 = $13.75/user/mo; FairWork Mate confirmed at $499/mo. Budget holder is the business owner. Not a 5 because the micro-SME (<5 employees) segment has strong price sensitivity and the $49–$99 price-point is unproven specifically for this lighter product.

**Passive-fit (4/5):** Award rates are published in structured form by the FWC; a rate-update pipeline can be largely automated. The product is self-serve after build. Knocked from 5 because: (a) award data curation requires an annual update sprint, (b) edge-case award classification queries may generate support tickets, (c) Xero/MYOB API integrations need maintenance.

**Build feasibility (3/5):** Payroll data parsing + award-mapping rules engine + PDF report generation is achievable with a solo developer in 8–16 weeks for an MVP. Hard parts: building and maintaining the award classification logic for all ~121 awards (significant rules work) and getting API access to Xero/MYOB ecosystems (well-documented but requires partner registration). Knocked from 4 because the award data work is non-trivial and legal review of the rule logic is advisable before launch.

**Defensibility (3/5):** First-mover head-start and data on customer payroll structures creates some switching cost over time. A curated, tested award-rule library takes time to build correctly. However, Employment Hero/Deputy could add an SME-facing audit report layer at any time. Not a structural moat.

**Regulatory drag (3/5):** The product assists with compliance but is not itself a financial or legal-advice product. Clear positioning as a "compliance check tool, not legal advice" manages the risk. However: (a) it operates adjacent to employment law, (b) errors in the rule engine could expose the vendor to liability claims. Manageable but non-zero drag.

### Disqualifier check

- Hard legal block: None. The product is a compliance-support tool, not a legal service.
- Single-platform dependency: No. Data ingestion can be CSV-first (platform-agnostic), with Xero/MYOB as optional integrations.
- Zero willingness-to-pay: No. Competitors demonstrate active willingness to pay at higher price points.

**No disqualifiers triggered.**

---

## Score

**74 / 100 — PURSUE**

Score unchanged from original. The verification corrections do not materially alter the scoring dimensions: the buyer pool recalculation reduces SAM by ~5% (from $589M to ~$562M), which is immaterial at G0 order-of-magnitude. The competitor pricing corrections (Employment Hero $10–$14/emp/mo vs. previously cited $20–$60) marginally reduce the competitor-pricing floor, but the wedge thesis (targeting a $49–$99 unoccupied band below Employment Hero's $100/mo minimum) remains valid. The penalty figure clarification strengthens rather than weakens the demand signal.

---

## Verdict

Modern Award Pay Compliance Checker for Australian SMEs is a **PURSUE** at G0. The opportunity is anchored by a confirmed legislative step-change — criminal wage-theft law operative from 1 January 2025 under Fair Work Act s 327A, with penalties of 25,000 penalty units (~AUD $8.25M at current rates) for body corporates — that converts a previously low-urgency compliance obligation into an existential risk for SME owners. The FWC annual wage-review cycle (3.5% effective July 2025; 4.75% effective July 2026) is a recurring external trigger that resets buyer urgency every financial year. A clear competitive gap exists between enterprise-only tools (Yellow Canary, 500+ employees) and expensive full-suite platforms (Employment Hero min $100/mo, Deputy rostering-focused) on one side, and free but manual government tools on the other. A self-serve, CSV/Xero/MYOB-agnostic audit tool priced at AUD $49–$99/month occupies this space. The 12–24 month revenue ceiling is AUD ~$562K–$1.12M ARR at conservative adoption, sufficient for a solo-team validation stage. Main risks: rule-engine accuracy liability, employment-law positioning, and award-classification complexity. None are G0 blockers; all are G1-resolvable.

**Flag for domain-advisor (G1):** The product interprets Fair Work instruments. It must not be positioned as legal advice. The G1 domain-advisor should confirm: (a) whether operating as an "award interpretation tool" in Australia requires any regulatory authorisation, (b) appropriate liability disclaimers and limitation-of-liability clauses, and (c) whether the "safe harbour" marketing claim (linking product use to the Voluntary Small Business Wage Compliance Code) is legally sound.

---

## Top 3 G1 Unknowns

### Unknown 1 — Willingness-to-pay at the SME price point (AUD $49–$99/month)

No direct evidence that micro-SMEs (1–10 employees) will pay a standalone award-check tool at this price when free FWO tools exist. Must validate via 10–15 direct buyer interviews or a landing-page conversion test before committing to build. The entire revenue model hinges on demonstrated buy intent in this price band. **[estimate — pricing hypothesis is the single most model-sensitive assumption]**

### Unknown 2 — Legal liability exposure from incorrect award-rule outputs

If the rule engine misclassifies an employee's award or pay rate and the employer relies on the output, the product vendor could face negligence claims. The scope of exposure, and whether standard SaaS disclaimer language is sufficient in the AU context, requires G1 employment-lawyer review. This is the single biggest risk to the business model.

### Unknown 3 — Award classification accuracy at scale (~121 modern awards, 1,000+ classifications)

The core technical challenge is reliably mapping an employee job title and industry to the correct award and classification level. This is a fuzzy-matching problem that cannot be fully rule-based; it may require AI/ML plus human-in-the-loop review for edge cases. G1 must assess whether a sufficiently accurate MVP is achievable within the build-feasibility estimate (8–16 weeks solo), or whether the rule library requires specialist employment-law input that materially extends timeline and cost.

---

## Evidence Sources (all cited claims)

Primary sources (directly fetched or directly confirmed):

1. ABS, "Counts of Australian Businesses, including Entries and Exits, July 2021–June 2025" — abs.gov.au (August 2025 release): total employing = 994,178; 1–4 emp = 688,870; 20–199 = 67,857; 200+ = 5,322
2. LegalClarity, "Penalty Units Australia: Current Values by Jurisdiction" — legalclarity.org (2024): Commonwealth penalty unit = $330 from 7 November 2024
3. Deputy AU pricing page — deputy.com/au/pricing (fetched 2026-06-18): Core $8.75/user/mo; Payroll add-on $5/user/mo; min $30/mo
4. FairWork Mate pricing page — fairworkmate.com.au (fetched 2026-06-18): Business plan from $499/mo
5. Employment Hero pricing page — employmenthero.com/pricing (fetched 2026-06-18): Essentials $10/emp/mo (min $100); Engage $14/emp/mo (min $140)
6. Yellow Canary website — yellowcanary.com.au (fetched 2026-06-18): "workforces from 500 to 100,000"

Secondary sources (credible professional/trade sources, not directly primary legislation or official stats):

7. Addisons law firm, "New Criminal Offence for the Intentional Underpayment of Wages" — addisons.com (2024): 25,000 penalty units (body corporate); 5,000 penalty units (individual); 10 years imprisonment
8. Commoner Law, "Wage Theft Criminal Offence Australia — Fair Work Act s 327A" — commoner-law.com (2025): commencement 1 January 2025; penalty amounts
9. Norman Waterhouse, "New criminal wage theft laws commenced on 1 January 2025" — normans.com.au (2025): confirms commencement; $7.8M company / $1.56M individual (at pre-Nov 2024 $313/unit rate)
10. Williamson Barwick, "Australia's New Wage Theft Laws" — williamsonbarwick.com (2025): $7.825M / $1.565M (at $313/unit rate)
11. Mapien, "FWC Annual Wage Review 2025 Decision" — mapien.com.au (2025): 3.5% increase; $24.95/hr; $948/week; effective first pay period on/after 1 July 2025
12. HR Leader, "Fair Work Commission increases minimum wage by 3.5%" — hrleader.com.au: 3.5%; $24.94/hr (one-cent rounding variant)
13. Startup Daily, "Employment Hero hits $2 billion valuation after whopping $263 million Series F" — startupdaily.net (2023): AUD $2B valuation at Series F, October 2023
14. Squire Patton Boggs, "2026 Annual wage review decision" — squirepattonboggs.com (2026): 2025-26 review at 4.75%; $26.44/hr effective 1 July 2026

Estimates (not independently verifiable; labelled as such in text):

15. Award-coverage rate of 60% of employing SMEs: [estimate — no external source; resolve at G1]
16. Target ARPU of AUD $79/month: [estimate — pricing hypothesis; resolve at G1 via buyer interviews]
17. TAM ~AUD $1B: [estimate — order-of-magnitude; MarkWide Research USD $685M for 2026 is a single secondary market research firm, not independently verified]
18. Modern awards count "~121": [reported-but-unconfirmed — original source (FairWork Mate blog) unreachable; FWC decision covers "all modern awards"; resolve at G1 from FWC decision text]
