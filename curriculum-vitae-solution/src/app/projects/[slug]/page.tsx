import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetailView } from "@/components/project-detail-view";
import { PageMotion } from "@/providers/page-motion";
import { getCv } from "@/lib/cv";
import { getAllProjects, getProjectBySlug, getRelatedProjects } from "@/lib/projects";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  const cv = getCv();
  return getAllProjects(cv).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getProjectBySlug(getCv(), slug);
  if (!p) return { title: "Proyecto" };
  return {
    title: p.title,
    description: p.description,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const c = getCv();
  const p = getProjectBySlug(c, slug);
  if (!p) notFound();

  const related = getRelatedProjects(c, p.slug, 2);

  return (
    <PageMotion>
      <ProjectDetailView project={p} related={related} />
    </PageMotion>
  );
}
