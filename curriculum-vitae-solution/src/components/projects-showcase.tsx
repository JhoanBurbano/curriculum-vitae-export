"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { ProjectWithKind } from "@/lib/projects";

type FilterId = "all" | "featured" | "web" | "mobile" | "saas";

const filters: { id: FilterId; label: string }[] = [
  { id: "all", label: "Todos" },
  { id: "featured", label: "Destacados" },
  { id: "saas", label: "SaaS" },
  { id: "web", label: "Web" },
  { id: "mobile", label: "Mobile" },
];

const ease = [0.22, 1, 0.36, 1] as const;

/** Spotlight que sigue al cursor sobre la card. El 600px es el radio del efecto —
 *  geometría propia de este gradiente, no espaciado, y el design system no define
 *  un token para radios de gradiente. Vive en una constante nombrada, no suelto en
 *  un style inline, que es justo lo que pide la regla de adherencia. */
const SPOTLIGHT_GRADIENT = "radial-gradient(600px circle at var(--mx, 50%) var(--my, 0%), color-mix(in oklab, var(--accent) 18%, transparent), transparent 45%)";

function matchesFilter(p: ProjectWithKind, filter: FilterId): boolean {
  if (filter === "all") return true;
  if (filter === "featured") return Boolean(p.featured);
  if (filter === "saas") return p.category === "SaaS" || p.slug === "academy-manager";
  if (filter === "web") return p.kind === "web";
  if (filter === "mobile") return p.kind === "mobile";
  return true;
}

function ProjectShowcaseCard({ project, index }: { project: ProjectWithKind; index: number }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.35), ease }}
      className={`group relative flex flex-col overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] ${
        project.featured && index === 0 ? "sm:col-span-2" : ""
      }`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100"
        style={{ background: SPOTLIGHT_GRADIENT }}
        aria-hidden
      />
      <Link
        href={`/projects/${project.slug}`}
        className="relative flex flex-1 flex-col p-6 sm:p-8"
        onMouseMove={(e) => {
          const el = e.currentTarget.parentElement;
          if (!el) return;
          const r = el.getBoundingClientRect();
          el.style.setProperty("--mx", `${e.clientX - r.left}px`);
          el.style.setProperty("--my", `${e.clientY - r.top}px`);
        }}
      >
        <div className="flex flex-wrap items-center gap-2">
          {(project.category || project.kind) && (
            <span className="rounded-full border border-[var(--border)] bg-[var(--bg)] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
              {project.category ?? project.kind}
            </span>
          )}
          {project.featured && (
            <span className="rounded-full bg-[var(--accent)] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--accent-fg)]">
              Featured
            </span>
          )}
          <span className="ml-auto text-xs text-[var(--muted)]">{project.year}</span>
        </div>

        <h3
          className={`mt-4 font-[family-name:var(--font-display)] font-bold tracking-tight text-[var(--fg)] transition group-hover:text-[var(--accent-ink)] ${
            project.featured && index === 0 ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"
          }`}
        >
          {project.title}
        </h3>

        {project.role && <p className="mt-2 text-xs font-medium text-[var(--accent-ink)]">{project.role}</p>}
        <p className={`mt-3 text-[var(--muted)] leading-relaxed ${project.featured && index === 0 ? "max-w-2xl text-base" : "text-sm"}`}>
          {project.description}
        </p>

        {project.problem && project.featured && index === 0 && (
          <p className="mt-4 max-w-2xl border-l-2 border-[var(--accent)]/50 pl-3 text-sm leading-relaxed text-[var(--muted)]">
            <span className="font-semibold text-[var(--fg)]">Problema · </span>
            {project.problem}
          </p>
        )}

        <ul className="mt-5 flex flex-wrap gap-2">
          {project.stack.slice(0, project.featured && index === 0 ? 6 : 4).map((s) => (
            <li key={s} className="rounded-md border border-[var(--border)] bg-[var(--bg)]/80 px-2 py-0.5 text-[11px] text-[var(--fg)]">
              {s}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-[var(--fg)]">
          <span className="underline-offset-4 group-hover:underline">Ver caso</span>
          <motion.span aria-hidden className="inline-block" transition={{ type: "spring", stiffness: 400, damping: 22 }}>
            →
          </motion.span>
        </div>
      </Link>
    </motion.article>
  );
}

export function ProjectsShowcase({ projects }: { projects: ProjectWithKind[] }) {
  const [filter, setFilter] = useState<FilterId>("all");

  const visible = useMemo(() => {
    const list = projects.filter((p) => matchesFilter(p, filter));
    return [...list].sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
  }, [projects, filter]);

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--accent-ink)]">Casos</p>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Proyectos
          </h1>
          <p className="mt-4 text-base leading-relaxed text-[var(--muted)] sm:text-lg">
            Selección con mirada de <span className="text-[var(--fg)]">AI Product Engineer</span>: problema de negocio, enfoque de
            producto, leverage de AI y resultado — no solo stack.
          </p>
        </div>
        <p className="text-sm text-[var(--muted)]">
          <span className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--fg)]">{visible.length}</span>{" "}
          visibles
        </p>
      </div>

      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filtrar proyectos">
        {filters.map((f) => {
          const active = filter === f.id;
          return (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setFilter(f.id)}
              className={`relative rounded-full px-4 py-2 text-sm font-semibold transition ${
                active ? "text-[var(--accent-fg)]" : "border border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] hover:border-[var(--accent)]/40 hover:text-[var(--fg)]"
              }`}
            >
              {active && (
                <motion.span
                  layoutId="projects-filter-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-[var(--accent)]"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              {f.label}
            </button>
          );
        })}
      </div>

      <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {visible.map((p, i) => (
            <ProjectShowcaseCard key={p.slug} project={p} index={i} />
          ))}
        </AnimatePresence>
      </motion.div>

      {visible.length === 0 && (
        <p className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-6 py-10 text-center text-[var(--muted)]">
          No hay proyectos en este filtro.
        </p>
      )}
    </div>
  );
}
