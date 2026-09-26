import Image from "next/image";
import { footer, palette, site } from "@/content/site";
import { PuzzlePiece } from "@/components/brand/puzzle-piece";
import { Scrub } from "@/components/motion/scrub";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t-[3px] border-ink bg-blue pt-[clamp(70px,10vw,120px)] pb-[30px] text-white">
      <Scrub
        to={{ rotation: 180 }}
        triggerSelector="footer"
        start="top bottom"
        end="bottom bottom"
        className="absolute top-10 -right-10 w-[clamp(120px,22vw,300px)] opacity-90 max-[560px]:top-4 max-[560px]:-right-12"
      >
        <PuzzlePiece color={palette.sun} strokeWidth={2} />
      </Scrub>

      <div className="wrap relative @container">
        <blockquote className="relative m-0 max-w-[17ch] font-display text-[clamp(36px,5.6vw,80px)] leading-none font-extrabold tracking-[-0.03em]">
          {footer.quoteLead}
          <em className="text-sun not-italic">{footer.quoteEm}</em>
        </blockquote>

        <Scrub
          from={{ xPercent: 20 }}
          triggerSelector="footer"
          start="top bottom"
          end="bottom bottom"
          className="mt-[clamp(50px,8vw,90px)] font-logo text-[min(250px,17cqi)] leading-[.8] whitespace-nowrap text-transparent [-webkit-text-stroke:2px_rgb(255_255_255/.55)]"
        >
          FARMACIA
        </Scrub>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t-[1.5px] border-white/30 pt-[22px] text-sm text-[#D4E0F5]">
          <span className="flex items-center gap-3">
            <span className="grid size-11 shrink-0 place-items-center rounded-full border-2 border-ink bg-white p-1.5 shadow-[2px_3px_0_var(--color-blue-deep)]">
              <Image src="/brand/farmacia-emblem.png" alt="" width={480} height={404} className="h-auto w-full" />
            </span>
            {site.faculty} · {site.university}
          </span>
          <span>{site.tagline}</span>
        </div>
      </div>
    </footer>
  );
}
