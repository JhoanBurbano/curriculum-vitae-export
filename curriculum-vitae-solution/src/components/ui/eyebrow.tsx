import type { ElementType, ReactNode } from "react";

/**
 * Etiqueta en mayúsculas con tracking abierto: la firma tipográfica de la marca.
 * Va encima de un título de sección, como label dentro de una card, o como
 * `legend` de un formulario.
 *
 * Contrato del design system JSB (`components/core/Eyebrow`), con dos ajustes
 * deliberados sobre él:
 *
 * 1. `size`. El DS documenta el eyebrow solo a 10px, pero el sitio siempre tuvo
 *    dos tamaños con roles distintos: 12px para eyebrows de sección y 10px para
 *    labels dentro de una card. Forzar 10px en todas partes sería una regresión,
 *    así que el componente expone ambos y el DS se corrige, no el código.
 * 2. `tone="warning"`. El DS define accent y muted; el disclaimer de cotización
 *    necesita el tono de advertencia, que ya es un token del sistema.
 */
export type EyebrowTone = "accent" | "muted" | "warning";
export type EyebrowTracking = "eyebrow" | "label" | "field";

const TONE: Record<EyebrowTone, string> = {
  accent: "text-[var(--accent-ink)]",
  muted: "text-[var(--muted)]",
  warning: "text-[var(--warning-ink)]",
};

/** Mapa explícito y no `font-${weight}`: Tailwind escanea clases literales y una
 *  clase construida en runtime no se generaría. */
const WEIGHT = { medium: "font-medium", semibold: "font-semibold", bold: "font-bold" } as const;

const TRACKING: Record<EyebrowTracking, string> = {
  eyebrow: "tracking-eyebrow",
  label: "tracking-label",
  field: "tracking-field",
};

export function Eyebrow({
  children,
  as: Tag = "p" as ElementType,
  tone = "accent",
  tracking = "eyebrow",
  size = "md",
  weight = "semibold",
  className = "",
}: {
  children: ReactNode;
  as?: ElementType;
  tone?: EyebrowTone;
  tracking?: EyebrowTracking;
  /** `md` = 12px, eyebrow de sección. `sm` = 10px, label dentro de una card. */
  size?: "sm" | "md";
  weight?: "medium" | "semibold" | "bold";
  className?: string;
}) {
  return (
    <Tag
      className={`${size === "sm" ? "text-eyebrow" : "text-xs"} ${WEIGHT[weight]} uppercase ${
        TRACKING[tracking]
      } ${TONE[tone]} ${className}`}
    >
      {children}
    </Tag>
  );
}
