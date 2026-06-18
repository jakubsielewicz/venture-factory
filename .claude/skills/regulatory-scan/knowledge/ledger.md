# Knowledge ledger - regulatory-scan

> Dated, atomic heuristics and anti-patterns appended by the skill-curator after each venture.
> Entry format: `YYYY-MM-DD - <heuristic/anti-pattern> - evidence: <slug> - confidence: low|med|high (n=K)`
> The SKILL.md body loads only the most recent / highest-confidence entries; compact older ones into references/ periodically.

2026-06-18 - AU government primary sources (.gov.au: DEWR, FWC, ABS, AustLII) repeatedly timed out or returned 403 during research. Prefer fetching multiple named law-firm / professional secondary sources (e.g. Addisons, Commoner Law, Norman Waterhouse, Williamson Barwick for FWA provisions) and flag for a primary re-check, rather than calling a claim UNVERIFIABLE solely because a .gov.au URL was unreachable. Four independent named secondary sources citing the same commencement date is adequate for G2 readiness. - evidence: au-sme-compliance - confidence: low (n=1)

2026-06-18 - When checking a statutory penalty, confirm BOTH the penalty-unit COUNT and the current penalty-unit RATE from primary before calling MISMATCH. In au-sme-compliance the verifier initially disputed a correct penalty figure because it used the wrong unit count with an outdated rate; a cross-check against the November 2024 Commonwealth rate ($330/unit) resolved the apparent inconsistency. - evidence: au-sme-compliance - confidence: low (n=1)
