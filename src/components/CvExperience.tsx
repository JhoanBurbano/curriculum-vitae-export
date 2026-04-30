import type { CvCopy } from '@/types/cv';
import { CvSectionTitle } from './CvSectionTitle';

interface CvExperienceProps {
  items: CvCopy['experience'];
}

export function CvExperience({ items }: CvExperienceProps) {
  return (
    <section className="cv-section">
      <CvSectionTitle title="LAST PROFESSIONAL EXPERIENCE" />
      <ul className="cv-experience-list">
        {items.map((item, i) => (
          <li key={i} className="cv-experience-item">
            <div className="cv-experience-head">
              <span className="cv-experience-role">
                {item.role}
                {item.company ? (
                  item.companyUrl ? (
                  <> @ <a href={item.companyUrl} target="_blank" rel="noopener noreferrer">{item.company}</a></>
                  ) : (
                  <> @ {item.company}</>
                  )
                ) : null}
              </span>
              <span className="cv-experience-period">
                {item.period}
                {item.location ? ` | ${item.location}` : ''}
              </span>
            </div>
            <p className="cv-experience-desc">{item.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
