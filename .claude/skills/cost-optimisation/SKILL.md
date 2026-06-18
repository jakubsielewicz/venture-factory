---
name: cost-optimisation
description: Use at G6 (and on a schedule) to keep infra cost within the ceiling — identify the top drivers and the cheapest viable setup for the load. Triggers: "cost pass", "reduce the bill", "are we within budget", "cost optimisation", G6 operate.
when_to_use: keeping running costs within the envelope at G6 and on a recurring pass.
allowed-tools: Read, Write, Bash
---

## Procedure
1. Pull the cost ceiling (`financials/` + `nfr.md`) and the current/projected spend.
2. Identify the top 3 cost drivers; right-size them to actual load (scale-to-zero, smaller instances, caching, cheaper tiers).
3. Flag waste: idle resources, over-provisioning, egress, premium features you don't use.
4. Recommend the cheapest setup that still meets the NFRs; quantify the saving.
5. If projected spend exceeds the ceiling, escalate — do not silently overspend (the budget hook blocks side-effecting spend anyway).

Heuristics: `knowledge/ledger.md`.
