---
name: opportunity-scoring
description: Use when shortlisting or ranking passive-income product/service ideas — "score this idea", "is this niche worth it", comparing opportunities, or any G0 scout pass. Produces a weighted 0–100 Opportunity Score and a PURSUE/PARK/KILL verdict.
when_to_use: opportunity shortlisting, niche comparison, TAM-vs-effort triage, go/park decisions at G0.
allowed-tools: Read, Write, WebSearch, WebFetch
---

## Procedure
1. Gather inputs for the idea: the demand snapshot (from the `demand-signals` skill if preloaded), market size, and 2–4 competitors with pricing. Cite every figure to a dated source; mark anything you cannot verify as "unverified — resolve at G1".
2. Score each dimension 1–5, multiply by weight, sum, ×4 → a 0–100 score:
   - Demand & search momentum (0.25)
   - Monetisation clarity / willingness-to-pay (0.20)
   - Passive-fit: low ongoing ops after build (0.20)
   - Build feasibility for a solo/small team (0.15)
   - Defensibility / moat potential (0.10) — **cap at 3/5 until the competitive lane is *verified* by direct competitor pricing probes (see `competitor-teardown` / `competitor-price-probe`); an "open lane" cannot score 4–5 on inference**
   - Regulatory drag — inverse, 5 = none (0.10)
3. Flag disqualifiers (legal block, single-platform dependency, zero willingness-to-pay) → automatic KILL regardless of score. **Crowding check:** count active/funded startups chasing the same mandate — if >3, cap the open-lane sub-score at 3/5 regardless of incumbent positioning.
4. Verdict bands: ≥70 PURSUE · 45–69 PARK · <45 KILL.
5. Write `ventures/<slug>/research/opportunity-score.md`: the scorecard table, the score, a one-paragraph verdict, and the top 3 unknowns for G1. Add a **confidence flag** to any scorecard row that hinges on an unverified competitive claim (e.g. "(unverified — direct probe required before G1)").

Dimension definitions and worked anchors: `references/scoring-rubric.md`.
Validated heuristics: `knowledge/ledger.md` (load only the latest / highest-confidence entries).
