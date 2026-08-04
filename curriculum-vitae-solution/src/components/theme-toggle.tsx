"use client";

import { useTheme } from "next-themes";
import { clarityEvent } from "@/lib/analytics/clarity";
import { IconButton } from "@/components/ui/icon-button";

/**
 * Toggle de tema.
 *
 * Ya no usa un flag `mounted` en un efecto. Antes hacía falta porque el glifo
 * dependía de `resolvedTheme`, que en el servidor es `undefined`, y pintarlo
 * distinto en cliente rompía la hidratación. Ahora se renderizan los dos glifos y
 * la clase `.dark` decide cuál se ve: el markup del servidor y del cliente son
 * idénticos, así que desaparecen el estado, el efecto y el parpadeo del
 * placeholder — y con ellos el error de lint por `setState` dentro de un efecto.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <IconButton
      label="Cambiar tema"
      onClick={() => {
        clarityEvent("theme_toggle");
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
      }}
    >
      <span aria-hidden className="dark:hidden">
        ☾
      </span>
      <span aria-hidden className="hidden dark:inline">
        ☀
      </span>
    </IconButton>
  );
}
