import type { CSSProperties } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/** shadcn Badge with a coloured dot (`chip` variant). */
export function Chip({
  children,
  color,
  className,
}: {
  children: React.ReactNode;
  color: string;
  className?: string;
}) {
  return (
    <Badge variant="chip" className={cn(className)} style={{ "--c": color } as CSSProperties}>
      {children}
    </Badge>
  );
}
