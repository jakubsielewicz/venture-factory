---
description: Retro — run the skill-curator to capture lessons and make the crew's skills smarter.
argument-hint: <venture-slug>
---
Run a **retro** for venture: $ARGUMENTS

Invoke the `skill-curator` skill (Skill tool) on `ventures/$ARGUMENTS/`:
1. Identify, per stage, what worked, what was wrong, and any reusable asset produced.
2. Append dated, evidence-tagged heuristics to the relevant skills' `knowledge/ledger.md` and drop reusable artifacts into `examples/` (append-only — these are safe to apply directly).
3. Do NOT silently rewrite any `SKILL.md` procedure — write proposed procedure changes to `ventures/$ARGUMENTS/retro/curator-proposals.md` for human review (only promote to a `SKILL.md` edit once a heuristic has proven out across ≥3 ventures).
4. Compact any ledger over ~20 entries into `references/ledger-archive.md`.

Output the changelog: which skills were updated (append-only) and which proposals await human approval.
