# G0 Conviction-Signal Capability — Design

**Date:** 2026-06-24
**Status:** Approved (design); pending implementation plan
**Scope:** Expand the venture-factory crew with a G0 pre-scoring quality bar that harvests multi-source demand signals and scores them for *conviction* before an idea earns a full opportunity score.

## Problem

Today's G0 demand check is thin. The `demand-signals` skill has a stub script (no live source wired) and falls back to "2–3 web searches," producing a 3-item "demand snapshot." `opportunity-scoring` then treats demand as a single 0.25-weighted dimension. There is no structured way to gather signals across the high-quality sources where money is already moving, no language-tell pattern-matching, and no distinct *conviction* bar that separates "this is a real, recurring, paid pain" from "this could be a good business."

We want to **generate a signal with conviction**: harvest evidence across tiered sources, pattern-match the language tells, and score candidates on `frequency × intensity × willingness-to-pay × addressability` — gating low-conviction ideas out *before* spending tokens on full scoring, and validating only the top few.

## Signal taxonomy (source of truth for the skills)

Ordered by signal quality.

**Tier 1 — money already moving (highest quality):**
- Freelance marketplaces (Upwork, Fiverr): recurring gigs for the same task = paid repetitive pain; volume ≈ market size.
- Competitor reviews filtered to 1–3 stars (G2, Capterra, TrustRadius, GetApp, Trustpilot, app stores): "love it but it doesn't…", "switched away because…" = unmet need inside a proven-demand category.
- Job postings (LinkedIn, Indeed, Seek): a role hired to do something manual = a company naming a process it will pay to automate.
- Public feature-request boards with vote counts (Canny, UserVoice, GitHub Issues 👍 tallies, marketplace "requested" lists): demand already quantified and prioritised.

**Tier 2 — search intent (measurable, gives volume):**
- Keyword tools (Ahrefs, SEMrush, Ubersuggest, Google Keyword Planner): commercial-intent queries ("best X for Y", "X alternative", "X vs Y", "X pricing") with volume numbers.
- Question miners (AnswerThePublic, AlsoAsked, Google autocomplete + "People also ask").
- Google Trends for trajectory (growing / fading).

**Tier 3 — raw latent need (highest volume, needs most validation):**
- Reddit (niche/industry subs), Hacker News (Ask HN + comments via Algolia), vertical communities (Discord/Slack, trade forums, Stack Exchange, Indie Hackers), social (X, LinkedIn post comments, YouTube/TikTok tutorial comments, niche Facebook groups), Product Hunt comments ("would be great if it also…" = adjacent gap).

### Language tells (pattern-match these)
- **Unmet need:** "I wish", "why isn't there", "there has to be a better way", "we spend hours every week", and most valuable — a described workaround ("I built a spreadsheet/script to…"). A workaround is unmet need with the pain pre-quantified.
- **Solution-seeking / intent:** "what do you use for", "recommendations for", "looking for a tool/service that", "alternative to [X]", "is it worth paying for", any pricing/cost question.
- **Competitor weakness:** "love it but it doesn't", "if only it could", "switched because".

### What makes a signal worth chasing
It clears several bars at once: recurs across **independent** sources (not one loud person), carries real emotional **intensity** (frustration, not mild preference), shows evidence of **willingness to pay** (already pays a freelancer/tool, or says they would), and a **workaround already exists**. Score on `frequency × intensity × WTP × addressability`, then validate only the top few via direct outreach or a fake-door landing page before building.

## Architecture

Mirrors the existing `demand-signals → opportunity-scoring` gather-then-score split, replacing the gather half with a richer harvest and inserting a conviction gate upstream of opportunity scoring.

```
opportunity-scout (G0 agent)
  └─ step 1: signal-harvest ──► conviction-scoring ──► PASS? ─┐
       (gather inventory)        (score + gate)               │
                                                              ├─ FAIL/WEAK → documented PARK (stop, no full scoring)
                                                              │
       feeds demand + WTP evidence ─────────────────────────►┘ PASS → market-sizing → competitor-teardown → opportunity-scoring
```

