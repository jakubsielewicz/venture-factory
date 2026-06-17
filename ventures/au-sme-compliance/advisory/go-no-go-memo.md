# Go/No-Go Memo — Modern Award Pay Compliance Checker
**Venture:** au-sme-compliance
**Date:** 2026-06-18
**Gate:** G2 Decision Support
**Author:** domain-advisor

> Decision-support only. Not legal or financial advice. The human owns the final decision and any regulated steps.

---

## Recommendation

**GO-IF** — Proceed to build, subject to three named conditions that must be resolved before a public launch. The unit economics are strong, the market catalyst is real and legislatively permanent, and no unconditional disqualifiers exist. The conditions are legal review tasks, not fundamental business-model problems.

---

## The Case

**Demand:** Criminal wage-theft law (Fair Work Act s 327A, operative 1 January 2025) converts a low-urgency compliance task into an existential risk for ~621,000 award-covered Australian SMEs. The annual FWC wage-review cycle (3.5% uplift, effective July 2025) resets buyer urgency every financial year without requiring the product to manufacture demand. Competitor market (Employment Hero $2.1B valuation, Deputy, FairWork Mate) confirms willingness to pay; no competitor occupies the AUD $49–$99/mo self-serve-audit segment. (Source: G0 opportunity-score.md, 2026-06-18.)

**Unit economics:** LTV:CAC 14.77x (threshold: ≥3x); CAC payback 2.7 months (threshold: ≤12mo); gross margin 89.8% (threshold: ≥70%). Build cost AUD $77,200 (14-week MVP); operational break-even at 12 accounts; build-cost recovery at Month 11 at 20 accounts/month acquisition pace. The model survives any single adverse driver; only a compounding of all three (Starter-tier pricing only + elevated churn + elevated CAC simultaneously) approaches the viability floor. (Source: financials/unit-economics.md, 2026-06-18.)

**The wedge:** No low-cost product currently ingests SME payroll data (CSV or Xero/MYOB), maps employees to modern award + classification, and produces an audit-ready safe-harbour evidence pack at under AUD $100/month. Employment Hero and Deputy are full-suite platforms priced above the micro-SME tolerance; Yellow Canary is enterprise-only; FairWork Mate answers questions but does not cross-check actual payroll figures. (Source: G0 opportunity-score.md competitor teardown.)

---

## Decisive Risks and Mitigations

