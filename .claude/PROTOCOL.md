# FARMACIA — Project Protocol

> Read this INSTEAD of re-exploring the repo. It is the source of truth for how the
> project is built. Only open a source file when you are about to edit it.
> Keep this file current: when you change structure, conventions or gotchas, update it
> in the same task.

## 1. What this is
Landing page for **FARMACIA**, the digital pharmacy magazine of the Faculty of Pharmacy &
Pharmaceutical Sciences, University of Karachi. One page (`/`), static, light-only theme.
The original design reference is `farmacia-design.html` (supplied by the user as a chat
attachment, not in the repo). The current code already matches it; treat the code as the reference now.

## 2. Stack (exact versions matter)
| Thing | Version / note |
|---|---|
| Next.js | **16.3** App Router, Turbopack, `src/` dir. Docs: `node_modules/next/dist/docs/` — read before using an unfamiliar API. Request APIs are async-only. |
| React | 19.2 (React Compiler lint rules on: no ref reads during render, even in closures passed to `handleSubmit`) |
| Tailwind | **v4**, CSS-first (`@theme` in `src/app/globals.css`, no tailwind.config) |
| shadcn/ui | style **`base-nova`** → built on **Base UI** (`@base-ui/react`), NOT Radix. Use `render={<Button/>}` instead of `asChild`. `Select` uses `onValueChange`. |
| GSAP | 3.15 + `@gsap/react` (`useGSAP`). Plugins: ScrollTrigger, Draggable (free, from `gsap/*`). |
| Forms | react-hook-form + zod 4 + @hookform/resolvers |
| Icons | lucide-react |
| Toasts | sonner (forced `theme="light"`, no next-themes) |
| Package manager | **pnpm** (`pnpm add`, `pnpm dlx shadcn@latest add <x>`) |

## 3. Commands
- `pnpm dev` — dev server (3000)
- `pnpm lint` — must be 0 errors
- `pnpm build` — must pass before finishing any task
- Visual check: see skill `farmacia-verify`

