"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { claritySetTag, initClarityIfNeeded } from "@/lib/analytics/clarity";

const projectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;

/** Carga Clarity en cliente y etiqueta la ruta actual para filtros en el panel. */
export function ClarityProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    initClarityIfNeeded(projectId);
  }, []);

  useEffect(() => {
    if (!pathname) return;
    claritySetTag("route", pathname);
    claritySetTag("screen", pathname === "/" ? "home" : pathname.replace(/^\//, "").replace(/\//g, "_") || "home");
  }, [pathname]);

  return <>{children}</>;
}
