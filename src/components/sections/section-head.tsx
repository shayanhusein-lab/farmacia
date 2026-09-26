import type { ReactNode } from "react";
import { SplitHeading } from "@/components/motion/split-heading";
import { cn } from "@/lib/utils";

/** Tag + split heading on the left, intro copy (or custom node) on the right. */
export function SectionHead({
  tag,
  title,
  titleId,
  aside,
  className,
}: {
  tag: string;
  title: string;
  titleId?: string;
  aside?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-[clamp(36px,5vw,60px)] flex flex-wrap items-end justify-between gap-x-10 gap-y-5",
        className
      )}
    >
      <div>
        <SectionTag>{tag}</SectionTag>
        <SplitHeading
          id={titleId}
          text={title}
          className="max-w-[14ch] text-[clamp(38px,5.6vw,76px)] font-extrabold"
        />
      </div>
      {typeof aside === "string" ? <p className="max-w-[42ch] text-ink-soft">{aside}</p> : aside}
    </div>
  );
}

export function SectionTag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "eyebrow mb-[18px] inline-block -rotate-2 rounded-lg border-2 border-ink bg-white px-3.5 py-1.5",
        className
      )}
    >
      {children}
    </span>
  );
}
