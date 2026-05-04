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
