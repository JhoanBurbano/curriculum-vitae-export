"use client";

import { type ReactElement } from "react";
import type { CvCopy } from "@/types/cv";

/** Misma data que portfolio-export + soft skills; sin export print (PDF vía FAB). */

function CvSectionTitle({ title }: { title: string }) {
  return (
    <h2 className="cv-section-title">
      <span className="cv-section-title-text">{title}</span>
      <span className="cv-section-title-line" />
    </h2>
  );
}

function renderContactLine(line: string, links: CvCopy["header"]["contactLinks"]): (string | ReactElement)[] {
  const parts: (string | ReactElement)[] = [];
  let rest = line;
  for (const link of links) {
    const i = rest.indexOf(link.label);
    if (i === -1) continue;
    if (i > 0) parts.push(rest.slice(0, i));
    parts.push(
      <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer">
        {link.label}
      </a>,
    );
    rest = rest.slice(i + link.label.length);
  }
  if (rest) parts.push(rest);
  return parts;
}

function CvHeader({ data }: { data: CvCopy["header"] }) {
  const contactParts = renderContactLine(data.contactLine, data.contactLinks);
  return (
    <header className="cv-header">
      <p className="cv-header-subtitle">{data.subtitle}</p>
      <div className="cv-header-name-block">
        <h1 className="cv-header-name">
          <span className="cv-header-name-line1">{data.nameLine1}</span>
          <span className="cv-header-name-line2">{data.nameLine2}</span>
        </h1>
        <div className="cv-header-photo">
          <img src={data.image} alt="" />
        </div>
      </div>
      <p className="cv-header-contact">
        {contactParts.map((part, i) => (typeof part === "string" ? <span key={i}>{part}</span> : part))}
      </p>
    </header>
  );
}

function CvProfessionalSummary({ text }: { text: string }) {
  return (
    <section className="cv-section">
      <CvSectionTitle title="PROFESSIONAL SUMMARY" />
      <p className="cv-summary-text">{text}</p>
    </section>
  );
}

function CvSoftSkills({ items }: { items: string[] }) {
  if (!items.length) return null;
  return (
    <section className="cv-section">
      <CvSectionTitle title="SOFT SKILLS" />
      <div className="cv-skills-grid">
        <div className="cv-skill-box cv-skill-box-full">
          <span className="cv-skill-box-items">{items.join(" · ")}</span>
        </div>
      </div>
    </section>
  );
}

function CvCoreSkills({ items }: { items: CvCopy["coreSkills"] }) {
  return (
    <section className="cv-section">
      <CvSectionTitle title="CORE SKILLS" />
      <div className="cv-skills-grid">
        {items.slice(0, 4).map((box, i) => (
          <div key={i} className="cv-skill-box">
            <span className="cv-skill-box-title">{box.category}</span>
            <span className="cv-skill-box-items">{box.items.join(", ")}</span>
          </div>
        ))}
        {items[4] && (
          <div key={4} className="cv-skill-box cv-skill-box-full">
            <span className="cv-skill-box-title">{items[4].category}</span>
            <span className="cv-skill-box-items">{items[4].items.join(", ")}</span>
          </div>
        )}
      </div>
    </section>
  );
}

function CvTools({ items }: { items: CvCopy["tools"] }) {
  return (
    <section className="cv-section">
      <CvSectionTitle title="TOOLS" />
      <div className="cv-skills-grid">
        {items.slice(0, 4).map((box, i) => (
          <div key={i} className="cv-skill-box">
            <span className="cv-skill-box-title">{box.category}</span>
            <span className="cv-skill-box-items">{box.items.join(", ")}</span>
          </div>
        ))}
        {items[4] && (
          <div key={4} className="cv-skill-box cv-skill-box-full">
            <span className="cv-skill-box-title">{items[4].category}</span>
            <span className="cv-skill-box-items">{items[4].items.join(", ")}</span>
          </div>
        )}
      </div>
    </section>
  );
}

function CvExperience({ items }: { items: CvCopy["experience"] }) {
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
                    <>
                      {" "}
                      @{" "}
                      <a href={item.companyUrl} target="_blank" rel="noopener noreferrer">
                        {item.company}
                      </a>
                    </>
                  ) : (
                    <> @ {item.company}</>
                  )
                ) : null}
              </span>
              <span className="cv-experience-period">
                {item.period}
                {item.location ? ` | ${item.location}` : ""}
              </span>
            </div>
            <p className="cv-experience-desc">{item.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function CvFooterWithEduLang({
  footerLinks,
  education,
  languages,
}: Pick<CvCopy, "footerLinks" | "education" | "languages">) {
  return (
    <footer className="cv-footer">
      <div className="cv-footer-links">
        {footerLinks.map((link, i) => (
          <span key={link.url} className="cv-footer-link-wrap">
            {i > 0 && (
              <span className="cv-footer-sep" aria-hidden="true">
                ♦
              </span>
            )}
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
              <li key={i}>
                {lang.name} ({lang.level})
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

export type CvPrintPayload = Pick<
  CvCopy,
  | "header"
  | "professionalSummary"
  | "softSkills"
  | "coreSkills"
  | "tools"
  | "experience"
  | "footerLinks"
  | "education"
  | "languages"
>;

export function CvPrintView({ data }: { data: CvPrintPayload }) {
  return (
    <div className="cv-print-scope">
      <div className="cv-page-wrap">
        <CvHeader data={data.header} />
        <CvProfessionalSummary text={data.professionalSummary} />
        <CvSoftSkills items={data.softSkills} />
        <CvCoreSkills items={data.coreSkills} />
        <CvTools items={data.tools} />
        <CvExperience items={data.experience} />
        <CvFooterWithEduLang footerLinks={data.footerLinks} education={data.education} languages={data.languages} />
      </div>
    </div>
  );
}
