# product-repo-template — run the crew in a graduated product repo

When a venture ships, its `product/` code moves to **its own repo** (single source of
truth for the deployable software; future changes happen there under normal git + CI).
This starter lets the same factory crew operate on that repo.

## Setup
1. Extract the product into a new repo:
   ```bash
   git subtree split -P ventures/<slug>/product -b product-export   # preserves history
   # then push that branch to the new repo (or copy the files for a fresh start)
   ```
2. Copy this `CLAUDE.md` into the product repo root and fill in `<product-name>` + the
   recurring-obligations list. It remaps the crew's workspace to the repo root.
3. Make the factory crew available — either:
   - **Plugin (recommended):** `python automation/package_plugin.py` in the factory, then
     install `dist/venture-factory/` into the product repo (skills namespaced
     `venture-factory:<skill>`); or
   - **User-level:** keep the crew in `~/.claude/` so it's available in every repo.
4. Carry the release gate: copy the factory's `.claude/hooks/` (gate.py + guard + _vf) and
   register the guard in the product repo's `.claude/settings.json` (PreToolUse on
   `Bash` / `Write|Edit` / `mcp__.*`). Create a `gates/` dir.

## Day-to-day
- Change/feature → `@product-architect` (if non-trivial) → `@builder` → `@qa-engineer`
  (`gate.py test .` flips G5 green from real tests) → human approves `gates/G6-operate.json`
  → release. Every release stays gated.
- Periodically point `@operator` at it for cost/observability/incident passes, and run
  `/retro` after incidents so lessons flow back to the factory's skills.

In the factory, leave a `product/REPO.md` pointer to the new repo and flip the venture's
`manifest.json` status to `operating` — keep the decision **dossier** in the factory, the
**code** in the product repo.
