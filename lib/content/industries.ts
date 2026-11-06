import { images } from "./images";
import type { Industry } from "./types";

export const industries: Industry[] = [
  {
    slug: "financial-services",
    title: "Financial services",
    short: "Banks, insurers and market infrastructure under constant regulatory and cost pressure.",
    summary:
      "Modernising core platforms and data while staying demonstrably in control: operational resilience, model risk and cost to serve.",
    context: [
      "Financial institutions carry decades of systems that still work, and still matter. The challenge is to change them without disrupting services customers and regulators depend on.",
      "Supervisors increasingly expect firms to show how important business services are mapped, tested and recoverable, and how automated decisions are governed.",
    ],
    pressures: [
      "Operational resilience expectations for important business services",
      "Core platform complexity and rising run costs",
      "Model risk management for analytics and AI",
      "Third-party and cloud concentration risk",
    ],
    solutions: [
      { title: "Core modernisation roadmaps", text: "Incremental paths away from monolithic cores, sequenced by risk and value." },
      { title: "Resilience by service", text: "Important services mapped to dependencies, tolerances and tested recovery." },
      { title: "Governed AI", text: "Use cases with documented data lineage, evaluation and human oversight." },
    ],
    relatedServices: ["technology-strategy", "cyber-resilience", "data-ai"],
    image: images.financial,
  },
  {
    slug: "energy-utilities",
    title: "Energy & utilities",
    short: "Networks and generators adapting to decentralised, data-intensive energy systems.",
    summary:
      "Connecting operational technology and IT safely, using grid and asset data well, and protecting critical infrastructure.",
    context: [
      "Energy systems are becoming more distributed and more digital. Network operators and generators must manage far more data and far more connected assets than their systems were designed for.",
      "At the same time, operational technology is critical national infrastructure: every integration decision is also a security decision.",
    ],
    pressures: [
      "Integration of distributed generation and flexible demand",
      "IT/OT convergence and the security exposure it creates",
      "Asset data quality for maintenance and investment planning",
      "Long asset lifecycles alongside fast-moving software",
    ],
    solutions: [
      { title: "IT/OT architecture", text: "Segmented, observable integration patterns between operational and corporate systems." },
      { title: "Asset data foundations", text: "Ownership and quality practices for the data behind maintenance decisions." },
      { title: "Critical infrastructure security", text: "Threat-led reviews and recovery exercises for control environments." },
    ],
    relatedServices: ["cyber-resilience", "data-ai", "technology-strategy"],
    image: images.energy,
  },
  {
    slug: "health-life-sciences",
    title: "Health & life sciences",
    short: "Providers, research organisations and suppliers handling sensitive data at scale.",
    summary:
      "Interoperable services, trustworthy data use and secure platforms where privacy and safety are non-negotiable.",
    context: [
      "Health organisations hold some of the most sensitive data there is, spread across systems that rarely talk to each other well.",
      "Better data use can improve care and research, but only with strong privacy engineering, clinical safety thinking and transparent governance.",
    ],
    pressures: [
      "Interoperability between clinical, administrative and research systems",
      "Privacy, consent and secondary use of health data",
      "Cyber threats targeting care delivery",
      "Evaluating AI tools safely before they reach clinicians",
    ],
    solutions: [
      { title: "Interoperability strategy", text: "Standards-based integration plans that reduce point-to-point dependencies." },
      { title: "Privacy-by-design data platforms", text: "De-identification, access control and auditability designed in." },
      { title: "AI evaluation frameworks", text: "Structured assessment of AI tools for safety, bias and operational fit." },
    ],
    relatedServices: ["data-ai", "cyber-resilience", "product-delivery"],
    image: images.health,
  },
  {
    slug: "manufacturing",
    title: "Manufacturing & industrial",
    short: "Producers connecting plant, supply chain and enterprise systems.",
    summary:
      "Plant-floor data, connected operations and enterprise platforms that support how factories actually run.",
    context: [
      "Manufacturers are connecting plant equipment, quality systems and enterprise platforms to get a clearer view of operations. Many initiatives stall between pilot line and full rollout.",
      "Success depends on standard data models, realistic scaling plans and operating models that bring engineering and IT together.",
    ],
    pressures: [
      "Scaling connected-factory pilots across sites",
      "Fragmented plant data and inconsistent definitions",
      "Supply chain visibility and planning",
      "Ageing ERP and manufacturing execution systems",
    ],
    solutions: [
      { title: "Site-scalable data models", text: "Common definitions that let one site's solution work at the next." },
      { title: "ERP and MES roadmaps", text: "Options for renewing core systems without halting production." },
      { title: "Engineering-IT operating models", text: "Joint teams and decision rights across plant and enterprise." },
    ],
    relatedServices: ["data-ai", "operating-model", "technology-strategy"],
    image: images.manufacturing,
  },
  {
    slug: "transport-logistics",
    title: "Transport & logistics",
    short: "Operators and logistics firms running real-time, asset-heavy networks.",
    summary:
      "Real-time visibility, resilient platforms and planning systems for networks where delays cascade.",
    context: [
      "Transport and logistics networks run on tight margins and real-time decisions. A single system outage can cascade across a network within hours.",
      "Modernising planning, tracking and customer systems requires careful sequencing around peak periods and operational constraints.",
    ],
    pressures: [
      "Real-time tracking across partners and modes",
      "Legacy planning and scheduling systems",
      "Resilience during peak and disruption periods",
      "Data sharing with partners and authorities",
    ],
    solutions: [
      { title: "Event-driven architectures", text: "Shared, real-time event streams instead of nightly batch integration." },
      { title: "Peak-aware migration planning", text: "Change windows and rollback plans built around the operating calendar." },
      { title: "Partner data exchange", text: "Agreed data contracts and secure interfaces with partners." },
    ],
    relatedServices: ["cloud-modernisation", "operating-model", "technology-strategy"],
    image: images.logistics,
  },
  {
    slug: "public-sector",
    title: "Public sector",
    short: "Government bodies and agencies delivering services that everyone must be able to use.",
    summary:
      "Accessible digital services, legacy modernisation and procurement-aware delivery, accountable to the public.",
    context: [
      "Public bodies must serve everyone, including people who find digital services hardest to use, while modernising systems under scrutiny and fixed budgets.",
      "Good public technology is open about its decisions, accessible by default and designed so that the organisation can sustain it without permanent outside help.",
    ],
    pressures: [
      "Accessibility and inclusion obligations",
      "Ageing case management and payment systems",
      "Procurement rules and value-for-money scrutiny",
      "Building internal digital capability",
    ],
    solutions: [
      { title: "Service design and delivery", text: "User-centred services built to accessibility standards from the first sprint." },
      { title: "Legacy exit plans", text: "Incremental replacement strategies that keep services running." },
      { title: "Capability building", text: "Blended teams and hand-over plans that leave lasting in-house skills." },
    ],
    relatedServices: ["product-delivery", "operating-model", "cloud-modernisation"],
    image: images.publicSector,
  },
];

export function getIndustry(slug: string) {
  return industries.find((i) => i.slug === slug);
}
