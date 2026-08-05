"use client";

import { useState } from "react";
import { clarityEvent } from "@/lib/analytics/clarity";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Message } from "@/components/ui/message";

/**
 * Captura de email al pie del blog.
 *
 * Sin esto, quien lee un post y no está listo para contratar se va sin dejar
 * rastro — y eso es la mayoría del tráfico de un blog técnico. El RSS no
 * sustituye una lista: nadie vuelve por su cuenta.
 */
export function SubscribeForm({ source }: { source?: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [errMsg, setErrMsg] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrMsg("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), source: source ?? "blog" }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { code?: string };
        setStatus("err");
        setErrMsg(
          data.code === "unconfigured"
            ? "La suscripción no está activa todavía. Puedes seguir el RSS mientras tanto."
            : "No se pudo suscribir. Intenta de nuevo.",
        );
        clarityEvent("subscribe_error");
        return;
      }
      setStatus("ok");
      setEmail("");
      clarityEvent("subscribe_success");
    } catch {
      setStatus("err");
      setErrMsg("Error de red.");
      clarityEvent("subscribe_error");
    }
  }

  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
      <Eyebrow>Sin ruido</Eyebrow>
      <h2 className="mt-2 font-[family-name:var(--font-display)] text-xl font-bold tracking-tight">
        Te aviso cuando publique
      </h2>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-[var(--muted)]">
        Notas de ingeniería sobre agentic en producción, mobile y decisiones de stack. Dos al mes como máximo, sin
        promociones.
      </p>

      <form onSubmit={onSubmit} className="mt-5 flex flex-col gap-3 sm:flex-row">
        <label htmlFor="subscribe-email" className="sr-only">
          Tu email
        </label>
        <input
          id="subscribe-email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@empresa.com"
          className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-sm outline-none ring-[var(--accent)] placeholder:text-[var(--muted)]/70 focus:ring-2"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="shrink-0 rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-bold text-[var(--accent-fg)] transition hover:brightness-110 disabled:opacity-60"
        >
          {status === "loading" ? "Enviando…" : "Suscribirme"}
        </button>
      </form>

      {status === "ok" && (
        <div className="mt-4">
          <Message>Listo. Te escribo cuando haya algo que valga la pena leer.</Message>
        </div>
      )}
      {status === "err" && (
        <div className="mt-4">
          <Message tone="error">{errMsg}</Message>
        </div>
      )}
    </section>
  );
}
