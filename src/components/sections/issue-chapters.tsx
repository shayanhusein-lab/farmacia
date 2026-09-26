"use client";

import { useRef, type CSSProperties } from "react";
import { issue, palette } from "@/content/site";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Chip } from "@/components/brand/chip";
import { SplitHeading } from "@/components/motion/split-heading";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { SectionTag } from "./section-head";

const CARD =
  "relative flex min-h-[380px] w-[min(80vw,340px)] shrink-0 snap-start flex-col gap-3 rounded-3xl border-[2.5px] border-ink px-5 py-6 shadow-[5px_6px_0_var(--color-ink)] min-[901px]:min-h-[440px] min-[901px]:w-[clamp(280px,30vw,380px)] min-[901px]:gap-3.5 min-[901px]:px-[26px] min-[901px]:py-7 min-[901px]:shadow-[6px_8px_0_var(--color-ink)]";

/** Left/right inset that lines the track up with the `.wrap` content edge. */
const GUTTER = "var(--gutter)";

export function IssueChapters() {
  const section = useRef<HTMLElement>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        { desktop: "(min-width: 901px)", motion: MOTION_OK },
        (ctx) => {
          const { desktop, motion } = ctx.conditions as { desktop: boolean; motion: boolean };
          if (!desktop) return;
          const box = scroller.current!;
          const trackEl = track.current!;
          box.style.overflow = "hidden";
          const dist = () => Math.max(0, trackEl.scrollWidth - window.innerWidth);

          const tween = gsap.to(trackEl, {
            x: () => -dist(),
            ease: "none",
            scrollTrigger: {
              trigger: section.current,
              // Pin once the whole card row is on screen. If the section is taller than
              // the viewport (big heading + cards), align its bottom edge instead of its top.
              start: () =>
                section.current!.offsetHeight > window.innerHeight ? "bottom bottom" : "top top",
              end: () => `+=${dist()}`,
              pin: true,
              scrub: motion ? 1 : true,
              invalidateOnRefresh: true,
            },
          });

          if (motion) {
            gsap.utils.toArray<HTMLElement>(".chapter-num").forEach((n) => {
              gsap.from(n, {
                yPercent: 60,
                rotate: -12,
                ease: "back.out(2)",
                scrollTrigger: {
                  trigger: n.closest("article"),
                  containerAnimation: tween,
                  start: "left 85%",
                  toggleActions: "play none none reverse",
                },
              });
            });
          }

          return () => {
            box.style.overflow = "";
          };
        }
      );
    },
    { scope: section }
  );

  return (
    <section
      ref={section}
      id="issue"
      aria-labelledby="issue-title"
      className="mt-[clamp(72px,10vw,130px)] scroll-mt-0 overflow-clip border-y-[3px] border-ink bg-sun"
    >
      <div className="wrap mb-8 flex min-[901px]:mb-10 flex-wrap items-end justify-between gap-x-10 gap-y-5 pt-[clamp(72px,10vw,120px)]">
        <div>
          <SectionTag>{issue.tag}</SectionTag>
          <SplitHeading
            id="issue-title"
            text={issue.title}
            className="max-w-[14ch] text-[clamp(38px,5.6vw,76px)] font-extrabold"
          />
        </div>
        <div className="flex flex-wrap items-center gap-x-[22px] gap-y-2.5">
          <Chip color={palette.blue}>{issue.theme}</Chip>
          <span className="hand text-xl min-[901px]:text-2xl" aria-hidden="true">
            {issue.hint}
          </span>
        </div>
      </div>

      <div
        ref={scroller}
        tabIndex={0}
        role="region"
        aria-label="Issue 01 chapters"
        style={{ scrollPaddingInline: GUTTER }}
        className="snap-x snap-mandatory overflow-x-auto overscroll-x-contain pb-[clamp(56px,9vw,110px)] [scrollbar-width:thin] focus-visible:outline-offset-[-6px]"
      >
        <div
          ref={track}
          className="flex w-max gap-[18px] pt-3 pb-5 min-[901px]:gap-[26px]"
          style={{ paddingInline: GUTTER }}
        >
          <article className={cn(CARD, "justify-between bg-ink text-paper")}>
            <span className="eyebrow text-sun">{issue.intro.eyebrow}</span>
            <h3 className="text-[clamp(28px,3.4vw,44px)] font-extrabold">{issue.intro.title}</h3>
            <p className="text-[#D9D2C8]">{issue.intro.body}</p>
          </article>

          {issue.chapters.map((ch) => (
            <article
              key={ch.num}
              className={cn(CARD, "bg-white")}
              style={{ "--c": ch.color } as CSSProperties}
              aria-label={`Chapter ${ch.num}: ${ch.title}`}
            >
              <span aria-hidden="true" className="chapter-num inline-block self-start font-logo text-[64px] leading-[.9] min-[901px]:text-[84px] text-(--c)">
                {ch.num}
              </span>
              <h3 className="text-[26px] font-extrabold min-[901px]:text-[32px]">{ch.title}</h3>
              <p className="hand text-[22px] leading-[1.1] text-blue min-[901px]:text-2xl">{ch.quip}</p>
              <ul className="mt-auto flex flex-wrap gap-[7px]">
                {ch.topics.map((t) => (
                  <li key={t}>
                    <Badge variant="topic">{t}</Badge>
                  </li>
                ))}
              </ul>
            </article>
          ))}

          <article className={cn(CARD, "items-start justify-center bg-blue text-white")}>
            <span className="eyebrow text-sun">{issue.outro.eyebrow}</span>
            <h3 className="text-[clamp(28px,3.2vw,40px)] font-extrabold">{issue.outro.title}</h3>
            <a href={issue.outro.cta.href} className={buttonVariants({ variant: "paper", size: "pill" })}>
              {issue.outro.cta.label}
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}
