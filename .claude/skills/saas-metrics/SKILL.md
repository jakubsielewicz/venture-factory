---
name: saas-metrics
description: Use to define and compute the core SaaS metrics for a venture — MRR/ARR, churn, NRR, CAC, LTV, payback, Rule of 40. Triggers: "what are the metrics", "MRR/churn/LTV", "are these numbers healthy", G1/G3 financial passes.
when_to_use: computing and sanity-checking the standard SaaS metric set against benchmarks.
allowed-tools: Read, Write, Bash
---

## Procedure
1. Compute, **showing each formula**: MRR/ARR, gross & net revenue retention, logo & revenue churn, ARPU, gross margin, CAC, LTV, LTV:CAC, CAC payback, Rule of 40.
2. For each, state the assumption/source for its inputs; flag any computed from a guess.
3. Compare each to a benchmark band (healthy / watch / unhealthy) and explain the one that matters most for THIS model.
4. Output a metrics table; feed to `unit-economics` and the verdict.

Show the arithmetic — a metric without its formula and inputs is not trustworthy. Benchmark bands: see the `unit-economics` reference. Heuristics: `knowledge/ledger.md`.
