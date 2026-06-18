# Positioning Canvas — Modern Award Pay Compliance Checker
**Venture:** au-sme-compliance
**Date:** 2026-06-18
**Gate:** G3 (lead role)
**Author:** growth-marketer

---

## 1. Positioning Canvas

| Element | Content |
|---------|---------|
| **Target customer** | Australian SME owners and office managers (1–20 employees) in award-covered industries (hospitality, retail, childcare, construction, hair and beauty, professional services support staff) who run payroll via Xero, MYOB, or a spreadsheet and do not have a dedicated HR function |
| **Problem** | Since 1 January 2025, unintentional wage underpayment can be prosecuted as a criminal offence under Fair Work Act s 327A (up to AUD $8.25M per offence for a body corporate). The FWC Annual Wage Review changes minimum award rates every July. Manually cross-checking each employee's pay rate against the correct award classification is time-consuming, error-prone, and produces no documentary evidence. Full-suite HR platforms (Employment Hero minimum AUD $100/mo, FairWork Mate from AUD $499/mo) are too expensive and too broad for a 5-person cafe or a 12-person trades business. |
| **Category / frame of reference** | Self-serve award pay compliance checker |
| **Competitive alternative** | The status quo: manual spot-checks using the free FWO Pay and Conditions Tool (requires knowing the correct award upfront; produces no audit trail), or paying an accountant/employment lawyer for an annual review (AUD $300–$1,200 per review; no ongoing monitoring) |
| **Differentiated value** | Ingests payroll data by CSV upload, maps each employee to their correct award classification across 12 modern awards, checks pay against current FWC rates, and produces a downloadable audit-ready PDF report with a per-employee confidence score — all for less than the cost of one hour of accountant time per month |

---

## 2. Positioning One-Liner

> For Australian SME employers who need to verify their staff are paid correctly under the modern awards system, PayCheck (the Modern Award Pay Compliance Checker) is a self-serve compliance tool that turns a payroll CSV into a structured, audit-ready pay-rate report with per-employee confidence scores — unlike manual FWO lookups or expensive full-suite HR platforms that are built for larger businesses.

*(Product name "PayCheck" is a placeholder — substitute the confirmed product name before any public-facing use.)*

---

## 3. Proof Points (grounded in real product capability)

**Proof point 1 — Upload to audit trail in minutes**
A user uploads a CSV export from Xero, MYOB, or any spreadsheet. The product auto-detects column headers, maps each employee to one of 12 modern awards (the awards covering hospitality, retail, childcare, construction, hair and beauty, professional services and more), checks each pay rate against the current FWC rate table (updated each July), and generates a downloadable PDF report with a per-employee confidence score (HIGH / MEDIUM / LOW) and a dollar-value gap estimate for any underpayment found. No manual award table lookup required.

Source: product/design/prd.md features F4–F10; product/design/c4.md core flow description.

**Proof point 2 — Documentary evidence of a genuine compliance effort**
The output is an audit-ready PDF bearing the check date, the FWC rate table effective date, per-employee classification, confidence score, gap calculation, and solicitor-approved disclaimer language. It creates a contemporaneous record of the employer's compliance effort — the kind of document an employer can produce at an FWO audit to demonstrate that a structured pay-rate review took place.

Source: prd.md US-07 acceptance criteria; risk-register.md R3 mitigation language ("generates evidence of one Code step — a documented pay rate check").

**Proof point 3 — Self-serve, self-contained, priced for the micro-SME**
No implementation project, no onboarding call, no minimum commitment beyond a 14-day free trial. Starter tier at AUD $49/mo covers businesses with up to 5 employees (1 award). Pro tier at AUD $79/mo covers up to 20 employees across multiple awards. Both tiers cost less than 30 minutes of employment lawyer time per month. Annual billing available for a 10% discount.

Source: financials/unit-economics.md pricing tier table; prd.md F14 (trial), F3 (billing).

---

## 4. Messages NOT to Send

The following claims are explicitly prohibited by the advisory risk register and go-no-go memo. Using them before solicitor review and approval is an Australian Consumer Law s 18 (misleading or deceptive conduct) risk.

