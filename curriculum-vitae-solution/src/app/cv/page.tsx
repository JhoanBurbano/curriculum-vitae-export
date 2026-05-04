import type { Metadata } from "next";
import { CvPrintView } from "@/components/cv-print/cv-print-view";
import { CvDownloadFab } from "@/components/cv-download-fab";
import { getCv, getCvExperienceForPrint } from "@/lib/cv";

export const metadata: Metadata = {
  title: "CV",
  description: "CV en pantalla y descarga del PDF oficial.",
};

export default function CvPage() {
  const c = getCv();
  const payload = {
    header: c.header,
    professionalSummary: c.professionalSummary,
    softSkills: c.softSkills,
    coreSkills: c.coreSkills,
    tools: c.tools,
    experience: getCvExperienceForPrint(c.experience),
    footerLinks: c.footerLinks,
    education: c.education,
    languages: c.languages,
  };
  return (
    <>
      <div className="pb-28">
        <CvPrintView data={payload} />
      </div>
      <CvDownloadFab pdfBaseUrl={c.cvPdf.url} />
    </>
  );
}
