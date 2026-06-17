# Risk Register — Modern Award Pay Compliance Checker
**Venture:** au-sme-compliance
**Date:** 2026-06-18
**Gate:** G1
**Author:** domain-advisor

> Decision-support only. Not legal advice. Regulatory positions should be confirmed by a qualified Australian employment lawyer before launch.

---

## Scoring Key

- **Likelihood:** 1 (rare) → 5 (near-certain)
- **Impact:** 1 (negligible) → 5 (existential)
- **Exposure:** Likelihood × Impact (1–25). Scores ≥ 20 flagged as DISQUALIFIER CANDIDATES.

---

## Risk Register (sorted by exposure, descending)

| # | Risk | Category | L | I | Exposure | Owner | Mitigation | Status |
|---|------|----------|---|---|----------|-------|------------|--------|
| R1 | Rule-engine error leads to incorrect award classification or pay-rate output; employer relies on it, underpays employees, and suffers civil penalty or FWO action. Vendor is named in employer's defence ("the tool told me"). | Legal / Liability | 4 | 5 | **20** | Founder + Legal counsel | (a) Explicit ToS disclaimer that output is informational only and does not constitute legal advice or payroll advice — mirrors Deputy's standard language ("not a substitute for payroll or legal advice, nor intended to relieve you of your obligation to comply"; deputy.com/au/award-interpretation, 2026-06-18). (b) Liability cap in SaaS agreement capped at 12 months' fees paid, standard under ACL constraints (Sprintlaw, 2025). (c) Pre-launch legal review of rule engine logic by employment solicitor. (d) Confidence-scoring on outputs — flag low-confidence classifications for human review before producing an audit-ready report. (e) "Results as at [date]; verify before each pay run" notice on every report. | WATCH — near DISQUALIFIER |
| R2 | Accessorial liability: if the vendor is found to have been "involved in" a contravention of the Fair Work Act (e.g., systematically advising an incorrect rate to hundreds of SMEs), the FWO could pursue the vendor under s 550 FWA. The FWO has pursued HR consultants and payroll-software configurators on this basis (FWO Accessorial Liability page, fairwork.gov.au, 2024-2025 litigation outcomes). | Legal / Regulatory | 3 | 5 | **15** | Founder + Legal counsel | (a) Positioning as "compliance check tool" not "payroll advice provider" — distinction is material. (b) ToS explicitly states employer retains full responsibility for pay decisions. (c) No human-in-the-loop advice component — fully automated output reduces "involvement" characterisation risk. (d) Legal review of product framing pre-launch. (e) Carry appropriate PI/product-liability insurance from day one. | HIGH — needs legal sign-off |
| R3 | Safe-harbour marketing claim is misleading: positioning the product as enabling "Voluntary Small Business Wage Compliance Code compliance" or "safe harbour from criminal prosecution" may constitute misleading or deceptive conduct under Australian Consumer Law (ACL) s 18 Competition and Consumer Act 2010 (Cth) if the product does not in fact satisfy all Code elements (Code requires: ascertaining correct rates, staying informed, seeking professional advice, rectifying failures promptly — using the tool alone is not sufficient). | Regulatory / ACL | 4 | 4 | **16** | Founder + Legal counsel | (a) Rephrase: "Generates evidence of one Code step — a documented pay rate check" rather than "achieves safe-harbour compliance." (b) The Code's Requirement 4 (seek professional advice from HR consultancies / industrial professionals) is a separate, human-judgment step the tool cannot substitute. Copy must state this explicitly. (c) Legal review of all marketing materials before live. (d) Include a "what this tool does and doesn't do" explainer on product onboarding. | HIGH — ACL risk if copy is loose |
| R4 | Xero API cost structure renders the business model unviable for the Pro/Business tiers: Xero's new pricing (effective 2 March 2026) charges AUD $245/mo for 50 connections (Plus tier), AUD $1,445/mo for 10,000 connections (Advanced tier). At 621 accounts, Plus tier ($245/mo) adds ~$0.39/account/mo to COGS — manageable. But Xero also prohibits use of API data to train or contribute to AI/ML models (Xero Developer Terms and Conditions, updated December 2025). MYOB similarly requires re-consent on granular scopes from April 2026. | Platform / Dependency | 3 | 4 | **12** | Founder | (a) CSV-first architecture: ensure MVP delivers full value via CSV upload; Xero/MYOB integrations are additive, not core. (b) Budget Xero Plus tier ($245/mo) into COGS from launch — does not break the model at the current pricing. (c) Do not use API-sourced payroll data for any ML training (Xero ToS breach risk). (d) Monitor Xero pricing tier changes; build a contractual price-change clause into platform-cost sensitivity analysis. | CONDITION — CSV-first MVP required |
| R5 | Award classification complexity (122 modern awards, 1,000+ classifications, overlapping coverage): incorrect award coverage determination is the most technically difficult step. Errors here are invisible to the customer until FWO audit. G0 flags this as the single biggest technical risk. Timeline extension from 14 to 20–24 weeks would raise build cost from AUD $77,200 to ~$120,000 and push build-cost-recovery to Month 18. | Technical / Build | 3 | 4 | **12** | Founder + Technical lead | (a) Scope MVP to 10–15 most common awards (hospitality, retail, construction, professional services, childcare) covering ~80% of SME employment — this is a manageable rules library. (b) On-boarding questionnaire routes customer to a known award before the engine runs — reduces fuzzy-match load. (c) Flag "award uncertain" cases explicitly rather than guessing; prompt user to confirm with FWO Find My Award tool. (d) Build a legal review checkpoint (employment solicitor signs off on award logic for the MVP award set) into the build plan. (e) Budget the 24-week scenario; treat 14 weeks as the optimistic case. | CONDITION — MVP scope must be bounded |
| R6 | High annual churn (26.2%/yr at 2.5%/mo base) means the business perpetually refills a leaky bucket. If churn reaches 4%/mo (plausible for micro-SME tools without daily utility), ARR stagnates. Financial model flags churn as the highest-leverage lever. | Financial / Retention | 3 | 3 | **9** | Founder | (a) Annual billing option (10% discount) to lock revenue and reduce monthly churn. (b) Annual FWC wage review cycle (July each year) is a natural retention hook — send proactive alerts at annual wage-order update. (c) FWO audit-report feature creates re-engagement at EOFY (accounting for ~80% of FWO audit activity). (d) Product stickiness features: cumulative payroll history, year-on-year comparison reports. | MANAGEABLE |
| R7 | Australian Privacy Act obligations: The product ingests payroll data (employee names, salaries, classifications, hours worked) — "personal information" and potentially "sensitive information" under the Privacy Act 1988 (Cth). The Privacy and Other Legislation Amendment Act 2024 (Royal Assent 10 December 2024) introduces a statutory tort for serious privacy invasions (commenced 10 June 2025) and strengthens OAIC enforcement. Tranche 2 (small business exemption removal) expected 2026–2027 but product vendor, as a B2B SaaS company, is likely already above the AUD $3M threshold trigger and subject to APP obligations now. | Regulatory / Privacy | 3 | 3 | **9** | Founder | (a) Draft Privacy Policy compliant with 13 Australian Privacy Principles (APPs) before launch — required under APP 1 (open and transparent management). (b) Data Processing Agreement (DPA) with each customer — vendor processes payroll data on their behalf. (c) Minimum retention — delete or anonymise payroll data X days after session; do not retain employee PII longer than necessary. (d) Xero/MYOB API terms additionally prohibit use of data for AI training — must be honoured. (e) Notify customers of breach within 30 days under NDB scheme (Privacy Act 1988, Part IIIC) or sooner under POLA Act enhanced obligations. (f) Appoint a privacy contact; publish breach-response procedure. | CONDITION — DPA and Privacy Policy required at launch |
| R8 | CAC inflation: Google Ads CPCs for "payroll compliance Australia" and "modern award checker" keywords may be dominated by Employment Hero and Deputy, pushing blended CAC above the $288 stress-case threshold. | Financial / Marketing | 2 | 4 | **8** | Founder | (a) Prioritise SEO/content and accountant-referral channels (CAC $60–$120) before paid ads. (b) Target long-tail compliance keywords (e.g., "hospitality award checker", "cafe underpayment risk") where Competition is lower. (c) Set a hard CAC ceiling trigger: if blended CAC exceeds AUD $280 after 90 days of paid testing, pause paid ads and redirect budget to content/referral. | MANAGEABLE |
| R9 | Regulatory authorisation for "award interpretation": No specific regulatory authorisation or licence is required to operate an automated award compliance checking tool in Australia. The product does not constitute legal practice (it does not provide legal advice to a specific client about their specific legal position — it applies published FWC rules to data inputs). Regulated legal practice in Australia requires admission as a legal practitioner under state Legal Profession Acts and is enforced by state Law Societies. A SaaS tool that applies publicly available award data is not "legal practice." This is confirmed by the established market — Deputy, Employment Hero, FairWork Mate, and Workstem all operate award interpretation software without regulatory authorisation. Source: Legal Profession Uniform Law 2014 (NSW/VIC); Legal Profession Act 2007 (Qld); established market practice. | Regulatory | 1 | 5 | **5** | — | No action required on authorisation. Maintain "not legal advice" framing and disclaimer at all times. | LOW |
| R10 | Acquisition rate shortfall: 20 accounts/month assumption is unverified. At 10 accounts/month, build-cost recovery slips to Month 20+. | Financial / Sales | 3 | 2 | **6** | Founder | (a) Pre-launch landing page with waitlist — set a hard go/no-go gate of 200 waitlist sign-ups before committing to full build. (b) 10–15 direct buyer interviews with SME owners (hospitality, retail) before build to validate willingness-to-pay at $49–$99/mo. | MANAGEABLE |
| R11 | Platform concentration — MYOB API scope changes: MYOB's March 2026 update requires all developers to use granular data scopes and end-user re-consent. Customers who have connected MYOB may need to re-authorise, causing churn or friction. | Platform / Dependency | 2 | 3 | **6** | Founder | (a) CSV-first architecture (see R4). (b) Build a re-consent flow into the product before the April 2026 MYOB deadline. (c) Communicate proactively to affected users. | MANAGEABLE |
| R12 | Competition response: Employment Hero or Deputy adds a standalone "am I paying correctly?" audit-report feature, removing the wedge. | Market / Competitive | 2 | 3 | **6** | Founder | (a) Speed to market: launch MVP within 16 weeks. (b) Price aggressively at the micro-SME segment that EH/Deputy do not currently serve profitably. (c) Build accountant/bookkeeper channel partnerships that create referral lock-in before incumbents act. | MANAGEABLE |

