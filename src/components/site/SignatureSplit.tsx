import { signature } from "@/data/portfolio";
import { usePinProgress, useReducedMotion } from "@/hooks/use-motion";
import { SplitText } from "./SplitText";

/**
 * Pinned split-screen chapter: two columns drift apart, then converge into a
 * single unified statement as the section scrolls through.
 */
export function SignatureSplit() {
  const reduced = useReducedMotion();
  const [ref, p] = usePinProgress<HTMLElement>();

  // 0 → 0.55 : columns hold apart. 0.55 → 1 : they converge and the line resolves.
  const merge = reduced ? 1 : Math.min(1, Math.max(0, (p - 0.5) / 0.45));
  const spread = reduced ? 0 : (1 - merge) * 8;
  const lineOpacity = reduced ? 1 : merge;
  const columnsOpacity = reduced ? 1 : 1 - merge * 0.75;
  const seamScale = reduced ? 1 : 0.15 + merge * 0.85;

  return (
    <section
      ref={ref}
      aria-label="Creative and performance"
      className="relative border-t border-border bg-surface"
      style={{ height: reduced ? "auto" : "260vh" }}
    >
      <div className="sticky top-0 flex min-h-screen items-center overflow-hidden">
        <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8">
          <p className="eyebrow">The signature</p>
          <SplitText
            as="h2"
            text={signature.title}
            className="display mt-5 max-w-3xl text-3xl sm:text-5xl lg:text-6xl"
          />

          <div className="relative mt-14 grid gap-10 md:grid-cols-2">
            <div
              className="will-change-transform"
              style={{
                transform: `translate3d(-${spread}%, 0, 0)`,
                opacity: columnsOpacity,
                transition: reduced ? undefined : "opacity 250ms linear",
              }}
            >
              <p className="eyebrow">Creative</p>
              <ul className="mt-5 space-y-2">
                {signature.creative.map((c) => (
                  <li key={c} className="text-2xl tracking-tight sm:text-4xl">
                    {c}
                  </li>
                ))}
              </ul>
            </div>

            <div
              className="text-left will-change-transform md:text-right"
              style={{
                transform: `translate3d(${spread}%, 0, 0)`,
                opacity: columnsOpacity,
                transition: reduced ? undefined : "opacity 250ms linear",
              }}
            >
              <p className="eyebrow">Performance</p>
              <ul className="mt-5 space-y-2">
                {signature.performance.map((c) => (
                  <li key={c} className="text-2xl tracking-tight sm:text-4xl">
                    {c}
                  </li>
                ))}
              </ul>
            </div>

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px origin-center bg-border md:block"
              style={{ transform: `scaleY(${seamScale})` }}
            />
          </div>

          <div
            className="mt-14 border-t border-border pt-10 will-change-transform"
            style={{
              opacity: lineOpacity,
              transform: `translate3d(0, ${(1 - lineOpacity) * 24}px, 0)`,
            }}
          >
            <p className="max-w-3xl font-serif text-2xl leading-snug sm:text-4xl lg:text-5xl">
              {signature.line}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
