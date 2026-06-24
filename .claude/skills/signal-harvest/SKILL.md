---
name: signal-harvest
description: Use at G0 to harvest demand signals across the source taxonomy — keyless APIs (HN, GitHub, Google autocomplete, StackExchange) plus guided WebSearch for review/marketplace/job-board tiers — into one tell-tagged signal inventory. Triggers: "harvest signals", "is there real demand", "what are people saying", any G0 scout pass.
when_to_use: G0 demand gathering; building the evidence inventory that conviction-scoring scores. Also covers trend trajectory & seasonality.
allowed-tools: Read, Bash, WebSearch, WebFetch
---

## Live harvest (keyless collectors)
```!
python "$CLAUDE_PROJECT_DIR/.claude/skills/signal-harvest/scripts/harvest_signals.py" 2>/dev/null || echo "DATA UNAVAILABLE: harvest script not reachable; fall back to WebSearch."
```

## Procedure
1. Read the harvest above. It pulls HN (Algolia), GitHub issues (👍 = votes), Google autocomplete (intent), and StackExchange — each signal tagged with a language-tell category and an engagement number. If it says `DATA UNAVAILABLE`/`skipped`, note it and lean harder on step 2.
2. **Cover the high-quality tiers the script does NOT pull** with guided WebSearch (NEVER scrape — public search only). For the active theme, search the tell strings against: competitor reviews (G2/Capterra/TrustRadius/Trustpilot/app stores, filtered to 1–3★), freelance marketplaces (Upwork/Fiverr — recurring same-task gigs), job boards (LinkedIn/Indeed/Seek — roles hired to do the manual task), and feature-request boards (Canny/UserVoice). See `references/source-tiers.md` for the per-tier search strings and what each tier proves.
3. Build ONE deduped **signal inventory** (do not write a file unless asked — hand it to `conviction-scoring`): each row = `source-tier · signal excerpt · dated link · engagement · tell category`. Keep the strongest ~20. Add a one-line **trend trajectory** read (growing / flat / declining + any seasonality) from Google Trends or dated source momentum.
4. Mark every figure with a dated source; tag anything you cannot verify `unverified — resolve at G1`. Hand the inventory + trajectory to `conviction-scoring`.

**Demand ≠ opportunity, and breadth ≠ conviction.** A loud single thread is not a signal. The bar is recurrence across *independent* sources, real intensity, willingness-to-pay evidence, and an existing workaround — `conviction-scoring` enforces that. Reddit/Product Hunt live collectors are not wired (keyed); cover them via WebSearch. Tell lexicon: `references/tells.json`. Source-reliability notes: `knowledge/ledger.md`.
