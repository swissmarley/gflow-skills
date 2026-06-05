import { test } from 'node:test';
import assert from 'node:assert/strict';
import { loadRegistry, validateRegistry } from '../lib/registry.js';

test('loadRegistry returns 12 skills', () => {
  const reg = loadRegistry();
  assert.equal(reg.skills.length, 12);
});

test('loadRegistry includes both foundation skills', () => {
  const reg = loadRegistry();
  const foundations = reg.skills.filter((s) => s.foundation);
  assert.deepEqual(
    foundations.map((s) => s.name).sort(),
    ['brand-identity', 'character-pipeline']
  );
});

test('validateRegistry passes for the shipped registry', () => {
  const reg = loadRegistry();
  const { ok, errors } = validateRegistry(reg);
  assert.equal(ok, true, errors.join('\n'));
});

test('validateRegistry flags a skill missing a name', () => {
  const bad = { version: 1, skills: [{ version: '1.0.0', description: 'x' }] };
  const { ok, errors } = validateRegistry(bad);
  assert.equal(ok, false);
  assert.match(errors.join('\n'), /name/);
});

test('validateRegistry flags consumes referencing unknown skill', () => {
  const bad = {
    version: 1,
    skills: [
      { name: 'a', version: '1.0.0', description: 'x', foundation: false, consumes: ['ghost'] }
    ]
  };
  const { ok, errors } = validateRegistry(bad);
  assert.equal(ok, false);
  assert.match(errors.join('\n'), /ghost/);
});
