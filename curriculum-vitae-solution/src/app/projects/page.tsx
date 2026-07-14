import type { Metadata } from "next";
import { PageMotion } from "@/providers/page-motion";
import { ProjectsShowcase } from "@/components/projects-showcase";
import { getCv } from "@/lib/cv";
import { getAllProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Proyectos",
  description: "Casos de producto web, mobile y SaaS con mirada de AI Product Engineer.",
};

export default function ProjectsPage() {
  const projects = getAllProjects(getCv());
  return (
    <PageMotion>
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute -right-24 top-10 h-80 w-80 rounded-full bg-[var(--accent)]/12 blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute -left-28 bottom-0 h-72 w-72 rounded-full bg-[var(--accent-2)]/15 blur-3xl" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <ProjectsShowcase projects={projects} />
        </div>
      </div>
    </PageMotion>
  );
}
