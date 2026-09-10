import type { Certification } from "@/data/portfolio";

export function CertificationCard({ cert }: { cert: Certification }) {
  return (
    <div className="flex items-baseline justify-between gap-6 border-t border-border py-6">
      <div>
        <h3 className="text-lg tracking-tight">{cert.title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{cert.issuer}</p>
      </div>
      <div className="flex shrink-0 items-baseline gap-4">
        <span className="text-sm text-muted-foreground">{cert.year}</span>
        {cert.credentialUrl ? (
          <a
            href={cert.credentialUrl}
            target="_blank"
            rel="noreferrer"
            className="text-sm underline underline-offset-4 transition-opacity hover:opacity-60"
          >
            View
          </a>
        ) : null}
      </div>
    </div>
  );
}
