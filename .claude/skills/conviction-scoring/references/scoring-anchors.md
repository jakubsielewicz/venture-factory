# Conviction scoring — 1–5 anchors, worked examples, artifact template

`score = round((F × I × W × A) / 6.25)` → 0–100. Bands: ≥60 PASS · 35–59 WEAK · <35 FAIL.
Hard rule: any factor = 1 ⇒ cannot PASS regardless of product.

## Factor anchors
**Frequency** (independent sources showing the same pain)
- 1 = one loud thread / single source. 3 = recurs across 2–3 independent sources.
- 5 = recurs across 4+ independent source *types* (e.g. reviews + jobs + HN + a marketplace).

**Intensity** (emotional load / quantified cost)
- 1 = mild preference ("would be nice"). 3 = clear frustration.
- 5 = quantified pain + a built workaround ("we spend ~6h/week; I built a spreadsheet/script to cope").

**WTP — willingness to pay**
- 1 = no payment evidence / expects free. 3 = pays for an adjacent tool, or says "I'd pay".
- 5 = already pays a freelancer/tool for this exact task (price point visible).

**Addressability** (solo/small-team, low-ops feasibility)
- 1 = needs enterprise sales / heavy ongoing ops / regulated build. 3 = doable with moderate ops.
- 5 = clear thin-slice MVP a solo/small team ships and runs low-touch.

## Worked examples
- F4·I5·W5·A4 = 400 → 64 → **PASS**. Recurs across reviews+jobs+HN, quantified pain + workaround,
  already paying a freelancer, clean SaaS slice. Validate next.
- F5·I4·W2·A4 = 160 → 26 → **FAIL**. Loud, frustrated, feasible — but no WTP (compliance "AVOID"
  economics, expects a free gov template). Missing bar; do not advance on demand alone.
- F2·I5·W4·A3 = 120 → 19 → **FAIL** (also F=2 is weak). One intense source ≠ a market.
- F4·I3·W3·A1 = 36 → 6 → **FAIL** by hard rule (A=1: not addressable by a small team).

## Artifact template — ventures/<slug>/research/conviction-signal.md
```
# Conviction signal — <slug>

## Signal inventory
| tier | signal (excerpt) | dated source | engagement | tell |
|---|---|---|---|---|
| ... | ... | ... | ... | ... |

Trend trajectory: <growing/flat/declining + seasonality>

## Conviction scorecard
| candidate pain | F | I | W | A | product | score | verdict |
|---|---|---|---|---|---|---|---|
| ... | 4 | 5 | 5 | 4 | 400 | 64 | PASS |
(each score cites a signal row above)

## Verdict: PASS | WEAK | FAIL
<one paragraph: why, and the load-bearing evidence>

## Validate next (before building)
1. <pain> — <fake-door landing page | outreach to N prospects> — success metric: <e.g. ≥X signups / ≥Y replies>

## Handoff to opportunity-scoring
Demand: <one line, cited>. WTP: <one line, cited>.
```
