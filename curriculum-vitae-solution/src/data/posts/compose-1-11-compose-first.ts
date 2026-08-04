import type { BlogPost } from "@/types/blog";

export const compose111ComposeFirst: BlogPost = {
  slug: "compose-1-11-compose-first",
  title: "Jetpack Compose 1.11: Grid, FlexBox y el cambio de testing que te va a romper la suite",
  summary:
    "El release de abril trae APIs que se pedían desde años. Pero el detalle que cuesta trabajo es que el framework de testing v2 pasó a ser el default.",
  date: "2026-07-02",
  topics: ["android", "mobile"],
  takeaway:
    "Antes de subir a 1.11, asume que tus tests van a fallar por una razón nueva: el dispatcher cambió. No es tu código, es el default, y se arregla avanzando el reloj virtual.",
  body: [
    {
      kind: "p",
      text: "El release de abril de 2026 de Jetpack Compose trae la versión 1.11 de los módulos core, y llega junto a un anuncio estratégico: **Google declaró que el desarrollo de UI en Android es Compose-first**, y el toolkit de Views entra en modo mantenimiento. Compose cumplió cinco años y deja de ser la alternativa moderna para ser el camino por defecto.",
    },
    { kind: "h2", text: "Las APIs que llegaron" },
    {
      kind: "ul",
      items: [
        "**Grid** y **FlexBox**: layouts que hasta ahora se resolvían con `Layout` a mano o con librerías de terceros.",
        "**MediaQuery**: adaptabilidad declarativa, en vez de leer configuración y ramificar a mano.",
        "**Styles**: una forma de agrupar decisiones visuales reutilizables — el eslabón que le faltaba a Compose para conectar con un design system sin envolver todo en composables propios.",
        "**Soporte de eventos de trackpad** de primera clase, relevante si te importan tablets, plegables y ChromeOS.",
        "**Herramientas de depuración de shared elements**, que era el punto ciego de las transiciones compartidas.",
      ],
    },
    {
      kind: "p",
      text: "De todas, la que más impacto tiene a mediano plazo es **Styles**. Si mantienes un design system, es la diferencia entre reimplementar cada componente y expresar tus tokens una vez.",
    },
    { kind: "h2", text: "El cambio de testing, que es el que duele" },
    {
      kind: "callout",
      tone: "warning",
      title: "Las APIs de test v2 son el default y las v1 quedaron deprecadas",
      text: "v1 usaba UnconfinedTestDispatcher, que ejecutaba las corrutinas inmediatamente. v2 usa StandardTestDispatcher: cuando lanzas una corrutina en un test, ahora queda en cola y no se ejecuta hasta que avanzas el reloj virtual.",
    },
    {
      kind: "p",
      text: "Traducido: tests que pasaban van a fallar sin que hayas tocado el código que prueban. Y van a fallar de la forma más confusa posible — el estado que esperabas simplemente no cambió, porque la corrutina que lo cambiaba nunca corrió. No es flakiness, es un cambio de semántica.",
    },
    {
      kind: "code",
      lang: "kotlin",
      code: `// Con v1 esto pasaba: la corrutina se ejecutaba al lanzarse.
// Con v2 queda en cola y hay que avanzar el reloj virtual.
@Test
fun cargaElListado() = runTest {
    viewModel.cargar()          // lanza una corrutina, ya no corre sola
    advanceUntilIdle()          // <- el paso que ahora es obligatorio
    assertEquals(3, viewModel.items.size)
}`,
    },
    {
      kind: "p",
      text: "Es un cambio a mejor: `StandardTestDispatcher` refleja el comportamiento real de una corrutina en la app, y los tests que pasaban por accidente dejan de hacerlo. Pero es trabajo, y conviene presupuestarlo como una tarea propia en vez de descubrirlo con el CI rojo.",
    },
    { kind: "h2", text: "Kotlin 2.2 y las recomposiciones" },
    {
      kind: "p",
      text: "La inferencia de estabilidad mejoró con Kotlin 2.2, lo que significa menos recomposiciones innecesarias sin tener que anotar `@Stable` a mano. Se han reportado reducciones del 15 al 20% en recomposiciones en pantallas con listas largas después del upgrade.",
    },
    {
      kind: "p",
      text: "Ese número me parece la mejor razón para subir, y también la razón para medir en vez de creer: si tienes una pantalla con listas que va lenta, mide recomposiciones antes y después en tu app. Un porcentaje de un blog no es tu benchmark.",
    },
    { kind: "h2", text: "Qué significa «Compose-first» para una decisión de stack" },
    {
      kind: "p",
      text: "Si estás decidiendo entre Views y Compose para algo nuevo, la decisión ya la tomó Google. Y si mantienes una app con pantallas en Views, esto no es una orden de migrar todo — es información para priorizar: la deuda en Views ya no va a recibir features, solo mantenimiento.",
    },
  ],
  sources: [
    {
      label: "Android Developers Blog — What's new in the Jetpack Compose April '26 release",
      url: "https://developer.android.com/blog/posts/whats-new-in-the-jetpack-compose-april-26-release",
    },
    {
      label: "Android Developers Blog — Android UI Development is Compose First",
      url: "https://android-developers.googleblog.com/2026/05/android-ui-development-is-compose-first.html",
    },
    {
      label: "Android Developers Blog — Celebrating 5 years of Jetpack Compose",
      url: "https://android-developers.googleblog.com/2026/07/five-years-of-jetpack-compose.html",
    },
  ],
};
