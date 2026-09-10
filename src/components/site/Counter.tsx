import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useInView, useReducedMotion } from "@/hooks/use-motion";

/** Splits "₹25.42" / "2,500+" / "1M+" into prefix, number and suffix. */
function parseValue(value: string) {
  const match = value.match(/^(\D*?)([\d.,]+)(.*)$/);
  if (!match) return null;
  const [, prefix, digits, suffix] = match;
  const hasComma = digits.includes(",");
  const numeric = Number(digits.replace(/,/g, ""));
  if (!Number.isFinite(numeric)) return null;
  const decimals = digits.includes(".") ? (digits.split(".")[1]?.length ?? 0) : 0;
  return { prefix, suffix, numeric, decimals, hasComma };
}

const easeOut = (t: number) => 1 - Math.pow(1 - t, 4);

/** Number that counts up the first time it scrolls into view. */
export function Counter({
  value,
  className,
  duration = 1600,
}: {
  value: string;
  className?: string;
  duration?: number;
}) {
  const reduced = useReducedMotion();
  const [ref, inView] = useInView<HTMLSpanElement>({ threshold: 0.4 });
  const parsed = parseValue(value);
  const [display, setDisplay] = useState(() => (parsed ? `${parsed.prefix}0${parsed.suffix}` : value));
  const frameRef = useRef(0);

  useEffect(() => {
    if (!parsed || reduced || !inView) return;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const current = parsed.numeric * easeOut(t);
      const formatted = parsed.hasComma
        ? Math.round(current).toLocaleString("en-IN")
        : current.toFixed(parsed.decimals);
      setDisplay(`${parsed.prefix}${formatted}${parsed.suffix}`);
      if (t < 1) frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduced, value, duration]);

  if (!parsed || reduced) {
    return <span className={className}>{value}</span>;
  }

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {inView ? display : `${parsed.prefix}0${parsed.suffix}`}
    </span>
  );
}
