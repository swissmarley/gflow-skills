# Pipeline Guide

gflow-skills is organized as a hub-and-spoke pipeline. A small set of
foundation skills produce reusable artifacts, and the production skills (the
spokes) consume those artifacts to stay consistent.

## Foundation skills run first

Two foundation skills establish the shared context everything else builds on:

- **character-pipeline** produces reusable Flow characters with a defined
  visual identity, personality, and voice. Once registered, a character is
  referenced downstream via `--character <name>`.
- **brand-identity** produces a brand guide (colors, typography, imagery style,
  tone) and a configured Flow project. Downstream generation inherits the brand
  DNA via `--project <brand>`.

Run a foundation skill once, then reuse its output across many productions.

## Production skills inherit optionally

Production skills (immersive-web, cinema-production, motion-graphics, and the
rest) can inherit from the foundation skills, but they are not required to.
Each one also works standalone with sensible defaults, so you can start a
production without first building a brand or a character. Inheriting simply
locks in continuity.

## Worked example 1: brand then site

1. Run **brand-identity** to define the visual system and configure a Flow
   project:
   ```
   /gflow-brand
   ```
   This registers a project, for example `--project acme`.
2. Run **immersive-web**, passing the brand project so the site inherits the
   palette and mood automatically:
   ```
   /gflow-immersive --project acme
   ```
   Every generated image and video loop on the site now reflects the brand
   identity established in step 1.

## Worked example 2: character then film

1. Run **character-pipeline** to design and register a reusable character:
   ```
   /gflow-character
   ```
   This registers the character, for example `--character nova`.
2. Run **cinema-production**, reusing the registered character so it stays
   visually consistent across every scene:
   ```
   /gflow-cinema --character nova
   ```
   The film references the same `--character nova` in each scene, giving
   continuity of face, costume, and presence throughout.