**4.1 Safe-harbour claims (highest risk — ACL breach)**
Do NOT say:
- "Achieve safe harbour from criminal prosecution"
- "Meet the Voluntary Small Business Wage Compliance Code requirements"
- "Protect your business from criminal liability"
- "Satisfy the Code's safe harbour defence"
- "Be protected from Fair Work prosecution"
- Any variant that implies using this tool alone is sufficient to avoid criminal liability under Fair Work Act s 327A

**Why:** The Voluntary Small Business Wage Compliance Code (Declaration 2024, fairwork.gov.au) has seven requirements. This product's output provides documentary evidence relevant to approximately one of those requirements (ascertaining correct rates via a documented check). It cannot substitute for the other six requirements, including Requirement 4 (seek professional advice from HR/industrial professionals) and Requirement 6 (rectify failures promptly). Claiming the product achieves or delivers the safe-harbour defence is factually incorrect and constitutes misleading conduct under ACL s 18. Source: advisory/risk-register.md R3; advisory/go-no-go-memo.md Risk 2.

**What to say instead:**
"Creates documentary evidence of a structured pay-rate compliance check — one part of a broader compliance effort."

**4.2 Legal advice or payroll advice claims**
Do NOT say:
- "Get legal certainty about your payroll"
- "Legally compliant payroll"
- "Guaranteed compliance"
- "No need to see a lawyer or HR consultant"
- "Replaces your accountant's payroll review"

**Why:** The product is a tool, not an adviser. Positioning it as a substitute for legal or payroll advice creates accessorial liability risk under Fair Work Act s 550 and breaches the "tool not adviser" positioning required by the advisory risk register. Source: advisory/risk-register.md R2; go-no-go-memo.md Risk 3.

**What to say instead:**
"We recommend confirming low-confidence classifications with the FWO Find My Award tool or your employment adviser before each pay run."

**4.3 Full-coverage claims**
Do NOT say:
- "Covers all modern awards"
- "Check any Australian modern award"
- "Complete award coverage"

**Why:** At launch, the product covers 12 modern awards. There are approximately 121 modern awards in the Fair Work system. Claiming full coverage is factually incorrect. Source: prd.md section 5 (12 awards listed); research/opportunity-score.md.

**What to say instead:**
"Covers 12 of the most common modern awards at launch, including hospitality, retail, childcare, and construction."

**4.4 Xero/MYOB integration claims**
Do NOT say:
- "Sync directly with Xero"
- "Connect your MYOB account"
- "Integrates with your payroll software"

**Why:** Xero and MYOB integrations are explicitly deferred post-MVP (GO-IF condition 2). Advertising them before they are built is a false product claim. Source: prd.md OUT OF SCOPE table; risk-register.md R4.

**What to say instead:**
"Upload a CSV export from Xero, MYOB, Reckon, or any spreadsheet — no integration required."

**4.5 Outcome guarantee claims**
Do NOT say:
- "Never underpay again"
- "Zero underpayment risk"
- "Catch every gap"

**Why:** The product uses confidence scoring precisely because classification is not always deterministic. LOW-confidence results require human verification. Guaranteeing completeness contradicts the confidence-score design and the product's own disclaimer language. Source: prd.md F9, F12; risk-register.md R1.

---

## 5. Tone and Voice Constraints

- Plain language; no employment law jargon without explanation
- Honest about what the tool does and does not do
- Never alarmist (do not instrumentalise fear of prosecution without a factual basis for the claim)
- Always include the advisory-mandated disclaimer on any page or asset that describes the product output: "This tool generates evidence of a pay-rate compliance check. It does not constitute legal advice or payroll advice, and does not achieve safe-harbour status under the Voluntary Small Business Wage Compliance Code."

---

*All claims in this document mirror the product capabilities described in product/design/prd.md and product/design/c4.md. Messages NOT to send derive from advisory/risk-register.md (R1, R2, R3) and advisory/go-no-go-memo.md. No copy in this document should be published until solicitor review is complete (GO-IF 1).*
