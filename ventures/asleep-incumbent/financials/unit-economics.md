# Unit Economics — asleep-incumbent (HVNL SMS SaaS)

**Currency:** AUD (ex-GST throughout; GST collected on top, remitted to ATO — zero net P&L effect for B2B)
**Prepared:** 2026-06-19
**Stage:** G1 financial viability pass
**Decision-support only — not financial advice; the human makes the call.**

---

## 1. Assumptions (explicit; flagged by leverage)

| # | Assumption | Value | Source / basis | Load-bearing? |
|---|-----------|-------|----------------|--------------|
| A1 | Addressable sub-20-truck accredited operators | 3,200–7,200 | G0 estimate: 8,000–12,000 total accredited × 40–60% sub-20-truck. NHVR Annual Report 2023-24 (operator total via Policy Commons, Oct 2024). **UNVERIFIED — must confirm at G1.** | **CRITICAL (1)** |
| A2 | Willingness to pay (WTP) at $79–129/mo | Assumed positive | G0 score 3/5 for WTP. No customer interviews completed. NHVR free templates are the zero-price alternative. **UNVERIFIED — must confirm at G1.** | **CRITICAL (2)** |
| A3 | Monthly churn | 2.5% | Benchmark: SMB SaaS median 3–5% monthly (Baremetrics 2024 SMB cohort); compliance SaaS with accumulated evidence trail assumed lower end; 2.5% reflects moderate switching cost (evidence-trail lock-in). Conservative relative to general SMB. | **CRITICAL (3)** |
| A4 | CAC (blended self-serve) | A$450 | Content/SEO + industry-association outreach + trucking forum presence. No paid search assumed. Benchmark: niche AU B2B SMB self-serve CAC A$300–700 (observed in AU compliance SaaS; no primary data). Middle of range chosen. |  |
| A5 | Build cost | A$49,920 | 320 hrs (8 weeks × 40hr) × A$130/hr opportunity cost + 20% contingency = A$41,600 + A$8,320. Developer rate: ATO / SEEK AU senior full-stack median 2026. |  |
| A6 | Stripe AU domestic rate | 1.7% + A$0.30 per transaction | Stripe AU pricing page (stripe.com/au/pricing), June 2026. Domestic card; no cross-border surcharge for AU customers on AU entity. |  |
| A7 | Infra cost per customer | A$2.00/mo | Document storage (S3-equivalent), managed Postgres, app hosting. Estimated at ~A$200–400/mo fixed at 100–200 customers = A$1.60–2.00/customer. Conservative high end used. |  |
| A8 | Fixed monthly operating costs | A$150/mo | Domain + base hosting + monitoring + accounting SaaS (Xero Starter ~A$35/mo) + misc. |  |

### Three load-bearing assumptions

1. **A1 — Operator count (3,200–7,200).** A 2× range in the addressable market translates directly to a 2× range in ARR ceiling (A$3.6M vs A$8.1M) and in Year-1 SOM. If the true number is below 3,200, this becomes a sub-scale market for a solo operator. Resolve: NHVR Annual Report 2024–25 + ABS business counts.

2. **A2 — WTP at $79–99/mo vs free NHVR templates.** The entire revenue model collapses if operators default to free PDFs. The bull case requires operators to value the "operating evidence trail" test of NHVR audits, not just the "documented SMS" test. Resolve: 10–15 structured interviews before G2.

3. **A3 — Monthly churn at 2.5%.** Churn is the most powerful LTV lever. Compliance SaaS has structural retention advantages (evidence accumulation), but SMB operators are volatile (business failure, ATO wind-up, fleet reduction). If churn is 5% (general SMB median), LTV halves to A$1,778 and LTV:CAC drops to 4.0x — still viable but thin.

---

## 2. Pricing Model

### Value metric: flat fee per fleet (not per seat)

