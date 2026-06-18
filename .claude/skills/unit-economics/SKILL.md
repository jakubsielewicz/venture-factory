---
name: unit-economics
description: Use when modelling whether a product makes money — pricing, margins, CAC/LTV, payback, break-even. Triggers: "do the unit economics", "what should we charge", "is this profitable", any G1/G3 financial pass.
when_to_use: per-unit P&L, CAC/LTV, payback and break-even modelling at G1 (viability) and G3 (pricing).
allowed-tools: Read, Write, Bash
---

## Current benchmarks
```!
python "$CLAUDE_PROJECT_DIR/.claude/skills/unit-economics/scripts/pull_benchmarks.py" 2>/dev/null || echo "DATA UNAVAILABLE: benchmarks script not reachable; use references/saas-benchmarks.md."
```

## Procedure
1. Establish the revenue unit (per seat / per usage / flat) and the pricing hypothesis.
2. Per-unit P&L: price − COGS (infra, payment fees, support) = contribution margin. Use the **target-market locale** payment-processor rate, not the US default (e.g. Stripe AU domestic 1.7% + A$0.30, not US 2.9% + $0.30); cite the rate + date, and confirm locale tax/GST and refund-cost assumptions.
3. Compute CAC (by channel), LTV (ARPU × gross margin × expected lifetime from churn), LTV:CAC, and CAC payback (months).
4. Break-even units and months given the build cost (from `financials/build-cost.md` if present, else state the assumption).
5. Stress it: sensitivity on price ±20%, churn ±50%, CAC ±50% (call the `sensitivity-analysis` skill).
6. Verdict: healthy (LTV:CAC ≥ 3, payback ≤ 12mo) / fixable / unviable, with the one lever that moves it most.
7. Write `ventures/<slug>/financials/unit-economics.md`.

Definitions, formulas, current benchmark ranges: `references/saas-benchmarks.md`.
Decision-support, not financial advice; the human owns the pricing decision. Heuristics: `knowledge/ledger.md`.
