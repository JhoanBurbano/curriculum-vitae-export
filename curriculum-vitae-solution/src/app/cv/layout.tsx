import "./cv-print.css";

/**
 * Layout del CV imprimible.
 *
 * Ya no carga fuentes con `<link>` a Google Fonts. Antes traía Inter y Big
 * Shoulders Display desde un tercero — dos peticiones bloqueantes, dos
 * preconnect y los avisos de `no-page-custom-font` de Next — para acabar
 * pintando el CV con tipografías que no son las de la marca. Ahora usa Syne y
 * Geist, que el layout raíz ya sirve con `next/font` desde el propio dominio.
 */
export default function CvLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
