"use server";

import { headers } from "next/headers";
import { processSubmission, type FormResult } from "./process";
import { formLimiter } from "./rate-limit";
import { consultationSchema, contactSchema } from "./schemas";

async function clientKey() {
  const h = await headers();
  const forwarded = h.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || h.get("x-real-ip") || "unknown";
}

export async function submitContact(input: unknown): Promise<FormResult> {
  return processSubmission(contactSchema, input, { clientKey: await clientKey(), limiter: formLimiter });
}

export async function submitConsultation(input: unknown): Promise<FormResult> {
  return processSubmission(consultationSchema, input, { clientKey: await clientKey(), limiter: formLimiter });
}
