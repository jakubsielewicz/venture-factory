# Knowledge ledger - scaffold-stack

> Dated, atomic heuristics and anti-patterns appended by the skill-curator after each venture.
> Entry format: `YYYY-MM-DD - <heuristic/anti-pattern> - evidence: <slug> - confidence: low|med|high (n=K)`
> The SKILL.md body loads only the most recent / highest-confidence entries; compact older ones into references/ periodically.

2026-06-18 - Represent variable domain entities as DATA fixtures rather than code logic to contain MVP scope. In au-sme-compliance, modern award classification rules were stored as JSON/DB fixtures; adding an award is a data + solicitor sign-off task, not a code change. This kept 3-of-12 awards in the G4 build within budget while making the expansion path clear. Pattern is especially useful when domain entities have external sign-off requirements (legal, regulatory) that gate each addition individually. - evidence: au-sme-compliance - confidence: low (n=1)
