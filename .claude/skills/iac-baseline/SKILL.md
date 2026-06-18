---
name: iac-baseline
description: Use at G4 to declare infrastructure as code — never click-ops. Defines the deployable infra within the cost envelope, but does NOT apply it. Triggers: "infrastructure", "IaC", "deploy config", "infra setup", G4 build.
when_to_use: declaring infrastructure-as-code at G4 (declare only; applying is a gated G6 action).
allowed-tools: Read, Write, Edit, Bash
---

## Procedure
1. Express all infra as code — compute, storage, networking, secret references. No console/click-ops.
2. Right-size to the NFR load and the cost ceiling; prefer managed + serverless for a small team.
3. Parameterise environments (dev/prod) and reference secrets from a manager — never inline credentials.
4. Keep it declarative: you DECLARE infra here. APPLYING it is a gated G6 action behind the deploy hook + human approval — do not apply.
5. Write IaC under `product/`; document the apply command for the operator's runbook.

Heuristics: `knowledge/ledger.md`.
