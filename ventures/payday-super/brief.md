# Venture brief - payday-super

> Living source of truth. The venture-orchestrator is the sole writer.

## One-liner
A cross-platform Payday Super assurance layer for AU bookkeeping/payroll bureaus: one risk view of SG shortfalls / late or failed payments across many clients on mixed payroll platforms (Xero, MYOB, Employment Hero, Reckon).

## Current state
- **Gate:** G0 scout COMPLETE (green). Verdict PARK (56/100). Human go/park decision before G1.
- **Status:** in-progress (recommendation: PARK)
- **Last updated:** 2026-06-18

## Thesis
Forcing function is confirmed law: Treasury Laws Amendment (Payday Superannuation) Act 2025 (Royal Assent 6 Nov 2025); from 1 Jul 2026 SG must be paid each payday; penalties up to 200% of the SG charge + 60% uplift, no late-offset. Payroll platforms build it natively but only in-ecosystem - a bureau managing 80 clients across mixed platforms still has no single cross-client risk view. The wedge is that cross-platform assurance for bureaus.

## G0 verdict
**PARK - 56/100.** Real, imminent forcing function but a serious platform-risk headwind: the wedge survives only while no single platform consolidates the market, and SOM is modest (~$478K/yr at base). WTP on top of free native tooling is the load-bearing unknown.

## Load-bearing evidence (verify at G1)
- Forcing function: Payday Super Act 2025, Royal Assent 6 Nov 2025; start 1 Jul 2026; penalties to 200% SG charge + 60% uplift (Alvarez & Marsal Nov 2025; RSM Oct 2025; ATO PCG 2026/1). [verify]
- Wedge: native tooling is in-ecosystem only; cross-client/cross-platform mismatches need manual spreadsheets at volume (invoicedataextraction.com, Jun 2026). Platform-risk headwind explicit.
- Market: ~994k employing businesses (ABS Jun 2025); ~40-50% use external bookkeepers; SOM ~$478K/yr (200 practices x $199/mo).

## Open risks / G1 unknowns
1. Platform-risk verdict: does Employment Hero's bureau dashboard already cover cross-platform (Xero/MYOB) clients? If yes -> KILL. Demo EH/Xero/MYOB partner tooling before any spend.
2. WTP: will bureaus pay ~$149-249/mo for assurance on top of near-free native tooling? Need >=5 confirmed yes of 10-15 interviews.
3. Legal framing: do outputs ("Employer X will miss the window / has a $2,400 shortfall") edge into BAS/tax-agent-registered territory? Written legal opinion before G1 closes.

## Regulated-domain flag (for domain-advisor)
Superannuation / ATO-reporting adjacent. Not financial advice, but close enough to BAS-agent work that a scoped AU legal opinion is mandatory at G1. Decision-support only.

## Artifacts by gate
- G0 research/ - opportunity-score.md, shortlist.md (green)
- G1 - on hold pending human go/park
