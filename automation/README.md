# automation — unattended runs & packaging

Scripts that drive the crew headlessly or package it for reuse.

## `nightly_scout.py` — unattended G0 sweep (Agent SDK)
Runs the `opportunity-scout` across a theme on a schedule, writes scored briefs to `ventures/`, and **stops before G1** (no spend, no deploy). The `.claude/settings.json` guard hooks load via `setting_sources=["project"]`, so the deterministic guardrails apply even unattended.

```bash
pip install claude-agent-sdk
export ANTHROPIC_API_KEY=...        # or your configured auth
python automation/nightly_scout.py "compliance automation for AU SMEs"
```

Cron (nightly at 02:00):
```
0 2 * * *  cd /path/to/venture-factory && python automation/nightly_scout.py "your theme" >> automation/scout.log 2>&1
```

**A weekly cost pass** is the same shape with a different prompt — delegate to the `operator` and the `cost-optimisation` skill for each live venture, report any venture projected over its ceiling, and change nothing (read-only). Copy `nightly_scout.py`, swap the prompt, and schedule it weekly.

## `package_plugin.py` — build the installable plugin
Assembles the in-place `.claude/{agents,skills,commands,hooks}` into a self-contained Claude Code plugin under `dist/venture-factory/` (alongside `.claude-plugin/plugin.json`), so the whole crew can be published to a marketplace and installed into any repo.

```bash
python automation/package_plugin.py
# -> dist/venture-factory/  (agents/, skills/, commands/, hooks/, .claude-plugin/plugin.json)
```

`dist/` is git-ignored (build output). Plugin skills are namespaced `venture-factory:<skill>` when installed, so they never collide with a host repo's own skills.
