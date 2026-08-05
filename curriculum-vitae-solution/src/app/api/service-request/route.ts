import { z } from "zod";
import { getCv } from "@/lib/cv";

/**
 * Recepción de solicitudes de servicio.
 *
 * Antes escribía los leads en `.data/leads.jsonl` con `fs`. En Vercel el
 * filesystem es de solo lectura fuera de /tmp, así que en producción SIEMPRE
 * devolvía 500 y el lead se perdía — verificado contra www.jsburbano.dev el
 * 2026-08-05: `{"error":"No se pudo persistir"}`. Y aunque hubiera escrito, en
 * un runtime efímero el archivo desaparece en el siguiente arranque en frío.
 *
 * Ahora el lead sale del servidor por un canal configurable, sin tocar disco:
 *
 *   1. RESEND_API_KEY + LEADS_TO_EMAIL  -> email vía la API de Resend
 *   2. LEADS_WEBHOOK_URL                -> POST del JSON (Zapier, Make, n8n, Slack)
 *   3. ninguno                          -> 503 con `code: "unconfigured"`
 *
 * El caso 3 no es un fallo silencioso: el formulario lo detecta y ofrece un
 * `mailto:` con el mensaje ya redactado, así que la solicitud llega igual
 * mientras no haya credenciales configuradas.
 */

const bodySchema = z.object({
  serviceId: z.string().min(1),
  name: z.string().min(2).max(120),
  email: z.string().email().max(200),
  company: z.string().max(120).optional(),
  /** Rango de presupuesto: permite triar sin gastar una ronda de correos. */
  budget: z.string().max(60).optional(),
  /** Plazo deseado. El otro calificador que decide si el proyecto es viable. */
  timeline: z.string().max(60).optional(),
  message: z.string().min(10).max(8000),
});

type Lead = z.infer<typeof bodySchema> & { at: string; serviceLabel: string };

function renderText(lead: Lead): string {
  return [
    `Servicio:     ${lead.serviceLabel} (${lead.serviceId})`,
    `Nombre:       ${lead.name}`,
    `Email:        ${lead.email}`,
    `Empresa:      ${lead.company || "—"}`,
    `Presupuesto:  ${lead.budget || "no indicado"}`,
    `Plazo:        ${lead.timeline || "no indicado"}`,
    `Recibido:     ${lead.at}`,
    "",
    lead.message,
  ].join("\n");
}

async function sendWithResend(lead: Lead): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.LEADS_TO_EMAIL;
  if (!key || !to) return false;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.LEADS_FROM_EMAIL ?? "Solicitudes <onboarding@resend.dev>",
      to: [to],
      reply_to: lead.email,
      subject: `Solicitud: ${lead.serviceLabel} — ${lead.name}${lead.budget ? ` · ${lead.budget}` : ""}`,
      text: renderText(lead),
    }),
  });
  if (!res.ok) throw new Error(`Resend respondió ${res.status}`);
  return true;
}

async function sendWithWebhook(lead: Lead): Promise<boolean> {
  const url = process.env.LEADS_WEBHOOK_URL;
  if (!url) return false;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ kind: "service-request", ...lead, text: renderText(lead) }),
  });
  if (!res.ok) throw new Error(`Webhook respondió ${res.status}`);
  return true;
}

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return Response.json({ error: "JSON inválido" }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return Response.json({ error: "Datos inválidos", details: parsed.error.flatten() }, { status: 422 });
  }

  const services = getCv().services;
  const service = services.find((s) => s.id === parsed.data.serviceId);
  if (!service) {
    return Response.json({ error: "Servicio no válido" }, { status: 422 });
  }

  const lead: Lead = { ...parsed.data, at: new Date().toISOString(), serviceLabel: service.title };

  try {
    const delivered = (await sendWithResend(lead)) || (await sendWithWebhook(lead));
    if (!delivered) {
      // Sin canal configurado. Se responde explícito para que el formulario
      // ofrezca el mailto en vez de tragarse la solicitud.
      console.error("[service-request] sin canal de entrega configurado; lead NO entregado", {
        serviceId: lead.serviceId,
      });
      return Response.json({ error: "Canal de contacto no configurado", code: "unconfigured" }, { status: 503 });
    }
  } catch (err) {
    console.error("[service-request] fallo al entregar el lead", err);
    return Response.json({ error: "No se pudo entregar la solicitud", code: "delivery_failed" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
