import { z } from "zod";

const name = z
  .string()
  .trim()
  .min(2, "Please enter your name.")
  .max(100, "Please keep your name under 100 characters.");

const email = z
  .string()
  .trim()
  .min(1, "Please enter your email address.")
  .max(200, "Please keep your email under 200 characters.")
  .pipe(z.email("Please enter a valid email address, like name@example.com."));

const organisation = z
  .string()
  .trim()
  .max(120, "Please keep the organisation name under 120 characters.")
  .optional()
  .or(z.literal(""));

const consent = z.literal(true, { error: "Please confirm you understand this is a demo form." });

export const contactTopics = ["General enquiry", "Media", "Partnerships", "Careers", "Other"] as const;

export const contactSchema = z.object({
  name,
  email,
  organisation,
  topic: z.enum(contactTopics, { error: "Please choose a topic." }),
  message: z
    .string()
    .trim()
    .min(20, "Please write at least 20 characters so we understand your enquiry.")
    .max(2000, "Please keep your message under 2,000 characters."),
  consent,
});

export type ContactInput = z.infer<typeof contactSchema>;

export const consultationAreas = [
  "technology-strategy",
  "data-ai",
  "cloud-modernisation",
  "cyber-resilience",
  "operating-model",
  "product-delivery",
] as const;

/** Industry values the consultation form offers (kept in sync with lib/content/industries.ts by a unit test). */
export const industryOptions = [
  "financial-services",
  "energy-utilities",
  "health-life-sciences",
  "manufacturing",
  "transport-logistics",
  "public-sector",
  "other",
] as const;

export const organisationSizes = ["Under 250 people", "250–1,000", "1,000–10,000", "Over 10,000"] as const;
export const timeframes = ["Exploring", "Within 3 months", "3–6 months", "6+ months"] as const;

export const consultationSchema = z.object({
  name,
  email,
  organisation: z
    .string()
    .trim()
    .min(2, "Please enter your organisation.")
    .max(120, "Please keep the organisation name under 120 characters."),
  role: z.string().trim().max(100, "Please keep your role under 100 characters.").optional().or(z.literal("")),
  industry: z.enum(industryOptions, { error: "Please choose an industry." }),
  size: z.enum(organisationSizes, { error: "Please choose an organisation size." }),
  areas: z
    .array(z.enum(consultationAreas))
    .min(1, "Please choose at least one area.")
    .max(consultationAreas.length),
  timeframe: z.enum(timeframes, { error: "Please choose a timeframe." }),
  challenge: z
    .string()
    .trim()
    .min(40, "Please describe the challenge in at least 40 characters.")
    .max(3000, "Please keep the description under 3,000 characters."),
  consent,
});

export type ConsultationInput = z.infer<typeof consultationSchema>;

/** Field errors keyed by field name, first message only. */
export function firstErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}
