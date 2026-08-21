# Opportunity Score — advantage-zone-sweep (cross-sector G0 discovery)

**Date:** 2026-07-20 · **Author:** opportunity-scout (G0) · **Gate:** G0

Deep-dives on the 3 candidates carried out of the six-hard-gate longlist screen (`research/shortlist.md`)
and scored by `conviction-scoring` (`research/conviction-signal.md`). Per the standard procedure, only a
conviction **PASS** would normally proceed to full sizing/scoring; this sweep's task explicitly asked for a
ranked comparison across all top survivors, so all three are scored here — but the WEAK/FAIL conviction
verdicts for #2 and #3 are the primary, load-bearing reason their scores land in PARK territory, not a
fully-validated business case. Treat #2 and #3 as **PARK-on-signal-grounds carried through for ranking
only**, not as G1-ready theses.

---

## Ranked verdict table

| Rank | Candidate | Conviction | Opportunity score | Verdict |
|---|---|---|---|---|
| 1 | AASB S2 climate-disclosure readiness (Group 2/3 narrow wedge) | PASS (60/100, boundary) | **60/100** | PARK |
| 2 | Franchise Disclosure Register compliance-tracking (non-drafting) | WEAK (38/100) | **65/100** | PARK |
| 3 | Modern Slavery supply-chain risk monitoring | FAIL (29/100) | **62/100** | PARK |

**Nothing in this sweep clears the ≥70 PURSUE bar.** All three land in a tight 60-65 PARK band via
different failure modes: AASB S2 has the strongest demand/WTP but the most severe crowding and the
weakest fit to the operator's stated edge; Franchise Disclosure has the cleanest build-fit and least
crowding but the weakest verified WTP; Modern Slavery is mid-table on paper but has no real why-now
urgency and the worst crowding. This is a genuine, evidence-backed **strengthened PARK across the board**,
not a manufactured PURSUE.

---

## #1 — AASB S2 / ASRS climate-disclosure readiness (Group 2/3 narrow wedge)

**Thesis:** From 1 Jul 2026 (Group 2) and 1 Jul 2027 (Group 3), ~6,000+ AU entities ($50M+ revenue / $25M+
assets / 100+ employees — a population that has never had to do this before) must produce AASB
S2-compliant climate disclosures. A narrow wedge — automated Scope 1 & 2 activity-data collection + an
audit-trail + a compliance-readiness report, explicitly *not* scope 3 or assurance-readiness — sold at a
sub-$5k/yr price point, well under the $15k-60k/yr incumbent SaaS band, to the smallest/most price-sensitive
newly-in-scope entities that established vendors are not optimised to serve.

**Target buyer:** CFO or first-time-hired Sustainability/Climate Disclosure Manager at a $50-150M-revenue AU
entity newly in Group 2/3 scope, with no existing Big4 or ESG-vendor relationship.

**Pain + evidence:**
- *Observed:* Group 2 commences 1 Jul 2026 at $50M rev/$25M assets/100+ staff thresholds (AASB S2 standard,
  aasb.gov.au).
- *Observed:* Active recruiter commentary that "the talent pool... has not kept pace" with demand for AASB
  S2 Reporting Analysts, ESG Data Analysts, Climate Disclosure Managers (Talent Nation, 2026).
- *Observed:* "70% of companies still rely on manual data entry for carbon reporting" and explicit workaround
  language — spreadsheets across "15-20 sites," "chasing managers for information," "panic as the deadline
  approaches" (envirocapture.au, 2026).
- *Observed:* Mid-market purpose-built SaaS priced $15,000-$60,000/yr; Treasury estimates $750k-1.6M for a
  Big4 consulting-led approach at large-org scale (getgreener.webflow.io, 2026, citing Treasury).
- *Inferred:* Group 2/3 entities specifically (as opposed to Group 1, already reporting since Jan 2025) are
  the least experienced and most price-sensitive cohort — not directly evidenced with a Group-2/3-specific
  survey, flag for G1.

