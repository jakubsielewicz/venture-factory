---
name: regulatory-scan
description: Use at G1 to surface the regulatory, compliance, licensing, data-privacy, and platform-policy obligations for an idea before committing spend. Triggers: "any regulatory blockers", "do we need a licence", "privacy/compliance scan", G1 validation.
when_to_use: regulatory/compliance/licensing/privacy checks; platform-policy dependency review at G1.
allowed-tools: Read, Write, WebSearch, WebFetch
---

## Procedure
1. List the jurisdictions in scope (where customers and data live). Default to the founder's primary market plus any obvious export markets.
2. For each, identify: required licences/registrations; sector rules (health / finance / legal / children → high scrutiny); consumer-protection and tax/GST obligations; and data-privacy duties (e.g. GDPR, Australian Privacy Act). Cite the specific rule or authority page with a date.
3. Identify platform-policy dependencies (app stores, payment processors, scraping/ToS) that could shut the product down.
4. Classify each item: **blocker / condition / manageable**. A blocker with no credible path → recommend KILL to the advisor.
5. Output a table (obligation · jurisdiction · severity · what it requires · source). Feed to `risk-register` and `go-no-go-memo`.

This is decision-support, not legal advice — say so. When unsure, mark "needs a professional" rather than guessing. Heuristics: `knowledge/ledger.md`.
