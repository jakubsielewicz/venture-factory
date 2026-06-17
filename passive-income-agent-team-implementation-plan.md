# Passive-Income Agent Team — Implementation Plan

A buildable plan for a crew of specialised, self-improving agents that take a software product or service from *opportunity* to *operating revenue* inside the Claude Code / Agent SDK harness. Written to be executed, not just read: directory layout uses verified Claude Code paths, every prompt is copy-paste ready, and the skill design satisfies the "skills improve as context is acquired" requirement through four concrete mechanisms.

---

## 1. Design thesis — separate the *who* from the *what*

The single most important decision is to stop treating "agent" as the atomic unit. The harness gives you a layered model, and conflating the layers is what produces context blowout and inconsistent behaviour:

```
Harness (Claude Code runtime, or your Agent SDK process)
└── Main Agent  →  the venture-orchestrator (coordinates, sequences gates, holds shared state)
    ├── Skills      →  in-context competencies, progressively disclosed, IMPROVABLE
    ├── Subagents   →  isolated specialist workers, fresh context, one-way report back
    └── Agent Teams →  (experimental) peer crews with a shared task list — defer for now
    Plugins  →  package + distribute the whole crew across ventures
    Hooks    →  deterministic guardrails at lifecycle events (spend, deploy, test gates)
```

Mapped to your request:

| Your concept | Harness primitive | Why |
|---|---|---|
| **The team of agents** (researcher, advisor, marketer, analyst, designer, builder, tester, operator) | **Subagents** in `.claude/agents/` | Each is a persona with its own context window, tool allow-list, and model. The orchestrator delegates to them by matching their `description`. |
| **The specialised skills** each agent uses (market sizing, DCF, SEO, C4 design, test planning…) | **Skills** in `.claude/skills/<name>/SKILL.md` | Reusable, progressively disclosed, and — critically — **improvable by appending context** without bloating the prompt. |
| **Skills improve with added context** | Skill *supporting files* + a `skill-curator` meta-skill + dynamic context injection | Four mechanisms, detailed in §4. |
| **The thing that runs the show** | **Main agent** = `venture-orchestrator`, optionally driven by **slash commands** and the **Agent SDK** for headless/scheduled runs | §6. |

The rule of thumb: **a subagent is a hire; a skill is a competency that hire (or any hire) can pick up.** A financial-analyst subagent *is* a team member; `discounted-cash-flow` is a skill it loads. Keeping them separate means you improve a competency once and every agent that preloads it gets sharper.

---

## 2. The crew (subagents)

Nine agents: one lead plus eight specialists, mapped to a gated lifecycle that will be familiar from six-gate delivery. The orchestrator enforces gate exit-criteria and stops at the human-approval gates (money + public-facing actions).

| Stage / Gate | Agent (`name`) | Mandate | Default model | Tool posture (progressive autonomy) |
|---|---|---|---|---|
| **Lead** | `venture-orchestrator` | Decompose the goal, route to specialists, sequence gates, hold shared state in `ventures/<slug>/`, enforce gate criteria, escalate to human at approval gates. | Opus (judgement/coordination) | Read, Write (state only), `Agent(...)` to spawn the crew |
| **G0 Scout** | `opportunity-scout` | Find and shortlist passive-income opportunities; size demand/TAM; competitor teardown; niche scoring. | Sonnet (Haiku for wide search passes) | **Read-only** + WebSearch/WebFetch. No write outside `research/`. |
| **G1 Validate** | `domain-advisor` | Professional/strategic advice: regulatory & compliance scan, risk register, go/no-go rationale, moat assessment. Outputs **decision-support, not licensed advice.** | Opus | Read-only + WebSearch. No writes outside `advisory/`. |
| **G1 / G3 Money** | `financial-analyst` | Quantify viability: unit economics, pricing model, CAC/LTV, break-even, sensitivity. Viability pass at G1; pricing + cost envelope at G3. Outputs **decision-support, not licensed advice.** | Opus | Read/Write in `financials/` only. No spend, no publishing. |
| **G2 Decide** | *(human gate, orchestrated)* | Go/no-go on the validated brief. Spend authorisation. | — | Human approval required |
| **G3 Design** | `product-architect` | PRD, C4 model, data model, API contracts, NFRs, build-vs-buy, cost envelope. | Opus | Read/Write in `product/design/`. No build, no deploy. |
| **G4 Build** | `builder` | Implement to spec in a sandbox; scaffolding, IaC, CI config; incremental commits. | Sonnet | Read/Write/Edit/Bash **in repo sandbox only**. No deploy, no spend, no prod creds. |
| **G5 Test** | `qa-engineer` | Test plan, automated tests, acceptance criteria, security checklist, perf smoke. | Sonnet | Read/Bash (run tests). Write only in `tests/`. Cannot mark its own gate green. |
| **G6 Operate** | `operator` | Deploy runbook, observability, cost-optimisation, incident response, maintenance loop. | Sonnet | Read/Bash + deploy tools **behind a human gate + hooks**. |
| **Cross-cutting** | `growth-marketer` | Positioning, ICP, channel strategy, SEO/content, launch sequence, funnel & pricing-page copy. Supplies a lightweight ICP / willingness-to-pay input at **G1** (it feeds opportunity scoring and unit economics), then leads positioning & launch from **G3**. | Sonnet | Read/Write in `marketing/` + WebSearch. **No publishing without approval.** |

