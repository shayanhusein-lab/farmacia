"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";

/**
 * Scroll-scrubbed tween on this wrapper, driven by the nearest `triggerSelector` ancestor
 * (falls back to the wrapper itself). Used for decorative spinning pieces and slides.
 */
export function Scrub({
  children,
  className,
  to,
  from,
  triggerSelector = "section, footer",
  start = "top bottom",
  end = "bottom top",
}: {
  children: ReactNode;
  className?: string;
  to?: gsap.TweenVars;
  from?: gsap.TweenVars;
  triggerSelector?: string;
  start?: string;
  end?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current!;
      const trigger = el.closest(triggerSelector) ?? el;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const scrollTrigger = { trigger, start, end, scrub: 1 };
        if (from) gsap.from(el, { ...from, ease: "none", scrollTrigger });
        else gsap.to(el, { ...to, ease: "none", scrollTrigger });
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className} aria-hidden="true">
      {children}
    </div>
  );
}
