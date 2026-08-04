import type { ReactNode } from "react";

/**
 * Feedback en bloque después de enviar un formulario.
 *
 * Copy directo, sin exclamaciones — regla de tono del design system. El éxito usa
 * el acento al 10% con borde al 30%; el error usa rojo semántico, que es el único
 * color fuera de la paleta de marca que el sistema permite, porque un fallo no
 * puede leerse como parte del branding.
 */
export function Message({ children, tone = "success" }: { children: ReactNode; tone?: "success" | "error" }) {
  const error = tone === "error";
  return (
    <p
      role={error ? "alert" : "status"}
      className={`rounded-xl border px-4 py-3 text-sm ${
        error
          ? "border-[rgba(239,68,68,0.4)] bg-[rgba(239,68,68,0.1)] text-red-600 dark:text-red-400"
          : "border-[var(--accent)]/30 bg-[var(--accent)]/10 font-medium text-[var(--fg)]"
      }`}
    >
      {children}
    </p>
  );
}
