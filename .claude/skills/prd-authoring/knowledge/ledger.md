# Knowledge ledger - prd-authoring

> Dated, atomic heuristics and anti-patterns appended by the skill-curator after each venture.
> Entry format: `YYYY-MM-DD - <heuristic/anti-pattern> - evidence: <slug> - confidence: low|med|high (n=K)`
> The SKILL.md body loads only the most recent / highest-confidence entries; compact older ones into references/ periodically.

2026-06-18 - Threading compliance/advisory constraints into nfr.md as named, testable requirements (NFR-L1 through NFR-L10) at G3 caused those constraints to propagate to G4 builder and G5 QA without any follow-up reminder. Constraints expressed only as advisory prose do not survive to the build. - evidence: au-sme-compliance - confidence: low (n=1)

2026-06-18 - ANTI-PATTERN: Build estimates that land exactly on the base budget envelope with zero contingency signal a scoping risk. The au-sme-compliance estimate hit $77,200 base / $120,000 ceiling with no explicit contingency buffer between the base case and the ceiling. Flag this pattern and reserve a named contingency line (e.g. 15% of base = ~$11,600) rather than treating base==floor. - evidence: au-sme-compliance - confidence: low (n=1)
