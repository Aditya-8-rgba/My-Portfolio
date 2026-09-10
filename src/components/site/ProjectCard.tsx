import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { MediaFrame } from "./MediaFrame";
import { Reveal } from "./Reveal";
import { TiltCard } from "./TiltCard";

const accentClass: Record<string, string> = {
  "01": "bg-blue",
  "02": "bg-green",
  "03": "bg-red",
  "04": "bg-yellow",
};

export function ProjectCard({ project, delay = 0 }: { project: Project; delay?: number }) {
  return (
    <Reveal as="article" delay={delay} className="group">
      <Link
        to="/work/$slug"
        params={{ slug: project.slug }}
        className="block focus-visible:outline-none"
        aria-label={`${project.title} — case study`}
      >
        <TiltCard>
          <MediaFrame media={project.cover} priority={project.index === "01"} />
        </TiltCard>

        <div className="mt-6 flex items-start justify-between gap-6">
          <div>
            <p className="eyebrow flex items-center gap-2">
              <span
                aria-hidden="true"
                className={cn(
                  "inline-block h-1.5 w-1.5 rounded-full transition-transform duration-500 group-hover:scale-[1.8]",
                  accentClass[project.index] ?? "bg-blue",
                )}
              />
              Case Study {project.index} — {project.category}
            </p>

            <h3 className="mt-3 text-2xl tracking-[-0.02em] sm:text-3xl">
              <span className="link-underline">{project.title}</span>
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {project.orgLabel}: {project.org}
            </p>
            <p className="mt-3 max-w-prose text-sm leading-relaxed text-muted-foreground">
              {project.summary}
            </p>
            <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
              {project.disciplines.map((d) => (
                <li key={d} className="after:ml-3 after:content-['·'] last:after:content-['']">
                  {d}
                </li>
              ))}
            </ul>
          </div>
          <ArrowUpRight className="mt-6 hidden h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-foreground sm:block" />
        </div>
      </Link>
    </Reveal>
  );
}
