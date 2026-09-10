import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { projects, type Project } from "@/data/portfolio";
import { Reveal } from "@/components/site/Reveal";
import { MediaFrame } from "@/components/site/MediaFrame";
import { MetricGrid } from "@/components/site/MetricGrid";
import { SplitText } from "@/components/site/SplitText";
import { TiltCard } from "@/components/site/TiltCard";
import { MediaCarousel } from "@/components/site/MediaCarousel";
import { Magnetic } from "@/components/site/Magnetic";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }): { project: Project } => {
    const project = projects.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Case study not found — Aditya Kandwal" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { project } = loaderData;
    const title = `${project.title} — Aditya Kandwal`;
    return {
      meta: [
        { title },
        { name: "description", content: project.summary },
        { property: "og:title", content: title },
        { property: "og:description", content: project.summary },
      ],
    };
  },
  component: CaseStudy,
});

function CaseStudy() {
  const { project } = Route.useLoaderData() as { project: Project };
  const idx = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(idx + 1) % projects.length];

  return (
    <article>
      <header className="relative overflow-hidden px-5 pt-12 pb-16 sm:px-8 sm:pt-16">
        <div className="mx-auto max-w-6xl">
          <Link
            to="/work"
            className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-500 group-hover:-translate-x-1" />
            <span className="link-underline">All work</span>
          </Link>

          <p className="eyebrow mt-12">
            Case Study {project.index} — {project.category}
          </p>
          <SplitText
            as="h1"
            text={project.title}
            className="display mt-5 block max-w-4xl text-4xl sm:text-7xl lg:text-8xl"
            stagger={60}
          />
          <Reveal delay={280}>
            <p className="mt-10 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {project.summary}
            </p>
          </Reveal>

          <Reveal delay={360} className="mt-14 grid gap-8 border-t border-border pt-8 sm:grid-cols-2">
            <div>
              <p className="eyebrow">{project.orgLabel}</p>
              <p className="mt-2 text-sm">{project.org}</p>
            </div>
            <div>
              <p className="eyebrow">Disciplines</p>
              <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-sm">
                {project.disciplines.map((d) => (
                  <li key={d} className="after:ml-3 after:content-['·'] last:after:content-['']">
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <TiltCard className="mx-auto max-w-3xl">
          <MediaFrame media={project.cover} priority />
        </TiltCard>
      </div>

      {project.metrics.length > 0 ? (
        <div className="mt-24 border-y border-border">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <MetricGrid metrics={project.metrics} />
          </div>
        </div>
      ) : null}

      {/* Narrative chapters — Challenge → Insight → Strategy → Execution → Results → Learnings */}
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-36">
        <div className="grid gap-24">
          {project.sections.map((s, i) => (
            <section key={s.heading} className="grid gap-6 md:grid-cols-12">
              <div className="md:col-span-4">
                <div className="md:sticky md:top-28">
                  <Reveal>
                    <span className="eyebrow block text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2 className="display mt-3 text-2xl sm:text-4xl">{s.heading}</h2>
                    <span aria-hidden="true" className="chapter-rule mt-6 block w-16" />
                  </Reveal>
                </div>
              </div>
              <div className="md:col-span-8">
                <SplitText
                  as="p"
                  text={s.body}
                  stagger={16}
                  className="block max-w-prose text-lg leading-relaxed sm:text-xl"
                />
                {s.bullets ? (
                  <ul className="mt-8 space-y-3 border-l border-border pl-6">
                    {s.bullets.map((b, bi) => (
                      <Reveal as="li" key={b} delay={bi * 70} className="text-sm leading-relaxed text-muted-foreground">
                        {b}
                      </Reveal>
                    ))}
                  </ul>
                ) : null}
              </div>
            </section>
          ))}
        </div>

        {project.gallery.length > 0 ? (
          <section className="mt-32">
            <Reveal>
              <p className="eyebrow">Showcase</p>
              <h2 className="display mt-4 text-2xl sm:text-4xl">Campaign media</h2>
              <p className="mt-4 max-w-prose text-sm text-muted-foreground">
                Swipe or use the arrows to move through the reels, analytics screenshots and
                photography from this project.
              </p>
            </Reveal>
            <Reveal delay={80}>
              <MediaCarousel items={project.gallery} className="mt-12" />
            </Reveal>
          </section>
        ) : null}
      </div>

      <nav aria-label="Next case study" className="border-t border-border">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <Link to="/work/$slug" params={{ slug: next.slug }} className="group block">
            <p className="eyebrow">Next case study</p>
            <Magnetic strength={0.08}>
              <span className="display mt-5 flex flex-wrap items-center gap-4 text-3xl sm:text-6xl">
                <span className="link-underline">{next.title}</span>
                <ArrowRight className="h-8 w-8 transition-transform duration-500 group-hover:translate-x-3" />
              </span>
            </Magnetic>
          </Link>
        </div>
      </nav>
    </article>
  );
}
