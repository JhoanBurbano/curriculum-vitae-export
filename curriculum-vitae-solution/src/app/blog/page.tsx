import type { Metadata } from "next";
import Link from "next/link";
import { PageMotion } from "@/providers/page-motion";
import { BlogIndex } from "@/components/blog/blog-index";
import { getAllPosts, getTopicsInUse } from "@/lib/blog";
import { Eyebrow } from "@/components/ui/eyebrow";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notas de ingeniería sobre sistemas agentic en producción, mobile con React Native y Expo, iOS y Android — con foco en qué decidir, no solo en qué salió.",
  alternates: { canonical: "/blog", types: { "application/rss+xml": "/blog/rss.xml" } },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const topics = getTopicsInUse();

  return (
    <PageMotion>
      <div className="border-b border-[var(--border)] bg-[var(--surface)]/40">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <Eyebrow>Notas</Eyebrow>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Blog
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--muted)]">
            Lo que aprendo construyendo producto: sistemas agentic que llegan a producción, releases de mobile que obligan a
            mover el roadmap, y decisiones de stack con su costo real. Escrito para quien tiene que{" "}
            <span className="text-[var(--fg)]">decidir</span>, no solo enterarse.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/blog/rss.xml"
              className="inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--surface)] px-5 py-2.5 text-sm font-semibold transition hover:border-[var(--accent)]"
            >
              RSS
            </Link>
            <p className="text-sm text-[var(--muted)]">
              {posts.length} {posts.length === 1 ? "publicación" : "publicaciones"}
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <BlogIndex posts={posts} topics={topics} />
      </div>
    </PageMotion>
  );
}
