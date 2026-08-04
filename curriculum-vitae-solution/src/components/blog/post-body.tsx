import type { ReactNode } from "react";
import type { BlogBlock } from "@/types/blog";

/**
 * Resuelve las dos marcas inline del contenido: **negrita** y `código`.
 *
 * Tokeniza a nodos de React, nunca a HTML: el texto de un post no puede inyectar
 * markup ni scripts aunque el contenido venga de otra mano.
 */
export function renderInline(text: string): ReactNode[] {
  return text
    .split(/(\*\*[^*]+\*\*|`[^`]+`)/g)
    .filter(Boolean)
    .map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={i} className="font-semibold text-[var(--fg)]">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith("`") && part.endsWith("`")) {
        return (
          <code key={i} className="rounded border border-[var(--border)] bg-[var(--bg)] px-1.5 py-0.5 font-mono text-[0.85em] text-[var(--fg)]">
            {part.slice(1, -1)}
          </code>
        );
      }
      return part;
    });
}

function Block({ block }: { block: BlogBlock }) {
  switch (block.kind) {
    case "h2":
      return (
        <h2 className="mt-12 font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight sm:text-3xl">
          {block.text}
        </h2>
      );

    case "h3":
      return (
        <h3 className="mt-8 font-[family-name:var(--font-display)] text-lg font-bold tracking-tight">{block.text}</h3>
      );

    case "p":
      return <p className="mt-5 leading-relaxed text-[var(--muted)]">{renderInline(block.text)}</p>;

    case "ul":
      return (
        <ul className="mt-5 space-y-2.5">
          {block.items.map((item) => (
            <li key={item} className="flex gap-3 leading-relaxed text-[var(--muted)]">
              <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-ink)]" />
              <span>{renderInline(item)}</span>
            </li>
          ))}
        </ul>
      );

    case "ol":
      return (
        <ol className="mt-5 space-y-2.5">
          {block.items.map((item, i) => (
            <li key={item} className="flex gap-3 leading-relaxed text-[var(--muted)]">
              <span aria-hidden className="mt-0.5 w-5 shrink-0 font-mono text-xs font-semibold text-[var(--accent-ink)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{renderInline(item)}</span>
            </li>
          ))}
        </ol>
      );

    case "code":
      return (
        <div className="mt-6 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)]">
          <p className="border-b border-[var(--border)] bg-[var(--bg)]/60 px-4 py-2 text-eyebrow font-semibold uppercase tracking-label text-[var(--muted)]">
            {block.lang}
          </p>
          <pre className="overflow-x-auto p-4">
            <code className="font-mono text-xs leading-relaxed text-[var(--fg)]">{block.code}</code>
          </pre>
        </div>
      );

    case "callout": {
      const warning = block.tone === "warning";
      return (
        <aside
          className={`mt-6 rounded-xl border p-4 ${
            warning
              ? "border-[var(--warning-border)] bg-[var(--warning-bg)]"
              : "border-[var(--accent)]/30 bg-[var(--accent)]/[0.06]"
          }`}
        >
          <p
            className={`text-eyebrow font-bold uppercase tracking-label ${
              warning ? "text-[var(--warning-ink)]" : "text-[var(--accent-ink)]"
            }`}
          >
            {block.title}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{renderInline(block.text)}</p>
        </aside>
      );
    }

    case "quote":
      return (
        <blockquote className="mt-8 border-l-2 border-[var(--accent)] pl-5">
          <p className="font-[family-name:var(--font-display)] text-lg font-semibold leading-snug tracking-tight text-[var(--fg)]">
            {renderInline(block.text)}
          </p>
        </blockquote>
      );

    case "table":
      return (
        <div className="mt-6 overflow-x-auto rounded-xl border border-[var(--border)]">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="bg-[var(--bg)]/60">
                {block.head.map((h) => (
                  <th
                    key={h}
                    scope="col"
                    className="whitespace-nowrap px-4 py-3 text-eyebrow font-semibold uppercase tracking-label text-[var(--muted)]"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr key={row.join("|")} className="border-t border-[var(--border)]">
                  {row.map((cell, i) => (
                    <td key={i} className={`px-4 py-3 align-top ${i === 0 ? "font-medium text-[var(--fg)]" : "text-[var(--muted)]"}`}>
                      {renderInline(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
}

export function PostBody({ body }: { body: BlogBlock[] }) {
  return (
    <div className="text-base">
      {body.map((block, i) => (
        <Block key={i} block={block} />
      ))}
    </div>
  );
}
