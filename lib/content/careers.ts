import type { Role } from "./types";

/** Fictional demo roles. Halvaren is not a real company and is not hiring. */
export const roles: Role[] = [
  {
    slug: "senior-solution-architect",
    title: "Senior solution architect",
    team: "Technology strategy",
    location: "Lisbon or remote (Europe)",
    type: "Full time",
    summary: "Shape target architectures with client leadership and engineering teams, and write the decisions down.",
    responsibilities: [
      "Lead architecture assessments and target-state design",
      "Facilitate decision workshops and author decision records",
      "Coach client architects on lightweight governance",
    ],
    requirements: [
      "Substantial experience designing enterprise systems",
      "Clear written communication for both boards and engineers",
      "Comfort with ambiguity and with saying 'we do not know yet'",
    ],
    demo: true,
  },
  {
    slug: "data-governance-lead",
    title: "Data governance lead",
    team: "Data & AI",
    location: "Toronto or remote (Americas)",
    type: "Full time",
    summary: "Design data ownership, quality and responsible-AI practices that teams actually follow.",
    responsibilities: [
      "Define data ownership models and quality practices",
      "Design model risk and evaluation frameworks",
      "Work with legal and privacy teams on data use",
    ],
    requirements: [
      "Experience establishing data governance in complex organisations",
      "Working knowledge of privacy regulation and AI risk",
      "Pragmatism over paperwork",
    ],
    demo: true,
  },
  {
    slug: "platform-engineer",
    title: "Platform engineer",
    team: "Cloud & platform",
    location: "Singapore or remote (Asia-Pacific)",
    type: "Full time",
    summary: "Build paved roads for delivery teams alongside client platform engineers.",
    responsibilities: [
      "Design and build landing zones and deployment pipelines",
      "Pair with client engineers to transfer ownership",
      "Instrument platforms for cost and reliability",
    ],
    requirements: [
      "Hands-on infrastructure-as-code and CI/CD experience",
      "Interest in developer experience",
      "Enjoys teaching as much as building",
    ],
    demo: true,
  },
  {
    slug: "service-designer",
    title: "Service designer",
    team: "Digital product delivery",
    location: "Lisbon or remote (Europe)",
    type: "Full time",
    summary: "Research, map and design services that work for everyone, including the people hardest to reach.",
    responsibilities: [
      "Plan and run user research, including with disabled users",
      "Map services end to end across channels",
      "Prototype and test with delivery teams",
    ],
    requirements: [
      "Portfolio of service design work",
      "Strong grasp of accessibility and inclusive design",
      "Experience in regulated or public environments",
    ],
    demo: true,
  },
  {
    slug: "resilience-consultant",
    title: "Resilience consultant",
    team: "Cybersecurity & resilience",
    location: "Toronto or remote (Americas)",
    type: "Full time",
    summary: "Help organisations rehearse recovery and report cyber risk in language boards understand.",
    responsibilities: [
      "Map important business services and dependencies",
      "Design and facilitate recovery exercises",
      "Prepare board-level risk reporting",
    ],
    requirements: [
      "Background in security architecture, operations or resilience",
      "Calm facilitation under pressure",
      "Plain-language writing",
    ],
    demo: true,
  },
];
