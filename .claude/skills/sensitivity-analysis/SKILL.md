---
name: sensitivity-analysis
description: Use to stress-test a financial model — vary the key drivers and find what breaks viability. Triggers: "run sensitivity", "what if churn doubles", "how robust is this", "which assumption matters most", G1/G3 financial passes.
when_to_use: stress-testing unit economics; finding the load-bearing assumption and the break point.
allowed-tools: Read, Write, Bash
---

## Procedure
1. Take the base-case unit economics. Identify the 3–5 drivers (price, churn, CAC, conversion, COGS).
2. Vary each ±20–50% one at a time; record the effect on LTV:CAC, payback, and break-even. Build a **tornado** ranking of which driver moves the verdict most.
3. Run 2–3 combined scenarios: pessimistic / base / optimistic.
4. Find the **break point** for the top driver (e.g. "viable until monthly churn > 4%").
5. Output the tornado table + scenario table + the single assumption to de-risk first; feed to the verdict.

Use Bash for the arithmetic if helpful; show the model. Heuristics: `knowledge/ledger.md`.
