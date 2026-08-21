# Opportunity Score — au-budget-catalyst-scan (candidate: NDIS Provider Compliance & Audit-Readiness Intelligence)

**Idea under test:** A registry-grounded compliance-intelligence product for NDIS registered (and registering) providers — automated, evidence-backed tracking of worker-screening-check currency, provider-registration status, and audit-readiness documentation against the NDIS Practice Standards and the newly-tightened NDIS Commission enforcement regime, differentiated from checklist/template SaaS by pulling verification directly from government registry data (entity-resolution across worker/provider identities) rather than relying on self-reported manual entry.
**Scored:** 2026-07-21
**Conviction gate:** `research/conviction-signal.md` — **WEAK** (score 38/100). Per the standard `opportunity-scout` procedure a WEAK routes to PARK on signal grounds before sizing; this workup is produced anyway per this session's explicit brief and this portfolio's established convention (`au-deriv-tax`, `support-at-home-claims`) of completing the full scorecard so the G1 unknowns are load-bearing even under a PARK. **Read the verdict below as informed by a WEAK conviction gate, not an independent green light.**

---

## Load-bearing claim verification

| # | Claim | Verdict | Evidence |
|---|---|---|---|
| a | Budget 2026–27 commits new, enforceable NDIS provider-oversight and anti-fraud measures | **VERIFIED — primary source** | budget.gov.au, "Strengthening care and broadening opportunity" — "increase oversight of providers and payments, strengthen the National Disability Insurance Agency's investigative and enforcement capabilities, and introduce new regulatory controls"; $37.8bn savings over 4 years. Delivered 12 May 2026. https://budget.gov.au/content/05-care-and-opportunity.htm (fetched 2026-07-21) |
| b | Mandatory registration is being extended to previously-unregistered provider categories, with an audit requirement | **VERIFIED — pre-budget ministerial detail, dated** | ABC News, 24 Apr 2026: "New requirements for mandatory registration of businesses providing support workers, daily living supports, personal supports and other higher risk activities... Registering requires providers to pass an audit showing they meet a series of standards, including that they have acceptable procedures to manage incidents and complaints, suitable qualifications, conflict of interest policies, and can reliably provide day-to-day operations." https://www.abc.net.au/news/2026-04-24/ndis-provider-fraud-crackdown-rules/106595902 |
| c | An existing paid competitor already sells compliance software touching this exact pain | **VERIFIED** | ClinicComply, live product, $99–349 AUD/mo, 30-day free trial, blog dated 10 Mar 2026 covering the exact fraud-crackdown/worker-screening/registration timeline. https://www.cliniccomply.com.au/blog/ndis-fraud-crackdown-2026-compliance-guide, https://www.cliniccomply.com.au/pricing (fetched 2026-07-21) |
| d | Third-party bulk/API access to NDIS Worker Screening Database / Provider Register exists (the core technical differentiator) | **UNVERIFIED — the weakest claim, flagged explicitly** | Two direct fetch attempts to plausible NDIS open-data URLs returned HTTP 404 and 403 this session; a follow-up search was blocked by a search-proxy rate limit before a second attempt could run. **Verdict: unresolved, not assumed either way — resolve at G1 by contacting the NDIS Quality and Safeguards Commission directly.** |
| e | Total addressable NDIS provider population, by segment (registered vs. unregistered; size band) | **UNSOURCED — a sizing risk, not a base case** | No named source (NDIS Commission, NDIA quarterly report, AIHW) for a current registered-provider count was obtained this session (search rate-limited; two direct data-portal fetches failed). Only a partial, indirect figure was found: "more than 1,400 plan managers" (a different, shrinking sub-segment being replaced by an approved panel, not the general provider population) and total scheme spend of ~$50bn/year. **Per the market-sizing rule, this must be flagged as a G1 blocker, not estimated as a base case.** |

---

## Six hard gates (pass/fail, operator's constraints)

