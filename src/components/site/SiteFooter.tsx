import { Link } from "@tanstack/react-router";
import { profile, socials } from "@/data/portfolio";

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:px-8 md:flex-row md:items-center md:justify-between">
        <p className="text-xs text-muted-foreground">© 2026 {profile.name}</p>

        <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs">
          <Link to="/work" className="text-muted-foreground transition-colors hover:text-foreground">
            Work
          </Link>
          <Link
            to="/about"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Contact
          </Link>
          {socials.map((s) =>
            s.url ? (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {s.label}
              </a>
            ) : null,
          )}
          <a
            href={`mailto:${profile.email}`}
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Email
          </a>
        </nav>
      </div>
    </footer>
  );
}
