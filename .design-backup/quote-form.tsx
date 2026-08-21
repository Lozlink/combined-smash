"use client";

import { useActionState } from "react";
import { submitQuoteRequest, type QuoteFormState } from "./actions";

const initialState: QuoteFormState = { status: "idle" };

const inputClasses =
  "w-full rounded-sm border border-steel/60 bg-paper px-3 py-2.5 text-[15px] text-ink placeholder:text-steel focus:border-coveralls";

function FieldLabel({
  htmlFor,
  children,
  required,
}: {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="font-mono text-[11px] uppercase tracking-[0.14em] text-coveralls"
    >
      {children}
      {required && <span className="text-hivis"> *</span>}
    </label>
  );
}

export function QuoteForm() {
  const [state, formAction, pending] = useActionState(
    submitQuoteRequest,
    initialState,
  );

  if (state.status === "success") {
    return (
      <div className="rounded-sm border border-coveralls bg-white">
        <div className="flex items-center justify-between bg-coveralls px-5 py-3">
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-paper">
            Job request
          </span>
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-hivis">
            Received
          </span>
        </div>
        <div className="px-5 py-8">
          <p className="font-display text-3xl font-bold uppercase text-coveralls">
            Request sent
          </p>
          <p className="mt-3 max-w-md text-[15px] leading-relaxed">
            Thanks — we’ve got the details and we’ll call you back during
            workshop hours. If the car isn’t driveable, ring us now on{" "}
            <a
              href="tel:+61297999433"
              className="font-semibold text-coveralls underline decoration-hivis decoration-2 underline-offset-2"
            >
              (02) 9799 9433
            </a>
            .
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className="rounded-sm border border-coveralls bg-white"
    >
      <div className="flex items-center justify-between bg-coveralls px-5 py-3">
        <span className="font-mono text-xs uppercase tracking-[0.18em] text-paper">
          Job request
        </span>
        <span className="font-mono text-xs uppercase tracking-[0.18em] text-steel">
          Quote — no obligation
        </span>
      </div>

      <div className="grid gap-5 px-5 py-6 sm:grid-cols-2">
        <div className="hidden" aria-hidden="true">
          <label htmlFor="company">Company</label>
          <input id="company" name="company" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="flex flex-col gap-1.5">
          <FieldLabel htmlFor="name" required>
            Name
          </FieldLabel>
          <input
            id="name"
            name="name"
            defaultValue={state.values?.name}
            autoComplete="name"
            className={inputClasses}
            aria-invalid={state.errors?.name ? true : undefined}
          />
          {state.errors?.name && (
            <p className="text-sm text-[#b3400e]">{state.errors.name}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <FieldLabel htmlFor="phone" required>
            Phone
          </FieldLabel>
          <input
            id="phone"
            name="phone"
            defaultValue={state.values?.phone}
            type="tel"
            autoComplete="tel"
            className={inputClasses}
            aria-invalid={state.errors?.phone ? true : undefined}
          />
          {state.errors?.phone && (
            <p className="text-sm text-[#b3400e]">{state.errors.phone}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <input
            id="email"
            name="email"
            defaultValue={state.values?.email}
            type="email"
            autoComplete="email"
            className={inputClasses}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <FieldLabel htmlFor="vehicle">Vehicle — make, model, year</FieldLabel>
          <input
            id="vehicle"
            name="vehicle"
            defaultValue={state.values?.vehicle}
            placeholder="e.g. Toyota Corolla 2019"
            className={inputClasses}
          />
        </div>

        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <FieldLabel htmlFor="insurer">
            Insurance company — leave blank if paying privately
          </FieldLabel>
          <input id="insurer" name="insurer" defaultValue={state.values?.insurer} className={inputClasses} />
        </div>

        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <FieldLabel htmlFor="message" required>
            What happened?
          </FieldLabel>
          <textarea
            id="message"
            name="message"
            defaultValue={state.values?.message}
            rows={4}
            placeholder="Where the damage is, how it happened, or the work the car needs."
            className={inputClasses}
            aria-invalid={state.errors?.message ? true : undefined}
          />
          {state.errors?.message && (
            <p className="text-sm text-[#b3400e]">{state.errors.message}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-3 border-t border-primer px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        {state.status === "error" ? (
          <p className="text-sm text-[#b3400e]">{state.formError}</p>
        ) : (
          <p className="text-sm text-ink/60">
            We’ll call you back with a time to bring the car in.
          </p>
        )}
        <button
          type="submit"
          disabled={pending}
          className="rounded-sm bg-hivis px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.16em] text-coveralls-deep transition-colors hover:bg-[#ffc04a] disabled:opacity-60"
        >
          {pending ? "Sending…" : "Send request"}
        </button>
      </div>
    </form>
  );
}
