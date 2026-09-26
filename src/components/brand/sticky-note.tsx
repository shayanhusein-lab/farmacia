import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

const COLORS = {
  pink: "bg-pink text-white",
  lime: "bg-lime text-ink",
  sun: "bg-sun text-ink",
  sky: "bg-sky text-ink",
} as const;

/** Taped sticky note with handwritten text. */
export function StickyNote({
  children,
  color = "sun",
  className,
  style,
}: {
  children: ReactNode;
  color?: keyof typeof COLORS;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={cn(
        "tape hand relative w-[clamp(116px,13vw,150px)] px-3.5 pt-3.5 pb-[18px] text-[clamp(15px,1.7vw,20px)] leading-[1.1]",
        "cursor-grab touch-none shadow-[0_10px_18px_-8px_rgb(35_31_28/.4)] select-none active:cursor-grabbing",
        COLORS[color],
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
}
