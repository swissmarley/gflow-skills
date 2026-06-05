import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, rmSync, existsSync, readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { installSkills } from '../lib/installer.js';

function makeFakeRepo() {
  const repo = mkdtempSync(join(tmpdir(), 'gfs-repo-'));
  const skillDir = join(repo, 'skills', 'demo-skill', 'commands');
  mkdirSync(skillDir, { recursive: true });
  writeFileSync(join(repo, 'skills', 'demo-skill', 'SKILL.md'), '---\nname: demo-skill\n---\nbody');
  writeFileSync(join(skillDir, 'demo.md'), '---\ndescription: Demo\n---\nrun');
  return repo;
}

test('installSkills copies skill folder and wires command', () => {
  const repo = makeFakeRepo();
  const home = mkdtempSync(join(tmpdir(), 'gfs-home-'));
  const skills = [{ name: 'demo-skill', commands: [{ file: 'commands/demo.md', slash: 'demo' }] }];

  const result = installSkills({ agent: 'claude', home, repoRoot: repo, skills, mode: 'copy' });

  assert.ok(existsSync(join(home, '.claude/skills/demo-skill/SKILL.md')));
  assert.ok(existsSync(join(home, '.claude/commands/demo.md')));
  assert.equal(result.installed.length, 1);

  rmSync(repo, { recursive: true, force: true });
  rmSync(home, { recursive: true, force: true });
});

test('installSkills writes auto-managed block into instructions file', () => {
  const repo = makeFakeRepo();
  const home = mkdtempSync(join(tmpdir(), 'gfs-home-'));
  const skills = [{ name: 'demo-skill', commands: [{ file: 'commands/demo.md', slash: 'demo' }] }];

  installSkills({ agent: 'claude', home, repoRoot: repo, skills, mode: 'copy' });

  const instructions = readFileSync(join(home, '.claude/CLAUDE.md'), 'utf8');
  assert.match(instructions, /BEGIN gflow-skills:auto-managed/);
  assert.match(instructions, /demo-skill/);
  assert.match(instructions, /END gflow-skills:auto-managed/);

  rmSync(repo, { recursive: true, force: true });
  rmSync(home, { recursive: true, force: true });
});

test('installSkills is idempotent on the managed block', () => {
  const repo = makeFakeRepo();
  const home = mkdtempSync(join(tmpdir(), 'gfs-home-'));
  const skills = [{ name: 'demo-skill', commands: [{ file: 'commands/demo.md', slash: 'demo' }] }];

  installSkills({ agent: 'claude', home, repoRoot: repo, skills, mode: 'copy' });
  installSkills({ agent: 'claude', home, repoRoot: repo, skills, mode: 'copy' });

  const instructions = readFileSync(join(home, '.claude/CLAUDE.md'), 'utf8');
  const occurrences = instructions.split('BEGIN gflow-skills:auto-managed').length - 1;
  assert.equal(occurrences, 1);

  rmSync(repo, { recursive: true, force: true });
  rmSync(home, { recursive: true, force: true });
});
