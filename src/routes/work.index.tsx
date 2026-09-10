import { createFileRoute } from "@tanstack/react-router";
import { projects, results } from "@/data/portfolio";
import { Reveal } from "@/components/site/Reveal";
import { ProjectCard } from "@/components/site/ProjectCard";
import { MetricGrid } from "@/components/site/MetricGrid";
import { SplitText } from "@/components/site/SplitText";
import { Parallax } from "@/components/site/Parallax";

export const Route = createFileRoute("/work/")({
  head: () => ({
    meta: [
      { title: "Work — Aditya Kandwal" },
      {
        name: "description",
        content:
          "Case studies in organic growth, Meta Ads performance marketing, brand content and marketing education by Aditya Kandwal.",
      },
      { property: "og:title", content: "Work — Aditya Kandwal" },
      {
        property: "og:description",
        content:
          "Case studies in organic growth, performance marketing, brand content and marketing education.",
      },
    ],
  }),
  component: WorkPage,
});

function WorkPage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-5 pt-20 pb-16 sm:px-8 sm:pt-28">
        <Reveal>
          <p className="eyebrow">Selected Work</p>
        </Reveal>
        <SplitText
          as="h1"
          text="Work that earns attention and proves it."
          className="display mt-5 block max-w-3xl text-4xl sm:text-7xl"
          stagger={65}
        />
      </section>

      <div className="border-y border-border">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <MetricGrid metrics={results} />
        </div>
      </div>

      <section className="mx-auto grid max-w-6xl gap-24 px-5 py-24 sm:px-8 sm:py-32 md:grid-cols-2 md:gap-x-10 md:gap-y-32">
        {projects.map((p, i) => (
          <Parallax key={p.slug} speed={i % 2 === 0 ? 44 : -28}>
            <ProjectCard project={p} delay={i * 60} />
          </Parallax>
        ))}
      </section>
    </>
  );
}
