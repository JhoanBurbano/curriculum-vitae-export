import type { Metadata } from "next";
import Link from "next/link";
import { PageMotion } from "@/providers/page-motion";
import { ServicePackCard } from "@/components/service-pack-card";
import { getCv } from "@/lib/cv";

export const metadata: Metadata = {
  title: "Servicios",
  description: "Packs web, app cross-platform y automatizaciones; catálogo extendido. Precios desde orientativos — cotización formal.",
};

export default function ServicesPage() {
  const c = getCv();
  const packIds = new Set(c.servicePacks.map((p) => p.requestServiceId));
  const catalog = c.services.filter((s) => !packIds.has(s.id));

  return (
    <PageMotion>
      <div className="border-b border-[var(--border)] bg-[var(--surface)]/40">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--accent)]">Oferta</p>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">Servicios</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--muted)]">
            Tres líneas de entrada con precio inicial y disclaimer de cotización; debajo, el catálogo para proyectos a medida (mobile, plataformas, AI, fintech).
          </p>
          <dl className="mt-10 grid gap-6 border-t border-[var(--border)] pt-10 sm:grid-cols-3">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">Modalidad</dt>
              <dd className="mt-1 text-sm font-medium text-[var(--fg)]">Proyecto cerrado o retainer acotado</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">Comunicación</dt>
              <dd className="mt-1 text-sm font-medium text-[var(--fg)]">Async + sesiones cortas de alineación</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">Stack habitual</dt>
              <dd className="mt-1 text-sm font-medium text-[var(--fg)]">Next.js, React Native, Node, n8n/Make</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold sm:text-3xl">Packs de entrada</h2>
            <p className="mt-2 max-w-2xl text-sm text-[var(--muted)]">Web y captación, producto cross-platform, u operaciones automatizadas. Cada CTA abre el formulario con el servicio ya seleccionado.</p>
          </div>
          <Link href="/request-service" className="text-sm font-semibold text-[var(--accent)] underline-offset-4 hover:underline">
            Formulario sin pack →
          </Link>
        </div>

        <ul className="mt-10 grid gap-6 lg:grid-cols-3">
          {c.servicePacks.map((pack) => (
            <li key={pack.requestServiceId} className="min-h-0">
              <ServicePackCard pack={pack} />
            </li>
          ))}
        </ul>

        <div className="mt-20 border-t border-[var(--border)] pt-16">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold sm:text-3xl">Catálogo</h2>
              <p className="mt-2 max-w-xl text-sm text-[var(--muted)]">Consultoría y entregas más amplias; se cotizan por alcance o retainer.</p>
            </div>
            <Link href="/request-service" className="text-sm font-semibold text-[var(--accent)] underline-offset-4 hover:underline">
              Ir al formulario →
            </Link>
          </div>

          <ul className="mt-12 grid gap-6 lg:grid-cols-2">
            {catalog.map((s) => (
              <li
                key={s.id}
                className="group flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 transition hover:border-[var(--accent)]/35 hover:shadow-[0_12px_40px_rgba(0,0,0,0.2)] sm:p-8"
              >
                <h3 className="font-[family-name:var(--font-display)] text-xl font-bold tracking-tight group-hover:text-[var(--accent)]">{s.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--muted)]">{s.description}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {s.deliverables.map((d) => (
                    <li key={d} className="rounded-md border border-[var(--border)] bg-[var(--bg)] px-2.5 py-1 text-xs font-medium text-[var(--fg)]">
                      {d}
                    </li>
                  ))}
                </ul>
                {s.priceHint && <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-[var(--accent)]/90">{s.priceHint}</p>}
                <Link
                  href={`/request-service?service=${encodeURIComponent(s.id)}`}
                  className="mt-6 inline-flex w-fit rounded-full border border-[var(--border)] bg-[var(--bg)] px-5 py-2.5 text-sm font-semibold transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                >
                  Solicitar
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </PageMotion>
  );
}