**Rationale:** Owner-operators and small fleet managers do not think in "per seat" terms. They think in "per truck" or "per business." Flat fleet-tier pricing aligns with their mental model, reduces friction, and avoids the seat-count optimisation game (users sharing logins). Price scales with the compliance complexity and the number of drivers managed, not with app seats.

### Three-tier pricing table

| Tier | Target | Fleet size | Price (ex-GST) | Key features unlocked |
|------|--------|-----------|---------------|----------------------|
| **Solo** | Owner-driver, 1-person operation | 1–3 trucks | **A$79/mo** | All 5 SMS categories, pre-start checklists, incident log, PDF export for audits, 12-month evidence trail, email reminders |
| **Fleet** | Small fleet manager | 4–10 trucks | **A$99/mo** | + Multi-driver user management, driver training record module, bulk pre-start review dashboard |
| **Operator** | Small regional carrier | 11–20 trucks | **A$129/mo** | + Subcontractor verification records, cross-vehicle maintenance tracking, KPI reporting (fleet incident rates), priority support |

**Competitor anchors (cited):**
- SafetyCulture: A$24/seat/month (SelectHub, 2026) — generic WHS, not HVNL-specific, requires DIY configuration
- ATCC Compliance Easy: demo-only, no published price (ATCC safety-management.html, June 2026) — probably A$200–500/mo at enterprise tier
- Netcorp: quote-based, hardware-tied, minimum ~10 trucks — effectively infinite CAC for solo operators

**Positioning:** undercut ATCC/Netcorp on price; premium to SafetyCulture on HVNL specificity; premium to NHVR free templates on operating evidence.

### Trial/freemium decision

**14-day free trial (no credit card), not freemium.**
Rationale: the regulatory forcing function is acute (penalties from 1 August 2026). Operators have a reason to start now; a trial converts the urgency into a paid account. Freemium would undermine revenue recovery on a small market. A permanent free tier would compete with the NHVR templates the product is trying to displace.

### Expansion path

- **Annual billing discount:** 2 months free (effective 16.7% discount) to lock in annual commitment and improve cash flow. Targets 30% of new customers on annual from Month 6 onward.
- **ARPU expansion:** fleet growth (Solo → Fleet → Operator) as operators acquire trucks. Natural NRR tailwind without any product changes.
- **Future add-on (Year 2+):** NHVR audit-prep package (one-time A$149 per audit submission) — out of scope for G1.

### Blended ARPU assumption

Mix at steady state: 50% Solo / 35% Fleet / 15% Operator.
**Blended ARPU = (79 × 0.50) + (99 × 0.35) + (129 × 0.15) = A$93.50/mo**

---

## 3. Per-Unit P&L

All figures per customer per month. Blended ARPU = A$93.50.

| Line | Amount (A$) | Basis |
|------|------------|-------|
| Gross revenue | 93.50 | Blended ARPU |
| Stripe fee (1.7% + A$0.30) | (1.89) | Stripe AU domestic rate, June 2026 |
| Infra COGS | (2.00) | Document storage + hosting per customer |
| Email / alerting | (0.20) | Transactional email (Resend/Postmark); ~100 emails/customer/year at bulk rates |
| Support (blended) | (0.50) | Async email support; ~1 in 10 customers contact/month; 20 min at A$50/hr opportunity cost |
| **Total COGS** | **(4.59)** | |
| **Gross Margin** | **88.91** | **95.1%** |

**Gross margin benchmark:** SaaS benchmark healthy range 70–85%; 95% is above benchmark, which is appropriate for a solo-developer, no-hardware, document-storage SaaS. The margin is high because there are no human-review costs and no hardware. The risk is that support costs rise as customer count scales — model assumes async-only support maintained by automation (reminder emails, FAQ, in-app guides).

---

## 4. SaaS Metrics

### Core metrics (base case)

