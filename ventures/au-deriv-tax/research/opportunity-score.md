# Opportunity Score — au-deriv-tax

Generated: 2026-07-21
Scorer: opportunity-scout (Claude Sonnet 5)
Idea: "ATO-grade tax and performance engine for Australian derivatives traders" — connect IBKR/Tastytrade, auto-classify every option trade (assignments, exercises, expiries, multi-leg spreads, FX-at-trade-date) under ATO rules, output an accountant-ready CGT report + performance analytics.

Conviction gate: **FAIL** (score 17/100 — see `research/conviction-signal.md`). This full workup is produced anyway per explicit operator brief (one-shot deep dive; the licensure, revenue-vs-CGT, and data-access findings below are independently load-bearing for G2 regardless of the conviction outcome).

---

## Framing

**Who pays:** Australian-resident active options/derivatives traders on IBKR (and, until recently, Tastytrade — see §Data access) who run multi-leg strategies (spreads, iron condors, the wheel) complex enough that spreadsheets and existing consumer portfolio tools break down.

**For what outcome:** A correctly-classified, ATO-consistent record of every option event (open/close, assignment, exercise, expiry, FX conversion at trade date) rolled into a report their accountant can use — provided the "CGT report" framing is even correct for this buyer (see §Revenue-vs-CGT finding below — it likely isn't, for the buyer as named).

**Why it could be low-ops (thesis, unverified):** IBKR Flex Query gives free, structured, scheduled data export; a rules engine encodes ATO's investor/trader tests once and runs continuously; the operator's reusable "Remediant" ingestion+entity-resolution+report-generation pattern is a plausible direct fit.

---

## (a) Licensure boundary — TASA verdict: **manageable-with-framing, not clear**

- The Tax Agent Services Act defines a "tax agent service" broadly (preparing/lodging returns, or giving advice a taxpayer could reasonably rely on to satisfy tax obligations) and the Tax Practitioners Board treats whether a given service crosses that line as "a question of fact" assessed case-by-case — there is **no blanket software carve-out**. [TPB(I) 39/2023 "What is a tax agent service?"](https://www.tpb.gov.au/tpbi-392023-what-tax-agent-service) (TPB, current as of search 21 Jul 2026); [TPB(GS) 14/2011 Digital service providers and TASA](https://www.tpb.gov.au/software-providers-and-tax-agent-services-act-2009-tpb-information-sheet-tpbi-092011) (TPB — direct fetch of full text failed twice on timeout; content described only via search-result summary, **unverified at full-text level — resolve at G1**).
- **Precedent found:** both named AU-founded incumbents operate this exact model without claiming TPB registration:
  - Navexa's CGT report/help content states explicitly: "This report is not tax advice," Navexa "does not lodge your tax return, choose a tax strategy for you, or provide personal tax advice," and the product is designed so "you can share the result with your accountant directly." [Navexa Help Centre, "Creating A Capital Gains Tax Report" / "How to: Get Tax Ready"](https://help.navexa.com/en/articles/8878839-creating-a-capital-gains-tax-report) (fetched 21 Jul 2026).
  - Sharesight's Australian CGT Calculator is described (via search-indexed content) as "a model, not tax advice — consult a registered tax adviser before acting." Pearler's help docs (Sharesight's integration partner) reiterate: "We are not a tax advisor and don't have any information about your personal situation." [Sharesight AU CGT Calculator](https://www.sharesight.com/au/australian-cgt-calculator/); [Pearler Help](https://pearler.com/help/dividends-tax/5788817-how-can-sharesight-help-me-with-performance-tracking-and-tax-reporting) (fetched 21 Jul 2026).
  - Neither company's TPB registration status (or absence of it) was directly confirmed on the TPB public register in this pass — **unverified, resolve at G1** (search a specific entity name on [myprofile.tpb.gov.au/public-register](https://www.tpb.gov.au/public-register)).
- **Verdict:** The pattern — calculate/report figures, explicit "not tax advice" disclaimer, output handed to the taxpayer's own (separately engaged) accountant, no lodgement, no personalised strategy advice — is a workable precedent. But the pitch's own language ("ATO-grade classification," "accountant-ready CGT report") skews toward the "advice a taxpayer could reasonably rely on" end of TPB(I) 39/2023's case-by-case test, especially since options assignment/exercise/multi-leg treatment genuinely requires judgment calls the incumbents avoid entirely by **not supporting derivatives at all**. This is a real, live risk, not a solved one — recommend a written TPB or lawyer opinion before committing marketing copy. **Not disqualifying, but not clear either.**

---

## (c) Revenue-account vs CGT-account — thesis-breaker finding: **the CGT framing is likely wrong for the named buyer**

- ATO guidance (via [ATO "Share investing versus share trading"](https://www.ato.gov.au/individuals-and-families/investments-and-assets/capital-gains-tax/shares-and-similar-investments/share-investing-versus-share-trading) — direct fetch returned HTTP 403 in this pass, content triangulated via secondary sources citing it) and ruling TR 97/11 assess traders on repetition/regularity, volume/scale, businesslike conduct (trading plans, journals, dedicated software), and profit intent — with **no single bright-line test**. Frequent trading (illustratively cited at ~50+ transactions/year in one secondary source) tips toward "carrying on a business," meaning gains are **ordinary/revenue-account income**, losses are fully deductible against salary, and the **50% CGT discount does not apply**. [Emerald Financial, "The taxman and ASX Options," 25 May 2026](https://www.emeraldfinancial.com.au/the-taxman-and-asx-options/); [swingfolio.com, "Trading as a Business in Australia," fetch blocked 403 — cited via search snippet only].
- The buyer as named in the pitch — "active" options/derivatives traders running systematic multi-leg strategies (spreads, the wheel, credit strategies) — is close to the **archetype** TR 97/11 uses to classify someone as a trader on revenue account, not an investor on capital account. If that's the case, "accountant-ready CGT report" is the **wrong deliverable**: these traders need a trading-income/P&L statement (ordinary income, full expense deductibility, no CGT discount), not a capital-gains schedule.
- Some subset of the buyer population — occasional option users hedging an underlying share portfolio — genuinely are investors on capital account, so the correct product is not "replace CGT with revenue" but "classify which regime applies, per trader, and produce the right report for each" — a materially harder, dual-mode build than the original one-line pitch implies.
- **Verdict:** confirmed thesis risk, not resolved in the idea's favour. This is the single most important reframe for the wedge (see §Sharpened wedge).

---

## (d) Data access — mixed, with a load-bearing negative finding

- **IBKR:** Flex Web Service (Flex Query API) is free on all account types, no subscription/minimum required, rate-limited to ~1 request/second/token, and explicitly available to Interactive Brokers Australia Pty Ltd (AFSL 453554) clients. [IBKR Campus, "Flex Web Service"](https://www.interactivebrokers.com/campus/ibkr-api-page/flex-web-service/); [IBKR Australia reporting page](https://www.interactivebrokers.com.au/en/whyib/reporting.php) (fetched 21 Jul 2026). **Confirmed, positive.**
- **Tastytrade — negative, load-bearing finding:** tastytrade has **suspended new account openings for Australian residents** and, as of approximately 26 June 2026, is converting existing AU accounts to **"closing only"** (existing positions can be closed; no new positions, rolls, or new spreads can be opened) while it conducts an unspecified "strategic review" with no confirmed date to resume AU operations. [optionstradingiq.com, "tastytrade Australia: What's Happening and What to Do Next"](https://optionstradingiq.com/tastytrade-australia/), citing tastytrade's own communications, dated ~30 May 2026; corroborated by a live community thread on the topic, ["Tastytrade offering for AU clients"](https://optionalpha.com/community/posts/tastytrade-offering-for-au-clients-2026052917433). **This is very recent (weeks before this research pass) and was not independently re-confirmed on tastytrade's own AU support pages in this session — treat as high-confidence but resolve directly at G1.**
- **Consequence:** the pitch's "connect your IBKR / Tastytrade account" is now effectively "IBKR account" for any *new* Australian customer. This is not fatal (IBKR is the larger, more general-purpose venue and already has better free API access than Tastytrade's more restricted AU automation story), but it materially narrows the addressable population — Tastytrade's own platform is specifically built around multi-leg options selling (spreads, the wheel), i.e. exactly the trader segment with the most complex tax-classification pain. Existing Tastytrade AU account holders (closing-only) are a shrinking, not growing, population and cannot generate new multi-leg trade data going forward.
- **Verdict:** IBKR-only integration is technically sufficient to build on, but the total addressable population is smaller than the original two-broker pitch implied, and the most tax-complexity-generating cohort (active multi-leg options sellers) is disproportionately affected by the Tastytrade exit.

---

## (b) Real demand — see `research/conviction-signal.md` for the full inventory

Summary: real but thin, dated (2021–2022 peak), and not corroborated in the specific channels named in the operator's brief (r/AusFinance, r/ASX_Bets, tastytrade community, Aussie Stock Forums) despite direct search. Conviction score: **17/100 — FAIL**. Strongest single data point: a Sharesight community member states missing options/derivatives support "is the only thing stopping me from signing up to premium accounts" (21-reply thread, Jul 2021–Sep 2022) — real but latent WTP, not existing spend on this specific problem.

---

## Market sizing (bottom-up) — **denominator unavailable from a named primary source; sizing is a G1/G2 blocker**

Per the market-sizing skill's rule, the entity/operator count denominator must come from a named primary source (ABS/ASIC/ASX/regulator). None was found for "AU-resident active options traders with complex enough books to plausibly pay":

| Input | Value | Source / status |
|---|---|---|
| Interactive Brokers Group global client accounts | 5.185 million (end of June 2026), up 34% YoY | IBKR Group brokerage metrics 8-K, via Yahoo Finance/Globe and Mail coverage, dated Jul 2026 |
| IBKR Australia-specific account count | **Not published / not found** | Searched directly; no primary source located |
| ASX/ASIC options retail participant count (AU-resident) | **Not published / not found** | ASIC REP 828 (Jan 2026) breaks out CFD-issuer client counts, not IBKR options clients specifically; not retrieved at row-level detail in this pass |
| AU retail investor population (all asset types) | "approximately 1.5 million" (unsourced secondary claim) | Low-confidence, no primary citation found — **do not use as a base-case input** |

**Because no sourced denominator exists, this is labelled RISK, not a base case, per the market-sizing skill's explicit rule.** An illustrative-only, heavily-caveated scenario (every input RISK-flagged, not to be used as an operative planning number):

- IF Australia ≈ 1% of IBKR's global client base (unsourced placeholder) → ~52,000 AU IBKR accounts (RISK)
- IF 10–20% of those actively trade options (unsourced; options traders are typically a minority of any brokerage's base) → ~5,200–10,400 AU IBKR options traders (RISK)
- IF 20–30% of those have complex-enough books (multi-leg/assignment/exercise activity in a year) to plausibly pay → ~1,000–3,100 target users (RISK)
- IF Year-1 adoption is 2–5% at ~$30–50/month AUD → **~20–155 paying customers, ~AUD $7,200–$93,000 Year-1 revenue** (RISK range, illustrative only)

**Verdict on sizing:** Cannot be stated with confidence. The operative, defensible position is: **the obtainable slice is unknown and plausibly small** (low tens of thousands of AUD in Year 1 at the low end of the illustrative range). This is the single most sensitive input in the whole assessment and is flagged as a **hard G1/G2 blocker** — do not commit capital against this sizing without a sourced denominator (e.g. a direct enquiry to IBKR Australia, or an ASX/ASIC data request).

---

## Competitor teardown

| Competitor | Positioning | Pricing (published) | Derivatives/options coverage | Gaps | Last updated |
|---|---|---|---|---|---|
| **Sharesight** | AU-founded portfolio tracker + CGT reporting, broad brand recognition | Investor plan $18.00/mo AUD, Expert $23.25/mo AUD (via SaaSWorthy, Jul 2026 — verify on sharesight.com/au/pricing) | **None.** Explicitly does not support derivatives (CFDs, futures, options) as tracked assets; can only be forced in as a manual "custom investment" | No automated options tracking at all; users explicitly cite this as a reason to use other tools | Feature requests open since 2021, unresolved as of this search (Jul 2026) |
| **Navexa** | AU-founded portfolio tracker + tax reporting, positions itself for tax time and accountant hand-off | Basic/Standard/Premium/Pro tiers, roughly $12–15+/mo (currency of cited figure unclear — **verify at G1**) | Options/futures/CFDs supported only via manual "Custom Investment" entry — not broker-integrated, explicitly "not ideal" for complex/intraday derivatives per their own help docs | No assignment/exercise/multi-leg logic; manual entry burden reproduces the exact pain the pitch targets | Help docs current as of Jul 2026 fetch |
| **eSTM / Securities Tax Manager** | Accountant-facing (not consumer) CGT software for AU shares & managed funds, since well before this research window | **Not published** — accountant/institutional sales model | None found — product literature covers shares, managed funds, stapled securities, corporate actions; no mention of derivatives | Wrong buyer (accountants, not traders) and wrong asset class | Site content, fetched Jul 2026 |
| **TaxTank** | Newer AU personal tax/finance app with an automated CGT calculator for shares & crypto | Plans exist (not itemised in this pass) | **Not confirmed** — no options/derivatives-specific documentation found despite search | Unclear/likely absent options support; **unverified, resolve at G1** | 2025–2026 content |
| **Koinly / CryptoTaxCalculator** (disconfirming-evidence check) | Crypto-first tax tools, AU-localised, both claim broad "derivatives" support | Koinly free tier + paid plans (published on koinly.io/pricing) | Support is for **crypto** derivatives/margin/futures on crypto exchanges — not equity/ASX/US-listed options via a stock broker. Not a real competitor for this wedge. | N/A — different asset class entirely | 2026 content |
| **IBKR's own AU tax reports** | Broker-native realised/unrealised gain reports (FIFO or specific-lot), Tax Optimizer, Tax Loss Harvest tool | Free (bundled with brokerage account) | Provides raw realised-gain data including options, but **not** ATO-specific classification (no investor-vs-trader test, no AU tax-form-ready output, no assignment/exercise ATO-treatment logic) | Requires the trader (or their accountant) to still do the ATO-specific interpretation manually | Ongoing IBKR product |
| **"The spreadsheet"** (status quo) | Manual tracking, confirmed in the Whirlpool and Sharesight threads as the default fallback | Free (time cost only) | Full coverage in theory, zero automation, error-prone for multi-leg/FX-at-trade-date | The default nobody has escaped from yet — no evidence people are paying to avoid it specifically for options | Ongoing |

**Wedge thesis (one sentence):** No incumbent — consumer (Sharesight, Navexa, TaxTank) or accountant-facing (eSTM) — automates ATO-consistent classification of options assignment/exercise/multi-leg/FX-at-trade-date events; the functional gap is real and confirmed by direct product-documentation checks, but this pass found no strong evidence anyone is currently paying to close it.

**Platform dependency:** Moderate-high. Post-Tastytrade-exit, the product would depend on a single broker's (IBKR's) Flex Query API remaining free and stable — IBKR is large and stable, lowering (but not eliminating) this risk relative to a smaller platform.

**Switching costs:** Low at launch (no incumbent owns this data), rising over time if a multi-year classified trade history accumulates in the product.

---

## Six hard gates

| # | Gate | Verdict | Basis |
|---|---|---|---|
| 1 | ≤90-day launch feasible at 10–15 hrs/week solo | **FAIL / marginal** | Correctly encoding ATO assignment/exercise/multi-leg/FX-at-trade-date rules *and* a revenue-vs-capital classifier (a dual-mode build per §c) is not a thin-slice MVP; at 10–15 hrs/week that is roughly 130–195 hours over 90 days — plausible for a data-pipeline-experienced operator to ship an IBKR-only, single-classification-mode MVP, but a **correctness-liability product** (wrong tax figures are a real harm) demands more QA than a typical 90-day SaaS MVP. Marginal, not a clean pass. |
| 2 | ≤$5k AUD capital to first revenue, itemised | **PASS (plausible)** | IBKR Flex Query is free; hosting/Supabase/compute for an MVP is low (roughly: domain+hosting ~$200–500/yr, Supabase free/low tier, no data licensing cost found, a paid legal/TPB opinion ~$1,000–3,000 recommended given §a — still inside $5k). Itemisation is illustrative, not vendor-quoted — **unverified at G1**. |
| 3 | Evidence of EXISTING paid pain (not just annoyance) | **FAIL** | Conviction score 17/100 (FAIL). Strongest evidence is a latent "would upgrade if this existed" quote, not existing spend on this specific problem. See conviction-signal.md. |
| 4 | Nameable, reachable first-10-customers channel | **PARTIAL PASS** | Channels ARE nameable: r/ASX_Bets, r/AusFinance, Aussie Stock Forums, the Sharesight community forum (post directly in the two threads found), tastytrade's own remaining AU user base (shrinking but real, motivated to migrate). Reachability confirmed structurally; actual responsiveness of these channels to this specific pitch is **untested** (see kill test). |
| 5 | Defensibility beyond raw model capability | **WEAK** | The classification *logic* (ATO rules encoded as a rules engine) is not, by itself, defensible — a competitor could plausibly prompt an LLM to approximate it. Real defensibility would come from (a) a verified, audited-correct data pipeline (IBKR Flex ingestion + entity resolution, matching the operator's reusable pattern) and (b) accumulated multi-year trade history per user (switching cost) — neither exists yet. |
| 6 | Real why-now catalyst | **NONE — steady-state pain, stated explicitly** | No regulatory deadline, no incumbent shutdown, no new ATO ruling found that changes the picture in 2026. This is steady-state pain (options have always been taxed this way; incumbents have never supported them). Per the brief's own instruction, steady-state pain can still PURSUE on demand strength alone — but demand strength here is exactly what conviction-scoring found weak (17/100). |

**Score: 1 clean PASS, 1 partial PASS, 1 marginal, 3 FAIL/WEAK/NONE.** This does not clear the bar for a confident PURSUE.

---

## Opportunity scorecard

| Dimension | Weight | Score (1–5) | Weighted | Rationale |
|---|---|---|---|---|
| Demand & search momentum | 0.25 | 2 | 0.50 | Conviction gate scored 17/100 (FAIL). Real but thin, dated (2021–2022 peak) signal; no 2025–2026 or Reddit corroboration found despite direct search of the named channels. |
| Monetisation clarity / WTP | 0.20 | 2 | 0.40 | Only latent/adjacent WTP evidence (one "would upgrade if this existed" quote; general willingness to pay for adjacent CGT tools like Sharesight/Navexa/Stator, not for this specific problem). No evidence of accountant fees paid specifically for options complexity. |
| Passive-fit: low ongoing ops after build | 0.20 | 3 | 0.60 | Once correctly built, classification is largely rule-based and low-touch — but ATO guidance/TR rulings can shift, and a correctness-liability product plausibly needs an ongoing "is this still right" review cadence, which is real ops, not zero. |
| Build feasibility (solo/small team) | 0.15 | 3 | 0.45 | Operator's reusable Remediant (ingestion + entity-resolution + report-generation) pattern is a genuine, named fit; IBKR Flex Query is accessible. Held to 3 (not 4–5) because a dual-mode (revenue-vs-capital) classifier plus TASA-safe UX/copy is materially harder than the original one-line pitch, and correctness bar is high for a tax product within a 10–15hr/week, 90-day budget. |
| Defensibility / moat potential | 0.10 | 2 | 0.20 | **Capped low, not just at the rubric's inference cap** — no incumbent directly competes today (a genuine functional gap), but the core logic is replicable by a well-prompted LLM plus a data pipeline; no accumulated data moat exists yet. Crowding check: 0 direct competitors found chasing this exact mandate (below the >3 crowding threshold), which is itself ambiguous — could mean open lane, could mean no one has found it worth building, which cuts against, not for, defensibility. |
| Regulatory drag (inverse — 5 = none) | 0.10 | 2 | 0.20 | TASA boundary is real and unresolved at full-text/registration-check level (§a); the product's own marketing language ("ATO-grade") currently sits closer to the risky end of TPB(I) 39/2023's case-by-case test than the Sharesight/Navexa precedent does. Meaningful, not catastrophic, drag. |

**Raw weighted sum:** 0.50 + 0.40 + 0.60 + 0.45 + 0.20 + 0.20 = **2.35**
**Score:** 2.35 × 20 = **47 / 100**

---

## Score: 47 / 100
## Verdict: PARK

---

## Disqualifier check

- **Hard legal block:** Not triggered — TASA verdict is "manageable-with-framing," not disqualifying, based on the Sharesight/Navexa precedent. But this is **unverified at full-text/registration level** and should be treated as a live risk, not a cleared one.
- **Single-platform dependency:** Elevated but not disqualifying. Post-Tastytrade-AU-exit, the product depends on IBKR's Flex Query API remaining free and stable. IBKR is a large, stable, ASX-regulated (AFSL 453554) entity, which mitigates but does not eliminate this risk.
- **Zero willingness-to-pay:** Not a confirmed zero (adjacent-tool WTP + one latent quote exist), but WTP for *this specific* problem is unproven — the conviction gate FAILed on exactly this basis.

**No automatic KILL triggered — but none of the disqualifier checks come back clean either.**

---

## Verdict narrative

This idea rests on a real, confirmed functional gap: no AU consumer or accountant-facing tool (Sharesight, Navexa, TaxTank, eSTM) automates ATO-consistent classification of options assignment, exercise, multi-leg spreads, or FX-at-trade-date, and IBKR's own reports leave the ATO-specific interpretation to the trader. The operator's data-pipeline background and reusable ingestion/report-generation pattern are a genuine fit for closing that gap. But three findings keep this out of PURSUE territory. First, the demand signal is thin and dated — the conviction gate scored 17/100 (FAIL), built on a 2021–2022 forum thread and general FX-mechanics discussion, with no 2025–2026 or Reddit corroboration found despite direct search of the exact communities named in the brief. Second, the pitch's central deliverable is likely mis-specified: ATO's investor-vs-trader test (TR 97/11) means active, systematic options traders — the named buyer — are plausibly on revenue account, not capital account, making "accountant-ready CGT report" the wrong product for a meaningful share of the target user base. Third, Tastytrade — half of the named data-source pitch — suspended new Australian account openings and is winding existing AU accounts to closing-only as of ~late June 2026, narrowing the addressable population right as this research was conducted, and disproportionately affecting the multi-leg-options-seller segment most likely to have complex tax pain. None of these is individually disqualifying — the TASA framing has a workable precedent, IBKR alone is a sufficient data source, and a dual-mode classifier is a buildable (if harder) product — but together they mean this is not yet a confident bet. The wedge should be sharpened (see below) and demand should be tested directly, cheaply, before any capital is committed.

---

## Sharpened wedge (if the CGT framing is wrong, what's the corrected framing?)

Reframe from *"ATO-grade tax and performance engine → accountant-ready CGT report"* to: **an IBKR-only trade-classification and decision-support tool that (1) auto-classifies every option event (assignment/exercise/expiry/multi-leg/FX-at-trade-date) from Flex Query data, (2) surfaces the ATO's TR 97/11 investor-vs-trader factors as a guided, evidence-based worksheet (not a determination) so the trader and their own accountant can decide which regime applies, and (3) outputs BOTH a capital-account CGT schedule and a revenue-account trading-income/P&L statement, letting the accountant pick.** Position it explicitly like Navexa ("not tax advice — share this with your accountant") rather than "ATO-grade," to stay inside the software-not-advice precedent. This is a narrower, more honest, and more defensible product than the original pitch.

## Cheapest kill test (<$500, <2 weeks, pre-committed threshold)

Build a single-page fake-door landing page for the sharpened wedge above, with an email-capture form and a $9 AUD "reserve founding pricing" pre-order button (Stripe test mode is free; a real Stripe charge costs only transaction fees, well under $500 for a two-week test). Post it transparently (as market research, not spam) in: r/ASX_Bets, r/AusFinance, the Aussie Stock Forums tax subforum, and as a direct linked reply in the two Sharesight community threads identified in `conviction-signal.md`. **Pass threshold: ≥30 email signups OR ≥5 pre-orders, from ≥2 independent channels, within 14 days. Fail: <10 signups total → KILL.**

---

## Top 3 G1 unknowns

1. **Does the fake-door kill test above actually produce signups?** This is the single highest-value unknown — it directly tests whether this session's desk research under-sampled real demand (e.g. gated Discord communities, tastytrade's own remaining AU base) or whether the FAIL conviction score reflects genuinely thin demand.
2. **A written TASA/TPB opinion (or a direct TPB enquiry)** confirming the "software, not advice" framing holds specifically for a product that (a) makes an investor-vs-trader determination surface (even if framed as a worksheet, not a verdict) and (b) markets itself with "ATO-grade" language — the current verdict is desk-research inference, not a professional opinion, and TPB(I) 39/2023 is explicitly case-by-case.
3. **Direct field-level verification of IBKR Flex Query's actual coverage** for options assignment/exercise linkage and multi-leg-spread grouping (does the raw XML actually let you programmatically tie an assignment back to its originating short option, and group multi-leg fills into a single strategy, or does that require manual judgment that can't be fully automated?) — plus direct confirmation on tastytrade's own AU support pages that the account-suspension finding (sourced via a secondary blog in this pass) is accurate and current.

---

## Evidence base (dated sources)

| Claim | Source | Date |
|---|---|---|
| TASA "tax agent service" test is case-by-case, no software carve-out | TPB(I) 39/2023, TPB(GS) 14/2011 | Current TPB guidance, accessed 21 Jul 2026 |
| Navexa: "not tax advice," no lodgement, "share with your accountant" | Navexa Help Centre | Accessed 21 Jul 2026 |
| Sharesight AU CGT Calculator: "a model, not tax advice" | Sharesight AU CGT Calculator page; Pearler Help | Accessed 21 Jul 2026 |
| ATO investor-vs-trader factors (TR 97/11): repetition, volume, businesslike conduct, profit intent | Emerald Financial "The taxman and ASX Options" | 25 May 2026 |
| Sharesight does not support derivatives (CFD/futures/options) as tracked assets | Sharesight Community Forum, two threads | Threads opened 6 Jul 2021 and 20 Oct 2021, active through Sep 2022 |
| Navexa supports options/derivatives only via manual "Custom Investment," not suited to complex instruments | Navexa Help Centre, "What can I track with Navexa?" | Accessed 21 Jul 2026 |
| eSTM/Securities Tax Manager covers shares/managed funds only, accountant-facing, no derivatives | eSTM software page | Accessed 21 Jul 2026 |
| IBKR Flex Query API is free, all account types, ~1 req/sec rate limit | IBKR Campus "Flex Web Service" | Accessed 21 Jul 2026 |
| Tastytrade suspended new AU account openings; existing AU accounts moving to closing-only ~26 Jun 2026 | optionstradingiq.com "tastytrade Australia: What's Happening and What to Do Next" | Article dated ~30 May 2026, describing a ~26 Jun 2026 effective date — **secondary source, not independently re-confirmed on tastytrade.com in this pass, resolve at G1** |
| IBKR Group: 5.185M global client accounts, end of June 2026, +34% YoY | IBKR Group brokerage metrics 8-K, via Yahoo Finance/Globe and Mail | Reported Jul 2026 |
| Sharesight pricing: Investor $18.00/mo, Expert $23.25/mo AUD | SaaSWorthy (secondary aggregator, not sharesight.com/au/pricing directly) | Accessed Jul 2026 — **verify directly at G1** |
| No AU-specific IBKR account count or ASX/ASIC retail options-trader count found | This session's direct search | 21 Jul 2026 — **absence of evidence, hard G1/G2 sizing blocker** |

**Verify before G2:** the Tastytrade-exit finding (currently single-secondary-sourced), the TPB registration status of Sharesight/Navexa (not directly checked against the public register), full text of TPB(GS) 14/2011 (fetch timed out twice), and — most importantly — a sourced denominator for the target population, without which the market-sizing verdict cannot move past "unknown, plausibly small."
