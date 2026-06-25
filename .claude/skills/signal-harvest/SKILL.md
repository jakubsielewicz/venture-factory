---
name: signal-harvest
description: Use at G0 to harvest demand signals across the source taxonomy — keyless APIs (HN, GitHub, Google autocomplete, StackExchange) plus guided WebSearch for review/marketplace/job-board tiers — into one tell-tagged signal inventory. Triggers: "harvest signals", "is there real demand", "what are people saying", any G0 scout pass.
when_to_use: G0 demand gathering — discovery (seed → candidate themes) or validation (theme → the evidence inventory that conviction-scoring scores). Also covers trend trajectory & seasonality.
allowed-tools: Read, Bash, WebSearch, WebFetch
---

## Live harvest (keyless collectors)
```!
python "$CLAUDE_PROJECT_DIR/.claude/skills/signal-harvest/scripts/harvest_signals.py" 2>/dev/null || echo "DATA UNAVAILABLE: harvest script not reachable; fall back to WebSearch."
```

## Two modes
- **Discovery (seed → themes):** you have a broad domain but no concrete idea yet — let the signals *inform* the theme. See below.
- **Validation (theme → evidence):** a specific idea already has a venture; gather its demand evidence for `conviction-scoring`. The auto-harvest above covers this (it reads the active venture's theme).

## Discovery mode (seed → candidate themes)
When handed a broad domain (e.g. "AU SME compliance", "real-estate back-office") and no concrete idea yet:
1. Run the harvester on the seed. The seed travels via an **environment variable** — the script reads it from `os.environ`, never from a command argument, preserving the injection-safe design (use a clean operator-provided domain, not harvested web text):
   `VF_HARVEST_SEED="<broad domain>" python "$CLAUDE_PROJECT_DIR/.claude/skills/signal-harvest/scripts/harvest_signals.py"`
   (The auto-harvest at the top of this skill may print `DATA UNAVAILABLE` when no venture/seed is in the ambient env — ignore it and use this run.)
2. **Cluster** the tagged signals into distinct *pains* (group by the recurring problem, not the source). A pain that recurs across *independent* sources with real intensity + WTP language is a candidate theme; a one-off loud thread is noise.
3. Surface **3–7 candidate themes**, each as: a one-line problem statement, its 2–3 strongest signals (dated links + engagement), and the dominant tell category. Rank by signal strength (independent-source frequency × intensity × WTP evidence).
4. Hand the ranked candidates up to the scout/orchestrator to choose which become ventures. Each chosen theme then runs the Validation flow below → `conviction-scoring`.

Discovery still needs a seed — it refines a broad domain into specific pains; it does not scan the whole internet from nothing.

## Validation procedure (theme → evidence)
1. Read the harvest above. It pulls HN (Algolia), GitHub issues (👍 = votes), Google autocomplete (intent), and StackExchange — each signal tagged with a language-tell category and an engagement number. If it says `DATA UNAVAILABLE`/`skipped`, note it and lean harder on step 2.
2. **Cover the high-quality tiers the script does NOT pull** with guided WebSearch (NEVER scrape — public search only). For the active theme, search the tell strings against: competitor reviews (G2/Capterra/TrustRadius/Trustpilot/app stores, filtered to 1–3★), freelance marketplaces (Upwork/Fiverr — recurring same-task gigs), job boards (LinkedIn/Indeed/Seek — roles hired to do the manual task), and feature-request boards (Canny/UserVoice). See `references/source-tiers.md` for the per-tier search strings and what each tier proves.
3. Build ONE deduped **signal inventory** (do not write a file unless asked — hand it to `conviction-scoring`): each row = `source-tier · signal excerpt · dated link · engagement · tell category`. Keep the strongest ~20. Add a one-line **trend trajectory** read (growing / flat / declining + any seasonality) from Google Trends or dated source momentum.
4. Mark every figure with a dated source; tag anything you cannot verify `unverified — resolve at G1`. Hand the inventory + trajectory to `conviction-scoring`.

**Demand ≠ opportunity, and breadth ≠ conviction.** A loud single thread is not a signal. The bar is recurrence across *independent* sources, real intensity, willingness-to-pay evidence, and an existing workaround — `conviction-scoring` enforces that. Reddit/Product Hunt live collectors are not wired (keyed); cover them via WebSearch. Tell lexicon: `references/tells.json`. Source-reliability notes: `knowledge/ledger.md`.
