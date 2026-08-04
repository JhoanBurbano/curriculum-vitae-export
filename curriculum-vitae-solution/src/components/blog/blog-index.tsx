"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PostCard } from "@/components/blog/post-card";
import { clarityEvent } from "@/lib/analytics/clarity";
import { DUR_BASE, EASE_OUT_EXPO, STAGGER } from "@/lib/motion";
import { TOPIC_LABELS, type BlogPost, type BlogTopic } from "@/types/blog";

type Filter = "all" | BlogTopic;

export function BlogIndex({ posts, topics }: { posts: BlogPost[]; topics: { topic: BlogTopic; count: number }[] }) {
  const [filter, setFilter] = useState<Filter>("all");

  const visible = useMemo(
    () => (filter === "all" ? posts : posts.filter((p) => p.topics.includes(filter))),
    [posts, filter],
  );

  function pick(next: Filter) {
    setFilter(next);
    clarityEvent(`blog_filter_${next}`);
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filtrar publicaciones por tema">
        {([{ id: "all" as Filter, label: "Todos" }] as { id: Filter; label: string }[])
          .concat(topics.map((t) => ({ id: t.topic, label: `${TOPIC_LABELS[t.topic]} · ${t.count}` })))
          .map((f) => {
            const active = filter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => pick(f.id)}
                className={`relative rounded-full px-4 py-2 text-sm font-semibold transition ${
                  active
                    ? "text-[var(--accent-fg)]"
                    : "border border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] hover:border-[var(--accent)]/40 hover:text-[var(--fg)]"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="blog-filter-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-[var(--accent)]"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                {f.label}
              </button>
            );
          })}
      </div>

      <motion.div layout className="grid gap-6 sm:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {visible.map((post, i) => (
            <motion.div
              key={post.slug}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: DUR_BASE, delay: Math.min(i * STAGGER, 0.3), ease: EASE_OUT_EXPO }}
              className={post.featured && filter === "all" ? "sm:col-span-2" : ""}
            >
              <PostCard post={post} featured={Boolean(post.featured) && filter === "all"} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {visible.length === 0 && (
        <p className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 text-center text-sm text-[var(--muted)]">
          Todavía no hay publicaciones en este tema.
        </p>
      )}
    </div>
  );
}
