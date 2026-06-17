"""Shared helpers for venture-factory hooks (guard.py, gate.py).

Pure standard library so it runs anywhere Python 3 is installed (Windows/Unix).
"""
from __future__ import annotations

import hashlib
import json
import os
from pathlib import Path

# Directories that never count toward a build's source fingerprint.
IGNORE_DIRS = {
    ".git", "node_modules", "__pycache__", ".venv", "venv", "env",
    "dist", "build", ".next", "out", ".pytest_cache", ".mypy_cache",
    ".ruff_cache", "coverage", ".turbo",
}


def project_root() -> Path:
    """Repo root. Prefer the harness-provided CLAUDE_PROJECT_DIR, else cwd.

    Falls back to cwd if the env value doesn't point at a real directory (e.g. a
    Git-Bash-style '/c/...' path that native Windows Python can't resolve), so the
    hooks never silently operate on a phantom path.
    """
    root = os.environ.get("CLAUDE_PROJECT_DIR")
    if root and Path(root).is_dir():
        return Path(root)
    return Path.cwd()


def ventures_dir() -> Path:
    return project_root() / "ventures"


def venture_dir(slug: str) -> Path:
    return ventures_dir() / slug


def gate_path(slug: str, gate_file: str) -> Path:
    return venture_dir(slug) / "gates" / gate_file


def load_json(path: Path):
    try:
        return json.loads(Path(path).read_text(encoding="utf-8"))
    except Exception:
        return None


def list_ventures() -> list:
    d = ventures_dir()
    if not d.is_dir():
        return []
    return sorted(p.name for p in d.iterdir() if p.is_dir() and not p.name.startswith("_"))


def active_venture(stdin_cwd=None):
    """Resolve the working venture.

    1. VF_ACTIVE_VENTURE env var, if set.
    2. Inferred from cwd (or the hook's stdin cwd) if it sits inside ventures/<slug>/.
    3. The sole venture, if exactly one exists.
    Otherwise None (callers should fail closed for deploy/spend).
    """
    env = os.environ.get("VF_ACTIVE_VENTURE")
    if env:
        return env

    vroot = ventures_dir()
    try:
        vroot_resolved = vroot.resolve()
    except Exception:
        vroot_resolved = vroot

    for candidate in (stdin_cwd, os.getcwd()):
        if not candidate:
            continue
        try:
            rel = Path(candidate).resolve().relative_to(vroot_resolved)
        except Exception:
            continue
        if rel.parts and not rel.parts[0].startswith("_"):
            return rel.parts[0]

    vs = list_ventures()
    return vs[0] if len(vs) == 1 else None


def source_fingerprint(slug: str) -> str:
    """Stable short hash of a venture's built source.

    Fingerprints ventures/<slug>/product/src (falling back to product/). Lets the
    deploy guard reject a 'green' test gate that is stale because the source
    changed after tests last passed.
    """
    base = venture_dir(slug) / "product" / "src"
    if not base.is_dir():
        base = venture_dir(slug) / "product"
    if not base.is_dir():
        return "no-src"

    h = hashlib.sha256()
    for p in sorted(base.rglob("*")):
        if not p.is_file():
            continue
        if any(part in IGNORE_DIRS for part in p.relative_to(base).parts):
            continue
        rel = p.relative_to(base).as_posix()
        h.update(rel.encode("utf-8"))
        h.update(b"\0")
        try:
            h.update(p.read_bytes())
        except Exception:
            h.update(b"<unreadable>")
        h.update(b"\0")
    return h.hexdigest()[:16]
