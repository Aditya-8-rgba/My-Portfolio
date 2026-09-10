import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowDown } from "lucide-react";
import { profile } from "@/data/portfolio";
import { useReducedMotion, useScrollProgress } from "@/hooks/use-motion";
import { SplitText } from "./SplitText";
import { Magnetic } from "./Magnetic";
import { Reveal } from "./Reveal";

/**
 * Cinematic opening: layered depth, drifting aurora field, mask-revealed
 * headline and magnetic calls to action.
 */
export function Hero() {
  const reduced = useReducedMotion();
  const [ref, progress] = useScrollProgress<HTMLElement>();
  const depth = reduced ? 0 : Math.max(0, progress - 0.5);

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden px-5 pt-24 pb-24 sm:px-8 sm:pt-32 sm:pb-32 lg:min-h-[92vh] lg:pt-40"
    >
      {/* Layer 1 — drifting colour field */}
      <div aria-hidden="true" className="hero-field" data-static={reduced ? "true" : "false"}>
        <span className="hero-orb hero-orb-a" />
        <span className="hero-orb hero-orb-b" />
        <span className="hero-orb hero-orb-c" />
      </div>
      {/* Layer 2 — editorial grid */}
      <div aria-hidden="true" className="hero-grid" />

      <div
        className="relative mx-auto max-w-6xl will-change-transform"
        style={{ transform: `translate3d(0, ${(-depth * 90).toFixed(1)}px, 0)`, opacity: 1 - depth * 1.4 }}
      >
        <Reveal>
          <p className="eyebrow">{profile.role}</p>
        </Reveal>

        <h1 className="display mt-8 text-[3rem] leading-[0.92] sm:text-[5.5rem] lg:text-[8rem]">
          <SplitText text={profile.heroLine1} className="block" stagger={70} />
          <SplitText
            text={profile.heroLine2}
            className="block text-muted-foreground"
            stagger={70}
            delay={220}
          />
        </h1>

        <Reveal delay={420} className="mt-12 grid gap-10 md:grid-cols-12">
          <p className="max-w-prose text-base leading-relaxed text-muted-foreground md:col-span-7 md:col-start-6 md:text-lg">
            {profile.heroSupport}
          </p>
        </Reveal>

        <Reveal delay={520} className="mt-12 flex flex-wrap items-center gap-4">
          <Magnetic>
            <Link
              to="/work"
              className="group inline-flex items-center gap-2 overflow-hidden rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition-transform duration-500 hover:scale-[1.03]"
            >
              Explore My Work
              <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1.5" />
            </Link>
          </Magnetic>
          <Magnetic strength={0.2}>
            <Link
              to="/about"
              className="inline-flex items-center rounded-full border border-border px-7 py-3.5 text-sm font-medium transition-colors duration-500 hover:bg-surface"
            >
              About Me
            </Link>
          </Magnetic>
        </Reveal>

        <Reveal delay={700} className="mt-20 hidden items-center gap-3 text-muted-foreground lg:flex">
          <ArrowDown className="h-4 w-4 animate-[nudge_2.4s_ease-in-out_infinite]" aria-hidden="true" />
          <span className="eyebrow">Scroll to begin</span>
        </Reveal>
      </div>
    </section>
  );
}
