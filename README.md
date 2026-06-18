# venture-factory

A crew of specialised, self-improving AI agents that take a software product from
**opportunity to operating revenue** through a gated lifecycle — with deterministic
guardrails so the autonomy is safe.

Built on Claude Code / the Claude Agent SDK. The design doc is
[passive-income-agent-team-implementation-plan.md](passive-income-agent-team-implementation-plan.md);
the operating contract every agent follows is [CLAUDE.md](CLAUDE.md).

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

## Layout

```
.claude/            agents · skills · commands · hooks · settings.json
automation/         nightly_scout · run_eval · portfolio · package_plugin · product-repo-template
ventures/           _template · _schema · _eval · <live ventures> · INDEX.md (portfolio)
CLAUDE.md           the operating contract  ·  SECRETS.md  ·  the implementation plan
```

Run `python automation/portfolio.py` for a cross-venture status view, and
`python automation/package_plugin.py` to bundle the whole crew as an installable plugin.

## Note

`domain-advisor` and `financial-analyst` produce **decision-support, not licensed legal or
financial advice** — the human owns regulated decisions and both human gates.
