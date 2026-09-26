import type { CSSProperties } from "react";

/** Jigsaw piece with two tabs and two blanks, drawn on a 0 0 120 120 viewBox. */
export const PUZZLE_PATH =
  "M20 20 H48 A12 12 0 1 1 72 20 H100 V48 A12 12 0 1 1 100 72 V100 H72 A12 12 0 1 0 48 100 H20 V72 A12 12 0 1 0 20 48 Z";

type Props = {
  color: string;
  stroke?: string;
  strokeWidth?: number;
  rotate?: number;
  className?: string;
  style?: CSSProperties;
};

export function PuzzlePiece({
  color,
  stroke = "#231F1C",
  strokeWidth = 2.5,
  rotate = 0,
  className,
  style,
}: Props) {
  return (
    <svg
      viewBox="0 0 120 120"
      aria-hidden="true"
      focusable="false"
      className={className}
      style={style}
    >
      <path
        d={PUZZLE_PATH}
        fill={color}
        stroke={stroke === "none" ? undefined : stroke}
        strokeWidth={stroke === "none" ? undefined : strokeWidth}
        strokeLinejoin="round"
        transform={rotate ? `rotate(${rotate} 60 60)` : undefined}
      />
    </svg>
  );
}
