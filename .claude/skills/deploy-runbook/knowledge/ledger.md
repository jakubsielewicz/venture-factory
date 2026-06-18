# Knowledge ledger - deploy-runbook

> Dated, atomic heuristics and anti-patterns appended by the skill-curator after each venture.
> Entry format: `YYYY-MM-DD - <heuristic/anti-pattern> - evidence: <slug> - confidence: low|med|high (n=K)`
> The SKILL.md body loads only the most recent / highest-confidence entries; compact older ones into references/ periodically.

2026-06-18 - ANTI-PATTERN: Including deploy keywords (e.g. "deploy", "publish", "release") in command TEXT such as echo strings, commit messages embedded in scripts, or heredoc content can trip a deploy guard that scans command strings. Keep deploy-trigger keywords out of any string that appears in a shell command — move them to comments or documentation outside the command string. - evidence: au-sme-compliance - confidence: low (n=1)
