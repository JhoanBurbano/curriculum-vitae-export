import Link from "next/link";
import type { ServicePack } from "@/types/cv";

/** Tarjeta compacta de pack (grid en /services) */
export function ServicePackCard({ pack }: { pack: ServicePack }) {
  const href = `/request-service?service=${encodeURIComponent(pack.requestServiceId)}`;
  const cta = pack.ctaLabel ?? "Solicitar cotización";
  const previewIncludes = pack.includes.slice(0, 4);
  const more = pack.includes.length > 4 ? pack.includes.length - 4 : 0;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--accent)]/30 bg-[var(--surface)] shadow-[0_0_0_1px_rgba(204,255,0,0.05),0_16px_40px_rgba(0,0,0,0.28)]">
      <div className="border-b border-[var(--border)] bg-[var(--bg)]/50 px-5 py-4">
        {pack.badge && (
          <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--accent)]">{pack.badge}</span>
        )}
        <h2 className={`font-[family-name:var(--font-display)] text-xl font-bold leading-tight tracking-tight ${pack.badge ? "mt-2" : ""}`}>{pack.title}</h2>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-[var(--muted)]">{pack.description}</p>
      </div>
      <div className="flex flex-1 flex-col gap-4 px-5 py-4">
        <ul className="space-y-2">
          {previewIncludes.map((line) => (
            <li key={line} className="flex gap-2 text-xs leading-snug text-[var(--fg)]">
              <span className="shrink-0 text-[var(--accent)]" aria-hidden>
                ✓
              </span>
              <span>{line}</span>
            </li>
          ))}
          {more > 0 && <li className="text-xs italic text-[var(--muted)]">+{more} ítems en propuesta</li>}
        </ul>
        <div className="mt-auto space-y-2 border-t border-[var(--border)] pt-4">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--muted)]">Desde</p>
          <p className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-[var(--accent)]">{pack.startingPrice}</p>
          {pack.priceNote && <p className="text-[10px] leading-snug text-[var(--muted)]">{pack.priceNote}</p>}
        </div>
        <div className="rounded-lg border border-amber-500/20 bg-amber-500/[0.05] p-3">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-amber-200/85">Cotización</p>
          <p className="mt-1 line-clamp-4 text-[10px] leading-relaxed text-[var(--muted)]">{pack.disclaimer}</p>
        </div>
        <Link
          href={href}
          className="inline-flex w-full items-center justify-center rounded-full bg-[var(--accent)] py-3 text-center text-sm font-bold text-[var(--accent-fg)] transition hover:brightness-110"
        >
          {cta}
        </Link>
      </div>
    </article>
  );
}
