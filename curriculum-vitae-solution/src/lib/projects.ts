import type { CvCopy, CvProject } from "@/types/cv";

export type ProjectKind = "web" | "mobile";

export type ProjectWithKind = CvProject & { kind: ProjectKind };

export function getAllProjects(cv: CvCopy): ProjectWithKind[] {
  return [...cv.projects.web.map((p) => ({ ...p, kind: "web" as const })), ...cv.projects.mobile.map((p) => ({ ...p, kind: "mobile" as const }))];
}

export function getProjectBySlug(cv: CvCopy, slug: string): ProjectWithKind | undefined {
  return getAllProjects(cv).find((p) => p.slug === slug);
}

export function getProjectSlugs(cv: CvCopy): string[] {
  return getAllProjects(cv).map((p) => p.slug);
}

/** Proyectos relacionados: misma categoría o mismo kind; excluye el actual. */
export function getRelatedProjects(cv: CvCopy, slug: string, limit = 2): ProjectWithKind[] {
  const all = getAllProjects(cv);
  const current = all.find((p) => p.slug === slug);
  if (!current) return [];
  const scored = all
    .filter((p) => p.slug !== slug)
    .map((p) => {
      let score = 0;
      if (current.category && p.category === current.category) score += 2;
      if (p.kind === current.kind) score += 1;
      if (p.featured) score += 1;
      return { p, score };
    })
    .sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.p);
}
