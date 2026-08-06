# Template

Copy `CLAUDE.md`, `ROADMAP.md` and `.claude/` into the root of a new project.
Replace every `<placeholder>` with the real module, command and notation names,
then delete the `<!-- why -->` comments once the block has earned its place.

`.claude/settings.json` registers the roadmap hook. It matches `Edit|Write|MultiEdit`
because those are the three tools that can rewrite a file, and it runs
`node .claude/hooks/protect-roadmap.mjs` by relative path, so the hook travels
with the repository instead of with the machine. It lives in a hook and not in
CLAUDE.md because an instruction is a request and this rule had already been
broken twice.

Then delete everything this project's friction has not yet justified. That
deletion is the method.
