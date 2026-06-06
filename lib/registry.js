import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

export function loadRegistry() {
  const raw = readFileSync(join(ROOT, 'skills.json'), 'utf8');
  return JSON.parse(raw);
}

export function validateRegistry(reg) {
  const errors = [];
  if (!Array.isArray(reg.skills)) {
    return { ok: false, errors: ['skills must be an array'] };
  }
  const names = new Set(reg.skills.map((s) => s.name).filter(Boolean));
  for (const s of reg.skills) {
    const id = s.name || '(unnamed)';
    if (!s.name) errors.push(`Skill missing name: ${JSON.stringify(s).slice(0, 60)}`);
    if (!s.version) errors.push(`${id}: missing version`);
    if (!s.description) errors.push(`${id}: missing description`);
    for (const dep of s.consumes || []) {
      if (!names.has(dep)) errors.push(`${id}: consumes unknown skill "${dep}"`);
    }
  }
  return { ok: errors.length === 0, errors };
}

// CLI: `node lib/registry.js --validate`
if (process.argv[2] === '--validate') {
  const reg = loadRegistry();
  const { ok, errors } = validateRegistry(reg);
  if (!ok) {
    console.error('Registry validation failed:\n' + errors.join('\n'));
    process.exit(1);
  }
  console.log(`Registry valid: ${reg.skills.length} skills OK`);
}
