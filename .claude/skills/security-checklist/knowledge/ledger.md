# Knowledge ledger - security-checklist

> Dated, atomic heuristics and anti-patterns appended by the skill-curator after each venture.
> Entry format: `YYYY-MM-DD - <heuristic/anti-pattern> - evidence: <slug> - confidence: low|med|high (n=K)`
> The SKILL.md body loads only the most recent / highest-confidence entries; compact older ones into references/ periodically.

2026-06-18 - Compliance constraints encoded as named NFRs (NFR-L1/L2) with CI-enforced string scans survived into the security checklist unchanged. Encoding a legal disclaimer constraint as both a testable NFR AND a CI check (automated string scan for prohibited phrases) ensured neither the builder nor the QA engineer could accidentally skip it. - evidence: au-sme-compliance - confidence: low (n=1)
