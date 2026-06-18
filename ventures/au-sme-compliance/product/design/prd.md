# Product Requirements Document — Modern Award Pay Compliance Checker
**Venture:** au-sme-compliance
**Date:** 2026-06-18
**Gate:** G3 Design
**Author:** product-architect

---

## 1. Problem Statement

Australian SME employers face criminal liability for wage underpayment under Fair Work Act s 327A (operative 1 January 2025), with penalties up to AUD $8.25M per offence for body corporates. The FWC Annual Wage Review (3.5% effective 1 July 2025; 4.75% effective 1 July 2026) creates a hard annual deadline after which every employer under a modern award must have updated pay rates. The FWO free tool requires knowing the correct award and classification upfront — the hardest step. Enterprise tools (Yellow Canary, 500+ employees) and full-suite platforms (Employment Hero, minimum $100/mo; FairWork Mate, $499/mo) leave a gap: no self-serve, CSV-based tool under AUD $100/mo ingests payroll data, maps employees to their correct award classification, and produces an audit-ready evidence report.

The employer who does not act risks criminal prosecution. The employer who acts manually risks classification errors. The employer who buys a full-suite platform over-spends for a feature they need once a year.

---

## 2. Target Users

**Primary — The Employing SME Owner / Manager**
A business owner or office manager at an Australian SME with 1–20 employees, in an award-covered industry (hospitality, retail, construction, childcare, professional services). They run payroll via spreadsheet, Xero, or MYOB. They are not HR experts. They know they have a compliance obligation but do not know how to verify it efficiently. They are price-sensitive (sub-$100/mo) and prefer self-serve to consulting.

**Secondary — The Bookkeeper / Accountant Acting for an SME Client**
A bookkeeper or BAS agent who manages payroll for multiple small clients. They want a fast, defensible way to evidence that they checked compliance on their client's behalf. They are the primary referral acquisition channel.

---

## 3. Thesis Being Tested

The MVP tests one specific claim: **employing SMEs will pay AUD $49–$99/month for a self-serve tool that ingests their payroll CSV, maps employees to the correct modern award, and produces a downloadable audit-ready report** — before they have any evidence of underpayment and before a FWO audit is triggered.

Success metric: **200 waitlist sign-ups before build commences** (go-trigger validated pre-build, per advisory/go-no-go-memo.md), then **10% trial-to-paid conversion within 60 days of MVP launch**, and **MRR >= AUD $1,600 within 90 days of launch** (equivalent to ~20 paying Pro accounts, the operational break-even from financials/unit-economics.md).

---

## 4. MVP Scope

### The Thinnest Slice That Tests the Thesis

The MVP tests willingness-to-pay for the CSV ingestion + classification mapping + audit report core. It does NOT need to integrate with Xero or MYOB at launch (GO-IF condition 2). It does NOT need to cover more than 10–15 awards (GO-IF condition 3).

The thinnest slice: a user uploads a payroll CSV, answers a short onboarding questionnaire to confirm industry and award, the system maps each employee to an award classification, compares their current pay rate against the FWC rate for that classification (as at the current date), flags gaps, and renders a downloadable PDF audit report with disclaimers and a confidence score per employee.

### IN SCOPE — MVP

