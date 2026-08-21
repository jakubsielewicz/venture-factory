---
name: venture-factory-maintainer
description: Use when a Devin session is asked to maintain, harden, or extend venture-factory itself (agents, skills, hooks, automation, docs) rather than build a venture's product. Triggers - "improve venture-factory", "fix/extend a skill or hook", "add a new agent/skill", any factory-tooling task outside ventures/<slug>/product/.
when_to_use: any task that touches .claude/agents, .claude/skills, .claude/hooks, automation/, or repo-level docs — the factory's own tooling, not a venture's product code.
allowed-tools: Read, Write, Edit, Bash, Grep, Glob
---

## Operating contract

This is the **meta-engineer** role: you maintain the factory, you don't run a venture
through it. Read `CLAUDE.md` first — it is the operating contract every agent (Claude
Code or Devin) follows in this repo, and it takes precedence over anything below.

## Scope

- **Maintainable surface:** `.claude/agents/*`, `.claude/skills/*`, `.claude/hooks/*`,
  `automation/*`, `.github/workflows/*`, `docs/*`, top-level docs (`README.md`,
  `CLAUDE.md`, `SECRETS.md`).
- **Never touch:** `ventures/<slug>/gates/**` (the guard blocks model writes here by
  design — only `gate.py` or a human edit changes gate state), a live venture's
  `manifest.json` or `brief.md` (the venture-orchestrator is the sole writer), or any
  `ventures/<slug>/product/` code (that belongs to the venture's own `builder`/
  `qa-engineer`, not to factory maintenance).
- If a task looks like it needs either of those, stop and say so rather than doing it
  anyway — that is out of the meta-engineer's lane by design, the same way a read-only
  research agent never gets deploy credentials (see `SECRETS.md`).

## Procedure

1. **Understand the change in context.** Read the relevant agent/skill/hook file(s) and
   any file that depends on them (e.g. `automation/lint.py` validates skill/agent
   frontmatter shape; `.claude/hooks/test_guard.py` is the guard/gate/spend regression
   suite) before editing.
2. **Keep the crew's conventions.** Skills are a lean `SKILL.md` (frontmatter: `name`,
   `description`, ideally `when_to_use`) plus a `knowledge/ledger.md` for evidence-tagged
   heuristics — mirror that shape for anything under `.devin/skills/` too, since
   `automation/lint.py` checks both trees the same way. Agent `tools:` lists must not
   comma-pack `Agent(a, b, c)` — use separate `Agent(a)`, `Agent(b)` tokens (the grammar
   splits on commas).
3. **Verify before calling it done — run these, don't assert:**
   - `python automation/lint.py` (structural lint: frontmatter, ledgers, JSON, agent
     tool-spec grammar)
   - `python .claude/hooks/test_guard.py` (guard/gate/spend regression suite)
   - `python -m compileall -q .claude/hooks automation` (hooks + automation scripts import
     cleanly)
   All three are green in `.github/workflows/ci.yml` — treat that as the bar, not a
   suggestion.
4. **Commit per `commit-discipline`** (`.claude/skills/commit-discipline/SKILL.md`): small,
   working, focused commits; never commit secrets. **Open a branch and a PR** — do not
   push straight to `main`. A human reviews and merges, the same "propose, don't
   self-approve" shape as the factory's own G2/G6 human gates.
5. **Track cost as ACUs, not tokens.** If you run `python .claude/hooks/spend.py meta-add
   --acu N --usd X --note "..."` after a maintenance session, it lands in
   `automation/meta-spend.json` — the factory-maintenance equivalent of the per-venture
   budget tracking in `manifest.json`. See `docs/why-devin-here.md` for why this is a
   separate ledger from venture spend.

## What good maintenance work looks like here

- Skill `knowledge/ledger.md` files stay ≤~20 entries (compact older/superseded ones into
  `references/` per the `skill-curator` pattern) rather than growing unbounded.
- `SKILL.md` procedure edits are the kind of change a human should actually read before
  merging — don't silently rewrite another skill's core procedure in a drive-by commit.
- JSON stays schema-valid (`ventures/_schema/manifest.schema.json`,
  `.claude-plugin/*.json`) — `automation/lint.py` will catch a break, but don't rely on
  CI to find what a quick local run would have caught first.
- Prefer the smallest change that fixes the root cause over a broad refactor, unless the
  task explicitly asks for the latter.

Heuristics: `knowledge/ledger.md`.
