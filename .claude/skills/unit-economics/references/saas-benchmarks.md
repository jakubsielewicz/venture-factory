# SaaS unit-economics — definitions, formulas, benchmark ranges

> Static reference. Verify freshness; the `pull_benchmarks.py` script grounds these in live comparables when a source is wired.

## Formulas
- **ARPU** = total recurring revenue ÷ active accounts (per month).
- **Gross margin** = (revenue − COGS) ÷ revenue. COGS = infra + payment fees + support + third-party APIs.
- **Customer lifetime (months)** ≈ 1 ÷ monthly logo churn.
- **LTV** = ARPU × gross margin × lifetime (months).
- **CAC** = fully-loaded acquisition spend ÷ customers acquired (per channel).
- **LTV:CAC** = LTV ÷ CAC.
- **CAC payback (months)** = CAC ÷ (ARPU × gross margin).
- **Break-even units** = fixed/build cost ÷ contribution margin per unit.
- **Net revenue retention (NRR)** = (start MRR + expansion − contraction − churn) ÷ start MRR.

## Benchmark bands (general SaaS; treat as orientation, not truth)
| Metric | Strong | Watch | Unhealthy |
|---|---|---|---|
| LTV:CAC | ≥ 3:1 | 1.5–3 | < 1.5 |
| CAC payback | ≤ 6 mo | 6–18 mo | > 18 mo |
| Gross margin | 75–85% | 60–75% | < 60% |
| Monthly logo churn | < 1% (mid-mkt), 1–2% (SMB) | 2–4% | > 5% |
| NRR | > 110% | 95–110% | < 95% |
| Rule of 40 (growth% + profit%) | ≥ 40 | 25–40 | < 25 |

## Notes for passive-income / bootstrapped ventures
- Fast payback (≤ 6 mo) matters more than a big LTV:CAC when there's no outside capital to float CAC.
- Usage/infra-heavy products carry lower gross margin — model COGS honestly; payment-processor fees alone are ~3%.
- A self-serve motion (low/no CAC) can make a thin-margin product viable; a sales-led motion usually can't at small scale.
