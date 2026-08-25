"use client";

import { useActionState } from "react";
import type { Dictionary } from "@/lib/i18n";
import { submitQuoteRequest, type QuoteFormState } from "./actions";

type FormCopy = Dictionary["form"];

const initialState: QuoteFormState = { status: "idle" };

function FieldLabel({
  htmlFor,
  children,
  required,
  hint,
}: {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
  hint?: string;
}) {
  return (
    <label htmlFor={htmlFor} className="flex items-baseline gap-2">
      <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-coveralls">
        {children}
        {required && <span className="text-hivis"> *</span>}
      </span>
      {hint && <span className="text-xs text-ink/45">{hint}</span>}
    </label>
  );
}

function FieldError({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} className="flex items-center gap-1.5 text-sm text-[#b3400e]">
      <svg viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5 shrink-0" aria-hidden="true">
        <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1Zm0 3.4a.8.8 0 0 1 .8.8v3.4a.8.8 0 0 1-1.6 0V5.2a.8.8 0 0 1 .8-.8Zm0 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z" />
      </svg>
      {children}
    </p>
  );
}

function FormShell({
  status,
  t,
  children,
}: {
  status: "open" | "done";
  t: FormCopy;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden border border-coveralls bg-white shadow-[0_24px_50px_-34px_rgb(14_31_45/0.6)]">
      <div className="flex items-center justify-between gap-4 bg-coveralls px-5 py-3.5 sm:px-6">
        <span className="flex items-center gap-2.5">
          <span className="hazard-fine block h-4 w-[4px]" aria-hidden="true" />
          <span className="font-mono text-xs uppercase tracking-[0.16em] text-paper">
            {t.header}
          </span>
        </span>
        <span
          className={`font-mono text-xs uppercase tracking-[0.16em] ${
            status === "done" ? "text-hivis" : "text-steel"
          }`}
        >
          {status === "done" ? t.received : t.noObligation}
        </span>
      </div>
      {children}
    </div>
  );
}

export function QuoteForm({ t }: { t: FormCopy }) {
  const [state, formAction, pending] = useActionState(submitQuoteRequest, initialState);

  if (state.status === "success") {
    return (
      <FormShell status="done" t={t}>
        <div className="px-6 py-12 sm:px-8">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-hivis text-coveralls-deep">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="h-6 w-6" aria-hidden="true">
              <path d="m5 12.5 4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <p className="display mt-6 text-4xl text-coveralls">{t.successTitle}</p>
          <p className="mt-4 max-w-md leading-relaxed text-ink/75">
            {t.successBefore}
            <a
              href="tel:+61297999433"
              className="font-semibold text-coveralls underline decoration-hivis decoration-2 underline-offset-2"
            >
              (02) 9799 9433
            </a>
            {t.successAfter}
          </p>
        </div>
      </FormShell>
    );
  }

  return (
    <FormShell status="open" t={t}>
      <form action={formAction} noValidate>
        <div className="grid gap-5 px-6 py-7 sm:grid-cols-2 sm:px-8 sm:py-8">
          {/* Honeypot: real visitors never see this field. */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="company">Company</label>
            <input id="company" name="company" tabIndex={-1} autoComplete="off" />
          </div>

          <div className="flex flex-col gap-2">
            <FieldLabel htmlFor="name" required>
              {t.name}
            </FieldLabel>
            <input
              id="name"
              name="name"
              defaultValue={state.values?.name}
              autoComplete="name"
              className="field"
              aria-invalid={state.errors?.name ? true : undefined}
              aria-describedby={state.errors?.name ? "name-error" : undefined}
            />
            {state.errors?.name && <FieldError id="name-error">{state.errors.name}</FieldError>}
          </div>

          <div className="flex flex-col gap-2">
            <FieldLabel htmlFor="phone" required>
              {t.phone}
            </FieldLabel>
            <input
              id="phone"
              name="phone"
              defaultValue={state.values?.phone}
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              className="field"
              aria-invalid={state.errors?.phone ? true : undefined}
              aria-describedby={state.errors?.phone ? "phone-error" : undefined}
            />
            {state.errors?.phone && <FieldError id="phone-error">{state.errors.phone}</FieldError>}
          </div>

          <div className="flex flex-col gap-2">
            <FieldLabel htmlFor="email" hint={t.optional}>
              {t.email}
            </FieldLabel>
            <input
              id="email"
              name="email"
              defaultValue={state.values?.email}
              type="email"
              autoComplete="email"
              className="field"
            />
          </div>

          <div className="flex flex-col gap-2">
            <FieldLabel htmlFor="vehicle">{t.vehicle}</FieldLabel>
            <input
              id="vehicle"
              name="vehicle"
              defaultValue={state.values?.vehicle}
              placeholder={t.vehiclePlaceholder}
              className="field"
            />
          </div>

          <div className="flex flex-col gap-2 sm:col-span-2">
            <FieldLabel htmlFor="insurer" hint={t.insurerHint}>
              {t.insurer}
            </FieldLabel>
            <input
              id="insurer"
              name="insurer"
              defaultValue={state.values?.insurer}
              className="field"
            />
          </div>

          <div className="flex flex-col gap-2 sm:col-span-2">
            <FieldLabel htmlFor="message" required>
              {t.message}
            </FieldLabel>
            <textarea
              id="message"
              name="message"
              defaultValue={state.values?.message}
              rows={5}
              placeholder={t.messagePlaceholder}
              className="field resize-y"
              aria-invalid={state.errors?.message ? true : undefined}
              aria-describedby={state.errors?.message ? "message-error" : undefined}
            />
            {state.errors?.message && (
              <FieldError id="message-error">{state.errors.message}</FieldError>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-steel/25 bg-primer/50 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p aria-live="polite" className="text-sm">
            {state.status === "error" ? (
              <span className="text-[#b3400e]">{state.formError}</span>
            ) : (
              <span className="text-ink/60">{t.footer}</span>
            )}
          </p>
          <button
            type="submit"
            disabled={pending}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-sm bg-hivis px-7 py-3.5 font-mono text-xs font-bold uppercase tracking-[0.14em] text-coveralls-deep transition-colors hover:bg-hivis-bright disabled:cursor-not-allowed disabled:opacity-60"
          >
            {pending ? t.sending : t.send}
            {!pending && (
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.2" className="h-3.5 w-3.5" aria-hidden="true">
                <path d="M3 10h13M11 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
        </div>
      </form>
    </FormShell>
  );
}
