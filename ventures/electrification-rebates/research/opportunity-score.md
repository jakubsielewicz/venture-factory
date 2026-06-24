# Opportunity Score — electrification-rebates
## G0 Scout | 2026-06-21

---

## Scorecard

| Dimension | Weight | Score (1–5) | Weighted | Notes & Confidence |
|---|---|---|---|---|
| Demand & search momentum | 0.25 | 4 | 1.00 | Battery installs surging under $7.2B CHBP expansion (Dec 2025); 160,000+ installs since Jul 2025; scheme count growing each budget cycle. Sources: DCCEEW, CER Q2 2025. Confidence: HIGH |
| Monetisation clarity / WTP | 0.20 | 4 | 0.80 | MAKE + SAVE buyer. Installer earns $3,000–$6,000+ STC value per battery job; tool pays for itself in first job/month. Incumbent agent fee ~10% of STC value ($200–$400/install). Dataforce Lite: $250–$500/month (VERIFIED). Target AUD $199–$399/month. Confidence: MED (Alitsy and Ecovantage pricing UNKNOWN — probe required before G1) |
| Passive-fit: low ongoing ops | 0.20 | 3 | 0.60 | Self-serve SaaS model viable but requires ongoing scheme-rule maintenance (quarterly CER/ESC/IPART rule changes), product and API updates for each registry. Not a content treadmill but a compliance-update treadmill. Not fully passive; low-medium ops. Confidence: HIGH |
| Build feasibility (solo/small team) | 0.15 | 3 | 0.45 | The eligibility logic + STC calculation engine is implementable with public rules. Direct API/bulk-upload integration with CER REC Registry, ESC VEU Registry, IPART TESSA is feasible but non-trivial (3-6 month MVP scope). Some hard parts: tiered CHBP STC calculation from May 2026 (complex rules), registry API access (requires accreditation or partnership agreement). Confidence: MED |
| Defensibility / moat | 0.10 | 3 | 0.30 | (Capped at 3: lane not verified by direct competitor pricing probe for Alitsy/Ecovantage.) Head-start moat if first to own cross-scheme workflow; installer data and audit-trail history creates switching cost; potential to become the data layer ACPs and wholesalers rely on. Not trivially cloneable due to registry integrations and compliance knowledge, but not a network-effect moat. Confidence: MED — UNVERIFIED LANE, direct probe required before G1 |
| Regulatory drag (inverse; 5 = no drag) | 0.10 | 4 | 0.40 | Tool itself is not regulated. Preparing and organising paperwork is unregulated. Direct registry lodgement may require integration-partner status (feasible, not a blocker). Must not position as creating/trading certificates. Standard Privacy Act obligations. No health/finance/legal regulated domain flags. Confidence: HIGH |

**Raw sum:** 1.00 + 0.80 + 0.60 + 0.45 + 0.30 + 0.40 = **3.55**

**Score (×4):** **3.55 × 4 = 56 / 100**

**Adjusted for Defensibility cap (lane unverified):** If lane is confirmed open after G1 probe, Defensibility moves from 3 → 4, adding 0.10 × 4 = +4 points → **60/100**.

---

## Disqualifier Check

| Disqualifier | Status |
|---|---|
| Hard legal/regulatory block | CLEAR — tool is not a regulated activity |
| Single-platform dependency | CLEAR — integrates with government registries, not one commercial API |
| Zero willingness-to-pay | CLEAR — MAKE + SAVE buyer with strong economic logic |

No automatic KILL triggered.

---

## Verdict

**PARK (56/100) — with a conditional path to PURSUE (60/100) pending G1 lane confirmation.**

The demand case is strong: the Cheaper Home Batteries Program expansion to $7.2 billion (December 2025) creates a multi-year installation surge, the scheme patchwork is genuinely complex and growing, and installer admin pain is documented. The buyer economics are the strongest possible profile — a MAKE + SAVE buyer where the tool pays for itself in the first job of the month.

The score sits in the PARK band (45–69) rather than PURSUE (≥70) for two reasons:

1. **Passive-fit ceiling (3/5):** Scheme rules change quarterly across five separate government administrators. The tool requires dedicated compliance monitoring and update work. This is "low-touch" relative to a services business, but it is not a set-and-forget product. This is an honest constraint, not a disqualifier.

2. **Lane UNKNOWN for two key competitors (Alitsy, Ecovantage):** Per the scoring rules, Defensibility is capped at 3/5 until the top-2 competitors are directly probed. The crowding count is zero funded startups, which is positive, but Alitsy may offer a multi-scheme SaaS at a price that closes the lane. This must be resolved at G1.

