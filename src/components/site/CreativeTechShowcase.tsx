import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { projects } from "@/data/portfolio";
import { Reveal } from "@/components/site/Reveal";
import { SplitText } from "@/components/site/SplitText";
import { MediaCarousel } from "@/components/site/MediaCarousel";
import { Magnetic } from "@/components/site/Magnetic";

/**
 * Full-bleed independent showcase for case study 03 — Creative Technology.
 * Large editorial typography + the generative-AI reel carousel.
 */
export function CreativeTechShowcase() {
  const project = projects.find((p) => p.index === "03");
  if (!project) return null;

  return (
    <section
      id="creative-technology"
      aria-label="Case study 03 — Creative Technology"
      className="border-t border-border"
    >
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-36">
        <Reveal className="flex flex-wrap items-end justify-between gap-6 border-b border-border pb-8">
          <p className="eyebrow">Case Study 03 — {project.category}</p>
          <p className="text-sm text-muted-foreground">{project.org}</p>
        </Reveal>

        <div className="mt-14 grid gap-12 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-7">
            <SplitText
              as="h2"
              text={project.title}
              className="display block text-4xl leading-[0.95] sm:text-6xl lg:text-7xl"
            />
          </div>
          <div className="md:col-span-5 md:pt-3">
            <Reveal delay={80}>
              <p className="max-w-prose text-lg leading-relaxed text-muted-foreground">
                {project.summary}
              </p>
            </Reveal>
            <Reveal delay={140}>
              <ul className="mt-8 flex flex-wrap gap-2">
                {project.disciplines.map((d) => (
                  <li
                    key={d}
                    className="rounded-full border border-border bg-background px-4 py-1.5 text-sm text-muted-foreground"
                  >
                    {d}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>

        <Reveal delay={80} className="mt-16">
          <MediaCarousel items={project.gallery} />
        </Reveal>

        <div className="mt-16 grid gap-10 border-t border-border pt-12 md:grid-cols-3">
          {project.sections.slice(0, 3).map((s, i) => (
            <Reveal key={s.heading} delay={i * 70}>
              <h3 className="text-sm uppercase tracking-[0.18em] text-muted-foreground">
                {s.heading}
              </h3>
              <p className="mt-4 leading-relaxed">{s.body}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120} className="mt-14">
          <Magnetic>
            <Link
              to="/work/$slug"
              params={{ slug: project.slug }}
              className="group inline-flex items-center gap-3 rounded-full border border-foreground/20 px-6 py-3 text-sm transition-colors duration-500 hover:border-foreground/60"
            >
              <span>Read the full case study</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
            </Link>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  );
}
