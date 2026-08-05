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
import { getAllPosts, getPostBySlug, getReadingMinutes } from "@/lib/blog";
import { TOPIC_LABELS } from "@/types/blog";

/**
 * Tarjeta social por publicación: el título del post, no el nombre del sitio.
 * Es lo que decide si un link compartido se abre o se ignora.
 */
export const alt = "Publicación del blog de Jhoan Burbano";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export default async function PostOgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

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
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 40, height: 6, background: "#ccff00" }} />
          {(post?.topics ?? []).map((t) => (
            <div
              key={t}
              style={{
                color: "#a3a3a3",
                fontSize: 20,
                letterSpacing: 4,
                textTransform: "uppercase",
                border: "1px solid #262626",
                borderRadius: 999,
                padding: "6px 18px",
              }}
            >
              {TOPIC_LABELS[t]}
            </div>
          ))}
        </div>

        <div
          style={{
            color: "#f5f5f5",
            fontSize: post && post.title.length > 60 ? 60 : 74,
            fontWeight: 800,
            lineHeight: 1.06,
            letterSpacing: -2,
            display: "flex",
          }}
        >
          {post?.title ?? "Blog"}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ height: 1, background: "#262626" }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ color: "#ccff00", fontSize: 26, fontWeight: 600 }}>Jhoan Burbano</div>
            <div style={{ color: "#a3a3a3", fontSize: 24 }}>
              {post ? `${getReadingMinutes(post)} min · jsburbano.dev` : "jsburbano.dev"}
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
