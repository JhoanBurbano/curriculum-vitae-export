import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ClarityTrackedAnchor } from "@/components/clarity-tracked-anchor";
import { PageMotion } from "@/providers/page-motion";
import { getCv } from "@/lib/cv";
import { getAllProjects, getProjectBySlug } from "@/lib/projects";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  const cv = getCv();
  return getAllProjects(cv).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getProjectBySlug(getCv(), slug);
  if (!p) return { title: "Proyecto" };
  return {
    title: p.title,
    description: p.description,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const c = getCv();
  const p = getProjectBySlug(c, slug);
  if (!p) notFound();

  const web = p.webUrl ?? p.url;
  const app = p.appUrl;

  return (
    <PageMotion>
      <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--accent)]">{p.kind === "web" ? "Web" : "Mobile"}</p>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight sm:text-5xl">{p.title}</h1>
        <p className="mt-2 text-sm text-[var(--muted)]">{p.year}</p>
        {p.highlight && <p className="mt-2 text-sm font-medium text-[var(--accent)]">{p.highlight}</p>}
        <p className="mt-6 text-lg leading-relaxed text-[var(--muted)]">{p.description}</p>

        <div className="mt-8 flex flex-wrap gap-3">
          {web && (
            <ClarityTrackedAnchor
              href={web}
              target="_blank"
              rel="noopener noreferrer"
              clarityEventOnClick={`project_detail_web_${p.slug}`}
              className="inline-flex rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-[var(--accent-fg)] hover:brightness-110"
            >
              Sitio web
            </ClarityTrackedAnchor>
          )}
          {app && (
            <ClarityTrackedAnchor
              href={app}
              target="_blank"
              rel="noopener noreferrer"
              clarityEventOnClick={`project_detail_app_${p.slug}`}
              className="inline-flex rounded-full border border-[var(--border)] bg-[var(--surface)] px-5 py-2.5 text-sm font-semibold hover:border-[var(--accent)]"
            >
              App / tienda
            </ClarityTrackedAnchor>
          )}
          {p.repoUrl && (
            <ClarityTrackedAnchor
              href={p.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              clarityEventOnClick={`project_detail_repo_${p.slug}`}
              className="inline-flex rounded-full border border-[var(--border)] px-5 py-2.5 text-sm font-semibold text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--fg)]"
            >
              Código
            </ClarityTrackedAnchor>
          )}
        </div>

        <div className="mt-10 flex flex-wrap gap-2">
          {p.stack.map((s) => (
            <span key={s} className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1 text-xs">
              {s}
            </span>
          ))}
        </div>

        <div className="mt-12 space-y-4">
          {p.detailParagraphs.map((para, i) => (
            <p key={i} className="text-base leading-relaxed text-[var(--muted)]">
              {para}
            </p>
          ))}
        </div>

        <Link href="/projects" className="mt-14 inline-block text-sm font-semibold text-[var(--accent)] underline-offset-4 hover:underline">
          ← Todos los proyectos
        </Link>
      </article>
    </PageMotion>
  );
}
