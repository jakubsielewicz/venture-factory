# Opportunity Score — aml-tranche2
Generated: 2026-06-19
Framing scored: Framing B — Real estate agent + dealer specialist AML/CTF platform for Australian Tranche 2

---

## Scorecard

| Dimension | Weight | Raw score (1–5) | Weighted score | Notes |
|---|---|---|---|---|
| Demand & search momentum | 0.25 | 4 | 1.00 | Strong, non-discretionary legislative demand confirmed. 80,000–100,000 new entities, deadline 1 July 2026. Signal: multiple law firm sources, AUSTRAC news, 8+ new product launches. Docked 1 point (not 5) because the urgency peak is NOW — lead time is short, and post-deadline demand shifts to lower-urgency ongoing compliance. |
| Monetisation clarity / willingness-to-pay | 0.20 | 3 | 0.60 | Buyers are identifiable (principal/licensee at RE agency; dealer owner). Real estate agencies are commercial businesses with software budgets (they already pay for REA.com.au listings, CRM, trust accounting software). WTP for compliance software is unproven for THIS segment — lawyers and accountants have professional-body validation; RE agents and dealers are less studied. Pricing comps suggest $800–$1,800/yr is market-clearing. Docked 2 points for unproven WTP specifically in RE/dealer segment. |
| Passive-fit: low ongoing ops after build | 0.20 | 3 | 0.60 | AUSTRAC obligations are ongoing (annual compliance reports, CDD updates, SMR/TTR filing) creating natural SaaS retention. However: (a) regulatory content must be updated when AUSTRAC issues new guidance (content treadmill exists); (b) AUSTRAC's rules for real estate transactions are more complex (multiple parties per transaction) requiring ongoing support/FAQ workload; (c) the product handles sensitive KYC PII creating Privacy Act obligations for the vendor (data security ops). Not passive — call it "low-touch" with moderate ongoing content and security maintenance. |
| Build feasibility (solo/small team) | 0.15 | 3 | 0.45 | The compliance program builder, risk assessment, and training modules are buildable with standard SaaS tools. The hard parts: (a) integrating a licensed identity verification API (available — Sumsub at $1.35–1.85/check; IdentityCheck; others); (b) AUSTRAC SMR/TTR reporting format integration; (c) real estate-specific CDD workflows (multiple parties, trust/company buyers) require deep domain knowledge. Not a weekend MVP — estimate 3–4 months to testable product for one experienced full-stack developer. |
| Defensibility / moat potential | 0.10 | 3 | 0.30 | Head-start and professional-body channel (e.g., REIA or state RE institute partnership) would create moderate moat. Compliance history and CDD records accumulate in-platform (switching cost). However: no proprietary data; the compliance framework is AUSTRAC-published; any team with AU domain knowledge can replicate. Early partnerships are the durable moat — these are time-limited. |
| Regulatory drag (inverse — 5 = no drag) | 0.10 | 2 | 0.20 | Significant regulatory considerations: (a) the product handles KYC PII at scale — Privacy Act obligations apply to the SaaS vendor even though it is a TOOL for a reporting entity, not itself a reporting entity (confirmed: OAIC guidance applies Privacy Act to reporting entities for AML-collected data; vendor handling PII must comply with APPs); (b) vendor must not inadvertently provide "legal advice" on AML obligations — product must be decision-support, not legal advice; (c) potential licensing or accreditation expectations from professional bodies; (d) product must track AUSTRAC rule changes continuously. Score 2 (manageable but non-trivial obligations). |

**Raw weighted sum = 1.00 + 0.60 + 0.60 + 0.45 + 0.30 + 0.20 = 3.15**
**Score = 3.15 × 4 × 5 / 4 = 3.15 / 5 × 100 = 63/100**

Wait — applying the rubric correctly: sum of (weight × raw score) × 4 = 3.15 × 4 = **63 / 100**

---

## Score: 63 / 100
## Verdict: PARK (45–69 range)

---

## Verdict narrative

