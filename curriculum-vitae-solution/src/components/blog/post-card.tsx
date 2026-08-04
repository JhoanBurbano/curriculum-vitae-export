import Link from "next/link";
import { formatPostDate, getReadingMinutes } from "@/lib/blog";
import { TOPIC_LABELS, type BlogPost } from "@/types/blog";

/** Card de post. Mismo lenguaje que la card de proyecto: plano, borde 1px, el acento solo en el meta. */
export function PostCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  return (
    <article
      className={`group flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 transition hover:border-[var(--accent)]/45 ${
        featured ? "sm:col-span-2" : ""
      }`}
    >
      <div className="flex flex-wrap items-center gap-2">
        {post.topics.map((t) => (
          <span
            key={t}
            className="rounded-full border border-[var(--border)] bg-[var(--bg)] px-2.5 py-0.5 text-eyebrow font-semibold uppercase tracking-label text-[var(--muted)]"
          >
            {TOPIC_LABELS[t]}
          </span>
        ))}
        <span className="ml-auto text-xs text-[var(--muted)]">{formatPostDate(post.date)}</span>
      </div>

      <h3
        className={`mt-4 font-[family-name:var(--font-display)] font-bold tracking-tight transition group-hover:text-[var(--accent-ink)] ${
          featured ? "text-2xl sm:text-3xl" : "text-xl"
        }`}
      >
        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
      </h3>

      <p className={`mt-3 flex-1 leading-relaxed text-[var(--muted)] ${featured ? "max-w-2xl text-base" : "text-sm"}`}>
        {post.summary}
      </p>

      <div className="mt-5 flex items-center justify-between gap-3">
        <Link
          href={`/blog/${post.slug}`}
          className="text-sm font-semibold text-[var(--fg)] underline-offset-4 group-hover:text-[var(--accent-ink)] group-hover:underline"
        >
          Leer →
        </Link>
        <span className="text-xs text-[var(--muted)]">{getReadingMinutes(post)} min</span>
      </div>
    </article>
  );
}
