---
name: scaffold-stack
description: Use at G4 to scaffold a project to the chosen stack — sane structure, pinned dependencies, config, and a one-command run + test. Triggers: "scaffold", "set up the project", "bootstrap the stack", G4 build.
when_to_use: standing up the initial project structure and toolchain at G4.
allowed-tools: Read, Write, Edit, Bash
---

## Procedure
1. Pick the stack from the design's build-vs-buy + NFRs; prefer boring, well-supported tools over novel ones.
2. Create a conventional layout (src, tests, config) and a dependency manifest pinned to versions.
3. Wire a ONE-COMMAND run and a ONE-COMMAND test; record the test command for the manifest's G5 `test_command`.
4. Add minimal CI (lint + test) and a README with setup steps.
5. Verify it runs and tests pass from a fresh checkout BEFORE adding features. Build inside `ventures/<slug>/product/`.

Heuristics: `knowledge/ledger.md`.
