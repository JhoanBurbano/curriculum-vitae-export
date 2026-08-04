import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Link de texto en línea: el "Ver caso →" al pie de una card, o un link de nota.
 *
 * Regla del design system: **nunca lima en reposo**. El acento entra en hover,
 * junto con el subrayado a offset 4px. Por eso el color de reposo lo decide
 * `muted`, no el componente que lo usa.
 *
 * Para links que necesitan evento de Clarity existe `ClarityTrackedLink`, que es
 * otra responsabilidad: este componente es solo apariencia.
 */
export function TextLink({
  href,
  children,
  arrow = false,
  muted = false,
  external = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  /** Añade la flecha del sistema. */
  arrow?: boolean;
  /** Reposo en `--muted` en vez de `--fg`: links de nota y de footer. */
  muted?: boolean;
  external?: boolean;
  className?: string;
}) {
  const classes = `text-sm font-semibold underline-offset-4 transition hover:text-[var(--accent-ink)] hover:underline ${
    muted ? "text-[var(--muted)] font-medium" : "text-[var(--fg)]"
  } ${className}`;

  const content = (
    <>
      {children}
      {arrow && <span aria-hidden> →</span>}
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={classes}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
