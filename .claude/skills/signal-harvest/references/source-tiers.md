# Source taxonomy & search-string guidance

Ordered by signal quality. The collector script covers HN, GitHub, Google
autocomplete, StackExchange. Everything else here is **guided WebSearch — never
scrape**; hit public search and cite dated results.

## Tier 1 — money already moving (highest quality)
- **Competitor reviews, 1–3★** (G2, Capterra, TrustRadius, GetApp, Trustpilot, app stores).
  Search: `"<category>" site:g2.com "love it but"`, `"<product>" review "switched because"`,
  `"<product>" "deal-breaker"`. Proves: unmet need inside a *paid* category.
- **Freelance marketplaces** (Upwork, Fiverr). Search: `site:upwork.com "<task>"`,
  `"<task>" freelancer hourly`. Recurring same-task gigs ≈ paid repetitive pain; volume ≈ market size.
- **Job postings** (LinkedIn, Indeed, Seek). Search: `"<manual task>" analyst hiring`,
  `"manually reconcile <X>" job`. A role hired to do it = a process a company will pay to automate.
- **Feature-request boards w/ votes** (Canny, UserVoice, GitHub 👍). Search:
  `site:canny.io "<category>"`, `"<product>" feature request votes`. Demand pre-quantified.

## Tier 2 — search intent (measurable volume)
- **Keyword/intent** — commercial-intent queries: `best <X> for <Y>`, `<X> alternative`,
  `<X> vs <Y>`, `<X> pricing`. Google autocomplete (script) is the keyless volume proxy;
  AnswerThePublic/AlsoAsked + "People also ask" for question shapes; Google Trends for trajectory.

## Tier 3 — raw latent need (highest volume, most validation)
- **HN** (script), **StackExchange** (script), **Reddit** (WebSearch: `site:reddit.com "<theme>" "i wish"`),
  vertical Discord/Slack/forums/Indie Hackers, social (X, LinkedIn comments, YouTube/TikTok
  tutorial comments), **Product Hunt** comments (`"would be great if it also"`).

## Language tells (canonical list lives in references/tells.json)
- **Unmet need:** "i wish", "why isn't there", "there has to be a better way",
  "we spend hours every week", and best of all a **workaround** ("I built a spreadsheet/script to…").
- **Solution-seeking / intent:** "what do you use for", "recommendations for",
  "looking for a tool/service that", "alternative to X", "is it worth paying", pricing questions.
- **Competitor weakness:** "love it but it doesn't", "if only it could", "switched because".
