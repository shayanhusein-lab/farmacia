---
name: farmacia-verify
description: Verify FARMACIA changes — lint, production build, and headless-Chrome visual/layout checks (screenshots, horizontal overflow at 360px, element measurements). Use before declaring any FARMACIA task done.
---

# Verify FARMACIA changes

1. `pnpm lint` must report 0 errors.
2. `pnpm build` must pass.
3. Serve the production build on a fresh port. Do NOT use `pkill -f next`, because it kills the Bash tool's shell:
   ```bash
   (setsid pnpm start -p 31NN > /dev/null 2>&1 &); sleep 4
   ```
4. Probe with `.claude/skills/farmacia-verify/probe.mjs`. It drives Chrome over CDP with reduced motion forced, so the screenshot shows the settled layout.
   ```bash
   PORT=31NN node .claude/skills/farmacia-verify/probe.mjs <viewportWidth> '<js expr or async IIFE>'
   PORT=31NN SHOT=/path/out.png node .claude/skills/farmacia-verify/probe.mjs 1440 '1'            # viewport screenshot
   PORT=31NN SHOT=/path/out.png FULL=1 node .claude/skills/farmacia-verify/probe.mjs 390 '1'      # full page
   ```
   Put screenshots in the session scratchpad, not in the repo. Read the PNG to inspect it. For full-page shots, slice them with PIL first because tall images get downscaled.
5. Standard checks:
   - No horizontal scroll: `(()=>{scrollTo(300,0);return scrollX})()` returns 0 at 360 and 1440.
   - Pinned chapters fit the viewport: scroll into `#issue` and check that article bottoms are below `innerHeight`.
   - The hero logo block's right edge sits inside its column.
6. Report what you verified, and state anything you could not check (for example, live animation timing).