**Current alternatives and where they fail:** (a) Big4/Big-consultancy engagements — real but priced for
Group 1-scale entities ($750k-1.6M), inaccessible to a $50-150M-revenue first-time reporter; (b) 11 named
AU-active/global SaaS vendors (Greenbase, Spectreco, kandu.earth, ESGTree, Arbor.eco, Trace, Cority,
Terrascope, Anthesis, eco-shaper, climate-x) — priced $15-60k/yr, full-scope (scope 1-3, scenario analysis,
governance), likely over-built and over-priced for a Group 3 entity that just needs a defensible Scope 1&2
starting point; (c) spreadsheets — the default, explicitly described as failing ("messy," "panic").

**Wedge offer:** "AASB S2 Scope 1&2 Starter Pack" — automated utility-bill/fuel-invoice ingestion, an
audit-trail export, and a board-ready compliance-readiness report. $250-400/mo (~$3,000-4,800/yr), explicitly
positioned as a stepping stone before a full platform, not a competitor to the $15-60k incumbents.

**90-day sketch:** Weeks 1-3 — validate-next outreach (see conviction doc) + confirm emission-factor data
source (National Greenhouse Accounts Factors, published free by DCCEEW) is usable without a paid data
license. Weeks 4-8 — build MVP on the existing Supabase/entity-resolution pipeline pattern: entity intake,
utility-bill OCR/ingestion, NGA-factor-based Scope 1&2 calculation, PDF report generation. Weeks 9-12 — pilot
with 2-3 design partners from the outreach list, iterate, first paid conversion.

**Itemised AUD capital plan (≤$5,000):** Supabase (existing pattern, ~$25/mo × 3mo = $75) · domain +
hosting (~$150) · NGA emission-factor data (free, DCCEEW) · OCR/document-extraction API credits (~$300) ·
LinkedIn Sales Navigator for outreach (~$180/mo × 2mo = $360) · accounting-liability review of report-content
claims by a qualified advisor before first sale (~$1,500-2,500, given the audit-adjacent nature of the
output) · buffer (~$1,000). **Total: ~$3,400-4,400.**

**First-10-customers channel:** LinkedIn direct outreach to named CFOs/finance leads at $50-150M-revenue AU
entities filtered by industry (manufacturing, logistics, mid-cap retail — sectors with concentrated Scope 1&2
footprints) with no visible ESG-vendor case study or Big4 sustainability-practice tag.

**Kill test (<$500, <2 weeks, pre-committed threshold):** 20 LinkedIn/email outreach contacts offering the
Scope 1&2 Starter Pack concept + a 15-minute call. **Pass: ≥3/20 (15%) book a call or ask for pricing within
2 weeks. Fail: <3/20 → kill, do not build.**

**Disconfirming evidence (actively sought, reported even though it hurts the score):**
- The competitive lane is the most crowded found in this entire sweep — 11 named vendors, several
  (Greenbase, kandu, Spectreco) explicitly AU-native and already targeting this exact regulatory hook.
  Nothing here suggests they are ignoring the Group 2/3 segment; several explicitly market "before July
  2026" content aimed at exactly this cohort.
- The full-scope product genuinely requires carbon-accounting domain expertise (emission factors,
  methodology currency, eventual reasonable-assurance readiness from 2030) that is *not* among the
  operator's stated unfair advantages (entity resolution, agentic builds, data pipelines, Supabase) — this
  is a real skills-gap risk, not just a competitive one.
- No prior failed-attempt evidence was found specifically for a narrow Scope-1&2-only wedge — this could
  mean it's a genuine gap, or that no one has found it worth building (a market too small to bother with).
  Unresolved; flagged for G1.

---

## #2 — Franchise Disclosure Register compliance-tracking (non-drafting layer)

**Thesis:** Australia's ~1,100-1,344 franchise systems (2,073 register listings) must confirm/update their
ACCC Franchise Disclosure Register profile annually (14 Nov deadline) and their Disclosure Document annually
(31 Oct deadline), with real, enforced financial penalties (up to $198,000 statutory max; $16,500 penalties
already paid by Cash Converters and MTA, Jun 2025). A deadline-tracking + register-vs-disclosure-document
consistency-check + audit-trail SaaS — explicitly positioned as complementary to, not competing with, the
legal drafting franchisors already buy from firms like Sprintlaw/LegalVision — fills a gap no dedicated
competitor was found occupying.

**Target buyer:** Franchisor compliance/legal-ops lead or CFO at a mid-size (10-100 outlet) Australian
franchise system, particularly one already flagged as "out of date" on the public register.

