import type { CSSProperties } from "react";
import { audience } from "@/content/site";
import { PuzzlePiece } from "@/components/brand/puzzle-piece";
import { PopIn } from "@/components/motion/pop-in";
import { SectionHead } from "./section-head";

export function Audience() {
  return (
    <section aria-labelledby="audience-title" className="sec pt-0!">
      <div className="wrap">
        <SectionHead tag={audience.tag} title={audience.title} titleId="audience-title" aside={audience.intro} />
        <PopIn className="grid gap-[18px] min-[561px]:grid-cols-2 min-[901px]:grid-cols-3">
          {audience.items.map((a) => (
            <article
              key={a.title}
              className="pop tilt-card flex items-start gap-4 rounded-card border-[2.5px] border-ink bg-white p-[22px] hover:-translate-y-1 hover:rotate-[-0.6deg]! hover:bg-(--c)"
              style={{ "--c": a.hover } as CSSProperties}
            >
              <PuzzlePiece color={a.piece} strokeWidth={5} className="size-[52px] shrink-0" />
              <div>
                <h3 className="mb-1 text-[22px] font-extrabold">{a.title}</h3>
                <p className="text-[15px] text-ink-soft">{a.body}</p>
              </div>
            </article>
          ))}
        </PopIn>
      </div>
    </section>
  );
}
