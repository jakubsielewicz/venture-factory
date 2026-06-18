---
name: api-contract
description: Use at G3 to specify the API/interface contracts — endpoints, request/response shapes, and the error model — so the builder doesn't guess. Triggers: "API contract", "endpoints", "request/response", "interface spec", G3 design.
when_to_use: defining API or module interface contracts at G3.
allowed-tools: Read, Write
---

## Procedure
1. List each endpoint/operation: method + path (or function signature), purpose, auth requirement.
2. For each: request shape (fields, types, required/optional, validation rules) and response shape (success body + status).
3. Define ONE consistent error model (shape, codes, when each is returned).
4. Note idempotency, pagination, and rate limits where relevant; reference the data model in `c4.md`.
5. Keep it consistent with PRD scope. Write `ventures/<slug>/product/design/api-contract.md`.

The bar: a contract the builder can implement without asking you a question. Heuristics: `knowledge/ledger.md`.
