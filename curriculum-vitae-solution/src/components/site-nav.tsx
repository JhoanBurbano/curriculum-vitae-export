"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { clarityEvent } from "@/lib/analytics/clarity";

function navClarityEvent(href: string) {
  const suffix = href === "/" ? "home" : href.slice(1).replace(/\//g, "_");
  clarityEvent(`nav_click_${suffix}`);
}

const links = [
  { href: "/", label: "Inicio" },
  { href: "/experience", label: "Experiencia" },
  { href: "/projects", label: "Proyectos" },
  { href: "/services", label: "Servicios" },
  { href: "/request-service", label: "Solicitar" },
  { href: "/cv", label: "CV" },
] as const;

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <header className="no-print sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--bg)]/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:h-16 sm:px-6">
        <Link
          href="/"
          onClick={() => navClarityEvent("/")}
          className="group flex items-baseline gap-1 font-[family-name:var(--font-display)] text-lg font-bold tracking-tight sm:text-xl"
        >
          <span className="transition group-hover:-skew-x-6">JB</span>
          <span className="hidden text-[10px] font-medium uppercase tracking-[0.35em] text-[var(--muted)] sm:inline">folio</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => navClarityEvent(l.href)}
                className="relative px-3 py-2 text-sm font-medium text-[var(--muted)] transition hover:text-[var(--fg)]"
              >
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-[var(--surface)] ring-1 ring-[var(--border)]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <motion.span whileHover={{ y: -1 }} className="inline-block">
                  {l.label}
                </motion.span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] md:hidden"
            aria-expanded={open}
            aria-label="Abrir menú"
            onClick={() => setOpen((v) => !v)}
          >
            <motion.span animate={{ rotate: open ? 45 : 0, y: open ? 6 : 0 }} className="h-0.5 w-5 bg-[var(--fg)]" />
            <motion.span animate={{ opacity: open ? 0 : 1 }} className="h-0.5 w-5 bg-[var(--fg)]" />
            <motion.span animate={{ rotate: open ? -45 : 0, y: open ? -6 : 0 }} className="h-0.5 w-5 bg-[var(--fg)]" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 100% 0%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 top-14 z-40 flex flex-col bg-[var(--bg)] px-6 pb-10 pt-8 md:hidden"
          >
            <nav className="flex flex-1 flex-col justify-center gap-2">
              {links.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.35 }}
                >
                  <Link
                    href={l.href}
                    onClick={() => navClarityEvent(l.href)}
                    className="block font-[family-name:var(--font-display)] text-4xl font-bold leading-tight tracking-tight text-[var(--fg)] transition hover:text-[var(--accent)]"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">Navegación</p>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
