import { ClarityTrackedLink } from "@/components/clarity-tracked-link";
import type { ServicePack } from "@/types/cv";

export function RequestServiceAside({ packs }: { packs: ServicePack[] }) {
  return (
    <aside className="flex flex-col gap-6 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">Cómo funciona</p>
        <ol className="mt-4 space-y-4 text-sm text-[var(--muted)]">
          <li className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-xs font-bold text-[var(--accent-fg)]">1</span>
            <span>
              <strong className="text-[var(--fg)]">Elige</strong> el tipo de trabajo (pack o servicio del catálogo).
            </span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[var(--border)] text-xs font-bold text-[var(--fg)]">2</span>
            <span>
              <strong className="text-[var(--fg)]">Detalla</strong> contexto, plazos y enlaces de referencia en el mensaje.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[var(--border)] text-xs font-bold text-[var(--fg)]">3</span>
            <span>
              <strong className="text-[var(--fg)]">Envía</strong>; te respondo habitualmente en{" "}
              <strong className="text-[var(--fg)]">24–48 h hábiles</strong> con siguientes pasos o preguntas puntuales.
            </span>
          </li>
        </ol>
      </div>
      <div className="border-t border-[var(--border)] pt-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">Packs rápidos</p>
        <ul className="mt-3 space-y-2">
          {packs.map((p) => (
            <li key={p.requestServiceId}>
              <ClarityTrackedLink
                href={`/request-service?service=${encodeURIComponent(p.requestServiceId)}`}
                clarityEventOnClick={`aside_pack_link_${p.requestServiceId.replace(/[^a-zA-Z0-9_-]/g, "_")}`}
                className="flex items-center justify-between gap-2 rounded-xl border border-[var(--border)] bg-[var(--bg)] px-3 py-2.5 text-sm font-medium transition hover:border-[var(--accent)]/50 hover:text-[var(--accent)]"
              >
                <span className="line-clamp-1">{p.title}</span>
                <span aria-hidden className="text-[var(--muted)]">
                  →
                </span>
              </ClarityTrackedLink>
            </li>
          ))}
        </ul>
      </div>
      <p className="rounded-xl border border-[var(--border)] bg-[var(--bg)]/80 p-4 text-xs leading-relaxed text-[var(--muted)]">
        Los precios “desde” son orientativos. La propuesta económica y el alcance se formalizan por escrito antes de cualquier cobro.
      </p>
      <ClarityTrackedLink
        href="/services"
        clarityEventOnClick="aside_back_to_services"
        className="text-center text-sm font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
      >
        ← Ver todos los servicios
      </ClarityTrackedLink>
    </aside>
  );
}
