# Venture brief — au-deriv-tax

> The living source of truth for this venture. **The venture-orchestrator is the sole writer.**
> Specialists propose changes in their own folder; the orchestrator integrates them here.

## One-liner
Connects to IBKR/Tastytrade to continuously classify every option trade under ATO rules (assignments, exercises, expiries, multi-leg spreads, FX-at-trade-date) and roll it into an accountant-ready report plus ongoing performance analytics for Australian retail derivatives traders.

## Current state
- **Gate:** G0
- **Status:** HOLD (manifest `status: blocked`) — Phase-0 desk-sizing reinforces the prior PARK; not advancing to G1 until the two named re-open conditions are closed
- **Last updated:** 2026-07-21

## Thesis
Active AU retail options/derivatives traders on IBKR/Tastytrade generate trade histories (assignments, exercises, expiries, multi-leg spreads, FX conversion at trade date) that existing consumer tax tools (Sharesight, Navexa, broker-native reports) handle poorly or not at all, forcing traders onto manual spreadsheets or paid accountant time every tax season. If that gap is real and not already closed by an incumbent, and if the software can be positioned as decision-support (not registered tax agent services under TASA), a data-pipeline-heavy SaaS wedge is plausible for an operator with data-engineering and regulated-industry background. Single biggest disqualifier risk: TASA licensure boundary. Single biggest thesis risk: for traders on revenue account, "CGT report" may be the wrong deliverable entirely.

