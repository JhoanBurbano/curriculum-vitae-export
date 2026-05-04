import raw from "@/data/cv-copy.json";
import type { CvCopy } from "@/types/cv";

export const cv: CvCopy = raw as CvCopy;

export function getCv(): CvCopy {
  return cv;
}
