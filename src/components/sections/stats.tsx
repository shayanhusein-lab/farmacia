"use client";

import { useRef } from "react";
import { stats } from "@/content/site";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "@/lib/gsap";
import { cn } from "@/lib/utils";

export function Stats() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
          const end = Number(el.dataset.count);
          const o = { v: 0 };
          ScrollTrigger.create({
            trigger: el,
            start: "top 90%",
            once: true,
            onEnter: () => {
              el.textContent = "0";
              gsap.to(o, {
                v: end,
                duration: 1.4,
                ease: "power2.out",
                onUpdate: () => {
                  el.textContent = String(Math.round(o.v));
                },
              });
            },
          });
        });
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} aria-label="FARMACIA in numbers" className="sec pb-0!">
      <div className="wrap">
        <dl className="grid grid-cols-2 overflow-hidden rounded-[22px] border-[2.5px] border-ink bg-white shadow-hard-md min-[761px]:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={cn(
                "flex flex-col-reverse gap-1.5 border-ink p-[clamp(20px,3vw,34px)]",
                i < 3 && "min-[761px]:border-r-[2.5px]",
                i % 2 === 0 && "max-[760px]:border-r-[2.5px]",
                i < 2 && "max-[760px]:border-b-[2.5px]"
              )}
            >
              <dt className="text-[15px] text-ink-soft">{s.label}</dt>
              <dd className={cn("font-logo text-[clamp(44px,6vw,78px)] leading-none tabular-nums", s.color)}>
                <span data-count={s.value}>{s.value}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
