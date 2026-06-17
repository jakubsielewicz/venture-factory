# Candidate Idea Shortlist — AU SME Compliance Automation
**Venture:** au-sme-compliance
**Date:** 2026-06-18 (revised 2026-06-18 — adversarial verification pass applied)
**Author:** opportunity-scout (G0)

---

## Candidate Ideas

### Idea 1 — Modern Award Pay Compliance Checker (RECOMMENDED)

**Obligation:** Employers must apply the correct modern award pay rates, penalty rates, overtime, and allowances to all covered employees. Since 1 January 2025, deliberate underpayment is a criminal offence under Fair Work Act s 327A (inserted by the Closing Loopholes Act 2023). Maximum penalties: **25,000 penalty units** for a body corporate (= AUD $8.25M at the current $330/unit Commonwealth rate, effective 7 November 2024) and **5,000 penalty units** plus up to 10 years imprisonment for an individual (= AUD $1.65M). Note: law firm commentary published before November 2024 cites $7.825M/$1.565M, calculated at the former $313/unit rate; both are consistent with the same penalty unit counts. The 3.5% FWC Annual Wage Review increase effective 1 July 2025 means every employer under a modern award must update pay rates annually.

**Buyer:** Australian SME employers with 1–199 employees who use simple payroll or spreadsheets, particularly in hospitality, retail, construction, and professional services — sectors with the most complex awards.

**Recurring obligation:** Annual wage rate reviews (FWC updates, July each year), per-pay-period award interpretation, employee classification checks, and annual reconciliation.

**Why low-ops:** Rule engine updates can be automated from FWO/FWC published data (public); the product itself runs self-serve checks on uploaded payroll data. No content treadmill beyond structured award data updates (~1–2× per year for material changes).

**Score:** 74/100 (see opportunity-score.md)

---

### Idea 2 — Privacy Act Compliance Toolkit for SMEs

**Obligation:** Australia's Privacy Act reforms (effective 2025–2026) remove the small business exemption (~$3 M turnover threshold), pulling ~2 million additional SMEs under mandatory compliance for the first time. 13 Australian Privacy Principles (APPs) must be operationalised.

**Buyer:** Any Australian SME that collects customer or employee personal data (essentially all of them). Greatest urgency in healthcare-adjacent, fintech, retail, and professional services sectors.

**Recurring obligation:** Annual privacy policy review, data mapping, breach response procedures, privacy impact assessments. Ongoing as the law is fully new to this segment.

**Why low-ops:** Document generation + questionnaire flow is highly automatable (AI-drafted privacy policies, checklists, breach-notification templates). No human expert required per transaction.

**Score:** 61/100 (estimated)

**Limitation flagged for G1 domain-advisor:** The tool generates compliance documents; it cannot provide legal advice. Must be clearly positioned as a "starting point" not a substitute for a solicitor. Regulatory drag is moderate given the product itself touches a regulated area (privacy law).

---

### Idea 3 — Single Touch Payroll (STP) Phase 2 Compliance Auditor

**Obligation:** STP Phase 2 is mandatory for all Australian employers as of 2023 (small employers phased from 2022). Requires granular income-type classification (salary sacrifice, allowances, termination payments etc.) reported per pay cycle to the ATO via STP-enabled software.

**Buyer:** SMEs running payroll in-house on accounting platforms (Xero, MYOB) who are uncertain whether their STP Phase 2 configurations are correct, particularly those who migrated from Phase 1.

**Recurring obligation:** Each pay run, year-end STP finalisation (due 14 July 2025 for FY24-25), correcting prior-year submissions.

**Why low-ops:** An STP audit tool checks data structure and field completeness against ATO's published STP2 schema — highly rules-based, automatable.

**Score:** 52/100 (estimated)

**Limitation:** The STP space is already well-served by Xero, MYOB, and Employment Hero who have native STP2 compliance built in. The audit use-case is a narrower wedge, and platform dependency risk is high (Xero/MYOB could ship this natively at any time).

---

### Idea 4 — WHS/Safety Incident & Policy Management for Micro-SMEs

**Obligation:** Work Health and Safety Act obligations apply to all PCBUs (persons conducting a business or undertaking). SMEs must maintain safe work method statements (SWMS), incident logs, risk registers, and training records.

**Buyer:** Micro-to-small businesses (5–50 employees) in construction, hospitality, childcare, manufacturing — those without a dedicated WHS officer.

**Recurring obligation:** Incident reporting within 48 hours (serious incidents), annual WHS review, maintenance of SWMS and policy documents.

**Why low-ops:** Template-driven document generation, incident-logging workflows, and automated deadline reminders are highly repeatable SaaS functions.

**Score:** 49/100 (estimated)

**Limitation:** Market is already moderately crowded (WHS Monitor, Safety Space, Donesafe, SHEQ Management). Switching costs are low since most SMEs use paper anyway, but so is the urgency-to-pay. Sales motion tends to be consultative and slow for this buyer.

---

### Idea 5 — BAS / GST Pre-Lodgement Checker

**Obligation:** GST-registered businesses must lodge Business Activity Statements quarterly (or monthly if forced by ATO). ATO issued 180,000+ failure-to-lodge penalties in 2023 (~$95 M collected). Net GST gap was $7.9 B in 2022-23.

**Buyer:** Australian sole traders and micro-businesses with simple transactions who prepare their own BAS without an accountant or bookkeeper.

**Recurring obligation:** Quarterly (or monthly) BAS lodgement.

**Why low-ops:** A rules-based pre-check layer on top of accounting data exported from Xero/MYOB, surfacing common errors before lodgement.

**Score:** 44/100 (estimated)

**Limitation:** Xero and MYOB already include BAS auto-population and ATO lodgement via Standard Business Reporting (SBR). The gap is very narrow. Also faces direct ATO competition — the ATO MyBusiness portal offers free pre-fill. Platform dependency is severe.

---

## Ranking Summary

| Rank | Idea | Key Rationale |
|------|------|---------------|
| 1 | Modern Award Pay Compliance Checker | Highest urgency (criminal law from Jan 2025, up to 25,000 penalty units / AUD $8.25M for body corporates), largest at-risk buyer pool (~593K award-covered employing SMEs), proven willingness-to-pay at higher price points, no single-platform dependency |
| 2 | Privacy Act Compliance Toolkit | Large latent demand (small biz exemption removal), but legal-advice boundary limits scope; newer market, buying urgency building but not yet acute |
| 3 | STP Phase 2 Compliance Auditor | Real pain but narrow wedge; incumbents could close gap natively |
| 4 | WHS/Safety for Micro-SMEs | Real obligation but crowded, slow sales cycle, low urgency-to-pay |
| 5 | BAS / GST Pre-Lodgement Checker | Narrow gap; Xero/MYOB + ATO dominate; platform dependency is a near-disqualifier |

**Selected for deep scoring:** Idea 1 — Modern Award Pay Compliance Checker.
