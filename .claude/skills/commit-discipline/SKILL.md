---
name: commit-discipline
description: Use during G4 to keep version control clean — small, focused, working commits with clear messages, no secrets. Triggers: "commit", "git hygiene", "how should I structure commits", G4 build.
when_to_use: structuring commits and keeping history clean during a build.
allowed-tools: Read, Bash
---

## Procedure
1. Commit small and often; each commit builds and passes tests (no broken states on the main line).
2. One logical change per commit; clear imperative subject + a why-not-what body when it isn't obvious.
3. Never commit secrets, large binaries, or generated artifacts (`.gitignore` them).
4. Work on a branch; keep the default branch releasable.
5. Reference the PRD/story the commit serves where useful.

Heuristics: `knowledge/ledger.md`.
