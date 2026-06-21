---
name: competitor-teardown
description: Use to map the competitive field for an idea — who exists, their pricing, their gaps, switching costs. Triggers: "who are the competitors", "teardown <product>", "what's the gap", any G0 competitor pass.
when_to_use: competitive landscape, pricing reconnaissance, finding the wedge/gap at G0.
allowed-tools: Read, Write, WebSearch, WebFetch
---

## Procedure
1. Identify the top 2–4 incumbents plus the most common DIY/manual alternative ("the spreadsheet").
2. For each: positioning, pricing & packaging, last meaningful update, and obvious gaps/complaints (cite reviews/forums with dates). **No published price ⇒ pricing UNKNOWN — never infer tier, segment, or lane status from an absent price page; trigger a `competitor-price-probe` (buyer-style enquiry) to get a real number.**
3. Find the **wedge**: an underserved segment, a workflow gap, or a price/packaging gap a small team can own.
4. Assess switching cost and platform dependency (does this live or die on one platform's API/policy?).
5. Output a comparison table + the one-sentence wedge thesis; feed to `opportunity-scoring`.

A lane is "OPEN" only after the **top-2 named competitors are directly probed** and return pricing above the target ICP's affordability threshold — otherwise lane status = UNKNOWN, not open. Cite every claim — "I think they charge…" is not acceptable; find the pricing page or mark it unknown. Heuristics: `knowledge/ledger.md`.
