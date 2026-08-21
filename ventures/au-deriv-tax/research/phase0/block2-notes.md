# Phase 0 — Block 2 notes: Community census + pain-thread mining

Generated: 2026-07-21
Scope: pure evidence capture (au-deriv-tax). No conviction-scoring or opportunity-scoring re-run in this pass — see `conviction-signal.md` (FAIL, 17/100) and `opportunity-score.md` (PARK, 47/100) for the existing G0 verdicts, which this block feeds evidence into but does not re-score.

## Tooling constraints encountered (log this honestly — it explains the query-log pattern below)
- **WebFetch is blocked for reddit.com** (all `/about.json` attempts failed with "unable to fetch"), and **returns HTTP 403 for aussiestockforums.com thread pages** (bot-blocked). All content below therefore comes from WebSearch's synthesized snippets, not direct page reads — quotes pulled verbatim by the search summarizer are marked as such; everything else is marked `[PARAPHRASE]`.
- **WebSearch cannot reliably surface reddit.com/r/<sub> permalink content** for the AU finance subs tested, even for phrases that plausibly exist (e.g. `site:reddit.com/r/AusFinance "options CGT"` returned zero reddit links; the `site:` operator itself does not appear to be honoured consistently by this tool's backend). This matches and reconfirms the prior G0 finding ("no results despite direct search") — this pass logs the **actual query strings** used, closing the reproducibility gap flagged earlier.
- Forum content (Whirlpool, Aussie Stock Forums, HotCopper, OzBargain) **is** reasonably well indexed and returned real, specific thread titles/URLs/snippets — the tooling gap is Reddit-specific, not general.
- Third-party subreddit-stats sites (gummysearch.com, subredditstats.com) supplied member-count estimates, but subredditstats.com's own page carries the disclaimer "Please do not rely on the accuracy of this site's data for anything serious/important... likely out of date or inaccurate" post-2023 Reddit API changes, and a later search this session reported gummysearch.com "shut down in November 2025" — yet an earlier search returned a gummysearch page "last updated July 12, 2026." These two findings are contradictory; **treat every Reddit member count in `communities.csv` as an unverified, low-confidence estimate**, not a sourced fact.

## Block 2 query log

Format per community: which of the 9 target phrases were actually run this session (exact string logged), hit/no-hit, and — where relevant — the actual query variant used (several were run as `OR`-grouped batches to manage tool-call volume; where that happened it's noted). Phrases **not** run this session are marked `NOT RUN` rather than assumed no-hit — an honest gap, not a fabricated negative.

Target phrases: P1 `"IBKR tax"` · P2 `"interactive brokers tax"` · P3 `"options tax"` · P4 `"options CGT"` · P5 `"sharesight options"` · P6 `"accountant options trades"` · P7 `"how do I declare options"` · P8 `"wheel tax"` · P9 `"assigned tax"`

| Community | P1 | P2 | P3 | P4 | P5 | P6 | P7 | P8 | P9 | Actual query strings run |
|---|---|---|---|---|---|---|---|---|---|---|
| r/AusFinance | No-hit | No-hit | No-hit | No-hit | No-hit | No-hit | No-hit | No-hit | No-hit | `site:reddit.com/r/AusFinance "IBKR tax" OR "interactive brokers tax" OR "options tax"`; `site:reddit.com/r/AusFinance "options CGT" OR "sharesight options" OR "accountant options trades"`; `site:reddit.com/r/AusFinance "how do I declare options" OR "wheel tax" OR "assigned tax"`; `reddit.com/r/AusFinance "options CGT"`; `reddit.com/r/AusFinance "IBKR tax"`; `AusFinance reddit "assigned" options tax` — all returned zero reddit.com/r/AusFinance links |
| r/fiaustralia | No-hit | No-hit | No-hit | No-hit | No-hit | No-hit | NOT RUN | No-hit | No-hit | `site:reddit.com/r/fiaustralia "IBKR tax" OR "interactive brokers tax" OR "options tax" OR "options CGT"`; `site:reddit.com/r/fiaustralia "sharesight options" OR "accountant options trades" OR "wheel tax" OR "assigned tax"` |
| r/ASX_Bets | No-hit | NOT RUN | No-hit | No-hit | NOT RUN | NOT RUN | NOT RUN | NOT RUN | No-hit | `site:reddit.com/r/ASX_Bets "IBKR tax" OR "options tax" OR "options CGT" OR "assigned tax"` |
| r/AusStocks / r/ausstocks | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | Only member-count search run this session; pain-query sweep not performed — **flagged gap for a future pass** |
| r/interactivebrokers | NOT RUN | approx. | approx. | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | NOT RUN | `reddit r/interactivebrokers "Australia" tax ATO thread` — no-hit (approximates P2/P3) |
| r/options + r/thetagang (combined) | NOT RUN | NOT RUN | approx. | NOT RUN | NOT RUN | approx. | NOT RUN | NOT RUN | approx. | `reddit r/options OR r/thetagang "Australia" tax ATO accountant assigned` — no-hit (approximates P3/P6/P9) |
| Whirlpool | Hit | Hit | Hit | NOT RUN | Hit | NOT RUN | NOT RUN | No-hit | No-hit | `forums.whirlpool.net.au "IBKR" tax options` (P1/P2 hit — "Interactive Brokers", "Trading in US Market - Tax" threads); `forums.whirlpool.net.au "options tax"` (P3 hit — "How to reduce tax?" thread); `whirlpool forums "sharesight" options CGT thread` (P5 hit); `whirlpool forums "wheel strategy" tax options assigned` (P8 no-hit — only returned generic US wheel-strategy blogs); `whirlpool forums "assigned" put option shares cost base tax thread` (P9 no-hit) |
| Aussie Stock Forums | Hit | Hit | Hit | Hit | NOT RUN | Hit | NOT RUN | No-hit | No-hit | `aussiestockforums.com "options" tax accountant thread` (hit — 5 threads incl. Interactive Brokers Tax question, Tax implications of trading US options); `"interactive-brokers-tax-question" aussiestockforums accountant fee tripled quote` (P2/P6 hit — verbatim $ quote); `aussiestockforums "wheel strategy" OR "cash secured put" tax thread` (P8 no-hit); `aussiestockforums "assigned" put shares cost base tax accountant thread` (P9 no-hit, resurfaced only already-known threads) |
| HotCopper | NOT RUN | NOT RUN | No-hit | No-hit | NOT RUN | NOT RUN | NOT RUN | No-hit | No-hit | `hotcopper.com.au forum "options tax" OR "assigned" CGT` (P3/P9 no-hit — only general CGT threads, none options-specific); `hotcopper.com.au thread options assignment tax "capital gains" OR "revenue account" trader` (no-hit on a specific thread); `hotcopper.com.au "wheel strategy" OR "cash secured put" tax thread` (P8 no-hit); direct thread-guess `hotcopper.com.au/threads/options.5077986` not surfaced with usable content |
| OzBargain (Financial forum) | NOT RUN | NOT RUN | No-hit | No-hit | NOT RUN | No-hit | NOT RUN | NOT RUN | NOT RUN | `ozbargain forums "options" tax CGT accountant thread` — returned general CGT/employee-share-scheme-options threads, **zero derivatives/trading-options-specific threads** |

**Read on the query log:** every AU-specific Reddit community returned **zero** hits across every phrase tested — but this is now attributable in significant part to a tool limitation (Reddit not reliably indexed/fetchable by the available search tool), not solely to an absence of real threads, and that distinction was not previously logged. Forums (Whirlpool, Aussie Stock Forums) **did** surface genuine, specific, dated pain threads for 5 of 9 phrases — the pain is real and findable, it is concentrated in forums rather than Reddit as far as this tooling can see, and it skews toward general IBKR/CGT/FX mechanics pain rather than options-specific pain (`"wheel tax"` and `"assigned tax"` scored **zero hits everywhere tested**, forums included).

## Reachable population — graded A/B communities only

No community was graded **A** this pass (see `communities.csv` — every large/active AU-specific channel either has an explicit no-self-promotion rule found verbatim, or its rules are unconfirmed because Reddit could not be reached by available tools; none is confirmed "promo-survivable"). Graded **B** communities and their (low-confidence, overlap-not-deduplicated) member counts:

| Community | Members (source, dated) |
|---|---|
| r/AusFinance | ~830,000 (gummysearch.com, unverified — see caveat above) |
| r/fiaustralia | ~308,000 (gummysearch.com, unverified) |
| r/ASX_Bets | ~127,000 (gummysearch.com / subredditstats.com, unverified) |
| r/AusStocks / r/ausstocks | ~85,000 (gummysearch.com, unverified) |
| Aussie Stock Forums | 52,000 (forums.feedspot.com "Top 10 Australian Stock Forums in 2026", 2026) |
| HotCopper | 250,000 registered (WebSearch-sourced site profile, 2026) |

**Summed reachable population (A+B, overlap allowed, sizing reach not unique humans): ≈ 1,652,000.**

This number should be treated as a **ceiling, not a forecast** — it is dominated by three unverified Reddit estimates (830k+308k+127k+85k = 1.35M of the 1.65M total) from a defunct/uncertain third-party tool, none of which could be pain-thread-mined successfully this session, and it counts entire general-finance communities where derivatives/options traders are a small, unquantified subset (no source found anywhere in this pass sizes "AU active options/derivatives traders" as a fraction of any of these communities — that denominator gap, already flagged in `conviction-signal.md`, remains open).
