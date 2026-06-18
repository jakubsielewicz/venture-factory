# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

`venture-factory` is a crew of specialised, self-improving agents that take a software product from *opportunity* to *operating revenue* through a gated lifecycle. The full design lives in [passive-income-agent-team-implementation-plan.md](passive-income-agent-team-implementation-plan.md); **this file is the operating contract every agent must follow.**

## The gated lifecycle

`G0 Scout → G1 Validate → `**`G2 Decide (HUMAN)`**` → G3 Design → G4 Build → G5 Test → `**`G6 Operate/Deploy (HUMAN)`**` → Retro (curator)`

- **G2** and **G6** are hard human gates: money is spent at G2, something goes public at G6. The orchestrator STOPS and escalates — it never self-approves them.
- Marketing publishing is also human-gated.

## Per-venture state (`ventures/<slug>/`)

Each venture is an isolated working dir. Start a new one by copying `ventures/_template/` to `ventures/<slug>/`.

- `manifest.json` — machine-checkable state: current gate, per-gate required artifacts, running budget. **Single writer: the orchestrator.** Validates against `ventures/_schema/manifest.schema.json`.
- `brief.md` — the living source of truth. **Single writer: the orchestrator.** Specialists propose changes inside their own folder; the orchestrator integrates.
- `gates/<Gn>-<name>.json` — authoritative per-gate status. **The model must NEVER write here** (the PreToolUse guard blocks it). Gate state changes only via `.claude/hooks/gate.py` or a human editing the file.
- `research/ advisory/ financials/ marketing/ product/ runbook.md` — each specialist writes **only inside its own folder**.

## Gates are files, not vibes

- **Test gate (G5):** run `python .claude/hooks/gate.py test <slug>`. It runs the venture's tests, captures the **real exit code**, and writes `gates/G5-test.json` green/red with a source fingerprint. qa-engineer cannot mark its own gate green by assertion — only genuinely passing tests do.
- **Artifact gates (G0/G1/G3/G4):** run `python .claude/hooks/gate.py check <slug> <Gn>`. Green iff the manifest's `required_artifacts` for that gate all exist on disk.
- **Human gates (G2/G6):** a human sets the gate file `status` to `approved` by editing it directly (outside the agent session). The orchestrator stops and asks; it does not run an approval command on the human's behalf.
- **Enforcement (deterministic, in the hook):** the deploy guard blocks any deploy command unless `G5` is **green and fresh** (its source fingerprint matches the current build) **and** `G6` is approved. Resource-creation/spend is blocked unless `G2` is approved and the venture is within budget.

## Cost discipline (the factory has its own unit economics)

- Every venture carries a token + API-spend budget in `manifest.json`. Spend is **auto-tracked**: a `SubagentStop` hook runs `.claude/hooks/spend.py from-hook` to add each subagent's tokens to the active venture (use `spend.py add <slug> --tokens N` / `--usd X` for manual or API spend). The guard hard-stops deploy/spend once a cap is hit; halt and escalate if a gate blows its budget.
- Model tiering: Opus where judgement lives (advisor, analyst, architect); Sonnet for build/test/ops and the orchestrator; Haiku for wide research sweeps. The default subagent model is set via `CLAUDE_CODE_SUBAGENT_MODEL` in `.claude/settings.json`.
- Prefer one well-scoped subagent over five chatty ones (subagent-heavy runs cost ~7× a single thread).

## Guardrails

- **Least privilege:** see `.claude/settings.json`. Research/advisory agents are read-only; the builder writes only in its sandbox; deploy/spend tools always prompt a human *and* are gated by hooks.
- **Verify research before G2:** load-bearing numbers (TAM, pricing, competitor data) from web research must be checked against their cited source; record the check in `advisory/verification.md`. LLMs fabricate plausible figures — the go/no-go gate is where that costs money.
- **Decision-support, not licensed advice:** `domain-advisor` and `financial-analyst` outputs are decision-support; the human owns regulated (legal/financial/health) decisions.
- **Secrets are scoped per gate:** the builder gets no prod credentials; deploy/operate get only what their gate needs, from env / a secret manager — never committed, never handed to a read-only research agent or an injection script.
- **"Passive" is a scope decision:** if a venture needs ongoing support/billing/security ops, say so — call it *low-touch* and scope accordingly.

## Conventions

- **Cross-platform:** this repo is developed on Windows. Write helper/injection scripts in `python` (not bash); set a skill's `shell` frontmatter where a bash-ism is unavoidable. Hooks use the exec form so they run identically on Windows and Unix.
- **Active venture:** set `VF_ACTIVE_VENTURE=<slug>` (or work from inside `ventures/<slug>/`) so the guard can resolve which venture's gates and budget to enforce.
- **Definition of done (per gate):** required artifacts exist; the gate file is green/approved via the proper mechanism; the budget is respected; the report names decisions, artifacts, and open risks.

## Running the crew

- **Interactive:** start `claude` and give the orchestrator a goal ("run the venture pipeline for …; stop at G2 and G6").
- **Force a specialist:** `@agent-<name>` or `claude --agent <name>`.
- **Headless / scheduled:** the Agent SDK with `setting_sources=["user","project"]` (see plan §6). `automation/nightly_scout.py` runs an unattended G0 sweep on cron (guard hooks still apply).
- **Slash commands:** `/scout <theme>` · `/validate <slug>` · `/design <slug>` · `/build <slug>` · `/ship <slug>` (gated) · `/retro <slug>` — thin wrappers in `.claude/commands/` that drive the orchestrator at the right gate.

## Self-improvement & repeatability

- **The learning loop:** run `/retro <slug>` (the `skill-curator` skill) after every venture. It appends dated, evidence-tagged heuristics to each skill's `knowledge/ledger.md` and reusable artifacts to `examples/` (append-only). It does **not** silently rewrite a `SKILL.md` — proposed procedure changes go to `ventures/<slug>/retro/curator-proposals.md` for human review, and only earn a `SKILL.md` edit after proving out across ≥3 ventures. Ledgers over ~20 entries get compacted into `references/`.
- **Authoring more crew:** `/new-skill` and `/new-agent` (the meta-skills) scaffold new skills/agents to these conventions — least-privilege tools, lean progressive-disclosure bodies, fail-graceful injection scripts, and per-type `Agent(x), Agent(y)` spawn restrictions (never comma-packed).
- **Packaging:** `python automation/package_plugin.py` assembles the whole crew into `dist/venture-factory/` as an installable plugin (skills namespaced `venture-factory:<skill>`).
