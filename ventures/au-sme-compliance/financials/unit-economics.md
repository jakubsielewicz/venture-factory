# Unit Economics — Modern Award Pay Compliance Checker
**Venture:** au-sme-compliance
**Date:** 2026-06-18 (revised — Stripe fee corrected per verification.md C22/C23)
**Gate:** G1
**Author:** financial-analyst

---

## Revision Note

The pre-G2 verification pass (advisory/verification.md, claims C22/C23) identified a confirmed factual error: the original document used the US Stripe domestic rate (2.9% + $0.30) instead of the AU domestic rate (1.7% + A$0.30), as confirmed by a live fetch of stripe.com/au/pricing on 2026-06-18. This revision corrects the Stripe fee in the COGS calculation and recomputes all downstream figures. The direction of the error was favourable — actual margins are slightly better than previously shown. The verdict (VIABLE) is unchanged.

The ABS buyer-pool / SAM figures cited in Assumption A8 are being separately corrected by the research scout against updated `research/` files. This document does not re-assert pool counts or derive SAM/TAM from first principles; those figures are noted as sourced from `research/opportunity-score.md` and `research/shortlist.md`.

---

## 1. Assumptions

### All assumptions stated explicitly. The three flagged with (*) most drive the result.

| # | Assumption | Value | Basis | Verified? |
|---|-----------|-------|-------|-----------|
| A1 | **(*) Monthly churn rate** | 2.5%/mo (26.2%/yr) | Compliance-specific vertical SaaS heuristic. OpenView 2024 PLG benchmark: SMB SaaS median 3–5%/mo for horizontal tools; obligation-driven tools are stickier. Used 2.5% as base (churn tied to annual FWC event cycle). No AU payroll-compliance SaaS-specific published figure available — flagged as estimate. | Unverified (benchmarked) |
| A2 | **(*) Blended CAC** | AUD $192 | Channel mix: SEO/content 35% @ $120, Google Ads 30% @ $350, industry newsletters 20% @ $180, referral 15% @ $60. Benchmarks: David Skok SaaS benchmarks (forentrepreneurs.com, 2023–2024 edition); Lenny's Newsletter SaaS CAC benchmarks (2024). No AU-specific SMB compliance SaaS CAC data available — live source unavailable, estimate grounded in SMB SaaS channel ranges. | Unverified (benchmarked) |
| A3 | **(*) New account acquisition rate** | 20 accounts/month | Small/solo team, self-serve motion, limited paid budget at launch. Sets the revenue ramp trajectory and therefore months-to-build-cost-recovery. Highly sensitive to execution. | Unverified (assumption) |
| A4 | Pro tier price (base case) | AUD $79/mo | Mid-point of G0 pricing hypothesis ($49–$99); confirmed viable vs competitor anchors: Deputy Core $8.75/user/mo (min $30/mo), Employment Hero HR min ~$100/mo, FairWork Mate from $499/mo (fairworkmate.com.au, 2025). | Partially verified (competitor-anchored) |
| A5 | Stripe fee (AU domestic) | 1.7% + A$0.30 per transaction | stripe.com/au/pricing, fetched 2026-06-18 (confirmed by pre-G2 verification, C22). At $79/mo: $79 × 1.7% + $0.30 = $1.34 + $0.30 = **$1.64/mo**. International cards: 3.5% + A$0.30 = $3.06/mo — see sensitivity note below. | **Verified (live source)** |
| A6 | Build cost (MVP) | AUD $77,200 | 14 weeks × 40 hrs × AUD $120/hr effective rate (founder/solo-dev opportunity cost) = $67,200; plus legal review $5,000, tooling/infra setup $2,000, misc $3,000. Consistent with G0 build feasibility estimate (8–16 weeks solo). | Estimate |
| A7 | Monthly fixed costs (operating) | AUD $800/mo | Tooling subscriptions, base hosting, Xero/MYOB partner program fees, admin. Solo team, no salaries beyond founder draw. | Estimate |
| A8 | Buyer pool | Sourced from `research/opportunity-score.md` and `research/shortlist.md` | ABS "Counts of Australian Businesses" August 2025 release; 60% award-coverage rate applied to the SME pool. Pool count and SAM derivation being corrected by research scout (per C5/C6 in verification.md). This document does not independently assert pool counts. | Deriving from `research/` — see research files |
| A9 | Benchmark: LTV:CAC healthy threshold | ≥ 3.0x (healthy), ≥ 1.0x (viable) | Standard SaaS heuristic. Source: David Skok, "SaaS Metrics 2.0" (forentrepreneurs.com); OpenView PLG Benchmarks 2024. | Established benchmark |
| A10 | Benchmark: CAC payback healthy threshold | ≤ 12 months | Standard SaaS heuristic, same sources as A9. | Established benchmark |

