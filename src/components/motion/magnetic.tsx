"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/** Wraps a button/link; the child follows the pointer and springs back on leave. */
export function Magnetic({
  children,
  className,
  strength = { x: 0.25, y: 0.35 },
}: {
  children: ReactNode;
  className?: string;
  strength?: { x: number; y: number };
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    (_, contextSafe) => {
      const el = ref.current;
      if (!el || !contextSafe) return;
      const mm = gsap.matchMedia();
      mm.add(`${MOTION_OK} and (hover: hover)`, () => {
        const move = contextSafe((e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          gsap.to(el, {
            x: (e.clientX - r.left - r.width / 2) * strength.x,
            y: (e.clientY - r.top - r.height / 2) * strength.y,
            duration: 0.3,
          });
        });
        const leave = contextSafe(() => {
          gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1,.4)" });
        });
        el.addEventListener("pointermove", move);
        el.addEventListener("pointerleave", leave);
        return () => {
          el.removeEventListener("pointermove", move);
          el.removeEventListener("pointerleave", leave);
        };
      });
    },
    { scope: ref }
  );

  return (
    <span ref={ref} className={cn("inline-flex will-change-transform", className)}>
      {children}
    </span>
  );
}
