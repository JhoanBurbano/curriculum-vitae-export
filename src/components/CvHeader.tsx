import type { CvCopy } from '@/types/cv';

interface CvHeaderProps {
  data: CvCopy['header'];
}

function renderContactLine(
  line: string,
  links: Array<{ label: string; url: string }>
): (string | JSX.Element)[] {
  const parts: (string | JSX.Element)[] = [];
  let rest = line;
  for (const link of links) {
    const i = rest.indexOf(link.label);
    if (i === -1) continue;
    if (i > 0) parts.push(rest.slice(0, i));
    parts.push(
      <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer">
        {link.label}
      </a>
    );
    rest = rest.slice(i + link.label.length);
  }
  if (rest) parts.push(rest);
  return parts;
}

export function CvHeader({ data }: CvHeaderProps) {
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
        {contactParts.map((part, i) =>
          typeof part === 'string' ? <span key={i}>{part}</span> : part
        )}
      </p>
    </header>
  );
}
