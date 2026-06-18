# Knowledge ledger - go-no-go-memo

> Dated, atomic heuristics and anti-patterns appended by the skill-curator after each venture.
> Entry format: `YYYY-MM-DD - <heuristic/anti-pattern> - evidence: <slug> - confidence: low|med|high (n=K)`
> The SKILL.md body loads only the most recent / highest-confidence entries; compact older ones into references/ periodically.

2026-06-18 - GO-IF conditions from the memo must each map to a named, pre-launch gate item in the runbook. In au-sme-compliance all three GO-IF conditions (legal review, CSV-first architecture, bounded MVP scope) appeared verbatim as blockers in the G6 runbook, making the gate enforceable. GO-IF conditions that do not trace forward to a concrete gate item are routinely dropped. - evidence: au-sme-compliance - confidence: low (n=1)

2026-06-18 - ANTI-PATTERN: Using a unit-economics figure in the memo that contains a stale or locale-wrong input rate (e.g. US Stripe rate instead of AU rate) creates a memo that passes review but contains a correctable factual error. Verify locale-specific rates (payment processor, tax, etc.) before citing them in the memo. The direction of error in this case was favourable (AU rate is lower than US), but the memo must still cite the verified figure. - evidence: au-sme-compliance - confidence: low (n=1)
