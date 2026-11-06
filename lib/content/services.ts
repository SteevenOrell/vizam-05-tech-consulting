import { images } from "./images";
import type { Service } from "./types";

export const services: Service[] = [
  {
    slug: "technology-strategy",
    index: "01",
    title: "Technology strategy & architecture",
    short: "Target architectures and roadmaps that a board can fund and an engineering team can build.",
    summary:
      "We help leadership teams decide what to build, buy, retire and leave alone, and write those decisions down so they survive the next reorganisation.",
    intro: [
      "Most technology strategies fail in translation: the slide that convinces the board is not the document that guides an engineer on a Tuesday afternoon. We work on both at once.",
      "An engagement starts with the business decisions the organisation must make in the next three years, then works backwards to the capabilities, platforms and architectural principles those decisions depend on.",
    ],
    questions: [
      "Which of our systems are strategic, and which are simply old?",
      "What should the target architecture look like, and what is the cheapest credible path to it?",
      "Where does build, buy or partner make sense, and how do we know?",
      "How do we stop architecture decisions from being made by accident?",
    ],
    activities: [
      { title: "Capability mapping", text: "A shared map of business capabilities, the systems that support them and how well they do it." },
      { title: "Target architecture", text: "A small number of principles and a reference architecture, expressed in diagrams engineers recognise." },
      { title: "Sequenced roadmap", text: "Investment steps ordered by dependency and risk, each with an explicit exit point." },
      { title: "Decision governance", text: "A lightweight architecture decision process, with records, owners and review dates." },
    ],
    deliverables: [
      "Capability and application landscape",
      "Target-state architecture and principles",
      "Sequenced, costed roadmap with options",
      "Architecture decision record (ADR) practice and templates",
    ],
    engagement: { shape: "Diagnostic followed by a design phase", duration: "8–14 weeks", team: "Partner, two architects, one analyst" },
    decision: {
      id: "DR-01",
      title: "Write the roadmap as options, not commitments",
      context:
        "Multi-year technology roadmaps are usually obsolete within a year, yet they are funded as if they were fixed plans.",
      options: [
        "A fixed three-year plan with annual re-baselining",
        "A rolling roadmap with funded steps and explicit options beyond them",
        "No roadmap; fund teams and let architecture emerge",
      ],
      decision:
        "We recommend a rolling roadmap: the next two steps are funded and specified, later steps are options with the evidence needed to exercise them.",
      consequences: [
        "Boards see fewer surprises, because changes of direction are planned decision points.",
        "Requires a quarterly review discipline that someone must own.",
      ],
    },
    relatedIndustries: ["financial-services", "public-sector", "energy-utilities"],
    image: images.soffit,
  },
  {
    slug: "data-ai",
    index: "02",
    title: "Data & AI enablement",
    short: "Data foundations, governance and AI use cases chosen for value, risk and feasibility.",
    summary:
      "We help organisations decide where data and AI genuinely change outcomes, then build the foundations, controls and teams to do it responsibly.",
    intro: [
      "Interest in AI has outpaced most organisations' ability to evaluate it. We bring discipline: a use-case portfolio scored on value, risk and feasibility, and an honest view of the data work each one requires.",
      "Our work covers data platforms and governance as much as models. A model is only as defensible as the data lineage and human oversight around it.",
    ],
    questions: [
      "Which AI use cases are worth pursuing, and which are demonstrations?",
      "Is our data good enough, and who is accountable for it?",
      "How do we meet regulatory expectations for automated decisions?",
      "How do we move from pilots to dependable services?",
    ],
    activities: [
      { title: "Use-case portfolio", text: "Candidate use cases scored transparently on value, risk, data readiness and effort." },
      { title: "Data foundations", text: "Platform, ownership and quality practices sized to the portfolio, not to a vendor catalogue." },
      { title: "Responsible AI controls", text: "Human oversight, evaluation, monitoring and documentation designed in from the start." },
      { title: "Pilot to service", text: "A route from experiment to supported service, with operating costs understood up front." },
    ],
    deliverables: [
      "Scored AI and analytics use-case portfolio",
      "Data governance model and ownership map",
      "Model risk and evaluation framework",
      "Production readiness checklist for AI services",
    ],
    engagement: { shape: "Portfolio sprint, then foundation build", duration: "6–20 weeks", team: "Partner, data architect, ML engineer, governance lead" },
    decision: {
      id: "DR-02",
      title: "Score use cases on data readiness before value",
      context: "High-value AI ideas often stall for months because the required data does not exist in usable form.",
      options: [
        "Rank by expected value only",
        "Rank by value, then check data readiness",
        "Treat data readiness as a gate before value is estimated",
      ],
      decision:
        "Data readiness is assessed first and acts as a gate; value is estimated only for use cases that pass or have a funded path to pass.",
      consequences: [
        "Shorter, more honest portfolios that teams can actually deliver.",
        "Some attractive ideas are deferred, which needs clear communication to sponsors.",
      ],
    },
    relatedIndustries: ["health-life-sciences", "financial-services", "manufacturing"],
    image: images.dataHall,
  },
  {
    slug: "cloud-modernisation",
    index: "03",
    title: "Cloud & platform modernisation",
    short: "Modernisation plans that reduce risk first, and platforms that teams want to use.",
    summary:
      "We plan and guide the move from ageing estates to modern platforms, application by application, with the economics visible at every step.",
    intro: [
      "Modernisation programmes fail when they are treated as migrations. Moving a fragile system to new infrastructure keeps the fragility and adds a bill.",
      "We assess each application on business value and technical condition, then choose the right path: retain, rehost, refactor, replace or retire. Internal platforms are designed as products, with their own users and roadmap.",
    ],
    questions: [
      "Which applications should move, change, or simply be switched off?",
      "What will the new estate cost to run, and how do we keep it that way?",
      "How do we build a platform that product teams adopt willingly?",
      "How do we modernise without stopping the business?",
    ],
    activities: [
      { title: "Estate assessment", text: "Application-by-application view of value, condition, dependencies and run cost." },
      { title: "Landing zone & platform design", text: "Secure foundations and paved roads for delivery teams, designed with them." },
      { title: "Migration waves", text: "Sequenced waves that retire risk early and prove the approach on low-stakes systems." },
      { title: "Cost management", text: "Unit-cost visibility and ownership so spend tracks value after go-live." },
    ],
    deliverables: [
      "Application disposition (retain, rehost, refactor, replace, retire)",
      "Platform reference design and adoption plan",
      "Migration wave plan with rollback criteria",
      "Run-cost model and FinOps operating practices",
    ],
    engagement: { shape: "Assessment, then guided delivery", duration: "10–30 weeks", team: "Partner, platform architect, two engineers, FinOps lead" },
    decision: {
      id: "DR-03",
      title: "Retire before you migrate",
      context: "Large estates typically contain applications with little or no remaining business use.",
      options: [
        "Migrate everything, rationalise later",
        "Rationalise first, then migrate what remains",
        "Run both in parallel workstreams",
      ],
      decision:
        "A retirement review precedes every migration wave; applications without an accountable owner and a current use are scheduled for decommissioning.",
      consequences: [
        "Smaller migration scope and lower ongoing cost.",
        "Requires business owners to confirm usage, which takes time and senior sponsorship.",
      ],
    },
    relatedIndustries: ["transport-logistics", "financial-services", "public-sector"],
    image: images.beams,
  },
  {
    slug: "cyber-resilience",
    index: "04",
    title: "Cybersecurity & resilience",
    short: "Security and continuity designed around the services that matter most, not around tools.",
    summary:
      "We help organisations understand which services they cannot afford to lose, and build the security, recovery and governance needed to protect them.",
    intro: [
      "Security budgets are often spread evenly across tools while the services that matter most remain fragile. We start from important business services and their tolerance for disruption.",
      "Our work connects threat, architecture and operations: identity, segmentation, recovery testing and the governance that keeps them current. We do not resell security products.",
    ],
    questions: [
      "Which services must keep running, and for how long can they be impaired?",
      "Would we actually recover from a destructive attack, and how fast?",
      "Is identity our strongest control or our weakest?",
      "How do we report cyber risk to a board in plain language?",
    ],
    activities: [
      { title: "Important service mapping", text: "Critical services, their dependencies and impact tolerances, agreed with the business." },
      { title: "Security architecture review", text: "Identity, network segmentation, data protection and third-party exposure." },
      { title: "Recovery exercises", text: "Tabletop and technical exercises that test recovery, not just backup." },
      { title: "Board reporting", text: "Risk expressed as service impact, with a small set of indicators that mean something." },
    ],
    deliverables: [
      "Important business services map and tolerances",
      "Prioritised security architecture roadmap",
      "Recovery exercise reports and remediation plan",
      "Board-level cyber risk reporting pack",
    ],
    engagement: { shape: "Review and exercise programme", duration: "6–16 weeks", team: "Partner, security architect, resilience lead" },
    decision: {
      id: "DR-04",
      title: "Test recovery, not backup",
      context: "Backups are routinely reported as successful while full service recovery has never been rehearsed.",
      options: [
        "Report backup job success rates",
        "Restore sample data periodically",
        "Rehearse end-to-end recovery of an important service",
      ],
      decision:
        "At least one important service is recovered end to end in an isolated environment each half-year; results go to the board.",
      consequences: [
        "Reveals hidden dependencies such as identity, DNS and licensing.",
        "Exercises cost time and need protected environments.",
      ],
    },
    relatedIndustries: ["energy-utilities", "health-life-sciences", "public-sector"],
    image: images.curve,
  },
  {
    slug: "operating-model",
    index: "05",
    title: "Operating model & transformation",
    short: "How technology and the business organise, fund and decide together.",
    summary:
      "We redesign how technology work is organised, funded and governed, so that strategy turns into delivery without heroics.",
    intro: [
      "Technology problems are frequently organisational ones: unclear ownership, annual funding cycles that punish learning, and governance that slows everything equally.",
      "We design operating models around value streams and products, define decision rights, and introduce funding and portfolio practices that can change direction mid-year.",
    ],
    questions: [
      "Who owns each product or service end to end?",
      "How should we fund technology work that does not fit an annual project cycle?",
      "Which decisions should be central, and which should teams make themselves?",
      "How do we change this without a disruptive reorganisation?",
    ],
    activities: [
      { title: "Value stream design", text: "Products, platforms and teams aligned to how value actually reaches customers." },
      { title: "Decision rights", text: "An explicit map of who decides what, with escalation paths that are rarely needed." },
      { title: "Portfolio & funding", text: "Persistent team funding with quarterly portfolio reviews and clear outcome measures." },
      { title: "Transition plan", text: "Incremental change, piloted with willing teams before it is scaled." },
    ],
    deliverables: [
      "Target operating model and team topology",
      "Decision-rights matrix",
      "Portfolio governance and funding model",
      "Phased transition plan with pilot criteria",
    ],
    engagement: { shape: "Design, pilot, scale", duration: "8–24 weeks", team: "Partner, organisation designer, delivery lead" },
    decision: {
      id: "DR-05",
      title: "Pilot the model with volunteers",
      context: "Organisation-wide operating model changes create disruption before they create value.",
      options: [
        "Big-bang reorganisation on a fixed date",
        "Pilot with two or three volunteer value streams, then scale",
        "Change governance only and leave structures intact",
      ],
      decision:
        "Pilot with volunteer value streams for one or two quarters, measure against agreed criteria, then scale what worked.",
      consequences: [
        "Lower disruption and stronger evidence for the wider change.",
        "Temporary inconsistency between piloting and non-piloting areas.",
      ],
    },
    relatedIndustries: ["public-sector", "manufacturing", "transport-logistics"],
    image: images.workingSession,
  },
  {
    slug: "product-delivery",
    index: "06",
    title: "Digital product delivery",
    short: "Small, senior teams that design and build critical services alongside yours.",
    summary:
      "We embed small, senior delivery teams to design, build and hand over digital services, leaving your people more capable than before.",
    intro: [
      "Some decisions are best tested in working software. We form blended teams with our clients to discover, design and deliver services, with a hand-over plan written on day one.",
      "Our teams favour short feedback loops, accessible design, automated testing and observable systems. Success means the client team runs the service without us.",
    ],
    questions: [
      "How do we prove an idea quickly without building throwaway software?",
      "How do we raise the capability of our own teams while delivering?",
      "What does good engineering practice look like for us?",
      "How do we hand over without losing momentum?",
    ],
    activities: [
      { title: "Discovery", text: "User research, service mapping and technical spikes to frame what to build first." },
      { title: "Blended delivery", text: "Joint teams working in short iterations with shared engineering standards." },
      { title: "Quality built in", text: "Accessibility, security and automated testing as part of the definition of done." },
      { title: "Hand-over", text: "Documentation, pairing and a gradual step-back so ownership transfers fully." },
    ],
    deliverables: [
      "Discovery findings and service blueprint",
      "Working, tested, accessible software",
      "Engineering standards and delivery playbook",
      "Hand-over plan and runbooks",
    ],
    engagement: { shape: "Blended team", duration: "12 weeks and up", team: "Delivery lead, designer, three to five engineers" },
    decision: {
      id: "DR-06",
      title: "Write the hand-over plan on day one",
      context: "Consultancy-built services often stall after the consultants leave because ownership was never transferred.",
      options: [
        "Hand over at the end of the engagement",
        "Run the service for the client indefinitely",
        "Plan the hand-over from the first week and measure progress against it",
      ],
      decision:
        "Every delivery engagement starts with a written hand-over plan; client engineers pair on every significant change.",
      consequences: [
        "Slower initial pace while pairing is established.",
        "Lasting client capability and no dependency on Halvaren.",
      ],
    },
    relatedIndustries: ["health-life-sciences", "public-sector", "financial-services"],
    image: images.stairs,
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