---

## Disqualifier Assessment

| Ref | Potential Disqualifier | Verdict |
|-----|----------------------|---------|
| R1 | Liability from incorrect rule-engine output | NOT a disqualifier — manageable via ToS design, liability caps, confidence scoring, and legal review. Deputy and Employment Hero operate the same model at scale. Score 20/25 but path to mitigation exists. |
| R2 | Accessorial liability under Fair Work Act s 550 | NOT a disqualifier — no precedent for a fully automated, no-human-in-the-loop compliance tool being pursued under accessorial liability. Risk is real but manageable with appropriate positioning and legal insurance. |
| R3 | Misleading safe-harbour marketing claim | NOT a disqualifier IF marketing copy is reviewed and corrected before live. Becomes a disqualifier if the product is launched with copy claiming to "achieve" safe-harbour compliance without qualification. |
| R9 | Regulatory authorisation required | NOT triggered. No licence is required to operate an award interpretation SaaS tool in Australia. |

**No unconditional disqualifiers. Three GO-IF conditions exist (R3 marketing copy, R4 CSV-first build, R5 MVP scope).**

---

## Top 3 Decisive Risks

1. **R1 — Rule engine liability (L4 × I5 = 20):** A systematic error in the award-mapping logic, if relied upon by customers, creates civil liability exposure and reputational damage. The mitigation path is clear (legal review + ToS + confidence scoring) but must be executed before launch.

