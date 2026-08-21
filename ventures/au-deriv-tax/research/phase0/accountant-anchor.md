# Accountant anchor -- Phase 0, Block 3.3 (au-deriv-tax)

Pure capture. Not scored. Searches run 2026-07-21: "trader tax accountant australia", "options trading tax return accountant", "specialist trading accountant Australia day trader tax return options/derivatives", "trading tax accountant Australia CGT trader ordinary income specialist firm pricing package".

## Firms found (5)

1. **Munro's (Perth, WA)** -- share-trading tax specialists, explicit published tiered pricing (rare -- most competitors are quote-only):
   - Long-term investor, domestic-only: from $770/yr incl. GST
   - Long-term investor, international: from $2,200/yr
   - Trader (business classification), modest affairs: $3,300/yr
   - Trader, intermediate affairs -- **"typically involve multiple exotic transactions including derivatives/options/forex"**: $6,600/yr
   - Trader, complex affairs: $12,000/yr
   - Source: munros.com.au/share-trading-accounting/tax-return/ (accessed 2026-07-21)
   - This is the single strongest anchor point: Munro's own pricing copy names "derivatives/options/forex" as the defining feature of its $6,600/yr *intermediate* tier -- i.e. the market already prices options/derivatives trading tax work at >10x a founding-tier SaaS price ($99), and ~20x a $300/yr target ARPU.

2. **Kova Tax** -- has a dedicated "Derivatives Trading" service page (kovatax.com.au/services/derivatives-trading), explicitly positions on CFD/derivatives trader tax. No published price; "contact us for a quote" only. Source accessed 2026-07-21.

3. **Nobel Thomas (Melbourne, VIC)** -- publishes trader-tax guidance content ("Day Trading and Tax in Australia -- A Trader's Guide") and offers individual/sole-trader/trust tax returns; general fee-guide content exists (nobel.com.au/news/how-much-does-an-accountant-in-melbourne-charge/) but no options/derivatives-specific price point found. Quote-only for actual engagements. Source accessed 2026-07-21.

4. **New Wave Accounting (Gold Coast, QLD)** -- markets tailored solutions for "trading and financial markets activities"; no published pricing found for trading-specific returns. Source accessed 2026-07-21.

5. **Mactep Private** -- publishes trader-vs-investor tax-treatment guidance ("Understanding the Tax Outcomes: Trader vs Investor in Australia"), positioning as advisory for traders; no published price found. Source accessed 2026-07-21.

## General market fee context (not options-specific, but corroborating range)

- Straightforward individual tax return: $100-$250 (sleek.com/au/resources/cost-of-tax-accountant-in-australia, accessed 2026-07-21)
- Sole trader / business-income return: $300-$1,200 depending on complexity (sleek.com, airtasker.com/au/costs/tax-accountants, accessed 2026-07-21)

## Verdict on the ">$500/yr" pain claim

**Supported.** Munro's published pricing puts a trader with options/derivatives/forex activity ("intermediate affairs") at **$6,600/yr** -- more than 10x the >$500/yr threshold -- and even a "modest" business-trader return is $3,300/yr, still 6-7x the threshold. The other four firms corroborate that specialist/complex trader returns sit meaningfully above generic-return pricing (general sole-trader range tops out around $1,200 before any options/derivatives complexity is added), even though most are quote-only rather than published. This independently evidences that a $99 founding / ~$300/yr SaaS price is cheap by comparison to the accountant-hours alternative for an options/derivatives trader -- it would need to save only a small fraction of a Munro's-style engagement to be a clear win on price alone (separate from the time/accuracy value prop).

**Caveat:** Munro's $6,600 tier is Perth-based and may sit above national average; it is the only firm with a fully published number, so it is doing a lot of the evidentiary work here. Treat the >$500/yr claim as strongly supported by this one hard data point plus directional corroboration from the other four, not as a broad statistical average -- worth widening the accountant sample at G1 if this number needs to hold up under scrutiny.

## Recommended tripwires (human action required -- not settable by the agent)

Set the following Google Alerts (email or RSS, monthly digest is sufficient cadence for a slow-moving incumbent space):
1. `sharesight options`
2. `navexa options`
3. `australian options tax software`

Additional recommended monitoring:
4. **Monthly manual check of the Sharesight changelog / "What's New"** (community.sharesight.com/c/whats-new, and the public sharesight.com blog/changelog) for any options-support announcement -- Sharesight is the incumbent with the largest, most-engaged, staff-acknowledged backlog request (2021-07-06, 20+ supporters), so it is the single highest-risk mover if it ever reprioritises.
5. Optional: watch TradesViz's `/international/` page and release notes specifically -- of the four US journals probed, it is the only one already marketing explicit Australian market/broker support (see competitors.csv, `partial` rating), making it the nearest thing to a platform that could bolt on AU tax output.

`tripwire_set` is marked `recommended` (not `set`) in competitors.csv for every row -- these are alerts for a human to configure, not something this agent session can create.
