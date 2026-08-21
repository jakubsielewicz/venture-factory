# Phase-0 desk-sizing — Block 1 (Search demand)

## Block 1 summary

**Tooling reality:** Google Ads Keyword Planner was not reachable in this session. All volumes in `keywords.csv` are **best-effort estimates**, triangulated from (a) analyst judgment against comparable AU finance/tax keyword categories, (b) the presence/absence and count of dedicated competing content found via WebSearch (a proxy for commercial interest, not for volume), and (c) live ATO Community forum threads (a proxy for genuine recurring user confusion, not for volume). No autocomplete or PAA UI was directly queryable either; PAA-style questions were reconstructed from the phrasing search engines surfaced in result snippets during the WebSearch sweep and are marked `*-mined` in the tier column. Treat every number as **directional, not authoritative** — actual figures could plausibly be off 2–5x in either direction. Before committing paid-channel or SEO-priority spend, re-run this list through a real Keyword Planner / Ahrefs / Semrush account.

**Weighted cluster total (full Tier 1 + full Tier 2 + 50% Tier 3, excluding/down-weighting flagged-ambiguous terms, incl. mined additions):** **≈1,020 AU searches/month**
  - Tier 1 (weighted, "options trading journal" down-weighted to 25%): ≈273/mo
  - Tier 2 seed: ≈520/mo
  - Tier 2 mined additions ("day trading tax australia" down-weighted to 25%): ≈140/mo
  - Tier 3 seed (at 50% weight): ≈85/mo
  - Tier 3 mined additions (at 50% weight): ≈5/mo

**Widened cluster total (fallback — "all AU holders of US assets" framing, standalone, not stacked on top of the weighted cluster above):** **≈600 AU searches/month**
  - Dominated by `w8ben australia` (≈320/mo) and `us shares australian tax return`-adjacent `us shares tax australia` (≈110/mo).
  - If the venture ever repositions from "options/derivatives tax" to "any US-asset AU tax reporting," the addressable search surface roughly **1.6x's** to ≈1,600/mo combined — but that's a different (broader, more contested) product than the one framed in `brief.md`.

**Terms flagged ambiguous / down-weighted:**
  - `options trading journal` (Tier 1) — primarily performance-journaling/analytics intent, not tax-motivated. Weighted at 25%.
  - `day trading tax australia` (Tier 2-mined) — broad, covers all active trading (mostly equities), not options-specific; large raw volume (≈320/mo) but diluted intent. Weighted at 25%.
  - `interactive brokers ato` (Tier 1) — noted as mildly ambiguous (could include company/GST tax) but kept at full weight per the given tiering; flag only, no down-weight applied.
  - `sharesight alternative` — noted as broader "portfolio tracker switching" intent rather than purely tax, but several of the found alternative-listing pages already lead with options support as their differentiator, so it was judged close enough to the wedge to keep at full weight.

**Terms genuinely unable to estimate (marked `unknown` in CSV, not fabricated):** `tiger brokers tax statement australia`, `moomoo tax report australia`, `sold put tax australia`, `how are assigned puts taxed ato`, `exercised option cost base ato`, `multi-leg option strategy tax ato`. Notably, `multi-leg option strategy tax ato` returning zero surfaced signal should **not** be read as an absence of pain — it's the single most-cited functional gap in the prior G0 competitor teardown (Sharesight/Navexa/TaxTank/eSTM all fail here); the likelier explanation is immature search vocabulary among the target buyer, not immature demand.

**Google Trends sanity read (Australia, 5yr) — described qualitatively, no direct Trends UI access this session:**
  - **"Interactive Brokers"** — directionally **growing**. Multiple dated (2025–2026) independent broker-comparison sites (StockBrokers.com, BrokerChooser, Investing.com AU, Arielle.com.au) currently rank IBKR as the top international/AU broker pick, and IBKR's own AU-localized marketing/support footprint (au domain, AU-specific tax pages) suggests continued AU investment — consistent with a growing brand-search trend, though no raw index value was obtained.
  - **"Options trading"** — read as **stable-to-growing** but with a caveat: the only quantitative proxy found was a general "day trading" AU Google Trends Index of 100 in 2025 cited by BrokerChooser's 2026 stats page, which is a *day-trading*, not *options-specific*, proxy — treat as weak corroboration only. ASX itself reported Q1 2026 trading volumes up 23% QoQ / 32% YoY, but that figure is whole-of-equity-market, not options-specific, so it's directional context, not a term-level read.
  - **"IBKR"** (abbreviation) — no distinct signal found; assumed to track the "Interactive Brokers" brand-search trend directionally, likely at lower absolute volume as the shorthand skews toward existing/technical users.

**Highest-volume terms overall (raw, unweighted):** `w8ben australia` (≈320/mo, widen cluster) and `day trading tax australia` (≈320/mo, flagged ambiguous) tie for highest; `us shares australian tax return` (≈140/mo) is the highest-volume term that is both in-cluster and not flagged.

**Confidence level: LOW-MEDIUM.** This is a desk triangulation with zero access to an actual keyword-volume data source (Keyword Planner, Ahrefs, Semrush) — every number is an estimate corroborated only by qualitative proxies (competing-content presence, forum-thread presence). Directionally useful for prioritizing which terms to content-test or run through a real tool next; **not** sufficient on its own to size paid-acquisition CAC or make a go/no-go call. This file is pure data capture for Block 1 — no conviction or opportunity re-scoring was performed as part of this pass (see `research/conviction-signal.md` and `research/opportunity-score.md`, both from the prior G0 pass, for the standing PARK verdict).
