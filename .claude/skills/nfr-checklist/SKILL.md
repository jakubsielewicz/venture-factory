---
name: nfr-checklist
description: Use at G3 to set the non-functional requirements — performance, security, privacy, availability, cost ceiling — and encode the compliance/liability constraints from advisory/. Triggers: "NFRs", "performance/security targets", "SLAs", "cost ceiling", G3 design.
when_to_use: setting measurable NFRs and baking in compliance constraints at G3.
allowed-tools: Read, Write
---

## Procedure
1. For each category set a MEASURABLE target (not "fast" — "p95 < 500ms on the core endpoint"):
   - Performance (latency/throughput at expected load)
   - Security (authn/z model, secrets handling, dependency policy)
   - Privacy/data (what PII is held, retention, the `advisory/` privacy duties)
   - Availability (uptime target, backup/restore)
   - Cost (the monthly ceiling from `financials/`)
2. Turn each compliance + liability constraint from `advisory/` (e.g. "tool not adviser" posture, required disclaimers) into a concrete, checkable requirement. For every `advisory/risk-register` item rated **Exposure ≥ 12**, also create a named NFR (in a "Compliance & Liability Constraints" section) with a risk-register reference, a measurable target, and executable acceptance criteria, and mark it a **pre-launch gate blocker** in the runbook.
3. Write `ventures/<slug>/product/design/nfr.md`. Every NFR must be testable by qa-engineer.

Heuristics: `knowledge/ledger.md`.