The Tranche 2 opportunity has a genuine, legislatively-confirmed forcing function (AML/CTF Amendment Act 2024, obligations live 1 July 2026) targeting ~80,000–100,000 newly regulated Australian entities. The market is real, non-discretionary, and multi-year. However, the opportunity has been widely spotted: at least 8–10 purpose-built AU AML compliance SaaS products launched in the 12 months to June 2026, and InfoTrack — with existing relationships across ~7,000 legal and conveyancing practitioners and an embedded LEAP PMS integration — is offering a free-to-platform compliance centre. TrustEasy is the clear first-mover for accountants.

Framing B (real estate + dealers) avoids the most crowded segments and targets professions not yet owned by incumbents. The SAM for this sub-segment is smaller (~AUD $65–75M at $1,500 ARPA across ~44,000 RE businesses + ~3,000 dealers) but still meaningful, with a realistic 12–24 month SOM of AUD $200K–$500K ARR for a small team.

The PARK verdict reflects three live concerns: (1) willingness-to-pay for RE agents and dealers in AML software is unverified — they have no prior AML compliance culture and may resist software costs; (2) the urgency window is very narrow (peak demand is June–August 2026, already underway); (3) Privacy Act obligations from handling KYC PII at scale add operational complexity that reduces the passive-fit score. The opportunity is not dead but it requires rapid G1 validation of WTP before the window closes.

**This is not a KILL.** The core forcing function is real and multi-year. PARK pending G1 resolution of WTP for RE/dealers and the InfoTrack competitive moat depth for lawyers/conveyancers.

---

## Disqualifier check
- Hard legal block: None. The product is a tool for reporting entities, not itself a reporting entity. It does not provide "designated services." This is decision-support software, not a licensed financial/legal service. **No hard legal block.** (Flag: Privacy Act obligations for PII handling are real and must be addressed in product design — not a kill condition but a build-time constraint.)
- Single-platform dependency: No. Product is standalone or integrates with multiple PMS.
- Zero willingness-to-pay: Not confirmed — see G1 Unknown #1. Pricing comps show market-clearing prices exist. Not a proven kill.

No automatic KILL triggered.

---

## Regulated domain flag (for advisor at G1)
This product operates at the intersection of AML/CTF law and Privacy Act (APPs). The following must be addressed at G1:
1. Does handling KYC PII on behalf of reporting entities make the SaaS vendor a "contracted service provider" under the Privacy Act? If so, what data processing agreements and security controls are required?
2. Does generating AUSTRAC-compliant AML/CTF programs and risk assessments constitute "legal advice"? Scope must be limited to decision-support tools; the entity must be responsible for its own compliance outcomes.
3. OAIC's February 2026 guidance on Privacy and AML/CTF convergence must be reviewed in product design (source: https://www.allens.com.au/insights-news/insights/2026/03/key-privacy-takeaways-from-the-OAICs-updated-AML-CTF-guidance/).

---

## Top 3 G1 unknowns

### Unknown 1 — Willingness-to-pay: real estate agents and dealers (HIGH PRIORITY)
**Question:** Will real estate agencies and dealers in precious metals/stones pay $800–$1,800/yr for AML compliance software, or will they minimise spend (DIY with AUSTRAC starter kits) or default to cheap generalist tools?

**Why load-bearing:** The entire Framing B thesis depends on this segment having both the compliance obligation (confirmed) AND the commercial behaviour to pay for software (unconfirmed). Real estate agents are commercial but compliance-averse; dealers are a fragmented, non-tech-savvy population.

**How to resolve:** 10–15 interviews with RE agency principals and/or precious metals dealers before the obligation start date (July 2026). Check REIA/state RE institute member communications and forums for compliance software purchasing signals. A landing page with waitlist conversion would also validate intent.

### Unknown 2 — InfoTrack competitive moat depth (HIGH PRIORITY)
**Question:** How deeply does InfoTrack's free Compliance Centre penetrate law firms and conveyancers, and does it extend its free model to real estate agents (via Securexchange) and accountants?

