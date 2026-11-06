import type { Metadata } from "next";
import { site } from "./content/site";

export function pageMetadata({
  title,
  description,
  path,
  image,
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
}): Metadata {
  const url = `${site.url}${path}`;
  const images = image ? [{ url: image, width: 1400, height: 933, alt: title }] : undefined;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} — ${site.name}`,
      description,
      url,
      siteName: site.name,
      type,
      locale: "en_GB",
      ...(images ? { images } : {}),
    },
    twitter: { card: "summary_large_image", title: `${title} — ${site.name}`, description },
  };
}

export function organisationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.legalName,
    alternateName: site.name,
    url: site.url,
    email: site.email,
    description: site.description,
    slogan: site.tagline,
    knowsAbout: ["Technology strategy", "Data and AI", "Cloud modernisation", "Cybersecurity", "Operating model design"],
    disambiguatingDescription: site.conceptLong,
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  };
}

/** Serialise JSON-LD safely for a <script> tag (escapes "<" to prevent breaking out of the tag). */
export function jsonLdString(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
