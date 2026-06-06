#!/usr/bin/env bash
# Shared helpers for gflow-skills installers.
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

gfs_link_skill() {
  # args: <src_skill_dir> <dest_skills_dir> <mode>
  local src="$1" dest_dir="$2" mode="$3"
  mkdir -p "$dest_dir"
  local name; name="$(basename "$src")"
  rm -rf "$dest_dir/$name"
  if [ "$mode" = "copy" ]; then
    cp -R "$src" "$dest_dir/$name"
  else
    ln -s "$src" "$dest_dir/$name"
  fi
}

gfs_wire_command() {
  # args: <src_command_file> <dest_commands_dir> <slash>
  local src="$1" dest_dir="$2" slash="$3"
  mkdir -p "$dest_dir"
  cp "$src" "$dest_dir/$slash.md"
}

gfs_install_all() {
  # args: <skills_dir> <commands_dir> <mode>
  local skills_dir="$1" commands_dir="$2" mode="$3"
  for d in "$REPO_ROOT"/skills/*/; do
    gfs_link_skill "$d" "$skills_dir" "$mode"
    for c in "$d"commands/*.md; do
      [ -e "$c" ] || continue
      gfs_wire_command "$c" "$commands_dir" "$(basename "${c%.md}")"
    done
  done
  echo "Installed gflow-skills into $skills_dir"
}
