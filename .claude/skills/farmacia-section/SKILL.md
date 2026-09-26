---
name: farmacia-section
description: Add, edit, reorder or restyle a FARMACIA landing-page section, its copy, or its data (chapters, team, audiences, quotes, journey stops). Use for any content or layout change on the FARMACIA site.
---

# FARMACIA section work

Read `.claude/PROTOCOL.md` first if you have not this session. Do not re-explore the repo.

## Change copy or data only
Edit `src/content/site.ts`, and nothing else. Every section reads from it.
- Team headshot: add `public/team/<slug>.jpg`. The slug is in `team.leads`, and `Polaroid` picks it up at build time.
- New chapter or lead or audience: append an object with the same shape. Colours come from `palette`.

## Add a new section
1. Add its copy block to `src/content/site.ts`.
2. Create `src/components/sections/<name>.tsx`:
   - Make it a server component unless it animates. Put animation in a small client child or use the motion wrappers.
   - Skeleton:
     ```tsx
     <section id="<anchor>" aria-labelledby="<name>-title" className="sec scroll-mt-20">
       <div className="wrap">
         <SectionHead tag={x.tag} title={x.title} titleId="<name>-title" aside={x.intro} />
         <PopIn className="grid gap-[22px] min-[561px]:grid-cols-2 min-[1001px]:grid-cols-3">
           {/* cards with className="pop tilt-card …" style={{"--tilt": "-2deg"}} */}
         </PopIn>
       </div>
     </section>
     ```
   - For a coloured band, add `border-y-[3px] border-ink bg-<token>`.
3. Import it in `src/app/page.tsx` at the right position. If it gets a nav anchor, add it to `nav.links` in site.ts.

## Styling checklist
- Cards: `border-[2.5px] border-ink rounded-card shadow-hard`. Tilt with `tilt-card` plus `--tilt`, never with `transform`.
- Buttons: `buttonVariants({ variant: "brand" | "paper", size: "pill" })`, wrapped in `<Magnetic>`.
- Chips: `<Chip color={palette.x}>`. Pills: `<Badge variant="topic">` with `--c`.
- Breakpoints: only `min-[Npx]:` variants. Never mix them with `sm:`/`md:`/`lg:` on the same property.
- `calc()` containing `+` or `-`: use inline `style`.
- Headings: one `h1` only (the hero). Section `h2`, card `h3`. Decorative SVGs get `aria-hidden`.
- New shadcn primitive: `pnpm dlx shadcn@latest add <name>`, then fix any `from "cn"` import to `@/lib/utils`. It is Base UI, so use `render` instead of `asChild`.

## Finish
Run the `farmacia-verify` skill. Update PROTOCOL.md §4 (the file map) if you added files.
