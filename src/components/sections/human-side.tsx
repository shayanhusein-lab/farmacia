"use client";

import { useRef, type CSSProperties } from "react";
import { humanSide } from "@/content/site";
import { Scribble } from "@/components/brand/scribble";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { SectionTag } from "./section-head";

const DROP_ROTATIONS = [-25, 20, -15, 25, -10];

export function HumanSide() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    (_, contextSafe) => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          ".human-strike",
          { strokeDasharray: 1, strokeDashoffset: 1 },
          {
            strokeDashoffset: 0,
            duration: 0.8,
            ease: "power2.inOut",
            scrollTrigger: { trigger: ".human-not-this", start: "top 75%" },
          }
        );
        gsap.from(".human-note", {
          y: -120,
          rotation: (i: number) => DROP_ROTATIONS[i] ?? 0,
          opacity: 0,
          stagger: 0.18,
          duration: 0.9,
          ease: "bounce.out",
          clearProps: "transform,opacity",
          scrollTrigger: { trigger: ".human-board", start: "top 75%" },
        });

        if (!contextSafe) return;
        const notes = gsap.utils.toArray<HTMLElement>(".human-note");
        const wobble = contextSafe((e: Event) => {
          gsap.fromTo(
            e.currentTarget as HTMLElement,
            { rotation: -6 },
            { rotation: 0, duration: 0.6, ease: "elastic.out(1.2,.3)", clearProps: "transform" }
          );
        });
        notes.forEach((n) => n.addEventListener("click", wobble));
        return () => notes.forEach((n) => n.removeEventListener("click", wobble));
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} id="human" aria-labelledby="human-title" className="sec scroll-mt-20">
      <div className="wrap grid items-start gap-[clamp(30px,5vw,80px)] min-[901px]:grid-cols-[.85fr_1.15fr]">
        <div className="min-[901px]:sticky min-[901px]:top-[120px]">
          <SectionTag>{humanSide.tag}</SectionTag>
          <h2
            id="human-title"
            className="text-[clamp(52px,7.5vw,104px)] leading-[.9] font-extrabold tracking-[-0.04em] text-blue"
          >
            {humanSide.title}
          </h2>
          <p className="mt-[26px] max-w-[34ch] text-[19px] text-ink-soft">{humanSide.lead}</p>
          <span className="human-not-this relative mt-[18px] inline-block font-display text-[clamp(28px,3.4vw,42px)] font-bold text-ink-soft italic">
            <del className="[text-decoration:none]">{humanSide.notThis}</del>
            <Scribble variant="strike" className="top-[40%] -left-[6%] h-[30px] w-[112%]" pathClassName="human-strike" />
          </span>
          <p className="mt-[22px] max-w-[34ch] text-[19px] text-ink-soft">{humanSide.closing}</p>
        </div>

        <ul
          aria-label="What we want readers to say"
          className="human-board corkboard relative grid gap-[22px] rounded-panel border-[2.5px] border-ink p-[clamp(18px,3vw,34px)] min-[561px]:grid-cols-2"
        >
          {humanSide.quotes.map((q) => (
            <li
              key={q.quote}
              className={cn(
                "human-note pin tilt-card hand relative cursor-pointer px-5 pt-[22px] pb-[26px] text-[clamp(26px,2.8vw,34px)] leading-[1.05] shadow-[0_12px_20px_-10px_rgb(35_31_28/.55)]",
                q.wide && "pt-[30px] text-center text-[clamp(30px,3.4vw,42px)] min-[561px]:col-span-2"
              )}
              style={{ background: q.bg, "--tilt": `${q.tilt}deg`, "--pin": q.pin } as CSSProperties}
            >
              {q.quote}
              {q.detail ? (
                <small className="mt-3 block font-sans text-[13px] leading-[1.4] opacity-80">{q.detail}</small>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
