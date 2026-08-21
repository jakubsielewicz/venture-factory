# venture-factory-maintainer — knowledge ledger

> Entry format: `YYYY-MM-DD - <heuristic/anti-pattern> - evidence: <slug/PR> - confidence: low|med|high (n=K)`
> The SKILL.md body loads only the most recent / highest-confidence entries; compact older ones into references/ periodically.

2026-08-21 - SEED: test_guard.py's G0 fixture test can silently drift from ventures/_template/manifest.json's actual `required_artifacts` list (e.g. it only wrote `research/opportunity-score.md` after `research/conviction-signal.md` was added as a second required G0 artifact, so the "G0 check after artifact is green" case started failing for a reason unrelated to whatever change triggered the test run). When touching required_artifacts anywhere, grep test_guard.py's fixture setup for the same gate and update it in the same change. - evidence: devin-meta-engineer-layer PR (found while verifying an unrelated purge) - confidence: low (n=1, seed)