**Pain + evidence:**
- *Observed:* 24% of register listings (496/2,073) are marked "out of date" (MST Lawyers citing ACCC data,
  2025-26) — a directly measured, population-wide compliance failure, not a hypothetical.
- *Observed:* ACCC issued $16,500 infringement notices to Cash Converters and MTA for register breaches
  (ACCC media release, Jun 2025).
- *Observed:* Sprintlaw sells a fixed-fee "Franchise Disclosure Document Update" service at $650+GST
  (sprintlaw.com.au) — proves real spend on the adjacent compliance task.
- *Inferred, not directly observed:* that franchisors would pay separately for a tracking/monitoring SaaS
  layer on top of what they already buy from their franchise lawyer — this is the load-bearing unknown.

**Current alternatives and where they fail:** (a) Franchise lawyers (Sprintlaw, LegalVision, MST Lawyers,
Bird & Bird) — handle the legal drafting well, but are engaged reactively/annually, not built for continuous
monitoring, register-vs-document consistency checking, or an audit trail a board can review anytime; (b) the
government's own register portal — provides a place to log in and update, but no proactive
deadline-calculation (the "14th day of the 5th month after FY end" rule is genuinely error-prone across
franchisors with non-standard financial years), no benchmarking, no audit trail; (c) spreadsheets/manual
tracking — the presumed default, unevidenced directly for this segment (no forum thread found).

**Wedge offer:** "Disclosure Register Guardian" — automated deadline calculation per franchisor's FY end,
register-vs-FDD consistency checks, an audit-trail export for board papers, and an alert 60/30/7 days before
each deadline. $79-149/mo.

**90-day sketch:** Weeks 1-2 — scrape/structure the public register (2,073 entities, all public) to build
the initial prospect + benchmarking dataset. Weeks 3-6 — build the deadline-calculation engine + alerting +
audit-trail export on the existing Supabase entity-resolution pattern. Weeks 7-10 — outreach to the 496
already-non-compliant entities (highest-intent segment) for design partners. Weeks 11-13 — first paid pilots.

**Itemised AUD capital plan (≤$5,000):** Supabase (~$75 for 3mo) · domain/hosting (~$150) · register
scraping/monitoring infra (~$200) · outreach tooling (~$300) · legal review to confirm the product stays on
the "tracking, not drafting" side of the unlicensed-legal-practice line (~$1,200-1,800, given the app17
precedent in this portfolio) · buffer (~$1,500). **Total: ~$3,400-4,000.**

**First-10-customers channel:** Direct outreach to the 496 publicly-listed "out of date" franchisors — a
uniquely nameable, reachable, pre-qualified (already-non-compliant = highest-intent) list, sourced straight
from the government's own register.

**Kill test (<$500, <2 weeks, pre-committed threshold):** 20 outreach contacts drawn from the "out of date"
list, offering the Guardian concept at $99/mo. **Pass: ≥2/20 (10%) willing to pilot at that price within 2
weeks. Fail: <2/20 → kill, do not build.** (Lower threshold than AASB S2's, reflecting a smaller, less
moneyed buyer pool and lower price point.)

**Disconfirming evidence:**
- The market is small — ~1,100-1,344 total franchise systems, meaning even strong capture rates produce
  modest ARR (illustratively, 20-25 customers at $99-149/mo ≈ $25k-45k ARR over 12-24 months) — this is a
  side-income outcome, not a scalable venture, similar to the ceiling found in `app17-adm-transparency`.
- No direct evidence was found that franchisors *want* a separate tracking tool rather than simply asking
  their existing lawyer to remind them (the lawyer relationship may already functionally serve this need,
  even if imperfectly) — this is the single biggest risk and exactly what the kill test is designed to
  resolve before any build spend.
