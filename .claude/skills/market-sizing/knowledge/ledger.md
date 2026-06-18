# Knowledge ledger - market-sizing

> Dated, atomic heuristics and anti-patterns appended by the skill-curator after each venture.
> Entry format: `YYYY-MM-DD - <heuristic/anti-pattern> - evidence: <slug> - confidence: low|med|high (n=K)`
> The SKILL.md body loads only the most recent / highest-confidence entries; compact older ones into references/ periodically.

2026-06-18 - ANTI-PATTERN: Citing a TAM figure from broken/unreachable URLs as a verified anchor. In au-sme-compliance the initial TAM ($1.2B) was sourced from three URLs that all returned 404/timeout. The correct approach: replace with an explicitly labelled estimate from a single named market research firm, state the bottom-up SAM as the operative sizing figure, and label the TAM as "order-of-magnitude only." - evidence: au-sme-compliance - confidence: low (n=1)

2026-06-18 - When ABS percentage figures do not sum to 100%, reject and recompute from the raw count table rather than adjusting percentages to fit. In au-sme-compliance an ABS business-count table was initially presented with percentages summing to ~99.7% (97.3% + 2.4% = not 100%). Fix: derive percentages from raw counts (920,999 / 994,178 = 92.6%, etc.) and show the arithmetic explicitly. - evidence: au-sme-compliance - confidence: low (n=1)
