---
name: research-verification
description: Use before G2 to adversarially verify the load-bearing numbers in a venture's research and financials against their cited sources, flagging anything uncited or unverifiable. Triggers: "verify the research", "check the numbers", "fact-check before go/no-go", pre-G2 verification.
when_to_use: adversarial fact-check of TAM/pricing/competitor/financial claims before the human go/no-go.
allowed-tools: Read, WebSearch, WebFetch, Write
---

## Procedure
1. Extract every LOAD-BEARING number from `research/` and `financials/` (market size, pricing, competitor figures, key conversion/churn assumptions). Ignore cosmetic numbers.
2. For each: locate its cited source, open it (WebFetch), and confirm the figure matches. For a **statutory penalty/figure**, verify the arithmetic: confirm the penalty-unit COUNT (from the legislation) AND the current penalty-unit RATE (from a primary rate source), compute `N × $R = $Y`, and compare — do not call MISMATCH until both are confirmed (two secondaries citing different dollar amounts often differ only by rate date). Classify: **VERIFIED · MISMATCH · UNCITED · UNVERIFIABLE**.
3. Be adversarial — assume a figure is wrong until the source confirms it. A plausible number with no checkable source is UNCITED, not verified.
4. Write `ventures/<slug>/advisory/verification.md`: a table (claim · used-where · source · verdict · note) + a summary line — "N of M load-bearing claims verified; K blockers".
5. Any MISMATCH or UNCITED figure the go/no-go depends on is a **G2 blocker** — say so plainly.

You do NOT fix the numbers (that's the owning specialist's job) and you write only `verification.md`. Independence is the point — never wave a number through. Heuristics: `knowledge/ledger.md`.
