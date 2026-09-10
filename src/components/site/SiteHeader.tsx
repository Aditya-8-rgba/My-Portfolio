import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { profile, resumeUrl } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const links = [
  { to: "/work", label: "Work" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full bg-background/85 backdrop-blur-md transition-colors duration-300",
        scrolled ? "border-b border-border" : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link
          to="/"
          className="text-[0.8rem] font-semibold tracking-[0.18em] uppercase transition-opacity hover:opacity-60"
        >
          {profile.name}
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="relative text-sm text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {l.label}
            </Link>
          ))}
          <ResumeLink />
        </nav>

        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center rounded-md text-foreground md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="border-t border-border bg-background px-5 pb-6 md:hidden"
        >
          <ul className="flex flex-col">
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="block border-b border-border py-4 text-xl tracking-tight"
                  activeProps={{ className: "text-foreground" }}
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="pt-4">
              <ResumeLink />
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}

function ResumeLink() {
  if (!resumeUrl) {
    return (
      <span
        className="inline-flex cursor-not-allowed items-center rounded-full border border-border px-4 py-1.5 text-sm text-muted-foreground"
        title="Resume available on request"
        aria-disabled="true"
      >
        Resume
      </span>
    );
  }
  return (
    <a
      href={resumeUrl}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center rounded-full border border-foreground px-4 py-1.5 text-sm text-foreground transition-colors hover:bg-foreground hover:text-background"
    >
      Resume
    </a>
  );
}
