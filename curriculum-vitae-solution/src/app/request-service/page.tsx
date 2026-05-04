import type { Metadata } from "next";
import { Suspense } from "react";
import { PageMotion } from "@/providers/page-motion";
import { ServiceRequestForm } from "@/components/service-request-form";
import { RequestServiceAside } from "@/components/request-service-aside";
import { getCv } from "@/lib/cv";

export const metadata: Metadata = {
  title: "Solicitar servicio",
  description: "Cotización y brief: packs web, cross-platform o automatización, y catálogo extendido.",
};

function FormFallback() {
  return <div className="min-h-[28rem] animate-pulse rounded-3xl border border-[var(--border)] bg-[var(--surface)]" aria-hidden />;
}

export default function RequestServicePage() {
  const c = getCv();
  return (
    <PageMotion>
      <div className="border-b border-[var(--border)] bg-[var(--surface)]/35">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--accent)]">Brief & cotización</p>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight sm:text-5xl">Solicitar servicio</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
            Cuéntame objetivo, plazo y presupuesto aproximado si lo tienes. Si vienes desde un pack, el tipo de trabajo ya viene preseleccionado; puedes cambiarlo antes de enviar.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5 lg:order-2">
            <RequestServiceAside packs={c.servicePacks} />
          </div>
          <div className="lg:col-span-7 lg:order-1">
            <Suspense fallback={<FormFallback />}>
              <ServiceRequestForm services={c.services} />
            </Suspense>
          </div>
        </div>
      </div>
    </PageMotion>
  );
}