### Component 1 — `signal-harvest` skill (new)
- **Purpose:** gather and structure raw demand signals across the taxonomy tiers into a deduped inventory.
- **allowed-tools:** Read, Bash, WebSearch, WebFetch (least privilege; no Write — the agent owns the artifact).
- **Behaviour:**
  - Runs `harvest_signals.py` for the wired keyless collectors.
  - Routes ToS-risky / no-API sources (G2/Capterra/TrustRadius reviews, Upwork/Fiverr, LinkedIn/Indeed/Seek jobs, Canny/UserVoice boards, X) to **guided WebSearch using the language-tell search strings** — explicitly NO scraping (respects repo guardrails: documented public APIs only).
  - Reddit / Product Hunt: documented keyed extension hooks; skipped gracefully when unconfigured.
  - **Output (handed to `conviction-scoring`, not a standalone file unless asked):** a deduped signal inventory — each row tagged with `source-tier`, dated link, engagement metric (points / votes / comments / answers), and matched language-tell category.

### Component 2 — `conviction-scoring` skill (new)
- **Purpose:** apply the conviction formula and produce the gate verdict + the validate-next shortlist.
- **allowed-tools:** Read, Write.
- **Scoring:** each candidate pain scored on four factors, **1–5 each, with cited evidence**:
  - `frequency` — recurrence across independent sources.
  - `intensity` — emotional load / time-cost language.
  - `WTP` — evidence they already pay (freelancer/tool) or say they would.
  - `addressability` — can a solo/small team actually serve it, low-ops.
  - Combined **multiplicatively** (max 625), normalised `÷6.25` to 0–100.
- **Gate bands:** **≥60 PASS** (worth validating) · **35–59 WEAK** (more evidence needed) · **<35 FAIL** (drop). **Hard rule:** any factor scored 1 ⇒ cannot PASS regardless of product (a missing bar kills conviction — encodes "clears several bars at once").
- **Artifact:** writes `ventures/<slug>/research/conviction-signal.md`:
  - the signal-inventory table (source-tier · signal excerpt · dated link · engagement · tell category),
  - the 4-factor scorecard per candidate with cited evidence + normalised score + verdict,
  - the **"validate next"** shortlist (top 1–3 for fake-door / outreach before building),
  - a one-line demand + WTP handoff for `opportunity-scoring`.

### Component 3 — `harvest_signals.py` (new script, under `signal-harvest/scripts/`)
- **Pattern:** reuses the existing fail-graceful contract — reads theme from `manifest.json` / `brief.md` (NOT an interpolated argument — injection-safe), per-collector `try/except` with timeouts, **always exits 0** (prints a `DATA UNAVAILABLE` / per-collector `skipped:` marker on failure so the skill degrades to WebSearch). **stdlib `urllib` only** — no new dependencies, cross-platform (Windows-first repo).
- **Read-only:** prints a ranked digest to stdout (optional `--json` for machine-readable); never writes files. The agent persists the curated artifact (single-writer discipline preserved).
- **Wired collectors (all keyless):**
  - **HN Algolia** — `https://hn.algolia.com/api/v1/search` (and `search_by_date`); returns `points`, `num_comments`, `created_at_i`, `objectID` → permalink. Strong for latent-need + workaround tells.
  - **GitHub Issues/Discussions** — `https://api.github.com/search/issues`; 👍 reaction counts (`reactions` field, `Accept: application/vnd.github+json`) = pre-quantified votes. Uses `GITHUB_TOKEN` if set (5000/hr), keyless otherwise (60/hr) with graceful rate-limit handling.
  - **Google Autocomplete** — `https://suggestqueries.google.com/complete/search?client=firefox&q=…`; question/intent mining; seeds "best X for", "X alternative", "X vs", "X pricing" expansions.
  - **StackExchange** — `https://api.stackexchange.com/2.3/search/advanced`; `score` / `answer_count` / `view_count` as engagement. Optional `STACKEX_KEY` raises quota.
- **Language-tell lexicon:** `signal-harvest/references/tells.json` — the single source of truth, loaded by the script (regex pre-tagging) and referenced by the skill (nuanced judgment). Three categories with phrase lists per the taxonomy above.
- **Extension hooks (documented, not wired):** Reddit (`REDDIT_CLIENT_ID/SECRET` OAuth), Product Hunt (`PRODUCT_HUNT_TOKEN` GraphQL) — print `skipped: not configured` when env unset.

