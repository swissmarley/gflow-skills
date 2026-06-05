import { test } from 'node:test';
import assert from 'node:assert/strict';
import { getAgentConfig, listAgents } from '../lib/agents.js';

test('listAgents includes the five installer targets', () => {
  assert.deepEqual(
    listAgents().sort(),
    ['claude', 'codex', 'cursor', 'hermes', 'opencode']
  );
});

test('claude config uses ~/.claude paths', () => {
  const cfg = getAgentConfig('claude', '/home/u');
  assert.equal(cfg.skillsDir, '/home/u/.claude/skills');
  assert.equal(cfg.commandsDir, '/home/u/.claude/commands');
  assert.equal(cfg.instructionsFile, '/home/u/.claude/CLAUDE.md');
});

test('opencode uses singular command dir', () => {
  const cfg = getAgentConfig('opencode', '/home/u');
  assert.equal(cfg.commandsDir, '/home/u/.config/opencode/command');
});

test('unknown agent throws', () => {
  assert.throws(() => getAgentConfig('bogus', '/home/u'), /Unknown agent/);
});
