import Link from "next/link";
import type { ProjectWithKind } from "@/lib/projects";
import { Eyebrow } from "@/components/ui/eyebrow";

/**
 * Casos secundarios en lista compacta.
 *
 * Antes los once proyectos competían como cards del mismo tamaño, y seis de ellos
 * eran landings propias. Aquí siguen accesibles —con su página y su URL intactas,
 * que es lo que importa para SEO— pero sin robarle atención a los cinco casos que
 * de verdad venden.
 */
export function SecondaryProjectList({ projects }: { projects: ProjectWithKind[] }) {
  if (projects.length === 0) return null;

  return (
    <section className="mt-16 border-t border-[var(--border)] pt-10">
      <Eyebrow tone="muted">También he construido</Eyebrow>
      <ul className="mt-5 divide-y divide-[var(--border)]">
        {projects.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/projects/${p.slug}`}
              className="group flex flex-wrap items-baseline gap-x-3 gap-y-1 py-3 transition hover:text-[var(--accent-ink)]"
            >
              <span className="font-medium">{p.title}</span>
              {p.category && <span className="text-xs text-[var(--muted)]">{p.category}</span>}
              <span className="ml-auto text-xs text-[var(--muted)]">{p.year}</span>
              <span aria-hidden className="text-sm opacity-0 transition group-hover:opacity-100">
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