Subagent definition format (verified): a Markdown file at `.claude/agents/<name>.md` with YAML frontmatter — `name`, `description` (this is the *routing trigger*, not a label — write it like a rule, add "use PROACTIVELY" for auto-delegation), optional `tools` (comma-separated allow-list; inherits all if omitted; `Agent(type)` syntax restricts which subagents it can spawn), optional `model` (`opus`/`sonnet`/`haiku`/full-id/`inherit`), and optional `skills:` (a list of skill names whose **full content is injected at startup** — subagents do *not* preload the parent's skills, so preload the hot path deliberately; they *can* still invoke any other project/user/plugin skill on demand via the Skill tool, so don't over-preload). The body is the system prompt.

> **Cost reality to design around:** subagent-heavy runs can consume *~7×* the tokens of a single thread because each subagent holds its own context. Tier models accordingly (Opus where judgement lives: advisor, analyst, architect; Sonnet for build/test/ops and — worth trying — the orchestrator itself, since coordination is rarely the judgement bottleneck; Haiku for wide research sweeps), and prefer one well-scoped subagent over five chatty ones. Set a default with `CLAUDE_CODE_SUBAGENT_MODEL` and override per agent in frontmatter.
>
> **The factory has its own unit economics.** Set a **token/cost budget per venture and per gate**, record running spend in the venture's `manifest.json`, and have the orchestrator halt and escalate when a gate blows its budget — otherwise the crew that models unit economics has none of its own. A `PreToolUse` hook hard-stops side-effecting tools once a venture exceeds its envelope (wired in §8 and the Phase-0 scaffold).

---

## 3. The skill library (competencies)

Skills are where the real leverage is, because they're shared across agents and they're the thing that *gets better over time*. Group them by the agent that primarily preloads them; several are deliberately cross-cutting.

| Agent | Skills (`.claude/skills/<name>/`) |
|---|---|
| `opportunity-scout` | `opportunity-scoring`, `market-sizing`, `competitor-teardown`, `demand-signals` (pulls live trend/search data), `niche-fit-scorecard` |
| `domain-advisor` | `regulatory-scan`, `risk-register`, `moat-assessment`, `go-no-go-memo` |
| `financial-analyst` | `unit-economics`, `pricing-model`, `saas-metrics` (MRR/churn/CAC/LTV), `dcf-lite`, `sensitivity-analysis` |
| `growth-marketer` | `positioning-canvas`, `icp-definition`, `seo-keyword-research`, `launch-playbook`, `pricing-page-copy` |
| `product-architect` | `prd-authoring`, `c4-model`, `api-contract`, `nfr-checklist`, `build-vs-buy` |
| `builder` | `scaffold-stack`, `iac-baseline`, `secure-defaults`, `commit-discipline` |
| `qa-engineer` | `test-plan`, `e2e-suite`, `security-checklist`, `perf-smoke` |
| `operator` | `deploy-runbook` (auto-captured, see §4.4), `observability-baseline`, `cost-optimisation`, `incident-response` |
| **Meta** | `skill-curator` (improves the others — §4.2), `new-skill` (authors new skills — §7A) |

Each skill is a **directory**, not a lone file. This is the structure that makes "improve with added context" mechanical rather than aspirational:

```
unit-economics/
├── SKILL.md           # lean entrypoint: when to use + the procedure (REQUIRED)
├── references/        # deep reference loaded on demand (benchmarks, formulas, definitions)
│   └── saas-benchmarks.md
├── examples/          # worked cases — APPEND new ones as you learn
│   └── 2026-06-vertical-saas.md
├── knowledge/         # the learning ledger — dated heuristics & anti-patterns (curator writes here)
│   └── ledger.md
└── scripts/           # executable helpers the skill can run
    └── pull_benchmarks.py
```

Keep the **SKILL.md body lean** — once a skill loads, its body stays in context across turns, so every line is a recurring token cost. Put depth in `references/` and `knowledge/` and *reference them by path* from the body so Claude loads them only when needed. `description` (+ optional `when_to_use`) is what the model sees at startup to decide whether to load the skill at all; it's truncated at 1,536 characters, so lead with the trigger.

---

## 4. How the skills *improve with acquired context* (the headline requirement)

