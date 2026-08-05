import type { CvTestimonial } from "@/types/cv";
import { Eyebrow } from "@/components/ui/eyebrow";

/**
 * Prueba social de terceros.
 *
 * Hoy `cv-copy.json` trae `testimonials: []`, así que esta sección no se
 * renderiza: **no se inventan testimonios**. El hueco está hecho a propósito
 * para que rellenarlo cueste dos minutos, porque en venta de servicios es el
 * activo de conversión número uno y es lo único que el sitio no puede afirmar
 * sobre sí mismo.
 *
 * Formato en `cv-copy.json`:
 *   { "quote": "...", "author": "Nombre", "role": "Cargo, Empresa", "url": "https://…" }
 */
export function Testimonials({ items }: { items?: CvTestimonial[] }) {
  if (!items || items.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl border-t border-[var(--border)] px-4 py-16 sm:px-6 sm:py-20">
      <Eyebrow>Lo que dicen</Eyebrow>
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {items.map((t) => (
          <figure key={t.author} className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
            <blockquote className="text-base leading-relaxed text-[var(--fg)]">“{t.quote}”</blockquote>
            <figcaption className="mt-4 border-t border-[var(--border)] pt-4 text-sm">
              <span className="font-semibold">{t.author}</span>
              <span className="text-[var(--muted)]"> · {t.role}</span>
              {t.url && (
                <>
                  {" "}
                  <a
                    href={t.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[var(--muted)] underline-offset-4 hover:text-[var(--accent-ink)] hover:underline"
                  >
                    ↗
                  </a>
                </>
              )}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
