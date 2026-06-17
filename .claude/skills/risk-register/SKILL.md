---
name: risk-register
description: Use at G1 to build a structured risk register for a venture — each risk scored likelihood × impact with an owner and mitigation. Triggers: "what are the risks", "risk register", "what could kill this", G1 validation.
when_to_use: enumerating and scoring venture risks; identifying disqualifiers at G1.
allowed-tools: Read, Write
---

## Procedure
1. Enumerate risks across categories: market/demand, regulatory, technical/build, operational ("passive"-ness), financial, platform/dependency, key-person.
2. Score each: likelihood (1–5) × impact (1–5) = exposure (1–25). Add an owner and a concrete mitigation or kill-trigger.
3. Sort by exposure. Flag any exposure ≥ 20, or any single point of failure, as a DISQUALIFIER candidate.
4. Write `ventures/<slug>/advisory/risk-register.md`: the sorted table + the 3 decisive risks + any disqualifiers.

Be specific — "it might not work" is not a risk; "Stripe may classify this MCC as high-risk and withhold payouts" is. Heuristics: `knowledge/ledger.md`.
