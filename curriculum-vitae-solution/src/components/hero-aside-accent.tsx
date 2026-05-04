"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { HeroAsideConfig } from "@/types/cv";

function parseExperienceYears(summary: string): number {
  const plus = summary.match(/(\d+)\s*\+\s*(years|años)/i) ?? summary.match(/(\d+)\s*\+/);
  if (plus) {
    const n = parseInt(plus[1], 10);
    if (!Number.isNaN(n) && n > 0 && n < 50) return n;
  }
  return 8;
}

/**
 * Chip hero: base casi negra + brillo verde arriba (radial), borde neón único,
 * sombra profunda. Un poco más ancho para líneas tipo "Fintech & pagos".
 */
const shellClass =
  "absolute -bottom-4 -right-4 z-10 hidden min-h-[7rem] w-[7.35rem] max-w-[9.5rem] flex-col items-center justify-center gap-1 rounded-2xl px-2.5 py-2 text-center sm:flex " +
  "border border-[var(--accent)] " +
  "bg-[radial-gradient(ellipse_95%_80%_at_50%_-35%,rgba(74,222,128,0.2),transparent_52%),linear-gradient(168deg,#0f2418_0%,#060a07_52%,#020302_100%)] " +
  "shadow-[inset_0_1px_0_rgba(255,255,255,0.07),inset_0_-18px_28px_rgba(0,0,0,0.42),0_0_0_1px_rgba(204,255,0,0.1),0_14px_40px_rgba(0,0,0,0.55),0_0_36px_-8px_rgba(204,255,0,0.18)]";

function YearsBlock({ professionalSummary }: { professionalSummary: string }) {
  const target = parseExperienceYears(professionalSummary);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (target <= 0) return;
    let cancelled = false;
    let raf = 0;
    const duration = 850;
    const t0 = performance.now();
    const step = (now: number) => {
      if (cancelled) return;
      const p = Math.min(1, (now - t0) / duration);
      const eased = 1 - (1 - p) ** 3;
      setDisplay(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [target]);

  return (
    <motion.aside
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.45, duration: 0.35 }}
      aria-label={`Más de ${target} años construyendo producto`}
      className={shellClass}
    >
      <div aria-hidden className="flex flex-col items-center justify-center">
        <span className="font-[family-name:var(--font-display)] text-2xl font-extrabold leading-none tracking-tight text-[var(--accent)] tabular-nums [text-shadow:0_2px_18px_rgba(0,0,0,0.55)]">
          {display}+
        </span>
        <span className="mt-1 text-[9px] font-semibold uppercase tracking-[0.22em] text-[#c8f090]/90">años</span>
      </div>
    </motion.aside>
  );
}

function StatBlock({ primary, secondary }: { primary: string; secondary: string }) {
  return (
    <motion.aside
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.45, duration: 0.35 }}
      aria-label={`${primary}, ${secondary}`}
      className={shellClass}
    >
      <div aria-hidden className="flex max-w-full flex-col items-center justify-center gap-0.5">
        <span className="max-w-full truncate font-[family-name:var(--font-display)] text-lg font-extrabold leading-none tracking-tight text-[var(--accent)] [text-shadow:0_2px_14px_rgba(0,0,0,0.5)]">
          {primary}
        </span>
        <span className="max-w-full text-[9px] font-semibold uppercase leading-tight tracking-[0.18em] text-[#c8f090]/90">{secondary}</span>
      </div>
    </motion.aside>
  );
}

function RotateBlock({ lines, intervalMs }: { lines: string[]; intervalMs: number }) {
  const safe = lines.filter(Boolean);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (safe.length < 2) return;
    const t = window.setInterval(() => setIdx((i) => (i + 1) % safe.length), intervalMs);
    return () => window.clearInterval(t);
  }, [safe.length, intervalMs]);

  if (safe.length === 0) return null;
  const line = safe[Math.min(idx, safe.length - 1)];

  return (
    <motion.aside
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.45, duration: 0.35 }}
      aria-live="polite"
      aria-label={line}
      className={shellClass}
    >
      <div className="relative flex min-h-[3.25rem] w-full items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={line}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.22 }}
            className="line-clamp-2 max-h-[3.4rem] px-0.5 text-[11px] font-semibold leading-[1.25] tracking-tight text-[#ecfccb] [text-shadow:0_1px_14px_rgba(0,0,0,0.75)]"
          >
            {line}
          </motion.p>
        </AnimatePresence>
      </div>
      {safe.length > 1 && (
        <div className="flex gap-1" aria-hidden>
          {safe.map((_, i) => (
            <span
              key={i}
              className={`h-1 w-1 rounded-full ${i === idx % safe.length ? "bg-[var(--accent)] shadow-[0_0_10px_rgba(204,255,0,0.55)]" : "bg-white/18"}`}
            />
          ))}
        </div>
      )}
    </motion.aside>
  );
}

function ProjectsBlock({ count }: { count: number }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (count <= 0) return;
    let cancelled = false;
    let raf = 0;
    const duration = 700;
    const t0 = performance.now();
    const step = (now: number) => {
      if (cancelled) return;
      const p = Math.min(1, (now - t0) / duration);
      const eased = 1 - (1 - p) ** 3;
      setDisplay(Math.round(eased * count));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [count]);

  return (
    <motion.aside
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.45, duration: 0.35 }}
      aria-label={`${count} proyectos en este portafolio`}
      className={shellClass}
    >
      <span className="font-[family-name:var(--font-display)] text-2xl font-extrabold leading-none text-[var(--accent)] tabular-nums [text-shadow:0_2px_18px_rgba(0,0,0,0.55)]">{display}</span>
      <span className="mt-1 text-[9px] font-semibold uppercase tracking-[0.22em] text-[#c8f090]/90">casos</span>
    </motion.aside>
  );
}

export function HeroAsideAccent({
  heroAside,
  professionalSummary,
  projectCount,
}: {
  heroAside?: HeroAsideConfig;
  professionalSummary: string;
  projectCount: number;
}) {
  const variant = heroAside?.variant ?? "years";

  if (variant === "stat" && heroAside?.statPrimary && heroAside?.statSecondary) {
    return <StatBlock primary={heroAside.statPrimary} secondary={heroAside.statSecondary} />;
  }

  if (variant === "rotate" && heroAside?.rotateLines && heroAside.rotateLines.length > 0) {
    return <RotateBlock lines={heroAside.rotateLines} intervalMs={heroAside.rotateIntervalMs ?? 3200} />;
  }

  if (variant === "projects") {
    return <ProjectsBlock count={projectCount} />;
  }

  return <YearsBlock professionalSummary={professionalSummary} />;
}
