interface CvSectionTitleProps {
  title: string;
}

export function CvSectionTitle({ title }: CvSectionTitleProps) {
  return (
    <h2 className="cv-section-title">
      <span className="cv-section-title-text">{title}</span>
      <span className="cv-section-title-line" />
    </h2>
  );
}
