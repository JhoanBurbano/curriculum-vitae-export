import type { ReactNode } from "react";

/**
 * Ítem de una lista técnica: cada tecnología del stack de un proyecto.
 *
 * Distinto de `Badge` a propósito: el chip usa radio `md` en vez de `full` y no
 * lleva mayúsculas, porque es un dato que se lee ("React Native"), no una etiqueta
 * que se escanea. Van en listas de 4 a 6; más que eso, corta la lista.
 */
export function Chip({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <li className={`rounded-md border border-[var(--border)] px-2 py-0.5 text-xs text-[var(--fg)] ${className}`}>
      {children}
    </li>
  );
}
