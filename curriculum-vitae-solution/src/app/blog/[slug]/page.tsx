import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageMotion } from "@/providers/page-motion";
import { PostBody } from "@/components/blog/post-body";
import { PostCard } from "@/components/blog/post-card";
import { getCv } from "@/lib/cv";
import { formatPostDate, getAllPosts, getPostBySlug, getReadingMinutes, getRelatedPosts } from "@/lib/blog";
import { TOPIC_LABELS } from "@/types/blog";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Badge } from "@/components/ui/badge";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Publicación" };
  return {
    title: post.title,
    description: post.summary,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.summary,
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const c = getCv();
  const author = `${c.header.nameLine1} ${c.header.nameLine2}`.trim();
  const related = getRelatedPosts(post.slug, 2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.summary,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    author: { "@type": "Person", name: author, url: c.seo.siteUrl },
    keywords: post.topics.map((t) => TOPIC_LABELS[t]),
    mainEntityOfPage: `${c.seo.siteUrl.replace(/\/$/, "")}/blog/${post.slug}`,
  };

  return (
    <PageMotion>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <article className="mx-auto w-full max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
        <Link href="/blog" className="text-sm font-semibold text-[var(--muted)] transition hover:text-[var(--accent-ink)]">
          ← Blog
        </Link>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          {post.topics.map((t) => (
            <Badge key={t} className="bg-[var(--surface)]">
              {TOPIC_LABELS[t]}
            </Badge>
          ))}
        </div>

        <h1 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">
          {post.title}
        </h1>

        <p className="mt-5 text-lg leading-relaxed text-[var(--muted)]">{post.summary}</p>

        <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-[var(--border)] pt-5 text-xs text-[var(--muted)]">
          <span className="font-semibold text-[var(--fg)]">{author}</span>
          <span aria-hidden>·</span>
          <time dateTime={post.date}>{formatPostDate(post.date)}</time>
          <span aria-hidden>·</span>
          <span>{getReadingMinutes(post)} min de lectura</span>
          {post.updated && (
            <>
              <span aria-hidden>·</span>
              <span>actualizado {formatPostDate(post.updated)}</span>
            </>
          )}
        </p>

        <aside className="mt-8 rounded-2xl border border-[var(--accent)]/30 bg-[var(--surface)] p-5 shadow-pack">
          <Eyebrow size="sm" weight="bold">Para llevar</Eyebrow>
          <p className="mt-2 leading-relaxed text-[var(--fg)]">{post.takeaway}</p>
        </aside>

        <PostBody body={post.body} />

        {post.sources && post.sources.length > 0 && (
          <section className="mt-14 border-t border-[var(--border)] pt-8">
            <Eyebrow as="h2" size="sm" weight="bold" tone="muted">Fuentes</Eyebrow>
            <ul className="mt-4 space-y-2">
              {post.sources.map((s) => (
                <li key={s.url}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-[var(--muted)] underline-offset-4 transition hover:text-[var(--accent-ink)] hover:underline"
                  >
                    {s.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="mt-12 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
          <h2 className="font-[family-name:var(--font-display)] text-xl font-bold tracking-tight">
            ¿Tienes este problema en tu producto?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
            Trabajo con equipos que necesitan llevar esto a producción, no solo probarlo. Cuéntame el caso y te digo qué haría.
          </p>
          <Link
            href="/request-service"
            className="mt-5 inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-[var(--accent-fg)] transition hover:brightness-110"
          >
            Solicitar servicio
          </Link>
        </section>

        {related.length > 0 && (
          <section className="mt-14 border-t border-[var(--border)] pt-10">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight">Seguir leyendo</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {related.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </section>
        )}
      </article>
    </PageMotion>
  );
}
