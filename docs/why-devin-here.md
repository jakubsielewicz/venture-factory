# Why Devin, and where it fits

venture-factory is built on Claude Code: 9 specialist agents, ~40 skills, and a set of
deterministic Python hooks (`gate.py`, `guard.py`, `spend.py`) that make gate state and
spend evidence-based rather than model-asserted (see [`CLAUDE.md`](../CLAUDE.md)). This
doc explains the one deliberate place Devin plugs into that design, and why — not a
retrofit, a considered scope decision.

## The framing: Devin as the factory's meta-engineer, not a swapped-in builder

The obvious move would be "replace `builder`/`qa-engineer` with a Devin session for G4/G5"
— Devin's sandboxed, PR-producing, test-running execution model is a good structural fit
for turning a design into working code. That's a real, viable next step (see
[Deliberately out of scope, for now](#deliberately-out-of-scope-for-now) below), but it
wasn't the first thing built here, for a specific reason: `builder`/`qa-engineer` are
already a tightly-scoped Claude subagent contract, and swapping the execution engine
underneath an existing agent contract without an actual venture to validate it against is
a design exercise, not evidence.

The more useful, immediately-provable role: **Devin as the factory's own meta-engineer** —
the agent that maintains, hardens, and extends venture-factory's tooling itself (agents,
skills, hooks, automation, docs), the same way a platform engineer maintains the CI system
rather than the product it builds. This is also exactly what Devin is good at in practice:
dependency bumps, refactors, CI/test fixes, structural consistency work across a codebase
— maintenance work, not judgement calls. `.devin/skills/venture-factory-maintainer/SKILL.md`
is the operating contract for that role, mirroring `CLAUDE.md` but scoped to factory
tooling instead of venture product code.

## Concept mapping

venture-factory grew several home-grown mechanisms to keep autonomous agents safe and
accountable. Each has a close analogue in how Devin actually works:

| venture-factory concept | Devin concept |
|---|---|
| Skill `knowledge/ledger.md` — dated, evidence-tagged heuristics; a `SKILL.md` procedure only changes once a heuristic proves out across n≥3 ventures (`skill-curator`) | **Devin Knowledge** — learnings captured and applied across sessions, confidence-gated rather than trusted on the first occurrence |
| `gate.py test` writes G5 green/red from the **real exit code** of the actual test suite — an agent cannot mark its own gate green by assertion | Devin runs the real test suite inside its own sandboxed VM and **proposes a PR**; it doesn't self-merge, so the same "evidence, not assertion" property holds |
| `guard.py` — a deterministic PreToolUse hook that allow/denies regardless of what the model intends (blocks gate-file writes, ungated deploys, unauthorised spend) | Devin's per-session tool/secret scoping (its Agent-Computer Interface) is least-privilege by construction: a session only gets the access its task needs |
| G2/G6 **human gates** — the orchestrator proposes, a human approves by editing the gate file outside the agent session; the model is deliberately never allowed to self-approve | Devin opens a PR / requests a merge; a human reviews and approves. Same "propose, don't self-approve" shape, just expressed as a PR review instead of a gate-file edit |
| `spend.py` auto-tracks tokens/USD per venture against a budget cap in `manifest.json` — "the factory has its own unit economics" | Devin's ACU-based cost accounting — extended here via `spend.py meta-add`/`meta-show` into `automation/meta-spend.json`, so factory-maintenance cost has its own ledger, separate from any venture's budget |
| Model tiering by judgement vs. volume (Opus for advisor/analyst/architect, Sonnet for build/test/ops, Haiku for wide research sweeps) | A Devin session is the right tool specifically for autonomous, long-horizon, PR-producing **maintenance** work — not a substitute for the G1/G2 judgement calls that stay with Opus-tier agents and a human |

## How to actually use this

Point a Devin session at this repo with a prompt like:

> Read `.devin/skills/venture-factory-maintainer/SKILL.md`, then `<task>` — e.g. "add a
> new skill for X", "fix the flaky case in test_guard.py", "extend lint.py to also check
> Y".

The skill file tells the session what it may touch (factory tooling), what it must never
touch (`ventures/*/gates/**`, a live venture's `manifest.json`/`brief.md`, any venture's
`product/` code), and what to run before calling the work done (`automation/lint.py`,
`.claude/hooks/test_guard.py`, `compileall`). It should open a branch and a PR, not push to
`main` — a human reviews and merges, same as everywhere else in this repo.

## Deliberately out of scope, for now

**Devin as a swappable G4/G5 execution engine** (an env flag choosing a Claude `builder`
subagent vs. a real Devin session per venture) is the natural next step once there's an
actual venture to validate it against — it's a strong structural fit given Devin's
sandboxed, test-running, PR-based execution model. It's not built here because doing it
well needs a real build to test it on, not a hypothetical one bolted onto the meta-engineer
work in the same pass. Called out explicitly so it reads as a scoping decision, not a gap
that went unnoticed.
