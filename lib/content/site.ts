export const site = {
  name: "Halvaren",
  legalName: "Halvaren Advisory",
  tagline: "Technology decisions, made deliberately.",
  description:
    "Halvaren is a fictional, independent technology and business consultancy — a VIZAM concept project. Strategy, data and AI, cloud, resilience and delivery for regulated and asset-heavy organisations.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://halvaren.example").replace(/\/$/, ""),
  email: "hello@halvaren.example",
  conceptNotice: "VIZAM concept project — fictional company",
  conceptLong:
    "Halvaren is a fictional company created by VIZAM as a portfolio concept. It has no clients, staff or offices. Scenarios, roles and contact details on this site are illustrative.",
  /** Fictional studio cities (no addresses). */
  studios: [
    { city: "Lisbon", zone: "UTC+0", region: "Europe" },
    { city: "Toronto", zone: "UTC−5", region: "Americas" },
    { city: "Singapore", zone: "UTC+8", region: "Asia-Pacific" },
  ],
} as const;

export const mainNav = [
  { href: "/services", label: "Services" },
  { href: "/industries", label: "Industries" },
  { href: "/case-studies", label: "Case studies" },
  { href: "/insights", label: "Insights" },
  { href: "/about", label: "About" },
  { href: "/careers", label: "Careers" },
] as const;

export const commitments = [
  { title: "No vendor commissions", text: "We do not resell software or accept referral fees, so our recommendations have one client." },
  { title: "Decisions in writing", text: "Every significant recommendation comes with a decision record: context, options, choice, consequences." },
  { title: "Hand-over from day one", text: "Engagements are planned to end. Your team owns what we build together." },
  { title: "Evidence over assertion", text: "We say what we know, what we assume and what we would need to find out." },
] as const;

export const method = [
  { step: "01", title: "Orient", text: "Understand the decision that matters, the constraints around it and the people who live with the result." },
  { step: "02", title: "Decide", text: "Lay out credible options, make trade-offs explicit and record the choice with its reasoning." },
  { step: "03", title: "Build", text: "Prove the decision in working software, processes or pilots before scaling it." },
  { step: "04", title: "Hand over", text: "Transfer ownership deliberately, so the organisation runs and evolves the result itself." },
] as const;
