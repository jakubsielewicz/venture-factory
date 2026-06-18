# Non-Functional Requirements — Modern Award Pay Compliance Checker
**Venture:** au-sme-compliance
**Date:** 2026-06-18
**Gate:** G3 Design
**Author:** product-architect

> Every requirement below is testable by qa-engineer. Compliance/liability constraints from advisory/ are mapped to concrete, checkable requirements in Section 5.

---

## 1. Performance

### NFR-P1: API Response Latency

**Target:** p95 latency < 300 ms for all authenticated read endpoints (GET /reports, GET /awards, GET /account, GET /uploads) under load.

**Test:** Locust or k6 load test at 50 concurrent users, sustained 5 minutes. Measure p95 at endpoint level. Assert p95 < 300 ms. Run against staging environment with a seed dataset of 500 accounts and 2,000 reports.

---

### NFR-P2: CSV Upload Acceptance

**Target:** File upload acknowledgement (202 response from POST /uploads) within 5 seconds for a 5 MB file on a 10 Mbps connection.

**Test:** Upload a 5 MB CSV (500 rows) from a simulated 10 Mbps connection (rate-limited via tooling). Assert 202 response received within 5 seconds. File content is handed off to async queue; this NFR does not cover processing time.

---

### NFR-P3: End-to-End Processing Time

**Target:** A 500-row CSV is fully processed (status = `complete`, PDF available) within 90 seconds of upload.

**Test:** Upload a synthetic 500-row CSV against the staging environment. Start timer at upload completion (202 response). Assert `GET /uploads/{id}/status` returns `complete` within 90 seconds. Repeat 10 times; assert all runs complete within 90 seconds.

---

### NFR-P4: PDF Report Download

**Target:** Signed URL delivered within 2 seconds of `GET /reports/{id}/download`. PDF renders in browser within 5 seconds for a 500-employee report.

**Test:** Request download URL after report is `complete`. Assert URL response < 2 seconds. Download the PDF via the signed URL and measure time-to-full-download. Assert < 5 seconds on a 10 Mbps connection.

---

### NFR-P5: Landing Page Load

**Target:** Lighthouse Performance score >= 85 on mobile (simulated 4G) for the marketing landing page. Largest Contentful Paint (LCP) < 2.5 seconds.

**Test:** Run Lighthouse CI on the deployed landing page in CI pipeline. Assert score >= 85 and LCP < 2.5 s. Fail the build if threshold is not met.

---

### NFR-P6: Concurrent Processing

**Target:** System handles 20 concurrent CSV checks (each 100 rows) without degradation. p95 processing time per job <= 60 seconds under this load.

**Test:** Submit 20 synthetic CSV uploads simultaneously via k6. Assert all 20 reach `complete` status within 60 seconds each. Assert no jobs fail due to resource contention.

---

## 2. Security

### NFR-S1: Authentication

**Target:** All non-public endpoints require a valid JWT Bearer token. Unauthenticated requests return 401.

**Test:** Send requests to all non-public endpoints without an Authorization header. Assert all return 401 UNAUTHENTICATED. Send requests with an expired token (> 30 minutes old). Assert all return 401. Send requests with a valid token for Account A to resources belonging to Account B. Assert all return 404 (not 403, to prevent resource enumeration).

---

### NFR-S2: Tenant Isolation

**Target:** No account can read, write, or delete data belonging to another account, regardless of URL parameter manipulation.

**Test:** Create two test accounts (Account A and Account B). Upload a CSV under Account A. Authenticate as Account B. Attempt to retrieve `GET /uploads/{Account_A_upload_id}`, `GET /reports/{Account_A_report_id}`, `GET /reports/{Account_A_report_id}/download`. Assert all return 404. Perform the same for all resource endpoints. Run as part of CI automated test suite.

---

### NFR-S3: Secrets Management

**Target:** No secrets (API keys, database credentials, JWT signing keys, Stripe webhook secrets) are hardcoded in source code or committed to the repository. All secrets are injected at runtime via environment variables from a secrets manager.

**Test:** Run `git grep` and `truffleHog` (or `gitleaks`) against the repository on every PR. Assert zero findings for known secret patterns. Verify deployment uses environment variable injection (Vercel environment variables or AWS Secrets Manager), not `.env` files committed to repo.

---

