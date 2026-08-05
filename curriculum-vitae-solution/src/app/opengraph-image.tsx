/* eslint-disable no-restricted-syntax --
 * Excepción de adherencia justificada: Satori, el motor detrás de ImageResponse,
 * no resuelve custom properties de CSS — `var(--accent)` se ignora y el texto
 * saldría sin color. Los valores de esta tarjeta tienen que ser literales, y son
 * exactamente los tokens del design system en tema oscuro:
 *   #050505 = --bg · #f5f5f5 = --fg · #a3a3a3 = --muted · #262626 = --border
 *   #ccff00 = --accent
 * Si cambian los tokens, hay que cambiarlos aquí a mano. Es el precio de generar
 * una imagen en el servidor.
 */
import { ImageResponse } from "next/og";
import { getCv } from "@/lib/cv";

/**
 * Tarjeta social del sitio.
 *
 * Antes no existía: `layout.tsx` declaraba `openGraph` y `twitter:
 * summary_large_image` sin ninguna imagen, así que cada link compartido en
 * LinkedIn, WhatsApp o Slack salía como una tarjeta vacía.
 *
 * Sin fuentes de marca a propósito: Satori no lee woff2, y cargar un ttf aquí
 * añadiría peso y un punto de fallo al build por un detalle que a este tamaño
 * casi no se nota. El color y la composición ya son reconocibles.
 */
export const alt = "Jhoan Burbano — AI Product Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  const c = getCv();
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#050505",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 40, height: 6, background: "#ccff00" }} />
          <div style={{ color: "#a3a3a3", fontSize: 22, letterSpacing: 8, textTransform: "uppercase" }}>
            Portafolio
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ color: "#f5f5f5", fontSize: 112, fontWeight: 800, lineHeight: 1, letterSpacing: -3 }}>
            {c.header.nameLine1}
          </div>
          <div style={{ color: "#ccff00", fontSize: 112, fontWeight: 800, lineHeight: 1, letterSpacing: -3 }}>
            {c.header.nameLine2}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ height: 1, background: "#262626" }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ color: "#a3a3a3", fontSize: 26 }}>{c.header.subtitle}</div>
            <div style={{ color: "#f5f5f5", fontSize: 24, fontWeight: 600 }}>jsburbano.dev</div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
