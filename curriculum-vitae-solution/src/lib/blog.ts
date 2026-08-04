import { posts } from "@/data/posts";
import type { BlogPost, BlogTopic } from "@/types/blog";

/** Posts publicados, del más reciente al más antiguo. */
export function getAllPosts(): BlogPost[] {
  return [...posts].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getPostSlugs(): string[] {
  return posts.map((p) => p.slug);
}

/** Temas presentes, con su conteo, ordenados por frecuencia. */
export function getTopicsInUse(): { topic: BlogTopic; count: number }[] {
  const counts = new Map<BlogTopic, number>();
  for (const p of posts) for (const t of p.topics) counts.set(t, (counts.get(t) ?? 0) + 1);
  return [...counts.entries()]
    .map(([topic, count]) => ({ topic, count }))
    .sort((a, b) => b.count - a.count);
}

/** Relacionados: más temas en común primero, luego más reciente. Excluye el actual. */
export function getRelatedPosts(slug: string, limit = 2): BlogPost[] {
  const current = getPostBySlug(slug);
  if (!current) return [];
  return getAllPosts()
    .filter((p) => p.slug !== slug)
    .map((p) => ({ post: p, shared: p.topics.filter((t) => current.topics.includes(t)).length }))
    .sort((a, b) => b.shared - a.shared || (a.post.date < b.post.date ? 1 : -1))
    .slice(0, limit)
    .map((s) => s.post);
}

const WORDS_PER_MINUTE = 220;

/** Minutos de lectura estimados a partir del cuerpo real, no de un número a mano. */
export function getReadingMinutes(post: BlogPost): number {
  let words = post.summary.split(/\s+/).length + post.takeaway.split(/\s+/).length;
  for (const b of post.body) {
    if (b.kind === "ul" || b.kind === "ol") words += b.items.join(" ").split(/\s+/).length;
    else if (b.kind === "code") words += b.code.split(/\s+/).length;
    else if (b.kind === "callout") words += `${b.title} ${b.text}`.split(/\s+/).length;
    else if (b.kind === "table") words += [...b.head, ...b.rows.flat()].join(" ").split(/\s+/).length;
    else words += b.text.split(/\s+/).length;
  }
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

const MONTHS_ES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

/**
 * Fecha legible, formateada a mano y no con `toLocaleDateString`: las cards se
 * renderizan en un componente cliente y un formateador dependiente de locale o
 * zona horaria produciría un texto distinto en servidor y en cliente, que es
 * exactamente cómo se rompe la hidratación.
 */
export function formatPostDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${Number(d)} ${MONTHS_ES[Number(m) - 1]} ${y}`;
}
