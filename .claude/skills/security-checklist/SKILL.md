---
name: security-checklist
description: Use at G5 to run a pre-ship security checklist — authn/z, input validation, secrets, dependencies, and the advisory/ compliance constraints. Triggers: "security checklist", "is it safe to ship", "security review", G5 test.
when_to_use: pre-ship security verification at G5.
allowed-tools: Read, Bash, Grep
---

## Procedure
1. Walk the checklist (OWASP-style, scoped to the app): authn/z on every route; input validation/output encoding; no secrets in code or logs; parameterised queries; safe file/SSRF handling.
2. Dependencies: scan for known-vulnerable packages; flag anything abandoned.
3. Data/privacy: confirm the `advisory/` privacy + liability constraints are met (PII handling, required disclaimers, "tool not adviser" posture where required).
4. Classify findings critical/major/minor. CRITICALS must be fixed before G5 green — not deferred.
5. Record the findings; hand criticals back to the builder.

Heuristics: `knowledge/ledger.md`.
