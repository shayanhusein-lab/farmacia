@AGENTS.md

# FARMACIA — Claude instructions

## "Follow protocol" trigger
When the user says **"follow protocol"** in any capitalization (Follow Protocol, FOLLOW PROTOCOL, …):
1. Read `.claude/PROTOCOL.md` first. It is the full project brief: stack, file map, tokens,
   conventions, animation rules and gotchas.
2. Do **not** re-explore the codebase (no broad `ls`/`grep`/`Explore` sweeps). Open only the files
   you are about to edit, using the file map in the protocol.
3. Use the matching project skill:
   - `farmacia-section` to add or change a section, content or copy
   - `farmacia-motion` to add or change a GSAP animation or interaction
   - `farmacia-verify` to build, lint and check visually before finishing
4. If your change alters structure, conventions or gotchas, update `.claude/PROTOCOL.md` in the same task.

## Always
- Package manager is **pnpm**.
- Finish every code task with `pnpm lint` and `pnpm build` passing.
- Copy lives in `src/content/site.ts`, never in JSX.
- Light theme only, no dark mode.
