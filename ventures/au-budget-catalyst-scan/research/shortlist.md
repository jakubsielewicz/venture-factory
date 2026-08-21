# Shortlist — au-budget-catalyst-scan (G0 discovery)

**Mode:** discovery sweep over recent/upcoming AU federal budget measures, hunting for a venture opportunity that fits the operator profile (enterprise/solution architecture, AI-agentic builds, data-pipeline engineering, AU regulated-industry aged/health-care domain knowledge, reusable "Remediant" entity-resolution + report-generation pipeline; ≤AUD $5,000 capital, 10–15 hrs/week, AU-first; no licensure the operator lacks, no inventory, no face-to-face delivery).

**Primary source anchor:** the Federal Budget 2026–27 was delivered **Tuesday 12 May 2026** (budget.gov.au homepage, retrieved 2026-07-21: "The Treasurer delivered the Federal Budget on Tuesday 12 May 2026"). No newer MYEFO has been delivered since (the next MYEFO is expected ~December 2026, after this scan's date). All measures below are cited to budget.gov.au theme pages fetched 2026-07-21, cross-checked against ministerial/news sources.

**Signal-harvest note (per orchestrator's harvest):** `harvest_signals.py` on the generic seed theme "AU federal budget 2026 measures" returned 1 low-relevance GitHub item and HN skipped (network `URLError`). `hot_threads.py` returned verdict **SPARSE (DEGRADED)** — Reddit collector unreachable (`HTTPError`), 0 recent threads with tell, explicit instruction to **not read this as absence**. This generic-theme harvest is uninformative by design (a discovery sweep across many candidate sub-themes doesn't harvest cleanly on one seed phrase); per-candidate demand evidence below was gathered via direct primary-source fetch + search-proxy (DuckDuckGo HTML + Google Autocomplete via curl, since this session's toolset had no native WebSearch/WebFetch — see methodology note in `conviction-signal.md`).

---

## Candidates (ranked)

### 1. NDIS Provider Compliance & Audit-Readiness Intelligence — WINNER, advanced
**Measure:** Budget 2026–27, "Securing the NDIS for future generations" (budget.gov.au/content/05-care-and-opportunity.htm, 12 May 2026) — four-pillar NDIS reform: commissioned plan management/support coordination; standardised evidence-based functional-capacity assessments as the access gate; tightened plan-reassessment criteria; **"increase oversight of providers and payments, strengthen the National Disability Insurance Agency's investigative and enforcement capabilities, and introduce new regulatory controls to protect participants and the NDIS from exploitation."** Reforms are costed to **save $37.8 billion over four years**.
**Dated signals:**
- ABC News, "NDIS fraud crackdown will flip rules on their head for 'let it rip' provider market," Jake Evans, senior political correspondent, **24 Apr 2026** — pre-budget reporting on Minister Mark Butler's reforms: NDIA estimates 6–10% of payments (**$2.8bn–$4.6bn/year**) lost to fraud/inflated invoices/ineligible payments; "claims must be proven before they are paid," most providers must newly prove skills/business practices; legislation flagged for May 2026 (https://www.abc.net.au/news/2026-04-24/ndis-provider-fraud-crackdown-rules/106595902).
- NDIS Quality and Safeguards Commission, media release "Jail time imposed as Government cracks down on NDIS fraud" (official primary source, https://www.ndiscommission.gov.au/media-centre/jail-time-imposed-government-cracks-down-ndis-fraud).
- ClinicComply (existing SaaS competitor), blog "NDIS Fraud 2026: $86M Blocked, 2,500 Providers Disrupted," **10 Mar 2026** — Fraud Fusion Taskforce disrupted 2,500+ providers, blocked $86M, 635 active investigations, NDIA reviews 20,000 high-risk claims/month; mandatory SIL/platform-provider registration from **1 Jul 2026**; first wave of 5-year Worker Screening Checks began expiring **Feb 2026**; QIP exits NDIS auditing **30 Apr 2026** (https://www.cliniccomply.com.au/blog/ndis-fraud-crackdown-2026-compliance-guide) — a live, paid ($99–349/mo) competitor already monetising this exact pain, itself evidence of WTP.
- Google Autocomplete (AU), 2026-07-21: "ndis compliance software," "ndis compliance management system," "ndis worker screening check renewal," "ndis audit ready," "ndis audit preparation" — genuine, specific search demand.

**Why it wins:** the only candidate with (a) a specific, dated, primary-sourced budget catalyst; (b) independent mainstream-media corroboration; (c) a live paying competitor proving WTP; (d) a genuine data-pipeline/entity-resolution wedge (bulk worker-screening-status verification, provider-registration-status tracking, audit-evidence-on-demand) distinct from the incumbent's template/checklist model; (e) a buyer (NDIS registered providers — allied health, SIL, platform providers) that is **not** the same financially-collapsing residential-aged-care buyer already PARKed twice in this portfolio (`support-at-home-claims` and a prior, since-removed aged-care venture).

---

### 2. Aged-care capital-subsidy & Accommodation Supplement navigation — PARKED, not advanced (same buyer already PARKed)
**Measure:** "Better care for older Australians" ($3.7bn total): $1.7bn to incentivise ~5,000 new beds/year including $606.5m in new capital subsidies for providers who build/expand; $1.1bn provisioned to restructure the Accommodation Supplement + new payment for homes >60% low-means residents; $565.1m for "sector quality, safety and viability" (budget.gov.au/content/05-care-and-opportunity.htm, 12 May 2026).
**Dated signals:** same budget page (12 May 2026); no independent outreach/forum evidence gathered this pass.
**Why parked:** this is a genuinely new funding stream (subsidy/grant navigation, not claims-leakage or pricing benchmarking — a different pain shape from the two prior PARKs), and the task brief explicitly allows re-entry "if the budget measure genuinely changes the buyer's funding position." A $3.7bn injection targeted at viability is material — **this is the strongest re-entry candidate for a future pass**, but it still sells into the same StewartBrown-documented, 61%-loss-making residential aged-care buyer that sank a prior, since-removed aged-care venture (PARK, 56/100) and contributed to `support-at-home-claims` (PARK, 49/100) on WTP-friction grounds. Advancing it this pass would have re-prosecuted that exact buyer without new WTP evidence — out of scope for a single well-scoped pass. Flagged as a **named G1 unknown for a future venture**, not scored here.

---

### 3. National care-worker screening harmonisation registry — PARKED, weaker fit
**Measure:** "Building a Single National Market," productivity theme — "further improving labour mobility through national occupational licensing... enable a national approach to screening care workers" (budget.gov.au/content/03-productivity.htm, 12 May 2026).
**Dated signals:** same budget page (12 May 2026); a DuckDuckGo search for corroborating trade-press coverage returned no results this session (rate-limited after ~10 queries — see methodology note) — **unconfirmed by a second source**, and no announced start date or funding line found (unlike Candidate 1, which has a specific $ figure and legislative timeline).
**Why parked:** thin — one-sentence budget mention, no second source, no date, no $ figure. Overlaps with Candidate 1's worker-screening angle but is broader (aged care + disability + other care workers) and vaguer (a stated policy direction, not a funded, scoped measure). Worth a dedicated G0 pass once implementation detail exists (a Bill, a start date, a named agency) rather than folding into Candidate 1 on a guess.

---

### 4. Productivity Commission "reducing red tape" — financial-sector compliance cost cut — KILLED, wrong-direction signal
**Measure:** "reducing financial sector compliance costs by $780 million a year by progressing 14 legislative reforms, including increasing company reporting thresholds. Financial regulators are also taking 13 actions to streamline their data collections" (budget.gov.au/content/03-productivity.htm, 12 May 2026).
**Why killed:** this measure *reduces* the population of businesses that must comply with something (higher reporting thresholds = fewer small companies caught by reporting obligations) and *simplifies* regulator data collection — it shrinks the addressable pain rather than creating it. A compliance-automation product sells into growing obligation, not shrinking obligation. No demand signal chased.

---

### 5. Accelerating approvals (environmental / foreign investment / resources / telecom) — KILLED, poor operator fit
**Measure:** "accelerating environmental, low-risk foreign investment, resources and telecommunications approvals... more than $500 million to implement approval reforms that deploy AI, cut duplication with states and fund more bioregional plans and strategic assessments" (budget.gov.au/content/03-productivity.htm, 12 May 2026).
**Why killed:** real, dated, funded catalyst, but the buyer (project developers, FIRB advisors, environmental consultancies) sits outside the operator's aged/health-care regulated-industry domain knowledge, and the government itself is deploying the AI/automation ("Government... advancing use of AI in government, including to accelerate environmental and medicine approvals") — a direct signal the wedge is being closed by the regulator, not opened for a third party. No demand signal chased; rejected on fit + why-now direction, not scored.

---

## Advancing
**Candidate 1 (NDIS Provider Compliance & Audit-Readiness Intelligence)** is carried forward to `conviction-signal.md`, `phase0/` demand routing, and `opportunity-score.md`.
