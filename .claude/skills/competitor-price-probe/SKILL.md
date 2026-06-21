---
name: competitor-price-probe
description: Use when an opportunity's score hinges on "no affordable or self-serve incumbent" but competitor pricing is NOT public - draft buyer-style pricing-enquiry emails + a reply-log + a binary lane decision rule, so an "open lane" is confirmed by evidence, never inferred from a missing price page. Triggers - "is the lane really open", "confirm competitor pricing", "price probe", "lane test", any G0/G1 competitive verification.
when_to_use: confirming a competitive open-lane claim before scoring or committing, when incumbents publish no pricing.
allowed-tools: Read, Write, WebSearch, WebFetch
---

## Procedure
1. List the incumbents the "open lane" thesis depends on whose pricing is UNKNOWN (no public price page, demo-only, or quote-only). **Absence of a public price is UNKNOWN** - never read it as "enterprise/closed" or as "lane open".
2. For EACH, draft a genuine prospective-buyer pricing enquiry written as the venture's SMALLEST target customer (the segment the thesis targets). Ask the 5 questions that resolve the lane:
   - self-serve / online sign-up, or sales-led only?
   - price for that small size (monthly + annual; is there a small tier)?
   - hardware/setup required, or software-only?
   - does it actually do the job-to-be-done (the real obligation), not just templates?
   - setup fees, minimum contract, free trial?
   Add a per-vendor opening line referencing their actual product.
3. State the BINARY decision rule UP FRONT: if any incumbent offers [affordable + self-serve + does-the-job] at/below the venture's price point -> lane CLOSING -> re-score toward PARK; if all are sales-led / quote-only / miss-the-job -> lane OPEN (confirmed).
4. Write `ventures/<slug>/research/lane-test-outreach.md`: the emails, per-vendor opening lines, the decision rule, and a reply-log table. A **human** sends them (and uses vendors' "get a quote" web forms); this skill DRAFTS, it does not send - outbound sending is human-gated by the guard.
5. When replies arrive, fill the table, write a dated lane assessment, and feed the verdict to `opportunity-scoring` and the go/no-go. One cheap email can kill a false PURSUE before any spend.

Never assert a lane is open from absence of pricing - that is the exact bias this skill exists to correct. Decision-support; the human sends. Heuristics: `knowledge/ledger.md`.
