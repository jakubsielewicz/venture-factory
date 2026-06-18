---
name: new-agent
description: Use to author a new Claude Code subagent (a crew member) as a Markdown file with YAML frontmatter. Triggers: "create an agent", "new subagent for X", "add a crew member", "/new-agent".
when_to_use: scaffolding a new subagent definition with least-privilege tools and a gate-tied procedure.
allowed-tools: Read, Write
---

## Inputs (ask for any not provided)
Agent name (kebab-case) · role & mandate · lifecycle stage/gate it owns · skills to preload · tools it may use · model (opus=judgement, sonnet=build/test, haiku=wide search) · autonomy (read-only | write-in-sandbox | gated-side-effects) · hard guardrails.

## Procedure
1. **Frontmatter:** `name`; a `description` written as a ROUTING RULE — the exact situations/phrases that should make the orchestrator delegate here; add "use PROACTIVELY" only if it should auto-trigger. Include `tools:` (least privilege; omit to inherit all), `model:`, and `skills:` (full content injected at startup). To restrict which subagents it may spawn, list each as a SEPARATE token — `Agent(scout), Agent(builder)` — never one comma-packed `Agent(a, b)` (the tool grammar splits on commas).
2. **Body** (system prompt, second person "You are the …"): the exact inputs it reads (which files under `ventures/<slug>/`) and where it writes; a step-by-step procedure tied to its gate; the gate EXIT CRITERIA checklist; the never-do guardrails as hard stops; the concise report format it returns to the orchestrator.
3. **Least privilege:** if read-only, the body must refuse to write outside its designated folder and not call side-effecting tools. Gate state changes only via `gate.py` / a human — never by editing `gates/`.
4. Write `.claude/agents/<name>.md`.

Write the actual procedure, not a placeholder. Concise beats comprehensive.
