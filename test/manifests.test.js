import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { loadRegistry } from '../lib/registry.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => JSON.parse(readFileSync(join(ROOT, p), 'utf8'));

test('claude marketplace lists all 12 skills', () => {
  const m = read('.claude-plugin/marketplace.json');
  assert.equal(m.plugins.length, 12);
  const names = new Set(loadRegistry().skills.map((s) => s.name));
  for (const p of m.plugins) assert.ok(names.has(p.name), `unknown plugin ${p.name}`);
});

test('codex and cursor manifests exist and list 12 skills', () => {
  for (const f of ['.codex-plugin/manifest.json', '.cursor-plugin/manifest.json']) {
    assert.ok(existsSync(join(ROOT, f)), `missing ${f}`);
    const m = read(f);
    assert.equal(m.skills.length, 12);
  }
});
