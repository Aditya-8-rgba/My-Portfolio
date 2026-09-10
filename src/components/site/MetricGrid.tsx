import type { Metric } from "@/data/portfolio";
import { Reveal } from "./Reveal";
import { Counter } from "./Counter";
import { cn } from "@/lib/utils";

export function MetricGrid({ metrics, className }: { metrics: Metric[]; className?: string }) {
  if (metrics.length === 0) return null;
  return (
    <dl className={cn("grid grid-cols-2 gap-px overflow-hidden bg-border md:grid-cols-4", className)}>
      {metrics.map((m, i) => (
        <Reveal
          key={m.label}
          delay={i * 80}
          className="group relative bg-background px-5 py-8 transition-colors duration-500 hover:bg-surface sm:px-6 sm:py-12"
        >
          <dt className="sr-only">{m.label}</dt>
          <dd>
            <span className="display block text-4xl transition-transform duration-500 group-hover:-translate-y-0.5 sm:text-6xl">
              <Counter value={m.value} duration={1400 + i * 150} />
            </span>
            <span className="mt-4 block text-xs tracking-[0.12em] text-muted-foreground uppercase">
              {m.label}
            </span>
            <span
              aria-hidden="true"
              className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-foreground transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
            />
          </dd>
        </Reveal>
      ))}
    </dl>
  );
}
