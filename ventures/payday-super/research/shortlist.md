# Payday Super — G0 Sub-framing Shortlist

Assessed: 2026-06-19

---

## Context

From 1 July 2026, the Treasury Laws Amendment (Payday Superannuation) Act 2025 (Royal Assent 6 November 2025) requires every Australian employer to pay SG to employees' super funds within 7 business days of each payday. The ATO's Small Business Super Clearing House (SBSCH) closes simultaneously, forcing ~994,000 employing businesses to route payments through a compliant clearing house. Penalties: up to 200% of the SG charge; administrative uplift of 60% of shortfalls; no late-payment offsets post-1 July 2026 (source: RSM Global, October 2025; ATO PCG 2026/1).

The critical platform-risk finding: Xero Auto Super, MYOB Pay Super, Employment Hero/HeroClear, and Reckon are all building Payday Super natively into their payroll workflows — three-way STP/SuperStream/bank matching included. For a single-employer on a single modern payroll platform, the native tool will largely cover them. This significantly narrows the viable wedge.

---

## Sub-framings Considered

### Framing A — Single-employer, single-payroll compliance dashboard
**Who pays:** An SME employer on Xero/MYOB/Employment Hero who wants assurance on top of their platform's native view.
**For what:** A redundant reconciliation layer that confirms what their platform already shows.
**Why low-ops:** Narrow API scope, no client management layer.
**Verdict:** KILL. Payroll incumbents are building this natively and will include it for free or near-free (MYOB and Reckon explicitly state no extra cost for Pay Super). A standalone tool for single-platform users has no durable wedge; it is a feature they get at no marginal cost. The switching cost runs the wrong way — the employer is locked into Xero or MYOB already.

---

### Framing B — Multi-client assurance layer for bookkeepers / payroll bureaus (RECOMMENDED)
**Who pays:** Bookkeeping practices and payroll bureaus managing 20–200+ employer clients across mixed payroll platforms (Xero, MYOB, Employment Hero, Reckon, older on-premise/ERP systems). The buyer is the practice principal or compliance partner, not the individual employer.
**For what outcome:** A single compliance dashboard across all clients, flagging which employers are at risk of missing the 7-day window on any given pay run, with an exportable audit trail the bookkeeper can show each client or the ATO.
**Why it could be low-ops:** SaaS subscription to the practice, per-employer seat or flat-tier pricing. API pull from payroll + clearing house + ATO STP data; no manual fulfilment. Integrations are the recurring ops cost but they are bounded (6–8 major platforms cover ~90% of the market).
**The real gap:** Xero's native view is per-client, not cross-client. Employment Hero's multi-client dashboard gives payroll processing but does not give a cross-client compliance-risk view that answers "which of my 80 clients is at risk of an SG-charge event this week?" KeyPay/Employment Hero does not cover clients who are on Xero or MYOB. No incumbent owns the bookkeeper's cross-system view.
**Platform risk (honest assessment):** HIGH but NOT fatal at the bureau layer. The risk that one platform absorbs this function exists, but the structural problem — bookkeepers manage clients on different systems — means the wedge persists unless a single platform consolidates the whole Australian market (extremely unlikely given Xero/MYOB/Employment Hero are all competing). The bigger risk is that Employment Hero's partner dashboard expands its compliance-alerting features; this is a real G1 unknown.
**Score (see opportunity-score.md):** 56 / PARK (viable with qualification)

---

### Framing C — Pre-July 2026 historical reconciliation / health-check service
**Who pays:** Employers or advisors who need a one-time audit of historical SG to confirm no pre-existing shortfall that will compound under Payday Super.
**For what outcome:** A clean bill of health before 1 July 2026 so historical SG allocation doesn't cause misclassification of new payments as covering old liabilities.
**Why it could be low-ops:** One-time product; can be a report-as-a-service.
**Verdict:** PARK (lower, do not score separately). The market window is now extremely narrow — the regime starts 12 days from today (2026-06-19), making a pre-launch product effectively unlaunched. Any ongoing version collapses into Framing B (the ongoing reconciliation). Could be offered as an onboarding module within Framing B.

---

## Ranking

1. **Framing B — Multi-client bookkeeper/bureau assurance layer** (score 56, PARK with conditions)
2. Framing C — Historical health-check (too late as standalone; viable as a feature of B)
3. Framing A — Single-employer single-platform dashboard (KILL)

---

## Recommended framing for scoring

Framing B. Scored in `research/opportunity-score.md`.