### NFR-S4: Dependency Vulnerability Policy

**Target:** No known HIGH or CRITICAL CVEs in production dependencies at deploy time. Medium CVEs patched within 30 days of publication.

**Test:** Run `npm audit --audit-level=high` in CI pipeline. Block deployment if any HIGH or CRITICAL vulnerabilities are found. Alert on MEDIUM vulnerabilities via a GitHub Dependabot alert. Verify patch SLA: MEDIUM CVEs must have a fix PR merged within 30 calendar days of Dependabot alert creation.

---

### NFR-S5: Data Encryption in Transit

**Target:** All traffic between browser and server, and between server and database/storage, uses TLS 1.2 minimum (TLS 1.3 preferred). HTTP (port 80) redirects to HTTPS.

**Test:** Use `ssllabs.com` SSL Server Test on the deployed domain. Assert A or A+ grade. Run `curl -v http://app.paycheck.com.au` and assert 301/302 redirect to HTTPS. Assert no TLS 1.0 or 1.1 protocols are accepted.

---

### NFR-S6: Data Encryption at Rest

**Target:** All uploaded CSV files and generated PDF reports are encrypted at rest using AES-256. Database encryption at rest enabled on the Supabase instance.

**Test:** Confirm Supabase project settings show "Encryption at rest: enabled". Confirm Supabase Storage bucket policy has server-side encryption enabled. Cannot read raw file bytes from storage without credentials (assert signed URL is required). Document this configuration in the deployment runbook and verify it is applied on every environment provisioning.

---

### NFR-S7: Login Brute-Force Protection

**Target:** Account locked for 15 minutes after 5 consecutive failed login attempts from any IP.

**Test:** Send 6 consecutive `POST /auth/login` requests with incorrect password for a known test account. Assert the 6th returns 401 with message containing "temporarily locked". Assert that the account becomes accessible again after 15 minutes (or via manual admin unlock in support flow). Assert that a successful login before the 5th attempt resets the counter.

---

### NFR-S8: Stripe Webhook Signature Validation

**Target:** All Stripe webhook events are validated against the Stripe-Signature header using the webhook signing secret before any processing occurs. Invalid signatures return 400 with no processing.

**Test:** Send a synthetic POST to `/billing/webhook` without a `Stripe-Signature` header. Assert 400. Send with a forged/incorrect signature. Assert 400. Send with a correctly signed payload (using Stripe CLI `stripe trigger`). Assert 200 and verify the corresponding account subscription state was updated in the database.

---

### NFR-S9: Content Security Policy

**Target:** The web application sets a Content-Security-Policy response header that prevents inline script execution and restricts resource origins.

**Test:** Inspect response headers of any authenticated page. Assert `Content-Security-Policy` header is present. Assert it includes `default-src 'self'` and does not include `unsafe-eval` or `unsafe-inline` for scripts. Assert it includes `frame-ancestors 'none'` (clickjacking prevention).

---

## 3. Privacy and Data Protection

### NFR-V1: Data Minimisation

**Target:** The system collects only the payroll fields required for classification and rate comparison. No other fields from the uploaded CSV are stored. Fields not mapped in the column-mapping step are discarded before storage.

**Test:** Upload a CSV containing 20 columns. Map only the 4 required fields. Assert that `employee_records` table rows contain null values for all non-mapped optional fields. Assert that the raw CSV is deleted from intermediate processing memory and only the encrypted file in object storage is retained (test via database inspection — no unmapped column data should appear in `employee_records`).

---

### NFR-V2: Data Retention and Auto-Deletion

**Target:** Uploaded CSV files, employee_records rows, and generated PDF reports are automatically deleted 90 days after the upload date. Audit log entries are deleted after 12 months. Account data is retained until account deletion is requested.

**Test:** Insert test records with `purge_at` set to a past date. Run the purge job (or trigger it manually). Assert those records and associated storage objects no longer exist in the database or object storage. Run this test in the CI pipeline against a staging environment. Assert that `purge_at` is always set correctly on INSERT (unit test for the INSERT statements).

---

### NFR-V3: Australian Privacy Principles Compliance

**Target:** The product complies with all 13 Australian Privacy Principles (APPs) under the Privacy Act 1988 (Cth).

