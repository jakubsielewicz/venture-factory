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

Register the auto-hook in .claude/settings.json:
  "SubagentStop": [{ "matcher": "",
    "hooks": [{ "type": "command", "command": "python",
                "args": ["${CLAUDE_PROJECT_DIR}/.claude/hooks/spend.py", "from-hook"] }] }]
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
    args = ap.parse_args()
    sys.exit(args.func(args))


if __name__ == "__main__":
    main()
