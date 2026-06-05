import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseArgs, selectSkills } from '../lib/cli.js';
import { loadRegistry } from '../lib/registry.js';

test('parseArgs reads command, agent, mode and skills', () => {
  const opts = parseArgs(['install', '--agent', 'codex', '--mode', 'copy', '--skills', 'immersive-web,cinema-production']);
  assert.equal(opts.command, 'install');
  assert.equal(opts.agent, 'codex');
  assert.equal(opts.mode, 'copy');
  assert.deepEqual(opts.skills, ['immersive-web', 'cinema-production']);
});

test('parseArgs defaults mode to symlink and skills to null', () => {
  const opts = parseArgs(['install', '--agent', 'claude']);
  assert.equal(opts.mode, 'symlink');
  assert.equal(opts.skills, null);
});

test('selectSkills returns all when filter is null', () => {
  const reg = loadRegistry();
  assert.equal(selectSkills(reg, null).length, 12);
});

test('selectSkills filters by name', () => {
  const reg = loadRegistry();
  const sel = selectSkills(reg, ['immersive-web']);
  assert.equal(sel.length, 1);
  assert.equal(sel[0].name, 'immersive-web');
});

test('selectSkills throws on unknown skill name', () => {
  const reg = loadRegistry();
  assert.throws(() => selectSkills(reg, ['ghost']), /ghost/);
});