**Test (per APP):**
- APP 1 (open, transparent management): Privacy Policy published at `/privacy` before launch. Assert the page is accessible without login. Assert it contains all required APP 1 elements (what data we collect, why, who we share it with, how to access/correct/complain).
- APP 3 (collection of solicited PI): Assert the system only collects data fields declared in the Privacy Policy. No undeclared fields are stored (cross-check by comparing Privacy Policy field list against `users`, `accounts`, `employee_records` schema).
- APP 6 (use or disclosure): Assert no payroll data is transmitted to third parties other than encrypted storage. Assert Stripe receives only billing data (email, card number — processed client-side by Stripe.js, not server-side). Assert email provider receives only email address and first name (no payroll data). Verify by inspecting all outbound HTTP calls in code review.
- APP 11 (security of PI): See NFR-S5, NFR-S6 (encryption), NFR-S2 (tenant isolation), NFR-S7 (access controls).
- APP 12 (access to PI): Assert that `GET /account` returns the user's own personal data. Assert `DELETE /account` is available and triggers data deletion. Test that a data access request via email (support flow) is fulfilled within 30 days (operational process; document in runbook).
- APP 13 (correction of PI): Assert `PATCH /account` allows correction of business name. Assert user can request email correction via support.

---

### NFR-V4: Notifiable Data Breach Response

**Target:** In the event of a suspected data breach, the operator can identify affected accounts and affected data within 4 hours, and the initial OAIC notification (if required) is sent within 30 days of becoming aware of a breach.

**Test:** Tabletop exercise: simulate a breach scenario (e.g., misconfigured storage bucket). Time the process of identifying affected account_ids from audit_log and storage metadata. Assert the process completes within 4 hours using documented runbook. Assert the breach notification email template and OAIC notification template are documented and up to date in the runbook. Tested annually.

---

### NFR-V5: No AI/ML Training on Customer Payroll Data

**Target:** Customer payroll data (CSV content, employee_records) is never used to train, fine-tune, or contribute to any machine learning model. This includes third-party services.

**Test:** Code review and dependency audit: assert no payroll data is passed to any AI/ML API (OpenAI, Anthropic, etc.). Assert data processing pipeline does not log payroll data to any external analytics or logging service (e.g., verify Datadog/Logtail log entries contain only request_id, status codes, processing durations — no payroll field values). Document as a policy in the Privacy Policy and engineering handbook. Verify annually.

---

### NFR-V6: Statutory Tort Prevention (POLA Act 2024)

**Target:** The product does not commit a "serious invasion of privacy" as defined under the Privacy and Other Legislation Amendment Act 2024 (commenced 10 June 2025). Specifically: no intentional or reckless collection, use, or disclosure of payroll data beyond the stated purpose.

**Test:** Legal review (employment solicitor or privacy solicitor): confirm that the Privacy Policy, DPA, data model, and data flows as documented in c4.md do not expose the vendor to the statutory tort. Obtain written sign-off. Store in advisory/ file. Review annually or on material product changes.

---

## 4. Availability and Reliability

### NFR-A1: Uptime Target

**Target:** 99.5% monthly uptime for the application (excluding scheduled maintenance windows communicated 24 hours in advance). Equates to <= 3.65 hours downtime per month.

**Test:** Configure an uptime monitor (e.g., Better Uptime or UptimeRobot) on the production app URL, the POST /uploads endpoint, and the GET /reports endpoint. Assert monthly uptime report shows >= 99.5%. Alert the operator if downtime exceeds 30 minutes.

---

### NFR-A2: Database Backup and Recovery

**Target:** Database backups taken every 24 hours (Supabase automated backups). Recovery Point Objective (RPO): 24 hours. Recovery Time Objective (RTO): 4 hours.

**Test:** Supabase Pro plan includes daily automated backups with point-in-time recovery (PITR) to the previous day. Perform a quarterly restore drill: take a backup, restore to a staging instance, verify data integrity (row counts, referential integrity). Assert restore completes within 4 hours. Document result in runbook.

---

### NFR-A3: Graceful Degradation

**Target:** If the async job queue fails, the user receives a clear error message and can retry. If the PDF generator fails, the JSON report data (employee results) remains accessible via `GET /reports/{id}` even if the PDF cannot be generated. No data loss occurs due to transient failures.

