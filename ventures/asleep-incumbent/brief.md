# Venture brief - asleep-incumbent

> Living source of truth. The venture-orchestrator is the sole writer.

## One-liner
A self-serve Safety Management System (SMS) SaaS for small Australian heavy-vehicle operators (1-20 trucks) to meet the HVNL 2026 SMS obligation: form-builder + evidence storage (incidents, pre-starts, fatigue, training) + audit-ready trail + alerts.

## Current state
- **Gate:** G1 validate COMPLETE (green). **PARKED at the G2 HUMAN gate** - see Decision Log below. Not approved to proceed to G3; not killed.
- **Status:** blocked (manifest field; represents PARK - see Decision Log for rationale)
- **Last updated:** 2026-07-21

## Decision Log

### 2026-07-21 - PARK at G2 (trigger: initial market engagement)
**Verdict: PARK.** Do not proceed past G2. Venture is held, not deleted - all G0/G1 research and advisory work below is preserved as-is for a possible re-open.

**Rationale (load-bearing):**
- The venture's entire "why now" demand accelerant was the HVNL SMS obligation commencing **1 Aug 2026 with no grace period** (see Thesis and Decisive risk #3 below).
- The build is estimated at ~8 weeks at 40 hrs/week. At the operator's real available capacity of 10-15 hrs/week, that build lands the product live in **~early 2027** - well after the 1 Aug 2026 deadline.
- The peak-urgency window has effectively closed before build could plausibly start-to-ship in time.
- The go/no-go memo itself (advisory/go-no-go-memo.md) already flagged this exposure: a post-August launch "removes the primary demand accelerant" and pushes break-even out 12-18 months.
- **Initial market engagement** (the operator's first real-world contact with the opportunity, ahead of committing to the two binary GO-IF gates) **confirmed** this timing problem is real and decisive, not merely a theoretical risk - hence PARK rather than proceeding to the lane test / WTP test spend.

**What would need to change to re-open this venture:**
1. **A new why-now catalyst** - e.g. a subsequent HVNL enforcement milestone, audit wave, or amendment that recreates urgency independent of the 1 Aug 2026 date; or evidence that demand persists materially past the deadline (operators still buying post-August because enforcement, not the date itself, is the trigger).
2. **Freed-up build capacity** - the operator (or a delegated builder) having enough sustained hours/week available to plausibly ship an MVP before whatever the next relevant deadline or enforcement milestone is.
3. If either condition is met, re-run the two binary GO-IF gates from the G2 decision package below (ATCC/Kynection lane test; >=5/10-15 WTP interviews at A$79/mo) before re-asking for G2 approval - they were never executed because the timing problem made them moot.

**Preserved, unchanged below:** thesis, G2 decision package, GO-IF gates, verification blockers, spend estimate, decisive risks, and the G0/G1 artifact list all remain as recorded at the time of the G1-to-G2 handoff. Nothing has been altered or deleted; this entry only appends the PARK verdict on top.

## Thesis
HVNL amendments commence 1 Aug 2026; every accredited operator must hold an auditable, OPERATING SMS; CoR penalties up to ~$10k/breach. Incumbents are telematics-tied + enterprise/quote-only; NHVR free PDFs satisfy "documented" but not "operating". Open lane for sub-20-truck operators (found via the asleep-incumbent meta-filter).

## G2 decision package (recommendation: GO-IF)
- **Analyst (G1): FIXABLE.** LTV:CAC 7.9x, payback 5.1mo, GM ~95%, break-even 48 customers. ARR ceiling A$3.6M (3,200 ops) - A$8.1M (7,200 ops); realistic 10% = A$359K-808K. Decisive lever: WTP vs free NHVR PDFs (free-default pessimistic case = A$32-121K ARR, sub-scale).
- **Advisor (G1): GO-IF.** Moat is "defensible-for-now, not durable" - ATCC/Kynection could ship a self-serve tier in <1 quarter; functional moat to 1 Aug 2026 is speed-to-deadline + accruing evidence-trail switching cost. Regulatory path clear (no software-vendor registration found; Privacy Act standard data-processor duties).
- **Verification (pre-G2): CONDITIONAL - 7/22 verified, 3 blockers** (the GO-IF conditions): see below.

### Two binary GO-IF gates (cheap, must clear BEFORE G2 spend)
1. **Lane test:** a direct ATCC/Kynection sales call for a 2-truck scenario confirms NO self-serve SMS at <=A$130/mo. (If a cheap tier exists -> PARK.)
2. **WTP test:** >=5 of 10-15 owner-operator interviews confirm purchase intent at A$79/mo.

### Verification blockers (resolve with the above)
- "No grace period" qualifier - cited secondaries 404'd; confirm from HVNL Bill / NHVR FAQ. (Commencement date 1 Aug 2026 IS verified.)
- Sub-20-truck operator count (3,200-7,200) - the 40-60% split is unsourced; call NHVR (13 6487) or use ABS. All ARR hangs on it.
- ATCC lane (= GO-IF gate 1).

### Spend G2 would authorise
~A$58,720 (build + marketing burst + legal Privacy Policy review + 12mo opex), IF both GO-IF gates pass.

## Decisive risks
1. Lane-closing competitive entry (incumbent ships a cheap self-serve tier) - thin moat.
2. WTP vs free PDFs - positioning task (documented vs operating SMS).
3. **44-day window:** to catch the 1 Aug 2026 urgency, build must start ~23 Jun 2026 with a locked MVP - so the GO-IF checks must happen now; missing the date defers break-even 12-18 months.

## Artifacts by gate
- G0 research/ - opportunity-score.md, shortlist.md (green)
- G1 advisory/ - risk-register.md, go-no-go-memo.md, verification.md ; financials/ - unit-economics.md (green)
- G2 - PARKED 2026-07-21 (see Decision Log). gates/G2-decide.json left "pending" per convention - a PARK is not an "approved" human-gate write, and the model must not edit gate files.
