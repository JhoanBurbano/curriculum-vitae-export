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
  /** Párrafos largos para la página de detalle (contexto adicional) */
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
  /** Rol en el proyecto (product / engineering) */
  role?: string;
  /** Problema de negocio o usuario */
  problem?: string;
  /** Enfoque como product engineer (no solo tech) */
  productApproach?: string;
  /** Cómo se usó AI / agentes / workflows en el delivery */
  aiLeverage?: string;
  /** Resultados o señales de valor */
  outcomes?: string[];
  /** Destacado en el listado */
  featured?: boolean;
  /** Tag de categoría en UI (SaaS, Fintech, Client, Product…) */
  category?: string;
  /**
   * Caso de portada. Solo los `spotlight` se muestran como card completa; el
   * resto pasa a una lista compacta. Once cards sin métricas bajan el promedio
   * en vez de sumar volumen: cinco casos fuertes venden más que once tibios.
   */
  spotlight?: boolean;
  /**
   * Cifras del caso. Vacío a propósito: no se inventan métricas de cliente.
   * En cuanto tengas los números reales, esto es lo primero que un comprador lee.
   * Ej.: { value: "-38%", label: "tiempo de onboarding" }
   */
  impact?: { value: string; label: string }[];
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
  /** Ej. "USD 4k – 9k". Un rango califica; un "desde" barato atrae al comprador equivocado. */
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

/** Testimonio de cliente. Vacío hasta que existan de verdad: no se inventan. */
export interface CvTestimonial {
  quote: string;
  author: string;
  /** Cargo y empresa. Sin esto el testimonio no tiene fuerza. */
  role: string;
  /** Opcional: enlace a LinkedIn o al proyecto, para que sea verificable. */
  url?: string;
}

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
    /** Línea de rol. Va al CV, al JSON-LD y al footer: describe QUÉ eres. */
    subtitle: string;
    /**
     * Promesa comercial del hero: a quién ayudas y a qué resultado. Distinta del
     * `subtitle` a propósito — una lista de etiquetas separadas por barras dice
     * qué eres, no qué problema resuelves, y es lo que decide si un comprador
     * sigue leyendo.
     */
    promise?: string;
    nameLine1: string;
    nameLine2: string;
    image: string;
    contactLine: string;
    contactLinks: Array<{ label: string; url: string }>;
    /**
     * Enlace de agenda (Cal.com, Calendly…). Si está vacío, la UI no muestra el
     * botón. Un formulario es el escalón más alto del funnel: agendar convierte
     * mucho mejor porque cuesta 15 segundos.
     */
    bookingUrl?: string;
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
  /** Prueba social. Mientras esté vacío, la sección no se renderiza. */
  testimonials?: CvTestimonial[];
  footerLinks: Array<{ label: string; url: string }>;
  education: string[];
  languages: Array<{ name: string; level: string }>;
  /** PDF oficial (FAB Descargar en /cv); se añade nocache=timestamp en cliente */
  cvPdf: { url: string };
}
