/**
 * Modelo del blog.
 *
 * Los posts son módulos TypeScript, no MDX: el repo ya trata el contenido como
 * datos tipados (`cv-copy.json` + `lib/`), y así el contenido se valida en
 * compilación y se renderiza con los tokens del design system sin arrastrar un
 * pipeline de markdown ni dependencias nuevas.
 *
 * En los textos se permiten dos marcas inline, resueltas por `renderInline`:
 *   **negrita**   y   `código`
 */

export type BlogTopic = "agentic" | "mobile" | "ios" | "android" | "producto";

export const TOPIC_LABELS: Record<BlogTopic, string> = {
  agentic: "Agentic",
  mobile: "Mobile",
  ios: "iOS",
  android: "Android",
  producto: "Producto",
};

export type BlogBlock =
  | { kind: "h2"; text: string }
  | { kind: "h3"; text: string }
  | { kind: "p"; text: string }
  | { kind: "ul"; items: string[] }
  | { kind: "ol"; items: string[] }
  | { kind: "code"; lang: string; code: string }
  | { kind: "callout"; tone: "note" | "warning"; title: string; text: string }
  | { kind: "quote"; text: string }
  | { kind: "table"; head: string[]; rows: string[][] };

export type BlogSource = { label: string; url: string };

export type BlogPost = {
  slug: string;
  title: string;
  /** Una línea. Se usa en cards, metadatos, Open Graph y RSS. */
  summary: string;
  /** ISO-8601 (YYYY-MM-DD). */
  date: string;
  /** ISO-8601. Solo si el post se revisó después de publicarse. */
  updated?: string;
  topics: BlogTopic[];
  /**
   * Qué hacer con esto si construyes producto. Se muestra destacado arriba del
   * cuerpo: si un post no puede responderlo en dos frases, no está listo.
   */
  takeaway: string;
  body: BlogBlock[];
  /** Obligatorio en posts sobre releases de terceros: el lector debe poder verificar. */
  sources?: BlogSource[];
  featured?: boolean;
};
