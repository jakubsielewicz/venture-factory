---
description: G0 — run opportunity scouting across a theme (delegates to the venture-orchestrator).
argument-hint: <theme or idea>
---
Kick off the venture pipeline at **G0** for: $ARGUMENTS

Engage the `venture-orchestrator`:
1. Create or resume a venture under `ventures/<slug>/` (copy from `ventures/_template/`, fill the manifest: slug, title, one_liner, dates). Set `VF_ACTIVE_VENTURE=<slug>`.
2. Delegate to `opportunity-scout` for a G0 pass on the theme.
3. Record the gate with `python .claude/hooks/gate.py check <slug> G0`.
4. Report the verdict + score + the top 3 G1 unknowns.

Do not proceed past G1 without human approval. Do not spend or deploy.
