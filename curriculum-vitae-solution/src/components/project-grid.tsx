import Link from "next/link";
import { ClarityTrackedAnchor } from "@/components/clarity-tracked-anchor";
import type { CvProject } from "@/types/cv";

function webHref(p: CvProject) {
  return p.webUrl ?? p.url;
}

function ProjectCard({ p }: { p: CvProject }) {
  const web = webHref(p);
  return (
    <article className="group flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 transition hover:border-[var(--accent)]/50 hover:shadow-[0_0_0_1px_var(--accent)]/20">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-[family-name:var(--font-display)] text-xl font-bold tracking-tight">
          <Link href={`/projects/${p.slug}`} className="hover:text-[var(--accent)]">
            {p.title}
          </Link>
        </h3>
        <span className="shrink-0 rounded-full bg-[var(--bg)] px-2 py-0.5 text-xs text-[var(--muted)]">{p.year}</span>
      </div>
      {p.highlight && <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">{p.highlight}</p>}
      <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--muted)]">{p.description}</p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {p.stack.map((s) => (
          <li key={s} className="rounded-md border border-[var(--border)] px-2 py-0.5 text-xs text-[var(--fg)]">
            {s}
          </li>
        ))}
      </ul>
      <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
        <Link href={`/projects/${p.slug}`} className="font-medium text-[var(--fg)] underline-offset-4 hover:underline">
          Detalle
        </Link>
        {web && (
          <ClarityTrackedAnchor
            href={web}
            target="_blank"
            rel="noreferrer"
            clarityEventOnClick={`project_grid_web_${p.slug}`}
            className="font-medium text-[var(--accent)] underline-offset-4 hover:underline"
          >
            Web
          </ClarityTrackedAnchor>
        )}
        {p.appUrl && (
          <ClarityTrackedAnchor
            href={p.appUrl}
            target="_blank"
            rel="noreferrer"
            clarityEventOnClick={`project_grid_app_${p.slug}`}
            className="text-[var(--muted)] underline-offset-4 hover:text-[var(--fg)] hover:underline"
          >
            App
          </ClarityTrackedAnchor>
        )}
        {p.repoUrl && (
          <ClarityTrackedAnchor
            href={p.repoUrl}
            target="_blank"
            rel="noreferrer"
            clarityEventOnClick={`project_grid_repo_${p.slug}`}
            className="text-[var(--muted)] underline-offset-4 hover:text-[var(--fg)] hover:underline"
          >
            Repo
          </ClarityTrackedAnchor>
        )}
      </div>
    </article>
  );
}

export function ProjectGrid({ title, items }: { title: string; items: CvProject[] }) {
  return (
    <section className="space-y-6">
      <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold sm:text-3xl">{title}</h2>
      <div className="grid gap-6 sm:grid-cols-2">
        {items.map((p) => (
          <ProjectCard key={p.slug} p={p} />
        ))}
      </div>
    </section>
  );
}
