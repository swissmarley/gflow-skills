# Providers

gflow-skills installs into multiple coding agents. Each agent has its own
conventions for where skills, commands, and instructions live.

## Install paths per agent

| Agent | Skills Dir | Commands Dir | Instructions File |
|-------|-----------|--------------|-------------------|
| Claude Code | `~/.claude/skills/` | `~/.claude/commands/` | `~/.claude/CLAUDE.md` |
| Codex CLI | `~/.codex/skills/` | `~/.codex/commands/` | `~/.codex/AGENTS.md` |
| OpenCode | `~/.config/opencode/skills/` | `~/.config/opencode/command/` | `~/.config/opencode/AGENTS.md` |
| Hermes | `~/.config/hermes/skills/` | `~/.config/hermes/commands/` | `~/.config/hermes/AGENTS.md` |
| Cursor | via `.cursor-plugin` manifest | N/A | N/A |
| Openclaw | via `.claude-plugin` or `.cursor-plugin` manifest, MCP-compatible | N/A | N/A |

## Install methods

There are three ways to install the skills, suited to different agents.

### 1. npm one-liner

```
npx gflow-skills install --agent <name>
```

Flags:

- `--mode symlink|copy` - link the source files (symlink) or copy them.
- `--skills a,b` - install only the named skills instead of all of them.

Use this for the file-based agents: Claude Code, Codex CLI, OpenCode, and Hermes.

### 2. Universal shell installer

```
./install.sh --agent <claude|codex|hermes|opencode> [--mode copy]
```

A dependency-free shell installer for the same file-based agents. Defaults to
symlink mode; pass `--mode copy` to copy files instead.

### 3. Native plugin manifests

For agents with their own plugin systems, install via the bundled manifests:

- Claude Code marketplace: `.claude-plugin`
- Codex: `.codex-plugin`
- Cursor: `.cursor-plugin`

Cursor and Openclaw use these manifests rather than the file-based directory
layout.
