"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2 } from "lucide-react";
import { submitContact } from "@/lib/forms/actions";
import { contactSchema, contactTopics, type ContactInput } from "@/lib/forms/schemas";
import { DemoBanner, DemoReceipt, Field, FormError, Honeypot, Select, TextArea, TextInput, describedBy, submitClass } from "./fields";

type Values = ContactInput;

export function ContactForm() {
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
  } = useForm<Values>({
    resolver: zodResolver(contactSchema),
    shouldFocusError: true,
    defaultValues: { name: "", email: "", organisation: "", topic: undefined, message: "", consent: undefined },
  });

  useEffect(() => {
    startedAt.current = Date.now();
  }, [receipt]);

  useEffect(() => {
    if (receipt) receiptRef.current?.querySelector<HTMLElement>("[data-receipt-heading]")?.focus();
  }, [receipt]);

  const onSubmit = (values: Values) => {
    setFormError(null);
    startTransition(async () => {
      try {
        const result = await submitContact({
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
          if (key in values) setError(key as keyof Values, { message }, { shouldFocus: true });
        }
      } catch {
        setFormError("Something went wrong while sending the form. Please try again.");
      }
    });
  };

  if (receipt) {
    return (
      <div ref={receiptRef}>
        <DemoReceipt reference={receipt} title="Thank you — enquiry received (demo)." onReset={() => setReceipt(null)} />
      </div>
    );
  }

  return (
    <form method="post" onSubmit={(e) => void handleSubmit(onSubmit)(e)} noValidate className="relative space-y-6" aria-describedby="contact-demo" data-testid="contact-form">
      <div id="contact-demo">
        <DemoBanner />
      </div>
      {formError && <FormError message={formError} />}
      <Honeypot ref={honeypot} name="company_website" defaultValue="" />

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="c-name" label="Full name" error={errors.name?.message}>
          <TextInput
            id="c-name"
            autoComplete="name"
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={describedBy("c-name", { error: errors.name?.message })}
            {...register("name")}
          />
        </Field>
        <Field id="c-email" label="Work email" error={errors.email?.message}>
          <TextInput
            id="c-email"
            type="email"
            autoComplete="email"
            inputMode="email"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={describedBy("c-email", { error: errors.email?.message })}
            {...register("email")}
          />
        </Field>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="c-org" label="Organisation" optional error={errors.organisation?.message}>
          <TextInput
            id="c-org"
            autoComplete="organization"
            aria-invalid={errors.organisation ? true : undefined}
            aria-describedby={describedBy("c-org", { error: errors.organisation?.message })}
            {...register("organisation")}
          />
        </Field>
        <Field id="c-topic" label="Topic" error={errors.topic?.message}>
          <Select
            id="c-topic"
            defaultValue=""
            aria-invalid={errors.topic ? true : undefined}
            aria-describedby={describedBy("c-topic", { error: errors.topic?.message })}
            {...register("topic")}
          >
            <option value="" disabled>
              Choose a topic
            </option>
            {contactTopics.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </Select>
        </Field>
      </div>
      <Field id="c-message" label="Message" hint="At least 20 characters. Please do not include sensitive personal information." error={errors.message?.message}>
        <TextArea
          id="c-message"
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={describedBy("c-message", { hint: true, error: errors.message?.message })}
          {...register("message")}
        />
      </Field>
      <div>
        <label className="flex items-start gap-3 text-[0.95rem]">
          <input
            type="checkbox"
            className="mt-1 size-5 shrink-0 accent-signal"
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? "c-consent-error" : undefined}
            {...register("consent")}
          />
          <span>I understand this is a demo form on a fictional company&apos;s website and that nothing I enter will be sent or stored.</span>
        </label>
        {errors.consent && (
          <p id="c-consent-error" className="mt-1.5 text-sm text-danger">
            {errors.consent.message}
          </p>
        )}
      </div>
      <button
        type="submit"
        disabled={pending}
        className={submitClass}
      >
        {pending ? (
          <>
            <Loader2 aria-hidden="true" className="size-4 animate-spin" /> Validating…
          </>
        ) : (
          <>
            Send demo enquiry <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" />
          </>
        )}
      </button>
    </form>
  );
}
