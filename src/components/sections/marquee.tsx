"use client";

import { useRef } from "react";
import { marquee } from "@/content/site";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";

function Row() {
  return (
    <span className="inline-flex items-center gap-10">
      {marquee.words.map((w) => (
        <span key={w.word} className="inline-flex items-center gap-10">
          {w.word}
          <i className="inline-block size-[.7em] rotate-45 rounded-[3px]" style={{ background: w.color }} />
        </span>
      ))}
    </span>
  );
}

export function Marquee() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.to(".marquee-track", { xPercent: -50, duration: 22, ease: "none", repeat: -1 });
      });
    },
    { scope: ref }
  );

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="-mx-[2%] mt-5 mb-2.5 w-[104%] -rotate-[1.4deg] overflow-hidden border-y-[3px] border-ink bg-ink text-paper"
    >
      <div className="marquee-track flex w-max gap-10 py-4 font-display text-[clamp(22px,3vw,36px)] font-extrabold whitespace-nowrap uppercase">
        <Row />
        <Row />
      </div>
    </div>
  );
}
