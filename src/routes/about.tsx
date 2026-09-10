import { createFileRoute, Link } from "@tanstack/react-router";
import { profile, timeline, expertise, tools, certifications } from "@/data/portfolio";
import { Reveal } from "@/components/site/Reveal";
import { CertificationCard } from "@/components/site/CertificationCard";
import { JourneyTimeline } from "@/components/site/JourneyTimeline";
import { SplitText } from "@/components/site/SplitText";
import { Magnetic } from "@/components/site/Magnetic";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Aditya Kandwal" },
      {
        name: "description",
        content:
          "Aditya Kandwal is a digital marketing and multimedia professional in Bhopal, India — M.Sc. Multimedia student and Digital Marketing Instructor & Creative Strategist.",
      },
      { property: "og:title", content: "About — Aditya Kandwal" },
      {
        property: "og:description",
        content:
          "The journey behind a portfolio built at the intersection of creative craft and measurable marketing performance.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-5 pt-20 pb-16 sm:px-8 sm:pt-28">
        <Reveal>
          <p className="eyebrow">About</p>
        </Reveal>
        <SplitText
          as="h1"
          text="Creative by training. Performance by practice."
          className="display mt-5 block max-w-4xl text-4xl sm:text-7xl lg:text-8xl"
          stagger={65}
        />
        <Reveal delay={320} className="mt-14 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-7 md:col-start-6">
            <p className="text-lg leading-relaxed">{profile.aboutShort}</p>
            <p className="mt-6 leading-relaxed text-muted-foreground">
              Studying multimedia gave me the craft — video, design, photography. Running campaigns
              gave me the discipline — audiences, budgets, testing and reporting. I keep both in the
              same workflow, so the creative decision and the media decision are made together.
            </p>
            <p className="mt-6 leading-relaxed text-muted-foreground">
              Based in {profile.location}.
            </p>
          </div>
        </Reveal>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
          <Reveal>
            <p className="eyebrow">The journey</p>
            <h2 className="display mt-4 max-w-2xl text-3xl sm:text-5xl">
              From multimedia craft to digital marketing.
            </h2>
          </Reveal>
          <JourneyTimeline entries={timeline} className="mt-20" />
        </div>
      </section>

      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <Reveal>
            <p className="eyebrow">Capabilities</p>
          </Reveal>
          <div className="mt-12 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {expertise.map((g, i) => (
              <Reveal key={g.title} delay={i * 60} className="group">
                <h3 className="relative border-t border-foreground/80 pt-4 text-lg tracking-tight">
                  {g.title}
                  <span
                    aria-hidden="true"
                    className="absolute -top-px left-0 h-0.5 w-full origin-left scale-x-0 bg-foreground transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                  />
                </h3>
                <ul className="mt-4 space-y-2">
                  {g.items.map((item) => (
                    <li key={item} className="text-sm leading-relaxed text-muted-foreground">
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-14 border-t border-border pt-8">
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

      <section className="border-t border-border">
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

      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-36">
          <SplitText
            as="h2"
            text="Let's work together."
            className="display block text-3xl sm:text-6xl lg:text-7xl"
          />
          <Reveal delay={140} className="mt-10 flex flex-wrap gap-4">
            <Magnetic>
              <Link
                to="/contact"
                className="inline-flex items-center rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition-transform duration-500 hover:scale-[1.03]"
              >
                Get in touch
              </Link>
            </Magnetic>
            <Magnetic strength={0.2}>
              <Link
                to="/work"
                className="inline-flex items-center rounded-full border border-border px-7 py-3.5 text-sm font-medium transition-colors duration-500 hover:bg-surface"
              >
                See the work
              </Link>
            </Magnetic>
          </Reveal>
        </div>
      </section>
    </>
  );
}
