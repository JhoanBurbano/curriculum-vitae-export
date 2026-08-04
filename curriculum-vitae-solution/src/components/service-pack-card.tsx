import { ClarityTrackedLink } from "@/components/clarity-tracked-link";
import type { ServicePack } from "@/types/cv";

/** Tarjeta compacta de pack (grid en /services) */
export function ServicePackCard({ pack }: { pack: ServicePack }) {
  const href = `/request-service?service=${encodeURIComponent(pack.requestServiceId)}`;
  const cta = pack.ctaLabel ?? "Solicitar cotización";
  const previewIncludes = pack.includes.slice(0, 4);
  const more = pack.includes.length > 4 ? pack.includes.length - 4 : 0;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--accent)]/30 bg-[var(--surface)] shadow-pack">
      <div className="border-b border-[var(--border)] bg-[var(--bg)]/50 px-5 py-4">
        {pack.badge && (
          <span className="text-eyebrow font-bold uppercase tracking-label text-[var(--accent-ink)]">{pack.badge}</span>
        )}
        <h2 className={`font-[family-name:var(--font-display)] text-xl font-bold leading-tight tracking-tight ${pack.badge ? "mt-2" : ""}`}>{pack.title}</h2>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-[var(--muted)]">{pack.description}</p>
      </div>
      <div className="flex flex-1 flex-col gap-4 px-5 py-4">
        <ul className="space-y-2">
          {previewIncludes.map((line) => (
            <li key={line} className="flex gap-2 text-xs leading-snug text-[var(--fg)]">
              <span className="shrink-0 text-[var(--accent-ink)]" aria-hidden>
                ✓
              </span>
              <span>{line}</span>
            </li>
          ))}
          {more > 0 && <li className="text-xs italic text-[var(--muted)]">+{more} ítems en propuesta</li>}
        </ul>
        <div className="mt-auto space-y-2 border-t border-[var(--border)] pt-4">
          <p className="text-eyebrow font-semibold uppercase tracking-wider text-[var(--muted)]">Desde</p>
          <p className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-[var(--accent-ink)]">{pack.startingPrice}</p>
          {pack.priceNote && <p className="text-eyebrow leading-snug text-[var(--muted)]">{pack.priceNote}</p>}
        </div>
        <div className="rounded-lg border border-[var(--warning-border)] bg-[var(--warning-bg)] p-3">
          <p className="text-eyebrow font-semibold uppercase tracking-wide text-[var(--warning-ink)]">Cotización</p>
          <p className="mt-1 line-clamp-4 text-eyebrow leading-relaxed text-[var(--muted)]">{pack.disclaimer}</p>
        </div>
        <ClarityTrackedLink
          href={href}
          clarityEventOnClick={`pack_cta_${pack.requestServiceId.replace(/[^a-zA-Z0-9_-]/g, "_")}`}
          className="inline-flex w-full items-center justify-center rounded-full bg-[var(--accent)] py-3 text-center text-sm font-bold text-[var(--accent-fg)] transition hover:brightness-110"
        >
          {cta}
        </ClarityTrackedLink>
      </div>
    </article>
  );
}
