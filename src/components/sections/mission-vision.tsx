import type { CSSProperties } from "react";
import { missionVision, palette } from "@/content/site";
import { Card, CardContent } from "@/components/ui/card";
import { Chip } from "@/components/brand/chip";
import { PuzzlePiece } from "@/components/brand/puzzle-piece";
import { PopIn } from "@/components/motion/pop-in";
import { Scrub } from "@/components/motion/scrub";

const CARDS = [
  { label: "Mission", body: missionVision.mission, inner: "bg-orange text-white", tilt: -2.5, offset: "" },
  { label: "Vision", body: missionVision.vision, inner: "bg-sun text-ink", tilt: 2, offset: "ml-[clamp(0px,6vw,70px)]" },
];

export function MissionVision() {
  return (
    <section aria-labelledby="mv-title" className="sec overflow-hidden border-y-[3px] border-ink bg-sky">
      <div className="wrap grid items-center gap-[clamp(30px,5vw,70px)] min-[901px]:grid-cols-[.9fr_1.1fr]">
        <div className="relative">
          <Scrub to={{ rotation: 90 }} className="absolute -top-[60px] -left-20 z-0 w-[340px] opacity-95">
            <PuzzlePiece color={palette.orange} strokeWidth={2} />
          </Scrub>
          <h2
            id="mv-title"
            className="relative z-[1] text-[clamp(56px,9vw,128px)] leading-[.88] font-extrabold tracking-[-0.04em]"
          >
            Our
            <br />
            <span className="text-outline">mission</span>
            <br />
            &amp; vision
          </h2>
          <div className="relative z-[1] mt-[34px] flex flex-wrap gap-2.5">
            {missionVision.chips.map((c) => (
              <Chip key={c.label} color={c.color}>
                {c.label}
              </Chip>
            ))}
          </div>
        </div>

        <PopIn className="relative grid gap-[26px]">
          {CARDS.map((c) => (
            <Card
              key={c.label}
              className={`pop tilt-card gap-0 rounded-[22px] border-[2.5px] border-ink bg-white p-3.5 py-3.5 shadow-hard-md ring-0 ${c.offset}`}
              style={{ "--tilt": `${c.tilt}deg` } as CSSProperties}
            >
              <CardContent className={`rounded-[14px] p-[clamp(22px,3vw,34px)] ${c.inner}`}>
                <h3 className="eyebrow mb-2.5 font-sans tracking-[0.14em]">{c.label}</h3>
                <p className="font-display text-[clamp(22px,2.6vw,32px)] leading-[1.12] font-bold tracking-[-0.01em]">
                  {c.body}
                </p>
              </CardContent>
            </Card>
          ))}
        </PopIn>
      </div>
    </section>
  );
}