**Risk 1 — Rule-engine liability (Exposure 20/25 — highest in register)**
If the award-classification logic produces an incorrect output and an employer relies on it, the vendor faces civil liability claims. The mitigation path is established industry practice: (a) ToS liability cap (standard under Australian Consumer Law, 12 months' fees paid); (b) explicit "not legal advice, not payroll advice" disclaimer mirroring Deputy's published language; (c) confidence-scoring on outputs — flag low-confidence classifications before generating an audit report; (d) pre-launch legal review of rule engine by an employment solicitor. This risk is not a disqualifier — Deputy and Employment Hero operate the same model at scale — but it must be addressed before launch, not after.

**Risk 2 — Misleading safe-harbour marketing claim (Exposure 16/25)**
The Voluntary Small Business Wage Compliance Code (Declaration 2024, fairwork.gov.au) has seven requirements; the product demonstrably satisfies Requirement 1 (ascertain correct rates via a documented pay check). It cannot satisfy Requirement 4 (seek professional advice from HR/industrial professionals) or Requirement 6 (rectify failures promptly — a human decision). Any marketing copy claiming the product "achieves" or "delivers" safe-harbour protection is misleading or deceptive conduct under Competition and Consumer Act 2010 s 18. The safe language is: "Generates documentary evidence of one key Code requirement — a structured pay-rate compliance check." All public-facing copy must be reviewed by a solicitor before launch.

**Risk 3 — Accessorial liability framing (Exposure 15/25)**
The Fair Work Act s 550 accessorial liability provisions have been used against HR consultants and payroll configurators involved in systematic underpayments. The mitigation is product positioning: the tool is a check, not an adviser. ToS must state unambiguously that the employer retains sole responsibility for pay decisions. The product must not include a human-in-the-loop advice component at launch. Professional indemnity and product-liability insurance should be in place from day one.

---

## Spend Being Authorised

G2 approval unlocks the following budget envelope:

| Item | Budget (AUD) | Notes |
|------|-------------|-------|
| MVP build (14-week base case) | $67,200 | Founder/solo-dev at $120/hr opportunity cost |
| Pre-launch employment-law legal review | $5,000–$8,000 | Review of rule engine logic, ToS, marketing copy, DPA |
| Tooling and infra setup | $2,000 | AWS/Render, Stripe, Xero developer registration |
| Miscellaneous (design, testing, admin) | $3,000 | |
| **Base case total** | **$77,200** | |
| 24-week build contingency (if award-classification scope expands) | +$43,000 | Cap: $120,000 total if build extends |

Monthly burn post-launch: AUD $800/mo fixed costs + Xero API Plus tier AUD $245/mo (if Xero integration ships at launch) = ~$1,045/mo. Covered by Month 1 if 20 accounts acquired.

The authorised spend at G2 is **AUD $77,200 base / $120,000 ceiling**. No additional capital authorisation is implied by this memo.

---

## GO-IF Conditions

All three must be met before a public launch or processing of live customer payroll data.

**GO-IF 1 — Legal review complete:**
An Australian employment solicitor must (a) review and sign off on the award-classification logic for the MVP award set; (b) review and approve the Terms of Service, liability cap, and disclaimer language; (c) review and approve all public-facing marketing copy related to safe-harbour claims. Budget: AUD $5,000–$8,000. Timeline: complete before beta launch.

**GO-IF 2 — CSV-first architecture confirmed:**
The MVP must deliver its full core value (pay-rate check + audit report) via CSV upload without any dependency on Xero or MYOB API access. Xero/MYOB integrations are additive features for the Pro/Business tiers, not required for the Starter tier. This insulates the business model from Xero's API pricing changes (effective March 2026, AUD $245/mo for 50 connections at Plus tier) and API ToS restrictions (no ML training on Xero-sourced data).

**GO-IF 3 — MVP scope bounded to 10–15 awards:**
The build plan must cap the initial award library at 10–15 awards covering the highest-frequency SME coverage (Hospitality Industry General Award; General Retail Industry Award; Building and Construction General On-site Award; Children's Services Award; Clerks—Private Sector Award; Fast Food Industry Award; Hair and Beauty Industry Award; Manufacturing and Associated Industries Award; Miscellaneous Award; Professional Employees Award — plus 5 others by industry mix). An employment solicitor must confirm the rule logic for this set. Scope expansion to all 122 awards is a post-validation roadmap item, not a launch requirement.

---

## Top Open Unknowns

1. **Willingness-to-pay at AUD $49–$99/mo:** No direct evidence that micro-SMEs (1–10 employees) will pay a standalone tool at this price when the FWO Pay and Conditions Tool is free. Must validate via 10–15 buyer interviews and a landing-page conversion test before committing to build. Recommend: 200 waitlist sign-ups as a go-trigger before build commences.

2. **Legal review cost and scope:** The $5,000–$8,000 budget estimate for employment-solicitor review of the rule engine and ToS is unverified. For complex award coverage rules (e.g., the Hospitality Award has 40+ classifications), review scope could be materially higher. This must be scoped with a solicitor before finalising the build budget.

3. **Churn at micro-SME segment:** The 2.5%/mo churn assumption is benchmarked, not observed. Micro-SMEs buying a compliance tool that is only annually relevant (FWC July wage review) may exhibit seasonal churn spikes (subscribe pre-June, cancel post-report). Annual billing at a discount is the primary mitigation; conversion rate from monthly to annual is an early KPI to watch.

4. **Xero API payroll data scope (granular scopes from April 2026):** MYOB's April 2026 migration to granular data scopes requires end-user re-consent. If the product launches before this date with MYOB integration, a re-consent flow must be shipped by April 2026. The specific payroll fields available under new granular scopes require confirmation with MYOB developer documentation before committing to MYOB integration in the Pro tier.

---

## Regulatory Scan Summary

| Obligation | Jurisdiction | Severity | What it requires | Source |
|-----------|-------------|----------|-----------------|--------|
| No regulatory authorisation required for award interpretation SaaS | AU (all states) | Manageable | Maintain "not legal advice" framing; no licence to apply | Legal Profession Uniform Law 2014 (NSW/VIC); established market practice |
| Terms of Service: liability cap and disclaimer | AU (federal ACL) | Condition | Cap liability (12 months' fees); exclude consequential loss; "not legal or payroll advice" notice on all outputs | Competition and Consumer Act 2010 s 18; Sprintlaw 2025 |
| Marketing copy — safe-harbour claim | AU (federal ACL) | Condition | Must not claim to "achieve" safe-harbour; may claim to evidence one Code requirement | Competition and Consumer Act 2010 s 18; Voluntary Small Business Wage Compliance Code Declaration 2024 |
| Australian Privacy Principles (APPs 1–13) | AU (federal) | Condition | Privacy Policy, DPA with customers, NDB breach notification, minimum data retention | Privacy Act 1988 (Cth); POLA Act 2024 (Royal Assent 10 Dec 2024) |
| Xero API Terms — no ML training on API data | AU/Global | Condition | Do not use Xero-sourced payroll data for AI/ML model training | Xero Developer Terms and Conditions (December 2025) |
| Xero API pricing — Plus tier AUD $245/mo for 50 connections | AU/Global | Manageable | Budget into COGS from launch; CSV-first architecture hedges this | Xero Developer pricing (effective 2 March 2026) |
| MYOB API re-consent (granular scopes) | AU | Manageable | Build re-consent flow before April 2026 MYOB deadline | MYOB Developer Terms (effective 13 March / 13 April 2026) |
| Fair Work Act s 550 — accessorial liability | AU (federal) | Condition | ToS must confirm employer retains sole payroll responsibility; no human advice component | Fair Work Act 2009 (Cth) s 550; FWO accessorial liability guidance |
| Statutory tort for serious privacy invasions | AU (federal) | Manageable | Robust data security; breach response plan | POLA Act 2024, commenced 10 June 2025 |
