import Link from "next/link";
import { PageMotion } from "@/providers/page-motion";
import { HeroHome } from "@/components/hero-home";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { ProjectGrid } from "@/components/project-grid";
import { getCv } from "@/lib/cv";

export default function HomePage() {
  const c = getCv();
  const previewJobs = c.experience.slice(0, 2);

  return (
    <PageMotion>
      <HeroHome data={c} />

      <section className="mx-auto max-w-6xl border-b border-[var(--border)] px-4 py-16 sm:px-6 sm:py-20">
        <div className="max-w-3xl">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold sm:text-3xl">Resumen profesional</h2>
          <p className="mt-4 text-base leading-relaxed text-[var(--muted)] sm:text-lg">{c.professionalSummary}</p>
          <Link href="/experience" className="mt-6 inline-flex text-sm font-semibold text-[var(--accent)] underline-offset-4 hover:underline">
            Ver toda la experiencia
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold sm:text-3xl">Experiencia reciente</h2>
        <div className="mt-10">
          <ExperienceTimeline experience={previewJobs} />
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-16 border-t border-[var(--border)] px-4 py-16 sm:px-6 sm:py-20">
        <ProjectGrid title="Web" items={c.projects.web.slice(0, 2)} />
        <ProjectGrid title="Mobile" items={c.projects.mobile.slice(0, 2)} />
        <Link href="/projects" className="inline-flex text-sm font-semibold text-[var(--accent)] underline-offset-4 hover:underline">
          Ver todos los proyectos
        </Link>
      </section>

      <section className="border-t border-[var(--border)] bg-[var(--surface)] px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold">¿Tienes un proyecto?</h2>
            <p className="mt-2 max-w-xl text-[var(--muted)]">Mobile, web, AI workflows o integraciones de pago.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/services" className="rounded-full border border-[var(--border)] bg-[var(--bg)] px-5 py-2.5 text-sm font-semibold hover:border-[var(--accent)]">
              Servicios
            </Link>
            <Link href="/request-service" className="rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-[var(--accent-fg)] hover:brightness-110">
              Solicitar
            </Link>
          </div>
        </div>
      </section>
    </PageMotion>
  );
}
