import type { ButtonHTMLAttributes, ReactNode } from "react";

/**
 * Botón cuadrado de un solo glifo o icono: toggle de tema, abrir menú.
 *
 * Siempre lleva `aria-label`, porque su contenido es un símbolo y no un texto que
 * un lector de pantalla pueda anunciar. El tipo lo exige.
 */
export function IconButton({
  children,
  label,
  shape = "circle",
  className = "",
  ...rest
}: {
  children: ReactNode;
  /** Obligatorio: es la única descripción accesible del botón. */
  label: string;
  /** `circle` para acciones (tema); `square` para el menú, que se alinea con el isotipo. */
  shape?: "circle" | "square";
  className?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "aria-label" | "className" | "children">) {
  const size = shape === "circle" ? "h-9 w-9 rounded-full" : "h-10 w-10 rounded-lg";
  return (
    <button
      type="button"
      aria-label={label}
      className={`inline-flex ${size} items-center justify-center border border-[var(--border)] bg-[var(--surface)] text-sm text-[var(--fg)] transition hover:border-[var(--accent)] hover:text-[var(--accent-ink)] ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
