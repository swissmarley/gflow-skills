#!/usr/bin/env bash
set -euo pipefail
source "$(dirname "${BASH_SOURCE[0]}")/_common.sh"
MODE="${1:-symlink}"
gfs_install_all "$HOME/.codex/skills" "$HOME/.codex/commands" "$MODE" "$HOME/.codex/AGENTS.md"
