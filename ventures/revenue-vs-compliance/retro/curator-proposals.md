# Curator proposals — revenue-vs-compliance retro
Date: 2026-06-19  
Proposed by: skill-curator (post G0 experiment)  
Status: AWAITING HUMAN REVIEW — do NOT apply directly to SKILL.md

---

## Proposal 1 — opportunity-scoring SKILL.md: refine the Monetisation / WTP dimension

### Target file
`.claude/skills/opportunity-scoring/SKILL.md`

### Motivation
The revenue-vs-compliance controlled experiment (4-way level-field head-to-head, 2026-06-19) and corroborating evidence across au-sme-compliance, [venture-removed], payday-super, and aml-tranche2 establish that buyer economics is a structural predictor of the WTP sub-score — currently unrepresented in the SKILL.md scoring guidance.

### Proposed diff (changelog format)

**Section: Monetisation / WTP (score 1–5)**

CURRENT guidance (implied): score WTP based on observed pricing signals and buyer willingness to adopt.

PROPOSED addition — scoring anchors by buyer economics:

```
Buyer-economics anchors for the WTP sub-score
──────────────────────────────────────────────
5/5 — SAVE (savings-funded / contingency): buyer pays only from money recovered or
      costs eliminated; zero upfront friction; payment self-liquidates.
      Examples: invoice-audit contingency, expense-reduction % of savings.

4/5 — SAVE with some upfront: savings-funded but with a modest retainer or
      minimum fee; friction exists but value proposition is still self-funding.

3–4/5 — MAKE (revenue-generating): buyer profits directly from winning more
        business, higher prices, or new revenue streams; clear value chain.
        Examples: tender win-rate tool, succession/sale-readiness.

2–3/5 — AVOID (penalty-avoidance, solvent buyer): buyer avoids a fine or liability;
        willing to pay but price-sensitive; cap at 3 only if penalties are
        demonstrably severe (>$50k) AND the buyer is verifiably solvent/insured.

1–2/5 — AVOID (penalty-avoidance, cost-stressed buyer): buyer is loss-making,
        cash-constrained, or in a sector where free government templates satisfy
        the compliance obligation. Default ceiling for SME compliance mandates
        unless evidence of solvency or severe penalty.
```

**Flag to add in scoring instructions:**

> When the WTP sub-score drives the overall PURSUE/PARK verdict, note the buyer
> economics class (SAVE / MAKE / AVOID) explicitly in the scorecard row.

### Evidence bar status

| Claim | N | Bar status |
|-------|---|------------|
| AVOID compliance carries structural WTP ceiling (price pressure toward free govt templates, 1–2/5 default) | n≥4 (au-sme-compliance, [venture-removed], payday-super, aml-tranche2) | **CLEARED — n≥3 bar met. Ready for human approval.** |
| Full ranked ordering SAVE > MAKE > AVOID on WTP sub-score | n=1 (revenue-vs-compliance controlled experiment) | HOLD — corroborate across ≥2 more ventures before hardening anchors for SAVE and MAKE bands. |

### Recommended action for reviewer
- Approve and apply the **AVOID ceiling** anchor (1–2/5 default for SME compliance mandate) — n≥3 evidence clears the bar.
- Hold the full SAVE/MAKE numeric anchors (4–5 and 3–4 bands) for one further corroborating venture before locking them in.
- The buyer-economics label (SAVE/MAKE/AVOID) should be required in every scorecard regardless — zero evidence cost, high diagnostic value.

---

## Proposal 2 — opportunity-scoring SKILL.md: add controlled experiment as a scouting mode (process note)

### Target file
`.claude/skills/opportunity-scoring/SKILL.md`

### Motivation
The revenue-vs-compliance venture demonstrated that deliberate head-to-head experiments (holding the scoring formula, scout, and date constant while varying the thesis variable) produce structural learning that single-candidate passes cannot. This is a process improvement worth encoding.

### Proposed addition (brief, in the "Scouting modes" or equivalent section)

```
Controlled head-to-head experiment mode
────────────────────────────────────────
When the scout has a directional hypothesis (e.g. "revenue buyers out-score
compliance buyers"), run ≥3 candidates in a single sweep under the same
formula, date, and scorer — one as the control, others as treatments.
This surfaces structural signal about dimensions (e.g. buyer economics → WTP)
that is invisible in single-candidate passes and directly validates or falsifies
the hypothesis in one session.

Use this mode at the start of a new theme sweep when the hypothesis is about
a scoring dimension rather than a specific niche.
```

### Evidence bar status
n=1 (revenue-vs-compliance). **HOLD — recommend repeating before encoding as standard procedure.** Ledger entry already appended (opportunity-scoring/knowledge/ledger.md, 2026-06-19).

---

## Ledger entries written (no approval needed — append-only)

The following entries have already been appended by the curator:

1. `opportunity-scoring/knowledge/ledger.md` — buyer-economics WTP heuristic (2026-06-19), compliance-WTP-ceiling n≥4, controlled-ranking n=1; plus controlled-experiment process note.
2. `demand-signals/knowledge/ledger.md` — pair demand signal with buyer-economics read (SAVE/MAKE/AVOID flag); compliance-WTP-ceiling cross-reference (n≥3 cleared).