---

## 2. Pricing Model

### Value metric: flat-rate per business (not per seat)

Rationale: For SMEs under 20 employees, per-seat pricing creates a maths problem at the point-of-sale (owner calculates total, balks). A per-business flat rate is simpler to sell, lowers friction, and is consistent with how competitors in adjacent categories (Deputy, Employment Hero at their entry level, FairWork Mate) structure SMB plans. The upgrade path is employee count / award complexity as the natural usage threshold.

### Competitor anchors (cited)

| Competitor | Price | Date sourced |
|-----------|-------|-------------|
| Deputy Core + Payroll | AUD $13.75/user/mo (min $30/mo) | deputy.com/au/pricing, 2026-06-18 |
| Employment Hero payroll min | ~AUD $100/mo | stackpick.com.au, 2026 (note: C21 in verification.md — minimum not confirmed from live source; per-employee rate ~$8–$12/emp/mo) |
| FairWork Mate | from AUD $499/mo | fairworkmate.com.au, 2025 |
| Yellow Canary | Enterprise, undisclosed; targets 500–100,000 employees | yellowcanary.com.au, 2025 (verified C19 — minimum threshold is 500 employees, not 300 as previously stated) |
| FWO Pay and Conditions Tool | Free (manual, no payroll ingestion) | fwc.gov.au, 2026 |

### Tier table

| Tier | Monthly Price | Annual Price | Target buyer | Key differentiators vs tier below |
|------|-------------|-------------|-------------|----------------------------------|
| **Starter** | AUD $49/mo | AUD $588/yr | 1–5 employees; micro-business (cafe, tradie, sole-trader employer) | CSV upload only; 1 award; unlimited pay-rate checks; audit-ready PDF report; email support |
| **Pro** (base case) | AUD $79/mo | AUD $948/yr | 6–20 employees; small business with mixed award types | All Starter features; Xero/MYOB read integration; multi-award mapping (up to 5 awards); penalty-rate & allowance gap flagging; safe-harbour evidence pack |
| **Business** | AUD $149/mo | AUD $1,788/yr | 21–99 employees; growing SME, possibly with HR function | All Pro features; unlimited awards; API access for custom payroll exports; team login (3 users); priority support; FWC wage-order auto-update notifications |

**Blended ARPU assumption (tier mix 50/35/15):** AUD $74.50/mo = AUD $894/yr

Expansion path: Annual price increase of 3.5% tied to FWC Annual Wage Review (framed as "keeping pace with Fair Work") removes pricing friction on uplift. Account growth (employee count crossing tier thresholds) drives organic upsell.

Free-trial decision: 14-day free trial, no credit card required, limited to 5-employee cap and 1 award. Rationale: self-serve SaaS with a criminal-law urgency hook — let the product demonstrate the gap (show underpayment flags immediately). Conversion from free to paid is the primary funnel metric to track.

---

## 3. Per-Unit P&L (Pro Tier, AUD $79/mo)

**CORRECTED** — Stripe fee now uses AU domestic rate (1.7% + A$0.30); previously used US rate (2.9% + $0.30).

| Line | Amount (AUD/mo) | Note |
|------|----------------|------|
| Revenue | $79.00 | |
| Infra (AWS/Render, per-account share) | ($2.50) | |
| Payment processing (Stripe AU domestic: 1.7% + A$0.30) | ($1.64) | $79 × 1.7% + $0.30 = $1.34 + $0.30. **Was $2.59** (US rate 2.9% + $0.30) — corrected per C22. |
| Support (amortised: 1 ticket / 6 mo @ $18) | ($3.00) | |
| **Total COGS** | **($7.14)** | **Was $8.09** |
| **Gross profit** | **$71.86** | **Was $70.91** |
| **Gross margin** | **91.0%** | **Was 89.8%** |

**International card note:** If the customer base skews toward international card holders (Stripe rate 3.5% + A$0.30), Stripe fee rises to $3.06/mo, COGS to $8.56/mo, gross profit to $70.44/mo, gross margin to 89.2%. Both the domestic and international-card scenarios exceed the 70%+ SaaS gross margin benchmark.

