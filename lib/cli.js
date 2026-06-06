const VALID_MODES = ['symlink', 'copy'];

export function parseArgs(argv) {
  const opts = { command: argv[0], agent: null, mode: 'symlink', skills: null };
  for (let i = 1; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--agent') opts.agent = argv[++i];
    else if (a === '--mode') opts.mode = argv[++i];
    else if (a === '--skills') opts.skills = argv[++i].split(',').map((s) => s.trim());
    else if (a === '--list') opts.command = 'list';
  }
  if (!VALID_MODES.includes(opts.mode)) {
    throw new Error(`Invalid --mode "${opts.mode}". Use one of: ${VALID_MODES.join(', ')}`);
  }
  return opts;
}

export function selectSkills(registry, names) {
  if (!names) return registry.skills;
  const byName = new Map(registry.skills.map((s) => [s.name, s]));
  return names.map((n) => {
    const s = byName.get(n);
    if (!s) throw new Error(`Unknown skill: ${n}`);
    return s;
  });
}