If G1 confirms: (a) Alitsy does not serve small solar/battery/heat-pump installers at accessible price points with full cross-scheme workflow, and (b) Ecovantage is a managed-service ACP with no self-serve dashboard, the lane is open and the score upgrades to 60/100, pushing toward the PURSUE boundary.

The market size is the limiting factor for a venture-scale outcome: the 12–24 month SOM at 5% penetration of 8,088 businesses is AUD $240K–$500K/year — viable for a solo/small team product, but modest. Expansion to certificate aggregators, wholesalers, and the broader energy-efficiency contractor market (HVAC, electrical, glazing under VEU) would be needed for a larger outcome.

**Recommended G1 actions before re-scoring.**

---

## Top 3 G1 Unknowns

### Unknown 1: Alitsy's scope and pricing (CRITICAL — lane gate)
Alitsy covers VEU + ESS + Solar STC and appears to be expanding to CHBP battery. If it offers full cross-scheme workflow at AUD $200–$350/month for small installers, the self-serve lane may be narrower than it appears. **Action:** send buyer-style enquiry (see research/lane-test.md); request a demo; confirm whether CHBP battery tiered STC calculation is live and whether NSW PDRS is covered. **Decision rule:** if Alitsy covers 3+ schemes for <AUD $400/month with good UX for small installers, re-score the lane as CROWDED and consider a narrower wedge (e.g. CHBP battery specialist, or VIC-only to start).

### Unknown 2: What % of the 8,088 installer businesses actively manage 2+ schemes per job (WTP denominator)
The SOM calculation rests on 20–35% of the installer base being "multi-scheme active." This % is unverified. A primary survey of 30–50 installers (via Solar Quotes network, SAA member outreach, or a LinkedIn poll of solar professionals) would give a defensible denominator before committing to a build. **Decision rule:** if <15% of installers regularly deal with 2+ schemes simultaneously, SOM falls to ~$120K AUD/year — below viability. If >30%, SOM is comfortably above $400K/year.

### Unknown 3: Registry API access — feasibility and timeline for CER, ESC Victoria, IPART
The CER has an REC Registry API; ESC Victoria launched a new VEU Registry in June 2025 with bulk upload capability. IPART has TESSA. But becoming an authorised integration partner with all three registries may require a formal accreditation, testing period, or partnership agreement — adding 3–6 months and potential compliance obligations to the build timeline. **Action:** contact CER and ESC Victoria integration teams to confirm: (a) is self-serve registration available for new integration partners, (b) what are the technical requirements, (c) is there any liability attached to acting as a data intermediary. **Decision rule:** if any registry requires ACP status or imposes material liability on the tool, the scope must be limited to "claim preparation" (not lodgement), reducing the product's value proposition.

---

## Evidence Citations

| Claim | Source | Date |
|---|---|---|
| CHBP expanded to $7.2B; 2M battery target by 2030 | DCCEEW announcement / CER news release | December 2025 |
| 40,619 battery installations validated by CER | CER Cheaper Home Batteries Program page | September 2025 |
| 8,088 solar installation businesses in Australia | IBISWorld "Solar Panel Installation — Number of Businesses" | 2024 |
| H1 2025 rooftop solar: 1.3 GW, -12% vs H1 2024 | CER Q2 2025 Quarterly Carbon Market Report | Q2 2025 |
| Dataforce ASAP Lite: $250–$500/month (VERIFIED) | dataforce.com.au/asap-pricing | June 2026 (accessed) |
| NSW PDRS: installers abandon claims because compliance costs eat available funds | SolarQuotes "Bound in Red Tape: NSW Tries to Fix Battery Rebate" | 2025 |
| New VEU Registry launched; CHBP battery STC tiered from May 2026 | ESC Victoria / CER news | June 2025 / May 2026 |
| Alitsy pricing: UNKNOWN | alitsy.com — no public price page | June 2026 (accessed) |
| Ecovantage pricing: UNKNOWN | ecovantage.com.au/become-an-installer | June 2026 (accessed) |
| Crowding count: 0 funded startups in cross-scheme claim SaaS | Tracxn AU Energy SaaS (173 companies) + web search | June 2026 |

---

## Confidence Flags

- **Defensibility (3/5): UNVERIFIED — direct probe required before G1.** Lane appears open (zero funded startups; no verified self-serve cross-scheme SaaS), but Alitsy's scope and pricing are unknown. Removing the open-lane assumption does not change the PARK verdict (score stays at 56) but confirming it would push to 60 and strengthen the case.
- **WTP $199–$399/month: PARTIALLY VERIFIED.** Dataforce (verified) anchors the top of this range at $250–$500/month. The $199–$299 target is unverified against buyer willingness. G1 survey should test price sensitivity.
- **Multi-scheme-active % (20–35%): UNVERIFIED — RISK.** If this falls below 15%, the base-case SOM halves. This is the most fragile input in the market sizing.
