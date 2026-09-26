"use client";

import { useRef, type ElementType } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type Props = {
  text: string;
  as?: ElementType;
  className?: string;
  id?: string;
};

/**
 * Heading split into words. Each word rises out of an overflow mask on scroll.
 * Text is fully visible without JS; screen readers get the full string.
 */
export function SplitHeading({ text, as: Tag = "h2", className, id }: Props) {
  const ref = useRef<HTMLHeadingElement>(null);
  const words = text.trim().split(/\s+/);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(".split-w", {
          yPercent: 110,
          rotate: 6,
          stagger: 0.05,
          duration: 0.7,
          ease: "back.out(2)",
          scrollTrigger: { trigger: ref.current, start: "top 85%" },
        });
      });
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref} id={id} className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} aria-hidden="true">
          <span className="inline-block overflow-hidden pb-[0.08em] align-top">
            <span className={cn("split-w inline-block")}>{w}</span>
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  );
}
