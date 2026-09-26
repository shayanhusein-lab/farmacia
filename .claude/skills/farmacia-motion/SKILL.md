---
name: farmacia-motion
description: Add or change GSAP animations and interactions on the FARMACIA site (scroll reveals, pinning, scrub, draggable, magnetic hover, counters, reduced-motion handling). Use whenever motion is involved.
---

# FARMACIA motion (GSAP 3.15 + @gsap/react)

Read `.claude/PROTOCOL.md` §7 first if you have not this session.

## Try a reusable wrapper first
| Need | Use |
|---|---|
| Cards pop in on scroll | Put `className="pop"` on the children of `<PopIn>` |
| Heading words rise | `<SplitHeading text=… as="h2" id=…>` |
| Scroll-scrubbed rotate/slide | `<Scrub to={{rotation: 90}}>` or `<Scrub from={{xPercent: 20}} triggerSelector="footer">` |
| Magnetic hover | `<Magnetic>` around a button or link |

## Custom animation template
```tsx
"use client";
import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";

export function Thing() {
  const ref = useRef<HTMLElement>(null);
  useGSAP((_, contextSafe) => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      gsap.from(".thing-item", { y: 40, stagger: 0.08, ease: "back.out(1.8)",
        scrollTrigger: { trigger: ref.current, start: "top 85%" } });
      // listeners: const fn = contextSafe!((e: Event) => …); add, then return a cleanup that removes it
    });
  }, { scope: ref });
  return <section ref={ref}>…</section>;
}
```

## Rules
- Content must be visible with no JS: use `from`/`fromTo` only. Never pre-hide with CSS `opacity:0`.
- Reduced motion: everything except dragging sits inside `mm.add(MOTION_OK, …)`.
- Give each element a single transform owner. If two tweens need different transforms (drag + tilt + intro), nest wrappers (see the hero: `.hero-drag › .hero-cover › .hero-cover-tilt`).
- CSS tilt lives on the `rotate` property (`tilt-card`), so GSAP transforms combine with it safely. Use `clearProps: "transform"` after entrance tweens on tilted cards.
- SVG strokes: `pathLength={1}`, then `fromTo({strokeDasharray:1, strokeDashoffset:1}, {strokeDashoffset:0})`.
- Pinning: `invalidateOnRefresh: true` and function-based `end`. Make sure the pinned content fits the viewport (see the chapters `start` function). Desktop-only pins go in `mm.add({desktop: "(min-width: 901px)", motion: MOTION_OK}, ctx => …)`.
- `containerAnimation` triggers use horizontal start values (`"left 85%"`).
- React Compiler lint: don't read refs inside callbacks created during render (e.g. a closure passed to `handleSubmit`). Move the work to `useEffect` keyed on state.

## Verify
Run `farmacia-verify`. For motion, also check reduced motion (the probe forces it) and that content is present before scrolling.
