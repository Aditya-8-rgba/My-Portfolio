import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import {
  profile,
  projects,
  results,
  expertise,
  tools,
  certifications,
  contact,
} from "@/data/portfolio";
import { Reveal } from "@/components/site/Reveal";
import { Hero } from "@/components/site/Hero";
import { MetricGrid } from "@/components/site/MetricGrid";
import { ProjectCard } from "@/components/site/ProjectCard";
import { CertificationCard } from "@/components/site/CertificationCard";
import { SignatureSplit } from "@/components/site/SignatureSplit";
import { SplitText } from "@/components/site/SplitText";
import { Magnetic } from "@/components/site/Magnetic";
import { Parallax } from "@/components/site/Parallax";
import { CreativeTechShowcase } from "@/components/site/CreativeTechShowcase";
import { TeachingShowcase } from "@/components/site/TeachingShowcase";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aditya Kandwal — I create content that performs." },
      {
        name: "description",
        content:
          "Digital marketer and multimedia professional combining performance marketing, content strategy and visual storytelling to turn attention into measurable growth.",
      },
      { property: "og:title", content: "Aditya Kandwal — I create content that performs." },
      {
        property: "og:description",
        content:
          "Performance marketing, content strategy and visual storytelling — selected work and results.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <section aria-label="Results" className="border-y border-border">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <MetricGrid metrics={results} />
        </div>
      </section>
      <SelectedWork />
      <CreativeTechShowcase />
      <TeachingShowcase />
      <Expertise />
      <SignatureSplit />
      <AboutPreview />
      <Certifications />
      <ContactCta />
    </>
  );
}

function SectionHead({
  eyebrow,
  title,
  action,
}: {
  eyebrow: string;
  title: string;
  action?: React.ReactNode;
}) {
  return (
    <Reveal className="flex flex-wrap items-end justify-between gap-6 border-b border-border pb-8">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <SplitText as="h2" text={title} className="display mt-4 text-3xl sm:text-5xl" />
      </div>
      {action}
    </Reveal>
  );
}

function SelectedWork() {
  return (
    <section id="work" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-36">
      <SectionHead
        eyebrow="Chapter 01 — Selected Work"
        title="Case studies"
        action={
          <Link
            to="/work"
            className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <span className="link-underline">All work</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
          </Link>
        }
      />
      <div className="mt-20 grid gap-24 md:grid-cols-2 md:gap-x-10 md:gap-y-32">
        {projects.map((p, i) => (
          <Parallax key={p.slug} speed={i % 2 === 0 ? 44 : -28}>
            <ProjectCard project={p} delay={i * 60} />
          </Parallax>
        ))}
      </div>
    </section>
  );
}

function Expertise() {
  return (
    <section className="border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-36">
        <Reveal>
          <p className="eyebrow">Chapter 02 — Expertise</p>
        </Reveal>
        <SplitText
          as="h2"
          text="Built across the full loop — create, distribute, measure."
          className="display mt-5 block max-w-3xl text-3xl sm:text-5xl lg:text-6xl"
        />
        <div className="mt-20 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {expertise.map((group, i) => (
            <Reveal key={group.title} delay={i * 70} className="group">
              <h3 className="relative border-t border-foreground/80 pt-4 text-lg tracking-tight">
                {group.title}
                <span
                  aria-hidden="true"
                  className="absolute -top-px left-0 h-0.5 w-full origin-left scale-x-0 bg-foreground transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                />
              </h3>
              <ul className="mt-4 space-y-2">
                {group.items.map((item) => (
                  <li key={item} className="text-sm leading-relaxed text-muted-foreground">
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-16 border-t border-border pt-8">
          <p className="eyebrow">Tools</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {tools.map((t) => (
              <li
                key={t}
                className="rounded-full border border-border bg-background px-4 py-1.5 text-sm text-muted-foreground transition-colors duration-500 hover:border-foreground/30 hover:text-foreground"
              >
                {t}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

function AboutPreview() {
  return (
    <section className="border-t border-border">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-24 sm:px-8 sm:py-36 md:grid-cols-12">
        <Reveal className="md:col-span-4">
          <p className="eyebrow">Chapter 04 — About</p>
        </Reveal>
        <div className="md:col-span-8">
          <SplitText
            as="p"
            text={profile.aboutShort}
            stagger={22}
            className="block text-2xl leading-snug tracking-tight sm:text-3xl"
          />
          <Reveal delay={100}>
            <p className="mt-8 max-w-prose leading-relaxed text-muted-foreground">
              Based in {profile.location}. Currently pursuing an M.Sc. in Multimedia while working
              as a Digital Marketing Instructor & Creative Strategist.
            </p>
          </Reveal>
          <Reveal delay={160}>
            <Link to="/about" className="group mt-8 inline-flex items-center gap-2 text-sm">
              <span className="link-underline">Read the full story</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Certifications() {
  return (
    <section className="border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <Reveal>
          <p className="eyebrow">Certifications</p>
        </Reveal>
        <div className="mt-8">
          {certifications.map((c) => (
            <CertificationCard key={c.title} cert={c} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactCta() {
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-6xl px-5 py-28 sm:px-8 sm:py-44">
        <SplitText
          as="h2"
          text={contact.title}
          className="display block text-4xl sm:text-7xl lg:text-8xl"
        />
        <Reveal delay={100}>
          <p className="mt-8 font-serif text-2xl text-muted-foreground sm:text-4xl">
            {contact.line}
          </p>
        </Reveal>
        <Reveal delay={180} className="mt-12 flex flex-wrap gap-4">
          <Magnetic>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition-transform duration-500 hover:scale-[1.03]"
            >
              {profile.email}
            </a>
          </Magnetic>
          <Magnetic strength={0.2}>
            <Link
              to="/contact"
              className="inline-flex items-center rounded-full border border-border px-7 py-3.5 text-sm font-medium transition-colors duration-500 hover:bg-surface"
            >
              Contact details
            </Link>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  );
}
