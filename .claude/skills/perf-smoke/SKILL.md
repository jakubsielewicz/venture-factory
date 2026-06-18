---
name: perf-smoke
description: Use at G5 for a basic performance smoke test against the NFR latency/throughput targets — not a full load test, just enough to catch obvious problems. Triggers: "perf smoke", "is it fast enough", "latency check", G5 test.
when_to_use: a lightweight performance check against NFR targets at G5.
allowed-tools: Read, Bash, Write
---

## Procedure
1. Pull the perf NFR targets from `nfr.md` (e.g. p95 latency, throughput).
2. Exercise the core endpoint(s) under a modest concurrent load; measure p50/p95 latency and error rate.
3. Compare to target; flag any breach with the measured number.
4. Check the obvious smells: N+1 queries, unindexed lookups, sync work that should be async.
5. Report pass/breach per target; a breach on a core path is a G5 blocker.

A smoke test, not a load test — keep it quick; deeper testing is post-launch. Heuristics: `knowledge/ledger.md`.