**Test:** Simulate queue failure by disabling the queue consumer. Upload a CSV. Assert the upload status changes to `error` within 5 minutes with a user-readable message. Assert the CSV file is retained in storage (not deleted on error). Assert the user can re-trigger processing without re-uploading. Simulate PDF generator failure by injecting a fault. Assert `employee_records` data is persisted and `GET /reports/{id}` returns the JSON results with `pdf_status: "failed"`.

---

### NFR-A4: No Data Loss on Payment Processing

**Target:** Stripe webhook events are processed idempotently. Duplicate webhook deliveries (Stripe guarantees at-least-once delivery) do not create duplicate subscriptions or double-charge accounts.

**Test:** Send the same `checkout.session.completed` webhook event twice with the same `stripe_session_id`. Assert the account subscription status is correctly set after the first event and unchanged after the second. Assert only one subscription record exists per account_id.

---

## 5. Cost Ceiling

### NFR-C1: Monthly Infrastructure Cost Ceiling

**Target:** Monthly infrastructure cost (hosting, database, storage, email, queue) does not exceed AUD $800/month during the first 12 months of operation (the fixed-cost assumption in financials/unit-economics.md). At 200 active accounts, infrastructure cost per account must not exceed AUD $2.50/month (the per-unit infra COGS assumption).

**Test:** Review cloud billing dashboard monthly. Assert actual spend <= $800/month until account count exceeds 200. Alert operator if projected spend exceeds $600/month (75% threshold). At 200 accounts, calculate actual per-account infra cost. Assert <= $2.50/account/month.

---

### NFR-C2: Build Cost Envelope

**Target:** MVP build cost does not exceed AUD $77,200 (base case) or AUD $120,000 (ceiling). Legal review is budgeted at AUD $5,000–$8,000 within the base case.

**Test:** Maintain a build cost tracker (hours × $120/hr opportunity cost + vendor spend). Review weekly. Alert if projected completion cost exceeds $77,200. If legal review quotes exceed $8,000, escalate to scope-review before proceeding.

---

## 6. Compliance and Liability Constraints (Advisory-Derived, Testable)

These requirements directly encode the GO-IF conditions and decisive risks from advisory/go-no-go-memo.md and advisory/risk-register.md.

---

### NFR-L1: Solicitor-Approved Disclaimer on Every Report (Risk R1, R2, R3)

**Target:** Every generated PDF report MUST contain the solicitor-approved disclaimer text, verbatim, in the report body and footer. The disclaimer version is recorded in the `reports` table (`disclaimer_version` field). The disclaimer must be reviewed and approved by an Australian employment solicitor before beta launch.

**Testable requirement:**
- [ ] A generated PDF report, opened in any PDF reader, contains the disclaimer text within the first and last page (or as a persistent footer).
- [ ] The disclaimer text includes the phrases: "does not constitute legal advice", "does not constitute payroll advice", "employer retains sole responsibility for all pay decisions", "Results are as at [date]. Verify before each pay run."
- [ ] The `reports` table row has a non-null `disclaimer_version` that matches a version string recorded in the disclaimer version registry (a simple config file controlled by the operator).
- [ ] If the disclaimer text is changed, `disclaimer_version` is incremented and all new reports use the new version. Historical reports retain their original disclaimer_version reference.
- [ ] Pre-launch gate: solicitor sign-off email or written confirmation stored in `advisory/legal-review.md` before beta launch commences.

---

### NFR-L2: No Safe-Harbour "Achieves Compliance" Language (Risk R3, ACL s 18)

**Target:** No page, report, email, or UI element in the product contains the phrases "achieves safe harbour", "achieves compliance", "is compliant", "achieves code compliance", "meets the Code", or any materially equivalent claim that a FWO audit or criminal prosecution risk has been eliminated by use of the product.

**Testable requirement:**
- [ ] Automated string scan: run a CI check that searches all HTML templates, PDF templates, email templates, and static marketing copy for the prohibited phrases (case-insensitive). Assert zero matches. Run on every PR.
- [ ] Permitted language: "Generates documentary evidence of a structured pay-rate compliance check." "Evidence of reasonable efforts to ascertain correct pay rates." These phrases are whitelisted in the CI check.
- [ ] Landing page copy reviewed and signed off by Australian employment solicitor before beta launch. Sign-off recorded in `advisory/legal-review.md`.
- [ ] Any change to landing page headline or marketing copy that includes the words "safe harbour", "compliance", or "criminal" must trigger a legal-review workflow before the change is deployed to production.

