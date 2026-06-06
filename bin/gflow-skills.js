#!/usr/bin/env node
import { homedir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { parseArgs, selectSkills } from '../lib/cli.js';
import { loadRegistry } from '../lib/registry.js';
import { installSkills } from '../lib/installer.js';
import { listAgents } from '../lib/agents.js';

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..');

function printHelp() {
  console.log(`gflow-skills - creative skills for coding agents

Usage:
  npx gflow-skills install --agent <name> [--mode symlink|copy] [--skills a,b]
  npx gflow-skills list

Agents: ${listAgents().join(', ')}`);
}

let opts;
try {
  opts = parseArgs(process.argv.slice(2));
} catch (err) {
  console.error('Error: ' + err.message);
  process.exit(1);
}
const registry = loadRegistry();

if (opts.command === 'list') {
  for (const s of registry.skills) {
    console.log(`${s.foundation ? '★' : ' '} ${s.name.padEnd(20)} ${s.description}`);
  }
  process.exit(0);
}

if (opts.command === 'install') {
  if (!opts.agent) {
    console.error('Error: --agent is required. Agents: ' + listAgents().join(', '));
    process.exit(1);
  }
  try {
    const skills = selectSkills(registry, opts.skills);
    const { installed } = installSkills({
      agent: opts.agent,
      home: homedir(),
      repoRoot,
      skills,
      mode: opts.mode
    });
    console.log(`Installed ${installed.length} skill(s) for ${opts.agent}:`);
    installed.forEach((n) => console.log(`  - ${n}`));
    console.log('\nEnsure gflow-cli is installed: npm install -g @swissmarley/gflow-cli');
  } catch (err) {
    console.error('Install failed: ' + err.message);
    process.exit(1);
  }
  process.exit(0);
}

printHelp();
