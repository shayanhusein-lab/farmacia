"use client";

import { useRef, type CSSProperties } from "react";
import { journey } from "@/content/site";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";

const DESKTOP = "(min-width: 901px)";

export function ReaderJourney() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add({ desktop: DESKTOP, motion: MOTION_OK }, (ctx) => {
        const { desktop, motion } = ctx.conditions as { desktop: boolean; motion: boolean };
        if (!motion) return;
        // Horizontal line fills left→right on desktop, vertical line top→bottom on mobile.
        gsap.from(".journey-fill", {
          ...(desktop ? { scaleX: 0 } : { scaleY: 0 }),
          ease: "none",
          scrollTrigger: {
            trigger: ".journey-path",
            start: desktop ? "top 80%" : "top 75%",
            end: desktop ? "bottom 45%" : "bottom 60%",
            scrub: 1,
          },
        });
        gsap.from(".journey-dot", {
          scale: 0,
          stagger: 0.1,
          ease: "back.out(3)",
          duration: 0.6,
          scrollTrigger: { trigger: ".journey-path", start: "top 80%" },
        });
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} aria-labelledby="journey-title" className="sec pt-0!">
      <div className="wrap">
        <div className="relative overflow-hidden rounded-[clamp(26px,4vw,44px)] bg-ink px-[clamp(22px,4vw,56px)] py-[clamp(36px,6vw,70px)] text-paper">
          <span className="eyebrow text-sun">{journey.eyebrow}</span>
          <h2 id="journey-title" className="mt-3.5 max-w-[16ch] text-[clamp(34px,4.8vw,62px)] font-extrabold">
            {journey.title}
          </h2>
          <p className="mt-4 max-w-[52ch] text-[#CFC7BC]">{journey.sub}</p>

          <div className="journey-path relative mt-[clamp(32px,5vw,60px)] min-[901px]:overflow-x-auto min-[901px]:pb-2.5">
            <div className="relative min-[901px]:min-w-[880px]">
              {/* Mobile: vertical rail through the dot centres. Desktop: horizontal rail. */}
              <div
                aria-hidden="true"
                className="absolute top-7 bottom-7 left-[25px] w-1.5 rounded-md bg-paper/15 min-[901px]:top-[31px] min-[901px]:right-[5%] min-[901px]:bottom-auto min-[901px]:left-[5%] min-[901px]:h-1.5 min-[901px]:w-auto"
              >
                <div className="journey-fill absolute inset-0 origin-top rounded-md bg-[linear-gradient(180deg,var(--color-sun),var(--color-orange),var(--color-pink),var(--color-sky),var(--color-lime))] min-[901px]:origin-left min-[901px]:bg-[linear-gradient(90deg,var(--color-sun),var(--color-orange),var(--color-pink),var(--color-sky),var(--color-lime))]" />
              </div>
              <ol className="relative grid gap-5 min-[901px]:grid-cols-7 min-[901px]:gap-2">
                {journey.stops.map((s, i) => (
                  <li
                    key={s.label}
                    className="relative flex items-center gap-4 min-[901px]:flex-col min-[901px]:gap-3 min-[901px]:text-center"
                    style={{ "--c": s.color } as CSSProperties}
                  >
                    <span
                      aria-hidden="true"
                      className="journey-dot relative z-[1] grid size-14 shrink-0 place-items-center rounded-full border-[3px] border-paper bg-(--c) font-logo text-lg text-ink min-[901px]:size-[68px] min-[901px]:text-xl"
                    >
                      {i + 1}
                    </span>
                    <span className="flex flex-col gap-1 min-[901px]:items-center min-[901px]:gap-3">
                      <b className="font-display text-[15px] tracking-[0.06em] uppercase">{s.label}</b>
                      <span className="text-sm leading-[1.35] text-[#BDB4A8] min-[901px]:max-w-[16ch] min-[901px]:text-[13px]">
                        {s.detail}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
