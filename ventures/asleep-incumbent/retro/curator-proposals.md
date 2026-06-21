# Curator Proposals — asleep-incumbent retro
**Date:** 2026-06-19  
**Curator run:** skill-curator (post-G1 retro, asleep-incumbent)  
**Status:** APPROVED BY HUMAN & APPLIED 2026-06-19 — proposals #1, #2, #3, #5 promoted into their SKILL.md procedures. #4 (research-verification) held at n=1 in the ledger pending a third confirming venture.

Proposals are ordered by evidence strength. Two (#1, #3) clear the n≥3 bar and are flagged as ready for promotion.

---

## Proposal 1 — competitor-teardown SKILL.md: Pricing-probe rule

**Evidence strength: n=2 (asleep-incumbent + au-sme-compliance) — READY TO APPLY (human approval)**

The current SKILL.md procedure does not explicitly address what to do when a competitor has no public pricing. The ledger now records the confirmed anti-pattern. Proposed addition to the "Competitor data collection" step:

```diff
+### Pricing-probe rule (mandatory)
+If a competitor has no published pricing, do NOT infer tier, target segment, or lane status
+from that absence. Record pricing as UNKNOWN and trigger a direct probe:
+  - Email or phone the vendor posing as a prospective buyer matching the target ICP.
+  - Request a written quote or price-page link (not just a demo).
+  - Record the result (price, self-serve y/n, hardware req'd, contract) in the teardown table.
+  - A lane can only be scored OPEN once at least the top 2 named competitors have been
+    directly probed AND returned pricing above the ICP's affordability threshold.
+No direct probe = lane status UNKNOWN, not OPEN.
```

**Why it clears the bar:** asleep-incumbent showed Logmaster was misread as "enterprise/EWD-first/no self-serve pricing" at G0; a direct inquiry returned A$28+GST/driver/mo software-only with no setup fee — lane-narrowing. ATCC product page returned 404; lane still open only conditionally. au-sme-compliance showed the same pattern (competitor pricing inferred from absent pages). Two ventures, same failure mode, high confidence it will recur.

---

## Proposal 2 — opportunity-scoring SKILL.md: Open-lane cap + crowding check

**Evidence strength: n=3 (asleep-incumbent + [venture-removed] + aml-tranche2/payday-super) — READY TO APPLY (human approval)**

The current scoring rubric does not cap the Defensibility/open-lane sub-score when the lane is unverified. Proposed procedure addition to the "Defensibility / moat potential" dimension:

```diff
+### Open-lane scoring cap (mandatory)
+The Defensibility sub-score may not exceed 3/5 ("neutral") until the competitive lane
+is VERIFIED by direct competitor pricing probes (see competitor-teardown pricing-probe rule).
+
+If the venture's overall score would fall below PURSUE (i.e. below ~65/100) after capping
+open-lane at 3, flag the venture as CONDITIONAL-PURSUE and require lane verification
+before G1 economics are run.
+
+### Crowding check (mandatory, run before scoring open-lane)
+Search for startups, VC-backed entrants, and association-endorsed tools targeting the
+same compliance obligation. If >3 funded or active entrants are directly competing on
+the same mandate:
+  - Cap the open-lane sub-score at 3/5 regardless of incumbent positioning.
+  - Note the crowding count in the scorecard rationale.
+
+### Confidence flag
+When a score hinges on an unverified competitive claim, add a confidence flag to the
+scorecard table row: e.g. "(unverified — direct probe required before G1)".
```

**Why it clears the bar:** asleep-incumbent (74 on open lane now shaky), [venture-removed] (70 on inferred open lane), aml-tranche2 + payday-super (PARKed because obvious mandate was crowded despite initial open-lane read). n≥3 across multiple venture types. This is the highest-impact procedure change available — it directly prevents the factory's most expensive failure mode (committing to G1 economics on a phantom open lane).

---

## Proposal 3 — market-sizing SKILL.md: Denominator sourcing rule

**Evidence strength: n=3 (asleep-incumbent + au-sme-compliance + [venture-removed]) — READY TO APPLY (human approval)**

The current SKILL.md does not enforce sourcing of the percentage split used to derive the target sub-segment from a broader population. Proposed addition to the "Bottom-up sizing" step:

```diff
+### Denominator sourcing rule (mandatory)
+The entity/operator count used as the market-size denominator must be cited from a
+named primary source: ABS business-count tables, AIHW provider census, sector regulator
+annual report, or a parliamentary submission.
+
+If the sub-segment count is derived by applying a percentage split to a broader total:
+  - The split percentage itself must have a cited source (not "analyst estimate").
+  - If no source exists, label the resulting range as RISK (not a base-case estimate),
+    report only the lower bound as the operative SOM, and flag it as a G2 blocker.
+  - Acceptable interim: ABS industry ANZSIC headcount for matching business-size band
+    (e.g. businesses with 1–19 employees in ANZSIC Division I Transport) as a proxy,
+    clearly labelled as a proxy with stated limitations.
```

**Why it clears the bar:** asleep-incumbent (3,200–7,200 sub-segment from 40–60% split with no primary; verification flagged as G2 blocker), au-sme-compliance (60% award-coverage figure uncited), [venture-removed] (operator count extrapolated from AIHW bed data). Three distinct ventures, same structural gap. High confidence this pattern will repeat on any AU regulatory mandate venture.

---

## Proposal 4 — research-verification SKILL.md: Competitor lane claim as G2 blocker

**Evidence strength: n=1 (asleep-incumbent; au-sme-compliance partial corroboration) — NOT YET at n≥3 bar; record in ledger only, promote after next occurrence**

Proposed addition (for future promotion — do not apply yet):

```diff
+### Lane claim verification (future addition — pending n≥3)
+A competitive open-lane claim that rests on absent public pricing must be treated as
+UNCITED (equivalent to an unsourced TAM). Flag it as a G2 blocker and initiate direct
+competitor pricing probes at G0/early G1, not as a late G1 verification task.
+The score should not propagate into G1 economics until the lane claim is resolved.
```

**Bar status:** n=1 primary + n=1 partial (au-sme-compliance had similar pricing gap but less clear lane-thesis dependency). Hold in ledger; promote to SKILL.md after next venture where the same failure mode recurs.

---

## Proposal 5 — demand-signals SKILL.md: Demand-only is not opportunity

**Evidence strength: n=3 (asleep-incumbent + [venture-removed] + aml-tranche2) — READY TO APPLY (human approval)**

Proposed addition to the "Signal scoring" or "Output" step:

```diff
+### Demand ≠ Opportunity (mandatory check)
+Strong regulatory demand is a necessary but not sufficient condition for a PURSUE verdict.
+Before scoring an idea PURSUE on demand grounds, confirm:
+  1. Lane check: at least top-2 incumbents directly probed on pricing (see competitor-teardown).
+  2. Crowding check: count active startups on the same mandate (cap open-lane at 3 if >3).
+  3. Drag check: score the regulatory-drag dimension before committing to demand research
+     (aged-care/AML/financial-services drag is often disqualifying; discover it cheaply first).
+Report demand score and lane status as separate outputs so the orchestrator can PARK on
+lane grounds without re-running the full demand analysis.
```

**Why it clears the bar:** asleep-incumbent (demand 4/5 accurate; lane later found narrowing), [venture-removed] (demand strong; correctly lower priority on drag + moat), aml-tranche2 (demand strong; PARKed on crowding + drag). n≥3. This is structural — the skill currently surfaces demand signals in isolation; pairing demand with a mandatory lane check prevents the most common G0 overconfidence pattern.

---

## Summary table

| # | Skill | Type | Bar status | Recommendation |
|---|-------|------|-----------|----------------|
| 1 | competitor-teardown | Pricing-probe rule | n=2 — READY | Apply (human approval) |
| 2 | opportunity-scoring | Open-lane cap + crowding check | n=3 — READY | Apply (human approval) |
| 3 | market-sizing | Denominator sourcing rule | n=3 — READY | Apply (human approval) |
| 4 | research-verification | Lane claim as G2 blocker | n=1 — hold | Ledger only; promote after n≥3 |
| 5 | demand-signals | Demand ≠ opportunity check | n=3 — READY | Apply (human approval) |

**4 of 5 proposals clear or approach the n≥3 bar. Proposals #2, #3, and #5 are the highest-impact — they address the root cause (score propagates on unverified lane + unsourced denominator) rather than the symptom.**
