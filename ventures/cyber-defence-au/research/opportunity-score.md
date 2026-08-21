# Opportunity Score — AU SME Cyber-Defence / Essential Eight Compliance
**Venture:** cyber-defence-au
**Idea:** Low-touch cybersecurity software/service helping AU SMEs meet baseline Essential-Eight-aligned cyber-defence expectations
**Date:** 2026-07-20
**Author:** opportunity-scout (G0)
**Gate:** G0

---

## Inputs

- Conviction gate: **PASS** (score 64/100) — `research/conviction-signal.md`
- Market sizing: `research/market-sizing.md` — SAM ~300,000 businesses (ABS, 5-199 employees); conservative operative SOM ~$107k ARR (RISK-flagged, unsourced capture-rate assumption), base case ~$358k ARR
- Competitor teardown: `research/competitor-landscape.md` — Cynch Security (direct, $149-799/mo, 2,000+ customers, 9 years operating), vCISO firms ($3,500-$12,000/mo), fragmented MSP "Essential Eight as a Service" field (pricing UNKNOWN, >3 named players), free government alternatives (Cyber Wardens, ACSC health checks)

---

## Opportunity Scorecard

| Dimension | Weight | Score (1-5) | Weighted | Confidence flag |
|---|---|---|---|---|
| Demand & search momentum | 0.25 | 4 | 1.00 | Institutional/regulatory sources strong and dated; no live search-volume/community-chatter data obtained (harvester unavailable, no forum threads found) |
| Monetisation clarity / willingness-to-pay | 0.20 | 4 | 0.80 | Strong direct evidence (Cynch's 2,000+ paying customers), but 48% of AU SMEs spend <$500/yr — budget fit is real for a subset, not the whole stated ICP |
| Passive-fit: low ongoing ops after build | 0.20 | 3 | 0.60 | Cloud-native/agentless architecture is achievable (Cynch proves it), but Essential-Eight content must stay current with ASD guidance and security-adjacent support/liability load is real |
| Build feasibility for a solo/small team | 0.15 | 3 | 0.45 | M365/Google Graph API integrations are well-documented and buildable in weeks-months; accurate, defensible compliance-mapping content is the harder, non-trivial part |
| Defensibility / moat potential | 0.10 | 2 | 0.20 | **(unverified — no live buyer-probe of MSP pricing conducted; crowding check confirms >3 named competitors, which caps this dimension at 3/5 per rubric; scored below the cap at 2/5 because a new entrant genuinely lacks Cynch's 9-year head start and institutional partnerships)** |
| Regulatory drag — inverse (5 = none) | 0.10 | 2 | 0.20 | Not a licensed profession, so not a 1 — but real liability exposure (security-posture guidance relied on by a customer that is later breached) and Privacy Act obligations around holding customer security-posture data |
| **Total (weighted sum × 20)** | | | **65.0/100** | |

### Scoring rationale

**Demand (4/5):** Multiple independent, dated regulatory/institutional signals show real and growing pain: ACSC's 2024-25 threat report shows average small-business incident cost up 14% YoY to $56,600 ([cyber.gov.au](https://www.cyber.gov.au/about-us/view-all-content/reports-and-statistics/annual-cyber-threat-report-2024-2025)); insurers are tightening Essential-Eight-linked underwriting and declining cover without core controls (4iT, Cliffside, upcover, 2025-26); mandatory ransomware-payment reporting began May 2025 for $3M+ turnover businesses; a paid alternative (Cynch) is demonstrably selling at scale. Not a 5 because no live search-trend or community-activity data was available to confirm momentum is accelerating rather than merely present, and part of the regulatory tailwind (Privacy Act small-business exemption removal) is not yet legislated.

**Monetisation (4/5):** The strongest possible category of evidence — a direct competitor (Cynch Security) has 2,000+ AU SME customers paying $149-799/mo for exactly this pain, sustained over ~9 years. Not a 5 because the ACSC survey shows 48% of AU SMEs spend <$500/yr on cybersecurity overall, meaning Cynch's paying base is a curated, better-resourced subset of the ~300,000-business SAM, not the whole population — budget fit is proven but not universal.

**Passive-fit (3/5):** A cloud-native, read-only-API scanning + policy-generation product can be largely self-serve — Cynch's own "no software/hardware/agents" architecture is the existence proof. Docked to 3 (not 4-5) because: (a) Essential Eight/ASD guidance and insurer expectations evolve and require an ongoing content-currency treadmill; (b) security-adjacent products generate real support load when customers get flagged risks wrong or get breached anyway (Cynch itself offers a $799/mo human-coaching tier, implying self-serve alone doesn't fully satisfy demand); (c) elevated read access to a customer's M365/Google tenant is itself a trust-sensitive, support-heavy integration to run responsibly.

**Build feasibility (3/5):** Microsoft Graph API and Google Workspace Admin API integrations are well-documented and a scanning/reporting MVP is buildable by a small team in weeks-to-months. Docked from 4-5 because producing accurate, defensible Essential-Eight-maturity-mapping content (and keeping it current) is a genuine domain-expertise bottleneck, and getting this wrong carries real liability, not just a bug.

**Defensibility (2/5):** Per the opportunity-scoring rubric, this dimension is capped at 3/5 until competitor pricing is verified by direct probes (not fully done here — MSP pricing remains UNKNOWN, only Cynch's and the vCISO tier's published prices are confirmed) and additionally capped at 3/5 by the crowding rule, since more than 3 named competitors (Cynch, vCISO firms, and a >7-brand fragmented MSP "Essential Eight as a Service" field) are chasing this mandate. Scored 2 (below the cap, not at it) because a new entrant's actual moat is close to zero relative to Cynch specifically: 9 years of operating history, 2,000+ customers, and institutional distribution partnerships (Telstra, Victorian Government, KPMG, Small Business Australia deals listing) that a new entrant cannot replicate quickly. **This is the single load-bearing reason the score does not clear PURSUE.**

**Regulatory drag (2/5):** Not a licensed profession requiring a specific security-consulting authorisation in Australia (so not a 1), but there is real, non-trivial drag: the product would hold and act on sensitive customer security-posture data (Privacy Act obligations apply to the vendor itself), and incorrect guidance that a customer relies on ahead of a breach creates genuine liability exposure beyond ordinary SaaS ToS/privacy/tax obligations. This is consistent with the brief's own flagged risk that "regulatory/compliance framing may require licensed security or legal expertise the venture cannot provide as decision-support only" (brief.md, Open risks).

### Disqualifier check

- **Hard legal block:** None identified — this is a compliance-support tool, not a licensed security-consulting or legal-advice service, provided it is clearly positioned as decision-support (consistent with the repo-wide constraint against recommending regulated products without flagging it).
- **Single-platform dependency:** No — M365 and Google Workspace are two independent platforms, and CSV/manual input is a plausible fallback.
- **Zero willingness-to-pay:** No — directly contradicted by Cynch's 2,000+ paying customers.

**No automatic-KILL disqualifiers triggered.**

---

## Score

**65 / 100 — PARK**

(Verdict bands: ≥70 PURSUE · 45-69 PARK · <45 KILL.)

## Verdict

The underlying pain — AU SME exposure to rising cyber-incident cost, tightening insurer/Essential-Eight expectations, and looming Privacy Act reform — is real, growing, and demonstrably monetisable (conviction gate PASS, 64/100). However, the specific opportunity as framed in the brief ("a low-touch cybersecurity software/service" for this segment, generically) is **not a clear PURSUE**, because the self-serve software lane the brief hypothesised was open is **already occupied by an entrenched, well-partnered incumbent** — Cynch Security, 2,000+ AU SME customers, $149-799/mo, 9 years of operation, backed by a cyber accelerator and partnered with Telstra, the Victorian Government, and KPMG. A generic clone of that offer has weak defensibility and a materially smaller obtainable revenue slice (bottom-up SOM ~$107k-$358k ARR in 12-24 months for an undifferentiated new entrant, versus Cynch's implied multi-million-dollar run rate) than the raw demand signals alone would suggest. This is a **PARK, not a KILL**: the demand is real and worth revisiting with a genuinely differentiated wedge (insurer-integration timing, Privacy Act reform timing, a mid-tier price point, or vertical narrowing — see `research/competitor-landscape.md`, Wedge assessment) rather than proceeding to G1 on the current generic framing.

---

## Top 3 G1 Unknowns

### Unknown 1 — Does a real, validated wedge exist against Cynch specifically?
The four candidate wedges (insurer-integration, Privacy Act reform timing, mid-tier pricing, vertical narrowing) are hypotheses, not evidence. Before any further spend, G1 should run the direct-probe and outreach validation steps listed in `research/conviction-signal.md` (buyer-style probe of Cynch, 3-5 insurance-broker interviews, 30-50 direct SME outreach contacts) to determine whether any wedge clears a real willingness-to-switch/pay-alongside bar.

### Unknown 2 — Regulatory/liability exposure and the boundary of "decision-support"
The brief itself flags that "regulatory/compliance framing may require licensed security or legal expertise the venture cannot provide as decision-support only." G1's domain-advisor must determine whether recommending specific Essential-Eight controls and generating insurer-facing compliance reports crosses into a licensed/regulated activity in Australia, and what liability-limitation language is actually sufficient given the sector's history of breach-related litigation.

### Unknown 3 — Timing and shape of the Privacy Act small-business-exemption removal
Part of the regulatory tailwind this opportunity leans on (removal of the $3M turnover exemption) is not yet legislated ([IAPP](https://iapp.org/news/a/amending-australias-privacy-act-small-businesses-bigger-responsibilities), [Schiller Legal](https://www.schillerlegal.com.au/post/australia-s-3-million-privacy-exemption-is-gone-what-you-must-do-now)). If this is core to a "regulatory-timing" wedge, G1 needs to establish an actual expected legislative timeline (not "expected in a future tranche") before betting a build cycle on it.

---

## Evidence sources (all cited claims)

Primary/directly fetched:
1. ABS, "Counts of Australian Businesses, including Entries and Exits, July 2021-June 2025" — [abs.gov.au](https://www.abs.gov.au/statistics/economy/business-indicators/counts-australian-businesses-including-entries-and-exits/latest-release) — employing business counts by size band
2. Cynch Security pricing page — [cynch.com.au/pricing](https://cynch.com.au/pricing) — $149/mo Basic, $799/mo Coaching, Enterprise custom
3. Cynch Security about page — [cynch.com.au/about](https://cynch.com.au/about) — founded 2017, 2,000+ customers, partnerships
4. CISO Advisory Australia vCISO pricing — [cisoadvisory.com.au/virtual-ciso-cost-australia](https://cisoadvisory.com.au/virtual-ciso-cost-australia/) — $3,500/$6,500/$9,500 per month tiers
5. ACSC Annual Cyber Threat Report 2024-25 — [cyber.gov.au](https://www.cyber.gov.au/about-us/view-all-content/reports-and-statistics/annual-cyber-threat-report-2024-2025) — $56,600 avg small-business loss, up 14%
6. ACSC "Cyber Security and Australian Small Businesses" Survey — [cyber.gov.au](https://www.cyber.gov.au/sites/default/files/2023-03/2023_ACSC_Cyber%20Security%20and%20Australian%20Small%20Businesses%20Survey%20Results_D1.pdf) — cost-barrier, spend, incident-rate figures

Secondary (credible professional/trade/industry-association sources):
7. COSBOA/CommBank 2025 Small Business Perspectives Report — [cosboa.org.au](https://cosboa.org.au/post/cosboa-and-commbank-release-2025-small-business-perspectives-report/)
8. 4iT, Cliffside, upcover — cyber insurance requirements for AU SMEs, 2025-2026 (3 independent sources corroborating)
9. SEEK job listings — [au.seek.com/essential-eight-jobs](https://au.seek.com/essential-eight-jobs) — live demand-side hiring signal
10. IAPP, Schiller Legal — Privacy Act small-business exemption reform status, 2025-2026
11. Corrs Chambers Westgarth, homeaffairs.gov.au — 2023-2030 Australian Cyber Security Strategy, A$290.8m Shield 1 funding
12. Cyber Wardens — [cyberwardens.com.au](https://cyberwardens.com.au/) — free government-funded training program, A$23.4M

Estimates (explicitly flagged, not independently verifiable):
13. New-entrant 12-24 month capture rate (0.02%-0.2% of SAM) — **[estimate — RISK per market-sizing rule, unsourced, flagged as G2 blocker]**
14. Cynch's implied ARR run-rate — **[estimate — not disclosed by Cynch, directionally implied by customer count × published pricing only]**
