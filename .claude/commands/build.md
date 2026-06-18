---
description: G4 — implement an approved design in the sandbox (delegates to the builder).
argument-hint: <venture-slug>
---
Run **G4 build** for venture: $ARGUMENTS

Engage the `venture-orchestrator`:
1. Set `VF_ACTIVE_VENTURE=$ARGUMENTS`. Confirm G3 is green (`gate.py status`); if the design is incomplete, STOP and report the gap.
2. Delegate to `builder` to implement the MVP in `ventures/$ARGUMENTS/product/` (src + tests), applying secure-defaults and IaC-as-code (declare only). Record the one-command test command into the manifest's G5 `test_command`.
3. `python .claude/hooks/gate.py check $ARGUMENTS G4`.

Report what was built, deviations from spec, and the test command. No production credentials, no deploy, no spend beyond the envelope.
