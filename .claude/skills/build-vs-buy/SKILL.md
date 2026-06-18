---
name: build-vs-buy
description: Use at G3 to decide, per major component, whether to build, buy, or use open source — weighing cost, time, lock-in, and the moat. Triggers: "build vs buy", "should we use <service>", "make or buy", G3 design.
when_to_use: per-component build/buy/OSS decisions at G3.
allowed-tools: Read, Write, WebSearch, WebFetch
---

## Procedure
1. List the major components (auth, payments, the core engine, infra, email, etc.).
2. Score each on build vs buy vs OSS: time-to-MVP, ongoing cost, lock-in/switching risk, and whether it's core to the moat.
3. Default: BUY/OSS for commodity (auth, payments, email); BUILD only the differentiated core.
4. Cost each chosen option against the `financials/` envelope; cite vendor pricing with dates.
5. Output a decision table + the rationale for anything you chose to build.

Build the moat, buy the rest. Heuristics: `knowledge/ledger.md`.
