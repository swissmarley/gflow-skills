---
name: game-assets
description: Create concept art, environment painting, character design, cutscene video, UI mockups, and marketing key art for games. Use when the user wants game concept art, environment design, character design, cutscenes, key art, or game UI mockups.
type: flexible
version: 1.0.0
foundation: false
consumes: [brand-identity, character-pipeline]
tools: [gflow-cli]
---

# Game Assets

Produces concept art, environment painting, character design, cutscene video, UI mockups, and marketing key art for games.

Read `references/quality-gate.md` (mandatory, motion and anti-slop rules) before building.

## When to Use
Game concept art, environment design, character design, cutscenes, key art, game UI mockups.

## Workflow

1. **Game brief** - capture genre, art style, platform, and reference games or films.
2. **Verify session** - run `gflow doctor`.
3. **Concept exploration** - `gflow image --outputs 8` for wide exploration.
4. **Lock art direction** - lock the direction from user selects.
5. **Environment paintings** - render key locations at different times and weather.
6. **Character designs** - `gflow character create` for consistency.
7. **Cutscenes** - `gflow video` with character references.
8. **UI mockups** - mockups for menus, HUD, and inventory.
9. **Marketing key art** - upscale with `--upscale 4k`.

## Domain Quality Checks
- Single art-style lock per project: painterly, cel-shaded, photorealistic, or pixel.
- Color palette discipline per biome or level.
- Character silhouette readability at thumbnail scale.
- Environment depth: foreground, midground, and background layering.
- UI mockups follow platform conventions: mobile touch targets, console safe zones.
- Concept art includes callouts for materials, scale, and color notes.

## Inheriting characters and brand
Inherit characters via `--character <name>` (from character-pipeline) and the brand or style system via `--project <brand>` (from brand-identity) so the locked art direction and palette carry across every asset.
