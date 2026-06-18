---
name: prd-authoring
description: Use at G3 to write a product requirements doc for an approved idea — problem, users, scope, the thinnest MVP, and acceptance criteria. Triggers: "write the PRD", "what's in the MVP", "product requirements", G3 design.
when_to_use: authoring a PRD and MVP scope at G3.
allowed-tools: Read, Write
---

## Procedure
1. State the problem and the target user in two sentences each; pull them from `brief.md`/`research/`, don't invent.
2. Define scope: a short IN list and an explicit OUT list. The MVP is the THINNEST slice that tests the venture thesis — cut anything not load-bearing for that test.
3. Write user stories for the in-scope slice, each with concrete ACCEPTANCE CRITERIA (Given/When/Then or a checklist) that qa-engineer can test.
4. Note dependencies, assumptions, and the success metric that says "the thesis held". If the implied build cost lands within 5% of the budget envelope, flag a **zero-contingency warning** and recommend a named contingency line (~15% of base build) so the no-buffer risk is visible at G3.
5. Write `ventures/<slug>/product/design/prd.md`.

Keep it to what a builder needs to not guess. The smallest correct MVP wins. Heuristics: `knowledge/ledger.md`.