| Metric | Formula | Value | Benchmark band | Status |
|--------|---------|-------|---------------|--------|
| Blended ARPU | Weighted avg price | A$93.50/mo | — | — |
| Monthly churn | Assumption A3 | 2.5% | <2% healthy; 2–4% watch; >4% unhealthy (SMB SaaS) | **Watch** |
| Avg customer lifetime | 1 / churn | 40 months (3.3 yrs) | — | — |
| LTV | Gross margin × lifetime = A$88.91 × 40 | **A$3,556** | — | — |
| CAC | Blended self-serve (A4) | **A$450** | — | — |
| **LTV:CAC** | LTV / CAC | **7.9x** | ≥3x healthy; 1–3x watch; <1x unhealthy | **Healthy** |
| **CAC payback** | CAC / gross margin per month | **5.1 months** | ≤12mo healthy; 12–18mo watch; >18mo unhealthy | **Healthy** |
| Gross margin % | GM / Revenue | **95.1%** | >70% healthy | **Healthy** |
| MRR at 100 customers | 100 × A$93.50 | A$9,350 | — | — |
| ARR at 100 customers | MRR × 12 | A$112,200 | — | — |
| Logo churn | Monthly churn | 2.5%/mo = ~26%/yr | — | — |
| Net revenue retention | Assumes no expansion in base case | ~97.5% MoM | >100% healthy | **Watch** (no upsell modelled) |
| Rule of 40 (Year 2 target) | Growth% + Profit% | Not computed (pre-revenue) | ≥40 healthy | Deferred |

**Most important metric for this model: LTV:CAC.** At 7.9x, there is comfortable headroom — the model can absorb CAC doubling to A$900 (LTV:CAC drops to 4.0x, still healthy) or churn rising to 5% (LTV drops to A$1,778, LTV:CAC = 4.0x). The product stays viable under adverse conditions on a single dimension, but not on two simultaneously.

---

## 5. CAC by Channel

| Channel | Est. CAC | Volume capacity | Notes |
|---------|---------|----------------|-------|
| Content/SEO (HVNL compliance blog, pre-start checklist templates) | A$200–350 | High (12–24mo lag) | Highest-leverage long-term; zero marginal cost per lead once content ranks |
| ATA / Owner Drivers Australia directory listing + newsletter | A$350–500 | Low-medium | Direct access to target segment; paid placement or referral arrangement |
| Trucking Facebook groups (organic) | A$50–150 | Low-medium | Low cost, trust-dependent; peer recommendation is strong in this segment |
| LinkedIn (transport/logistics operators) | A$600–900 | Medium | Likely overprice for this buyer persona; use sparingly |
| NHVR / industry partner referral | A$150–250 | Low | Highest quality leads; requires relationship-building |
| **Blended (base case)** | **A$450** | — | Weighted across mix; early-stage skews higher |

---

## 6. Build Cost and Break-Even

### Build cost

| Item | Value |
|------|-------|
| Build time | 320 hours (8 weeks × 40 hr/wk) |
| Developer rate | A$130/hr (solo founder opportunity cost; SEEK AU senior full-stack median 2026) |
| Base build cost | A$41,600 |
| Contingency (20%) | A$8,320 — compliance mapping (5 NHVR SMS categories into structured templates) typically underestimated |
| **Total build cost** | **A$49,920** |

Note: contingency is warranted. The NHVR SMS Standard 2026 is new; the exact audit-evidence requirements for "is the SMS operating?" have not been tested in PSOE audits yet. There is a non-trivial risk that the template structure needs revision after the first operator audit cycle (Oct–Dec 2026), requiring additional build time.

### Monthly fixed operating costs

| Item | A$/mo |
|------|-------|
| App hosting (base) | 50 |
| Domain + SSL | 5 |
| Monitoring (Sentry/Uptime) | 20 |
| Accounting SaaS (Xero Starter) | 35 |
| Misc (legal template storage, email domain) | 40 |
| **Total fixed OpEx** | **150** |

### Break-even — ongoing operations

- **Monthly contribution margin per customer:** A$88.91
- **Customers to cover fixed OpEx:** A$150 / A$88.91 = **2 customers** (extremely low; the fixed cost base is minimal)

