# Competitor landscape — AU SME cyber-defence / Essential Eight compliance

## Competitor 1 — Cynch Security (direct, closest comparable)

- **Positioning:** Self-serve, cloud-based cyber-fitness platform purpose-built for AU small-to-medium businesses. No software/hardware/agents — connects to M365 or Google Workspace via read-only APIs to scan for misconfigurations and missing safeguards, generates policies and remediation reports.
- **Pricing (published, primary):** Basic (self-guided) **$149/mo AUD** — unlimited assessments, M365/Google scanning, downloadable policies, standard chat support. Coaching (expert-guided) **$799/mo AUD** — adds dedicated coaching, quarterly strategy calls, prioritised remediation, internal audit support. Enterprise — custom pricing, supplier-assurance-at-scale. 14-day free trial. Discounts available for micro-businesses/non-profits/startups. [cynch.com.au/pricing](https://cynch.com.au/pricing)
- **Scale/traction:** Founded 2017, "2,000+ organisations guided to better security," backed by CyRise (Australia's cyber security accelerator, Cohort 2), listed as a deal partner on [Small Business Australia](https://smallbusinessaustralia.org/deals/cynch-security/), partnerships with Telstra, Victorian State Government, KPMG, AWS. [cynch.com.au/about](https://cynch.com.au/about)
- **Gaps/complaints:** No independent review-site data found (Trustpilot page exists but only 3 reviews indexed, content not readable in this pass — flag for G1 direct check). No AU-specific vertical specialisation apparent (serves "startups to 1,000+ employee enterprises" per their own copy — broad, not SME-only). Coaching tier at $799/mo is a meaningful step up from Basic, suggesting a possible gap for a mid-tier ($250-450/mo) offering between self-serve and full coaching.
- **Switching cost:** Moderate — once M365/Google is connected and a maturity baseline/policy set exists, re-onboarding elsewhere has real friction, though not as high as a data-migration-heavy platform.
- **Platform dependency:** Depends on Microsoft Graph API / Google Workspace Admin API access continuing on current terms — a two-platform dependency, not single-platform.

## Competitor 2 — vCISO retainer firms (adjacent, premium tier)

- **Positioning:** Human-delivered virtual CISO advisory — strategy, risk register, policy framework, board reporting, incident-response leadership.
- **Pricing (published, primary example):** CISO Advisory Australia: Foundation $3,500/mo, Standard $6,500/mo, Enterprise $9,500/mo AUD ex-GST, month-to-month, no lock-in. [cisoadvisory.com.au](https://cisoadvisory.com.au/virtual-ciso-cost-australia/) Broader AU market range corroborated independently at $5,000-$12,000/mo. [Securitribe](https://securitribe.com/insights/evaluating-the-cost-of-vciso-services-in-australia/), [sidechannel.com](https://sidechannel.com/blog/the-ultimate-guide-to-vciso-pricing-everything-you-need-to-know/)
- **Gaps/complaints:** Priced well above what most SMEs in the 5-199 employee band will pay (confirms the brief's original assumption for this specific tier, though it is NOT confirmed for the self-serve tier — see Cynch above). Human-delivered, so inherently high-touch/high-ops for the vendor, not a low-ops product play.
- **Switching cost:** Low-moderate — relationship-based, not data-locked.

## Competitor 3 — MSP-bundled "Essential Eight as a Service" (fragmented, services-led)

- **Positioning:** A visibly crowded field of AU IT-managed-service-provider (MSP) content and offerings bundling Essential Eight uplift into managed IT support — e.g. 4iT, All IT Services, epicit, StartCloud, Superior Cyber Security, ADL99, ctrl:cyber, netcomp — at least 7 distinct brands surfaced in casual search publishing SME-targeted Essential Eight content in 2025-2026.
- **Pricing:** **UNKNOWN for essentially all of these** — none of the pages found in this pass display self-serve pricing; all funnel to a "contact us"/quote request. Per the competitor-teardown rule, this is recorded as UNKNOWN, not inferred, and would need a live buyer-style probe to resolve. Not attempted in this pass (out of scope for a single G0 sweep) — flagged as a G1 follow-up if this segment becomes relevant to a wedge decision.
- **Gaps/complaints:** Services-led, project/quote-based — high-touch by construction, not a low-ops software play. This is the segment the brief correctly identifies as "priced/scoped above what SMEs will pay" and "not a passive-fit team could plausibly run," but its exact pricing is unverified.
- **Crowding signal:** >3 named competitors chasing the same "Essential Eight for SME" mandate (Cynch + vCISO firms + this fragmented MSP field) — this triggers the opportunity-scoring rubric's crowding cap on the defensibility dimension (cap at 3/5 regardless of any apparent open-lane positioning).

## Free / subsidised "DIY" alternative

- **ACSC direct guidance** — free Essential Eight explainer and maturity-model documentation at [cyber.gov.au](https://www.cyber.gov.au/business-government/asds-cyber-security-frameworks/essential-eight). Requires the business to self-interpret and self-implement; the exact gap Cynch and MSPs monetise.
- **Cyber Wardens** — free, government-funded (A$23.4M investment) 10-45 minute training modules for small-business staff/owners, COSBOA-led with Telstra/CommBank/ACSC backing, targeting 60,000 trained "Cyber Wardens." [cyberwardens.com.au](https://cyberwardens.com.au/) This directly caps willingness-to-pay for the *awareness/training* slice of the pain, though it does not provide ongoing technical scanning, policy generation, or an insurer-ready compliance report — the layer Cynch and any competing product would need to monetise.
- **Free ACSC-backed "health checks"** — part of the A$290.8m Shield 1 investment under the 2023-2030 Australian Cyber Security Strategy, offering free tailored cyber-maturity assessments for SMBs. [Corrs Chambers Westgarth summary](https://www.corrs.com.au/insights/shields-and-horizons-key-takeaways-from-the-2023-2030-australian-cyber-security-strategy) Scope/rollout status of this specific program was not independently confirmed in this pass — flag for G1.

## Wedge assessment

The brief's working thesis — "existing options (MSSPs, enterprise GRC tools, consultants) are priced/scoped above what SMEs will pay" — is **confirmed for the vCISO/consultant tier ($3,500-$12,000/mo) but contradicted for the self-serve software tier**, where Cynch Security has profitably served 2,000+ AU SMEs at $149-799/mo for approximately 9 years, with institutional distribution partnerships that a new entrant would need years to replicate. There is no evidence of an empty self-serve lane; there is evidence of a crowded, partially-occupied one with one clear leader.

**A generic clone of Cynch's offer is not a defensible wedge.** Candidate differentiated angles surfaced but not validated in this pass (candidates for G1, not conclusions):
1. **Insurer-renewal-integration angle** — a product that outputs directly in the format cyber-insurance brokers/underwriters want at renewal (untested — needs the broker-outreach validation step in `conviction-signal.md`).
2. **Privacy Act reform timing** — position ahead of the small-business-exemption removal (not yet legislated — timing risk).
3. **A mid-tier price point** ($250-450/mo) between Cynch's Basic ($149) and Coaching ($799) — untested whether this gap is real demand or just a pricing-ladder illusion.
4. **Vertical narrowing** (e.g. a single regulated-adjacent industry with acute insurer/compliance pressure) rather than horizontal "all AU SMEs."

None of these are validated; they are the starting hypotheses for a sharper G1 pass, not a confirmed open lane.