## 4. File map
```
src/app/layout.tsx          fonts (next/font, 5 families → CSS vars), metadata/OG, <Toaster/>
src/app/page.tsx            composes sections in order
src/app/globals.css         @theme tokens, shadcn var mapping, utilities, component classes
src/app/actions/pitch.ts    server action stub (TODO: persist pitch)
src/app/icon.png, apple-icon.png, favicon.ico, opengraph-image.png   ← generated from logo
src/content/site.ts         ALL copy + data (palette, nav, hero, chapters, team, …)
src/lib/gsap.ts             registers plugins once; exports gsap, ScrollTrigger, Draggable, useGSAP, MOTION_OK, REDUCED_MOTION
src/lib/utils.ts            cn() = clsx + tailwind-merge
src/lib/pitch-schema.ts     zod schema shared by form + action
src/components/ui/          shadcn (restyled via variants — see §6)
src/components/brand/       puzzle-piece, logo-block, magazine-cover, sticky-note, polaroid, scribble, chip
src/components/motion/      split-heading, magnetic, pop-in, scrub
src/components/sections/    site-header, hero, marquee, what-is, mission-vision, stats, issue-chapters,
                            human-side, reader-journey, audience, team, contribute (+ pitch-form),
                            site-footer, section-head (SectionHead + SectionTag)
public/brand/               farmacia-wordmark.png (1200×399), farmacia-emblem.png (480×404) — transparent
public/team/<slug>.jpg      optional headshots; Polaroid falls back to initials if missing
```
Section order: Header → Hero → Marquee → WhatIs(#about) → MissionVision → Stats →
IssueChapters(#issue) → HumanSide(#human) → ReaderJourney → Audience → Team(#team) →
Contribute(#contribute) → Footer.

## 5. Design tokens (Tailwind names)
Colors: `blue #0047AB`, `blue-deep #062E78`, `orange #E94E26` (primary CTA), `sun #FFC64E`,
`sky #86C9F2`, `lime #A3E44E`, `lime-deep #5FA81E`, `pink #E26A78`, `pink-soft #F9B6C0`,
`peach #F6B79B`, `sand #EBD39E`, `cork #C9A77A`, `cork-dark #B08A5C`, `paper #FFFDF7` (bg),
`ink #231F1C` (text/borders/shadows), `ink-soft #5B524B`.
Fonts: `font-logo` Bungee · `font-display` Bricolage Grotesque (h1–h3 default) · `font-sans` DM Sans ·
`font-hand` / `.hand` Caveat Brush · `font-serif` Bodoni Moda (cover title only).
Shadows (hard, no blur): `shadow-hard-sm | hard | hard-md | hard-lg`, `shadow-paper` (soft, paper objects only).
Radii: `rounded-card` 18px, `rounded-panel` 26px. Ease: `--ease-spring`.
Custom utilities: `wrap` (full width, fluid gutter `--gutter` = clamp(16px,4vw,64px); no max-width), `eyebrow`, `hand`, `sec` (section padding), `text-outline`.
Component classes: `tape`, `tape-sun`, `pin` (color via `--pin`), `corkboard`, `dot-texture`,
`chapter-num`, `btn-hard`, `tilt-card` (tilt via `--tilt`).
Brand logo: wordmark in header, emblem in footer badge + favicon/icons. No dark mode, ever.

## 6. Conventions (follow exactly)
1. **Copy lives in `src/content/site.ts`.** Never inline copy in JSX.
2. Server components by default; `"use client"` only for animation/interaction.
3. **Buttons**: shadcn `Button` / `buttonVariants` with `variant="brand"` (orange) or `"paper"` (white),
   `size="pill" | "pill-sm"`. Links styled as buttons use `<a className={buttonVariants(...)}>`.
   Wrap in `<Magnetic>` for magnetic hover.
4. **Chips**: `<Chip color=…>` (Badge `variant="chip"`, dot via `--c`). Topic pills: Badge `variant="topic"`.
5. **Tilted cards**: add `tilt-card` + `style={{"--tilt": "-2deg"}}`. Tilt uses the CSS `rotate`
   property so GSAP (which owns `transform`) never clobbers it. Never put tilt in `transform`.
6. **Breakpoints**: use arbitrary px variants (`min-[561px]:`, `min-[901px]:`, `min-[1001px]:`).
   **Never mix** `sm:/md:/lg:` (rem) with `min-[Npx]:` on the same property — Tailwind v4 mis-orders them.
   Design breakpoints: 440, 560, 720, 760, 900, 960, 1000.
7. Arbitrary values containing `calc()` with `+`/`-`: use inline `style` (spaces get lost).
8. Section headings: `<SectionHead tag title titleId aside>` or `<SplitHeading>`; each section has
   `aria-labelledby`. Exactly one `h1` (hero). Decorative SVGs `aria-hidden`.
9. Headshots: drop `public/team/<slug>.jpg` — slug is in `site.ts` team.leads.

## 7. Animation rules (GSAP)
- Always `useGSAP(fn, { scope: ref })`; register nothing locally (import from `@/lib/gsap`).
- Wrap entrance/scroll/idle motion in `gsap.matchMedia().add(MOTION_OK, …)` → reduced motion = static.
- Content must be visible without JS: use `gsap.from()` / `fromTo()` only — never CSS `opacity:0`.
- SVG line draws: path has `pathLength={1}`; animate `fromTo({strokeDasharray:1, strokeDashoffset:1}, {strokeDashoffset:0})`.
- Event listeners inside useGSAP: wrap with `contextSafe`, remove in the returned cleanup.
- Draggables (hero) are created outside matchMedia (always on) and killed in cleanup.
- Hero nesting: `.hero-drag` (Draggable x/y) › `.hero-cover` (intro) › `.hero-cover-tilt` (pointer 3D) — one transform owner per element.
- Pinned chapters (≥901px): `start` = `"bottom bottom"` when section taller than viewport, else `"top top"` —
  so the whole card row is visible while pinned. ≤900px: native scroll-snap swipe with
  `scrollPaddingInline: GUTTER` (else snap-start eats the gutter); section is `overflow-clip`
  (never `overflow-hidden` on full-bleed sections: hidden = scrollable = can get nudged sideways).
- Reader journey: horizontal 7-col rail ≥901px, vertical timeline below (fill anim scaleX vs scaleY via matchMedia conditions).
- Footer giant wordmark: `text-[min(250px,17cqi)]` inside an `@container` wrap (Bungee "FARMACIA" ≈ 5.6em wide). Same trick for the hero logo block (`13cqi`).
- Reusable: `<PopIn>` (batch reveal of `.pop` children), `<Scrub to|from>` (scroll-scrubbed tween),
  `<Magnetic>`, `<SplitHeading>`.

## 8. Known gotchas
- shadcn CLI may generate `import { cn } from "cn"` and add `cn`/`next-themes` deps → replace with
  `@/lib/utils`, remove those deps, and make sonner light-only.
- Don't `pkill -f next` from the Bash tool — it kills the tool's own shell. Start servers on a new port with `setsid`.
- Headless Chrome window min width ≈ 485px; use the probe's device-metrics emulation for 360px checks.
- Hero stage is capped at `max-w-[min(620px,100%,72svh)]` so the full hero fits the first screen on wide
  monitors (full-width layout would otherwise make it tall and push the text down).
- Shell is **zsh**: unquoted `$var` is NOT word-split (`set -- $dim` gives one arg). Pass probe args explicitly.
- Probe uses a random debug port and throwaway `--user-data-dir`; set viewport height with `H=930`.
- `html` and `body` both have `overflow-x: clip` (marquee is 104% wide, hero pieces overhang).

## 9. Open TODOs
- `src/app/actions/pitch.ts`: persist pitches (DB / sheet / email).
- Real headshots in `public/team/`.
- Set `NEXT_PUBLIC_SITE_URL` in production for absolute OG URLs.