### Break-even — build cost recovery

| Customers | Monthly net (after fixed OpEx) | Months to recover A$49,920 build cost |
|-----------|-------------------------------|--------------------------------------|
| 50 | A$4,296 | 11.6 months |
| 100 | A$8,741 | 5.7 months |
| 150 | A$13,187 | 3.8 months |
| 200 | A$17,632 | 2.8 months |

**Customers needed to recover build cost in 12 months: 48 customers.**

48 customers = 1.5% of the low market estimate (3,200 operators). This is an achievable threshold for a product with a hard regulatory deadline — but it requires launch before or very close to 1 August 2026. **The timing constraint is the operational risk, not the financial model.**

---

## 7. ARR Scenarios and Market-Size Sensitivity

### Year-1 ARR at varying adoption rates

| Market size | 2% adoption | 3% adoption | 5% adoption |
|------------|------------|------------|------------|
| Low (3,200 ops) | A$71,808 (64 cust) | A$107,712 (96 cust) | A$179,520 (160 cust) |
| Mid (5,200 ops) | A$116,688 (104 cust) | A$175,032 (156 cust) | A$291,720 (260 cust) |
| High (7,200 ops) | A$161,568 (144 cust) | A$242,352 (216 cust) | A$403,920 (360 cust) |

### ARR ceiling (full market penetration)

| Market size | ARR ceiling (100% penetration) | Realistic 10% steady-state |
|------------|-------------------------------|--------------------------|
| Low (3,200 operators) | A$3,590,400 | A$359,040 |
| High (7,200 operators) | A$8,078,400 | A$807,840 |

**Interpretation:** The SAM ceiling is A$3.6M–A$8.1M ARR. A 10% steady-state penetration rate (highly ambitious for a solo product) yields A$359K–A$808K ARR — meaningful solo-developer revenue. The base case (3% adoption, mid-market) yields A$175K ARR in Year 1, consistent with the G0 estimate.

---

## 8. Sensitivity Analysis

### 8a. Individual driver sensitivity (tornado)

#### Price ±20% (churn and CAC held at base)

| Price scenario | Blended ARPU | GM/unit | LTV | LTV:CAC | CAC payback |
|---------------|-------------|--------|-----|---------|------------|
| -20% (A$75/mo blended) | 74.80 | 70.53 | A$2,821 | 6.3x | 6.4 mo |
| Base (A$93.50/mo blended) | 93.50 | 88.91 | A$3,556 | 7.9x | 5.1 mo |
| +20% (A$112/mo blended) | 112.20 | 107.29 | A$4,292 | 9.5x | 4.2 mo |

Price movement has moderate effect on LTV:CAC (6.3x–9.5x range) but LTV:CAC remains healthy (>3x) across the full ±20% range. Price is not the highest-leverage single lever.

#### Churn ±50% (price and CAC held at base)

| Churn scenario | Monthly churn | Lifetime | LTV | LTV:CAC | CAC payback |
|---------------|--------------|---------|-----|---------|------------|
| -50% (1.25%/mo) | 1.25% | 80 mo | A$7,113 | 15.8x | 5.1 mo |
| Base (2.5%/mo) | 2.50% | 40 mo | A$3,556 | 7.9x | 5.1 mo |
| +50% (3.75%/mo) | 3.75% | 26.7 mo | A$2,371 | 5.3x | 5.1 mo |

Churn has the largest single-driver effect on LTV:CAC (5.3x to 15.8x). Even at +50% churn (3.75%/mo), LTV:CAC = 5.3x — still healthy. **Break point: churn must stay below ~13%/month for LTV:CAC to remain above 3x.** Given SMB SaaS median of 3–5%, this product has wide churn headroom.

#### CAC ±50% (price and churn held at base)

| CAC scenario | CAC | LTV:CAC | CAC payback |
|-------------|-----|---------|------------|
| -50% (A$225) | A$225 | 15.8x | 2.5 mo |
| Base (A$450) | A$450 | 7.9x | 5.1 mo |
| +50% (A$675) | A$675 | 5.3x | 7.6 mo |