## Decisions (dated, append-only)
- 2026-07-21 — Created venture at G0 from theme "ATO-grade tax and performance engine for Australian derivatives traders" — operator-supplied theme; distinct buyer (discretionary-spending active trader) from prior AU compliance/aged-care ventures which mostly PARKed on financially-stressed buyers.
- 2026-07-21 — G0 opportunity-scout pass complete: conviction gate FAIL (17/100), opportunity score 47/100, verdict PARK. Not advancing to G1 pending a cheap kill test (see below) or human direction otherwise. Gate G0 marked green by `gate.py check` (artifacts exist), which is an artifact-presence gate, not an endorsement of PURSUE — the substantive verdict is PARK.
- 2026-07-21 — **Decision: HOLD at G0** (human operator decision, following the `desk-sizing` skill's Phase-0 pass). Trigger: Phase-0 desk-sizing verdict = CONDITIONAL → HOLD (full workbook + call: `research/phase0/go-no-go.md`, `research/phase0/phase0-sizing.xlsx`, and 5 supporting CSVs). Rationale: the weighted search cluster is ~1,020/mo, inside the conditional band (800-1,500) and below the 1,500 pass bar; the widen-the-wedge fallback (~600/mo) fails its own 3,000/mo rescue bar; community mining found 15 pain threads across 3 communities but they are substantively weak — general IBKR/CGT/FX-reconciliation friction rather than options-assignment-specific pain, the two most options-specific probes (`"wheel tax"`, `"assigned tax"`) returned zero hits everywhere, and nothing is dated 2025-2026. This reinforces, rather than overturns, the prior G0 PARK (conviction FAIL 17/100) — it is not new evidence for GO. What keeps the thesis alive (not a demand signal, a supply-side one): Sharesight's options feature request has sat ~5 years acknowledged-but-unshipped, and AU trader-tax accountants charge up to $6,600/yr for options-involving returns — a strong willingness-to-pay anchor if the demand gap above ever closes. HOLD, not KILL, because the two open gaps below are cheap and could flip the call either way; HOLD, not a silent PARK, because the re-open conditions and their pass/fail thresholds are named explicitly so a future pass doesn't have to re-derive them.
  **Re-open conditions (both must be checked before this venture moves again):**
  1. A **manual, logged-in Reddit search** of the nine pain-terms across the AU finance/options subs (r/AusFinance, r/fiaustralia, r/ASX_Bets, r/AusStocks, r/interactivebrokers, r/thetagang) — Reddit was *unprobed, not empty* this pass (WebFetch cannot reach reddit.com), so it is the single biggest open unknown.
  2. **Verify the Tier-1 keyword cluster in Google Ads Keyword Planner** (no auth available this session). If both come up quiet → move to KILL/PARK. If either materially beats the ~1,000/mo desk estimate → re-open to a proper GO and re-score against the conviction and opportunity-scoring bars.
  No gate advanced, no gate file written, no spend or deploy occurred as part of this decision. `gates/G0-scout.json` and all research artifacts under `research/` (including `research/phase0/`) are left untouched.

## Load-bearing assumptions
- TASA licensure boundary is navigable via a Sharesight-style "software, not advice" framing — PARTIALLY VERIFIED (G0): Navexa/Sharesight precedent confirmed (explicit "not tax advice" disclaimers, no lodgement, hand off to accountant); no blanket software carve-out exists (TPB(I) 39/2023, case-by-case). Verdict: manageable-with-framing, not clear. TPB registration status of Navexa/Sharesight and full text of TPB(GS) 14/2011 still unverified — resolve at G1 if pursued.
- Active options traders have real, currently-paid pain (accountant fees or lost time) around options CGT/assignment/multi-leg/FX complexity — TESTED AT G0, FAILED: conviction score 17/100. Strongest signal is a 21-reply 2021-2022 Sharesight forum thread with one latent-WTP quote; no 2025-2026 or Reddit corroboration found despite direct search of the named channels.
- The correct deliverable is a CGT report, i.e. traders' gains are (at least partly) on capital account rather than revenue/ordinary income account — TESTED AT G0, LIKELY WRONG (thesis-breaker): ATO's TR 97/11 investor-vs-trader test means active, systematic options traders (the named buyer) are plausibly on revenue account, not CGT. A dual-mode CGT+revenue/P&L deliverable is the corrected framing, not a straight CGT report.
- IBKR Flex Queries / API and Tastytrade API give free, programmatic access to the trade data needed — PARTIALLY VERIFIED, WITH A NEGATIVE FINDING: IBKR Flex Query is confirmed free and AU-accessible. Tastytrade has (per a single secondary source, ~26 Jun 2026) suspended new AU account openings and is converting existing AU accounts to closing-only — halves the "IBKR/Tastytrade" pitch and disproportionately hits the multi-leg-seller segment. Needs direct reconfirmation at G1 if pursued.
- No incumbent (Sharesight, Navexa, IBKR's own AU tax reports) already covers options assignments/exercises/multi-leg/FX-at-trade-date adequately — VERIFIED TRUE (G0): confirmed via direct product-doc checks that Sharesight, Navexa, TaxTank, and eSTM do not support derivatives/options beyond manual custom-investment entry. A real functional gap exists — but gap does not equal proven demand (see WTP assumption above).

## Open risks
- TASA registered-tax-agent-services boundary — manageable-with-framing per G0 desk research, but not a professional opinion; a written TPB/lawyer opinion is recommended before any marketing copy ships (owner: domain-advisor, if this venture proceeds to G1).
- Revenue-account vs CGT-account mischaracterisation of the target buyer's own tax position — confirmed as a real thesis risk at G0; the product as pitched (single CGT report) is likely mis-specified (owner: domain-advisor, if this venture proceeds).
- Thin, dated demand signal — conviction gate FAILed (17/100); no 2025-2026 or Reddit corroboration found (owner: opportunity-scout — this G0 pass; resolvable only via the kill test below, not further desk research).
- Tastytrade AU account suspension (single-sourced, ~26 Jun 2026) narrows the addressable population and the most tax-complex user segment — needs direct reconfirmation before any further spend.
- Market sizing has no sourced denominator (no AU-specific IBKR account count or ASX/ASIC retail options-trader count found) — hard G1/G2 blocker if this venture proceeds.

## G0 verdict
**Conviction gate: FAIL (17/100). Opportunity score: 47/100. Verdict: PARK.** Recommended next action if the operator wants to keep this alive: run the pre-committed fake-door kill test (<$500, <2 weeks; pass = ≥30 signups or ≥5 pre-orders across ≥2 channels in 14 days; fail = <10 signups → KILL) on the sharpened wedge (dual-mode CGT+revenue/P&L classifier, "not tax advice" framing, IBKR-only) before committing any G1 spend. Per CLAUDE.md this venture does not proceed to G1 advisory/financial work without either a human decision to override the PARK or new evidence from the kill test — recommend holding at G0 rather than auto-advancing.

## Artifacts by gate
- G0 research/ — ventures/au-deriv-tax/research/
- G1 advisory/, financials/ — ventures/au-deriv-tax/advisory/, ventures/au-deriv-tax/financials/
- G3 product/design/ — ventures/au-deriv-tax/product/design/
- G4 product/src/ — ventures/au-deriv-tax/product/src/
- G5 product/tests/ — ventures/au-deriv-tax/product/tests/
- G6 runbook.md — ventures/au-deriv-tax/runbook.md
