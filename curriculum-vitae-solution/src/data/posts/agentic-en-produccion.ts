import type { BlogPost } from "@/types/blog";

export const agenticEnProduccion: BlogPost = {
  slug: "agentic-en-produccion",
  title: "Lo que cambia cuando un agente pasa del demo a producción",
  summary:
    "Un demo agentic se construye en una tarde. Lo que cuesta es el 5% de casos donde el agente se equivoca con plata, datos o usuarios de verdad.",
  date: "2026-08-04",
  topics: ["agentic", "producto"],
  featured: true,
  takeaway:
    "Si no puedes responder «qué pasa cuando el agente se equivoca» con un mecanismo y no con una intención, todavía no tienes un producto: tienes un demo con suerte.",
  body: [
    {
      kind: "p",
      text: "He construido sistemas multi-agente con roles, reglas y flujos de ejecución definidos desde 2023, y he integrado pagos en apps con transacciones reales. La distancia entre esas dos cosas es la que casi nadie mide: un agente que acierta el 95% de las veces es un demo espectacular y un producto inaceptable si el 5% restante toca dinero.",
    },
    { kind: "h2", text: "El demo miente por construcción" },
    {
      kind: "p",
      text: "Un demo se ejecuta una vez, con el input que elegiste, mirando la pantalla. Producción es lo contrario en las cuatro dimensiones: inputs que no anticipaste, miles de ejecuciones, nadie mirando, y consecuencias que persisten. Ninguna de esas cuatro se arregla con un mejor prompt.",
    },
    {
      kind: "table",
      head: ["Dimensión", "En el demo", "En producción"],
      rows: [
        ["Input", "El que elegiste", "El que el usuario escriba a las 2am"],
        ["Volumen", "Una corrida", "Miles, con costo por token"],
        ["Supervisión", "Tú, mirando", "Nadie, hasta que alguien reclama"],
        ["Error", "Repites la corrida", "Un registro mal escrito, un cobro mal hecho"],
      ],
    },
    { kind: "h2", text: "Roles, reglas y flujos explícitos" },
    {
      kind: "p",
      text: "El patrón que me ha funcionado no es «un agente inteligente», es **varios agentes tontos con contratos claros**. Cada uno tiene un rol estrecho, reglas que no puede violar, y un flujo donde su salida es la entrada verificable del siguiente. Cuando algo falla, sabes qué eslabón falló, porque cada eslabón tiene una sola responsabilidad.",
    },
    {
      kind: "code",
      lang: "ts",
      code: `// El contrato importa más que el prompt: define qué puede tocar el agente,
// qué debe devolver, y qué hace el sistema cuando no cumple.
type AgentContract<Input, Output> = {
  role: string;                      // una sola responsabilidad
  tools: ReadonlyArray<ToolName>;    // superficie mínima, no "todas"
  validate: (raw: unknown) => Output; // el schema es el guardia, no la fe
  onInvalid: "retry" | "escalate" | "fail";
  budget: { maxTokens: number; maxRetries: number };
};`,
    },
    {
      kind: "p",
      text: "Ese `validate` es la pieza que separa un sistema de un juguete. Si la salida del modelo entra a tu base de datos sin pasar por un schema, no tienes un agente: tienes una inyección de datos con pasos extra.",
    },
    { kind: "h2", text: "Context engineering es la mitad del trabajo" },
    {
      kind: "p",
      text: "Se habla de prompt engineering y se ignora lo que de verdad mueve la aguja: qué información ve el agente, en qué orden y con qué recencia. La mayoría de errores que he depurado no fueron de razonamiento, fueron de contexto — el agente decidió bien con información incompleta, obsoleta o contradictoria.",
    },
    {
      kind: "ul",
      items: [
        "Contexto mínimo suficiente: cada token irrelevante es ruido que compite con la instrucción.",
        "Recencia explícita: si el dato tiene fecha, dísela. Un agente no sabe que tu precio cambió ayer.",
        "Fuente única: dos versiones del mismo dato en el contexto es un bug garantizado, no un riesgo.",
        "Estado fuera del prompt: lo que debe persistir va a una base de datos, no a la ventana de contexto.",
      ],
    },
    { kind: "h2", text: "Evals, o no hay producto" },
    {
      kind: "p",
      text: "Sin evaluación automatizada no puedes cambiar nada: cada ajuste de prompt es una apuesta y cada modelo nuevo es una migración a ciegas. No necesitas un framework: necesitas un set de casos con salida esperada que corra en CI y falle el build cuando la calidad baja.",
    },
    {
      kind: "callout",
      tone: "note",
      title: "Empieza por los casos que ya fallaron",
      text: "El mejor set de evals no se diseña, se cosecha. Cada vez que el agente se equivoca en producción, ese caso entra al set. En tres semanas tienes una suite que representa tus fallos reales y no los que imaginaste.",
    },
    { kind: "h2", text: "Costo y latencia son requisitos, no métricas" },
    {
      kind: "p",
      text: "Un agente que resuelve el caso en 40 segundos y 12 llamadas al modelo puede ser correcto y aun así inviable. Trátalos como requisitos de producto desde el diseño: presupuesto de tokens por operación, techo de latencia, y una ruta degradada para cuando el presupuesto se agota. La ruta degradada suele ser lo más valioso del sistema.",
    },
    { kind: "h2", text: "Dónde poner al humano" },
    {
      kind: "p",
      text: "«Human in the loop» sin criterio es una casilla de confirmación que nadie lee. La pregunta útil es más estrecha: **qué acciones son irreversibles**. Ahí va el humano, y solo ahí. Todo lo reversible que necesite aprobación es fricción disfrazada de seguridad.",
    },
    {
      kind: "ol",
      items: [
        "Reversible y de bajo impacto: el agente actúa y registra.",
        "Reversible y de alto impacto: el agente actúa y notifica, con un deshacer real.",
        "Irreversible: el agente propone, el humano confirma. Sin excepciones.",
      ],
    },
    { kind: "h2", text: "El checklist que uso antes de decir que está listo" },
    {
      kind: "ul",
      items: [
        "Cada agente tiene un rol, un schema de salida y un presupuesto.",
        "Existe un set de evals que corre en CI con casos cosechados de fallos reales.",
        "Hay un techo de costo y latencia por operación, con ruta degradada.",
        "Las acciones irreversibles pasan por confirmación humana.",
        "Cada ejecución deja traza: input, contexto, salida, herramientas usadas, costo.",
        "Sé qué hace el sistema cuando el proveedor del modelo se cae.",
      ],
    },
    {
      kind: "p",
      text: "Ese último punto es el que más veces he visto ignorado. Un producto cuya única ruta pasa por una API de terceros hereda su disponibilidad. Si eso es aceptable, escríbelo y decide; si no, necesitas un plan B antes de lanzar, no después de la primera caída.",
    },
  ],
};
