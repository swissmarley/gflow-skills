import { cpSync, mkdirSync, existsSync, readFileSync, writeFileSync, symlinkSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { getAgentConfig } from './agents.js';

const BEGIN = '<!-- BEGIN gflow-skills:auto-managed -->';
const END = '<!-- END gflow-skills:auto-managed -->';

function placeSkill(srcDir, destDir, mode) {
  mkdirSync(destDir, { recursive: true });
  if (existsSync(destDir)) rmSync(destDir, { recursive: true, force: true });
  if (mode === 'symlink') {
    symlinkSync(srcDir, destDir, 'dir');
  } else {
    cpSync(srcDir, destDir, { recursive: true });
  }
}

function wireCommands(skill, repoRoot, commandsDir) {
  mkdirSync(commandsDir, { recursive: true });
  for (const cmd of skill.commands || []) {
    const src = join(repoRoot, 'skills', skill.name, cmd.file);
    const dest = join(commandsDir, `${cmd.slash}.md`);
    cpSync(src, dest);
  }
}

function buildManagedBlock(skills) {
  const lines = [BEGIN, '## gflow-skills', ''];
  for (const s of skills) {
    const slashes = (s.commands || []).map((c) => `/${c.slash}`).join(', ');
    lines.push(`- **${s.name}** - invoke the Skill tool with skill: "${s.name}" when relevant${slashes ? ` (commands: ${slashes})` : ''}`);
  }
  lines.push('', END);
  return lines.join('\n');
}

function updateInstructions(file, skills) {
  let content = existsSync(file) ? readFileSync(file, 'utf8') : '';
  const block = buildManagedBlock(skills);
  if (content.includes(BEGIN) && content.includes(END)) {
    content = content.replace(new RegExp(`${BEGIN}[\\s\\S]*?${END}`), block);
  } else {
    content = content.trimEnd() + (content ? '\n\n' : '') + block + '\n';
  }
  mkdirSync(join(file, '..'), { recursive: true });
  writeFileSync(file, content);
}

export function installSkills({ agent, home, repoRoot, skills, mode = 'symlink' }) {
  const cfg = getAgentConfig(agent, home);
  const installed = [];
  for (const skill of skills) {
    const srcDir = join(repoRoot, 'skills', skill.name);
    const destDir = join(cfg.skillsDir, skill.name);
    placeSkill(srcDir, destDir, mode);
    if (agent !== 'cursor') wireCommands(skill, repoRoot, cfg.commandsDir);
    installed.push(skill.name);
  }
  updateInstructions(cfg.instructionsFile, skills);
  return { installed, config: cfg };
}
