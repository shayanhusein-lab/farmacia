import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import type { CSSProperties } from "react";
import type { TeamLead } from "@/content/site";
import { PuzzlePiece } from "./puzzle-piece";

function headshot(slug: string): string | null {
  for (const ext of ["jpg", "jpeg", "png", "webp"]) {
    const rel = `/team/${slug}.${ext}`;
    if (fs.existsSync(path.join(process.cwd(), "public", rel))) return rel;
  }
  return null;
}

/** Taped polaroid: headshot from /public/team/<slug>.jpg, else initials on colour. */
export function Polaroid({ lead, index }: { lead: TeamLead; index: number }) {
  const src = headshot(lead.slug);
  return (
    <figure
      className="pop tilt-card tape-sun relative bg-white px-3 pt-3 pb-[18px] shadow-[0_14px_24px_-12px_rgb(35_31_28/.55),0_0_0_1px_rgb(35_31_28/.08)] hover:z-[2] hover:scale-[1.04]"
      style={{ "--tilt": index % 2 ? "2deg" : "-2.5deg" } as CSSProperties}
    >
      <div
        className="relative grid aspect-square place-items-center overflow-hidden rounded-[2px]"
        style={{ background: lead.color }}
      >
        {src ? (
          <Image
            src={src}
            alt={`Portrait of ${lead.name}`}
            fill
            sizes="(max-width: 440px) 90vw, (max-width: 720px) 45vw, 280px"
            className="object-cover"
          />
        ) : (
          <>
            <PuzzlePiece color="#fff" stroke="none" className="absolute w-[88%] opacity-35" />
            <span
              aria-hidden="true"
              className="relative font-logo text-[clamp(44px,5vw,64px)] text-ink"
            >
              {lead.initials}
            </span>
          </>
        )}
      </div>
      <figcaption>
        <h3 className="mt-3.5 text-[19px] font-extrabold tracking-[0.01em] uppercase">
          {lead.name}
        </h3>
        <p className="hand text-2xl leading-none text-blue">{lead.role}</p>
      </figcaption>
    </figure>
  );
}
