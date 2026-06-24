# Competitor Teardown & Market Evidence
## electrification-rebates | G0 Scout | 2026-06-21

---

## 1. Demand Signals

### Signal 1: Federal battery program expanded 3x — near-certain install surge
The Cheaper Home Batteries Program (CHBP), launched 1 July 2025, was expanded on 13 December 2025 from an original $2.3 billion to $7.2 billion over four years, with a government target of more than 2 million battery installations by 2030 (source: DCCEEW announcement, December 2025; CER news, December 2025). As of mid-September 2025, the CER had validated 40,619 battery installations with 725 MWh of capacity. From 1 May 2026 the incentive shifted to a tiered STC structure (higher per-kWh factor on first 14 kWh, tapering beyond), adding a new layer of calculation complexity for installers. This is a policy-floor demand signal: the programme is legislated and funded at a scale that guarantees sustained installer activity for the next four years.

### Signal 2: Scheme patchwork is real and growing
Active schemes as at June 2026 that an installer may need to manage across a single job:

| Scheme | Administrator | What it creates | Installer role |
|---|---|---|---|
| SRES / STC (federal) | Clean Energy Regulator | Small-scale Technology Certificates | Create or assign to registered agent; submit to REC Registry |
| Cheaper Home Batteries Program (federal) | CER | Battery STCs under new tiered calc | Extra compliance statement + photo evidence + serial-number per-module entry |
| VEU / VEECs (VIC) | ESC Victoria | Victorian Energy Efficiency Certificates | Must be Accredited Person; new VEU Registry launched 3 June 2025 |
| Solar Homes (VIC) | Solar Victoria | Point-of-sale rebate | Separate portal; retailer agreement required |
| PDRS / PRCs (NSW) | IPART | Peak Reduction Certificates | Must be Accredited Certificate Provider; separate audit regime |
| REPS / GJs (SA) | ESCOSA | Gigajoule certificates | REPS2 launched 2025, replacing REPS1 |
| ACT Sustainable Household Scheme | ACTIA | Loans only; installer admin | Separate application |
| QLD | Nil residential installer scheme at time of writing | — | — |

A job in Victoria installing solar + battery + heat pump could intersect STC, CHBP battery STC, VEU-VEEC, and Solar Homes simultaneously. Each scheme has its own registry login, its own paperwork format, its own audit cadence, and its own change cycle.

### Signal 3: Installer pain is documented
SolarQuotes reporting (2025) found that some NSW PDRS installers abandon rebate claims entirely because "compliance costs eat up available funds." The article notes "compliance overreach and audit process before certificate creation strangles cash flow" and auditors without solar industry experience raising "non-existent problems." The CHBP added new compliance requirements from March 2026: geotagged, timestamped photos at three install phases (setup, mid-install, commissioning), with each stackable battery module requiring individual serial number entry. An installer managing five schemes across two states today requires: five separate portal logins, five separate calculation methods (all subject to quarterly rule changes), and five separate audit trails.

Sources:
- SolarQuotes "Bound in Red Tape: NSW Tries to Fix Its Battery Rebate" (2025)
- CER Cheaper Home Batteries Program page (accessed June 2026)
- ESC Victoria VEU Registry update (June 2025)
- DCCEEW CHBP expansion announcement (December 2025)

---

## 2. Market Sizing

### Denominator (primary source)
IBISWorld (2024): **8,088 solar panel installation businesses** in Australia, up 2.7% from 2023. No single company holds >5% market share — highly fragmented. Source: IBISWorld "Solar Panel Installation in Australia — Number of Businesses" (2024 edition).

This is the most defensible primary count. It is a business count, not an individual-accreditation count. CEC previously cited "more than 8,000 accredited solar installers" before the accreditation scheme transferred to Solar Accreditation Australia (SAA) in May 2024; specific SAA totals are not yet publicly reported in aggregate form.

Heat pump/HVAC installers eligible for VEU: the ESC Victoria public registry lists accredited persons by activity; a precise sub-total for heat-pump only installers is UNAVAILABLE from public sources — flag as RISK. Conservative estimate: ~30-40% of the 8,088 solar businesses also hold VEU accreditation, and additional HVAC-only businesses are not in the IBISWorld solar count. Using the 8,088 figure as the floor denominator.

