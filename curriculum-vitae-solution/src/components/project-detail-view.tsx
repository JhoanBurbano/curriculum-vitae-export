"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ClarityTrackedAnchor } from "@/components/clarity-tracked-anchor";
import type { ProjectWithKind } from "@/lib/projects";
import { EASE_OUT_EXPO } from "@/lib/motion";

const ease = EASE_OUT_EXPO;

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
};

function SectionBlock({
  eyebrow,
  title,
  children,
  delay = 0,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.section
      initial={fadeUp.initial}
      animate={fadeUp.animate}
      transition={{ duration: 0.45, delay, ease }}
      className="scroll-mt-24"
    >
      <p className="text-eyebrow font-bold uppercase tracking-eyebrow text-[var(--accent-ink)]">{eyebrow}</p>
      <h2 className="mt-2 font-[family-name:var(--font-display)] text-xl font-bold tracking-tight sm:text-2xl">{title}</h2>
      <div className="mt-4 text-base leading-relaxed text-[var(--muted)] sm:text-lg">{children}</div>
    </motion.section>
  );
}

export function ProjectDetailView({
  project,
  related,
}: {
  project: ProjectWithKind;
  related: ProjectWithKind[];
}) {
  const web = project.webUrl ?? project.url;
  const kindLabel = project.kind === "web" ? "Web" : "Mobile";

  return (
    <article className="relative">
      <div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-[var(--accent)]/10 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -right-16 top-40 h-64 w-64 rounded-full bg-[var(--accent-2)]/15 blur-3xl" aria-hidden />

      <div className="relative mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
        <motion.div initial={fadeUp.initial} animate={fadeUp.animate} transition={{ duration: 0.4, ease }}>
          <Link href="/projects" className="text-sm font-semibold text-[var(--muted)] transition hover:text-[var(--accent-ink)]">
            ← Todos los proyectos
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-2.5 py-0.5 text-eyebrow font-semibold uppercase tracking-field text-[var(--muted)]">
              {project.category ?? kindLabel}
            </span>
            {project.highlight && (
              <span className="rounded-full bg-[var(--accent)]/15 px-2.5 py-0.5 text-eyebrow font-bold uppercase tracking-label text-[var(--accent-ink)]">
                {project.highlight}
              </span>
            )}
            <span className="text-xs text-[var(--muted)]">{project.year}</span>
          </div>

          <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
            {project.title}
          </h1>
          {project.role && <p className="mt-3 text-sm font-medium text-[var(--accent-ink)] sm:text-base">{project.role}</p>}
          <p className="mt-5 text-lg leading-relaxed text-[var(--muted)] sm:text-xl">{project.description}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            {web && (
              <ClarityTrackedAnchor
                href={web}
                target="_blank"
                rel="noopener noreferrer"
                clarityEventOnClick={`project_detail_web_${project.slug}`}
                className="inline-flex rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-bold text-[var(--accent-fg)] transition hover:brightness-110"
              >
                Abrir producto
              </ClarityTrackedAnchor>
            )}
            {project.appUrl && (
              <ClarityTrackedAnchor
                href={project.appUrl}
                target="_blank"
                rel="noopener noreferrer"
                clarityEventOnClick={`project_detail_app_${project.slug}`}
                className="inline-flex rounded-full border border-[var(--border)] bg-[var(--surface)] px-5 py-2.5 text-sm font-semibold transition hover:border-[var(--accent)]"
              >
                App / store
              </ClarityTrackedAnchor>
            )}
            {project.repoUrl && (
              <ClarityTrackedAnchor
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                clarityEventOnClick={`project_detail_repo_${project.slug}`}
                className="inline-flex rounded-full border border-[var(--border)] px-5 py-2.5 text-sm font-semibold text-[var(--muted)] transition hover:border-[var(--accent)] hover:text-[var(--fg)]"
              >
                Repositorio
              </ClarityTrackedAnchor>
            )}
          </div>
        </motion.div>

        <div className="mt-16 space-y-14 border-t border-[var(--border)] pt-14">
          {project.problem && (
            <SectionBlock eyebrow="01" title="El problema" delay={0.08}>
              <p>{project.problem}</p>
            </SectionBlock>
          )}
          {project.productApproach && (
            <SectionBlock eyebrow="02" title="Enfoque de producto" delay={0.12}>
              <p>{project.productApproach}</p>
            </SectionBlock>
          )}
          {project.aiLeverage && (
            <SectionBlock eyebrow="03" title="AI leverage" delay={0.16}>
              <p>{project.aiLeverage}</p>
            </SectionBlock>
          )}
          {project.outcomes && project.outcomes.length > 0 && (
            <SectionBlock eyebrow="04" title="Resultados" delay={0.2}>
              <ul className="space-y-3">
                {project.outcomes.map((o) => (
                  <li key={o} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" aria-hidden />
                    <span>{o}</span>
                  </li>
                ))}
              </ul>
            </SectionBlock>
          )}

          <SectionBlock eyebrow="05" title="Contexto adicional" delay={0.24}>
            <div className="space-y-4">
              {project.detailParagraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </SectionBlock>

          <motion.div initial={fadeUp.initial} animate={fadeUp.animate} transition={{ duration: 0.45, delay: 0.28, ease }}>
            <p className="text-eyebrow font-bold uppercase tracking-eyebrow text-[var(--accent-ink)]">Stack</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <li key={s} className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-xs font-medium">
                  {s}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {related.length > 0 && (
          <motion.aside
            initial={fadeUp.initial}
            animate={fadeUp.animate}
            transition={{ duration: 0.45, delay: 0.32, ease }}
            className="mt-20 border-t border-[var(--border)] pt-12"
          >
            <p className="text-xs font-semibold uppercase tracking-eyebrow text-[var(--muted)]">También mira</p>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/projects/${r.slug}`}
                    className="group block rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 transition hover:border-[var(--accent)]/50"
                  >
                    <p className="text-eyebrow font-semibold uppercase tracking-wider text-[var(--accent-ink)]">{r.category ?? r.kind}</p>
                    <p className="mt-2 font-[family-name:var(--font-display)] text-lg font-bold group-hover:text-[var(--accent-ink)]">{r.title}</p>
                    <p className="mt-2 line-clamp-2 text-sm text-[var(--muted)]">{r.description}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.aside>
        )}

        <div className="mt-16 flex flex-wrap gap-3 border-t border-[var(--border)] pt-10">
          <Link
            href="/request-service"
            className="inline-flex rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-bold text-[var(--accent-fg)] hover:brightness-110"
          >
            Solicitar un proyecto similar
          </Link>
          <Link
            href="/services"
            className="inline-flex rounded-full border border-[var(--border)] bg-[var(--surface)] px-5 py-2.5 text-sm font-semibold hover:border-[var(--accent)]"
          >
            Ver servicios
          </Link>
        </div>
      </div>
    </article>
  );
}
