#!/usr/bin/env bash
# gflow-skills universal installer
set -euo pipefail
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

AGENT=""
MODE="symlink"
while [ $# -gt 0 ]; do
  case "$1" in
    --agent) AGENT="$2"; shift 2 ;;
    --mode) MODE="$2"; shift 2 ;;
    *) echo "Unknown arg: $1"; exit 1 ;;
  esac
done

if [ -z "$AGENT" ]; then
  echo "Usage: ./install.sh --agent <claude|codex|hermes|opencode> [--mode symlink|copy]"
  exit 1
fi

ADAPTER="$DIR/installers/$AGENT.sh"
if [ ! -f "$ADAPTER" ]; then
  echo "No installer for agent: $AGENT"
  exit 1
fi

bash "$ADAPTER" "$MODE"
echo "Done. Ensure gflow-cli is installed: npm install -g @swissmarley/gflow-cli"