- The small market size may itself explain the absence of a dedicated competitor (a "too small to bother
  with" gap, not a genuinely defensible one) rather than an overlooked opportunity.

---

## #3 — Modern Slavery supply-chain entity-risk monitoring

**Thesis:** $100M+ revenue AU entities must publish annual Modern Slavery Statements; a 2024 Act review
recommended (not yet legislated) civil penalties. A differentiated wedge — real-time ASIC/court/adverse-media
entity-resolution monitoring of a customer's supplier base, vs. the static self-assessment questionnaires
existing tools mostly offer — sold to procurement/ESG teams.

**Target buyer:** Head of Procurement or ESG/Sustainability Manager at a $100M+ revenue AU entity.

**Pain + evidence:** *Observed:* mandatory statements since 2019 (ag.gov.au); AG Dept agreed in-principle to
civil penalties, consultation through 2025-26, first federal Anti-Slavery Commissioner now appointed
(antislaverycommissioner.gov.au, 2026) — a real but **not-yet-enforced** catalyst. *Observed:* iPRO states its
tools are "used by over 6,000 companies every single day" — real evidence of an active market, though
pricing and whether iPRO's users are paying customers vs. free-tier users is unconfirmed. *Not found despite
direct search:* any buyer-voice complaint, job-market/workaround, or forum-thread evidence — the weakest
frequency signal of the three candidates.

**Current alternatives and where they fail:** iPRO, Walk Free's Benchmarking Tool, KPMG's marketplace
benchmarking tool, and 3+ near-identical "modernslaveryassessment.*" clone sites already occupy this space —
at minimum 4 direct, active competitors, the most crowded field found in the entire sweep on a raw
competitor-count basis.

**Wedge offer, 90-day sketch, capital plan:** Not built out in full — the conviction FAIL (29/100) and the
worst crowding found in the sweep mean this candidate does not warrant the same investment of deep-dive
detail as #1 and #2. Recorded here for ranked comparison only, per this sweep's explicit brief.

**Kill test:** Not recommended for spend. Revisit only if the AG Department's penalty-regime consultation
concludes with a confirmed, dated commencement (which would materially change the why-now catalyst from
"pending" to "enforced").

**Disconfirming evidence:** No penalty regime exists yet (the single biggest weakness — "AVOID" economics on
a hypothetical future penalty is a weak WTP driver per the conviction-scoring anchors' own worked FAIL
example); at least 4 direct competitors already active; no direct buyer-pain evidence found despite two
separate targeted searches (general modern-slavery-tooling search and a job-market-specific search).

---

## Disqualifier check (all 3 candidates)

- **Hard legal block:** None outright, but real regulatory-drag caution on both #1 (AASB S2 — output is
  audit-adjacent, from 2030 requires third-party reasonable assurance) and #2 (Franchise — risk of drifting
  into unlicensed legal practice if the product scope creeps from "tracking" into "drafting/advice," per the
  `app17-adm-transparency` precedent in this portfolio). Neither is an automatic KILL if scoped and framed
  correctly as decision-support/tracking, not advice.
- **Single-platform dependency:** None of the three.
- **Zero willingness-to-pay:** Not triggered for any — all three have at least indirect/adjacent WTP
  evidence — but WTP for the *specific proposed product* (as opposed to an adjacent task) is unverified for
  #2 and weak for #3; this is reflected in their Monetisation sub-scores, not as an automatic disqualifier.

**No automatic-KILL disqualifiers triggered for any of the three; all three are scored PARK on their
merits.**

---

## Top 3 G1 unknowns — for the #1-ranked candidate (AASB S2 narrow wedge)

1. **Real WTP for a narrow, low-cost wedge specifically** — the $3-4.8k/yr Scope 1&2-only offer is
   hypothesised, not evidenced. The kill test above (≥3/20 outreach contacts) must run before any build
   spend; if it fails, this drops directly to KILL given the crowding already documented.
2. **Whether the operator's actual edge (entity resolution, registry pipelines) transfers to carbon
   accounting**, or whether this requires partnering with/hiring carbon-accounting domain expertise the
   operator does not currently have — a genuine build-feasibility risk, not just a competitive one; resolve
   via a technical feasibility spike on NGA-factor-based Scope 1&2 calculation before committing the 90-day
   build window.