Four complementary mechanisms, all native to the harness. Together they mean every engagement makes the next one sharper, without inflating the prompt.

### 4.1 Progressive disclosure + supporting files
The default context only ever holds each skill's `name` + `description`. The body loads when relevant; `references/`, `examples/`, and `knowledge/` load only when the body points to them. **Consequence:** you can grow a skill's accumulated knowledge without limit and pay almost nothing until it's used. Adding context = adding/appending files, never editing the lean body.

### 4.2 The learning loop — `skill-curator` meta-skill
After a venture (or a gate) completes, the orchestrator invokes `skill-curator`. It reads what actually happened — decisions, what worked, what was wrong, reusable assets produced — distils it into **dated, atomic entries** (a new heuristic, an anti-pattern, a reusable template, an updated benchmark) and **appends** them to the relevant skill's `knowledge/ledger.md` or drops a new file in `examples/`. It never rewrites the procedure unless a heuristic has proven itself across ≥3 cases. This is the self-improvement engine: skills accrete validated experience the way a senior practitioner builds judgement. (Full SKILL.md in §7D.)

**Four safeguards so the loop sharpens rather than poisons the skills:**
- **Bounded ledgers.** Append-only ledgers grow forever and silently re-inflate context — the very thing progressive disclosure avoids. The curator must periodically **compact** the ledger into `references/`, and the lean `SKILL.md` body should load only the top-N highest-confidence entries, not the whole file.
- **Evidence before influence.** Tag every entry with an evidence count and confidence; a heuristic only changes behaviour once corroborated (≥3 ventures to edit `SKILL.md`, ≥2 for an active ledger entry). This guards against N=1 overfitting from a single bad outcome.
- **Human-approved diffs (until trusted).** While the crew is young, the curator emits a **proposed diff for human approval** rather than silently mutating skills; flip a skill to autonomous curation only once it has earned it.
- **A frozen eval set.** Keep a handful of golden briefs/opportunities and re-run them after curator edits, so "skills improve" is *falsifiable* and regressions surface. Without it the headline claim is untestable.

### 4.3 Dynamic context injection — always-fresh inputs
A skill body can run a shell command at load time and inline the output before Claude sees it, using the `` !`command` `` syntax. So the *procedure* is static but the *context it reasons over* is current. Examples:
- `demand-signals` runs `` !`python scripts/pull_trends.py "$0"` `` to pull live search/trend data for the niche.
- `unit-economics` runs `` !`python scripts/pull_benchmarks.py` `` to ground multiples in this week's comparables, not last year's memory.
- `deploy-runbook` runs `` !`git diff --stat HEAD~1` `` so it operates on the actual change being shipped.

This is the difference between "a skill that knows how" and "a skill that knows how *and* what's true right now."

**Three rules for injection scripts, because they run synchronously at *every* skill load (confirmed: the `` !`…` `` command executes before Claude sees the body):**
1. **Fail gracefully.** A script that errors, hangs, or lacks credentials breaks the whole skill. On any failure it must print a `DATA UNAVAILABLE: <reason>` marker and exit 0 — never throw — so the procedure still runs on model knowledge alone.
2. **Never interpolate user text into the shell.** `` !`python scripts/pull_trends.py "$ARGUMENTS"` `` is a command-injection vector if the niche string contains shell metacharacters. Pass arguments via an environment variable or stdin and read them inside the script.
3. **Name the data source and its auth.** Trend/SEO/market APIs are usually paid and key-gated — specify where the key comes from (a per-gate secret, never a prod credential) and count that API spend against the venture budget.

### 4.4 Runbook capture — skills that write themselves
For the operator, use the `/run-skill-generator` pattern: it gets the app running from a clean environment, captures the exact install/env/launch recipe, and commits it as a per-project skill at `.claude/skills/run-<name>/`. Re-run it whenever the build or launch process changes. The operating knowledge is captured as a skill that improves as the product evolves — no manual documentation drift.

---

## 5. Storage within the harness

Verified locations and precedence. Pick the scope by *audience and reuse*, then lock it in version control.

| Scope | Path | Use it for |
|---|---|---|
| **Personal / user** | `~/.claude/skills/<name>/` and `~/.claude/agents/<name>.md` | Generic, venture-agnostic competencies you reuse everywhere (e.g. `seo-keyword-research`, `dcf-lite`, `commit-discipline`). Available across all your projects. |
| **Project** | `<repo>/.claude/skills/...` and `<repo>/.claude/agents/...` | Venture-specific agents, skills, the orchestrator, and slash commands. **Committed to git** so the whole crew is reproducible and versioned. This is the default home for the system. |
| **Plugin** | `<plugin>/skills/...`, `<plugin>/agents/...`, `<plugin>/commands/...` + `.claude-plugin/plugin.json` | Package the *entire crew* once and install it into every new venture repo. Plugin skills are namespaced `plugin:skill` so they never collide. This is the endgame for a repeatable passive-income factory. |

