#!/usr/bin/env python3
"""Track per-venture spend so the budget guard actually bites.

guard.py hard-stops deploy/spend once a venture exceeds its envelope, but only if
the counters move. This is the writer of those counters.

  spend.py add  <slug> [--tokens N] [--usd X]   atomic increment
  spend.py show <slug>                           print spend vs budget
  spend.py from-hook                             SubagentStop hook mode: read the
                                                 event on stdin, add
                                                 model_input_tokens+model_output_tokens
                                                 to the active venture (auto)
  spend.py meta-add [--acu N] [--usd X] [--note "..."]   factory-maintenance spend
                                                 (Devin ACUs or $, not tied to a venture)
  spend.py meta-show                             print factory-maintenance spend

Register the auto-hook in .claude/settings.json:
  "SubagentStop": [{ "matcher": "",
    "hooks": [{ "type": "command", "command": "python",
                "args": ["${CLAUDE_PROJECT_DIR}/.claude/hooks/spend.py", "from-hook"] }] }]

meta-add/meta-show are for factory-maintenance work (e.g. a Devin session improving
venture-factory itself per .devin/skills/venture-factory-maintainer) - this is cost
outside any single venture's budget, so it gets its own ledger
(automation/meta-spend.json) rather than being charged to a venture's manifest.json.
"""
from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import _vf  # noqa: E402


def _bump(slug: str, tokens: int = 0, usd: float = 0.0, note: str = "") -> int:
    path = _vf.venture_dir(slug) / "manifest.json"
    d = _vf.load_json(path)
    if d is None:
        print(f"[spend] manifest for '{slug}' not found", file=sys.stderr)
        return 3
    b = d.setdefault("budget", {})
    b["tokens_spent"] = int(b.get("tokens_spent", 0) or 0) + int(tokens or 0)
    b["api_spend_usd"] = round(float(b.get("api_spend_usd", 0) or 0) + float(usd or 0), 4)
    path.write_text(json.dumps(d, indent=2) + "\n", encoding="utf-8")
    over = []
    ct, cu = b.get("token_budget_total"), b.get("api_spend_cap_usd")
    if ct is not None and b["tokens_spent"] >= ct:
        over.append(f"tokens {b['tokens_spent']}/{ct}")
    if cu is not None and b["api_spend_usd"] >= cu:
        over.append(f"${b['api_spend_usd']}/${cu}")
    tail = f" OVER CAP ({', '.join(over)}) - guard will block spend/deploy" if over else ""
    print(f"[spend] {slug}{(' ' + note) if note else ''}: "
          f"tokens={b['tokens_spent']} usd={b['api_spend_usd']}{tail}")
    return 0


def cmd_add(a) -> int:
    return _bump(a.slug, a.tokens, a.usd)


def cmd_show(a) -> int:
    d = _vf.load_json(_vf.venture_dir(a.slug) / "manifest.json")
    if d is None:
        print(f"[spend] manifest for '{a.slug}' not found", file=sys.stderr)
        return 3
    b = d.get("budget", {})
    keys = ("tokens_spent", "token_budget_total", "api_spend_usd", "api_spend_cap_usd")
    print(json.dumps({k: b.get(k) for k in keys}, indent=2))
    return 0


def _meta_path() -> Path:
    return _vf.project_root() / "automation" / "meta-spend.json"


def _meta_default() -> dict:
    return {"acu_spent": 0, "usd_spent": 0.0, "cap_acu": None, "cap_usd": None, "log": []}


def cmd_meta_add(a) -> int:
    path = _meta_path()
    d = _vf.load_json(path) or _meta_default()
    d["acu_spent"] = round(float(d.get("acu_spent", 0) or 0) + float(a.acu or 0), 4)
    d["usd_spent"] = round(float(d.get("usd_spent", 0) or 0) + float(a.usd or 0), 4)
    if a.note:
        d.setdefault("log", []).append({"note": a.note, "acu": a.acu, "usd": a.usd})
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(d, indent=2) + "\n", encoding="utf-8")
    over = []
    ca, cu = d.get("cap_acu"), d.get("cap_usd")
    if ca is not None and d["acu_spent"] >= ca:
        over.append(f"acu {d['acu_spent']}/{ca}")
    if cu is not None and d["usd_spent"] >= cu:
        over.append(f"${d['usd_spent']}/${cu}")
    tail = f" OVER CAP ({', '.join(over)})" if over else ""
    print(f"[spend] factory-maintenance{(' ' + a.note) if a.note else ''}: "
          f"acu={d['acu_spent']} usd={d['usd_spent']}{tail}")
    return 0


def cmd_meta_show(a) -> int:
    d = _vf.load_json(_meta_path()) or _meta_default()
    keys = ("acu_spent", "cap_acu", "usd_spent", "cap_usd")
    print(json.dumps({k: d.get(k) for k in keys}, indent=2))
    return 0


def cmd_from_hook(a) -> int:
    raw = sys.stdin.read()
    try:
        ev = json.loads(raw) if raw.strip() else {}
    except Exception:
        return 0  # never break the session
    slug = _vf.active_venture(ev.get("cwd"))
    if not slug:
        return 0  # no active venture to charge
    tokens = int(ev.get("model_input_tokens", 0) or 0) + int(ev.get("model_output_tokens", 0) or 0)
    if tokens:
        _bump(slug, tokens=tokens, note=f"<{ev.get('agent_type', 'subagent')}>")
    return 0


def main() -> None:
    ap = argparse.ArgumentParser(prog="spend.py")
    sub = ap.add_subparsers(dest="cmd", required=True)
    p = sub.add_parser("add", help="increment counters")
    p.add_argument("slug"); p.add_argument("--tokens", type=int, default=0)
    p.add_argument("--usd", type=float, default=0.0); p.set_defaults(func=cmd_add)
    s = sub.add_parser("show", help="print spend vs budget")
    s.add_argument("slug"); s.set_defaults(func=cmd_show)
    h = sub.add_parser("from-hook", help="SubagentStop stdin mode (auto)")
    h.set_defaults(func=cmd_from_hook)
    ma = sub.add_parser("meta-add", help="increment factory-maintenance spend (not tied to a venture)")
    ma.add_argument("--acu", type=float, default=0.0); ma.add_argument("--usd", type=float, default=0.0)
    ma.add_argument("--note", default=""); ma.set_defaults(func=cmd_meta_add)
    ms = sub.add_parser("meta-show", help="print factory-maintenance spend")
    ms.set_defaults(func=cmd_meta_show)
    args = ap.parse_args()
    sys.exit(args.func(args))


if __name__ == "__main__":
    main()
