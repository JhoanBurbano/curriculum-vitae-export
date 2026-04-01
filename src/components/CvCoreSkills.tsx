import type { CvCopy } from '@/types/cv';
import { CvSectionTitle } from './CvSectionTitle';

interface CvCoreSkillsProps {
  items: CvCopy['coreSkills'];
}

export function CvCoreSkills({ items }: CvCoreSkillsProps) {
  return (
    <section className="cv-section">
      <CvSectionTitle title="CORE SKILLS" />
      <div className="cv-skills-grid">
        {items.slice(0, 4).map((box, i) => (
          <div key={i} className="cv-skill-box">
            <span className="cv-skill-box-title">{box.category}</span>
            <span className="cv-skill-box-items">{box.items.join(', ')}</span>
          </div>
        ))}
        {items[4] && (
          <div key={4} className="cv-skill-box cv-skill-box-full">
            <span className="cv-skill-box-title">{items[4].category}</span>
            <span className="cv-skill-box-items">{items[4].items.join(', ')}</span>
          </div>
        )}
      </div>
    </section>
  );
}
