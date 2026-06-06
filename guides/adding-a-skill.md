# Adding a Skill

This guide walks through contributing a new skill to gflow-skills.

## Skill folder anatomy

Every skill lives in its own folder under `skills/`:

```
skills/<name>/
  SKILL.md          # required: the skill definition and frontmatter
  commands/         # optional: slash command files (e.g. commands/<name>.md)
  references/       # optional: reference material loaded on demand
  assets/           # optional: templates, data files, examples
```

`SKILL.md` is the only required file. Add `commands/`, `references/`, and `assets/` only when the skill needs them.

## SKILL.md frontmatter

The file starts with a YAML frontmatter block:

```yaml
---
name: my-skill          # must match the folder name exactly
description: One sentence on what it does. Use when the user wants X, asks for Y, or needs Z.
type: flexible          # flexible | rigid
version: 1.0.0
foundation: false       # true if other skills consume this one
consumes: [brand-identity]   # array of foundation skill names this skill builds on
tools: [gflow-cli]
---
```

Field notes:

- `name` must match the folder name exactly.
- `description` must include explicit trigger guidance phrased as "Use when..." so the agent knows when to activate the skill.
- `type` is `flexible` (the agent adapts the workflow) or `rigid` (steps run in a fixed order).
- `version` follows semver.
- `foundation` is a boolean; set `true` only for skills that produce reusable artifacts consumed by production skills.
- `consumes` is an array of foundation skill names this skill optionally inherits from. Omit it for foundation skills.
- `tools` lists the CLI tools the skill depends on.

## Steps to add a skill

1. Create the folder, `SKILL.md`, and at least one command file:
   ```
   skills/<name>/SKILL.md
   skills/<name>/commands/<name>.md
   ```
2. Add an entry to `skills.json`. Match the shape defined in `skills.schema.json` (name, version, description, optional foundation/consumes/tags/commands/triggers).
3. Regenerate the per-agent manifests:
   ```
   node scripts/gen-manifests.js
   ```
4. Run the test suite. The structure test validates your skill automatically:
   ```
   node --test
   ```

## Quality gate

Two requirements are enforced for every skill:

- Every `SKILL.md` must reference `references/quality-gate.md` and apply it throughout the workflow.
- No em-dash characters are allowed in any markdown file. Use hyphens instead.

The test suite checks these, so run `node --test` before opening a pull request.
