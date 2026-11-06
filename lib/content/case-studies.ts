import { images } from "./images";
import type { CaseStudy } from "./types";

/**
 * Every entry is an ILLUSTRATIVE SCENARIO written for this concept site. None describes a real client,
 * engagement or result. Outcomes are phrased as intended outcomes and the measures that would be tracked.
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: "regional-bank-resilience",
    title: "Mapping important services for a regional bank",
    industry: "financial-services",
    services: ["cyber-resilience", "technology-strategy"],
    summary:
      "How a mid-sized bank could move from backup reports to rehearsed recovery of the services customers depend on.",
    situation: [
      "A regional retail bank runs payments, card authorisation and online banking on a mix of in-house and outsourced platforms. Backup jobs report success, but no service has been recovered end to end.",
      "The board wants a credible answer to a simple question: if a destructive attack hit tomorrow, what would customers notice, and for how long?",
    ],
    approach: [
      { phase: "Orient", text: "Agree five important business services with business owners and map their technical dependencies, including identity, DNS and third parties." },
      { phase: "Decide", text: "Set impact tolerances per service and prioritise the gaps that would breach them." },
      { phase: "Build", text: "Rehearse recovery of one service in an isolated environment, then fix what the rehearsal reveals." },
      { phase: "Hand over", text: "Embed a half-yearly exercise cycle and a board reporting pack owned by the bank's resilience team." },
    ],
    decisions: [
      {
        id: "DR-RB-1",
        title: "Start with card authorisation, not online banking",
        context: "Online banking is the most visible service, but card authorisation has the lowest tolerance for disruption.",
        options: ["Most visible service first", "Lowest tolerance first", "All five services in parallel"],
        decision: "Rehearse card authorisation first because its tolerance is measured in minutes and its dependencies are least understood.",
        consequences: ["Less visible early progress for executives", "Highest-risk unknowns surface first"],
      },
    ],
    intendedOutcomes: [
      "A recovery sequence for each important service that has been rehearsed at least once",
      "A shared, current dependency map maintained by the bank's own team",
      "Board reporting expressed in service impact rather than control counts",
    ],
    measures: ["Time to recover in rehearsal versus agreed tolerance", "Number of unknown dependencies found per exercise", "Remediation actions closed per quarter"],
    image: images.financial,
    illustrative: true,
  },
  {
    slug: "grid-operator-it-ot",
    title: "Connecting plant and enterprise data at a grid operator",
    industry: "energy-utilities",
    services: ["cyber-resilience", "data-ai"],
    summary:
      "A scenario exploring how a network operator could share asset data with planners without widening its control-system attack surface.",
    situation: [
      "A distribution network operator wants maintenance planners to use near-real-time asset condition data. Today the data sits inside operational systems that are deliberately isolated.",
      "Direct connections would be fast to build and difficult to defend. The operator needs a pattern it can repeat safely across many sites.",
    ],
    approach: [
      { phase: "Orient", text: "Inventory data flows between operational and corporate zones and classify the assets involved." },
      { phase: "Decide", text: "Compare integration patterns against a threat model agreed with the control-room team." },
      { phase: "Build", text: "Pilot a one-way, brokered data path at a single substation group with full monitoring." },
      { phase: "Hand over", text: "Document the pattern as a reference architecture with operating procedures for rollout." },
    ],
    decisions: [
      {
        id: "DR-GO-1",
        title: "One-way data diodes for condition data",
        context: "Planners need data from operational networks; nothing in the corporate network needs to write back.",
        options: ["Firewalled bidirectional API", "Brokered one-way transfer", "Manual periodic export"],
        decision: "Use a brokered one-way transfer so that no session can be initiated from the corporate side.",
        consequences: ["Strong isolation preserved", "Write-back use cases need a separate, harder-to-justify design"],
      },
    ],
    intendedOutcomes: [
      "A repeatable integration pattern approved by both security and operations",
      "Planners working from current condition data rather than monthly extracts",
      "No new inbound paths into operational networks",
    ],
    measures: ["Data freshness at the planning tool", "Inbound connection attempts blocked at the boundary", "Sites onboarded using the reference pattern"],
    image: images.energy,
    illustrative: true,
  },
  {
    slug: "health-network-ai-evaluation",
    title: "An evaluation framework for clinical AI tools",
    industry: "health-life-sciences",
    services: ["data-ai", "product-delivery"],
    summary:
      "How a hospital network could assess AI tools offered by suppliers before they reach clinicians, consistently and transparently.",
    situation: [
      "A hospital network receives a steady stream of AI tool proposals from suppliers, from scheduling optimisers to imaging triage. Each is evaluated differently, if at all.",
      "Clinical leaders want a consistent, transparent process that protects patients without blocking useful innovation.",
    ],
    approach: [
      { phase: "Orient", text: "Review current procurement and clinical safety processes with clinicians, information governance and IT." },
      { phase: "Decide", text: "Define evaluation stages proportionate to risk, from paperwork review to local silent trials." },
      { phase: "Build", text: "Build a simple intake service and evaluation workbook, tested on two tools under consideration." },
      { phase: "Hand over", text: "Transfer ownership to a standing evaluation group with clear terms of reference." },
    ],
    decisions: [
      {
        id: "DR-HN-1",
        title: "Proportionate evaluation tiers",
        context: "A uniform, exhaustive process would stall low-risk tools; a light process would miss high-risk ones.",
        options: ["One process for all tools", "Risk-tiered process", "Rely on supplier certification only"],
        decision: "Three risk tiers, with local silent trials required only for tools that influence clinical decisions.",
        consequences: ["Faster decisions on administrative tools", "Requires agreed criteria for tier assignment"],
      },
    ],
    intendedOutcomes: [
      "A single, documented route for every AI tool proposal",
      "Evidence on local performance before clinical use",
      "Clear accountability for post-deployment monitoring",
    ],
    measures: ["Proposals assessed through the standard route", "Time from intake to decision by tier", "Tools with active post-deployment monitoring"],
    image: images.health,
    illustrative: true,
  },
  {
    slug: "manufacturer-multi-site-data",
    title: "Scaling a connected-factory pilot across sites",
    industry: "manufacturing",
    services: ["data-ai", "operating-model"],
    summary:
      "A scenario showing why a successful pilot line rarely scales, and how common data definitions and joint teams could change that.",
    situation: [
      "A components manufacturer built a promising quality-monitoring pilot on one line. Attempts to repeat it at two other sites stalled.",
      "Each site names equipment, defects and shifts differently, and plant engineering and enterprise IT disagree about who owns the solution.",
    ],
    approach: [
      { phase: "Orient", text: "Compare data definitions and ownership across three sites and identify what blocked replication." },
      { phase: "Decide", text: "Agree a minimal common data model and a joint engineering–IT product team." },
      { phase: "Build", text: "Rebuild the pilot against the common model and deploy it at a second site." },
      { phase: "Hand over", text: "Publish a site onboarding playbook owned by the joint product team." },
    ],
    decisions: [
      {
        id: "DR-MF-1",
        title: "A minimal common model, not an enterprise one",
        context: "A complete enterprise data model would take years; the pilot needed only a handful of shared definitions.",
        options: ["Full enterprise data model first", "Minimal model for this use case, extended as needed", "Per-site custom mappings"],
        decision: "Define only the entities this use case needs, governed so they can be extended by the next use case.",
        consequences: ["Rapid progress on the second site", "Model governance must be maintained as use cases grow"],
      },
    ],
    intendedOutcomes: [
      "The pilot running at a second site using shared definitions",
      "A joint team with clear ownership of plant data products",
      "A playbook that shortens each further site rollout",
    ],
    measures: ["Effort to onboard each additional site", "Share of plant data mapped to the common model", "Open ownership disputes"],
    image: images.manufacturing,
    illustrative: true,
  },
  {
    slug: "logistics-event-platform",
    title: "From nightly batches to real-time shipment events",
    industry: "transport-logistics",
    services: ["cloud-modernisation", "technology-strategy"],
    summary:
      "How a logistics operator could replace fragile overnight integrations with shared event streams, without risking peak season.",
    situation: [
      "A freight operator's planning, warehouse and customer systems exchange data in nightly batches. Customers see shipment status up to a day late, and failed batches are discovered in the morning.",
      "Any change must avoid the peak season, when the network runs at full capacity.",
    ],
    approach: [
      { phase: "Orient", text: "Map integrations, failure history and the operating calendar." },
      { phase: "Decide", text: "Choose an event-streaming pattern and the first two event types to publish." },
      { phase: "Build", text: "Run batch and events in parallel for one region outside peak, then switch consumers over." },
      { phase: "Hand over", text: "Establish an event catalogue and platform team that owns the streams." },
    ],
    decisions: [
      {
        id: "DR-LG-1",
        title: "Run batch and events in parallel",
        context: "A hard cut-over before peak season would put the whole network at risk.",
        options: ["Hard cut-over", "Parallel run with reconciliation", "Defer until after peak"],
        decision: "Run both for one region with automatic reconciliation, and switch consumers individually.",
        consequences: ["Temporary duplication of infrastructure cost", "Each switch can be reversed independently"],
      },
    ],
    intendedOutcomes: [
      "Shipment status available to customers within minutes rather than the next day",
      "Integration failures detected as they happen",
      "A catalogue of reusable events for future systems",
    ],
    measures: ["Event latency end to end", "Reconciliation mismatches during parallel run", "Consumers migrated from batch"],
    image: images.logistics,
    illustrative: true,
  },
  {
    slug: "agency-legacy-exit",
    title: "A legacy exit plan for a public case-management system",
    industry: "public-sector",
    services: ["product-delivery", "operating-model", "cloud-modernisation"],
    summary:
      "A scenario on replacing an ageing case-management system incrementally, while building an in-house team to own what replaces it.",
    situation: [
      "A public agency relies on a twenty-year-old case-management system. Previous attempts at wholesale replacement were cancelled after long procurement cycles.",
      "Staff work around the system with spreadsheets, and the agency has little in-house capability to own a modern alternative.",
    ],
    approach: [
      { phase: "Orient", text: "Research how caseworkers and citizens actually use the system, and map its functions and data." },
      { phase: "Decide", text: "Choose a first slice of functionality that can be replaced independently and accessibly." },
      { phase: "Build", text: "A blended team builds the first slice as an accessible service, integrated with the legacy core." },
      { phase: "Hand over", text: "Recruit and pair agency engineers so the in-house team leads the second slice." },
    ],
    decisions: [
      {
        id: "DR-PA-1",
        title: "Replace in slices, behind a stable interface",
        context: "Wholesale replacement had failed twice; each attempt was too large to deliver or fund.",
        options: ["New wholesale procurement", "Incremental replacement by slice", "Extend the legacy system"],
        decision: "Introduce a stable interface in front of the legacy core and replace functionality slice by slice.",
        consequences: ["Value delivered early and visibly", "Integration layer must be maintained during the transition"],
      },
    ],
    intendedOutcomes: [
      "A first replaced slice in live use, meeting accessibility standards",
      "An in-house team able to lead subsequent slices",
      "A published, realistic exit plan for the remaining legacy functions",
    ],
    measures: ["Share of case types handled by new services", "Accessibility audit results per release", "Proportion of changes led by agency engineers"],
    image: images.publicSector,
    illustrative: true,
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}
