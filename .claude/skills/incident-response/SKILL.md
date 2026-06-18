---
name: incident-response
description: Use at G6 to set up lightweight incident response — severities, first-response steps, rollback trigger, and a blameless post-mortem habit. Triggers: "incident response", "what if it breaks", "on-call", "post-mortem", G6 operate.
when_to_use: defining incident severities, response, and rollback at G6.
allowed-tools: Read, Write, Edit
---

## Procedure
1. Define severities (SEV1 down / SEV2 degraded / SEV3 minor) with example symptoms.
2. First-response steps per severity: acknowledge, assess blast radius, communicate, mitigate (often: roll back per the runbook).
3. Set the rollback trigger explicitly (when to stop debugging forward and revert).
4. After any SEV1/2: a short blameless post-mortem (what happened, why, the one fix to prevent recurrence) — feed it to the skill-curator.
5. Document in the runbook; keep it to one page a tired on-call can follow.

Heuristics: `knowledge/ledger.md`.
