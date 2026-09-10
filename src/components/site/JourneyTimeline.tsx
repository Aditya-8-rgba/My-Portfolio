import { timeline, type TimelineEntry } from "@/data/portfolio";
import { useReducedMotion, useScrollProgress } from "@/hooks/use-motion";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

/**
 * Immersive vertical journey: a spine that draws itself as the section
 * scrolls, with each chapter revealing in sequence.
 */
export function JourneyTimeline({
  entries = timeline,
  className,
}: {
  entries?: TimelineEntry[];
  className?: string;
}) {
  const reduced = useReducedMotion();
  const [ref, progress] = useScrollProgress<HTMLDivElement>();
  const draw = reduced ? 1 : Math.min(1, Math.max(0, (progress - 0.1) / 0.6));

  return (
    <div ref={ref} className={cn("relative", className)}>
      <div
        aria-hidden="true"
        className="absolute top-2 bottom-2 left-[7px] w-px bg-border sm:left-[9px]"
      />
      <div
        aria-hidden="true"
        className="absolute top-2 left-[7px] w-px origin-top bg-foreground will-change-transform sm:left-[9px]"
        style={{ height: "calc(100% - 1rem)", transform: `scaleY(${draw})` }}
      />

      <ol className="space-y-14">
        {entries.map((e, i) => (
          <Reveal as="li" key={`${e.title}-${e.period}`} delay={i * 90} className="relative pl-10 sm:pl-14">
            <span
              aria-hidden="true"
              className={cn(
                "absolute top-2 left-0 h-4 w-4 rounded-full border-2 border-foreground bg-background sm:h-5 sm:w-5",
              )}
            >
              <span
                className={cn(
                  "absolute inset-1 rounded-full",
                  e.kind === "experience" ? "bg-foreground" : "bg-transparent",
                )}
              />
            </span>

            <p className="eyebrow">
              {e.kind === "experience" ? "Experience" : "Education"} · {e.period}
            </p>
            <h3 className="display mt-3 text-2xl sm:text-4xl">{e.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{e.org}</p>
            {e.note ? <p className="mt-1 text-xs text-muted-foreground">{e.note}</p> : null}
            {e.points ? (
              <ul className="mt-6 grid gap-2 border-l border-border pl-5 sm:max-w-2xl">
                {e.points.map((p) => (
                  <li key={p} className="text-sm leading-relaxed text-muted-foreground">
                    {p}
                  </li>
                ))}
              </ul>
            ) : null}
          </Reveal>
        ))}
      </ol>
    </div>
  );
}
