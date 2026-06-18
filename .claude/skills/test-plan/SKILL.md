---
name: test-plan
description: Use at G5 to map every acceptance criterion and NFR to a test, defining scope and the definition of done for testing. Triggers: "test plan", "what should we test", "coverage of acceptance criteria", G5 test.
when_to_use: planning test coverage against acceptance criteria and NFRs at G5.
allowed-tools: Read, Write
---

## Procedure
1. List every acceptance criterion (from `prd.md`) and every NFR (from `nfr.md`).
2. Map each to at least one test: type (unit/integration/e2e/security/perf), the case, and the expected result.
3. Mark what's IN and OUT of scope for this gate, and the risk of anything left out.
4. Define the pass bar: which tests must be green for G5 (all acceptance criteria; criticals on security/perf).
5. Write the plan to `product/tests/` (e.g. `TEST-PLAN.md`); it drives `e2e-suite`.

A criterion with no test is untested — list it as a gap, don't assume. Heuristics: `knowledge/ledger.md`.
