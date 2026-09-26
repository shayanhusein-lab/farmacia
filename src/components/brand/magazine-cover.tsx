import { forwardRef } from "react";
import { hero, site } from "@/content/site";
import { cn } from "@/lib/utils";

/** Issue 01 cover built in SVG + CSS. Brush strokes carry `.cover-brush` for GSAP. */
export const MagazineCover = forwardRef<HTMLDivElement, { className?: string }>(
  function MagazineCover({ className }, ref) {
    return (
      <div
        ref={ref}
        role="img"
        aria-label={hero.cover.ariaLabel}
        className={cn(
          "absolute aspect-[210/297] cursor-grab touch-none overflow-hidden rounded-md bg-white select-none active:cursor-grabbing",
          "shadow-[0_30px_60px_-20px_rgb(35_31_28/.45),0_0_0_1.5px_rgb(35_31_28/.12)]",
          className
        )}
      >
        <svg
          className="absolute inset-0 size-full"
          viewBox="0 0 210 297"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path className="cover-brush" pathLength={1} d="M-10 48 C 40 30, 90 70, 150 52" stroke="#F26A21" strokeWidth="30" fill="none" strokeLinecap="round" opacity=".95" />
          <path className="cover-brush" pathLength={1} d="M-6 88 C 50 70, 110 110, 160 96" stroke="#F58A3C" strokeWidth="22" fill="none" strokeLinecap="round" opacity=".9" />
          <path className="cover-brush" pathLength={1} d="M4 128 C 50 112, 100 150, 140 140" stroke="#F26A21" strokeWidth="16" fill="none" strokeLinecap="round" opacity=".85" />
          <g fill="#231F1C" opacity=".55">
            <circle cx="120" cy="176" r="1.4" />
            <circle cx="126" cy="186" r="1" />
            <circle cx="116" cy="192" r="1.2" />
            <circle cx="124" cy="200" r="1.6" />
            <circle cx="118" cy="208" r=".9" />
            <circle cx="128" cy="214" r="1.3" />
            <circle cx="121" cy="222" r="1" />
            <circle cx="114" cy="182" r=".8" />
          </g>
        </svg>
        <span aria-hidden="true" className="absolute top-[6%] left-[9%] text-[clamp(10px,1.3vw,14px)] font-bold tracking-[0.06em] text-orange">
          {hero.cover.issue}
        </span>
        <span aria-hidden="true" className="absolute top-[4%] right-[4%] font-serif text-[clamp(34px,6.2vw,76px)] leading-[0.9] font-medium tracking-[0.02em] text-ink [writing-mode:vertical-rl]">
          FARMACIA
        </span>
        <span aria-hidden="true" className="hand absolute bottom-[18%] left-[9%] max-w-[48%] -rotate-4 text-[clamp(14px,1.9vw,22px)] leading-[1.05] text-blue">
          {hero.cover.theme}
        </span>
        <svg className="absolute bottom-[5%] left-[10%] w-[22%]" viewBox="0 0 60 40" aria-hidden="true">
          <g transform="rotate(-24 30 20)">
            <rect x="6" y="12" width="48" height="16" rx="8" fill="#fff" stroke="#231F1C" strokeWidth="2" />
            <path d="M30 12 H46 a8 8 0 0 1 0 16 H30 Z" fill="#E94E26" stroke="#231F1C" strokeWidth="2" />
          </g>
        </svg>
        <span aria-hidden="true" className="absolute right-[6%] bottom-[5%] max-w-[36%] text-left text-[clamp(7px,0.9vw,10px)] leading-[1.35] text-ink">
          {site.faculty.replace("&", "and")}
          <br />
          {site.university}
        </span>
      </div>
    );
  }
);