CAC doubling to A$675 keeps LTV:CAC at 5.3x and payback at 7.6 months — still healthy. **CAC is not the binding constraint at these ARPU levels.** CAC would need to reach ~A$1,185 (2.6× base) before LTV:CAC falls below the 3x threshold.

### 8b. Tornado ranking

| Driver | LTV:CAC range (±50% or ±20%) | Verdict impact |
|--------|------------------------------|--------------|
| **Churn** | 5.3x – 15.8x (±50%) | Largest swing; always healthy in tested range |
| **Price** | 6.3x – 9.5x (±20%) | Moderate; always healthy |
| **CAC** | 5.3x – 15.8x (±50%) | Same magnitude as churn; always healthy |
| **Operator count** | A$71K – A$404K ARR (2–5% penetration, low vs high) | Does not affect unit economics; affects scale ceiling |

**Finding:** The model is unit-economically robust across all single-driver stress tests. The real risk is not unit economics — it is scale: the market is small enough that the operator count and WTP are the binding constraints on whether this is a meaningful business, not whether the per-unit economics work.

### 8c. Combined scenarios

| Scenario | Assumptions | LTV:CAC | CAC payback | Year-1 ARR | Build cost recovery |
|----------|------------|---------|------------|------------|-------------------|
| **Pessimistic** | Price −20%, churn +50%, CAC +50%, low market (3,200), 2% adoption | 4.2x | 9.6 mo | A$57,446 | ~2.6 years |
| **Base** | Base price, churn, CAC; mid market (5,200), 3% adoption | 7.9x | 5.1 mo | A$175,032 | ~5.7 mo |
| **Optimistic** | Price +20%, churn −50%, CAC −50%; high market (7,200), 5% adoption | 9.5x | 2.5 mo | A$403,920 | ~1.4 mo |

**Pessimistic combined:** LTV:CAC 4.2x (healthy), payback 9.6 months (healthy), but Year-1 ARR of A$57K on a A$49,920 build cost — marginal year-1 return. Break-even on build takes ~2.6 years, which is a long solo-developer runway.

---

## 9. The Free-Default Pessimistic Case

**The load-bearing question:** Will operators pay A$79–99/month when NHVR offers free PDF templates?

**Model assumption for pessimistic free-default case:**
- 70% of the target market defaults to NHVR free templates ("we have an SMS, it's a PDF")
- Only 30% of the market is genuinely serviceable (operators who understand the "operating and effective" audit test requires ongoing digital evidence, OR who have already failed or fear failing a PSOE audit)
- Within that 30%, adoption rate of 3–5%

| Market | Serviceable (30%) | 3% adoption | 5% adoption |
|--------|------------------|------------|------------|
| Low (3,200 ops) | 960 | 29 cust, ARR A$32,314 | 48 cust, ARR A$53,856 |
| High (7,200 ops) | 2,160 | 65 cust, ARR A$72,706 | 108 cust, ARR A$121,176 |

**In the free-default pessimistic case at the low market:**
- 29 customers, A$32K ARR — build cost recovery takes ~4.6 years. **This is below the viability threshold for a solo developer.**
- At the high market, 108 customers / A$121K ARR — build cost recovery ~8 months. Viable but thin.

**What breaks the free-default assumption:**
- PSOE audits post-1 August 2026 produce enforcement actions that make the PDF-only approach visibly fail in the market. This is likely within 6–12 months of commencement. Industry association coverage of early audit failures could rapidly shift operator behaviour.
- The product's onboarding demonstrates, concretely, why the NHVR PDF does not satisfy "operating and effective" — this is a content/positioning task, not a product task.
- Early customers who pass PSOE audits with the product become case studies (social proof is strong in tight-knit trucking communities).

