import Link from "next/link";
import { getCv } from "@/lib/cv";

export function SiteFooter() {
  const c = getCv();
  return (
    <footer className="no-print mt-auto border-t border-[var(--border)] bg-[var(--surface)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <p className="font-[family-name:var(--font-display)] text-lg font-bold">
            {c.header.nameLine1} {c.header.nameLine2}
          </p>
          <p className="mt-1 max-w-md text-sm text-[var(--muted)]">{c.header.subtitle}</p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm">
          {c.footerLinks.map((f) => (
            <Link key={f.url} href={f.url} className="text-[var(--muted)] underline-offset-4 transition hover:text-[var(--accent)] hover:underline" target="_blank" rel="noreferrer">
              {f.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
