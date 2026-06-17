---
name: demand-signals
description: Use at G0 to ground a niche in current demand evidence — search/trend momentum, community/forum activity, seasonality — before scoring. Triggers: "is there demand", "demand snapshot", any opportunity-scoring pass.
when_to_use: G0 demand checks, niche momentum, validating that anyone is actually looking for this.
allowed-tools: Read, Bash, WebSearch, WebFetch
---

## Live demand snapshot
```!
python "$CLAUDE_PROJECT_DIR/.claude/skills/demand-signals/scripts/pull_signals.py" 2>/dev/null || echo "DATA UNAVAILABLE: demand-signals script not reachable; fall back to web search."
```

## Procedure
1. Read the snapshot above. If it says `DATA UNAVAILABLE`, fall back to 2–3 targeted web searches (search-volume proxies, forum/Reddit threads, marketplace listings) and note that the snapshot was unavailable.
2. Summarise: direction of demand (growing / flat / declining), 3 concrete demand signals each with a dated source, and any seasonality.
3. Hand the summary to `opportunity-scoring`; do not write a separate file unless asked.

The script reads the active venture's theme from `manifest.json` / `brief.md` (never from an interpolated argument — avoids shell injection) and needs `DEMAND_SIGNALS_API_KEY` for live data. Source-reliability notes: `knowledge/ledger.md`.
