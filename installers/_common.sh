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

gfs_write_instructions() {
  # args: <instructions_file>
  # Writes/refreshes an auto-managed gflow-skills block listing every skill,
  # matching the block the Node installer produces. Preserves surrounding content.
  local file="$1"
  local begin="<!-- BEGIN gflow-skills:auto-managed -->"
  local end="<!-- END gflow-skills:auto-managed -->"
  mkdir -p "$(dirname "$file")"

  local block="$begin"$'\n'"## gflow-skills"$'\n'
  for d in "$REPO_ROOT"/skills/*/; do
    local name; name="$(basename "$d")"
    local slashes=""
    for c in "$d"commands/*.md; do
      [ -e "$c" ] || continue
      local s; s="$(basename "${c%.md}")"
      slashes="${slashes:+$slashes, }/$s"
    done
    local line="- **$name** - invoke the Skill tool with skill: \"$name\" when relevant"
    [ -n "$slashes" ] && line="$line (commands: $slashes)"
    block="$block"$'\n'"$line"
  done
  block="$block"$'\n'$'\n'"$end"

  if [ -f "$file" ] && grep -q "$begin" "$file"; then
    # Replace existing managed block (delete from begin to end, then append fresh).
    local tmp; tmp="$(mktemp)"
    awk -v b="$begin" -v e="$end" '
      $0 ~ b {skip=1}
      skip==0 {print}
      $0 ~ e {skip=0}
    ' "$file" > "$tmp"
    printf '%s\n' "$block" >> "$tmp"
    mv "$tmp" "$file"
  else
    [ -f "$file" ] && printf '\n' >> "$file"
    printf '%s\n' "$block" >> "$file"
  fi
}

gfs_install_all() {
  # args: <skills_dir> <commands_dir> <mode> [instructions_file]
  local skills_dir="$1" commands_dir="$2" mode="$3" instructions_file="${4:-}"
  for d in "$REPO_ROOT"/skills/*/; do
    gfs_link_skill "$d" "$skills_dir" "$mode"
    for c in "$d"commands/*.md; do
      [ -e "$c" ] || continue
      gfs_wire_command "$c" "$commands_dir" "$(basename "${c%.md}")"
    done
  done
  [ -n "$instructions_file" ] && gfs_write_instructions "$instructions_file"
  echo "Installed gflow-skills into $skills_dir"
}
