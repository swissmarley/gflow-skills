#!/usr/bin/env node
import { writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { loadRegistry } from '../lib/registry.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const reg = loadRegistry();

const claude = {
  name: 'gflow-skills',
  owner: 'swissmarley',
  plugins: reg.skills.map((s) => ({
    name: s.name,
    source: `./skills/${s.name}`,
    description: s.description,
    version: s.version,
    category: s.foundation ? 'foundation' : 'production',
    tags: s.tags
  }))
};

const generic = (key) => ({
  name: 'gflow-skills',
  version: 1,
  [key]: reg.skills.map((s) => ({
    name: s.name,
    path: `./skills/${s.name}`,
    description: s.description,
    commands: (s.commands || []).map((c) => c.slash)
  }))
});

function emit(dir, file, data) {
  mkdirSync(join(ROOT, dir), { recursive: true });
  writeFileSync(join(ROOT, dir, file), JSON.stringify(data, null, 2) + '\n');
}

emit('.claude-plugin', 'marketplace.json', claude);
emit('.codex-plugin', 'manifest.json', generic('skills'));
emit('.cursor-plugin', 'manifest.json', generic('skills'));
console.log('Generated 3 plugin manifests from skills.json');
