import type { Metadata } from "next";
import { PageMotion } from "@/providers/page-motion";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { SkillsMatrix } from "@/components/skills-matrix";
import { getCv } from "@/lib/cv";

export const metadata: Metadata = {
  title: "Experiencia",
  description: "Trayectoria en mobile, fintech y liderazgo técnico.",
};

export default function ExperiencePage() {
  const c = getCv();
  return (
    <PageMotion>
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <h1 className="font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight sm:text-5xl">Experiencia</h1>
        <p className="mt-4 max-w-2xl text-[var(--muted)]">Roles recientes con foco en producto, transacciones reales y AI-assisted delivery.</p>
        <div className="mt-14">
          <ExperienceTimeline experience={c.experience} />
        </div>
        <div className="mt-20 border-t border-[var(--border)] pt-16">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold">Skills & tools</h2>
          <div className="mt-10">
            <SkillsMatrix coreSkills={c.coreSkills} tools={c.tools} />
          </div>
          <div className="mt-14">
            <h3 className="font-[family-name:var(--font-display)] text-lg font-bold">Soft skills</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {c.softSkills.map((s) => (
                <li
                  key={s}
                  className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-sm text-[var(--muted)]"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </PageMotion>
  );
}