Gross margin benchmark: Healthy SaaS gross margin is 70–85%+ (OpenView 2024; SaaS Capital 2024). At 91.0%, this model is above benchmark — typical for a compliance automation tool with minimal human-in-the-loop.

---

## 4. CAC by Channel

| Channel | Weight | CAC (AUD) | Source / Rationale |
|---------|--------|-----------|-------------------|
| Content/SEO | 35% | $120 | Lenny's Newsletter PLG benchmarks 2024; SMB SaaS content-driven CAC range $50–$200. Favoured channel for compliance-keyword content (high intent, "modern award checker" searches). Benchmarks unavailable from live source — estimate. |
| Google Ads (PPC) | 30% | $350 | B2B SMB SaaS Google Ads CAC range $150–$600. Higher-cost but fastest path to buyers actively searching. Benchmarks unavailable from live source — estimate. |
| Industry newsletters / associations | 20% | $180 | HIA (Housing Industry Association), RCSA, NRMA, state chamber of commerce newsletters. CPA-tracked sponsorship. Estimate. |
| Referral / WOM | 15% | $60 | Low-friction self-serve; accountant/bookkeeper referral program. Estimate. |
| **Blended CAC** | 100% | **$192** | |

---

## 5. LTV, LTV:CAC, and CAC Payback

All calculations shown. All figures recomputed from corrected COGS.

```
Monthly churn (base):    2.5%/mo
Expected lifetime:       1 / 0.025 = 40.0 months
Annual churn equivalent: 1 - (1 - 0.025)^12 = 26.2%/yr

LTV = Gross Profit/mo × Expected Lifetime
    = $71.86 × 40.0
    = AUD $2,874        [was AUD $2,836]

LTV:CAC = LTV / Blended CAC
        = $2,874 / $192
        = 14.97x          [was 14.77x]  [Benchmark: healthy ≥ 3x]

CAC Payback = CAC / Gross Profit/mo
            = $192 / $71.86
            = 2.67 months  [was 2.70 months]  [Benchmark: healthy ≤ 12mo]
```

Both metrics are well above benchmark thresholds. The model is unit-economics healthy under base assumptions.

---

## 6. Break-Even: Units and Months

### Operational break-even (monthly contribution covers fixed costs)

```
Monthly fixed costs:  AUD $800/mo (tooling, base infra, admin)
GP per account/mo:    AUD $71.86
                                 [was $70.91]

Break-even accounts = $800 / $71.86 = 11.1 accounts  [was 11.3]
```

At 20 new accounts/month acquisition pace, the operational break-even is reached in **Month 1** (20 accounts on-boarded, net of negligible churn in month 1).

### Build-cost recovery (cumulative contribution vs AUD $77,200 build cost)

Assumes 20 new net accounts/month, 2.5% monthly churn, $71.86 GP/account/month, $800/mo fixed:

| Month | Accounts | Monthly contribution | Cumulative contribution |
|-------|----------|---------------------|------------------------|
| 1 | 20 | $637 | $637 |
| 3 | 59 | $3,405 | $6,080 |
| 6 | 113 | $7,302 | $24,153 |
| 9 | 163 | $10,914 | $53,343 |
| 10 | 179 | $12,058 | $65,401 |
| **11** | **194** | **$13,174** | **$78,574** |
| 12 | 210 | $14,261 | $92,836 |
| 18 | 293 | $20,240 | $199,771 |
| 24 | 364 | $25,377 | $339,569 |

**Build cost fully recouped at Month 11** (unchanged from prior model; the correction adds ~$1,374 of cumulative contribution by Month 11, crossing $77,200 in Month 11 as before).

---

## 7. Core SaaS Metrics Table

| Metric | Value | Benchmark band | Status |
|--------|-------|---------------|--------|
| ARPU (Pro, monthly) | AUD $79/mo | — | — |
| ARPU (blended, monthly) | AUD $74.50/mo | — | — |
| Gross margin (Pro) | **91.0%** | ≥70% healthy | HEALTHY |
| Monthly churn | 2.5% | ≤2% healthy, 3–5% watch, >5% concern | WATCH |
| Annual churn | 26.2% | ≤20% healthy | WATCH |
| Gross Revenue Retention (annual) | 73.8% | ≥80% healthy for SMB | WATCH |
| Net Revenue Retention (estimated) | ~97.5% | ≥100% healthy | WATCH |
| LTV (Pro, base) | **AUD $2,874** | — | — |
| LTV:CAC | **14.97x** | ≥3x healthy | HEALTHY |
| CAC Payback | **2.67 months** | ≤12mo healthy | HEALTHY |
| MRR at Month 12 (Pro, 20 acq/mo) | AUD $16,559 | — | — |
| ARR at Month 12 | AUD $198,702 | — | — |
| MRR at Month 24 | AUD $28,779 | — | — |
| ARR at Month 24 | AUD $345,344 | — | — |
| Rule of 40 (Month 12) | 97 (growth 7.8% MoM + GM 91.0%) | ≥40 healthy | HEALTHY |

