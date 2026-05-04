import raw from "@/data/cv-copy.json";
import type { CvCopy } from "@/types/cv";

export const cv: CvCopy = raw as CvCopy;

export function getCv(): CvCopy {
  return cv;
}

const LAUNCH_IN_PERIOD = /\blaunch\b/i;

/** CV en pantalla: orden del JSON (más reciente primero), sin filas tipo launch en `period`, máximo `limit`. */
export function getCvExperienceForPrint(experience: CvCopy["experience"], limit = 4): CvCopy["experience"] {
  return experience.filter((e) => !LAUNCH_IN_PERIOD.test(e.period)).slice(0, limit);
}
