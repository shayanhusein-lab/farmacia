import type { CSSProperties } from "react";
import { team } from "@/content/site";
import { Polaroid } from "@/components/brand/polaroid";
import { PopIn } from "@/components/motion/pop-in";
import { cn } from "@/lib/utils";
import { SectionHead } from "./section-head";

function PaperClip() {
  return (
    <svg
      aria-hidden="true"
      className="absolute -top-[22px] right-[22px] w-[26px]"
      viewBox="0 0 26 60"
      fill="none"
      stroke="#9BB8B4"
      strokeWidth="3.5"
      strokeLinecap="round"
    >
      <path d="M8 20 V48 a5 5 0 0 0 10 0 V10 a8 8 0 0 0-16 0 V46" />
    </svg>
  );
}

export function Team() {
  const before = team.leads.slice(0, team.quoteAfter);
  const after = team.leads.slice(team.quoteAfter);

  return (
    <section
      id="team"
      aria-labelledby="team-title"
      className="sec dot-texture scroll-mt-20 border-y-[3px] border-ink bg-sand"
    >
      <div className="wrap">
        <SectionHead tag={team.tag} title={team.title} titleId="team-title" aside={team.intro} />

        <PopIn className="mb-[60px] grid gap-[22px] min-[861px]:grid-cols-[1.1fr_1fr_1fr]">
          {team.patrons.map((p) => (
            <div
              key={p.name}
              className={cn(
                "pop relative rounded-[20px] border-[2.5px] border-ink px-[26px] py-6 shadow-hard",
                p.chief ? "bg-blue text-white" : "bg-white"
              )}
            >
              {p.chief ? <PaperClip /> : null}
              <span className={cn("eyebrow", p.chief ? "text-sun" : "text-blue")}>{p.role}</span>
              <h3 className="mt-2 text-[clamp(28px,3vw,38px)] font-extrabold tracking-[-0.01em] uppercase">
                {p.name}
              </h3>
            </div>
          ))}
        </PopIn>

        <PopIn className="grid gap-[clamp(18px,2.4vw,30px)] min-[441px]:grid-cols-2 min-[721px]:grid-cols-3 min-[1001px]:grid-cols-4">
          {before.map((lead, i) => (
            <Polaroid key={lead.slug} lead={lead} index={i} />
          ))}
          <blockquote
            className="pop tilt-card tape-sun relative flex items-center bg-pink p-6 text-white shadow-paper hover:scale-[1.04]"
            style={{ "--tilt": "-2.5deg" } as CSSProperties}
          >
            <p className="font-display text-xl leading-[1.2] font-bold uppercase">{team.quote}</p>
          </blockquote>
          {after.map((lead, i) => (
            <Polaroid key={lead.slug} lead={lead} index={i + before.length + 1} />
          ))}
        </PopIn>

        <p className="hand mt-10 text-center text-2xl">{team.footnote}</p>
      </div>
    </section>
  );
}
