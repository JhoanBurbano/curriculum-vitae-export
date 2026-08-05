import { z } from "zod";

/**
 * Suscripción al blog.
 *
 * Mismos canales que `/api/service-request` y por el mismo motivo: nada de
 * filesystem, que en Vercel es de solo lectura y efímero.
 *
 *   1. RESEND_API_KEY + LEADS_TO_EMAIL  -> aviso por email de cada suscripción
 *   2. SUBSCRIBE_WEBHOOK_URL o LEADS_WEBHOOK_URL -> POST (Buttondown, Sheet, n8n…)
 *   3. ninguno -> 503 con `code: "unconfigured"`
 *
 * No es una lista de correo de verdad: es la vía mínima para no perder a alguien
 * que leyó un post y no está listo para contratar. Cuando el volumen lo pida,
 * el webhook apunta a un proveedor real sin tocar el frontend.
 */

const bodySchema = z.object({
  email: z.string().email().max(200),
  /** Desde qué post llegó, si aplica: dice qué tema convierte. */
  source: z.string().max(120).optional(),
});

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return Response.json({ error: "JSON inválido" }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return Response.json({ error: "Email inválido" }, { status: 422 });
  }

  const { email, source = "blog" } = parsed.data;
  const at = new Date().toISOString();
  const key = process.env.RESEND_API_KEY;
  const to = process.env.LEADS_TO_EMAIL;
  const webhook = process.env.SUBSCRIBE_WEBHOOK_URL ?? process.env.LEADS_WEBHOOK_URL;

  try {
    if (key && to) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: process.env.LEADS_FROM_EMAIL ?? "Blog <onboarding@resend.dev>",
          to: [to],
          subject: `Nueva suscripción al blog: ${email}`,
          text: `Email: ${email}\nOrigen: ${source}\nFecha: ${at}`,
        }),
      });
      if (!res.ok) throw new Error(`Resend respondió ${res.status}`);
      return Response.json({ ok: true });
    }

    if (webhook) {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "subscribe", email, source, at }),
      });
      if (!res.ok) throw new Error(`Webhook respondió ${res.status}`);
      return Response.json({ ok: true });
    }
  } catch (err) {
    console.error("[subscribe] fallo al entregar la suscripción", err);
    return Response.json({ error: "No se pudo suscribir", code: "delivery_failed" }, { status: 502 });
  }

  console.error("[subscribe] sin canal configurado; suscripción NO entregada", { source });
  return Response.json({ error: "Suscripción no disponible", code: "unconfigured" }, { status: 503 });
}
