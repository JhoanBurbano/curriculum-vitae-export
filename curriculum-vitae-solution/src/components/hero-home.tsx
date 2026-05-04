"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { CvCopy } from "@/types/cv";
import { HeroAsideAccent } from "@/components/hero-aside-accent";
import { getAllProjects } from "@/lib/projects";

export function HeroHome({ data }: { data: CvCopy }) {
  return (
    <section className="relative overflow-hidden border-b border-[var(--border)]">
      <div className="pointer-events-none absolute -right-24 top-0 h-96 w-96 rounded-full bg-[var(--accent)]/15 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-[var(--accent-2)]/20 blur-3xl" />

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:grid-cols-[1.1fr_0.9fr] sm:items-center sm:gap-12 sm:px-6 sm:py-24">
        <div>
          <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--accent)]">
            Portafolio
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.45 }}
            className="mt-4 font-[family-name:var(--font-display)] text-5xl font-bold leading-[0.95] tracking-tight sm:text-6xl md:text-7xl"
          >
            <span className="block">{data.header.nameLine1}</span>
            <span className="block text-[var(--accent)]">{data.header.nameLine2}</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mt-6 max-w-xl text-base text-[var(--muted)] sm:text-lg">
            {data.header.subtitle}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 }} className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/request-service"
              className="inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-[var(--accent-fg)] transition hover:brightness-110"
            >
              Solicitar servicio
            </Link>
            <Link href="/cv" className="inline-flex items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] px-6 py-3 text-sm font-semibold transition hover:border-[var(--accent)]">
              Exportar CV
            </Link>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15, duration: 0.5 }} className="relative mx-auto w-full max-w-sm">
          <div className="relative aspect-square overflow-hidden rounded-3xl ring-1 ring-[var(--border)] ring-offset-4 ring-offset-[var(--bg)]">
            <Image
              src={data.header.image}
              alt={`${data.header.nameLine1} ${data.header.nameLine2}`}
              fill
              className="object-cover object-[50%_22%]"
              priority
              sizes="(max-width: 768px) 100vw, 400px"
              unoptimized={data.header.image.endsWith(".svg")}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--bg)]/60 to-transparent" />
          </div>
          <HeroAsideAccent
            heroAside={data.heroAside}
            professionalSummary={data.professionalSummary}
            projectCount={getAllProjects(data).length}
          />
        </motion.div>
      </div>
    </section>
  );
}
