import type { CvCopy } from "@/types/cv";
import { getAllProjects } from "@/lib/projects";
import { Eyebrow } from "@/components/ui/eyebrow";

/**
 * Cifras de trayectoria.
 *
 * Todas se **calculan desde `cv-copy.json`**, no se escriben a mano. Dos razones:
 * no pueden quedar desactualizadas cuando cambie el CV, y sobre todo no pueden
 * ser inventadas — cada número de aquí es verificable recorriendo los datos del
 * propio sitio.
 *
 * Lo que NO está aquí, a propósito: métricas de resultado de cliente (conversión,
 * errores, tiempos). Esas no se pueden derivar de estos datos y no se inventan;
 * van en el campo `impact` de cada proyecto cuando existan las reales.
 */

/** Pasarelas de pago integradas, leídas de coreSkills → Fintech. */
function countGateways(cv: CvCopy): number {
  const KNOWN = ["stripe", "mercadopago", "wompi", "payu", "kushki", "payvalida", "payválida", "conekta", "adyen", "openpay"];
  const items = cv.coreSkills.flatMap((g) => g.items).concat(cv.tools.flatMap((g) => g.items));
  const found = new Set(
    items
      .map((i) => i.toLowerCase().trim())
      .filter((i) => KNOWN.includes(i))
      .map((i) => i.replace("payválida", "payvalida")),
  );
  return found.size;
}

/** Roles con liderazgo técnico explícito en el título. */
function countLeadRoles(cv: CvCopy): number {
  return cv.experience.filter((e) => /team lead|tech lead|lead\b/i.test(e.role)).length;
}

/**
 * Casos de portada con dominio público vivo.
 *
 * Se cuentan solo los `spotlight`, no todos los proyectos con URL. Contar los 11
 * daría "10 productos en vivo", cierto en lo literal pero inflado en el fondo:
 * varios son landings propias, no trabajo entregado. Un número que un cliente
 * puede desinflar preguntando es peor que un número más pequeño y sólido.
 */
function countLiveProducts(cv: CvCopy): number {
  return getAllProjects(cv).filter((p) => p.spotlight && Boolean(p.webUrl || p.appUrl)).length;
}

export function CareerStats({ cv }: { cv: CvCopy }) {
  const stats = [
    { value: String(countGateways(cv)), label: "pasarelas de pago integradas en producción" },
    { value: String(countLeadRoles(cv)), label: "roles con liderazgo técnico de equipo" },
    { value: String(countLiveProducts(cv)), label: "productos con dominio público en vivo" },
    { value: String(cv.experience.length), label: "equipos y productos donde he construido" },
  ];

  return (
    <section className="border-b border-[var(--border)] bg-[var(--surface)]/40">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14">
        <Eyebrow tone="muted">Trayectoria, en cifras verificables</Eyebrow>
        <dl className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <dd className="font-[family-name:var(--font-display)] text-4xl font-extrabold leading-none text-[var(--accent-ink)] sm:text-5xl">
                {s.value}
              </dd>
              <dt className="mt-3 text-xs leading-snug text-[var(--muted)]">{s.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
