"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { CvProject } from "@/types/cv";
import { DUR_FAST, EASE_OUT_EXPO, STAGGER } from "@/lib/motion";
import { Chip } from "@/components/ui/chip";
import { Badge } from "@/components/ui/badge";
import { Eyebrow } from "@/components/ui/eyebrow";
import { TextLink } from "@/components/ui/text-link";

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
        <Badge variant="quiet">{p.year}</Badge>
      </div>
      {(p.highlight || p.category) && (
        <Eyebrow tracking="label" className="mt-2">
          {p.highlight ?? p.category}
        </Eyebrow>
      )}
      <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--muted)]">{p.description}</p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {p.stack.slice(0, 4).map((s) => (
          <Chip key={s}>
            {s}
          </Chip>
        ))}
      </ul>
      <TextLink href={`/projects/${p.slug}`} arrow className="mt-5">
        Ver caso
      </TextLink>
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
