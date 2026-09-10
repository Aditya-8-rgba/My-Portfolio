import { createFileRoute } from "@tanstack/react-router";
import { contact, profile, socials, resumeUrl } from "@/data/portfolio";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Aditya Kandwal" },
      {
        name: "description",
        content:
          "Get in touch with Aditya Kandwal for digital marketing, performance campaigns and multimedia content work.",
      },
      { property: "og:title", content: "Contact — Aditya Kandwal" },
      {
        property: "og:description",
        content: "Have an idea worth telling? Let's create something people remember.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <section className="mx-auto max-w-6xl px-5 pt-20 pb-28 sm:px-8 sm:pt-28 sm:py-36">
      <Reveal>
        <p className="eyebrow">Contact</p>
        <h1 className="display mt-5 text-4xl sm:text-7xl">{contact.title}</h1>
        <p className="mt-6 font-serif text-2xl text-muted-foreground sm:text-4xl">{contact.line}</p>
      </Reveal>

      <div className="mt-20 grid gap-12 border-t border-border pt-12 md:grid-cols-3">
        <Reveal>
          <p className="eyebrow">Email</p>
          <a
            href={`mailto:${profile.email}`}
            className="mt-3 inline-block text-lg break-all underline underline-offset-4 transition-opacity hover:opacity-60"
          >
            {profile.email}
          </a>
        </Reveal>

        <Reveal delay={80}>
          <p className="eyebrow">Based in</p>
          <p className="mt-3 text-lg">{profile.location}</p>
        </Reveal>

        <Reveal delay={160}>
          <p className="eyebrow">Elsewhere</p>
          <ul className="mt-3 space-y-2">
            {socials.map((s) =>
              s.url ? (
                <li key={s.label}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-lg underline underline-offset-4 transition-opacity hover:opacity-60"
                  >
                    {s.label}
                  </a>
                </li>
              ) : (
                <li key={s.label} className="text-lg text-muted-foreground">
                  {s.label}
                  <span className="ml-2 text-xs">— link coming soon</span>
                </li>
              ),
            )}
          </ul>
        </Reveal>
      </div>

      <Reveal delay={200} className="mt-16 border-t border-border pt-8">
        <p className="eyebrow">Resume</p>
        {resumeUrl ? (
          <a
            href={resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex items-center rounded-full border border-foreground px-6 py-3 text-sm transition-colors hover:bg-foreground hover:text-background"
          >
            Download resume
          </a>
        ) : (
          <p className="mt-3 text-sm text-muted-foreground">
            Available on request — email me and I'll send it across.
          </p>
        )}
      </Reveal>
    </section>
  );
}
