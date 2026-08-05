"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { clarityEvent } from "@/lib/analytics/clarity";
import { DUR_BASE, DUR_FAST, EASE_INOUT_QUINT, STAGGER } from "@/lib/motion";
import { Eyebrow } from "@/components/ui/eyebrow";
import { IconButton } from "@/components/ui/icon-button";

function navClarityEvent(href: string) {
  const suffix = href === "/" ? "home" : href.slice(1).replace(/\//g, "_");
  clarityEvent(`nav_click_${suffix}`);
}

const links = [
  { href: "/", label: "Inicio" },
  { href: "/experience", label: "Experiencia" },
  { href: "/projects", label: "Proyectos" },
  { href: "/blog", label: "Blog" },
  { href: "/services", label: "Servicios" },
  { href: "/request-service", label: "Solicitar" },
  // El CV vive en el footer, no aquí. Compitiendo con la oferta comercial en el
  // nav, un comprador leía "busco empleo" y un reclutador leía "vendo packs":
  // cada audiencia descontaba la señal de la otra.
] as const;

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  function onNavigate(href: string) {
    setOpen(false);
    navClarityEvent(href);
  }

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
          onClick={() => onNavigate("/")}
          className="group inline-flex items-center gap-2 rounded-lg outline-none ring-[var(--accent)] ring-offset-2 ring-offset-[var(--bg)] focus-visible:ring-2"
        >
          <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-lg bg-black shadow-sm ring-1 ring-white/15 transition group-hover:ring-[var(--accent)]/50 sm:h-10 sm:w-10">
            <Image src="/js-isotype.png" alt="Isotipo JS — inicio" fill className="object-contain p-1" sizes="40px" priority />
          </span>
          <Eyebrow as="span" size="sm" weight="medium" tone="muted" className="hidden sm:inline">folio</Eyebrow>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => {
            // Las secciones con detalle (/blog/[slug], /projects/[slug]) mantienen su pill activo.
            const active = l.href === "/" ? pathname === "/" : pathname === l.href || pathname.startsWith(`${l.href}/`);
            return (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => onNavigate(l.href)}
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
          <IconButton
            shape="square"
            label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            className="flex-col gap-1.5 md:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            <motion.span animate={{ rotate: open ? 45 : 0, y: open ? 6 : 0 }} className="h-0.5 w-5 bg-[var(--fg)]" />
            <motion.span animate={{ opacity: open ? 0 : 1 }} className="h-0.5 w-5 bg-[var(--fg)]" />
            <motion.span animate={{ rotate: open ? -45 : 0, y: open ? -6 : 0 }} className="h-0.5 w-5 bg-[var(--fg)]" />
          </IconButton>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 100% 0%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: DUR_BASE, ease: EASE_INOUT_QUINT }}
            className="fixed inset-0 top-14 z-40 flex flex-col bg-[var(--bg)] px-6 pb-10 pt-8 md:hidden"
          >
            <nav className="flex flex-1 flex-col justify-center gap-2">
              {links.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: STAGGER * i, duration: DUR_FAST }}
                >
                  <Link
                    href={l.href}
                    onClick={() => onNavigate(l.href)}
                    className="block font-[family-name:var(--font-display)] text-4xl font-bold leading-tight tracking-tight text-[var(--fg)] transition hover:text-[var(--accent-ink)]"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <Eyebrow tone="muted">Navegación</Eyebrow>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
