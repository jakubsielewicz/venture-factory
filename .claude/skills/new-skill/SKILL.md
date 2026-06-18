---
name: new-skill
description: Use to author a new Claude Code skill as a directory with a SKILL.md entrypoint. Triggers: "create a skill", "new skill for X", "author a skill", "/new-skill".
when_to_use: scaffolding a new skill directory with a lean, progressive-disclosure SKILL.md.
allowed-tools: Read, Write, Bash
---

## Inputs (ask for any not provided)
Skill name (kebab-case) · primary agent · job-to-be-done (1–2 sentences) · trigger situations/phrases · live inputs to pull at load time (if any) · tools it legitimately needs.

## Procedure
1. **Frontmatter:** `name`; a `description` that leads with the trigger ("Use when …"); optional `when_to_use` for extra trigger phrases; `allowed-tools` limited to what it needs. Keep `description` + `when_to_use` under ~1500 chars. The slash-command name comes from the DIRECTORY name, not `name`.
2. **Body:** state WHAT to do as a numbered procedure. Be terse — the body stays in context across turns. Target < 40 lines, no narration of why.
3. **Progressive disclosure:** move deep reference, benchmark tables, or long examples into `references/` and `examples/`, referenced by relative path so they load only on demand. Do NOT inline them.
4. **Dynamic context injection (only if live inputs are needed):** a fenced ` ```! ` block near the top so live data is inlined before reasoning. Put the script in `scripts/`, make it FAIL GRACEFULLY (print `DATA UNAVAILABLE: <reason>` and exit 0), and read inputs from the venture file or an env var — never interpolate user text into the shell.
5. Create `knowledge/ledger.md` with the standard header so the skill-curator has a home.
6. Write the directory under `.claude/skills/<name>/`. Output the tree + each file's full contents.

Write the actual procedure for the job, not a template — concrete steps, real decision criteria, explicit output path.
