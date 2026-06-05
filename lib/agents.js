import { join } from 'node:path';

const AGENTS = {
  claude: { base: '.claude', commands: 'commands', instructions: 'CLAUDE.md' },
  codex: { base: '.codex', commands: 'commands', instructions: 'AGENTS.md' },
  opencode: { base: '.config/opencode', commands: 'command', instructions: 'AGENTS.md' },
  hermes: { base: '.config/hermes', commands: 'commands', instructions: 'AGENTS.md' },
  cursor: { base: '.cursor', commands: 'commands', instructions: 'AGENTS.md' }
};

export function listAgents() {
  return Object.keys(AGENTS);
}

export function getAgentConfig(agent, home) {
  const a = AGENTS[agent];
  if (!a) throw new Error(`Unknown agent: ${agent}. Known: ${listAgents().join(', ')}`);
  const root = join(home, a.base);
  return {
    agent,
    root,
    skillsDir: join(root, 'skills'),
    commandsDir: join(root, a.commands),
    instructionsFile: join(root, a.instructions)
  };
}
