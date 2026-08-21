# Desk-sizing workbook spec

Five tabs. One CSV per tab under `ventures/<slug>/research/phase0/`. Assemble into `phase0-sizing.xlsx` (or a Google Sheet) at the end if a single workbook is wanted; the CSVs are the source of truth. Every row carries a URL + date.

## Tab schemas (CSV headers — use exactly)

| Tab | File | Header |
|---|---|---|
| Keywords | `keywords.csv` | `term,tier,au_vol_mo,cpc_aud,competition,source,notes` |
| Communities | `communities.csv` | `name,platform,members,posts_per_day_est,promo_rules,pain_threads_found,channel_grade` |
| Evidence Log | `evidence-log.csv` | `date_of_thread,community,url,verbatim_quote,pain_type,engagement` |
| Competitors | `competitors.csv` | `name,category,au_options_tax_support,relevant_gap,pricing,tripwire_set` |
| Summary | `summary.csv` | `metric,result,threshold,verdict` |

- `tier` ∈ 1/2/3. `channel_grade` ∈ A/B/C. `pain_type` ∈ hours / $ / confusion / fear.
- Quote any field containing a comma. Never fabricate a precise `au_vol_mo` — use a range midpoint and note the basis in `source`, or write `unknown`.

## Weighting & scoring
- **Weighted search cluster** = Σ(Tier 1 vol × 1.0) + Σ(Tier 2 vol × 1.0) + Σ(Tier 3 vol × 0.5), **excluding** any term flagged ambiguous-intent (or include it at 0.25 if borderline). The threshold must never be carried by one generic high-volume term — if one term is >40% of the total, re-inspect its intent.
- **Reachable population** = sum of graded-A/B community members (overlap accepted; this sizes reach, not unique humans). Judgment input, not a hard gate.

## Thresholds (Summary tab)

| Metric | PASS | CONDITIONAL | Needs rescue / weak |
|---|---|---|---|
| Weighted search cluster (AU/mo) | ≥1,500 | 800–1,500 | <800 → community-evidence rescue |
| Pain threads logged | ≥15 across ≥3 communities | 8–14 or only 2 communities | <8 |
| Grade-A/B reachable population | record (judgment) | — | — |
| Oldest unfulfilled incumbent request | older = stronger | — | none found = weaker gap |
| Accountant fee anchor | supports >$500/yr claim | ambiguous | contradicts |

## Decision rules
1. Search **PASS** → proceed.
2. Search **CONDITIONAL** *and* pain evidence strong (≥15 / ≥3) → proceed.
3. Both search and community miss → **widen-the-wedge fallback**: rebuild the cluster around the broader adjacent buyer (e.g. all holders of the asset class, not just the niche instrument), repositioning the niche as the premium/hero tier. If the widened cluster clears **3,000+/mo**, proceed with the broader landing framing.
4. Fallback also misses → **KILL** on desk evidence.

## Seed-cluster construction (generic)
- **Tier 1 — tool intent** (weight 100%): `<broker> tax report <country>`, `<incumbent-tool> <missing-feature>`, `<incumbent> alternative`, `<task> calculator <country>`, `<task> software <country>`, `<task> journal`.
- **Tier 2 — problem intent** (weight 100%): `how is <X> taxed in <country>`, `<X> tax <country>`, `<regime> vs <regime> <authority>`, natural-language versions of the pain.
- **Tier 3 — long-tail questions** (weight 50%): specific edge-case "how do I …" questions — low individual volume, high SEO value; each is a future article.

## Reusability note
Everything captured is downstream fuel: pain threads → first outreach/posting targets; verbatim quotes → landing-page copy (unedited); accountant fees → pricing anchor; weak-answer PAA questions → SEO content backlog; competitor gaps → differentiation sentence. Hand these to `icp-definition`, `positioning-canvas`, `pricing-model`, and `seo-keyword-research`.
