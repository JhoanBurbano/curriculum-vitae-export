import type { ReactNode } from "react";

/**
 * Etiqueta corta dentro de una card.
 *
 * El design system documenta dos variantes (`label` y `pill`), pero el sitio usa
 * tres formas distintas con significados distintos, así que el componente expone
 * las tres y el DS se actualiza para reflejarlo:
 *
 * - `outline`: categoría o tema. Borde 1px, mayúsculas, muted. La más común.
 * - `solid`:   destacado. Relleno lima con tinta casi negra — un solo uso por card.
 * - `quiet`:   dato secundario, como el año. Sin borde, sin mayúsculas.
 */
export type BadgeVariant = "outline" | "solid" | "quiet";

const VARIANT: Record<BadgeVariant, string> = {
  outline:
    "border border-[var(--border)] bg-[var(--bg)] text-eyebrow font-semibold uppercase tracking-label text-[var(--muted)]",
  solid: "bg-[var(--accent)] text-eyebrow font-bold uppercase tracking-label text-[var(--accent-fg)]",
  quiet: "bg-[var(--bg)] text-xs text-[var(--muted)]",
};

export function Badge({
  children,
  variant = "outline",
  className = "",
}: {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}) {
  return (
    <span className={`shrink-0 rounded-full px-2.5 py-0.5 ${VARIANT[variant]} ${className}`}>{children}</span>
  );
}
