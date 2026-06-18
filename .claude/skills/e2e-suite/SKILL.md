---
name: e2e-suite
description: Use at G5 to build the automated test suite covering the critical paths and acceptance criteria, runnable by one command. Triggers: "write the tests", "e2e tests", "automate the test suite", G5 test.
when_to_use: implementing the automated test suite at G5.
allowed-tools: Read, Write, Edit, Bash
---

## Procedure
1. Implement tests for each critical path and acceptance criterion from the test-plan; favour a few high-value e2e/integration tests over many trivial unit tests.
2. Make the whole suite runnable by ONE command (the manifest G5 `test_command`); keep it deterministic and fast.
3. Include negative cases and the security/validation checks, not just the happy path.
4. Run it; if it fails, route the defect to the builder — do NOT weaken the test to pass.
5. Flip the gate ONLY via `python .claude/hooks/gate.py test <slug>` (real exit code). Write tests under `product/tests/`.

Heuristics: `knowledge/ledger.md`.
