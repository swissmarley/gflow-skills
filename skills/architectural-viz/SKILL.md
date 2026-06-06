---
name: architectural-viz
description: Produce photorealistic architectural renders, walkthrough videos, before/after transformations, and real estate marketing. Use when the user wants interior or exterior renders, real estate marketing, walkthrough videos, or design presentations.
type: flexible
version: 1.0.0
foundation: false
consumes: [brand-identity]
tools: [gflow-cli]
---

# Architectural Viz

Produces photorealistic architectural renders, walkthrough videos, before/after transformations, and real estate marketing assets.

Read `references/quality-gate.md` (mandatory, motion and anti-slop rules) before building.

## When to Use
Interior and exterior renders, real estate marketing, walkthrough videos, design presentations.

## Workflow

1. **Project brief** - capture building type, style (modern, classical, organic), location, and time of day.
2. **Verify session** - run `gflow doctor`.
3. **Exterior establishing shots** - `gflow image --model imagen-4 --ratio 16:9`.
4. **Interior scenes** - generate interiors with a consistent design language.
5. **Walkthrough video** - `gflow video --model veo-3.1-quality --duration 15`.
6. **Before/after transformations** - `gflow edit image` on base renders.
7. **Upscale** - upscale presentation shots with `--upscale 4k`.
8. **Deliver** - render set plus walkthrough video plus presentation deck assets.

## Domain Quality Checks
- Lighting realism: match time-of-day, orientation, and climate to the location.
- Material fidelity: concrete reads as concrete, glass as glass, no plastic sheen.
- Human-figure scale references and proportional furniture.
- Architect-standard camera angles: standing, bird's eye, worm's eye.
- Natural color grading, no HDR-overprocessed look.

## Inheriting brand
Inherit the brand system via `--project <brand>` (from brand-identity) so palette, signage, and presentation styling carry through the renders and deck.
