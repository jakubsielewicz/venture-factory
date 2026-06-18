# Knowledge ledger - saas-metrics

> Dated, atomic heuristics and anti-patterns appended by the skill-curator after each venture.
> Entry format: `YYYY-MM-DD - <heuristic/anti-pattern> - evidence: <slug> - confidence: low|med|high (n=K)`
> The SKILL.md body loads only the most recent / highest-confidence entries; compact older ones into references/ periodically.

2026-06-18 - ANTI-PATTERN: Using the US Stripe domestic rate (2.9% + $0.30) instead of the AU domestic rate (1.7% + A$0.30) when computing SaaS gross margin for an AU-market product. The error understates gross margin and overstates COGS. Propagates into LTV, LTV:CAC, and CAC payback. Always confirm the payment processor rate for the target market locale before finalising the metrics model. AU domestic Stripe rate: 1.7% + A$0.30 (verified 2026-06-18). - evidence: au-sme-compliance - confidence: low (n=1)
