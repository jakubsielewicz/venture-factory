---
name: conviction-scoring
description: Use at G0 right after signal-harvest to score whether a demand signal carries conviction — frequency × intensity × willingness-to-pay × addressability — and gate PURSUE-worthiness BEFORE a full opportunity score. Triggers: "is this a real signal", "score the conviction", "should we validate this", any G0 scout pass.
when_to_use: the upstream G0 gate — converting a harvested signal inventory into a PASS/WEAK/FAIL conviction verdict and a validate-next shortlist, feeding demand+WTP evidence to opportunity-scoring.
allowed-tools: Read, Write
---

## Procedure
1. Take the signal inventory from `signal-harvest` (recurrence, intensity, WTP evidence, addressability, dated sources). If no inventory was run, say so — do not score conviction from memory.
2. For each candidate pain, score four factors **1–5 each, every score backed by a cited signal** (anchors: `references/scoring-anchors.md`):
   - **Frequency** — recurrence across *independent* sources (not one loud thread).
   - **Intensity** — emotional load / quantified time-cost ("we spend hours every week").
   - **WTP** — evidence they already pay (freelancer/tool) or explicitly say they would.
   - **Addressability** — can a solo/small team actually serve it, low-ops.
3. Combine **multiplicatively**: `product = F × I × W × A` (max 625), then `score = round(product / 6.25)` → 0–100.
4. **Gate** on the normalised score: **≥60 PASS** · **35–59 WEAK** · **<35 FAIL**. **Hard rule:** if ANY factor is 1, the verdict cannot be PASS regardless of the product (a missing bar kills conviction — a signal must clear several bars at once).
5. Write `ventures/<slug>/research/conviction-signal.md` (template: `references/scoring-anchors.md`):
   - the signal-inventory table,
   - the 4-factor scorecard per candidate (each cell cites a signal) + product + normalised score + verdict,
   - the **validate-next** shortlist: top 1–3 to test by fake-door landing page or direct outreach *before building*,
   - a one-line **handoff** to `opportunity-scoring`: the demand + WTP evidence (seeds its Demand 0.25 and Monetisation 0.20 dimensions).
6. **A WEAK/FAIL is a PARK on signal grounds** — report it so the scout can stop before spending tokens on full sizing/scoring. PASS → proceed to market-sizing/competitor/opportunity-scoring.

Conviction ≠ opportunity score: this gate asks "is the pain real, recurring, and paid?"; `opportunity-scoring` then asks "is it a good business?". Anchors & worked examples: `references/scoring-anchors.md`. Heuristics: `knowledge/ledger.md`.