---

### NFR-L3: Confidence Score on Every Employee Classification (Risk R1)

**Target:** Every employee row in every report has a non-null confidence score (HIGH, MEDIUM, or LOW). LOW-confidence employees are highlighted in the UI and the PDF with a visible warning. Reports with > 50% LOW-confidence employees display a prominent banner: "More than half of employees could not be classified with confidence. We recommend verifying these employees with the FWO Find My Award tool before relying on this report."

**Testable requirement:**
- [ ] Database constraint: `employee_records.confidence_score` is NOT NULL. Assert this constraint exists in the schema migration.
- [ ] Unit test: the classification engine never returns a null confidence score; if classification fails entirely, it returns `LOW` with an `exclusion_reason`. Assert in unit tests covering each supported award.
- [ ] UI test: load a report with at least one LOW-confidence employee. Assert the LOW-confidence warning text is visible on the results page without scrolling (above the fold on 1280px desktop).
- [ ] PDF test: generate a report with at least one LOW-confidence employee. Assert the PDF contains the LOW-confidence warning adjacent to that employee's row.
- [ ] PDF test: generate a report where > 50% of employees are LOW-confidence. Assert the prominent banner text is present in the PDF.

---

### NFR-L4: "Tool, Not Adviser" Posture on All Output Screens (Risk R2)

**Target:** Every screen that displays check results or a report link must display the disclaimer text (short form). The disclaimer must be visible without scrolling on all breakpoints (mobile 375px, desktop 1280px).

**Testable requirement:**
- [ ] UI test (Playwright or Cypress): navigate to the report results screen. Assert that the element containing the disclaimer text is visible (not hidden, not below the fold) on 375px and 1280px viewport widths.
- [ ] The disclaimer short form is: "This is a compliance check tool, not legal or payroll advice. Results are indicative only. The employer retains sole responsibility for all pay decisions."
- [ ] The disclaimer must not be dismissible (no "X" button or "Don't show again" option on the results screen).
- [ ] Assert the disclaimer is present in the PDF template (separate check from NFR-L1 which verifies the generated PDF).

---

### NFR-L5: Employer-Retains-Responsibility Statement in Terms of Service (Risk R2, s 550 FWA)

**Target:** The Terms of Service, published at `/terms` before launch, must contain an unambiguous statement that (a) the product output is informational only and does not constitute legal advice or payroll advice; (b) the employer retains sole responsibility for all pay decisions; (c) the vendor's liability is capped at 12 months of fees paid by the subscriber; (d) the vendor is not a payroll service provider or legal practitioner.

**Testable requirement:**
- [ ] `/terms` page is accessible without login before launch.
- [ ] Solicitor reviews and approves the ToS before beta launch. Written confirmation stored in `advisory/legal-review.md`.
- [ ] String assertion: the ToS document (as HTML or plain text) contains all of: "not legal advice", "not payroll advice", "employer retains", "12 months' fees", or equivalent approved language from the solicitor's review.
- [ ] The `/terms` page is linked from: (a) the landing page footer, (b) the registration flow (checkbox acknowledgement required), (c) the report download screen, (d) every PDF report footer.

---

### NFR-L6: CSV-First Architecture — No Xero/MYOB Dependency at Launch (GO-IF 2)

**Target:** The MVP must deliver its full core value (CSV upload → pay-rate check → audit PDF) without any dependency on Xero or MYOB APIs, OAuth tokens, or third-party API rate limits.

**Testable requirement:**
- [ ] Dependency audit: assert there are no `xero-node`, `myob-api`, or equivalent client libraries in `package.json` at launch.
- [ ] Integration test: run the full core flow (upload CSV, classify, generate report) in a network-isolated environment (no outbound connections allowed except to Supabase and internal services). Assert the flow completes successfully.
- [ ] The onboarding questionnaire does not present Xero/MYOB connection as a required step at any point in the Starter or Pro trial flow.

---

### NFR-L7: MVP Award Scope Bounded to 10–15 Awards (GO-IF 3)

**Target:** At launch, `GET /awards` returns between 10 and 15 active awards. No additional awards are added to the active set without (a) rule logic build complete, (b) solicitor sign-off on that award's classification rules.

