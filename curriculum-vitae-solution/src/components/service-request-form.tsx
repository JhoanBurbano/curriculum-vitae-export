"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { CvService } from "@/types/cv";

const initial = { name: "", email: "", company: "", message: "" };

const messagePlaceholder = `Ej.: Objetivo del proyecto, fecha deseada, presupuesto orientativo, enlaces (Figma, web actual), integraciones necesarias (CRM, pagos, analytics)…`;

export function ServiceRequestForm({ services }: { services: CvService[] }) {
  const searchParams = useSearchParams();
  const defaultService = searchParams.get("service") ?? "";
  const [serviceId, setServiceId] = useState(defaultService && services.some((s) => s.id === defaultService) ? defaultService : services[0]?.id ?? "");
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [errMsg, setErrMsg] = useState("");

  const selected = useMemo(() => services.find((s) => s.id === serviceId), [services, serviceId]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrMsg("");
    try {
      const res = await fetch("/api/service-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId,
          name: form.name.trim(),
          email: form.email.trim(),
          company: form.company.trim(),
          message: form.message.trim(),
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setStatus("err");
        setErrMsg(data.error ?? "No se pudo enviar. Intenta de nuevo.");
        return;
      }
      setStatus("ok");
      setForm(initial);
    } catch {
      setStatus("err");
      setErrMsg("Error de red.");
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.18)] sm:p-9 lg:p-10"
    >
      <div className="border-b border-[var(--border)] pb-6">
        <h2 className="font-[family-name:var(--font-display)] text-xl font-bold sm:text-2xl">Tu solicitud</h2>
        <p className="mt-2 text-sm text-[var(--muted)]">Campos mínimos para responderte con una propuesta o preguntas concretas.</p>
      </div>

      <div className="mt-8 space-y-6">
        <fieldset>
          <legend className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">Tipo de trabajo</legend>
          <label htmlFor="service" className="sr-only">
            Servicio o pack
          </label>
          <select
            id="service"
            name="service"
            value={serviceId}
            onChange={(e) => setServiceId(e.target.value)}
            className="mt-3 w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-sm font-medium outline-none ring-[var(--accent)] focus:ring-2"
          >
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.title}
              </option>
            ))}
          </select>
          {selected && <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{selected.description}</p>}
        </fieldset>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="text-sm font-semibold text-[var(--fg)]">
              Nombre completo
            </label>
            <input
              id="name"
              name="name"
              required
              autoComplete="name"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-sm outline-none ring-[var(--accent)] focus:ring-2"
            />
          </div>
          <div>
            <label htmlFor="email" className="text-sm font-semibold text-[var(--fg)]">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-sm outline-none ring-[var(--accent)] focus:ring-2"
            />
          </div>
        </div>

        <div>
          <label htmlFor="company" className="text-sm font-semibold text-[var(--fg)]">
            Empresa / proyecto <span className="font-normal text-[var(--muted)]">(opcional)</span>
          </label>
          <input
            id="company"
            name="company"
            autoComplete="organization"
            value={form.company}
            onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
            className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-sm outline-none ring-[var(--accent)] focus:ring-2"
          />
        </div>

        <div>
          <label htmlFor="message" className="text-sm font-semibold text-[var(--fg)]">
            Mensaje
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            placeholder={messagePlaceholder}
            value={form.message}
            onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
            className="mt-2 w-full resize-y rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-sm leading-relaxed outline-none ring-[var(--accent)] placeholder:text-[var(--muted)]/70 focus:ring-2"
          />
        </div>

        {status === "ok" && (
          <p className="rounded-xl border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-4 py-3 text-sm font-medium text-[var(--fg)]">Listo. Revisa tu bandeja en las próximas horas; si no llega nada, revisa spam.</p>
        )}
        {status === "err" && (
          <p className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-400">{errMsg}</p>
        )}

        <div className="flex flex-col gap-3 border-t border-[var(--border)] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-[var(--muted)]">Al enviar aceptas ser contactado/a en relación con esta solicitud.</p>
          <button
            type="submit"
            disabled={status === "loading"}
            className="inline-flex min-w-[200px] items-center justify-center rounded-full bg-[var(--accent)] px-8 py-3.5 text-sm font-bold text-[var(--accent-fg)] transition hover:brightness-110 disabled:opacity-60 sm:ml-auto"
          >
            {status === "loading" ? "Enviando…" : "Enviar solicitud"}
          </button>
        </div>
      </div>
    </form>
  );
}
