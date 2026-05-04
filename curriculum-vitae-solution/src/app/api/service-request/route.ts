import { mkdir, appendFile } from "fs/promises";
import path from "path";
import { z } from "zod";
import { getCv } from "@/lib/cv";

const bodySchema = z.object({
  serviceId: z.string().min(1),
  name: z.string().min(2).max(120),
  email: z.string().email().max(200),
  company: z.string().max(120).optional(),
  message: z.string().min(10).max(8000),
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
    return Response.json({ error: "Datos inválidos", details: parsed.error.flatten() }, { status: 422 });
  }

  const { serviceId, name, email, company = "", message } = parsed.data;
  const services = getCv().services;
  if (!services.some((s) => s.id === serviceId)) {
    return Response.json({ error: "Servicio no válido" }, { status: 422 });
  }

  const line = JSON.stringify({
    at: new Date().toISOString(),
    serviceId,
    name,
    email,
    company,
    message,
  });

  const dir = path.join(process.cwd(), ".data");
  const file = path.join(dir, "leads.jsonl");
  try {
    await mkdir(dir, { recursive: true });
    await appendFile(file, `${line}\n`, "utf8");
  } catch {
    return Response.json({ error: "No se pudo persistir" }, { status: 500 });
  }

  return Response.json({ ok: true });
}
