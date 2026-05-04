import type { CvCopy } from "@/types/cv";

export function SkillsMatrix({ coreSkills, tools }: Pick<CvCopy, "coreSkills" | "tools">) {
  return (
    <div className="grid gap-10 md:grid-cols-2">
      <div>
        <h3 className="font-[family-name:var(--font-display)] text-lg font-bold">Core skills</h3>
        <ul className="mt-4 space-y-6">
          {coreSkills.map((g) => (
            <li key={g.category}>
              <p className="text-sm font-semibold text-[var(--fg)]">{g.category}</p>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{g.items.join(" · ")}</p>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="font-[family-name:var(--font-display)] text-lg font-bold">Tools</h3>
        <ul className="mt-4 space-y-6">
          {tools.map((g) => (
            <li key={g.category}>
              <p className="text-sm font-semibold text-[var(--fg)]">{g.category}</p>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{g.items.join(" · ")}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
