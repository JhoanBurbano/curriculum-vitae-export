import type { BlogPost } from "@/types/blog";

export const ios27AppIntents: BlogPost = {
  slug: "ios-27-app-intents",
  title: "iOS 27: App Intents deja de ser opcional y SiriKit queda deprecado",
  summary:
    "El anuncio con más consecuencias de WWDC 2026 no es una feature visible: es que la integración con Siri ahora pasa obligatoriamente por App Intents.",
  date: "2026-07-14",
  topics: ["ios", "mobile", "producto"],
  takeaway:
    "Si tu app tiene cualquier integración con Siri montada sobre SiriKit, ya tienes una fecha de vencimiento. Métela al roadmap de este trimestre, no del próximo.",
  body: [
    {
      kind: "p",
      text: "WWDC 2026 trajo lo esperable en titulares — Apple Intelligence más presente, SwiftUI y Xcode renovados — pero el cambio que obliga a mover el roadmap es más seco: **App Intents pasa a ser obligatorio para integrar con Siri, y SiriKit queda deprecado**.",
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Deprecado no es «roto», es «tienes un plazo»",
      text: "Una API deprecada sigue funcionando una o dos versiones más. Ese es exactamente el margen que hace que estas migraciones se posterguen hasta que se vuelven urgentes. Si tu app depende de SiriKit, el costo de migrar no baja esperando.",
    },
    { kind: "h2", text: "Por qué App Intents cambia el diseño, no solo el código" },
    {
      kind: "p",
      text: "SiriKit partía de dominios predefinidos por Apple: pedías comida, reservabas un viaje, mandabas un mensaje. Si tu producto no encajaba en un dominio, no había integración. App Intents invierte eso: tú declaras las acciones de tu app y el sistema las expone donde tenga sentido — Siri, Atajos, Spotlight, widgets.",
    },
    {
      kind: "p",
      text: "La consecuencia de producto es que **modelar tus intents es modelar tu producto**. La pregunta deja de ser técnica («cómo conecto Siri») y se vuelve de diseño: cuáles son las 5 a 10 acciones que un usuario querría invocar sin abrir la app. Esa lista es una decisión de producto y conviene tomarla antes de escribir el primer intent.",
    },
    { kind: "h2", text: "El resto del paquete para desarrolladores" },
    {
      kind: "ul",
      items: [
        "**Xcode 27 con capacidades de IA en el dispositivo**, orientadas a generación de código y flujo de trabajo local.",
        "**Swift refina el modelo de concurrencia**: garantías de aislamiento de datos más estrictas con menos anotaciones, que es la queja histórica del strict concurrency.",
        "**Macros más ergonómicas** para generación de código en compilación, y **Swift Package Manager** con mejor distribución multiplataforma.",
        "**Swift Testing y la interoperabilidad con C++** siguen madurando.",
        "**Apple Intelligence** amplía Writing Tools y agrega generación de imágenes con un modelo en nube privada, integrable desde tu app.",
      ],
    },
    { kind: "h2", text: "Qué haría yo antes de septiembre" },
    {
      kind: "ol",
      items: [
        "Audita si hay SiriKit en el proyecto. En apps que llevan años es común encontrar una integración que nadie recuerda haber hecho.",
        "Escribe la lista de acciones invocables del producto, con criterio de producto y no de API.",
        "Migra primero la acción de más uso, no la más fácil: es la que te enseña los bordes reales del modelo.",
        "Si vas a tocar concurrencia por el upgrade de Swift, hazlo en un commit separado. Mezclar migración de intents con cambios de aislamiento de datos es garantía de un diff que nadie puede revisar.",
      ],
    },
    {
      kind: "callout",
      tone: "note",
      title: "Verifica contra la documentación de Apple antes de estimar",
      text: "Este resumen viene de cobertura de prensa de WWDC 2026, no de las release notes oficiales. Sirve para decidir que hay que mirarlo; para estimar el trabajo, contrasta con la documentación de Apple y las notas de Xcode 27.",
    },
  ],
  sources: [
    { label: "iOS 27 — Wikipedia", url: "https://en.wikipedia.org/wiki/IOS_27" },
    {
      label: "AppleInsider — iOS 27, macOS 27, Siri: what to expect at WWDC 2026",
      url: "https://appleinsider.com/articles/26/06/05/ios-27-macos-27-siri-what-to-expect-to-launch-at-wwdc-2026",
    },
    {
      label: "TechRadar — 21 new features in iOS 27 Apple didn't mention in the keynote",
      url: "https://www.techradar.com/phones/ios/here-are-21-new-features-in-ios-27-that-apple-didnt-have-time-to-mention-during-its-wwdc-2026-keynote",
    },
  ],
};
