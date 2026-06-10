# Universal Quality Gate

Every gflow-skills skill MUST satisfy these standards before delivering output. Domain-specific checks live in each SKILL.md; this file holds the rules common to all.

## Anti-AI-Tells (hard bans)

- No AI-purple / blue-glow aesthetic as a default look.
- No em-dashes anywhere in generated copy. Use hyphens or restructure.
- No filler verbs: "Elevate", "Seamless", "Unleash", "Next-Gen", "Revolutionize".
- No generic centered hero layouts when design variance is high.
- No three-equal-feature-cards pattern. Use asymmetry, zig-zag, or bento with exact content counts.
- No Inter as the sole typeface.
- No premium-consumer beige/brass/oxblood default palette for wellness/luxury briefs.
- No generic stock-photo aesthetic. Every image must have art direction.

## Typography

- Display typeface for headings (Geist, Outfit, Cabinet Grotesk, Satoshi, not Inter alone).
- Headlines: tight tracking, short line length. Body: `max-w-[65ch]`, relaxed leading.
- One focal point per composition; establish a clear reading path.

## Motion (skills that emit code or video)

- Spring physics as the default curve (stiffness 100, damping 20). No linear easing for UI.
- Motion must be motivated: every animation has an articulable communication purpose.
- `prefers-reduced-motion` respected for any web output above minimal motion.
- Never bind to `window.addEventListener('scroll')`. Use GSAP ScrollTrigger or Motion `useScroll()`.
- Animate only `transform` and `opacity`. Never `top/left/width/height`.

## Accessibility (WCAG AA)

- Contrast: 4.5:1 for text, 3:1 for UI glyphs, in both light and dark modes.
- Touch targets minimum 44x44pt.
- No color-only indicators.
- Visible focus rings; logical keyboard tab order.

## Color

- Max one accent color per project; accent saturation < 80%.
- No pure `#000000`, use off-black (zinc-950 or similar).
- One consistent palette. No warm/cool gray fluctuation within a project.

## Copy

- No placeholder names ("John Doe", "Acme", "Nexus").
- No fake-perfect numbers ("99.99%").
- Run a content audit before delivery: remove hallucinated claims and "trying to sound thoughtful" phrasing.

## Web Stack (skills that emit code)

- **Turbopack is prohibited.** Run `next dev` and `next build` without the `--turbopack` flag, and strip `--turbopack` from package.json scripts when a scaffold (create-next-app adds it by default) puts it there. Use the standard Next.js webpack toolchain.

## gflow-cli Prerequisites

Every skill assumes:
- `gflow-cli` installed: `npm install -g @swissmarley/gflow-cli`
- An authenticated session: `gflow auth login`
- Verified readiness: `gflow doctor`

If `gflow doctor` fails, stop and instruct the user to authenticate before generating.

## gflow-cli Execution Rules

- **One project per run.** Pick a single Flow project at the start of the run (reuse the brand's `--project <brand>` when one exists, otherwise one named project for this run) and pass the same `--project <name>` on every gflow command. Never run generation commands without `--project`: each command then lands its asset in its own auto-created project and the user ends up with a pile of single-asset projects. Split assets across projects only when the user explicitly asks for it.
- **Headless execution.** Append `--no-headed` to every gflow command. The only exception is `gflow auth login`, which must open a visible window for Google sign-in.
