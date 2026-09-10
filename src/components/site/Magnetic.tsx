import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-motion";

/**
 * Wrapper that gently pulls its child toward the cursor.
 * Transform-only, so it stays on the compositor.
 */
export function Magnetic({
  children,
  className,
  strength = 0.28,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const reduced = useReducedMotion();

  if (reduced) return <span className={className}>{children}</span>;

  return (
    <span
      ref={ref}
      className={cn("inline-block will-change-transform transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]", className)}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - (rect.left + rect.width / 2)) * strength;
        const y = (e.clientY - (rect.top + rect.height / 2)) * strength;
        el.style.transitionDuration = "120ms";
        el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }}
      onPointerLeave={() => {
        const el = ref.current;
        if (!el) return;
        el.style.transitionDuration = "600ms";
        el.style.transform = "translate3d(0,0,0)";
      }}
    >
      {children}
    </span>
  );
}