**Testable requirement:**
- [ ] Database assertion: at launch, the count of `awards` rows where `is_active = true` is between 10 and 15 inclusive.
- [ ] Deployment checklist item: for each award in the active set, a corresponding sign-off record must exist in `advisory/legal-review.md` (award code, classification count, solicitor name, sign-off date). The deployment is blocked (manual gate) if any active award lacks a sign-off record.
- [ ] Any PR that sets `is_active = true` on an additional award must be reviewed by the founder and include a reference to the solicitor sign-off document.

---

### NFR-L8: Privacy Policy and DPA Available at Launch (Risk R7, APP 1)

**Target:** A Privacy Policy compliant with all 13 APPs and a Data Processing Agreement (DPA) template for business customers are published before beta launch.

**Testable requirement:**
- [ ] `/privacy` page accessible without login. Assert HTTP 200.
- [ ] Privacy Policy reviewed by a privacy solicitor or employment solicitor before launch. Written confirmation stored in `advisory/legal-review.md`.
- [ ] DPA template available for download or request at `/privacy#dpa` or via support email.
- [ ] Privacy Policy references: (a) the 13 APPs by name, (b) data retention periods matching NFR-V2, (c) the NDB scheme notification obligation (30 days), (d) the POLA Act 2024 statutory tort, (e) the right to access, correct, and delete personal information.
- [ ] Registration flow includes a link to the Privacy Policy and requires explicit acceptance (checkbox) before account creation.

---

### NFR-L9: No Human Advice Component (Risk R2, accessorial liability)

**Target:** The product must not include any feature where a human (employee of the vendor, contractor, or third party) reviews a customer's payroll data and provides a recommendation or interpretation. All output is generated by the automated rule engine only.

**Testable requirement:**
- [ ] No "speak to an expert" or "get a human review" feature exists in the MVP UI or API.
- [ ] Product scope review: assert no Intercom-style live chat features are enabled that allow a support agent to see payroll data in real time.
- [ ] Support tickets are handled via email; support agents do not have access to raw payroll CSV content (assert that the support tool integration — if any — does not expose `employee_records` data).
- [ ] ToS (per NFR-L5) explicitly states the product is fully automated and the vendor does not provide human advice.

---

### NFR-L10: Professional Indemnity Insurance in Place at Launch (Risk R2)

**Target:** Professional indemnity and product liability insurance is in place before beta launch and maintained throughout operation.

**Testable requirement:**
- [ ] Pre-launch gate: certificate of currency for PI insurance stored in `advisory/insurance.md` before beta launch commences.
- [ ] Minimum coverage: AUD $1,000,000 per claim (recommended minimum for a SaaS tool processing payroll data, per standard AU PI insurance for tech companies). Confirm coverage specifically includes software errors and omissions.
- [ ] Annual renewal reminder: calendar event or automated alert set for renewal date.

---

## 7. Testability Summary for QA Engineer

| NFR | Category | Test Type | Environment |
|-----|---------|-----------|-------------|
| P1–P6 | Performance | Automated load test (k6) | Staging |
| S1–S9 | Security | Automated + manual penetration test | Staging + Code review |
| V1–V6 | Privacy | Automated + code review + legal review | All |
| A1–A4 | Availability | Uptime monitoring + drill | Production + Staging |
| C1–C2 | Cost | Manual billing review | Production |
| L1–L10 | Compliance/Liability | Automated string checks + manual pre-launch gate | CI + Legal |

Pre-launch gate checklist (must be signed off before accepting any paying customer or processing any live payroll data):
- [ ] NFR-L1: Solicitor sign-off on disclaimer text
- [ ] NFR-L2: Solicitor sign-off on marketing copy
- [ ] NFR-L5: Solicitor sign-off on Terms of Service
- [ ] NFR-L7: Solicitor sign-off on all active award classification rules
- [ ] NFR-L8: Solicitor review of Privacy Policy and DPA
- [ ] NFR-L10: PI insurance certificate of currency on file
- [ ] NFR-S3: No secrets in repository (gitleaks clean)
- [ ] NFR-S5: SSL Labs A or A+ grade
- [ ] NFR-V2: Automated purge job verified in staging
- [ ] NFR-A2: Backup restore drill completed