### Installation volumes (proxy for active businesses)
- 2024: ~321,000 rooftop PV systems installed, 3.19 GW (SunWiz, March 2025 / CEC Rooftop Solar and Storage Biannual Report, December 2024)
- H1 2025: 1.3 GW rooftop solar (-12% vs H1 2024) (CER Q2 2025 Quarterly Carbon Market Report)
- Battery installs post-July 2025: 40,619 validated installs in first ~2.5 months (CER, mid-September 2025); projected run-rate ~200,000+ per year given the $7.2B expansion
- Air source heat pumps: ~41,000 units H1 2025 (down 34% vs H1 2024 — but attributable to interest-rate-driven renovation slowdown, not scheme withdrawal)

### Bottom-up SOM

Assumption: the cross-scheme claim-management tool targets installers who regularly handle multiple schemes (2+ per job is the pain threshold). Conservative estimate: 20% of 8,088 businesses = ~1,600 "multi-scheme active" businesses (low case), scaling to 35% = ~2,800 (base case) as battery installs accelerate under CHBP.

**Pricing:** Dataforce ASAP — the only competitor with a published price — charges AUD $250–$500/month (Lite plans) for single-scheme coverage. A cross-scheme tool with stronger workflow and claim-lodgement automation could command a premium. Target range: AUD $199–$399/month per business (USD ~$130–$260).

| Scenario | Businesses | Monthly ARPU (AUD) | Annual Revenue |
|---|---|---|---|
| Low (1,600 businesses, 5% penetration, 2yr) | 80 | $250 | $240,000 AUD/yr |
| Base (2,800 businesses, 5% penetration, 2yr) | 140 | $299 | $502,000 AUD/yr |
| High (2,800 businesses, 10% penetration, 2yr) | 280 | $299 | $1,004,000 AUD/yr |

**Sensitivity:** the size is most sensitive to the multi-scheme adoption rate among the 8,088 base. If only 10% of businesses deal with 3+ schemes regularly (800 businesses), the addressable market shrinks by half. This % is UNVERIFIED — it is the single most important G1 research question.

**Revenue ceiling (SAM):** 8,088 businesses × $299/month × 12 = ~$29M AUD/yr. Realistic 12–24 month slice for a small team at 5% penetration: $240K–$500K AUD/yr. Lean viable; not a large outcome.

**Verdict:** The obtainable slice is sufficient for a profitable solo/small team product at low ops cost, but not a venture-scale outcome without expansion beyond the immediate installer ICP (e.g. wholesalers, aggregators, multi-scheme certificate traders).

---

## 3. Competitor Teardown

### Competitor 1: Dataforce ASAP + Runabout
**What it does:** Cloud-based field-services + compliance platform tailored to the AU energy efficiency sector. Runabout is the mobile app.
**Schemes:** VEU, ESS (NSW), REES (SA), RET Solar PV on the Pro plan. Lite plans cover VEU + select ESS activities only.
**Pricing (VERIFIED — public price page):** ASAP-Lite Starter: AUD $250/month (2 back-office, 5 fieldworkers). ASAP-Lite Standard: AUD $500/month (4 back-office, 10 fieldworkers). ASAP-Pro: contact for quote (unlimited). Source: dataforce.com.au/asap-pricing, accessed June 2026.
**Gaps:** Lite plans do not cover federal SRES/STC or CHBP battery STC out of the box (Pro only). No evidence of single-workflow cross-scheme job management (each scheme appears as a separate module). No CHBP-specific compliance checklist visible. Mobile UX dated (Android reviews reference UI complaints). Positioned at certificate aggregators and larger energy efficiency contractors — not small solar/battery installers.
**Switching cost:** Medium — data lives in Dataforce; integrations with Xero/payroll. Churnable with 1–3 months migration effort.
**Platform dependency:** Not dependent on a single external platform API; uses CER/ESC/IPART registries via file upload/API.