| Gate | Verdict | Reason |
|---|---|---|
| Launchable within ≤90 days at 10–15 hrs/week | **CONDITIONAL / UNVERIFIED** | If claim (d) resolves favourably (registry access exists), a thin-slice MVP (worker-screening-expiry tracking + registration-status dashboard, reusing the Remediant entity-resolution/report pipeline) is plausibly launchable in 90 days solo. If (d) resolves unfavourably, the product degrades to manual-entry tracking — buildable in 90 days but with materially weaker defensibility (see below). Gate outcome is contingent on a single unresolved fact. |
| Total build-to-first-revenue capital ≤AUD $5,000, itemised | **PASS** | Hosting/infra ~$50–150/mo, LLM/API costs ~$100–300/mo, ABN/business admin/insurance ~$500–1,000 one-off, pipeline reuse = ~$0 marginal build cost. Estimated ≈$1,500–3,000 to a first pilot — consistent with the equivalent estimate in `support-at-home-claims` and a prior, since-removed aged-care venture, which used the same reusable pipeline. |
| Evidence of existing spend or acute pain (not just plausible pain) | **PARTIAL PASS** | Acute pain is real and dated (fraud crackdown, mandatory registration audit, worker-screening renewal wave) and one adjacent competitor is already being paid for compliance software touching this space (ClinicComply). Held to partial because no first-person NDIS-provider pain quote or evidence of a provider specifically paying for *this* differentiator (registry verification, not template compliance) was obtained — the conviction gate's core weakness (WEAK, 38/100). |
| A reachable, nameable first-10-customers channel | **UNVERIFIED** | NDIS registered providers are nameable in principle (NDIS Commission's public provider register, once a source for it is confirmed), but no specific channel (association, LinkedIn group, conference, forum) was identified or evidenced as accessible to the operator this session — this mirrors the exact gap flagged as a FAIL in `support-at-home-claims`. Resolve via the direct-outreach kill test named in `conviction-signal.md`. |
| Defensibility beyond "we use AI" (a real moat mechanism) | **CONDITIONAL** | If registry/API access is confirmed (claim d), the moat is real and specific: automated, government-source-verified compliance status beats ClinicComply's self-reported/manual-entry model on trust and reduces the provider's own audit-evidence burden — a genuine technical differentiation, not a positioning label. If registry access does not exist, this collapses to "another compliance checklist SaaS" against a funded, already-live, multi-framework incumbent — the exact "generic wrapper on a crowded space" anti-pattern the operator's brief instructs to reject on sight. **This single unresolved fact is the entire hinge of the idea's defensibility.** |
| A real why-now catalyst (not evergreen pain repackaged as urgent) | **PASS** | Four independently dated, verified events in a five-month window: Worker Screening Check expiries begin (Feb 2026), ClinicComply publishes on it (10 Mar 2026), ABC reports ministerial detail (24 Apr 2026), QIP exits NDIS auditing (30 Apr 2026), Budget confirms the $37.8bn reform package (12 May 2026), mandatory SIL/platform registration takes effect (1 Jul 2026). This is a genuinely live, multi-stage regulatory rollout — the strongest why-now signal found in this sweep (see `shortlist.md` for the rejected alternatives). |

**Score: 2/6 clear passes (capital, why-now), 2/6 partial, 2/6 conditional-on-one-unresolved-fact.**

---

## Market Sizing (bottom-up)

| Input | Value | Source |
|---|---|---|
| Total NDIS scheme cost | ~$50 billion/year | ABC News, 24 Apr 2026 (Minister Butler, National Press Club), citing the scheme's "ballooning costs" |
| NDIS reform savings target | $37.8 billion over 4 years | budget.gov.au, Care and opportunity theme, 12 May 2026 |
| Current plan-manager market (a distinct, shrinking sub-segment, NOT the general provider base) | >1,400 plan managers, to be replaced by an approved panel | ABC News, 24 Apr 2026 |
| Total registered NDIS provider population | **UNSOURCED — RISK, not a base case** | No named source obtained this session (NDIS Commission provider-register count, AIHW, or NDIA quarterly report). Two direct fetch attempts to plausible NDIS open-data URLs failed (404, 403); follow-up search was rate-limited. **This must be resolved at G1 before any ARR projection is defensible** — this is the identical sizing gap that forced `support-at-home-claims` to flag its ICP segment size as an unsourced risk rather than a base case. |
| Illustrative SOM | **NOT COMPUTED** | Per the market-sizing rule, no bottom-up SOM/SAM/TAM figure is produced without a sourced provider-count denominator — producing one from memory would be exactly the "invented budget line item" / fabricated-figure failure mode this task explicitly instructs against. This is reported as a gap, not papered over with an illustrative placeholder. |
| Adjacent price anchor | ClinicComply $99–349 AUD/mo (10-framework general compliance platform, of which NDIS Practice Standards is one) | cliniccomply.com.au/pricing, fetched 2026-07-21 — an adjacent, not exact-match, anchor |

**Is the obtainable slice worth the build?** Cannot be answered honestly without the provider-count denominator. This is itself informative: a candidate this promising on catalyst evidence and this under-sized on market data is exactly what G1 exists to resolve, not something to guess through at G0.

---

## Competitor Teardown

See `research/phase0/competitors.csv` for the structured version. Summary:

| Competitor | Positioning | Pricing | Registry-verification (this idea's differentiator) | Gaps / notes |
|---|---|---|---|---|
| **ClinicComply** | 10-framework general AU healthcare-compliance SaaS (RACGP, Privacy Act/NDB, AGPAL, My Health Record, NDIS Practice Standards among them) — policy templates, evidence library, live self-reported compliance scoring, expiry-reminder notifications | $99–349/mo AUD, 30-day free trial (cliniccomply.com.au/pricing, 2026-07-21) | **No** — verification is user-entered/document-upload, not a government-registry data pull, per its own published feature list | Real, funded, already producing SEO content on this exact budget measure — the single strongest disconfirming signal in this pass. Not NDIS-exclusive (a 1-of-10-frameworks product), which is both a weakness (not NDIS-deep) and a threat (well-capitalised, broad distribution) |
| **General NDIS practice-management platforms (Lumary, SupportAbility, Brevity — named in search results)** | Scheduling/billing/case-notes software for NDIS/allied-health providers | **UNKNOWN — not independently fetched this session** | **UNKNOWN — not independently fetched this session** | Logged as unverified, not assumed as a gap or overlap — flag for G1, do not treat silence as an open lane per the competitor-price-probe convention used elsewhere in this portfolio |
| **NDIS Commission's own verification portals** | Government-run (not a market competitor, but a potential substitute or a blocker) | Free | Unknown whether bulk/delegated access exists (claim d, unresolved) | **The single highest-leverage unresolved fact in this whole pass** — determines both Addressability (conviction gate) and Defensibility (hard-gate table above) |

**Wedge thesis (one sentence, conditional):** *if* the NDIS Worker Screening Database and Provider Register expose any bulk/delegated verification path, there is a real, uncaptured gap — no incumbent found this session sells government-source-verified (not self-reported) NDIS compliance status — but this entire wedge collapses to "another ClinicComply" if that access does not exist.

**Switching cost:** Low-to-moderate, undetermined — depends on whether the product embeds an audit-evidence trail (as ClinicComply already does) or just verification (thinner, easier to churn).

**Platform dependency:** High and unresolved — the core differentiator depends entirely on NDIS Commission data-access policy, a single-point-of-failure the operator does not control and has not yet confirmed exists.

---

## Scorecard

| Dimension | Weight | Score (1–5) | Weighted | Rationale and source |
|---|---|---|---|---|
| Demand and search momentum | 0.25 | 3 | 0.75 | Strongest catalyst in this sweep (5 independent source types, WEAK-but-real conviction gate at 38/100) but no first-person practitioner evidence obtained (`conviction-signal.md`). |
| Monetisation clarity / WTP | 0.20 | 2 | 0.40 | One adjacent (not exact-match) paying competitor proves general willingness to pay for compliance software; zero evidence of WTP for the specific registry-verification differentiator; ABC's affordability-fear finding (small providers/sole traders "cannot afford the process") is a live WTP-friction risk for exactly the segment most affected. |
| Passive-fit: low ongoing ops after build | 0.20 | 2 | 0.40 | Regulatory content (NDIS Practice Standards, registration rules, worker-screening rules) requires ongoing maintenance across an active multi-stage rollout (Feb–Jul 2026 alone had 4 distinct dated changes); if registry integration is confirmed, that integration itself needs maintaining against a government API/portal the operator does not control. |
| Build feasibility (solo/small team) | 0.15 | 2 | 0.30 | **Capped by the single unresolved fact (claim d).** Reusable Remediant pipeline is a genuine asset if registry access exists; if it does not, the MVP is buildable but far less differentiated, closer to a template/checklist product the operator's brief explicitly instructs to reject ("generic AI wrapper... crowded horizontal SaaS without a data/regulatory wedge"). |
| Defensibility / moat potential | 0.10 | 2 | 0.20 | **Capped ≤3 by rule** (competitive lane not confirmed open — ClinicComply is a live, funded incumbent with broader distribution) — actual score below the cap pending claim (d) resolution. |
| Regulatory drag — inverse (5=none) | 0.10 | 2 | 0.20 | Touches NDIS participant/worker personal data (Privacy Act), sits directly adjacent to an active fraud-enforcement regime (must not appear to give compliance/audit advice the product isn't qualified to give), and depends on NDIS Commission policy the operator doesn't control. Comparable regulatory weight to a prior, since-removed aged-care venture's equivalent (also scored 2). |

**Raw sum:** 0.75 + 0.40 + 0.40 + 0.30 + 0.20 + 0.20 = **2.25**
**Score (raw sum × 20):** 2.25 × 20 = **45 / 100**

---

## Verdict: PARK

Score of 45 sits at the very bottom of the PARK band (45–69), consistent with a WEAK (38/100) conviction gate underneath it. This is **not a KILL**: the underlying regulatory catalyst is the most real, most dated, most independently corroborated one found anywhere in this sweep (see `shortlist.md` for the four rejected alternatives), and the operator's reusable pipeline is a genuine conceptual fit. It does not reach PURSUE for one dominant, resolvable reason and two secondary ones:

1. **The idea's entire defensibility, addressability, and differentiation all hinge on one unresolved fact** — whether NDIS Worker Screening Database / Provider Register data is accessible to a third party in bulk. This was not resolved this session (two failed direct fetches, a rate-limited search). Until it resolves, the idea cannot be honestly scored as either a strong PURSUE (differentiated, defensible) or a clean KILL (it might genuinely be buildable and differentiated).
2. **No first-person practitioner pain-thread evidence was obtained** (community/Reddit access was blocked this session, not because the pain doesn't exist) — the conviction gate's WEAK verdict is partly an artefact of this session's tool limitations, not solely of the underlying market. This should be re-run with working search/community access before treating WEAK as final.
3. **A live, funded, broader-distribution competitor (ClinicComply) already occupies adjacent ground**, and the segment most exposed to the new registration-audit requirement (small providers/sole traders) is explicitly flagged in mainstream reporting as potentially unable to afford compliance tooling at all — a real WTP-friction risk on top of the competitive one.

**PARK — not PURSUE, not KILL — because:** the catalyst is real, dated, and well-corroborated (unusually so for this sweep); the gap between PARK and PURSUE is two specific, cheaply resolvable facts (registry access; a first-person pain quote), not a fundamental flaw in the thesis.

### Disqualifier check

| Disqualifier | Status |
|---|---|
| Hard legal block | Not present — compliance-tracking software is not itself a regulated NDIS service; Privacy Act obligations apply and must be designed for; must avoid appearing to give NDIS Practice Standards compliance *advice* the product isn't qualified to give |
| Single-platform dependency | **Present, and load-bearing** — the differentiated version of this product depends entirely on NDIS Commission data-access policy, a single government platform the operator does not control and has not confirmed grants third-party access |
| Zero willingness-to-pay | Not present — ClinicComply proves adjacent WTP exists — but WTP *for this specific differentiator, at this specific price point* is unproven |

The single-platform-dependency disqualifier is present but not automatically fatal per the crew's convention (it is a resolvable G1 unknown, not a confirmed block) — it is, however, the dominant reason this scores PARK rather than PURSUE.

---

## Is this budget measure a genuine catalyst, or noise?

**Genuine catalyst.** Unlike Candidates 2–5 in `shortlist.md` (aged-care funding — same PARKed buyer; worker-screening harmonisation — single-sentence, unconfirmed; red-tape reduction — wrong-direction; approvals acceleration — poor operator fit), the NDIS reform measure clears every bar a "real why-now" needs: a specific dated Budget line ($37.8bn/4yr, 12 May 2026), pre-budget ministerial detail with a named minister and a specific mechanism (ABC, 24 Apr 2026), active enforcement predating and continuing through the Budget (NDIS Commission prosecutions), and — unusually strong corroboration — a live competitor already spending marketing budget against the exact same event. If this sweep is re-run with the two unresolved facts closed, this is the candidate most likely to convert to PURSUE.

---

## Top 3 G1 unknowns

1. **NDIS Worker Screening Database / Provider Register third-party access** — does any bulk, delegated, or API-style verification path exist, or is verification strictly one-at-a-time via a provider's own portal login? This single fact determines Addressability, Defensibility, and whether the product is differentiated or "another ClinicComply." Resolve by contacting the NDIS Quality and Safeguards Commission directly (portal: ndiscommission.gov.au) and/or a data-sharing enquiry to the NDIA.
2. **First-person practitioner pain and willingness-to-pay evidence** — this session could not reach Reddit/forums/Facebook groups (network-blocked) or complete planned follow-up searches (rate-limited). Resolve via the direct-outreach kill test specified in `conviction-signal.md` (10 named mid-size NDIS providers — not sole traders, per the affordability-fear finding — $500-equivalent paid-pilot offer, ≥3/10 threshold) and/or a fresh community-evidence pass once search tooling is available.
3. **Total addressable/registered NDIS provider population and a sourced size-band breakdown** — no figure was obtained this session; without it no ARR projection is defensible (identical gap to `support-at-home-claims`). Resolve via the NDIS Commission's provider register or an NDIA/AIHW quarterly report, with a size-band breakdown if one exists (registered vs. unregistered; SIL vs. other support categories).
