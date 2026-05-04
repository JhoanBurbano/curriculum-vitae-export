"use client";

import { useEffect, useState } from "react";

/** FAB fijo: enlace al PDF con `nocache` = timestamp (anti-caché). */
export function CvDownloadFab({ pdfBaseUrl }: { pdfBaseUrl: string }) {
  const [href, setHref] = useState(pdfBaseUrl);

  useEffect(() => {
    const u = new URL(pdfBaseUrl);
    u.searchParams.set("nocache", String(Date.now()));
    setHref(u.toString());
  }, [pdfBaseUrl]);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      download
      className="no-print fixed bottom-6 right-6 z-[200] inline-flex items-center gap-2 rounded-full border-2 border-[var(--accent)] bg-[var(--accent)] px-5 py-3 text-sm font-bold text-[var(--accent-fg)] shadow-[0_0_24px_rgba(204,255,0,0.35)] transition hover:brightness-110"
    >
      Descargar
    </a>
  );
}
