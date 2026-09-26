import type { CSSProperties } from "react";
import { BookOpenIcon, CameraIcon, MicIcon, TabletSmartphoneIcon } from "lucide-react";
import { whatIs, type WhatIcon } from "@/content/site";
import { PopIn } from "@/components/motion/pop-in";
import { SectionHead } from "./section-head";

const ICONS: Record<WhatIcon, typeof BookOpenIcon> = {
  book: BookOpenIcon,
  mic: MicIcon,
  camera: CameraIcon,
  tablet: TabletSmartphoneIcon,
};

export function WhatIs() {
  return (
    <section id="about" aria-labelledby="about-title" className="sec scroll-mt-24">
      <div className="wrap">
        <SectionHead tag={whatIs.tag} title={whatIs.title} titleId="about-title" aside={whatIs.intro} />
        <PopIn className="grid gap-[22px] min-[561px]:grid-cols-2 min-[1001px]:grid-cols-4">
          {whatIs.cards.map((c) => {
            const Icon = ICONS[c.icon];
            return (
              <article
                key={c.title}
                className="pop tilt-card relative flex flex-col gap-3 rounded-card border-[2.5px] border-ink px-6 pt-7 pb-[30px] shadow-hard hover:-translate-y-1.5"
                style={{ background: c.bg, "--tilt": `${c.tilt}deg` } as CSSProperties}
              >
                <div className="grid size-[54px] place-items-center rounded-[14px] border-[2.5px] border-ink bg-white">
                  <Icon className="size-7" strokeWidth={2.2} aria-hidden="true" />
                </div>
                <h3 className="text-[26px] font-extrabold">{c.title}</h3>
                <p className="text-[15.5px]">{c.body}</p>
              </article>
            );
          })}
        </PopIn>
      </div>
    </section>
  );
}
