import { getCv } from "@/lib/cv";
import { getAllPosts } from "@/lib/blog";
import { TOPIC_LABELS } from "@/types/blog";

/** Los Route Handlers no se cachean por defecto en esta versión; el feed es estático. */
export const dynamic = "force-static";

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const c = getCv();
  const base = (process.env.NEXT_PUBLIC_SITE_URL ?? c.seo.siteUrl).replace(/\/$/, "");
  const author = `${c.header.nameLine1} ${c.header.nameLine2}`.trim();
  const posts = getAllPosts();

  const items = posts
    .map((p) => {
      const url = `${base}/blog/${p.slug}`;
      // pubDate en RFC 822, con hora fija a mediodía UTC: los posts tienen fecha, no instante.
      const pubDate = new Date(`${p.date}T12:00:00Z`).toUTCString();
      const categories = p.topics.map((t) => `<category>${escapeXml(TOPIC_LABELS[t])}</category>`).join("");
      return `    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(p.summary)}</description>
      ${categories}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(`Blog · ${author}`)}</title>
    <link>${base}/blog</link>
    <atom:link href="${base}/blog/rss.xml" rel="self" type="application/rss+xml" />
    <description>${escapeXml("Notas de ingeniería sobre sistemas agentic en producción, mobile, iOS y Android.")}</description>
    <language>es</language>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
