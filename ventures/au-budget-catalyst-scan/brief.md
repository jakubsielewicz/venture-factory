# Venture brief — au-budget-catalyst-scan

> The living source of truth for this venture. **The venture-orchestrator is the sole writer.**
> Specialists propose changes in their own folder; the orchestrator integrates them here.

## One-liner
Registry-verified NDIS provider compliance & audit-readiness intelligence (entity resolution across NDIS Worker Screening/Provider Register data), triggered by the Budget 2026-27 $37.8bn NDIS anti-fraud/registration reform (delivered 12 May 2026) — currently **PARK** (opportunity score 45/100, conviction gate WEAK 38/100).

## Current state
- **Gate:** G0
- **Status:** in-progress (scout pass complete; PARK verdict — see risks before deciding whether to continue to G1)
- **Last updated:** 2026-07-22

## Thesis
The Budget 2026-27 (delivered 12 May 2026, budget.gov.au) funds a $37.8bn/4yr NDIS reform that tightens provider oversight, extends mandatory registration (with a pass/fail audit) to previously-unregistered support-worker categories, and increases NDIA investigative/enforcement capability. Independently, ABC News (24 Apr 2026) reported NDIA estimates of $2.8–4.6bn/year lost to fraud, and a live competitor (ClinicComply) is already running paid content marketing against this exact event. The thesis: NDIS providers need continuous, evidence-backed proof of compliance (worker-screening currency, registration status, audit-readiness documentation), and the operator's reusable "Remediant" entity-resolution + report-generation pipeline could differentiate a product from checklist/template incumbents by verifying status directly against government registry data rather than self-reported entry — **if** that registry data is accessible to a third party (unconfirmed this pass).

## Decisions (dated, append-only)
- 2026-07-21 — Resumed an interrupted G0 pass (venture existed with a filled manifest/template brief but empty `research/`; scout pass had never run) — ran the harvest, then performed the G0 scout discovery procedure directly (see note below), rather than recreating the venture.
- 2026-07-21 — **Process deviation, flagged for the record:** this session's tool grant had no Agent/Task spawn tool and no WebSearch/WebFetch tool, so the orchestrator executed the `opportunity-scout` discovery procedure directly (Bash+curl against primary sources, DuckDuckGo HTML as a WebSearch proxy) rather than delegating to a separate subagent. All gate discipline (writing only to `research/`, not self-approving gates, citing every load-bearing claim) was followed as if the scout had run. Reported to the human for awareness; does not change the gate result.
- 2026-07-21 — Discovery sweep clustered 5 candidate themes from the Budget 2026-27 (shortlist.md); selected **NDIS Provider Compliance & Audit-Readiness Intelligence** as the strongest (best-corroborated catalyst; distinct buyer from the two aged/health-care ventures already PARKed in this portfolio on financially-stressed-buyer grounds). Parked a stronger-funding-but-same-buyer aged-care capital-subsidy candidate explicitly as a future re-entry candidate, not scored this pass.
- 2026-07-21 — Conviction gate scored **WEAK (38/100)**; full opportunity-score workup completed anyway per this session's brief and portfolio convention (`au-deriv-tax`, `support-at-home-claims`) — verdict **PARK (45/100)**.
- 2026-07-22 — Updated `manifest.json` one-liner and `search_theme` to reflect the winning theme (was a generic discovery-sweep placeholder).

## Load-bearing assumptions
- NDIS Worker Screening Database / Provider Register offers some form of third-party bulk/delegated verification access — **UNVERIFIED**. Two direct fetch attempts to plausible NDIS open-data URLs returned HTTP 404/403 this session; this is the single hinge fact for the idea's defensibility and addressability.
- NDIS providers (mid-size, not sole traders) have both the acute pain and the budget to pay for a compliance-intelligence product on top of the new registration-audit cost — **UNVERIFIED at the practitioner level**. ABC News (24 Apr 2026) names an affordability-friction risk for small providers/sole traders specifically.
- Total addressable NDIS registered-provider population and its size-band breakdown — **UNSOURCED**. No figure obtained this session (search tooling was rate-limited before this could be resolved); flagged as a G1 blocker for any ARR projection, not estimated as a base case.
- The Budget 2026-27 measure itself (12 May 2026, $37.8bn/4yr NDIS reform) — **VERIFIED** against budget.gov.au primary source.

## Open risks
- **Registry-access risk (owner: operator, resolve at G1):** if NDIS registry data is not accessible to a third party, this collapses toward "another compliance checklist SaaS" against a funded, already-live competitor (ClinicComply) — the exact generic-wrapper/crowded-space anti-pattern this operator profile is instructed to reject.
- **WTP-friction risk (owner: operator, resolve via outreach kill test):** the buyer segment most exposed to the new mandatory-registration audit is explicitly reported as potentially unable to afford compliance costs at all.
- **Evidentiary-gap risk (owner: operator/orchestrator, methodology):** this session's tooling could not reach Reddit/community forums (network-blocked) and a search proxy rate-limited before two planned follow-up queries could run. The WEAK conviction verdict is partly an artefact of this session's tool limitations, not solely of the underlying market — a re-run with working search/community tooling could plausibly move this to PASS or confirm FAIL.
- **Competitive risk:** ClinicComply is live, funded, priced, and already producing SEO content against this exact budget measure.

## Artifacts by gate
- G0 research/ — `research/shortlist.md` (5 candidates, ranked), `research/conviction-signal.md` (WEAK, 38/100), `research/phase0/` (desk-sizing-lite: `keywords.csv`, `evidence-log.csv`, `competitors.csv`, `summary.csv`, `go-no-go.md` — CONDITIONAL), `research/opportunity-score.md` (PARK, 45/100)
- G1 advisory/, financials/ — not started (G0 verdict is PARK; see Decisions/Open risks before committing G1 spend)
- G3 product/design/ — not started
- G4 product/src/ — not started
- G5 product/tests/ — not started
- G6 runbook.md — not started
