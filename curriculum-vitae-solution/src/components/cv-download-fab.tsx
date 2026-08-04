"use client";

import { clarityEvent } from "@/lib/analytics/clarity";

/** Añade `nocache` = timestamp para saltarse la caché del PDF. */
function withNocache(base: string): string {
  const u = new URL(base);
  u.searchParams.set("nocache", String(Date.now()));
  return u.toString();
}

/**
 * FAB fijo con el enlace al PDF del CV.
 *
 * El timestamp anti-caché se calcula **en el click**, no en un efecto de montaje.
 * Antes vivía en estado que un `useEffect` rellenaba, porque `Date.now()` difiere
 * entre servidor y cliente y el href habría causado desajuste de hidratación.
 * Resolverlo en el click elimina el estado y el efecto, y da un valor más fresco:
 * uno por descarga en vez de uno por montaje.
 */
export function CvDownloadFab({ pdfBaseUrl }: { pdfBaseUrl: string }) {
  return (
    <a
      href={pdfBaseUrl}
      target="_blank"
      rel="noopener noreferrer"
      download
      onClick={(e) => {
        clarityEvent("cv_pdf_download_click");
        // El navegador lee `href` al ejecutar la acción por defecto, que ocurre
        // después de este handler, así que reescribirlo aquí sí surte efecto.
        e.currentTarget.href = withNocache(pdfBaseUrl);
      }}
      className="no-print fixed bottom-6 right-6 z-[200] inline-flex items-center gap-2 rounded-full border-2 border-[var(--accent)] bg-[var(--accent)] px-5 py-3 text-sm font-bold text-[var(--accent-fg)] shadow-[0_0_24px_rgba(204,255,0,0.35)] transition hover:brightness-110"
    >
      Descargar
    </a>
  );
}
