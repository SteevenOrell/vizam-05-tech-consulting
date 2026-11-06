"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2 } from "lucide-react";
import { submitConsultation } from "@/lib/forms/actions";
import { consultationSchema, organisationSizes, timeframes, type ConsultationInput } from "@/lib/forms/schemas";
import { DemoBanner, DemoReceipt, Field, FormError, Honeypot, Select, TextArea, TextInput, describedBy } from "./fields";

type Option = { slug: string; title: string };

function Legend({ n, children }: { n: string; children: string }) {
  return (
    <legend className="mb-5 flex w-full items-center gap-3 border-b border-ink pb-3">
      <span className="font-mono text-sm text-signal">{n}</span>
      <span className="text-[1.25rem] tracking-[-0.02em]">{children}</span>
    </legend>
  );
}

export function ConsultationForm({
  industries,
  services,
  initialArea,
}: {
  industries: Option[];
  services: Option[];
  initialArea?: string;
}) {
  const [pending, startTransition] = useTransition();
  const [receipt, setReceipt] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const startedAt = useRef(0);
  const honeypot = useRef<HTMLInputElement>(null);
  const receiptRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<ConsultationInput>({
    resolver: zodResolver(consultationSchema),
    defaultValues: {
      name: "",
      email: "",
      organisation: "",
      role: "",
      industry: undefined,
      size: undefined,
      areas: initialArea ? ([initialArea] as ConsultationInput["areas"]) : [],
      timeframe: undefined,
      challenge: "",
      consent: undefined,
    },
  });

  useEffect(() => {
    startedAt.current = Date.now();
  }, [receipt]);

  useEffect(() => {
    if (receipt) receiptRef.current?.querySelector<HTMLElement>("[data-receipt-heading]")?.focus();
  }, [receipt]);

  const onSubmit = (values: ConsultationInput) => {
    setFormError(null);
    startTransition(async () => {
      try {
        const result = await submitConsultation({
          ...values,
          company_website: honeypot.current?.value ?? "",
          startedAt: startedAt.current,
        });
        if (result.status === "success") {
          reset();
          setReceipt(result.reference);
          return;
        }
        setFormError(result.message);
        for (const [key, message] of Object.entries(result.fieldErrors ?? {})) {
          if (key in values) setError(key as keyof ConsultationInput, { message }, { shouldFocus: true });
        }
      } catch {
        setFormError("Something went wrong while sending the form. Please try again.");
      }
    });
  };

  if (receipt) {
    return (
      <div ref={receiptRef}>
        <DemoReceipt reference={receipt} title="Consultation request received (demo)." onReset={() => setReceipt(null)} />
      </div>
    );
  }

  return (
    <form method="post" onSubmit={(e) => void handleSubmit(onSubmit)(e)} noValidate className="relative space-y-12" data-testid="consultation-form">
      <DemoBanner />
      {formError && <FormError message={formError} />}
      <Honeypot ref={honeypot} name="company_website" defaultValue="" />

      <fieldset>
        <Legend n="01">About you</Legend>
        <div className="grid gap-6 sm:grid-cols-2">
          <Field id="q-name" label="Full name" error={errors.name?.message}>
            <TextInput id="q-name" autoComplete="name" aria-invalid={errors.name ? true : undefined} aria-describedby={describedBy("q-name", { error: errors.name?.message })} {...register("name")} />
          </Field>
          <Field id="q-email" label="Work email" error={errors.email?.message}>
            <TextInput id="q-email" type="email" inputMode="email" autoComplete="email" aria-invalid={errors.email ? true : undefined} aria-describedby={describedBy("q-email", { error: errors.email?.message })} {...register("email")} />
          </Field>
          <Field id="q-org" label="Organisation" error={errors.organisation?.message}>
            <TextInput id="q-org" autoComplete="organization" aria-invalid={errors.organisation ? true : undefined} aria-describedby={describedBy("q-org", { error: errors.organisation?.message })} {...register("organisation")} />
          </Field>
          <Field id="q-role" label="Your role" optional error={errors.role?.message}>
            <TextInput id="q-role" autoComplete="organization-title" aria-invalid={errors.role ? true : undefined} aria-describedby={describedBy("q-role", { error: errors.role?.message })} {...register("role")} />
          </Field>
        </div>
      </fieldset>

      <fieldset>
        <Legend n="02">Your organisation</Legend>
        <div className="grid gap-6 sm:grid-cols-2">
          <Field id="q-industry" label="Industry" error={errors.industry?.message}>
            <Select id="q-industry" defaultValue="" aria-invalid={errors.industry ? true : undefined} aria-describedby={describedBy("q-industry", { error: errors.industry?.message })} {...register("industry")}>
              <option value="" disabled>
                Choose an industry
              </option>
              {industries.map((i) => (
                <option key={i.slug} value={i.slug}>
                  {i.title}
                </option>
              ))}
              <option value="other">Other</option>
            </Select>
          </Field>
          <Field id="q-size" label="Organisation size" error={errors.size?.message}>
            <Select id="q-size" defaultValue="" aria-invalid={errors.size ? true : undefined} aria-describedby={describedBy("q-size", { error: errors.size?.message })} {...register("size")}>
              <option value="" disabled>
                Choose a size
              </option>
              {organisationSizes.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </Select>
          </Field>
        </div>
      </fieldset>

      <fieldset aria-describedby={errors.areas ? "q-areas-error" : undefined}>
        <Legend n="03">Where you need help</Legend>
        <p className="-mt-2 mb-4 text-sm text-slate">Choose one or more practices.</p>
        <div className="grid gap-2 sm:grid-cols-2">
          {services.map((s) => (
            <label
              key={s.slug}
              className="flex min-h-12 cursor-pointer items-center gap-3 border border-rule bg-paper px-4 py-3 transition-colors has-[:checked]:border-ink has-[:checked]:bg-paper-2 hover:border-ink"
            >
              <input type="checkbox" value={s.slug} className="size-5 shrink-0 accent-signal" {...register("areas")} />
              <span>{s.title}</span>
            </label>
          ))}
        </div>
        {errors.areas && (
          <p id="q-areas-error" className="mt-2 text-sm text-danger">
            {errors.areas.message ?? "Please choose at least one area."}
          </p>
        )}
        <div className="mt-6 max-w-sm">
          <Field id="q-timeframe" label="Timeframe" error={errors.timeframe?.message}>
            <Select id="q-timeframe" defaultValue="" aria-invalid={errors.timeframe ? true : undefined} aria-describedby={describedBy("q-timeframe", { error: errors.timeframe?.message })} {...register("timeframe")}>
              <option value="" disabled>
                Choose a timeframe
              </option>
              {timeframes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </Select>
          </Field>
        </div>
      </fieldset>

      <fieldset>
        <Legend n="04">The decision you are weighing</Legend>
        <Field
          id="q-challenge"
          label="Describe the challenge"
          hint="What decision is on the table, what makes it hard, and what happens if it is not made. At least 40 characters. Please avoid confidential or personal information."
          error={errors.challenge?.message}
        >
          <TextArea id="q-challenge" rows={7} aria-invalid={errors.challenge ? true : undefined} aria-describedby={describedBy("q-challenge", { hint: true, error: errors.challenge?.message })} {...register("challenge")} />
        </Field>
        <div className="mt-6">
          <label className="flex items-start gap-3 text-[0.95rem]">
            <input type="checkbox" className="mt-1 size-5 shrink-0 accent-signal" aria-invalid={errors.consent ? true : undefined} aria-describedby={errors.consent ? "q-consent-error" : undefined} {...register("consent")} />
            <span>I understand this is a demo form on a fictional company&apos;s website and that nothing I enter will be sent or stored.</span>
          </label>
          {errors.consent && (
            <p id="q-consent-error" className="mt-1.5 text-sm text-danger">
              {errors.consent.message}
            </p>
          )}
        </div>
      </fieldset>

      <button
        type="submit"
        disabled={pending}
        className="group inline-flex min-h-12 items-center gap-2 rounded-[2px] bg-ink px-6 py-3 font-medium text-paper transition-colors hover:bg-signal disabled:opacity-70"
      >
        {pending ? (
          <>
            <Loader2 aria-hidden="true" className="size-4 animate-spin" /> Validating…
          </>
        ) : (
          <>
            Send demo request <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" />
          </>
        )}
      </button>
    </form>
  );
}
