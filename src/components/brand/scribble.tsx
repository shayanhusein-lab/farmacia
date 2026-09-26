import { cn } from "@/lib/utils";

const PATHS = {
  underline: { d: "M4 14 C 60 4, 120 18, 180 8 S 270 6, 296 12", viewBox: "0 0 300 20", width: 7 },
  strike: { d: "M4 18 C 80 8, 160 26, 296 10", viewBox: "0 0 300 30", width: 6 },
} as const;

/** Hand-drawn orange stroke. Animate its `path` via stroke-dashoffset. */
export function Scribble({
  variant = "underline",
  className,
  pathClassName,
  color = "#E94E26",
}: {
  variant?: keyof typeof PATHS;
  className?: string;
  pathClassName?: string;
  color?: string;
}) {
  const p = PATHS[variant];
  return (
    <svg
      viewBox={p.viewBox}
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
      className={cn("pointer-events-none absolute overflow-visible", className)}
    >
      <path
        className={pathClassName}
        d={p.d}
        fill="none"
        stroke={color}
        strokeWidth={p.width}
        strokeLinecap="round"
        pathLength={1}
      />
    </svg>
  );
}
