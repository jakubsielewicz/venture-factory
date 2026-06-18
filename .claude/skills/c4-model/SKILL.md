---
name: c4-model
description: Use at G3 to capture architecture as a C4 model plus the data model and key flows. Triggers: "architecture", "C4", "data model", "how do the pieces fit", G3 design.
when_to_use: documenting system context, containers, the data model, and critical flows at G3.
allowed-tools: Read, Write
---

## Procedure
1. Context (L1): the system, its users, and the external systems it talks to (payments, auth, the platform APIs noted in `advisory/`).
2. Containers (L2): the deployable units (web, api, worker, db) and how they communicate — a mermaid diagram or a clear text list.
3. Data model: the core entities, their key fields, and relationships. Flag any PII/sensitive data (feeds the privacy NFR).
4. Key flows: 2–4 critical sequences (signup, the core job) step by step.
5. Keep it to MVP scope — model what you're building, not a future platform. Write `ventures/<slug>/product/design/c4.md`.

Heuristics: `knowledge/ledger.md`.