| # | Feature | Rationale |
|---|---------|-----------|
| F1 | Landing page with pricing + waitlist capture | Pre-build validation gate (200 sign-ups) |
| F2 | User registration and authentication (email + password; magic-link option) | Access control |
| F3 | Stripe subscription billing — Starter ($49/mo) and Pro ($79/mo) tiers | Willingness-to-pay proof |
| F4 | CSV payroll upload (up to 500 rows per file) | Core ingestion; CSV-first per GO-IF 2 |
| F5 | Onboarding questionnaire: industry, primary award, employee count | Routes to correct award set; reduces classification fuzzy-match load |
| F6 | Column-mapping UI: user maps their CSV columns to required fields (name, classification/role, hours, pay rate) | Handles real-world CSV variability |
| F7 | Award classification engine — 10–15 awards, ~200 classifications | Core moat; bounded per GO-IF 3 |
| F8 | Pay-rate gap check against current FWC rates (as at last annual update) | Core compliance check |
| F9 | Confidence score per employee (HIGH / MEDIUM / LOW) on classification accuracy | Required per advisory risk R1 mitigation |
| F10 | Audit-ready PDF report with: disclaimer text, confidence scores, gap summary, date-of-check stamp | Core output; must include solicitor-approved disclaimer language |
| F11 | "Results as at [date]; verify before each pay run" notice on every report | Required per risk register R1 mitigation |
| F12 | In-product disclaimer and "tool not adviser" framing on all output screens | Required per advisory risk R2 and R3 |
| F13 | Basic dashboard: upload history, reports, subscription status | Minimum viable account management |
| F14 | 14-day free trial, limited to 5 employees and 1 award | Acquisition; tests conversion |
| F15 | Privacy Policy, Terms of Service (with liability cap), and Data Processing Agreement (DPA) | Required at launch per advisory compliance conditions |
| F16 | FWC annual rate-update pipeline: ability to update rate tables each July without a code deployment | Operational sustainability |
| F17 | Email notifications: welcome, report ready, trial expiring | Minimum viable engagement |

### OUT OF SCOPE — MVP (Explicitly Deferred)

| Feature | When |
|---------|------|
| Xero API integration | Post-MVP (Pro/Business tier additive feature) |
| MYOB API integration | Post-MVP; after April 2026 MYOB granular-scope migration resolved |
| Awards beyond the initial 10–15 | Post-validation roadmap; requires additional solicitor sign-off per award |
| Penalty-rate and allowance gap checking (overtime, shift penalties, meal allowances) | Post-MVP Pro+ feature |
| Multi-user / team login | Business tier (post-MVP) |
| API access for custom payroll exports | Business tier (post-MVP) |
| Year-on-year comparison reports | Retention feature; post-initial build |
| Human-in-the-loop advice component | Permanently out of scope — creates accessorial liability risk (R2) |
| Safe-harbour "achieves compliance" claims | Permanently out of scope — ACL breach risk (R3) |
| AI/ML model training on customer payroll data | Permanently out of scope — Xero ToS prohibition; privacy risk |
| Annual filing / ATO lodgement integration | Different product |
| Mobile native apps | Web-first; mobile-responsive sufficient |

---

## 5. Initial Award Set (10–15 Awards, MVP Launch)

The following 12 awards are selected for MVP coverage, representing the highest-frequency SME employment sectors (based on ABS industry distribution of the ~593,000 award-covered SME pool). All 12 must receive employment-solicitor sign-off on the classification rules before launch (GO-IF condition 1).

1. Hospitality Industry (General) Award 2020
2. General Retail Industry Award 2020
3. Clerks — Private Sector Award 2020
4. Fast Food Industry Award 2010
5. Building and Construction General On-site Award 2020
6. Hair and Beauty Industry Award 2010
7. Children's Services Award 2010
8. Manufacturing and Associated Industries and Occupations Award 2020
9. Professional Employees Award 2020
10. Restaurant Industry Award 2020
11. Security Services Industry Award 2020
12. Miscellaneous Award 2020

Up to 3 additional awards may be added before launch without scope expansion if legal review is completed within budget. Up to 15 total is the hard cap at MVP.

---

## 6. User Stories and Acceptance Criteria

### US-01: Landing Page and Waitlist

**As** a prospective buyer,
**I want** to understand what the product does and sign up for early access,
**So that** I can be notified when the product launches.

**Acceptance Criteria:**
- [ ] Landing page loads in < 2 seconds on a 4G mobile connection (Lighthouse Performance >= 85)
- [ ] Page displays pricing (Starter $49/mo, Pro $79/mo) with no "achieves safe harbour" language
- [ ] Disclaimer text is visible without scrolling on desktop: "This tool generates evidence of a pay-rate compliance check. It does not constitute legal advice or payroll advice, and does not achieve safe-harbour status under the Voluntary Small Business Wage Compliance Code."
- [ ] Waitlist form captures email address and submits without errors
- [ ] Confirmation email sent within 60 seconds of submission
- [ ] 200 waitlist entries = go-trigger metric (tracked in admin dashboard)