2. **R3 — Misleading safe-harbour marketing claim (L4 × I4 = 16):** The product can legitimately help employers document one of the Code's seven requirements (reasonable efforts to ascertain correct rates). It cannot substitute for the full Code, particularly Requirement 4 (seek professional advice). Overstating this in marketing copy is an ACL breach risk. Copy must be reviewed by a lawyer before any public-facing claim about "safe harbour."

3. **R2 — Accessorial liability framing (L3 × I5 = 15):** If the product is positioned as a payroll adviser rather than a compliance check tool, the accessorial liability exposure under s 550 Fair Work Act becomes real. Maintaining a "tool not adviser" posture — with corresponding ToS, disclaimer, and product UX language — is the primary mitigation.

---

## Sources Cited

- Fair Work Act 2009 (Cth) s 327A (criminal wage theft, operative 1 January 2025) — dewr.gov.au, 2025-01-01
- Fair Work Act 2009 (Cth) s 327G (small business safe harbour from criminal prosecution)
- Fair Work Act 2009 (Cth) s 550 (accessorial liability)
- Voluntary Small Business Wage Compliance Code Declaration 2024 — fairwork.gov.au; ridgelinehr.com.au summary (fetched 2026-06-18)
- FWO Accessorial Liability page — fairwork.gov.au (2024-2025 litigation outcomes)
- Competition and Consumer Act 2010 (Cth) s 18 (misleading or deceptive conduct)
- Privacy Act 1988 (Cth), Australian Privacy Principles 1–13
- Privacy and Other Legislation Amendment Act 2024 (Royal Assent 10 December 2024) — IAPP, CPO Magazine (2024)
- Statutory tort for serious privacy invasions commenced 10 June 2025
- Legal Profession Uniform Law 2014 (NSW/VIC); Legal Profession Act 2007 (Qld)
- Xero Developer Terms and Conditions (updated December 2025) — developer.xero.com
- Xero API pricing tiers (effective 2 March 2026) — truto.one/blog, developer.xero.com/pricing (2026)
- MYOB Developer Program Terms (effective 13 March 2026 for existing developers from 13 April 2026) — myob.com/au/legal/sme-developer-terms
- Deputy AU disclaimer language — deputy.com/au/award-interpretation (fetched 2026-06-18)
- Sprintlaw, "Liability Cap in Australian Contracts" — sprintlaw.com.au (2025)
