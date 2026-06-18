# Knowledge ledger - nfr-checklist

> Dated, atomic heuristics and anti-patterns appended by the skill-curator after each venture.
> Entry format: `YYYY-MM-DD - <heuristic/anti-pattern> - evidence: <slug> - confidence: low|med|high (n=K)`
> The SKILL.md body loads only the most recent / highest-confidence entries; compact older ones into references/ periodically.

2026-06-18 - Thread advisory/ compliance constraints into nfr.md as MEASURABLE, testable requirements (not narrative notes). Liability risks from the risk-register survived G1→G3→G4→G5 intact because each was encoded as a named NFR (NFR-L1 through NFR-L10) with explicit acceptance criteria the QA engineer could execute. Constraints that stay in advisory/ prose are routinely missed by the builder. - evidence: au-sme-compliance - confidence: low (n=1)

2026-06-18 - ANTI-PATTERN: Leaving compliance/legal constraints in advisory/ without a corresponding testable NFR causes them to evaporate at G4. The advisory/ file is rarely read by the builder; nfr.md is the handoff document that drives test coverage. - evidence: au-sme-compliance - confidence: low (n=1)
