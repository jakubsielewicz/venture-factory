# Market sizing — cyber-defence-au (AU SME cyber-defence / Essential Eight compliance)

## Denominator (primary source — required)

**ABS, "Counts of Australian Businesses, including Entries and Exits, July 2021 – June 2025"** — [abs.gov.au](https://www.abs.gov.au/statistics/economy/business-indicators/counts-australian-businesses-including-entries-and-exits/latest-release), released 2025, as at 30 June 2025:

| Employment band | Count | Source |
|---|---|---|
| Non-employing | 1,668,635 | ABS, primary |
| 1-4 employees | 688,870 | ABS, primary |
| 5-19 employees | 232,129 | ABS, derived by subtraction (994,178 total employing − 688,870 − 67,857 − 5,322); this same derivation independently cross-checked against another venture's G0 pass on the same ABS release (`ventures/au-sme-compliance/research/opportunity-score.md`) — identical figures |
| 20-199 employees | 67,857 | ABS, primary |
| 200+ employees | 5,322 | ABS, primary |
| **Total employing** | **994,178** | ABS, primary |

## TAM / SAM / SOM

**TAM** — all AU employing businesses, 1-199 employees (excludes non-employing sole traders as unlikely cyber-compliance-tool buyers, and 200+ enterprises as out of scope per the brief): 688,870 + 232,129 + 67,857 = **988,856 businesses**. Source: ABS, as above.

**SAM** — the brief explicitly scopes "SME/mid-market, not enterprise, not consumer." Micro businesses (1-4 employees) are mostly sole-trader-plus-contractor operations with minimal IT footprint and the weakest documented ability to pay (48% of AU SMEs overall spend <$500/yr on cybersecurity — [ACSC 2023 survey](https://www.cyber.gov.au/sites/default/files/2023-03/2023_ACSC_Cyber%20Security%20and%20Australian%20Small%20Businesses%20Survey%20Results_D1.pdf)). Restricting SAM to businesses with 5-199 employees (a real IT stack, more likely to carry cyber insurance or face supply-chain/insurer requirements): 232,129 + 67,857 = **299,986 ≈ 300,000 businesses**. This split is a direct ABS employment-band count, not a derived percentage, so it does not require a separate source for the split itself.

**SOM (12-24mo obtainable slice for a new small-team entrant)** — no external source exists for a realistic new-entrant capture rate; this is an **[ESTIMATE — RISK, not base case]** per the market-sizing procedure, because it is a derived assumption without a cited source. Anchor point: Cynch Security (the closest real comparable) has captured ~2,000 of the ~300,000 SAM (~0.67%) over roughly 9 years of operation with institutional partnerships (Telstra, Victorian Government, KPMG) — see `research/conviction-signal.md`. A new, undifferentiated entrant should expect materially less than that in year 1-2.

| Scenario | Capture rate of 300k SAM | Accounts | ARPU/yr (AUD) | ARR (AUD) |
|---|---|---|---|---|
| Low (operative SOM — RISK-flagged, use as the base case per market-sizing rule) | 0.02% | 60 | $1,788 ($149/mo, matching Cynch's published Basic price) | ~$107,000 |
| Base | 0.07% | ~200 | $1,788 | ~$358,000 |
| High (stretch, requires a genuinely differentiated wedge) | 0.20% | ~600 | $1,788 | ~$1,072,000 |

Per the market-sizing skill's rule ("if a sub-segment is derived by a % split... not itself sourced, label the range as RISK... report only the lower bound as the operative SOM, and flag it as a G2 blocker"): **the capture-rate assumption (0.02%-0.2%) is unsourced and is flagged as a G2 blocker.** The operative, conservative SOM for planning purposes is the Low scenario: **~$107,000 ARR** in 12-24 months for an undifferentiated entrant. The Base/High scenarios are aspirational and depend entirely on landing a real wedge (see `research/competitor-landscape.md`).

## Cross-check (context, not a revenue estimate)

- COSBOA/CommBank 2025 report: cybercrime costs the AU small-business sector an estimated **$2 billion/year** in losses — this is a cost-of-attack figure, not addressable spend, and should not be read as TAM.
- AU Cyber Security Strategy "Shield 1": **A$290.8m** government investment to 2030 supporting SMB cyber uplift (incl. free health checks) — this is subsidy, not addressable commercial revenue, and if anything it is a headwind to paid-product TAM for the awareness/health-check layer specifically.
- Implied scale of the market leader: Cynch Security's 2,000+ customers at $149-799/mo blended pricing implies an order-of-magnitude run-rate in the low-to-mid single-digit millions AUD ARR — **[estimate — not disclosed by Cynch; directionally implied by customer count × published pricing, not a verified figure]**. This suggests the "easy" TAM is already substantially captured by one incumbent.

## Verdict

The base-case obtainable slice (~$358k ARR, and even the RISK-flagged conservative $107k ARR) is small but not inherently disqualifying for a lean solo/small-team product — comparable in order of magnitude to a viable niche self-serve SaaS. However, the size is **most sensitive to the unsourced capture-rate assumption** (a 10x swing between the low and high scenarios on an identical denominator and price), and the realistic achievable capture rate depends almost entirely on finding a differentiated wedge against an entrenched, well-partnered incumbent (Cynch) rather than simply replicating its offer. This sensitivity, combined with the competitive crowding documented in `research/competitor-landscape.md`, is the primary reason the opportunity score does not clear PURSUE as a generic "AU SME cyber compliance SaaS."
