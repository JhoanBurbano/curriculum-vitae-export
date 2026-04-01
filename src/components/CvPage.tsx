import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import type { CvCopy } from '@/types/cv';
import { CvHeader } from './CvHeader';
import { CvProfessionalSummary } from './CvProfessionalSummary';
import { CvCoreSkills } from './CvCoreSkills';
import { CvTools } from './CvTools';
import { CvExperience } from './CvExperience';
import { CvFooterWithEduLang } from './CvFooterWithEduLang';

interface CvPageProps {
  data: CvCopy;
}

/** Página del CV: solo tu info. Componentes usados: CvHeader, CvProfessionalSummary, CvCoreSkills, CvSelectedProjects, CvExperience, CvFooterWithEduLang. */
export function CvPage({ data }: CvPageProps) {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `CV-${data.header.nameLine1}-${data.header.nameLine2}`,
    pageStyle: `
      @page { size: A4; margin: 12mm; }
      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; background: #000 !important; }
      .cv-page-wrap { box-shadow: none !important; }
      a[href] { text-decoration: underline; }
    `,
  });

  return (
    <>
      <div className="cv-toolbar no-print">
        <button type="button" onClick={handlePrint} className="cv-toolbar-btn">
          Export PDF
        </button>
      </div>
      <div ref={printRef} className="cv-page-wrap">
        <CvHeader data={data.header} />
        <CvProfessionalSummary text={data.professionalSummary} />
        <CvCoreSkills items={data.coreSkills} />
        <CvTools items={data.tools} />
        <CvExperience items={data.experience} />
        <CvFooterWithEduLang
          footerLinks={data.footerLinks}
          education={data.education}
          languages={data.languages}
        />
      </div>
    </>
  );
}
