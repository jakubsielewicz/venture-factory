# venture-factory

A crew of specialised, self-improving AI agents that take a software product from
**opportunity to operating revenue** through a gated lifecycle — with deterministic
guardrails so the autonomy is safe.

Built on Claude Code / the Claude Agent SDK, with a Devin-facing maintenance layer (see
[Devin in this repo](#devin-in-this-repo) below). The design doc is
[docs/passive-income-agent-team-implementation-plan.md](docs/passive-income-agent-team-implementation-plan.md);
the operating contract every agent follows is [CLAUDE.md](CLAUDE.md).

## For reviewers (short version)

If you're evaluating this repo and have limited time, in order:
1. [`CLAUDE.md`](CLAUDE.md) — the operating contract every agent follows.
2. `ventures/au-sme-compliance/gates/G5-test.json` — a real `npm test` run (exit code +
   output + source fingerprint) from the one venture that graduated the full G0→G6
   lifecycle; the gate can't be marked green by an agent asserting it, only by this file.
3. [`.claude/hooks/guard.py`](.claude/hooks/guard.py) +
   [`.claude/hooks/test_guard.py`](.claude/hooks/test_guard.py) — the deterministic
   guardrail layer and its regression suite.
4. [`docs/why-devin-here.md`](docs/why-devin-here.md) + `.devin/skills/` — the Devin-specific
   work, described below.

## The gated lifecycle

```
G0 Scout → G1 Validate → [G2 Decide — HUMAN] → G3 Design → G4 Build → G5 Test → [G6 Operate/Deploy — HUMAN] → Retro
```

**G2** (money is spent) and **G6** (something goes public) are hard human gates. Marketing
publishing is gated too. Everything between can run autonomously once trusted.

## Why it's safe (gates are files, not vibes)

Deterministic hooks back the probabilistic agents — enforced regardless of what a model
"decides":

- **Test gate:** `gate.py test <slug>` writes G5 green/red from the **real test exit code** + a source fingerprint. An agent can't mark its own gate green.
- **Deploy guard:** blocks any deploy unless G5 is green **and fresh** and a human approved G6.
- **Spend guard:** blocks resource-creation/spend unless G2 is approved and the venture is within budget. Budget is **auto-tracked** per subagent (a `SubagentStop` hook).
- **Publish guard:** blocks social/email/ads (Bash or MCP send tools) until a human approves `marketing-publish`.
- **Secrets:** the guard hard-denies reading/exfiltrating `.env`/`.pem`/`.key` via the shell (see [SECRETS.md](SECRETS.md)).
- Gate state files are **not model-writable** — only `gate.py` (from evidence) or a human edit.

All of this is covered by committed regression tests (`.claude/hooks/test_guard.py`) and a
structural linter (`automation/lint.py`), run in CI.

## The crew

**9 agents** — `venture-orchestrator` (lead) + `opportunity-scout`, `domain-advisor`,
`financial-analyst`, `product-architect`, `builder`, `qa-engineer`, `operator`,
`growth-marketer`. **38 skills** (each a directory with a lean `SKILL.md` + a curator
`knowledge/ledger.md`). Model-tiered: Opus for judgement, Sonnet for build/test/ops.

## Quickstart

```bash
# Interactive: start claude in the repo and give the orchestrator a goal,
# or drive a stage directly:
/scout "compliance automation for AU SMEs"   # G0
/validate <slug>                              # G1 → stops at the G2 human gate
/design <slug> · /build <slug> · /ship <slug> # G3 → G4 → G5+G6 (gated)
/retro <slug>                                 # self-improvement pass

# Headless (Agent SDK): unattended G0 sweep on cron
pip install claude-agent-sdk && python automation/nightly_scout.py "<theme>"
```

Activate the guardrails by enabling `.claude/settings.json` (least-privilege permissions +
the hooks). Copy `.env.example` → `.env` for optional data-source keys.

## Self-improvement

After each venture, `/retro` runs the `skill-curator`: it appends dated, evidence-tagged
heuristics to each skill's ledger and proposes `SKILL.md` edits for human review (promoted
only after proving out across ≥3 ventures). `ventures/_eval/` holds golden cases so
"the skills improve" is measurable, not just asserted.

## Devin in this repo

The crew above is Claude Code-native. Devin's role here is deliberately narrower and
different in kind: it's the factory's **meta-engineer** — maintaining/hardening the
factory's own tooling (agents, skills, hooks, automation, docs), not running a venture
through the lifecycle. `.devin/skills/venture-factory-maintainer/SKILL.md` is Devin's
operating contract for that role (mirrors `CLAUDE.md`, scoped to factory tooling); factory-
maintenance cost is tracked separately via `spend.py meta-add`/`meta-show` into
`automation/meta-spend.json`, rather than against any venture's budget. See
[`docs/why-devin-here.md`](docs/why-devin-here.md) for the full reasoning and the concept
mapping between this repo's gate/guard/ledger design and Devin's own concepts, plus what's
deliberately out of scope for now.

## Layout

```
.claude/            agents · skills · commands · hooks · settings.json
.devin/             skills/venture-factory-maintainer — Devin's factory-maintenance contract
automation/         nightly_scout · run_eval · portfolio · package_plugin · product-repo-template
ventures/           _template · _schema · _eval · <live ventures> · INDEX.md (portfolio)
docs/               why-devin-here.md · the implementation plan · agent-skill-flow diagram
CLAUDE.md           the operating contract  ·  SECRETS.md  ·  LICENSE
```

Run `python automation/portfolio.py` for a cross-venture status view, and
`python automation/package_plugin.py` to bundle the whole crew as an installable plugin.

## Note

`domain-advisor` and `financial-analyst` produce **decision-support, not licensed legal or
financial advice** — the human owns regulated decisions and both human gates.
