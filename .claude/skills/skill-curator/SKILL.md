---
name: skill-curator
description: Use at the end of a venture or gate (a retro) to make the crew's skills smarter from what just happened. Triggers: "/retro", "run the curator", "post-mortem", "capture what we learned".
when_to_use: post-venture / post-gate retro; turning what happened into validated, dated heuristics.
allowed-tools: Read, Write, Glob, Grep
---

## Procedure
1. Read the completed venture's `ventures/<slug>/` tree and identify, per stage, what worked, what was wrong, and any reusable asset produced (template, query, benchmark, checklist).
2. For each lesson, decide its home:
   - A reusable artifact → save into the relevant skill's `examples/` as a dated file.
   - A validated heuristic or anti-pattern → append a dated entry to that skill's `knowledge/ledger.md`.
   - A fresh benchmark/number → update the relevant `references/` file (note date + source).
3. **Evidence before influence:** tag each entry with an evidence count + confidence. A ledger entry earns "behaviour-changing" weight only at n≥2; only edit a skill's core `SKILL.md` procedure once a heuristic has proven out across n≥3 ventures.
4. **Bounded ledgers:** if a `knowledge/ledger.md` exceeds ~20 entries, COMPACT superseded / low-confidence ones into `references/ledger-archive.md` and keep the body-loaded ledger short. Never delete a prior entry without superseding it (dated).
5. **Human-approved diffs (until trusted):** do NOT silently rewrite a `SKILL.md` procedure. Write proposed procedure changes to `ventures/<slug>/retro/curator-proposals.md` as a changelog/diff for human review; apply directly only to `knowledge/` and `examples/` (append-only, low-risk).
6. Output a short changelog: which skills were updated, which proposals await approval, and why.

Entry format for `ledger.md`:
`YYYY-MM-DD - <skill> - <heuristic/anti-pattern> - evidence: <slug> - confidence: low|med|high (n=K)`

**Eval anchor:** if an eval set exists (`ventures/_eval/`), flag any change that would affect a golden case so it can be re-run after edits. This is how competencies compound — every cycle leaves the skills sharper at near-zero added default-context cost.
