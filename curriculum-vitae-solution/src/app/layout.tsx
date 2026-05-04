import type { Metadata } from "next";
import { Geist, Geist_Mono, Syne } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { ClarityProvider } from "@/providers/clarity-provider";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { JsonLdPerson } from "@/components/json-ld";
import { getCv } from "@/lib/cv";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

export async function generateMetadata(): Promise<Metadata> {
  const c = getCv();
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? c.seo.siteUrl;
  return {
    metadataBase: new URL(base),
    title: {
      default: c.seo.title,
      template: `%s · ${c.header.nameLine1} ${c.header.nameLine2}`,
    },
    description: c.seo.description,
    keywords: c.seo.keywords,
    authors: [{ name: `${c.header.nameLine1} ${c.header.nameLine2}` }],
    openGraph: {
      type: "website",
      locale: c.seo.locale,
      url: base,
      siteName: c.seo.title,
      title: c.seo.title,
      description: c.seo.description,
    },
    twitter: {
      card: "summary_large_image",
      title: c.seo.title,
      description: c.seo.description,
    },
    robots: { index: true, follow: true },
    alternates: { canonical: "/" },
    icons: {
      icon: [{ url: "/js-isotype.png", type: "image/png" }],
      apple: [{ url: "/js-isotype.png", type: "image/png" }],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} ${syne.variable} h-full`}>
      <body className="flex min-h-full flex-col antialiased">
        <JsonLdPerson />
        <ThemeProvider>
          <ClarityProvider>
            <SiteNav />
            <main className="flex flex-1 flex-col">{children}</main>
            <SiteFooter />
          </ClarityProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
