import { CvSectionTitle } from './CvSectionTitle';

interface CvProfessionalSummaryProps {
  text: string;
}

export function CvProfessionalSummary({ text }: CvProfessionalSummaryProps) {
  return (
    <section className="cv-section">
      <CvSectionTitle title="PROFESSIONAL SUMMARY" />
      <p className="cv-summary-text">{text}</p>
    </section>
  );
}
