"use client";

import { useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "@/lib/gsap";

/**
 * Batch-reveals every `.pop` descendant as it scrolls into view.
 * Cards stay fully visible if the trigger never fires.
 */
export function PopIn({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const triggers = ScrollTrigger.batch(ref.current!.querySelectorAll(".pop"), {
          start: "top 90%",
          once: true,
          onEnter: (els) => {
            gsap.from(els, {
              y: 60,
              scale: 0.9,
              rotation: (i: number) => (i % 2 ? 8 : -8),
              stagger: 0.08,
              duration: 0.8,
              ease: "back.out(1.8)",
              clearProps: "transform,translate,rotate,scale",
            });
          },
        });
        return () => triggers.forEach((t) => t.kill());
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