### US-02: Account Registration and Authentication

**As** a new user,
**I want** to create an account and log in securely,
**So that** my payroll data and reports are private to me.

**Acceptance Criteria:**
- [ ] Registration requires email address and password (minimum 12 characters, or magic-link option)
- [ ] Email verification required before first upload
- [ ] Failed login locked after 5 consecutive attempts for 15 minutes
- [ ] Session expires after 30 minutes of inactivity
- [ ] Password reset flow works via verified email link
- [ ] Account data (including uploaded CSVs) is isolated per tenant — no cross-tenant data leakage (tested via automated tenant-isolation test)

### US-03: Subscription Billing

**As** a user completing a free trial,
**I want** to subscribe to a paid tier via credit card,
**So that** I retain access to my reports and can run future compliance checks.

**Acceptance Criteria:**
- [ ] Stripe Checkout flow presents Starter ($49/mo) and Pro ($79/mo) options
- [ ] Free trial (14 days, no credit card required) activates on signup
- [ ] Trial limits are enforced: max 5 employees, max 1 award, max 1 report
- [ ] Subscription status visible in dashboard
- [ ] Failed payment triggers email notification and 3-day grace period before access suspension
- [ ] Cancellation takes effect at end of billing period; data retained for 30 days post-cancellation
- [ ] Annual billing option presented at checkout (10% discount)

### US-04: CSV Upload

**As** a paying subscriber,
**I want** to upload my payroll CSV file,
**So that** the system can check my employees' pay rates.

**Acceptance Criteria:**
- [ ] Accepts CSV files up to 5 MB / 500 rows
- [ ] Rejects files > 5 MB with a clear error message
- [ ] Rejects non-CSV file types with a clear error message
- [ ] Upload completes and column-mapping screen appears within 10 seconds for a 500-row file
- [ ] Uploaded file is encrypted at rest (AES-256) immediately upon receipt
- [ ] Uploaded file is not retained beyond 90 days after upload date (automated deletion)
- [ ] Upload history shows filename, upload date, and report status

### US-05: Column Mapping

**As** a user,
**I want** to map my CSV columns to the required fields,
**So that** the system understands my data format without requiring a specific template.

**Acceptance Criteria:**
- [ ] System auto-detects column headers matching common patterns (e.g. "Name", "Employee Name", "Full Name") and pre-populates mapping
- [ ] Required fields: employee name or ID, job title or classification, ordinary hours per week, base hourly rate or annual salary
- [ ] Optional fields: department, employment type (full-time/part-time/casual), date of birth (for junior rates)
- [ ] User can correct any auto-detected mapping before proceeding
- [ ] System validates that mapped columns contain non-null values for >= 80% of rows before proceeding
- [ ] Clear error shown if required fields cannot be mapped

### US-06: Award Classification and Pay-Rate Check

**As** a user,
**I want** the system to map each employee to the correct award classification and check their pay rate,
**So that** I can identify any underpayment risk.

**Acceptance Criteria:**
- [ ] System assigns each employee a classification (award + level) and a confidence score: HIGH (deterministic match), MEDIUM (probable match, user should verify), LOW (ambiguous, user must confirm with FWO Find My Award tool)
- [ ] System compares employee's current pay rate against FWC rate for that classification as at the current rate table date
- [ ] Gap (underpayment) is calculated in AUD/hr and AUD/week for each underpaid employee
- [ ] LOW-confidence employees are flagged prominently in the UI before the report is generated; a prompt appears: "For these employees, we recommend verifying the award with the FWO Find My Award tool before relying on this result."
- [ ] Rate table "effective date" is displayed on every check screen and in the report
- [ ] If no employee matches an available award, system displays: "We could not map this employee to a supported award. This employee is excluded from the report."
- [ ] Processing time for a 500-row CSV: < 60 seconds end-to-end

### US-07: Audit-Ready Report