The metric that matters most for this model: **annual churn / Gross Revenue Retention**. At 26.2% annual churn, the business is losing roughly one-quarter of its revenue base per year. The LTV:CAC remains healthy because unit economics per customer are strong, but sustained growth requires continuous new acquisition to offset churn. If monthly churn rises to 4%+, the retention floor is thin enough to prevent ARR from compounding meaningfully.

---

## 8. Sensitivity Analysis

### Tornado table (base: price=$79, churn=2.5%/mo, CAC=$192, AU domestic Stripe rate)

| Scenario | LTV:CAC | Payback | Delta on LTV:CAC | Rank |
|---------|---------|---------|-----------------|------|
| Churn -50% → 1.25%/mo | 29.94x | 2.7mo | +14.97 | 1 (upside) |
| CAC -50% → $96 | 29.94x | 1.3mo | +14.97 | 1 (upside) |
| Churn +50% → 3.75%/mo | 9.98x | 2.7mo | -4.99 | 1 (downside) |
| CAC +50% → $288 | 9.98x | 4.0mo | -4.99 | 2 (downside) |
| Price -20% → $63.2/mo | 11.73x | 3.4mo | -3.24 | 3 (downside) |
| Price +20% → $94.8/mo | 18.21x | 2.2mo | +3.24 | 3 (upside) |
| Stripe: all intl cards (3.5% + $0.30) | 14.64x | 2.7mo | -0.33 | 4 (minor) |

**Rank 1 driver (tied):** Churn and CAC have identical leverage on LTV:CAC mathematically (churn sets lifetime; CAC is the denominator). Churn is the decisive lever because it is harder to control operationally (depends on product stickiness, buyer behaviour, competitor actions) whereas CAC is partially controllable via channel mix.

**International card sensitivity:** Even if all transactions process at the international rate (3.5% + A$0.30), gross margin falls only from 91.0% to 89.2% and LTV:CAC falls from 14.97x to 14.64x — a rounding-level impact. The Stripe domestic/international split is not a material risk.

### Combined scenarios

| Scenario | Price | Churn/mo | CAC | LTV:CAC | Payback | GM | Verdict |
|---------|-------|---------|-----|---------|---------|-----|---------|
| Pessimistic | $39 (-20% from Starter $49) | 3.75% (+50%) | $288 (+50%) | 3.01x | 8.9mo | 83.4% | BORDERLINE (barely above 3x) |
| Base | $79 | 2.5% | $192 | 14.97x | 2.7mo | 91.0% | HEALTHY |
| Optimistic | $99 | 1.5% (-40%) | $144 (-25%) | 42.37x | 1.6mo | 92.4% | EXCELLENT |

### Break points on top driver (churn)

- LTV:CAC falls below 3.0x (minimum viable) when monthly churn exceeds **12.5%/mo**. The current base assumption of 2.5%/mo provides 5.0x headroom. Even doubling churn to 5%/mo leaves LTV:CAC at ~9.98x, well above threshold.

- The pessimistic combined scenario is the true break point: all three drivers moving adversely simultaneously (price floor $39, churn 3.75%, CAC $288) brings LTV:CAC to 3.01x — barely above the 3x viability floor. This requires a compounding of bad outcomes, not a single driver failure.

- Maximum viable CAC at base price/churn: AUD $958 (LTV / 3). Current blended CAC of $192 is at 20% of this ceiling — extreme headroom.

- Minimum viable price for LTV:CAC ≥ 3x at base churn/CAC: AUD $20.87/mo. Current pricing of $49–$149 is well above this floor.

---

## 9. Verdict

**VIABLE.**

