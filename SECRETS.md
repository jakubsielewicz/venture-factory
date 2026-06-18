# Secrets policy

Secrets are **scoped per gate** and never live in the repo. This is the contract; the
guard enforces the shell-side of it.

## Where secrets live
- **Local / dev:** a `.env` file (git-ignored) or your shell environment. Copy `.env.example` → `.env` and fill it. `.env` is never committed.
- **Unattended (SDK cron) & deploy/operate:** a real secret manager (cloud KMS/Secrets Manager, GitHub Actions secrets, Vercel/Supabase env). The factory reads them from the process environment at run time.

## Per-gate scoping (least privilege)
| Stage | Gets |
|---|---|
| Scout / advisor / analyst (G0–G1) | research/data API keys only (e.g. `DEMAND_SIGNALS_API_KEY`); **no** prod credentials |
| Builder (G4) | **no** prod credentials — builds against stubs; `.env.example` placeholders only |
| qa-engineer (G5) | test/CI tokens only |
| Operator / deploy (G6) | the deploy + runtime secrets, only after human G6 approval; sourced from the secret manager, never the repo |

A read-only research agent must never receive deploy/payment credentials, and an injection script gets only the one data-API key it needs.

## Keys the factory references
See `.env.example`. The dynamic-injection scripts (`demand-signals`, `unit-economics`) read their key from the environment and **fail gracefully** (print `DATA UNAVAILABLE`) when it's absent — so the crew runs without secrets, just with less live data.

## Enforcement (deterministic)
- `.gitignore` excludes `.env`, `.env.*`, `*.pem`, `**/secrets/` — secrets can't be committed by accident.
- `settings.json` `permissions.deny` blocks the **Read** tool on `.env*` / `*.pem` / `secrets/**`.
- `guard.py` hard-denies reading/exfiltrating a secret file via the **shell** (`cat`/`curl`/`scp` … `.env`/`.pem`/`.key`), so a Bash call can't bypass the Read-deny. `.env.example` is allowed.

## Rules of thumb
- Never paste a secret into a prompt, a committed file, a log, or a marketing draft.
- Rotate any key that touches a deployed product on a schedule; rotate immediately if exposed.
- If a script needs a new key, add its **name** (placeholder) to `.env.example` and document it here — never the value.