### Component 4 — enhance `opportunity-scout` agent
- Add `signal-harvest` and `conviction-scoring` to its `skills:` list.
- Insert as **step 1** of its procedure (before sizing / competitor / scoring): harvest → conviction-score → gate. A FAIL/WEAK is a documented **PARK on signal grounds** before tokens are spent on full scoring.
- Update the gate-exit checklist to require `research/conviction-signal.md` with a verdict, alongside `opportunity-score.md`.

### Component 5 — deterministic enforcement
- Add `research/conviction-signal.md` to **G0 `required_artifacts`** in `ventures/_template/manifest.json`, so the existing artifact-gate hook (`gate.py check <slug> G0`) enforces it exactly like `opportunity-score.md`. "Gates are files, not vibes."

### Component 6 — retire `demand-signals`
- The new `signal-harvest` supersedes `demand-signals`. Fold its momentum/seasonality concern (trend trajectory: growing / flat / declining + seasonality) into `signal-harvest` as one section, so there is a single G0 demand skill and no redundancy.
- Remove the `demand-signals` skill directory and update the one reference in `opportunity-scout`'s `skills:` list. Preserve any non-obvious validated heuristics from its `knowledge/ledger.md` by migrating them into `signal-harvest/knowledge/ledger.md`.

### Component 7 — repo-convention housekeeping
- Each new skill: `references/` (taxonomy detail, source-reliability notes, scoring anchors/worked examples) + a seeded `knowledge/ledger.md`.
- Authored to `/new-skill` conventions: lean progressive-disclosure `SKILL.md`, least-privilege `allowed-tools`, fail-graceful script.

## Data flow

1. Scout resolves the active venture's theme.
2. `signal-harvest` runs `harvest_signals.py` → keyless collectors return normalised, tell-tagged records; the skill adds guided-WebSearch results for ToS-risky tiers; dedupes into one inventory.
3. `conviction-scoring` reads the inventory, scores each candidate pain on the four factors, applies the gate bands + hard rule, writes `conviction-signal.md`.
4. PASS → scout proceeds to sizing/competitor/`opportunity-scoring`, passing the demand+WTP evidence to seed those dimensions. FAIL/WEAK → documented PARK.

## Error handling & guardrails

- **Fail-graceful:** any collector failure degrades to guided WebSearch; the script never crashes the skill (exits 0 with markers).
- **No scraping:** only documented public APIs are hit by the script; ToS-risky sources go through the agent's WebSearch, not automated scraping.
- **Injection-safe:** theme is read from venture files, never interpolated into a shell argument.
- **Single-writer:** the script is read-only; the scout/skill writes the artifact inside `research/` only.
- **Cite-or-mark:** every harvested figure carries a dated source; anything unverifiable is marked "unverified — resolve at G1."

## Testing

- **Script unit/smoke:** run `harvest_signals.py` against a known theme with network available → returns tagged records from ≥1 collector; with network blocked / bad env → exits 0 with `DATA UNAVAILABLE` markers (fail-graceful contract). Tell-tagging returns the right category for fixture strings.
- **Gate logic:** fixture inventories produce expected PASS/WEAK/FAIL; a factor=1 forces non-PASS even at a high product.
- **Artifact-gate integration:** with `conviction-signal.md` absent, `gate.py check <slug> G0` is red; present → contributes to green.
- **Agent dry-run:** `@agent-opportunity-scout` on a sample theme produces both artifacts and a coherent handoff.

## Out of scope (YAGNI)

- Paid keyword-volume APIs (Ahrefs/SEMrush/Keyword Planner) — Google autocomplete is the keyless volume proxy for now.
- Scraping review sites / marketplaces / job boards — guided WebSearch only.
- Reddit / Product Hunt live collectors — extension hooks documented but not wired.
- Any new lifecycle gate — conviction is an internal G0 quality bar, not a new G.

## Open decisions — resolved

- **(a)** Retire `demand-signals`, folding momentum/seasonality into `signal-harvest`. **Confirmed.**
- **(b)** Enhance the existing `opportunity-scout` rather than add a dedicated agent. **Confirmed.**
