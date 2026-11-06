const formatter = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

/** Format an ISO date (YYYY-MM-DD) deterministically, independent of server time zone. */
export function formatDate(iso: string) {
  return formatter.format(new Date(`${iso}T00:00:00Z`));
}
