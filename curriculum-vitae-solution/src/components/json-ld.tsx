import { getCv } from "@/lib/cv";

export function JsonLdPerson() {
  const c = getCv();
  const sameAs = c.footerLinks.map((f) => f.url);
  const payload = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: `${c.header.nameLine1} ${c.header.nameLine2}`.trim(),
    jobTitle: c.header.subtitle,
    url: c.seo.siteUrl,
    sameAs,
    knowsAbout: c.seo.keywords,
    description: c.seo.description,
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }} />;
}