**As** a paying subscriber,
**I want** to download a PDF audit report,
**So that** I have documentary evidence of my compliance check for FWO purposes.

**Acceptance Criteria:**
- [ ] Report is a PDF containing: business name (from account), check date, FWC rate effective date, summary table (employees checked, gaps found, total estimated underpayment), per-employee detail (name, award, classification, confidence score, current rate, FWC rate, gap), disclaimer block, and "tool not adviser" statement
- [ ] Disclaimer block contains verbatim solicitor-approved language (text defined pre-launch by employment solicitor; see NFR-L1)
- [ ] Report does NOT contain the words "safe harbour", "achieves compliance", "compliant", or "no action required" in any form that implies a legal conclusion
- [ ] Report includes: "Results as at [date]. Award rates are updated annually each July. Verify before each pay run. This report does not constitute legal advice or payroll advice. The employer retains sole responsibility for all pay decisions."
- [ ] Report is available for download within 5 seconds of generation completion
- [ ] Report is stored in the user's account for 90 days and can be re-downloaded
- [ ] Report filename includes business identifier and check date (e.g., `paycheck-2026-06-18.pdf`)

### US-08: FWC Rate Table Update (Operator)

**As** the product operator (founder),
**I want** to update the FWC award rate tables each July without a code deployment,
**So that** customers always see current rates.

**Acceptance Criteria:**
- [ ] Rate tables are stored as structured data (JSON or database records), not hardcoded in application logic
- [ ] An admin interface (or seeding script) allows rate table update by uploading a new rate file
- [ ] Rate table update triggers a notification to all active subscribers: "FWC annual wage rates have been updated for [financial year]. We recommend re-running your compliance check."
- [ ] The effective date of the current rate table is visible on all check screens and in all reports
- [ ] Old rate tables are retained for audit purposes (90 days minimum)

---

## 7. Pre-Build Validation Requirements

Per advisory/go-no-go-memo.md Top Open Unknowns #1 and risk register R10, the following must be completed BEFORE full build commences:

1. **Waitlist gate:** 200 confirmed waitlist email sign-ups via the landing page (F1 above). Landing page is a pre-build deliverable; it does not require the full application.
2. **Buyer interviews:** 10–15 direct buyer interviews with SME owners in hospitality, retail, construction to validate willingness-to-pay at $49–$99/mo.
3. **Legal review engagement:** Employment solicitor engaged and scope agreed before build commences. Rule engine logic, ToS, disclaimer language, and marketing copy are reviewed before beta launch.

---

## 8. Dependencies and Assumptions

| # | Dependency / Assumption | Owner | Risk if Wrong |
|---|------------------------|-------|---------------|
| D1 | FWC award rate data is available in a machine-readable format (or can be reliably scraped/manually curated) | Founder | Rate curation is manual; builds ongoing ops burden |
| D2 | Stripe supports Australian merchant accounts at 1.7% + A$0.30 domestic rate | Finance | Higher COGS; confirmed as of 2026-06-18 |
| D3 | Employment solicitor review completed within $5,000–$8,000 budget and before beta launch | Founder + Legal | If scope extends, build-cost ceiling rises toward $120K |
| D4 | CSV export from common AU payroll tools (Xero, MYOB, Reckon) produces consistent-enough headers for auto-mapping | Engineering | Increases column-mapping support burden |
| D5 | 10–15 award set covers >= 80% of the award-covered SME buyer pool | Research | Narrower coverage reduces addressable market |

---

## 9. Success Criteria (MVP Thesis Validation)

| Metric | Target | Timeframe |
|--------|--------|-----------|
| Waitlist sign-ups | >= 200 | Pre-build |
| Trial-to-paid conversion | >= 10% | 60 days post-launch |
| MRR | >= AUD $1,600 (~20 Pro accounts) | 90 days post-launch |
| Month 1 churn | <= 5% | 30 days post-first-payment |
| NPS (post-report survey) | >= 30 | 90 days post-launch |
| Support tickets re: wrong classification | < 5% of checks | Ongoing |
| Build cost | <= AUD $77,200 (base) / $120,000 (ceiling) | At launch |
