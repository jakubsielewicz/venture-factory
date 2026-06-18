# Knowledge ledger - build-vs-buy

> Dated, atomic heuristics and anti-patterns appended by the skill-curator after each venture.
> Entry format: `YYYY-MM-DD - <heuristic/anti-pattern> - evidence: <slug> - confidence: low|med|high (n=K)`
> The SKILL.md body loads only the most recent / highest-confidence entries; compact older ones into references/ periodically.

2026-06-18 - ANTI-PATTERN: Build estimate lands exactly on the base-case budget with zero explicit contingency between the base and the ceiling. The au-sme-compliance estimate totalled $77,200 base / $120,000 ceiling with the base case consuming every dollar of the base envelope. Flag this pattern: reserve a named contingency line (recommended: 15% of base build hours) and surface it explicitly in the cost-envelope table so the human can see the no-contingency risk at a glance. - evidence: au-sme-compliance - confidence: low (n=1)

2026-06-18 - Representing domain data as DATA fixtures (not code logic) is a strong MVP-scoping pattern. In au-sme-compliance, modern awards were represented as JSON/DB fixtures (3 of 12 implemented at G4), meaning adding a new award is a data change + solicitor sign-off, not a code change + regression suite. This kept the G4 build within budget and made the scope boundary explicit and enforceable. - evidence: au-sme-compliance - confidence: low (n=1)
