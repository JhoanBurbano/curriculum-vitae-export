"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { CvProject } from "@/types/cv";
import { DUR_FAST, EASE_OUT_EXPO, STAGGER } from "@/lib/motion";

function ProjectCard({ p, index }: { p: CvProject; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: DUR_FAST, delay: index * STAGGER, ease: EASE_OUT_EXPO }}
      className="group flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 transition hover:border-[var(--accent)]/45"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-[family-name:var(--font-display)] text-xl font-bold tracking-tight">
          <Link href={`/projects/${p.slug}`} className="transition hover:text-[var(--accent-ink)]">
            {p.title}
          </Link>
        </h3>
        <span className="shrink-0 rounded-full bg-[var(--bg)] px-2 py-0.5 text-xs text-[var(--muted)]">{p.year}</span>
      </div>
      {(p.highlight || p.category) && (
        <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-[var(--accent-ink)]">{p.highlight ?? p.category}</p>
      )}
      <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--muted)]">{p.description}</p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {p.stack.slice(0, 4).map((s) => (
          <li key={s} className="rounded-md border border-[var(--border)] px-2 py-0.5 text-xs text-[var(--fg)]">
            {s}
          </li>
        ))}
      </ul>
      <Link href={`/projects/${p.slug}`} className="mt-5 text-sm font-semibold text-[var(--fg)] underline-offset-4 hover:text-[var(--accent-ink)] hover:underline">
        Ver caso →
      </Link>
    </motion.article>
  );
}

export function ProjectGrid({ title, items }: { title?: string; items: CvProject[] }) {
  return (
    <section className="space-y-6">
      {title ? <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold sm:text-3xl">{title}</h2> : null}
      <div className="grid gap-6 sm:grid-cols-2">
        {items.map((p, i) => (
          <ProjectCard key={p.slug} p={p} index={i} />
        ))}
      </div>
    </section>
  );
}