The Modern Award Pay Compliance Checker clears all three unit-economics health thresholds under base assumptions:
- LTV:CAC 14.97x (threshold: ≥3x) — up from 14.77x on corrected Stripe rate
- CAC payback 2.67 months (threshold: ≤12 months) — unchanged in practical terms
- Gross margin 91.0% (threshold: ≥70%) — up from 89.8% on corrected Stripe rate

**Break-even point:** 12 paying accounts covers monthly operating costs (reached in Month 1 at 20 acquisitions/month). Build cost of AUD $77,200 is fully recouped at Month 11 under base assumptions.

**Single highest-leverage lever:** Monthly churn. At 2.5%/mo the model is healthy, but the annual churn of 26.2% means the business perpetually re-fills a leaky bucket. Reducing monthly churn from 2.5% to 1.25% (by deepening product stickiness — annual FWC update notifications, embedded audit trail, accountant-sharing features) doubles LTV and doubles LTV:CAC to ~29.9x. The obligation-driven nature of the product (FWC annual cycle, criminal liability) provides a natural churn floor that horizontal SaaS tools do not have; the key task is to activate that natural stickiness through product design.

**The model does not break unless three bad things happen at once** (Starter-tier pricing only + elevated churn + elevated CAC). Each individual stress is well within viable range.

---

## 10. Open Financial Risks

1. **Acquisition rate risk (Assumption A3):** The 20 accounts/month acquisition assumption is the most operationally uncertain variable. It drives the revenue ramp and build-cost-recovery timeline. If acquisition is 10 accounts/month, build-cost recovery slips to Month 20+. Mitigation: landing-page conversion test and pre-launch waitlist before committing to build.

2. **CAC inflation (paid channels):** Google Ads CPCs for compliance-adjacent B2B keywords (e.g. "payroll compliance Australia", "modern award checker") may be higher than the $350/acquisition estimate if competition from Employment Hero and Deputy increases. Mitigation: prioritise SEO/content and accountant-referral channels (lower CAC, more defensible).

3. **Churn seasonality:** Australian fiscal year ends 30 June. Customers may subscribe in Q4 (pre-June audit) and churn in Q1 (post-lodgement). This creates seasonal ARR volatility not captured in the flat 2.5%/mo model. Mitigation: annual billing option (reduces monthly churn by locking in revenue; offer 10% discount for upfront annual).

4. **Liability cap on build cost:** The $77,200 build cost assumes 14 weeks. The G0 estimate flags award-classification complexity (122 awards, 1,000+ classifications) as a risk that could extend timeline to 20–24 weeks, adding $25,000–$50,000 to build cost. At 24 weeks, build cost rises to ~$120,000 and build-cost recovery extends to Month 18. Still viable but reduces margin of safety.

5. **Platform dependency on Xero/MYOB APIs:** Xero/MYOB could introduce API pricing or restrict access to payroll data. CSV-first ingestion mitigates this but reduces stickiness for Pro/Business tier. Mitigation: ensure MVP ships with CSV capability before API integrations, so core value is not API-dependent.

6. **International card mix:** If a material share of subscribers use international-issued cards, Stripe fees rise from $1.64/mo to $3.06/mo per account. At 100% international cards, gross margin falls from 91.0% to 89.2% — negligible impact on verdict but should be monitored once transactional data is available.

---

## Sources (benchmark references used)

- David Skok, "SaaS Metrics 2.0" — forentrepreneurs.com (2023–2024 edition); live source unavailable, standard industry reference
- OpenView Partners, "PLG Benchmarks 2024" — openviewpartners.com; live source unavailable, standard industry reference
- Lenny's Newsletter, "What's a good CAC?" and SaaS benchmarks — lennysnewsletter.com (2024); live source unavailable
- SaaS Capital, "Key SaaS Metrics" (2024); live source unavailable
- Stripe AU pricing — stripe.com/au/pricing (2026-06-18); **verified live** — AU domestic rate 1.7% + A$0.30 confirmed; international rate 3.5% + A$0.30 confirmed
- Deputy AU pricing — deputy.com/au/pricing (2026-06-18); verified per opportunity-score.md
- FairWork Mate pricing — fairworkmate.com.au (2025); cited in opportunity-score.md
- ABS Counts of Australian Businesses (August 2025) — abs.gov.au; buyer-pool figures deferred to `research/` files (being corrected per C5/C6)

**Note:** No live benchmark database was reachable during this analysis (references/saas-benchmarks.md not present in repository). All benchmark ranges are cited to named, dated external sources. Numbers are decision-support estimates, not guarantees.