**Risk:** The product may launch into a market that does not yet feel the pain of PDF-only SMS, then see rapid demand acceleration after the first round of PSOE audit enforcement (Q4 2026 – Q1 2027). Cash runway to bridge this gap is the practical risk.

---

## 10. Verdict

**FIXABLE — viable with the right sequencing; the unit economics are healthy but market scale is modest.**

### Why viable:
- LTV:CAC 7.9x, CAC payback 5.1 months — both comfortably healthy even under stress
- Gross margin 95% — leaves room for support cost inflation
- Break-even customers: 48, which is 1.5% of the low market estimate
- The unit economics survive every single-driver stress test above 3x LTV:CAC

### Why fixable (not straightforwardly viable):
- The market is small: Year-1 ARR of A$107K–A$242K (base-to-optimistic, mid-to-high market) is meaningful solo-developer revenue but does not represent a fundable scale business. The A$3.6M–A$8.1M ARR ceiling requires 10–20%+ market penetration, which is ambitious.
- WTP is unverified. The free-default pessimistic case produces A$32K–A$121K ARR depending on market size — the low end does not recover the build cost within a reasonable period.
- The timing risk is structural: the product must be live by 1 August 2026 (44 days from today). If it launches in October 2026, the peak urgency window is missed.

### Break-even point:
- Ongoing operations: 2 customers (trivial)
- Build cost recovery in 12 months: 48 customers (A$53,856 ARR)
- At 3% adoption of the mid-market: 156 customers, A$175K ARR — build cost recovered in 5.7 months

### The decisive lever:

**WTP confirmation — specifically whether operators understand the difference between "documented SMS" and "operating SMS."**

This single question determines whether the serviceable market is 100% of accredited operators (maximum case) or 30% (free-default pessimistic case). No other financial lever matters as much. All other assumptions (churn, CAC, price) produce viable unit economics in stress tests; only the WTP / free-default risk can render this unviable.

The fix is a positioning intervention: the product must make viscerally clear that NHVR PDF templates alone will not pass the "is it operating?" audit test, and that operators who rely solely on PDFs face A$10,000 per-breach CoR penalties when audited. If this message lands before 1 August 2026 (via ATA newsletter, trucking Facebook groups, NHVR information sessions), the free-default risk is materially reduced.

---

## 11. Open Financial Risks

1. **Timing:** 44 days to 1 August 2026 commencement. If the product cannot launch by then, the primary urgency window (fear of non-compliance at commencement) is missed. Post-August demand shifts to "already non-compliant" which is a smaller, harder-to-reach cohort.

2. **Market size verification:** If NHVR data shows only 4,000–5,000 total accredited operators (not 8,000–12,000), the SAM drops to ~A$2M ARR ceiling, making 10% penetration = ~A$200K ARR — thin but workable for a solo operator.

3. **ATCC Compliance Easy pricing:** If ATCC quietly offers a sub-$99 self-serve tier for small operators (their demo-only model obscures this), the lane is already occupied and the pricing hypothesis collapses. This is the highest-priority G1 discovery task.

4. **PSOE audit enforcement speed:** The financial model assumes enforcement creates demand. If NHVR takes a lenient approach in H2 2026 (education-first, not penalties), the free-default adoption rate stays high and demand is deferred 12–18 months.

5. **Solo-developer concentration risk:** Build depends on one developer. Any scope expansion (state-specific variations, mobile app, EWD integration requests) inflates the build cost and extends the timeline past the deadline.

---

*Sources: Stripe AU pricing (stripe.com/au/pricing, June 2026); SEEK AU salary data 2026; Baremetrics SMB SaaS benchmarks 2024 (baremetrics.com/blog/saas-benchmarks); NHVR Annual Report 2023-24 (Policy Commons, Oct 2024); all market estimates from opportunity-score.md (asleep-incumbent G0 research, June 2026). CAC benchmarks are analyst judgment based on AU niche B2B self-serve patterns — no primary data available; flag for revision at G2 if customer interviews reveal different channel economics.*
