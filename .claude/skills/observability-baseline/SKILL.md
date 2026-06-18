---
name: observability-baseline
description: Use at G6 to define the minimum observability — the few signals that matter, where they go, and what alerts on them. Triggers: "observability", "monitoring", "what should we alert on", "health checks", G6 operate.
when_to_use: defining health/error/latency signals and alerting at G6.
allowed-tools: Read, Write, Edit, Bash
---

## Procedure
1. Define the few signals that matter: health/uptime, error rate, latency (p95), and the ONE business metric (signups, jobs run).
2. Add a health endpoint and structured logging (no PII/secrets in logs).
3. Set alert thresholds tied to the NFRs, and where alerts go (the on-call channel).
4. Keep it cheap and minimal — a solo team can't watch 50 dashboards; pick the 4 signals that should page you.
5. Document in the runbook / observability section.

Heuristics: `knowledge/ledger.md`.
