"use client";

import { useRef } from "react";
import { ArrowRightIcon } from "lucide-react";
import { hero, palette, site } from "@/content/site";
import { buttonVariants } from "@/components/ui/button";
import { LogoBlock } from "@/components/brand/logo-block";
import { MagazineCover } from "@/components/brand/magazine-cover";
import { PuzzlePiece } from "@/components/brand/puzzle-piece";
import { Scribble } from "@/components/brand/scribble";
import { StickyNote } from "@/components/brand/sticky-note";
import { Magnetic } from "@/components/motion/magnetic";
import { Draggable, gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { cn } from "@/lib/utils";

const PIECES = [
  { color: palette.sky, rotate: 0, pos: "left-[-4%] top-[6%]", from: { x: -240, y: -120, rotation: -180 } },
  { color: palette.lime, rotate: 90, pos: "right-[-6%] top-[-3%]", from: { x: 240, y: -160, rotation: 200 } },
  { color: palette.sun, rotate: -90, pos: "left-[2%] bottom-0", from: { x: -200, y: 180, rotation: 160 } },
  { color: palette.orange, rotate: 180, pos: "right-[-2%] bottom-[6%]", from: { x: 220, y: 200, rotation: -220 } },
];

const STICKY_POS = ["left-[-2%] bottom-[14%]", "right-0 top-[52%]"];
const STICKY_TILT = ["-rotate-8", "rotate-6"];

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  useGSAP(
    (_, contextSafe) => {
      const stageEl = stage.current!;

      // Drag toys work regardless of motion preference.
      const drags = [
        ...Draggable.create(".hero-drag", {
          type: "x,y",
          bounds: stageEl,
          zIndexBoost: true,
          onPress() {
            gsap.to(this.target, { scale: 1.06, duration: 0.2 });
          },
          onRelease() {
            gsap.to(this.target, { scale: 1, duration: 0.4, ease: "back.out(3)" });
          },
        }),
        ...Draggable.create(".hero-piece", {
          type: "rotation",
          onRelease() {
            gsap.to(this.target, {
              rotation: Math.round(this.rotation / 90) * 90,
              duration: 0.5,
              ease: "back.out(2)",
            });
          },
        }),
      ];

      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.from(".logo-block", { scale: 0.6, rotate: -8, duration: 0.8, ease: "back.out(2)" })
          .from(
            ".logo-letter",
            {
              yPercent: 120,
              rotate: (i: number) => (i % 2 ? 14 : -14),
              stagger: 0.06,
              duration: 0.7,
              ease: "back.out(3)",
            },
            "-=.5"
          )
          .from(".hero-reveal", { y: 26, opacity: 0, stagger: 0.1, duration: 0.7 }, "-=.5")
          .fromTo(
            ".hero-scribble",
            { strokeDasharray: 1, strokeDashoffset: 1 },
            { strokeDashoffset: 0, duration: 0.9, ease: "power2.inOut" },
            "-=.4"
          );

        gsap.utils.toArray<HTMLElement>(".hero-piece").forEach((p, i) => {
          tl.from(p, { ...PIECES[i].from, duration: 1, ease: "back.out(1.4)" }, 0.2 + i * 0.1);
        });

        tl.from(".hero-cover", { y: 120, rotation: 12, scale: 0.8, opacity: 0, duration: 1.1, ease: "back.out(1.6)" }, 0.6)
          .fromTo(
            ".cover-brush",
            { strokeDasharray: 1, strokeDashoffset: 1 },
            { strokeDashoffset: 0, stagger: 0.12, duration: 0.8, ease: "power2.out" },
            1.1
          )
          .from(".hero-sticky", { scale: 0, rotation: 40, stagger: 0.15, duration: 0.6, ease: "back.out(3)" }, 1.3)
          .from(".hero-hint", { opacity: 0, y: 10, duration: 0.5 }, 1.8);

        // Idle float on the inner svg so it never fights drag rotation or parallax.
        gsap.utils.toArray<HTMLElement>(".hero-piece-float").forEach((p, i) => {
          gsap.to(p, {
            y: `+=${8 + i * 3}`,
            duration: 2.4 + i * 0.4,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
            delay: 2,
          });
        });
      });

      mm.add(`${MOTION_OK} and (hover: hover)`, () => {
        if (!contextSafe) return;
        const move = contextSafe((e: PointerEvent) => {
          const r = stageEl.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width - 0.5;
          const y = (e.clientY - r.top) / r.height - 0.5;
          gsap.to(".hero-parallax", { x: (i: number) => x * (14 + i * 8), duration: 0.8, overwrite: "auto" });
          gsap.to(".hero-cover-tilt", {
            rotationY: x * 14,
            rotationX: -y * 10,
            transformPerspective: 800,
            duration: 0.8,
          });
        });
        stageEl.addEventListener("pointermove", move);
        return () => stageEl.removeEventListener("pointermove", move);
      });

      return () => drags.forEach((d) => d.kill());
    },
    { scope: root }
  );

  return (
    <section ref={root} aria-labelledby="hero-title" className="relative pt-[clamp(16px,2.5vw,36px)] pb-[clamp(40px,5vw,72px)]">
      <div className="wrap grid items-center gap-[clamp(24px,4vw,56px)] min-[961px]:grid-cols-[1.05fr_.95fr]">
        <div className="@container min-w-0">
          <p className="hero-reveal eyebrow flex flex-wrap items-center gap-x-3.5 gap-y-2 text-orange">
            <span aria-hidden="true" className="size-2 rounded-full bg-lime shadow-[0_0_0_2px_var(--color-ink)]" />
            {site.faculty}
            <span>{site.university}</span>
          </p>

          <LogoBlock className="mt-[22px] mb-[26px]" />

          <h1
            id="hero-title"
            className="hero-reveal max-w-[15ch] text-[clamp(34px,4.6vw,62px)] font-extrabold"
          >
            {hero.titleLead}
            <span className="relative whitespace-nowrap">
              {hero.titleHighlight}
              <Scribble
                className="-bottom-[.12em] -left-[4%] h-[.42em] w-[108%]"
                pathClassName="hero-scribble"
              />
            </span>
          </h1>

          <p className="hero-reveal mt-5 max-w-[46ch] text-[clamp(17px,1.6vw,19px)] text-ink-soft">
            {hero.lede}
          </p>

          <div className="hero-reveal mt-[30px] flex flex-wrap gap-3.5">
            <Magnetic>
              <a href={hero.primaryCta.href} className={buttonVariants({ variant: "brand", size: "pill" })}>
                {hero.primaryCta.label}
                <ArrowRightIcon strokeWidth={2.6} aria-hidden="true" />
              </a>
            </Magnetic>
            <Magnetic>
              <a href={hero.secondaryCta.href} className={buttonVariants({ variant: "paper", size: "pill" })}>
                {hero.secondaryCta.label}
              </a>
            </Magnetic>
          </div>
        </div>

        <div
          ref={stage}
          className="relative aspect-[1/1.02] w-full max-w-[min(620px,100%,72svh)] justify-self-center [perspective:800px]"
        >
          {PIECES.map((p, i) => (
            <div key={i} className={cn("hero-parallax absolute w-[44%]", p.pos)}>
              <div className="hero-piece cursor-grab touch-none active:cursor-grabbing">
                <PuzzlePiece
                  color={p.color}
                  rotate={p.rotate}
                  className="hero-piece-float block drop-shadow-[0_6px_0_rgb(35_31_28/.18)]"
                />
              </div>
            </div>
          ))}

          <div className="hero-drag absolute top-[8%] left-[18%] w-[62%]">
            <div className="hero-cover">
              <div className="hero-cover-tilt">
                <MagazineCover className="relative! w-full -rotate-5" />
              </div>
            </div>
          </div>

          {hero.stickies.map((s, i) => (
            <div key={s.text} className={cn("hero-drag absolute", STICKY_POS[i])}>
              <div className="hero-sticky">
                <StickyNote color={s.color} className={STICKY_TILT[i]}>
                  {s.text}
                </StickyNote>
              </div>
            </div>
          ))}

          <span
            aria-hidden="true"
            className="hero-hint hand absolute right-[4%] -bottom-[6%] flex -rotate-4 items-center gap-1.5 text-lg text-ink-soft"
          >
            <svg width="26" height="18" viewBox="0 0 26 18" className="-scale-y-100" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M24 3 C 16 2, 8 6, 4 14 M4 14 l-1-6 M4 14 l6-2" />
            </svg>
            {hero.dragHint}
          </span>
        </div>
      </div>
    </section>
  );
}