### Competitor 2: Alitsy
**What it does:** ERP/workflow platform for energy efficiency certificate providers and installers. Supports proposal, certificate calculation, compliance, lodgement, CRM, stock management.
**Schemes:** VEU (activities 1D/3C heat pump, activity 6 air con), NSW HEER and HVAC, Solar + Battery STC. Claims to cover "all Australian schemes" but active support appears to be VEU + ESS + STC based on published descriptions.
**Pricing:** UNKNOWN — no public pricing page. Must contact sales. (Confidence flag: pricing probe required before G1.)
**Gaps:** Positioning appears to target mid-size ACPs and certificate aggregators, not the long tail of small solar/battery installers. No evidence of CHBP-specific workflow (battery module serial number entry, tiered STC calculation from May 2026). VEEC creation for bulk upload was in active development as of their April 2025 information session.
**Switching cost:** Medium-high — ERP-style tool with data history, integrations.
**Platform dependency:** Integrates with ESC VEU Registry (launched June 2025), IPART TESSA. Dependency on these government registries' APIs (not a single commercial platform).

### Competitor 3: Ecovantage (ACP + managed service)
**What it does:** A full-service Accredited Certificate Provider — not a SaaS tool. Ecovantage acts as the ACP, creates and trades certificates on behalf of installers, and provides dedicated account management. Covers all AU schemes (STCs, LGCs, VEECs, ESCs, PRCs, SA REPS GJs).
**Pricing:** UNKNOWN — no published price. Business model appears to be a spread/margin on certificate trading, not a subscription. (Confidence flag: pricing probe required before G1.)
**Gaps:** NOT self-serve. Installers rely on Ecovantage's account managers and payment terms (Invoiced Monday, Paid Friday). No installer-facing self-serve dashboard or real-time eligibility checker described. Payment delay risk (VEEC: 10–14 business days from submission). Does not give installers independent audit-trail visibility or direct registry access.
**Switching cost:** Low — installers can move to another ACP or become self-managing.

### Competitor 4: Greenbank Environmental
**What it does:** Largest independent environmental certificate trader in AU (since 2003). Acts as registered agent for STCs, trades VEECs, ESCs. "Smart Software" is a mobile app for data capture (serial numbers, photos, signatures) that feeds into their FormTrack portal.
**Schemes:** STC/SRES, VEECs, ESCs.
**Pricing:** UNKNOWN — indicative rates only; no subscription price published. Payment: 3–5 business days for STCs, 10–14 days for VEECs post full submission. (Confidence flag: pricing probe required before G1.)
**Gaps:** Smart Software is a data-capture tool feeding one aggregator's back-end — not a self-serve cross-scheme manager. Does not cover PDRS/PRCs (NSW) or SA REPS. Installer is locked into Greenbank as the certificate buyer/trader. No self-serve eligibility checker, no cross-scheme stacking workflow, no CHBP-specific features described.
**Switching cost:** Low to medium — data in Greenbank's system; switching means finding a new agent and re-entering historical records.

### Competitor 5: Rebate Hub (VIC only)
**What it does:** VEU-accredited managed service for Victorian heat pump and HVAC installers. Handles all VEU compliance, uses "EPMate" mobile app for job submissions, pays installers per VEEC.
**Schemes:** VEU only (Victoria).
**Pricing:** UNKNOWN.
**Gaps:** Single-scheme, single-state. No STC, no PDRS, no SA REPS. By design narrow.

### Crowding count
Funded startups directly targeting cross-scheme rebate claim management for AU electrification installers: **0 identified** via Tracxn AU Energy SaaS scan (173 companies), web search, and direct competitor research. The existing players are either managed-service ACPs (Ecovantage, Greenbank, Rebate Hub) or single/dual-scheme certificate software tools (Dataforce, Alitsy, VEURebates). None offer a self-serve, cross-scheme, multi-state claim-management SaaS spanning the full federal + state patchwork.

Crowding count: **0 direct startup competitors** (below the >3 cap trigger). Lane assessment: **PROBABLY OPEN** for the cross-scheme self-serve layer, but with the UNKNOWN caveat that Alitsy's full scope and pricing are unverified and it may be closer to this positioning than public information suggests.

