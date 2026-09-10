import { cn } from "@/lib/utils";
import { useInView, useReducedMotion } from "@/hooks/use-motion";

type Props = {
  text: string;
  className?: string;
  /** ms between each word */
  stagger?: number;
  delay?: number;
  as?: "span" | "h1" | "h2" | "h3" | "p";
};

/**
 * Mask-reveal typography: each word rises out of its own clipping box.
 * Falls back to plain text when reduced motion is requested.
 */
export function SplitText({
  text,
  className,
  stagger = 55,
  delay = 0,
  as: Tag = "span",
}: Props) {
  const reduced = useReducedMotion();
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.2 });
  const words = text.split(" ");

  if (reduced) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag ref={ref as never} className={cn("split-text", className)} aria-label={text}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="split-line" aria-hidden="true">
          <span>
            <span
              className="split-word"
              data-visible={inView ? "true" : "false"}
              style={{ transitionDelay: `${delay + i * stagger}ms` }}
            >
              {word}
            </span>
          </span>
        </span>
      ))}
    </Tag>
  );
}
