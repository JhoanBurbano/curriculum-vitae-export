import type { BlogPost } from "@/types/blog";

export const expoSdk57NuevaArquitectura: BlogPost = {
  slug: "expo-sdk-57-nueva-arquitectura",
  title: "Expo SDK 57 y el fin de la Old Architecture: qué revisar si tienes una app en producción",
  summary:
    "La New Architecture dejó de ser opcional en SDK 55. Si vienes de más atrás, la migración no es un flag: es una revisión de dependencias, builds y tests.",
  date: "2026-07-28",
  topics: ["mobile", "producto"],
  takeaway:
    "Si tu app sigue en SDK 54 o anterior, el trabajo real no es subir de versión: es auditar qué librerías nativas todavía asumen el Bridge. Empieza por ahí, no por el upgrade.",
  body: [
    {
      kind: "p",
      text: "Expo SDK 57 llegó con React Native 0.86, y viene detrás de SDK 56 — publicado el 21 de mayo de 2026 — que trajo React Native 0.85 y React 19.2. Lo importante para quien mantiene una app con usuarios no es la lista de features: es que **desde SDK 55 la New Architecture está siempre activa y no se puede desactivar**.",
    },
    {
      kind: "callout",
      tone: "warning",
      title: "No hay escotilla de escape",
      text: "En SDK 54 y anteriores podías desactivar la New Architecture cuando algo se rompía. Desde SDK 55 esa opción no existe: si una dependencia nativa no está migrada, el problema no se posterga con un flag, se resuelve o se reemplaza la dependencia.",
    },
    { kind: "h2", text: "Qué cambió realmente por debajo" },
    {
      kind: "p",
      text: "La New Architecture reemplaza tres piezas del runtime, y cada una tiene su superficie de ruptura:",
    },
    {
      kind: "table",
      head: ["Pieza legacy", "Reemplazo", "Qué se rompe"],
      rows: [
        ["Bridge asíncrono", "JSI (JavaScript Interface)", "Módulos que asumían serialización JSON entre JS y nativo"],
        ["Renderer viejo", "Fabric", "Medición de layout y manipulación directa de vistas"],
        ["Native Modules", "TurboModules", "Librerías nativas sin especificación tipada"],
      ],
    },
    { kind: "h2", text: "El cambio que rompe builds sin avisar" },
    {
      kind: "p",
      text: "De todo lo que trajo SDK 56, el que más he visto morder es que **`expo prebuild` ahora limpia y regenera los directorios nativos `android` e `ios` por defecto**. Si tenías modificaciones a mano en esas carpetas — un archivo de Gradle tocado, un entitlement añadido a mano, un Podfile con un parche — desaparecen en el siguiente prebuild.",
    },
    {
      kind: "p",
      text: "La solución no es dejar de correr prebuild: es mover cada modificación a un config plugin, que es donde debió estar siempre. Vale la pena hacerlo antes de subir de SDK, con el build actual verde, para no depurar dos cosas a la vez.",
    },
    { kind: "h2", text: "Lo que sí vale la pena por lo que gana" },
    {
      kind: "ul",
      items: [
        "**Expo UI listo para producción**, que baja la cantidad de componentes de sistema que tienes que reimplementar.",
        "**Builds nativos más rápidos** y **diffing de bytecode Hermes activado por defecto**, que reduce el peso de las actualizaciones.",
        "**APIs de Calendar, Contacts y MediaLibrary mejoradas** — si tu app toca alguna, revisa el changelog antes de asumir que la firma es la misma.",
        "El **nuevo sistema de animaciones** de React Native 0.85, disponible para todas las apps gestionadas por Expo.",
      ],
    },
    { kind: "h2", text: "El orden que yo seguiría" },
    {
      kind: "ol",
      items: [
        "Inventaría tus dependencias nativas y verifica cuáles declaran soporte de New Architecture. Esta lista es el plan de migración real.",
        "Mueve todas las modificaciones nativas hechas a mano a config plugins, con el SDK actual todavía verde.",
        "Sube un SDK a la vez y compila en cada paso. Saltar de 54 a 57 mezcla tres conjuntos de breaking changes en un solo diff imposible de bisecar.",
        "Corre la app en dispositivo físico, no solo en simulador: los fallos de Fabric aparecen en medición de layout y gestos reales.",
        "Recién ahí toca features nuevas.",
      ],
    },
    {
      kind: "quote",
      text: "Migrar de SDK no es una tarea de infraestructura que se hace «cuando haya tiempo». Cada versión que te atrasas convierte un upgrade de una semana en un proyecto de un mes.",
    },
  ],
  sources: [
    { label: "Expo changelog — SDK 57", url: "https://expo.dev/changelog/sdk-57" },
    { label: "Expo SDK 56", url: "https://expo.dev/sdk/56" },
    { label: "React Native's New Architecture — Expo Documentation", url: "https://docs.expo.dev/guides/new-architecture/" },
  ],
};
