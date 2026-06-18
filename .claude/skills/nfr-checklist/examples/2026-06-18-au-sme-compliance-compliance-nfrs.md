# Example: Advisory-Derived Compliance NFRs — au-sme-compliance
**Date:** 2026-06-18
**Venture:** au-sme-compliance (Modern Award Pay Compliance Checker)
**Gate:** G3 Design → G4 Build → G5 QA

## What this example shows

How to encode legal/regulatory advisory constraints from a risk register and go/no-go memo into named, testable NFRs (Section 6 of nfr.md). Each NFR below maps directly to a named risk from advisory/risk-register.md.

## The pattern

1. Risk-register identifies a liability constraint (e.g. R1 — incorrect classification output).
2. NFR encodes it as a MEASURABLE requirement with explicit acceptance criteria.
3. QA engineer executes the acceptance criteria as tests without needing to re-read advisory/.
4. Runbook references the NFR by number as a pre-launch gate blocker.

## Selected examples from au-sme-compliance/product/design/nfr.md (Section 6)

### NFR-L1: Solicitor-Approved Disclaimer on Every Report (maps to Risk R1, R2, R3)

**Target:** Every generated PDF report MUST contain the solicitor-approved disclaimer text, verbatim, in the report body and footer. The disclaimer version is recorded in the `reports` table.

**Acceptance criteria (executable):**
- [ ] Generated PDF contains disclaimer text within first and last page.
- [ ] Disclaimer text includes: "does not constitute legal advice", "does not constitute payroll advice", "employer retains sole responsibility for all pay decisions", "Results are as at [date]. Verify before each pay run."
- [ ] `reports.disclaimer_version` is non-null and matches a registered version string.
- [ ] Pre-launch gate: solicitor sign-off email stored in `advisory/legal-review.md`.

### NFR-L2: No Safe-Harbour "Achieves Compliance" Language (maps to Risk R3, ACL s 18)

**Target:** No page, report, email, or UI element contains the phrases "achieves safe harbour", "achieves compliance", "is compliant", or materially equivalent claims.

**Acceptance criteria (executable):**
- [ ] Automated CI string scan across all HTML, PDF templates, email templates, and static marketing copy. Assert zero matches. Run on every PR.
- [ ] Permitted language whitelisted in CI check: "Generates documentary evidence of a structured pay-rate compliance check."

### NFR-L7: MVP Award Scope Bounded to 10–15 Awards (maps to GO-IF 3)

**Target:** At launch, `GET /awards` returns between 10 and 15 active awards. No additional award added without (a) rule logic complete, (b) solicitor sign-off.

**Acceptance criteria (executable):**
- [ ] Database assertion: count of `awards` where `is_active = true` is between 10 and 15 inclusive at launch.
- [ ] Deployment checklist: each active award has a sign-off record in `advisory/legal-review.md`.

## Key lesson

Advisory constraints that stay as prose in `advisory/` are invisible to the builder. Encoding them as named NFRs with numbered acceptance criteria ensures they appear in the QA engineer's test plan and in the runbook's pre-launch gate checklist.
