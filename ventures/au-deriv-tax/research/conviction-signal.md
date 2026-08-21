# Conviction signal — au-deriv-tax

Generated: 2026-07-21
Scorer: opportunity-scout (Claude Sonnet 5)
Method: signal-harvest (live harvester unreachable — WebSearch/WebFetch fallback per skill instructions) → conviction-scoring

## Signal inventory

| tier | signal (excerpt) | dated source | engagement | tell |
|---|---|---|---|---|
| Product community forum | "Short and long call/put options" — users must "manually input every options trade and multiplying each contract by 100x"; entering options is "very convoluted and time-consuming"; no support for short positions or spreads without workarounds | [Sharesight Community Forum](https://community.sharesight.com/t/short-and-long-call-put-options/396) — thread opened 6 Jul 2021, 21 replies through Sep 2022 | 21 replies over 14 months | intensity + workaround |
| Product community forum | "[Lack of options support] is the only thing stopping me from signing up to premium accounts" | Same thread as above | 1 quoted user, part of the 21-reply thread | **WTP** (latent — contingent on feature) |
| Product community forum | Workarounds named: Google Sheets templates, zero-cost "custom investments," deferring tracking entirely rather than use Sharesight | Same thread | n/a | workaround |
| Product community forum | Tax-classification confusion raised in-thread: is options income "treated as income tax at my marginal rate," and interaction with FIF regime for overseas holdings | Same thread | n/a | confusion/complexity tell |
| Product community forum | "Please add derivatives support" — OP relies on "alternate platforms...that are mainly US based" to track CFDs/futures/options because Sharesight can't; explicit switching behaviour | [Sharesight Community Forum](https://community.sharesight.com/t/please-add-derivatives-support/722) — 20 Oct 2021, 2 replies | 2 replies (thin) | switching |
| General investing forum | AU investor using IBKR + Navexa manually logs FX rates trade-date-by-trade-date because "purchase price is based on exchange rate of day," citing RBA rates as the accepted source; confusion over which FX rate applies for reinvested USD | [Whirlpool Forums "Trading in US Market - Tax"](https://forums.whirlpool.net.au/archive/96yzlvpp) — 16–17 May 2024 | multi-poster thread | workaround + confusion |
| General investing forum | Thread asking "What should I use to work out my CGT with share trading?" — posters name Excel spreadsheets and a niche paid tool ("Stator," stator-afm.com) for **share** CGT; no options-specific tool named | [Aussie Stock Forums](https://www.aussiestockforums.com/threads/what-should-i-use-to-work-out-my-cgt-with-share-trading.4938/) (fetch blocked 403; found via search snippet) | unknown | adjacent WTP (pays for a share-CGT tool, not options) |
| Explainer/SEO content | AU accounting-firm content ("The taxman and ASX Options") explaining investor-vs-trader options tax treatment to a presumably confused reader base | [Emerald Financial](https://www.emeraldfinancial.com.au/the-taxman-and-asx-options/), [TradersCircle](https://www.traderscircle.com.au/the-taxman-and-asx-options/) — 25 May 2026 | n/a (produced content, not raw complaint) | proxy demand (search-driven content exists) |
| Negative search result | Targeted searches for r/AusFinance, r/ASX_Bets, and tastytrade-community threads specifically about options CGT/assignment/multi-leg/FX pain returned **no results** despite multiple query variants | WebSearch, this session, 21 Jul 2026 | 0 | **absence of signal** — flagged explicitly, not filled in with inference |
| Competitive-gap check (not a demand signal, but corroborating context) | Sharesight explicitly does not support derivatives (CFDs/futures/options) as tracked assets; Navexa supports options only via manual "Custom Investment" entry, not suited to complex/high-frequency instruments; TaxTank (shares/crypto) and eSTM/Securities Tax Manager (shares/managed funds, accountant-facing) show no options/derivatives coverage | Sharesight Help Centre; [Navexa Help Centre](https://help.navexa.com/en/articles/8878879-what-can-i-track-with-navexa-supported-assets-markets-exchanges); TaxTank support docs; [eSTM](https://www.estm.com.au/software.html) — all fetched 21 Jul 2026 | n/a | confirms a real functional gap exists — but gap ≠ demand |

**Trend trajectory:** Flat-to-thin. The two strongest raw threads are 4–5 years old (2021–2022) with modest engagement (21 and 2 replies); the one 2024 thread is about FX mechanics generally, not options-specific pain; no 2025–2026 viral or high-engagement thread was found despite direct, repeated searching of the exact communities named in the brief (r/AusFinance, r/ASX_Bets, tastytrade community, Aussie Stock Forums). No seasonality read possible from what was found. This reads as a real but quiet, low-visibility pain — not a loud, currently-trending one.

## Conviction scorecard

| candidate pain | F | I | W | A | product | score | verdict |
|---|---|---|---|---|---|---|---|
| AU active options/derivatives traders' tax/CGT-vs-revenue classification and multi-leg/assignment/FX complexity is unhandled by existing consumer tools | 3 | 3 | 3 | 4 | 108 | 17 | **FAIL** |

**Rationale per factor:**
- **Frequency = 3:** Recurs across 3 independent websites (Sharesight community, Whirlpool, Aussie Stock Forums), which clears the "one loud thread" floor — but all three are the *same source tier* (general investing/product forums); there is no cross-tier corroboration (no G2/Capterra reviews, no Upwork/Fiverr gigs for "options tax help," no job postings, no Reddit hits despite direct search). Anchor calls this "recurs across 2–3 independent sources" = 3, not the 5-anchor's "4+ independent source *types*."
- **Intensity = 3:** Real, named workarounds (Google Sheets, manual FX logging, custom-investment hacks, deferred tracking) and language like "very convoluted and time-consuming" clears "clear frustration" — but no quantified time/dollar cost ("we spend Xh/week") was found, which is what separates this from the 5-anchor.
- **WTP = 3:** One user states the missing feature is "the only thing stopping me from signing up to premium accounts" (real, but contingent/latent, not an existing payment for *this* problem). Adjacent paid tools exist and are used (Sharesight $18–23.25/mo, Navexa from ~$12–15/mo, a niche paid share-CGT tool "Stator") — proving AU investors do pay for CGT/portfolio tooling in general — but no evidence was found of anyone paying (accountant or tool) *specifically* for options/derivatives tax complexity.
- **Addressability = 4:** IBKR Flex Query API is free and accessible (confirmed); the operator's data-pipeline background and reusable "Remediant" ingestion+report pattern is a genuine fit. Held below 5 because Tastytrade — the other named data source — has suspended new AU account openings and is winding AU accounts to closing-only as of ~26 June 2026 (see opportunity-score.md §Data access), and correct ATO-rules classification (assignment/exercise/multi-leg/revenue-vs-capital) is not a thin-slice trivial build.

**Hard rule check:** no factor = 1, so the FAIL is on raw product/normalised score (108/625 → 17/100), not the hard-rule override. 17 is well inside the FAIL band (<35).

## Verdict: FAIL

The pain is real and technically well-founded (incumbents genuinely do not support options/derivatives; the ATO's investor-vs-trader distinction genuinely creates confusion) — but the *visible, current, loud* demand signal for it is thin: the strongest evidence is a 21-reply forum thread from 2021–2022, general FX-mechanics threads, and the notable **absence** of any 2025–2026 or Reddit/community-specific corroboration despite directly searching the exact channels named in the brief. This does not clear conviction-scoring's bar, which is deliberately demanding (requires near-uniform 4s/5s to reach PASS). Per the skill, a FAIL here would normally stop the pass short of sizing/scoring — this pass nonetheless completes the full `opportunity-score.md` workup because the operator's brief explicitly commissioned a one-shot deep dive covering licensure, the revenue-vs-CGT nuance, and data access regardless of the conviction outcome; those findings (especially the TASA framing and the Tastytrade AU exit) are independently load-bearing for the G2 decision even under a PARK/KILL.

## Validate next (before building)

1. **Fake-door test in the exact named channels** — post a single landing page ("automated ATO tax classification for IBKR options traders") with an email + $9 pre-order button directly (transparently, as market research) in r/ASX_Bets, r/AusFinance, the Aussie Stock Forums tax subforum, and as a linked reply in the two Sharesight community threads found above. Success metric: ≥30 signups or ≥5 pre-orders across ≥2 independent channels within 14 days. This directly tests whether desk research under-sampled gated/private communities (Discord, tastytrade's own now-shrinking AU user base) that don't show up in public search.

## Handoff to opportunity-scoring

**Demand:** Real but thin and dated — strongest signal is a 21-reply, 2021–2022 Sharesight community thread with a latent-WTP quote and named workarounds; no 2025–2026 or Reddit corroboration found despite direct search. Score Demand & search momentum low (2/5).
**WTP:** No direct evidence of payment specifically for options-tax handling; only adjacent-tool WTP (Sharesight/Navexa/Stator subscriptions for general CGT tracking) and one latent "would upgrade if this existed" quote. Score Monetisation clarity low-moderate (2/5).
