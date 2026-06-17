---
name: market-sizing
description: Use to size a market with TAM/SAM/SOM from the bottom up before committing effort. Triggers: "how big is this market", "what's the TAM", "is this big enough", any G0/G1 sizing pass.
when_to_use: TAM/SAM/SOM estimation; sanity-checking demand against revenue potential.
allowed-tools: Read, Write, WebSearch, WebFetch
---

## Procedure
1. Prefer **bottom-up**: (target buyers/accounts) × (realistic price) × (adoption rate) = SOM; widen to SAM and TAM. Cross-check against any top-down figure and explain the gap.
2. State each input with a dated source. Where you must estimate, give a range (low / base / high), never a bare point.
3. Convert to an annual revenue ceiling and a realistic 12–24 month obtainable slice for a solo/small team.
4. Verdict: is the obtainable slice worth the build? Name the one input the size is most sensitive to.
5. Feed the result to `opportunity-scoring`; write `research/market-sizing.md` only if asked.

Never present a single headline number without its derivation. Heuristics: `knowledge/ledger.md`.
