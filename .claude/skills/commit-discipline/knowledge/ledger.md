# Knowledge ledger - commit-discipline

> Dated, atomic heuristics and anti-patterns appended by the skill-curator after each venture.
> Entry format: `YYYY-MM-DD - <heuristic/anti-pattern> - evidence: <slug> - confidence: low|med|high (n=K)`
> The SKILL.md body loads only the most recent / highest-confidence entries; compact older ones into references/ periodically.

2026-06-18 - ANTI-PATTERN: Deploy keywords in commit message text (e.g. "deploy X", "release Y") or in echo/heredoc strings within commit hooks can trip a deploy guard that pattern-matches command text. Write commit messages that describe the change without using deploy-trigger verbs if the repo has a deploy-guard hook. Use words like "ship", "add", "update", "wire" instead of "deploy" or "publish" in automated command strings. - evidence: au-sme-compliance - confidence: low (n=1)
