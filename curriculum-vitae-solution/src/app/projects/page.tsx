import type { Metadata } from "next";
import { PageMotion } from "@/providers/page-motion";
import { ProjectGrid } from "@/components/project-grid";
import { getCv } from "@/lib/cv";

export const metadata: Metadata = {
  title: "Proyectos",
  description: "Selección de trabajo web y mobile.",
};

export default function ProjectsPage() {
  const c = getCv();
  return (
    <PageMotion>
      <div className="mx-auto max-w-6xl space-y-16 px-4 py-14 sm:px-6 sm:py-20">
        <div>
          <h1 className="font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight sm:text-5xl">Proyectos</h1>
          <p className="mt-4 max-w-2xl text-[var(--muted)]">Casos web y mobile alineados a producto, pagos y performance.</p>
        </div>
        <ProjectGrid title="Web" items={c.projects.web} />
        <ProjectGrid title="Mobile" items={c.projects.mobile} />
      </div>
    </PageMotion>
  );
}