---

## 4. The Wedge

The wedge is the **cross-scheme workflow layer** that none of the existing players own:

- Managed-service ACPs (Ecovantage, Greenbank) handle certificates for installers but are the counterparty, not a neutral tool. They don't give installers a self-serve dashboard or audit trail.
- Single-scheme tools (Dataforce Lite, Rebate Hub, VEURebates) solve one state's problem. An installer working across VIC + NSW + federal CHBP has to juggle three tools and three sets of paperwork.
- CRM/design tools (OpenSolar) include STC calculation but explicitly not state scheme admin or claim lodgement.
- No tool today shows an installer: "for this job in VIC with solar + battery + heat pump, here are the 4 schemes you are eligible for, here are the combined estimated values, here is the pre-filled paperwork for each, and here is the audit-trail log."

Wedge thesis: **Build the cross-scheme eligibility + claim-prep layer as a neutral SaaS, sitting above the ACPs and registries, targeting the ~1,600–2,800 installer businesses regularly juggling 2+ schemes.**

---

## 5. Buyer Economics & WTP

**Buyer type: MAKE (revenue-generating) + SAVE (admin time + clawback avoidance)**

This is a strong buyer-economics profile:
- Each battery install under CHBP yields AUD $3,000–$6,000+ in STC value depending on battery size. Each solar install yields $1,000–$3,000. Each heat pump VEEC claim yields $200–$800.
- The tool enables the installer to capture rebate value on every eligible job. A small installer doing 5 battery jobs/week × $4,000 STC value = $20,000/week flowing through their rebate claims. A tool that ensures they don't miss a scheme, don't get rejected, and don't face clawback has enormous leverage against its price.
- Admin cost today: using an ACP agent, installers lose ~10% of STC value ($200–$400/install) to agent fees. At 5 jobs/week this is $1,000–$2,000/week foregone. A $299/month SaaS tool would pay for itself in the first job of the month.
- MAKE dimension: missing the CHBP battery STC (either because the installer isn't set up for it, or gets rejected) costs the customer the discount that enables the sale. No rebate = no sale in many cases.
- SAVE dimension (clawback avoidance): CER inspection rate is rising (1,580 solar battery inspections completed as of April 2026); non-compliant installations result in certificate cancellation and repayment obligation. A clean audit trail has material financial value.

**WTP score: 4/5.** This is a MAKE + SAVE buyer, not an AVOID buyer. Budget holder is the business owner/operator. The tool produces direct revenue lift and directly reduces the main cost of using existing solutions (agent fees). Strong WTP, likely in the AUD $150–$500/month range for a small installer, higher for larger multi-state businesses. The structural WTP ceiling from penalty-avoidance compliance does not apply here — this is a revenue-enabling and cost-saving tool, not a penalty-avoidance tool.

---

## 6. Regulatory Drag Assessment

The tool itself is **not a regulated product**. Relevant analysis:

- The tool prepares paperwork and tracks eligibility — it does not create or trade certificates, provide financial advice, or act as a certificate agent. The regulated activities (certificate creation, trading, ACP accreditation) remain with the installer or their nominated ACP.
- Comparison: a tax preparation software like Xero is not regulated as a tax agent; it helps users prepare returns which they then lodge. This tool is analogous.
- Risk flag: if the tool auto-lodges directly to government registries on behalf of installers, it may need to operate as an authorised integration partner with CER, ESC Victoria, IPART, ESCOSA. This is feasible (CER and ESC Victoria have API programmes and bulk upload capability) but adds an integration dependency risk — not a regulatory block.
- Privacy compliance: holds installer and customer job data — standard Privacy Act obligations, no special category.
- Consumer advice: the tool is B2B (installer-facing) and does not give advice to householders — lower risk profile.

**Drag score: 4/5 (minimal regulatory drag; manageable API integration dependencies).**

Caveat: the tool must not position itself as creating or validating certificates on the installer's behalf without appropriate ACP accreditation. The scope must remain "eligibility check + claim preparation + audit trail," not "we create your certificates."
