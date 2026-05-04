import Clarity from "@microsoft/clarity";

let initializedProjectId: string | null = null;

/** Inicializa Clarity una vez por pestaña si hay `projectId`. */
export function initClarityIfNeeded(projectId: string | undefined): void {
  if (typeof window === "undefined" || !projectId?.trim()) return;
  const id = projectId.trim();
  if (initializedProjectId === id) return;
  Clarity.init(id);
  try {
    Clarity.consentV2({ analytics_Storage: "granted", ad_Storage: "granted" });
  } catch {
    try {
      Clarity.consent(true);
    } catch {
      /* noop */
    }
  }
  initializedProjectId = id;
}

export function clarityEvent(eventName: string): void {
  if (typeof window === "undefined" || !initializedProjectId) return;
  try {
    Clarity.event(eventName);
  } catch {
    /* noop */
  }
}

export function claritySetTag(key: string, value: string | string[]): void {
  if (typeof window === "undefined" || !initializedProjectId) return;
  try {
    Clarity.setTag(key, value);
  } catch {
    /* noop */
  }
}

export function clarityUpgrade(reason: string): void {
  if (typeof window === "undefined" || !initializedProjectId) return;
  try {
    Clarity.upgrade(reason);
  } catch {
    /* noop */
  }
}