**Why load-bearing:** If InfoTrack extends its free-to-search-revenue model to RE agents and accountants, the addressable SaaS subscription market for Framing B shrinks materially. InfoTrack's Securexchange product already serves RE agents; the risk of expansion is real.

**How to resolve:** Direct product testing of InfoTrack Compliance Centre to assess feature gaps. Monitor InfoTrack announcements in July–September 2026. Check whether REIA (Real Estate Institute of Australia) or state institutes have endorsed any specific platform — if InfoTrack has a channel there, the wedge may already be closed.

### Unknown 3 — Privacy Act / data hosting obligations for KYC PII (MEDIUM PRIORITY)
**Question:** What are the exact obligations on a SaaS vendor storing customer KYC/CDD records (passport, driver's licence, proof of address, beneficial ownership docs) on behalf of reporting entities? Does AU data residency apply? What security/audit obligations arise?

**Why load-bearing:** The product necessarily handles sensitive personal information. If data hosting requirements (ISO 27001, SOC 2, AU-hosted servers, contracted service provider agreements) are burdensome, build complexity and ongoing ops cost increase significantly — potentially killing the passive-fit thesis.

**How to resolve:** Legal review of Privacy Act APP 11 (security of personal information) and OAIC's February 2026 AML/CTF guidance for contracted service providers. Review how existing competitors (Sumsub, ClearAML) handle data residency and security obligations in their terms of service.

---

## Evidence base (cited, dated)

| Claim | Source | Date |
|---|---|---|
| 80,000–100,000 new entities, obligations 1 July 2026 | Corrs Chambers Westgarth; Moody's; AUSTRAC news search results | 2025–2026 |
| AML/CTF Amendment Act 2024 passed 29 November 2024 | MinterEllison; Norton Rose Fulbright; AUSTRAC | Nov 2024 |
| Enrolment opened 31 March 2026, deadline 29 July 2026 | Bartier Lawyers; Legl (25 Days to Go); AUSTRAC search results | March–June 2026 |
| InfoTrack free compliance centre, LEAP integration, 7,000 practitioners reached | InfoTrack website (fetched June 2026); Lawyers Weekly | March–June 2026 |
| AML Shield pricing: $799–$1,591/yr | AML Shield pricing page (fetched June 2026) | June 2026 |
| TrustEasy pricing: $1,200–$2,400/yr (accounting-only) | TrustEasy pricing page (fetched June 2026) | June 2026 |
| Arctic Intelligence AML Accelerate: from USD $2,500/yr | Arctic Intelligence product page (fetched June 2026) | June 2026 |
| AU AML market: USD 40.25M in 2025, CAGR 15.72% to 2034 | IMARC Group via OpenPR/Vocal Media (citing IMARC) | 2026 |
| 36,717 accounting services businesses in Australia (2025) | IBISWorld via search | 2025 |
| 22,337–25,203 legal services businesses in Australia (2025) | IBISWorld via search | 2025 |
| 44,940–45,440 real estate services businesses in Australia (2025) | IBISWorld via search | 2025 |
| AUSTRAC daily fine: $18,780/firm for failure to enrol | StackGo; AUSTRAC Consequences page | 2026 |
| Privacy Act applies to reporting entities for AML-collected PII | OAIC guidance (https://www.oaic.gov.au/privacy/privacy-guidance-for-organisations-and-government-agencies/organisations/privacy-guidance-for-reporting-entities-under-the-anti-money-laundering-and-counter-terrorism-financing-act); Allens February 2026 update | Feb–March 2026 |

Note on AUSTRAC.gov.au fetches: direct fetches of austrac.gov.au timed out (two attempts). Dates and obligations sourced from multiple named law-firm secondaries (MinterEllison, Norton Rose Fulbright, Bartier Lawyers, Corrs Chambers Westgarth, Allens) and AUSTRAC press releases via search results. As required by the research-verification heuristic: **flag "verify against austrac.gov.au before launch"** — the secondary source data is consistent and high-confidence but primary source confirmation recommended before G2.
