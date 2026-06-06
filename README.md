# gflow-skills

A collection of agent skills that turn Google Flow (via gflow-cli) into a professional creative production pipeline for coding agents.

## What it is

gflow-skills is a set of 12 installable skills that teach your coding agent how to produce stunning design content with Google Flow: immersive websites, short films, brand systems, product imagery, and more. It is for anyone using a coding agent (Claude Code, Codex, Openclaw, Hermes, OpenCode, Cursor) who wants studio-quality output instead of generic AI slop. The skills build on [gflow-cli](https://github.com/swissmarley/gflow-cli), the command-line automation layer for Google Flow image and video generation.

## Prerequisites

- Node.js 20 or newer.
- gflow-cli, installed globally:
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

- `--mode symlink|copy` links the source files (symlink, the default) or copies them.
- `--skills a,b` installs only the named skills instead of all 12.

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

- Claude Code: `.claude-plugin`
- Codex: `.codex-plugin`
- Cursor: `.cursor-plugin`

Openclaw is MCP-compatible and uses the Claude or Cursor manifests.

See [`guides/providers.md`](guides/providers.md) for the full per-agent path table (skills, commands, and instructions directories).

## The skills

| Skill | Type | Command | What it does |
|-------|------|---------|--------------|
| character-pipeline | Foundation | `/character` | Create consistent, reusable characters with defined visual identity, personality and voice. |
| brand-identity | Foundation | `/brand` | Establish a complete brand visual system and configure a Flow project for consistent downstream generation. |
| immersive-web | Production | `/immersive` | Build cinematic, scroll-driven websites with AI-generated imagery and video loops. |
| motion-graphics | Production | `/motion` | Create seamless video loops, animated backgrounds, and title sequences. |
| cinema-production | Production | `/cinema` | Full short film pipeline from storyboard to assembled clips. |
| product-visuals | Production | `/product` | Studio-quality product photography and commercial imagery. |
| design-docs | Production | `/designdoc` | Pitch decks, mood boards, and creative briefs with embedded AI visuals. |
| social-content | Production | `/social` | Platform-optimized social posts, reels, and thumbnails in batch. |
| editorial-design | Production | `/editorial` | Article illustrations, cover art, photo essays, and visual narratives. |
| architectural-viz | Production | `/archviz` | Photorealistic architectural renders, walkthrough videos, and real estate marketing. |
| game-assets | Production | `/gameart` | Concept art, environment painting, character design, and cutscene video for games. |
| music-video | Production | `/musicvideo` | Visual narratives for music: performance scenes, abstract visuals, lyric videos. |

## How it works (hub and spoke)

gflow-skills is organized as a hub-and-spoke pipeline. Two foundation skills produce reusable assets, and the ten production skills inherit those assets optionally. Production skills also work standalone with sensible defaults, so you never have to build a brand or character first; inheriting simply locks in continuity.

```
        Foundation (the hub)
   ┌───────────────────────────────┐
   │  character-pipeline            │
   │    -> character via --character│
   │  brand-identity                │
   │    -> brand project via --project
   └───────────────┬───────────────┘
                   │ inherited optionally
   ┌───────────────┴───────────────────────────────┐
   │  Production (the spokes)                        │
   │  immersive-web   motion-graphics  cinema-production
   │  product-visuals design-docs      social-content
   │  editorial-design architectural-viz game-assets
   │  music-video                                    │
   └─────────────────────────────────────────────────┘
```

- **character-pipeline** registers a reusable Flow character. Downstream skills reference it with `--character <name>`.
- **brand-identity** registers a brand guide and a configured Flow project. Downstream generation inherits the brand DNA with `--project <brand>`.

See [`guides/pipeline-guide.md`](guides/pipeline-guide.md) for worked examples.

## Quick example

Establish a brand once, then build a site that inherits it.

1. Run the foundation skill to define the visual system and configure a Flow project:

   ```
   /brand
   ```

   This registers a project, for example `--project acme`.

2. Build an immersive site that inherits the brand, by slash command or natural language ("build me an immersive scroll-driven site for acme"):

   ```
   /immersive --project acme
   ```

   Under the hood the immersive-web skill runs gflow-cli with the brand project so every asset matches the palette and mood:

   ```bash
   gflow image --model imagen-4 --ratio 16:9 --outputs 4 --upscale 4k --project acme --out ./public/hero
   gflow video --model veo-3.1-quality --duration 8 --ratio 16:9 --project acme --out ./public/video
   ```

   The skill then assembles production Next.js + Tailwind + Motion/GSAP code around the generated hero imagery and video loops.

## Quality standards

Every skill applies a shared quality gate before it delivers output, defined in [`references/quality-gate.md`](references/quality-gate.md). It enforces:

- **Anti-AI-tells:** no AI-purple aesthetic, no filler verbs, no three-equal-feature-cards pattern, no generic centered hero, no Inter as the sole typeface, no em-dashes.
- **Accessibility (WCAG AA):** 4.5:1 text contrast, 44x44pt touch targets, visible focus rings, no color-only indicators.
- **Motivated motion:** spring physics by default, `prefers-reduced-motion` respected, transform and opacity only, no raw scroll listeners.
- **Typographic discipline:** display typefaces for headings, constrained body measure, one focal point per composition.

The gate draws on established production design-skill practice and is enforced by the test suite.

## Contributing

See [`guides/adding-a-skill.md`](guides/adding-a-skill.md). In short: add a `skills/<name>/` folder with a `SKILL.md`, register the skill in `skills.json`, regenerate the per-agent manifests with `node scripts/gen-manifests.js`, and run the tests with `node --test`.

## License

MIT. See [LICENSE](LICENSE).
