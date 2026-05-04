import type { CvCopy } from "@/types/cv";

export function ExperienceTimeline({ experience }: Pick<CvCopy, "experience">) {
  return (
    <ol className="relative mx-auto max-w-3xl border-l border-[var(--border)] pl-8">
      {experience.map((job, i) => (
        <li key={`${job.company}-${job.period}`} className="mb-12 last:mb-0">
          <span className="absolute -left-[5px] mt-1.5 h-2.5 w-2.5 rounded-full bg-[var(--accent)] ring-4 ring-[var(--bg)]" />
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">{job.period}</p>
          <h3 className="mt-1 font-[family-name:var(--font-display)] text-xl font-bold">{job.role}</h3>
          <p className="text-sm font-medium text-[var(--muted)]">{job.company}</p>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{job.description}</p>
          {i < experience.length - 1 && <div className="mt-8 h-px w-full bg-gradient-to-r from-[var(--border)] to-transparent" />}
        </li>
      ))}
    </ol>
  );
}
