# CLAUDE.md — &lt;product-name&gt; (a graduated venture-factory product)

This is a **shipped product repo** that graduated from the venture-factory. The factory
crew runs here too — install it as a plugin — but the workspace conventions differ from
the factory. **These instructions OVERRIDE the agents'/skills' default paths.**

## Workspace remap (important)
The factory crew was authored for `ventures/<slug>/product/…`. In THIS repo there is no
venture wrapper — **the repo root IS the product workspace**:

| Factory path (in agent/skill bodies) | Here |
|---|---|
| `ventures/<slug>/product/src` | `./src` |
| `ventures/<slug>/product/tests` | `./tests` |
| `ventures/<slug>/product/design` | `./docs/design` |
| `ventures/<slug>/gates/` | `./gates/` |
| `ventures/<slug>/runbook.md` | `./runbook.md` |

When an agent or skill says `ventures/<slug>/product/…`, read/write the corresponding
path above.

## What runs here
- **Used:** `@builder` (changes / new features), `@qa-engineer` (the test gate), `@operator` (deploy/observe/cost/incident), `@product-architect` (bigger features), and their skills.
- **Not used:** the discover→decide crew (`opportunity-scout`, `domain-advisor`, `financial-analyst`) — those belong to the factory, for new ventures.

## Gated releases (same discipline as the factory)
Every release stays gated: **green tests + human approval.** Copy `.claude/hooks/` from the
factory; run `gate.py test .` (or your CI) to write `gates/G5-test.json` from the real exit
code, and the deploy guard blocks release unless G5 is green+fresh **and** a human approves
`gates/G6-operate.json`. Marketing publish/send stays blocked until `gates/marketing-publish.json` is approved.

## Recurring obligations (this product specifically)
List the not-passive ops here: e.g. legal sign-off per new <regulated item>, dependency/security patching cadence, support, billing. These are human-owned.
