# Phase 0 Desk-Sizing — Go/No-Go — au-deriv-tax

Date: 2026-07-21 · Budget spent: ~3 research agents (~220k tokens) + assembly · Skill used: `desk-sizing`
Workbook: `phase0-sizing.xlsx` (tabs: Keywords, Communities, Evidence Log, Competitors, Summary) · Source CSVs alongside.

## The one-paragraph call

**Verdict: CONDITIONAL → HOLD.** The weighted search cluster lands at **~1,020 AU searches/mo** — inside the *conditional* band (800–1,500), not a pass — and the widen-the-wedge fallback (~600/mo, carried by `w8ben australia` and `us shares tax australia`) falls well short of its 3,000/mo rescue bar, so a broader "AU holders of US assets" repositioning is **not** rescued by search either. Community mining hit the numeric target (15 pain threads across 3 communities) but is **substantively weak**: only ~6 are true verbatim quotes (Aussie Stock Forums returned HTTP 403 on direct fetch), the pain that surfaces is *general* IBKR/CGT/FX-reconciliation friction rather than the options-assignment-specific pain the product is built for, the two most options-specific probes (`"wheel tax"`, `"assigned tax"`) returned **zero hits everywhere**, and **nothing is dated 2025–2026**. The three strongest quotes are genuinely usable landing copy — (1) *"the accountant's fees nearly tripled… they had to go through every individual international trade… and convert them to AUD"* [$ pain, Aussie Stock Forums 2021-10-31]; (2) *"manually input every options trade and multiplying each contract by 100x… very convoluted and time-consuming"* [hours, Sharesight 2021-07-06]; (3) *"[lack of options support] is the only thing stopping me from signing up to premium accounts"* [latent WTP, same thread] — but they're 3–5 years old and describe adjacent friction, not the wedge. **The sharpest risk:** the demand signal is real but thin, dated, and general-CGT-flavoured, while the product's differentiation lives in options-assignment/multi-leg handling for which there is *no measurable search demand at all* — you'd be building the hard part for a pain nobody is yet searching for by name. **What holds the thesis up is not demand volume but two supply-side facts:** Sharesight's options request has sat **~5 years acknowledged-but-unshipped** (strongest possible "gap is real and deprioritised" evidence), and AU trader-tax accountants charge **up to $6,600/yr** for options-involving returns (Munro's) — 10×+ the >$500/yr pain bar, making a $99-founding / ~$300/yr price obviously cheap. **Call: do not commit to a paid Phase 1 on this desk evidence alone; HOLD and close two cheap gaps first (below).** This reinforces, rather than overturns, the prior G0 PARK (conviction FAIL 17/100).

## Two cheap gaps to close before this converts to GO or KILL
1. **Manual, logged-in Reddit search** of the nine terms across r/AusFinance, r/fiaustralia, r/ASX_Bets, r/AusStocks, r/interactivebrokers, r/thetagang. Reddit was **unprobed, not empty** — WebFetch cannot reach reddit.com, so the "0 hits" is a tool limitation. This is the single biggest unknown; ~1 hour of human time.
2. **Verify the Tier-1 cluster in Google Ads Keyword Planner** (needs a login this session couldn't do). If real volumes confirm ~1,000/mo and Reddit is also quiet → **KILL/PARK**; if either materially exceeds estimate → re-open to a proper GO.

## If it clears — the assets are already harvested
- **Landing copy:** the three verbatim quotes above (unedited).
- **Pricing anchor:** $6,600/yr accountant fee → $99 founding / ~$300/yr reads as cheap.
- **Differentiation sentence:** "US trade journals give you options analytics; none give you an ATO-ready CGT/revenue report — we do both, Australia-first."
- **SEO backlog (weak-answer PAA wins):** `cgt event d2`, `is options trading taxable in australia`, `how to declare us options australian tax return`, `ato exchange rate us shares`.
- **Cell-A posting targets:** the 3 pain-thread communities — but note **zero grade-A channels**; Aussie Stock Forums (grade B) has a narrow admin-permission path, Whirlpool bans promotion outright.
- **Tripwire:** Google Alerts on "sharesight options" / "navexa options" / "australian options tax software" + monthly Sharesight changelog check. Sharesight closing its 5-year gap → reassess wedge before any build.

## Threshold table (Summary tab)
| Metric | Result | Threshold | Verdict |
|---|---|---|---|
| Weighted search cluster | ~1,020/mo | ≥1,500 pass · 800–1,500 conditional | **CONDITIONAL** |
| Widen-the-wedge cluster | ~600/mo | ≥3,000 to rescue | **FAIL** |
| Pain threads | 15 / 3 communities | ≥15 / ≥3 | **PASS count / WEAK substance** |
| Options-specific / recent | none; 0 hits on wheel+assigned; nothing 2025–26 | sought | **WEAK** |
| Oldest incumbent gap | Sharesight ~5 yr acknowledged | older = stronger | **STRONG** |
| Accountant anchor | up to $6,600/yr | supports >$500/yr | **STRONG** |

**Confidence caveat:** all search volumes are analyst estimates (no Keyword Planner/Ahrefs/Semrush access this session) and several forum quotes are WebSearch paraphrases (403 on direct fetch). Treat the numbers as directional; gaps #1–2 above are what make this final.