3. **True competitive intensity** — direct pricing/positioning probes of the 3 AU-native named competitors
   (Greenbase, Spectreco, kandu.earth) are needed to confirm whether the smallest Group 3 entities are
   genuinely underserved by them or whether the lane is fully closed even at the narrow end (per
   `competitor-teardown`'s rule: no probe = pricing UNKNOWN, not open).

---

## Evidence sources (all cited claims)

1. AASB S2 standard, Group thresholds and commencement dates — [standards.aasb.gov.au/aasb-s2-sep-2024](https://standards.aasb.gov.au/aasb-s2-sep-2024)
2. AASB S2 hiring-shortage commentary — Talent Nation, [talentnation.com.au/aasb-s2-recruitment](https://talentnation.com.au/aasb-s2-recruitment/), 2026
3. Manual-data-entry / spreadsheet-workaround evidence — [envirocapture.au](https://envirocapture.au/scope-1-and-2-emissions-calculation-tool-moving-beyond-spreadsheets-in-2026/), 2026
4. Climate-SaaS pricing band + Treasury Big4-cost estimate — [getgreener.webflow.io/insights/how-much-does-carbon-accounting-software-cost-in-australia-2026-guide](https://getgreener.webflow.io/insights/how-much-does-carbon-accounting-software-cost-in-australia-2026-guide), 2026
5. Named AASB S2 competitor set — Greenbase, Spectreco, kandu.earth, ESGTree, Arbor.eco, Trace (our-trace.com), Cority, Terrascope, Anthesis, eco-shaper, climate-x (respective websites, 2025-26)
6. Franchise disclosure register — ACCC official page, [accc.gov.au/business/industry-codes/franchising-code-of-conduct/franchise-disclosure-register](https://www.accc.gov.au/business/industry-codes/franchising-code-of-conduct/franchise-disclosure-register)
7. ACCC infringement notices (Cash Converters, MTA, $16,500 each) — ACCC media release, Jun 2025, via [claytonutz.com/insights/2025/august/accc-puts-franchisors-on-high-alert-for-franchising-code-breaches](https://www.claytonutz.com/insights/2025/august/accc-puts-franchisors-on-high-alert-for-franchising-code-breaches)
8. 24% out-of-date register listings (496/2,073) — MST Lawyers, [mst.com.au/blog/accc-franchise-register-breach](https://www.mst.com.au/blog/accc-franchise-register-breach/)
9. Sprintlaw FDD update fixed-fee ($650+GST) — [sprintlaw.com.au/franchising/franchise-disclosure-document-update](https://sprintlaw.com.au/franchising/franchise-disclosure-document-update/)
10. Franchise system count (~1,100-1,344) — Franchise Council of Australia / IBISWorld, 2025, via search aggregation — **unverified against a single named primary source, flag for G1**
11. Modern Slavery Act mandatory-reporting status and 2024 review — Attorney-General's Department, [ag.gov.au/crime/modern-slavery/modern-slavery-act](https://www.ag.gov.au/crime/modern-slavery/modern-slavery-act); AICD, [aicd.com.au/regulatory-compliance/government-legislations/modern-slavery-law/modern-slavery-act-review.html](https://www.aicd.com.au/regulatory-compliance/government-legislations/modern-slavery-law/modern-slavery-act-review.html)
12. iPRO modern-slavery tool user base ("6,000+ companies every single day") — [ipro.net.au](https://www.ipro.net.au/)
13. Foreign-buyer established-dwelling ban extension to 30 Jun 2029 — 2026-27 Budget, via [hsfkramer.com/notes/realestateaustralia/2025-posts/firb-update](https://www.hsfkramer.com/notes/realestateaustralia/2025-posts/firb-update)
14. Contractor-prequalification incumbents (Cm3 20,000+ contractor DB) — [cm3.com.au](https://www.cm3.com.au/), [ihseq.com.au](https://www.ihseq.com.au/services/cm3-prequalification/)
15. Strata compliance penalties and incumbents — [strataone.com.au](https://strataone.com.au/strata-compliance-checklist-nsw/), [mrisoftware.com/au/products/strata-master](https://www.mrisoftware.com/au/products/strata-master/), StrataMax (650,000+ lots, [stratamax.com](https://www.stratamax.com/))
16. Lease-abstraction AU incumbent (LeaseInfo, 130+ retailers/landlords) — [leaseinfo.digital](https://leaseinfo.digital/)

Estimates (explicitly flagged, not independently verifiable this pass):
17. AASB S2 "6,000+ entities in scope across three groups" — aggregated via secondary AASB S2 explainer
    articles, no single named Treasury/ASIC primary source confirmed — **RISK, resolve at G1**
18. Illustrative capture-rate/ARR figures for both #1 and #2 (10-25 customers, $25k-45k / $80k-160k ARR
    ranges) — **[estimate, unsourced capture-rate assumption, flagged as G2 blocker per market-sizing rule]**
