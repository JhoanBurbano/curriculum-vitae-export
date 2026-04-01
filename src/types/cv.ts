/**
 * CV: solo tu información. Colores: fondo #000000, acento #CCFF00, texto #E0E0E0, cajas #1A1A2E.
 */
export interface CvCopy {
  header: {
    subtitle: string;
    nameLine1: string;
    nameLine2: string;
    image: string;
    contactLine: string;
    contactLinks: Array<{ label: string; url: string }>;
  };
  professionalSummary: string;
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
  footerLinks: Array<{ label: string; url: string }>;
  education: string[];
  languages: Array<{ name: string; level: string }>;
}
