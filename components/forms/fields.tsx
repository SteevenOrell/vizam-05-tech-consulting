"use client";

import { CheckCircle2, AlertTriangle } from "lucide-react";
import { forwardRef, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from "react";

export const inputClass =
  "block w-full rounded-[var(--radius-field)] border border-graphite/45 bg-paper px-4 py-3 text-[1rem] text-ink placeholder:text-slate/80 transition-colors focus:border-ink focus:outline-2 focus:outline-offset-1 focus:outline-signal aria-[invalid=true]:border-danger";

export function Field({
  id,
  label,
  hint,
  error,
  optional,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  optional?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="flex items-baseline justify-between gap-3 text-[0.95rem] font-medium">
        <span>{label}</span>
        {optional && <span className="mono-label font-normal text-slate">Optional</span>}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="mt-1 text-sm text-slate">
          {hint}
        </p>
      )}
      <div className="mt-2">{children}</div>
      {error && (
        <p id={`${id}-error`} className="mt-1.5 flex items-start gap-1.5 text-sm text-danger">
          <AlertTriangle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

export function describedBy(id: string, { hint, error }: { hint?: boolean; error?: string }) {
  return [hint ? `${id}-hint` : null, error ? `${id}-error` : null].filter(Boolean).join(" ") || undefined;
}

export const TextInput = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(function TextInput(props, ref) {
  return <input ref={ref} {...props} className={inputClass} />;
});

export const TextArea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(function TextArea(props, ref) {
  return <textarea ref={ref} rows={6} {...props} className={`${inputClass} min-h-36 resize-y`} />;
});

export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(function Select(props, ref) {
  return <select ref={ref} {...props} className={`${inputClass} appearance-auto`} />;
});

/** Visually hidden trap field. Humans never see or fill it; many bots do. */
export const Honeypot = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(function Honeypot(props, ref) {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label htmlFor="company_website">Company website (leave empty)</label>
      <input ref={ref} id="company_website" type="text" tabIndex={-1} autoComplete="off" {...props} />
    </div>
  );
});

export function DemoBanner() {
  return (
    <p className="flex items-start gap-3 rounded-[var(--radius-field)] bg-paper-2 px-4 py-3 text-sm text-graphite">
      <span className="mono-label mt-0.5 shrink-0 text-signal">Demo form</span>
      <span>
        Submissions are validated on the server and then discarded. Nothing is sent, stored or logged, because Halvaren
        is a fictional company and no email provider is connected.
      </span>
    </p>
  );
}

export function DemoReceipt({ reference, onReset, title }: { reference: string; onReset: () => void; title: string }) {
  return (
    <div className="card overflow-hidden" role="status" aria-live="polite" data-testid="demo-receipt">
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 bg-ink px-5 py-3">
        <p className="mono-label text-phosphor">Demo receipt · {reference}</p>
        <p className="mono-label text-mist">Not delivered</p>
      </div>
      <div className="p-6 md:p-8">
        <CheckCircle2 aria-hidden="true" className="size-7 text-signal" />
        <h2 className="mt-4 text-[1.6rem] leading-tight" tabIndex={-1} data-receipt-heading="">
          {title}
        </h2>
        <p className="mt-3 max-w-xl text-graphite">
          Your answers passed server-side validation. This is a demo submission: it was not delivered to anyone, and
          your details were not stored or logged. In a live version, a member of the team would reply within two
          working days.
        </p>
        <button
          type="button"
          onClick={onReset}
          className="mt-6 inline-flex min-h-11 items-center rounded-full border border-ink px-5 font-mono text-[0.8rem] font-medium uppercase tracking-[0.06em] transition-colors hover:bg-ink hover:text-paper"
        >
          Start a new demo submission
        </button>
      </div>
    </div>
  );
}

export function FormError({ message }: { message: string }) {
  return (
    <div role="alert" className="flex items-start gap-2 rounded-[var(--radius-field)] border border-danger bg-surface px-4 py-3 text-danger" data-testid="form-error">
      <AlertTriangle aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
      <p>{message}</p>
    </div>
  );
}

/** Pill submit button shared by both forms. */
export const submitClass =
  "group inline-flex min-h-12 items-center gap-2.5 rounded-full bg-ink px-6 py-3 font-mono text-[0.8rem] font-medium uppercase tracking-[0.06em] text-paper transition-colors hover:bg-signal disabled:opacity-70";
