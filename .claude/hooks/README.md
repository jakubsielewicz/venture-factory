# venture-factory hooks

Deterministic guardrails that back the probabilistic agents. These run regardless
of what the model decides, so the safety-critical invariants hold even if an agent
is confused or adversarial.

## Files

| File | Role |
|---|---|
| `guard.py` | **PreToolUse hook.** Registered for `Bash` and `Write\|Edit\|MultiEdit` in `.claude/settings.json`. Blocks gate-file edits, ungated deploys, unauthorised spend, and a few hard-dangerous commands. |
| `gate.py` | **CLI wrapper (not a hook).** The only sanctioned way to change *agent* gate state. Writes status from real evidence. |
| `_vf.py` | Shared helpers (project root, JSON load, active-venture resolution, source fingerprint). |

## How a gate becomes green

- **G5 (test):** `python .claude/hooks/gate.py test <slug>` runs the venture's tests and writes `gates/G5-test.json` from the **real exit code**, plus a source fingerprint. The model cannot mark tests green by asserting it.
- **Artifact gates (G0/G1/G3/G4):** `python .claude/hooks/gate.py check <slug> <Gn>` is green iff every `required_artifacts` entry in `manifest.json` exists on disk.
- **Human gates (G2/G6):** a human edits the gate file's `status` to `approved` **outside the agent session** (e.g. in their editor). `gate.py` deliberately refuses to set these — if the model could run the approval, it would not be a human gate.

## What the guard enforces

1. **No model writes to `ventures/*/gates/`** — the only way gate state changes is `gate.py` (real evidence) or a human edit.
2. **Deploy** commands are denied unless `G5` is green **and fresh** (the current source fingerprint matches the one captured when tests passed) **and** `G6` is approved.
3. **Spend / resource-creation** commands are denied unless `G2` is approved and the venture is within its `manifest.json` budget.
4. **Hard denies:** `rm -rf /`/`~`, fork bombs, force-push to `main`/`master`, pipe-to-shell of remote content.

The guard resolves the active venture from `VF_ACTIVE_VENTURE`, else the cwd, else the sole venture — set `VF_ACTIVE_VENTURE=<slug>` before delegating so enforcement targets the right venture. If it can't resolve one, it **fails closed** for deploy/spend.

## Notes

- Hooks are registered in `.claude/settings.json` using the **exec form** (`"command": "python", "args": ["${CLAUDE_PROJECT_DIR}/.claude/hooks/guard.py"]`) so they run identically on Windows and Unix. Requires `python` on PATH.
- `guard.py` fails open on malformed hook input (never breaks the session) but fails **closed** on the deploy/spend checks (a missing/unreadable gate denies the action).
- The guard is defence in depth: deploy/spend tools are also kept off the auto-allow list in `settings.json`, so they additionally prompt a human.
- This is a Phase-0 baseline. Extend the pattern lists in `guard.py` as you adopt new deploy/cloud tooling, and wire real `tokens_spent` / `api_spend_usd` updates into the manifest so the budget stop bites.