Precedence when names collide: **session > project > user > plugin** for agents; **enterprise > personal > project** for skills (plugin skills are namespaced and can't conflict). Project skills also auto-load from parent dirs up to the repo root and from nested `.claude/skills/` in subpackages — handy for a monorepo of ventures.

Recommended layout for the foundry (a per-venture working dir under `ventures/` keeps each opportunity's state isolated and gives the orchestrator and curator something concrete to read):

```
venture-factory/                         # harness root (rename as you like) — git repo
├── CLAUDE.md                            # operating context: conventions, the gate model, guardrails, "definition of done"
├── .claude/
│   ├── settings.json                    # permissions (allow/deny per tool & Skill(...)), hooks, env, MCP servers
│   ├── agents/                          # the crew
│   │   ├── venture-orchestrator.md
│   │   ├── opportunity-scout.md
│   │   ├── domain-advisor.md
│   │   ├── financial-analyst.md
│   │   ├── growth-marketer.md
│   │   ├── product-architect.md
│   │   ├── builder.md
│   │   ├── qa-engineer.md
│   │   └── operator.md
│   ├── skills/                          # the competencies (each a directory, see §3)
│   │   ├── opportunity-scoring/
│   │   ├── unit-economics/
│   │   ├── …
│   │   ├── new-skill/                   # meta: authors new skills
│   │   └── skill-curator/               # meta: improves existing skills
│   └── commands/                        # one-word entry points (== skills; /name)
│       ├── scout.md                     # /scout  → run G0 across a theme
│       ├── validate.md                  # /validate <slug>
│       ├── design.md                    # /design <slug>
│       ├── build.md                     # /build <slug>
│       ├── ship.md                      # /ship <slug>  (gated)
│       └── retro.md                     # /retro <slug> → run skill-curator
└── ventures/                            # per-opportunity state (the orchestrator's working memory)
    └── <venture-slug>/
        ├── manifest.json                # machine-checkable state: current gate, required artifacts per gate, running spend
        ├── brief.md                     # the living source of truth — the ORCHESTRATOR is the sole writer
        ├── gates/                       # one file per gate; status set by hooks/wrappers, NOT by the model
        │   ├── G1-validate.json
        │   ├── G5-test.json             # `green` written by gate.py from the REAL test exit code
        │   └── …
        ├── research/                    # scout outputs    (scout writes here only)
        ├── advisory/                    # advisor outputs  (advisor writes here only)
        ├── financials/                  # analyst outputs  (analyst writes here only)
        ├── marketing/                   # marketer outputs (marketer writes here only)
        ├── product/                     # design/ + src/ + tests/
        └── runbook.md                   # operator's deploy/run/observe procedures
```

**Make the handoffs a contract, not a hope.** Subagents are stateless across invocations, so every gate's output is just files the next agent re-reads — define a `manifest.json` per venture listing the artifacts each gate must produce, so exit-criteria are *machine-checkable* rather than prose the orchestrator has to judge. Pin **single-writer ownership**: the orchestrator is the only writer of `brief.md` and `manifest.json` (specialists propose changes inside their own folder; the orchestrator integrates), and each specialist writes only within its designated subfolder. The `gates/` files give you free **resumability** — after any interruption the orchestrator reads gate state and knows exactly where the venture stands. (Note: a skill's slash-command name comes from its **directory** name, not the frontmatter `name`; the `commands/` files above are thin wrappers and can equivalently be skills invoked as `/name`.)

To turn the crew into a reusable plugin later, add `.claude-plugin/plugin.json` to a skill folder (or a top-level plugin dir) and it loads as a plugin that can bundle agents, hooks, and MCP servers — installable into any future venture repo with one command.

---

## 6. How the crew is initiated and executes

Three initiation modes, same crew underneath. Use interactive while you're building trust in the agents; move to SDK once a stage is reliable enough to run unattended.

**(a) Interactive, orchestrator-led.** Start `claude` in the repo and give the orchestrator a goal:
> "Run the full venture pipeline for an AN-ACC-adjacent micro-SaaS idea targeting Australian aged-care compliance leads. Stop at G2 for my go/no-go and at G6 for deploy."

The orchestrator decomposes the work, delegates to each specialist (which loads its preloaded skills in an isolated context and writes to `ventures/<slug>/`), enforces gate exit-criteria, and halts at the human gates. You can also force a specific specialist with `@opportunity-scout look at vertical X` or `claude --agent financial-analyst`.

**(b) Slash-command entry points.** Each stage gets a one-word command (commands are now just skills): `/scout "<theme>"`, `/validate <slug>`, `/design <slug>`, `/build <slug>`, `/ship <slug>` (gated), `/retro <slug>` (runs the curator). These are thin wrappers that invoke the orchestrator with the right stage and args — ideal for muscle-memory and for non-interactive triggering.

**(c) Headless / scheduled via the Agent SDK.** For genuinely *passive* operation, drive it programmatically. The Python SDK loads your filesystem skills and agents via `setting_sources` and runs without a human in the loop — perfect for a nightly opportunity sweep on cron, or a weekly cost-optimisation pass by the operator:

```python
import asyncio
from claude_agent_sdk import query, ClaudeAgentOptions

async def nightly_scout():
    options = ClaudeAgentOptions(
        cwd="/path/to/venture-factory",
        setting_sources=["user", "project"],          # load .claude/skills + .claude/agents from disk (omits "local"; the SDK default is all three — keep nothing the cron run needs in settings.local.json)
        allowed_tools=["Skill", "Read", "Write", "Bash", "WebSearch", "Agent"],
        # gate destructive/expensive tools off here; keep the unattended loop read-mostly
    )
    prompt = ("Run G0 (opportunity-scout) across the 'compliance automation for AU SMEs' theme. "
              "Score the top 5, write briefs to ventures/, and open a go/no-go memo for each. "
              "Do not proceed past G1 without human approval.")
    async for message in query(prompt=prompt, options=options):
        print(message)

asyncio.run(nightly_scout())
```

The gated pipeline in one line: **Scout → Validate → [human go/no-go + spend auth] → Design → Build → Test → [human deploy approval] → Operate → Retro (curator updates the skills) → repeat.** Human gates sit exactly where money is spent or something goes public; everything else can run autonomously once trusted.

---

## 7. The prompts

Four reusable prompts. A and B generate the building blocks; C gives you ready-to-paste starters; D is the self-improvement engine. Paste A/B into Claude Code (or save them as the `new-skill` / `new-agent` skills) and let Claude scaffold the directory.

### 7A. Skill generator (meta-prompt → produces a `SKILL.md`)

```
You are authoring a Claude Code Skill as a directory with a SKILL.md entrypoint.

INPUTS
- Skill name (kebab-case): {{name}}
- Primary agent that will preload it: {{agent}}
- Job to be done (1–2 sentences): {{job}}
- Trigger situations / phrases that should load it: {{triggers}}
- Live inputs it should pull at load time, if any: {{dynamic_inputs}}
- Tools it legitimately needs: {{tools}}

PRODUCE the file tree and the full SKILL.md, following these rules:
1. Frontmatter: `name`, a `description` that leads with the trigger ("Use when …"),
   optional `when_to_use` for extra trigger phrases, and `allowed-tools` limited to {{tools}}.
   Keep description + when_to_use under ~1500 characters.
2. Body: state WHAT to do as a numbered procedure. Be terse — the body stays in context
   across turns, so no narration of why. Target < 40 lines.
3. Progressive disclosure: move any deep reference, benchmark tables, or long examples into
   `references/` and `examples/`, and reference them by relative path from the body so they
   load only on demand. Do NOT inline them.
4. If {{dynamic_inputs}} is non-empty, use dynamic context injection: a `` !`<command>` `` line
   near the top so the live data is inlined before reasoning. Put the script in `scripts/`.
5. Create an empty `knowledge/ledger.md` with a header, so the skill-curator has a place to
   append validated heuristics later.
6. Output: the directory tree, then each file's full contents in its own code block.

Make the skill genuinely useful for {{agent}} — concrete steps, real decision criteria,
explicit output format. Avoid placeholders; write the actual procedure.
```

### 7B. Subagent generator (meta-prompt → produces a `.claude/agents/<name>.md`)

```
You are authoring a Claude Code subagent (a team member) as a Markdown file with YAML frontmatter.

INPUTS
- Agent name (kebab-case): {{name}}
- Role & mandate: {{mandate}}
- Lifecycle stage / gate it owns: {{gate}}
- Skills to preload (full content injected at startup): {{skills}}
- Tools it may use (allow-list; omit to inherit all): {{tools}}
- Model: {{model}}   # opus for judgement, sonnet for build/test, haiku for wide search
- Autonomy level: {{autonomy}}  # read-only | write-in-sandbox | gated-side-effects
- Hard guardrails (never-do list): {{guardrails}}

PRODUCE the full file:
1. Frontmatter: `name`; a `description` written as a ROUTING RULE — name the exact situations
   and phrases that should make the orchestrator delegate here; add "use PROACTIVELY" only if it
   should auto-trigger. Include `tools: {{tools}}`, `model: {{model}}`, and
   `skills:` listing {{skills}}.
2. Body (system prompt): define the role in the second person ("You are the …"). Specify:
   - the exact inputs it reads (which files under ventures/<slug>/) and where it writes outputs;
   - a step-by-step operating procedure tied to its gate;
   - the gate EXIT CRITERIA it must satisfy before reporting done (a checklist);
   - the never-do guardrails from {{guardrails}}, stated as hard stops;
   - the report format it returns to the orchestrator (concise; decisions + artifacts + open risks).
3. Enforce least privilege: if {{autonomy}} is read-only, the body must refuse to write outside its
   designated folder and must not call side-effecting tools.

Write the actual procedure, not a template. Keep it maintainable — concise beats comprehensive.
```

### 7C. Two worked skills + two worked subagents (paste-ready starters)

**Skill — `opportunity-scoring/SKILL.md`** (shows dynamic injection + a scorecard output):

```markdown
---
name: opportunity-scoring
description: Use when shortlisting or ranking passive-income product/service ideas. Triggers — "score this idea", "is this niche worth it", comparing several opportunities, or any G0/scout pass.
when_to_use: opportunity shortlisting, niche comparison, TAM-vs-effort triage, go/park decisions at G0.
allowed-tools: Read, Write, WebSearch, WebFetch, Bash
---

## Live demand snapshot
!`python scripts/pull_trends.py "$ARGUMENTS"`

## Procedure
1. For the idea in $ARGUMENTS, fill the scorecard below. Use the live snapshot above plus 2–3 web searches for competitors and pricing. Cite sources.
2. Score each dimension 1–5; multiply by weight; sum to a 0–100 Opportunity Score.
   - Demand & search momentum (w=0.25)
   - Monetisation clarity / willingness-to-pay (w=0.20)
   - Passive-fit: low ongoing ops after build (w=0.20)
   - Build feasibility for a solo/small team (w=0.15)
   - Defensibility / moat potential (w=0.10)
   - Regulatory drag (inverse; w=0.10)
3. Flag any disqualifiers (legal blocks, platform dependency, zero willingness-to-pay).
4. Output: the scorecard table, the score, a one-paragraph verdict (PURSUE / PARK / KILL), and the top 3 unknowns to resolve at G1.
5. Write the result to ventures/<slug>/research/opportunity-score.md. Do not write elsewhere.

See references/scoring-rubric.md for dimension definitions and worked anchors.
```

**Skill — `unit-economics/SKILL.md`** (shows benchmark grounding + reference offloading):

```markdown
---
name: unit-economics
description: Use when modelling whether a product makes money — pricing, margins, CAC/LTV, payback, break-even. Triggers — "do the unit economics", "what should we charge", "is this profitable", any G1/G3 financial pass.
allowed-tools: Read, Write, Bash
---

## Current benchmarks
!`python scripts/pull_benchmarks.py`

## Procedure
1. Establish the revenue unit (per seat / per usage / flat) and the pricing hypothesis.
2. Build the per-unit P&L: price − COGS (infra, payment fees, support) = contribution margin.
3. Compute CAC (by channel), LTV (ARPU × gross margin × expected lifetime from churn), LTV:CAC, and CAC payback months.
4. Find break-even units and break-even months given the build cost from financials/build-cost.md.
5. Stress it: run sensitivity on price ±20%, churn ±50%, CAC ±50% (call the sensitivity-analysis skill if present).
6. Verdict: healthy (LTV:CAC ≥ 3, payback ≤ 12mo) / fixable / unviable, with the one lever that moves it most.
7. Write to ventures/<slug>/financials/unit-economics.md.

Definitions, formulas, and current SaaS benchmark ranges: references/saas-benchmarks.md.
This is decision-support, not financial advice; the human owns the pricing decision.
```

**Subagent — `financial-analyst.md`**:

```markdown
---
name: financial-analyst
description: Delegate here for any money question on a venture — pricing, unit economics, CAC/LTV, DCF, sensitivity, break-even, revenue modelling. Use PROACTIVELY at G1 (viability) and G3 (pricing/cost envelope).
tools: Read, Write, Bash
model: opus
skills:
  - unit-economics
  - pricing-model
  - saas-metrics
  - sensitivity-analysis
---

You are the venture's financial analyst. You quantify whether an idea makes money and under what assumptions.

Inputs: read ventures/<slug>/brief.md, research/, and any financials/ already present.
Outputs: write only inside ventures/<slug>/financials/.

Procedure:
1. State your assumptions explicitly and flag the three that most drive the result.
2. Apply the preloaded skills to build: unit economics, a pricing model with 2–3 tiers, the key SaaS metrics, and a sensitivity table.
3. Ground every multiple/benchmark in the live data your skills pull — never assert market numbers from memory; cite them.
4. Produce a one-page verdict: viable / fixable / unviable, the break-even point, and the single highest-leverage lever.

Gate exit criteria (all must hold before you report done):
- [ ] Assumptions listed and sourced
- [ ] LTV:CAC, CAC payback, break-even units & months computed
- [ ] Sensitivity run on price, churn, CAC
- [ ] Clear verdict with the decisive lever named

Never: give personalised investment advice; present projections as guarantees; spend money; touch anything outside financials/. Your output is decision-support — the human makes the call.

Report to the orchestrator: verdict + the 3 load-bearing assumptions + open financial risks, in under 200 words.
```

**Subagent — `builder.md`**:

```markdown
---
name: builder
description: Delegate here to implement an approved design into working software — scaffolding, feature code, IaC, CI config. Use at G4 only, after a design exists and go/no-go has passed.
tools: Read, Write, Edit, Bash, Grep, Glob
model: sonnet
skills:
  - scaffold-stack
  - iac-baseline
  - secure-defaults
  - commit-discipline
---

You are the builder. You turn the architect's spec into running code in a sandbox.

Inputs: read ventures/<slug>/product/design/ (PRD, C4, API contracts, NFRs).
Workspace: ventures/<slug>/product/src/ only.

Procedure:
1. Confirm the design is complete enough to build; if a contract is missing, stop and report the gap rather than inventing it.
2. Scaffold per scaffold-stack; apply secure-defaults from the first commit (no secrets in code, least-privilege, input validation).
3. Implement in small, tested increments; commit with clear messages per commit-discipline.
4. Provision infra as code only (iac-baseline) — never click-ops, never create cloud resources outside the declared envelope.

Gate exit criteria:
- [ ] Builds clean from a fresh checkout
- [ ] Matches the API contracts and NFRs
- [ ] No secrets committed; secure defaults in place
- [ ] Handed to qa-engineer with build/run notes

Never: deploy to production; use production credentials; incur spend beyond the approved envelope; mark your own work as tested. Testing is qa-engineer's gate; deployment is operator's, behind a human gate.

Report: what was built, deviations from spec (with reasons), and what QA should focus on.
```

### 7D. The self-improvement engine — `skill-curator/SKILL.md`

```markdown
---
name: skill-curator
description: Use at the end of a venture or gate (a retro) to make the crew's skills smarter from what just happened. Triggers — "/retro", "run the curator", post-mortem, "capture what we learned".
allowed-tools: Read, Write, Glob, Grep
disable-model-invocation: false
---

## Procedure
1. Read the completed venture's ventures/<slug>/ tree and identify, per stage, what worked, what was wrong, and any reusable asset produced (template, query, benchmark, checklist).
2. For each lesson, decide its home:
   - A reusable artifact → save into the relevant skill's examples/ as a dated file.
   - A validated heuristic or anti-pattern → append a dated, one-line entry to that skill's knowledge/ledger.md.
   - A fresh benchmark/number → update the relevant references/ file (note the date and source).
3. Only modify a skill's core SKILL.md procedure if a heuristic has now proven out across ≥3 ventures; otherwise leave the procedure untouched and let evidence accumulate in knowledge/.
4. Never delete prior ledger entries; supersede with a newer dated entry if contradicted.
5. Output a short changelog: which skills were updated and why.

Entry format for ledger.md:
`YYYY-MM-DD — <skill> — <heuristic/anti-pattern> — evidence: <venture-slug>`

This is how competencies compound: every cycle leaves the skills sharper than it found them, with zero added cost to the default context.
```

---

## 8. Governance & guardrails

The crew is trusted with progressively more autonomy as it earns it; deterministic controls backstop the probabilistic agents.

- **Least-privilege tools per agent.** Research and advisory agents are read-only; build/test agents write only in their sandbox; deploy and spend sit behind explicit gates. Enforce in `.claude/settings.json` with allow/deny rules, including `Skill(name)`/`Skill(name *)` to gate which skills can run and `permissions.deny` on the `Agent` tool or specific built-in subagents.
- **Deterministic gates via hooks, anchored to files.** Hooks fire on lifecycle events regardless of what the model decides. Represent each gate as a file under `ventures/<slug>/gates/`; a wrapper (`gate.py`) writes `green` to `G5-test.json` from the **actual test-run exit code** (never the model's say-so), the `PreToolUse` guard **blocks the model from writing to `gates/`** so it can't fake a green, and the same guard blocks any deploy command unless that gate is green *and* fresh (its source fingerprint matches the current build) and blocks resource creation outside the approved envelope. This is what turns "qa-engineer can't mark its own gate green" and "don't ship untested code" from prompt instructions into guarantees.
- **Human-in-the-loop where it matters.** Two hard human gates: G2 (go/no-go + spend authorisation) and G6 (deploy/publish). Marketing publishing is also gated. Everything between can run unattended once trusted.
- **Advice framing.** `domain-advisor` and `financial-analyst` produce *decision-support, not licensed legal or financial advice*; the human owns regulated decisions. Bake this into their system prompts (done in §7C) and into `CLAUDE.md`.
- **Cost discipline.** Model-tier deliberately (Opus only where judgement lives), prefer fewer well-scoped subagents (remember the ~7× token multiplier), set per-venture/per-gate token budgets enforced by a hook, and let the operator's `cost-optimisation` skill run a scheduled pass.
- **Verify research before it costs money.** LLM web research fabricates plausible numbers and citations. Before G2, run an adversarial verification pass (a dedicated read-only agent, written to `advisory/verification.md`) that checks every load-bearing figure against its cited source and flags anything uncited or unverifiable. The go/no-go gate is precisely where a hallucinated TAM does damage.
- **Secrets are scoped per gate.** Builder gets no prod credentials; the SDK cron run and the operator's deploy get only the secrets their gate needs, sourced from a secret manager / env, never committed and never passed to a read-only research agent or an injection script. Define this before the first unattended run.
- **"Passive" is a scope decision, not a given.** Revenue software needs payments, support, billing disputes, abuse handling, security patching, and a legal entity over months — none of which `operator` covers today. Either scope to genuinely low-ops product types (templates, digital downloads, info products, content) where the claim holds, or add explicit operator skills (`support-triage`, `billing-ops`, `security-maintenance`) and call it *low-touch*, not passive.

---

## 9. Phased rollout

| Phase | Goal | Build |
|---|---|---|
| **0 — Scaffold + guardrails** | The harness exists, runs, and is *safe*. | Create the repo and `CLAUDE.md` (gate model + guardrails + definition-of-done), then stand up the **guardrails first** because they're what make any later web-research or cron run safe: least-privilege `.claude/settings.json` (allow/deny per tool + `Skill(...)`), the spend/budget + gate `PreToolUse`/`PostToolUse` hooks, and the `manifest.json` + `gates/` schema. Add the `venture-orchestrator` and the `new-skill` + `new-agent` meta-skills. Then de-risk the spine with a **vertical spike**: run one throwaway idea end-to-end through *stubbed* specialists to validate the handoff/gate-state/manifest contract before fleshing out the nine agents. Verify `/scout` reaches the orchestrator. |
| **1 — Discover & decide loop** | Trustworthy G0→G2. | Build `opportunity-scout`, `domain-advisor`, `financial-analyst` and their skills (with dynamic injection working). Run several real ideas end-to-end to G2. Tune descriptions until delegation is crisp. |
| **2 — Make & ship loop** | G3→G6 on one validated idea. | Build `product-architect`, `builder`, `qa-engineer`, `operator`, `growth-marketer` and skills. Wire the deploy hook + human gate. Capture the operator runbook via `/run-skill-generator`. Ship one product. |
| **3 — Compound & package** | The factory improves and reproduces. | Stand up `skill-curator` + `/retro`; run it after every venture. Move the unattended G0 sweep onto the Agent SDK + cron. Package the whole crew as a plugin and install it into a second venture repo to prove repeatability. |

---

## 10. Quick-start (literal first steps)

```bash
# macOS / Linux (bash)
mkdir venture-factory && cd venture-factory && git init
mkdir -p .claude/{agents,skills,commands,hooks} ventures
claude                       # then run /init to seed CLAUDE.md, and edit in the gate model + guardrails
```

```powershell
# Windows (PowerShell) — brace expansion doesn't exist here
New-Item -ItemType Directory venture-factory; Set-Location venture-factory; git init
"agents","skills","commands","hooks" | ForEach-Object { New-Item -ItemType Directory -Force ".claude/$_" }
New-Item -ItemType Directory -Force ventures
claude                       # then run /init to seed CLAUDE.md, and edit in the gate model + guardrails
```

Standardise injected-command scripts on `python` (cross-platform) and set a skill's `shell` frontmatter where a bash-ism is unavoidable, so skills run identically on Windows and Unix. Hooks use the exec form (`"command": "python", "args": ["${CLAUDE_PROJECT_DIR}/.claude/hooks/guard.py"]`) for the same reason.

Then, inside the session, generate your first building blocks by pasting the §7A / §7B prompts (or save them as `.claude/skills/new-skill/SKILL.md` and `.claude/skills/new-agent/SKILL.md` and invoke `/new-skill` and `/new-agent`). Start the crew with the orchestrator and a real goal, keep G2 and G6 as human gates, and run `/retro` after each venture so the skills get smarter every time.

---

*Note on the harness:* this plan targets Claude Code and the Claude Agent SDK as the runtime, since that's the most direct path from your existing skill files to a running crew. Agent Teams (peer crews with a shared task list) are still experimental and gated behind an env flag — the orchestrator + subagents pattern here gives you the coordination you need today without that risk, and you can layer teams in later if a stage genuinely needs bidirectional collaboration rather than delegate-and-report.
