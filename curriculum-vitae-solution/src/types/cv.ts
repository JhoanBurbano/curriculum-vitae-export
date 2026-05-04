export interface CvSeo {
  title: string;
  description: string;
  siteUrl: string;
  locale: string;
  keywords: string[];
}

export interface CvProject {
  slug: string;
  title: string;
  description: string;
  /** Párrafos largos para la página de detalle */
  detailParagraphs: string[];
  stack: string[];
  /** Sitio público (landing, marketing o producto web) */
  webUrl?: string;
  /** Store, TestFlight, deep link o página de la app */
  appUrl?: string;
  repoUrl?: string;
  /** @deprecated usar webUrl; se usa como fallback en UI */
  url?: string;
  year: string;
  highlight?: string;
}

export interface CvService {
  id: string;
  title: string;
  description: string;
  deliverables: string[];
  priceHint?: string;
}

/** Pack destacado en /services (precio inicial + disclaimer legal/comercial) */
export interface ServicePack {
  badge?: string;
  title: string;
  description: string;
  includes: string[];
  /** Ej. "Desde USD 1.200" */
  startingPrice: string;
  /** Línea bajo el precio (IVA, TRM, etc.) */
  priceNote?: string;
  /** Texto legal/orientativo: sujeto a cotización */
  disclaimer: string;
  /** Debe coincidir con un `services[].id` para /request-service */
  requestServiceId: string;
  ctaLabel?: string;
}

/** Esquina del hero: qué mostrar además de (o en lugar de) años de experiencia */
export type HeroAsideVariant = "years" | "stat" | "rotate" | "projects";

export interface HeroAsideConfig {
  variant: HeroAsideVariant;
  /** variant stat — valor grande (ej. "AI", "5+", "100%") */
  statPrimary?: string;
  /** variant stat — etiqueta pequeña debajo */
  statSecondary?: string;
  /** variant rotate — frases cortas que rotan */
  rotateLines?: string[];
  /** ms entre rotaciones (default 3200) */
  rotateIntervalMs?: number;
}

export interface CvCopy {
  seo: CvSeo;
  /** Si falta, el hero usa variant "years" desde el resumen */
  heroAside?: HeroAsideConfig;
  header: {
    subtitle: string;
    nameLine1: string;
    nameLine2: string;
    image: string;
    contactLine: string;
    contactLinks: Array<{ label: string; url: string }>;
  };
  professionalSummary: string;
  /** Soft skills (CV y secciones que lean este campo) */
  softSkills: string[];
  coreSkills: Array<{ category: string; items: string[] }>;
  tools: Array<{ category: string; items: string[] }>;
  experience: Array<{
    role: string;
    company: string;
    companyUrl?: string;
    period: string;
    location?: string;
    description: string;
  }>;
  projects: {
    web: CvProject[];
    mobile: CvProject[];
  };
  services: CvService[];
  /** Packs destacados (web, cross-platform, automatización) */
  servicePacks: ServicePack[];
  footerLinks: Array<{ label: string; url: string }>;
  education: string[];
  languages: Array<{ name: string; level: string }>;
  /** PDF oficial (FAB Descargar en /cv); se añade nocache=timestamp en cliente */
  cvPdf: { url: string };
}
