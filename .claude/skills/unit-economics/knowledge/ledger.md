# Knowledge ledger - unit-economics

> Dated, atomic heuristics and anti-patterns appended by the skill-curator after each venture.
> Entry format: `YYYY-MM-DD - <heuristic/anti-pattern> - evidence: <slug> - confidence: low|med|high (n=K)`
> The SKILL.md body loads only the most recent / highest-confidence entries; compact older ones into references/ periodically.

2026-06-18 - ANTI-PATTERN: Using the US Stripe domestic rate (2.9% + $0.30) for an AU-market product. The AU Stripe domestic rate is 1.7% + A$0.30 (verified stripe.com/au/pricing, 2026-06-18). Using the US rate overstates payment processing COGS by ~$0.95/transaction at $79/mo, understating gross margin by ~1.2pp (89.8% vs 91.0%). Always fetch locale-specific payment processor pricing before finalising unit economics. - evidence: au-sme-compliance - confidence: low (n=1)
