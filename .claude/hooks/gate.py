#!/usr/bin/env python3
"""Gate-state writer for the venture-factory.

This is the ONLY sanctioned way agent gate state changes (the PreToolUse guard
blocks the model from editing ventures/<slug>/gates/ directly). It writes gate
status from real evidence, not model assertion.

  gate.py test  <slug> [--command "<cmd>"]   run tests; write G5 from the REAL exit code
  gate.py check <slug> <Gn>                  green iff the gate's required_artifacts exist
  gate.py status <slug>                      print the venture's gate states

Human gates (G2, G6) are NOT settable here on purpose — a human approves by
editing the gate file's status to "approved" outside the agent session.
"""
from __future__ import annotations

import argparse
import datetime
import json
import subprocess
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import _vf  # noqa: E402


def now_iso() -> str:
    return datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")


def write_gate(slug: str, gate_file: str, data: dict) -> Path:
    gp = _vf.gate_path(slug, gate_file)
    gp.parent.mkdir(parents=True, exist_ok=True)
    gp.write_text(json.dumps(data, indent=2) + "\n", encoding="utf-8")
    return gp


def cmd_test(args) -> int:
    slug = args.slug
    vdir = _vf.venture_dir(slug)
    if not vdir.is_dir():
        print(f"[gate.py] venture '{slug}' not found under ventures/", file=sys.stderr)
        return 3

    manifest = _vf.load_json(vdir / "manifest.json") or {}
    test_command = args.command or ((manifest.get("gates") or {}).get("G5") or {}).get("test_command") or "pytest -q"

    product = vdir / "product"
    workdir = product if product.is_dir() else vdir
    print(f"[gate.py] running tests for '{slug}': {test_command} (cwd={workdir})")

    proc = subprocess.run(test_command, shell=True, cwd=str(workdir),
                          capture_output=True, text=True)
    exit_code = proc.returncode
    tail = (proc.stdout or "")[-2000:]
    if proc.stderr:
        tail += "\n[stderr]\n" + proc.stderr[-1000:]

    status = "green" if exit_code == 0 else "red"
    write_gate(slug, "G5-test.json", {
        "gate": "G5", "name": "test", "venture": slug, "type": "agent",
        "status": status, "set_by": "gate.py", "set_at": now_iso(),
        "evidence": {
            "command": test_command,
            "exit_code": exit_code,
            "source_fingerprint": _vf.source_fingerprint(slug),
            "output_tail": tail,
        },
        "notes": "Written from the real test exit code; not model-editable.",
    })
    print(f"[gate.py] G5 test gate -> {status} (exit {exit_code})")
    return exit_code


def cmd_check(args) -> int:
    slug, gate = args.slug, args.gate.upper()
    vdir = _vf.venture_dir(slug)
    if not vdir.is_dir():
        print(f"[gate.py] venture '{slug}' not found under ventures/", file=sys.stderr)
        return 3

    # Fail CLOSED: a gate must never go green because its spec failed to load.
    manifest = _vf.load_json(vdir / "manifest.json")
    if manifest is None:
        print(f"[gate.py] manifest.json for '{slug}' is missing or unreadable — "
              f"cannot evaluate gate {gate}.", file=sys.stderr)
        return 5
    spec = (manifest.get("gates") or {}).get(gate)
    if not spec:
        print(f"[gate.py] gate {gate} is not defined in {slug}/manifest.json.", file=sys.stderr)
        return 5

    if spec.get("type") == "human":
        print(f"[gate.py] {gate} is a HUMAN gate — a human approves it by editing "
              f"gates/{gate}-{spec.get('name','')}.json to 'approved'.", file=sys.stderr)
        return 4
    if gate == "G5":
        print("[gate.py] use `gate.py test <slug>` for G5.", file=sys.stderr)
        return 4

    required = spec.get("required_artifacts", [])
    missing = [a for a in required if not (vdir / a).exists()]
    status = "green" if not missing else "blocked"
    name = spec.get("name", gate.lower())
    write_gate(slug, f"{gate}-{name}.json", {
        "gate": gate, "name": name, "venture": slug, "type": "agent",
        "status": status, "set_by": "gate.py", "set_at": now_iso(),
        "evidence": {"required_artifacts": required, "missing": missing},
        "notes": "Status derived from artifacts present on disk.",
    })
    print(f"[gate.py] {gate} gate -> {status}" + (f"; missing: {missing}" if missing else ""))
    return 0 if status == "green" else 1


def cmd_status(args) -> int:
    gdir = _vf.venture_dir(args.slug) / "gates"
    if not gdir.is_dir():
        print(f"[gate.py] no gates yet for '{args.slug}'")
        return 0
    for gp in sorted(gdir.glob("*.json")):
        d = _vf.load_json(gp) or {}
        print(f"  {d.get('gate','?'):4} {d.get('name',''):9} "
              f"{d.get('status','?'):8} set_by={d.get('set_by','?')}")
    return 0


def main() -> None:
    ap = argparse.ArgumentParser(prog="gate.py", description="venture-factory gate-state writer")
    sub = ap.add_subparsers(dest="cmd", required=True)

    t = sub.add_parser("test", help="run the venture's tests; write G5 from the real exit code")
    t.add_argument("slug")
    t.add_argument("--command", "-c", default=None, help="override the test command")
    t.set_defaults(func=cmd_test)

    c = sub.add_parser("check", help="mark an artifact gate green iff required_artifacts exist")
    c.add_argument("slug")
    c.add_argument("gate", help="e.g. G0, G1, G3, G4")
    c.set_defaults(func=cmd_check)

    s = sub.add_parser("status", help="print the venture's gate states")
    s.add_argument("slug")
    s.set_defaults(func=cmd_status)

    args = ap.parse_args()
    sys.exit(args.func(args))


if __name__ == "__main__":
    main()
