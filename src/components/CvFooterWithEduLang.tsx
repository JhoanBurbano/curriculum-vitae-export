import type { CvCopy } from '@/types/cv';

interface CvFooterWithEduLangProps {
  footerLinks: CvCopy['footerLinks'];
  education: CvCopy['education'];
  languages: CvCopy['languages'];
}

export function CvFooterWithEduLang({ footerLinks, education, languages }: CvFooterWithEduLangProps) {
  return (
    <footer className="cv-footer">
      <div className="cv-footer-links">
        {footerLinks.map((link, i) => (
          <span key={link.url} className="cv-footer-link-wrap">
            {i > 0 && <span className="cv-footer-sep" aria-hidden="true">♦</span>}
            <a href={link.url} target="_blank" rel="noopener noreferrer" className="cv-footer-link">
              {link.label}
            </a>
          </span>
        ))}
      </div>
      <div className="cv-footer-bottom">
        <div className="cv-footer-education">
          <span className="cv-footer-subtitle">EDUCATION</span>
          <ul className="cv-footer-list">
            {education.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        </div>
        <div className="cv-footer-languages">
          <span className="cv-footer-subtitle">LANGUAGES</span>
          <ul className="cv-footer-list">
            {languages.map((lang, i) => (
              <li key={i}>{lang.name} ({lang.level})</li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
