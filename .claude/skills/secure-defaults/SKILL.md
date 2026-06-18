---
name: secure-defaults
description: Use throughout G4 to apply security from the first commit — no secrets in code, least privilege, input validation, safe dependencies. Triggers: "secure defaults", "security baseline", "am I handling secrets right", G4 build.
when_to_use: applying baseline security while building at G4.
allowed-tools: Read, Write, Edit, Bash, Grep
---

## Procedure
1. Secrets: none in code or git; load from env/secret manager; provide a `.env.example` with placeholders only.
2. AuthN/Z: enforce on every endpoint; deny by default; never trust client input.
3. Input validation + output encoding on all boundaries; parameterised queries (no string-built SQL).
4. Dependencies: pin versions; avoid abandoned packages; note anything with known CVEs.
5. Least privilege for every credential/role; transport over TLS only.
6. Leave a short `SECURITY.md` noting the posture for qa-engineer's checklist.

Heuristics: `knowledge/ledger.md`.
