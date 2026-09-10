import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion, useScrollProgress } from "@/hooks/use-motion";

/**
 * Translates its content on the Y axis as it travels through the viewport.
 * `speed` is the total travel in pixels across the full pass.
 */
export function Parallax({
  children,
  className,
  speed = 60,
}: {
  children: ReactNode;
  className?: string;
  speed?: number;
}) {
  const reduced = useReducedMotion();
  const [ref, progress] = useScrollProgress<HTMLDivElement>();
  const offset = reduced ? 0 : (0.5 - progress) * speed;

  return (
    <div ref={ref} className={cn("will-change-transform", className)}>
      <div style={{ transform: `translate3d(0, ${offset.toFixed(2)}px, 0)` }}>{children}</div>
    </div>
  );
}
