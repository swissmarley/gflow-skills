<div align="center">

<img src="https://raw.githubusercontent.com/swissmarley/gflow-skills/main/assets/banner.svg" alt="gflow-skills - creative production skills for coding agents" width="760">

<h1>gflow-skills</h1>

<p><strong>A collection of agent skills that turn Google Flow into a professional creative production pipeline for coding agents.</strong></p>

[![CI](https://github.com/swissmarley/gflow-skills/actions/workflows/validate.yaml/badge.svg)](https://github.com/swissmarley/gflow-skills/actions/workflows/validate.yaml)
[![npm](https://img.shields.io/npm/v/gflow-skills)](https://www.npmjs.com/package/gflow-skills)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D20-brightgreen.svg)](https://nodejs.org)

</div>

---

gflow-skills is a set of 12 installable skills that teach your coding agent how to produce stunning design content with Google Flow: immersive websites, short films, brand systems, product imagery, and more. It is for anyone using a coding agent ([Claude Code](https://claude.com/claude-code), Codex, Openclaw, Hermes, OpenCode, Cursor) who wants studio-quality output instead of generic AI slop. The skills build on [gflow-cli](https://github.com/swissmarley/gflow-cli), the command-line automation layer for Google Flow image and video generation.

```bash
npx gflow-skills install --agent claude
```

## Features

- 🎭 **Foundation skills** - establish reusable characters and a full brand system once, reuse them everywhere.
- 🌐 **Immersive websites** - cinematic, scroll-driven sites with AI hero imagery and video backgrounds.
- 🎬 **Cinema production** - storyboard to assembled clips, with character continuity across scenes.
- ✨ **Motion graphics** - seamless loops, animated backgrounds, and title sequences via frame interpolation.
- 📸 **Product and editorial** - studio-quality commercial imagery and art-directed editorial photography.
- 🏛️ **Architecture and games** - photorealistic renders, walkthroughs, concept art, and key art.
- 📱 **Documents and social** - pitch decks, mood boards, and platform-ready social content in batch.
- 🎚️ **Built-in quality gate** - every skill ships anti-slop, accessibility, and motion standards.
- 🔌 **Works everywhere** - one npm command, a universal shell installer, and native plugin manifests.

## How it works

gflow-skills is organized as a hub-and-spoke pipeline. Two foundation skills produce reusable assets, and the ten production skills inherit those assets optionally. Production skills also work standalone with sensible defaults, so you never have to build a brand or character first. Inheriting simply locks in continuity.

```
                    Foundation (the hub)
        ┌──────────────────────────────────────────┐
        │  character-pipeline  ->  --character <name> │
        │  brand-identity      ->  --project  <brand> │
        └───────────────────────┬────────────────────┘
                                │  inherited optionally
        ┌───────────────────────┴────────────────────┐
        │              Production (the spokes)         │
        │  immersive-web    motion-graphics            │
        │  cinema-production product-visuals           │
        │  design-docs       social-content            │
        │  editorial-design  architectural-viz         │
        │  game-assets       music-video               │
        └─────────────────────────────────────────────┘
```

- **character-pipeline** registers a reusable Flow character. Downstream skills reference it with `--character <name>`.
- **brand-identity** registers a brand guide and a configured Flow project. Downstream generation inherits the brand DNA with `--project <brand>`.

See [`guides/pipeline-guide.md`](guides/pipeline-guide.md) for worked examples.

## Requirements

- Node.js 20 or newer.
- [gflow-cli](https://github.com/swissmarley/gflow-cli), installed globally:
  ```bash
  npm install -g @swissmarley/gflow-cli
  ```
- Google Chrome and an authenticated Google Flow session:
  ```bash
  gflow auth login
  gflow doctor
  ```
  `gflow doctor` verifies that authentication and the browser are ready. If it fails, sign in again before generating.

## Install

### npm one-liner (recommended)

```bash
npx gflow-skills install --agent claude
```

`--agent` accepts `claude`, `codex`, `hermes`, `opencode`, or `cursor`. Useful flags:

| Flag | Description | Default |
|------|-------------|---------|
| `--agent <name>` | Target agent | required |
| `--mode <symlink\|copy>` | Link the source files or copy them | `symlink` |
| `--skills <a,b>` | Install only the named skills | all 12 |

List everything available before installing:

```bash
npx gflow-skills list
```

### Shell installer

A dependency-free installer for the file-based agents:

```bash
./install.sh --agent <claude|codex|hermes|opencode>
```

It defaults to symlink mode; pass `--mode copy` to copy files instead.

### Native plugin marketplaces

For agents with their own plugin systems, install via the bundled manifests:

| Agent | Manifest |
|-------|----------|
| Claude Code | `.claude-plugin` |
| Codex | `.codex-plugin` |
| Cursor | `.cursor-plugin` |

Openclaw is MCP-compatible and uses the Claude or Cursor manifests. See [`guides/providers.md`](guides/providers.md) for the full per-agent path table.

### Upgrading from 1.0

As of 1.1.0, every slash command is namespaced with a `gflow-` prefix (`/character` is now `/gflow-character`, `/brand` is now `/gflow-brand`, and so on). Re-run the installer to pick up the new command files; the old unprefixed commands can be deleted from your agent's commands directory.

## Quickstart

Establish a brand once, then build a site that inherits it.

1. Run the foundation skill to define the visual system and configure a Flow project:

   ```
   /gflow-brand
   ```

   This registers a project, for example `--project acme`.

2. Build an immersive site that inherits the brand, by slash command or natural language ("build me an immersive scroll-driven site for acme"):

   ```
   /gflow-immersive --project acme
   ```

   Under the hood the immersive-web skill runs gflow-cli with the brand project so every asset matches the palette and mood:

   ```bash
   gflow image --model imagen-4 --ratio 16:9 --outputs 4 --upscale 4k --project acme --out ./public/hero
   gflow video --model veo-3.1-quality --duration 8 --ratio 16:9 --project acme --out ./public/video
   ```

   The skill then assembles production Next.js + Tailwind + Motion/GSAP code around the generated hero imagery and video loops.

## Skills

| Skill | Type | Command | What it does |
|-------|------|---------|--------------|
| character-pipeline | Foundation | `/gflow-character` | Create consistent, reusable characters with defined visual identity, personality and voice. |
| brand-identity | Foundation | `/gflow-brand` | Establish a complete brand visual system and configure a Flow project for consistent downstream generation. |
| immersive-web | Production | `/gflow-immersive` | Build cinematic, scroll-driven websites with AI-generated imagery and video loops. |
| motion-graphics | Production | `/gflow-motion` | Create seamless video loops, animated backgrounds, and title sequences. |
| cinema-production | Production | `/gflow-cinema` | Full short film pipeline from storyboard to assembled clips. |
| product-visuals | Production | `/gflow-product` | Studio-quality product photography and commercial imagery. |
| design-docs | Production | `/gflow-designdoc` | Pitch decks, mood boards, and creative briefs with embedded AI visuals. |
| social-content | Production | `/gflow-social` | Platform-optimized social posts, reels, and thumbnails in batch. |
| editorial-design | Production | `/gflow-editorial` | Article illustrations, cover art, photo essays, and visual narratives. |
| architectural-viz | Production | `/gflow-archviz` | Photorealistic architectural renders, walkthrough videos, and real estate marketing. |
| game-assets | Production | `/gflow-gameart` | Concept art, environment painting, character design, and cutscene video for games. |
| music-video | Production | `/gflow-musicvideo` | Visual narratives for music: performance scenes, abstract visuals, lyric videos. |

Each skill is a self-contained folder under [`skills/`](skills) with a `SKILL.md`, a slash command, and optional reference docs.

## Quality standards

Every skill applies a shared quality gate before it delivers output, defined in [`references/quality-gate.md`](references/quality-gate.md). It enforces:

- **Anti-AI-tells:** no AI-purple aesthetic, no filler verbs, no three-equal-feature-cards pattern, no generic centered hero, no Inter as the sole typeface, no em-dashes.
- **Accessibility (WCAG AA):** 4.5:1 text contrast, 44x44pt touch targets, visible focus rings, no color-only indicators.
- **Motivated motion:** spring physics by default, `prefers-reduced-motion` respected, transform and opacity only, no raw scroll listeners.
- **Typographic discipline:** display typefaces for headings, constrained body measure, one focal point per composition.

The gate draws on established production design-skill practice and is enforced by the test suite.

## Configuration

Installed skills land in each agent's standard location. The npm and shell installers also write an auto-managed block into the agent instructions file so skills are discovered automatically.

| Agent | Skills | Commands | Instructions |
|-------|--------|----------|--------------|
| Claude Code | `~/.claude/skills/` | `~/.claude/commands/` | `~/.claude/CLAUDE.md` |
| Codex | `~/.codex/skills/` | `~/.codex/commands/` | `~/.codex/AGENTS.md` |
| OpenCode | `~/.config/opencode/skills/` | `~/.config/opencode/command/` | `~/.config/opencode/AGENTS.md` |
| Hermes | `~/.config/hermes/skills/` | `~/.config/hermes/commands/` | `~/.config/hermes/AGENTS.md` |
| Cursor | via `.cursor-plugin` manifest | - | - |

## Troubleshooting

- **`gflow doctor` fails** - run `gflow auth login` and complete the Google sign-in, then retry. Generation needs a live, authenticated Flow session.
- **A skill is not discovered** - confirm it installed (`npx gflow-skills list`) and that the auto-managed block exists in your agent instructions file.
- **Generated output looks generic** - the skills enforce the quality gate, but you can steer harder by running `brand-identity` first so production skills inherit a defined look.

## Development

```bash
git clone https://github.com/swissmarley/gflow-skills
cd gflow-skills
node --test                  # run the test suite
node lib/registry.js --validate
node scripts/gen-manifests.js # regenerate plugin manifests from skills.json
```

To add a skill: create a `skills/<name>/` folder with a `SKILL.md`, register it in `skills.json`, regenerate the manifests, and run the tests. Full guide in [`guides/adding-a-skill.md`](guides/adding-a-skill.md).

## Disclaimer

gflow-skills is an independent, unofficial project. It is not affiliated with or endorsed by Google. Google Flow, Imagen, and Veo are products of Google. Use of Google Flow is subject to Google's own terms of service.

## License

[MIT](LICENSE) © swissmarley
