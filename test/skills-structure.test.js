import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { loadRegistry } from '../lib/registry.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

test('every registry skill has a SKILL.md with matching name frontmatter', () => {
  for (const s of loadRegistry().skills) {
    const file = join(ROOT, 'skills', s.name, 'SKILL.md');
    assert.ok(existsSync(file), `missing SKILL.md for ${s.name}`);
    const body = readFileSync(file, 'utf8');
    assert.match(body, new RegExp(`name:\\s*${s.name}`), `${s.name} frontmatter name mismatch`);
  }
});

test('every declared command file exists', () => {
  for (const s of loadRegistry().skills) {
    for (const cmd of s.commands || []) {
      const file = join(ROOT, 'skills', s.name, cmd.file);
      assert.ok(existsSync(file), `missing command ${cmd.file} for ${s.name}`);
    }
  }
});

test('no SKILL.md contains an em-dash', () => {
  for (const s of loadRegistry().skills) {
    const body = readFileSync(join(ROOT, 'skills', s.name, 'SKILL.md'), 'utf8');
    assert.ok(!body.includes('—'), `${s.name} SKILL.md contains an em-dash`);
  }
});

test('quality-gate reference exists', () => {
  assert.ok(existsSync(join(ROOT, 'references', 'quality-gate.md')));
});
