import { images } from "./images";
import type { Insight, InsightCategory } from "./types";

export const insightCategories: InsightCategory[] = ["Perspective", "Field note", "Guide"];

/** Articles are original writing for this concept site. Authors are practices, not invented people. */
export const insights: Insight[] = [
  {
    slug: "decisions-are-the-deliverable",
    title: "Decisions are the deliverable",
    category: "Perspective",
    date: "2026-10-21",
    readingTime: 6,
    author: "Technology strategy practice",
    excerpt:
      "Strategy documents age quickly. The decisions behind them, written down with their reasoning, are what an organisation actually keeps.",
    topics: ["Architecture", "Governance"],
    image: images.soffit,
    body: [
      { type: "p", text: "Ask an engineering team why their platform looks the way it does and you will often hear a story rather than a reason. Someone chose a database years ago; someone else built around it; the people who knew why have moved on. The architecture is the sum of decisions nobody can now explain." },
      { type: "p", text: "Strategy work tends to produce the opposite problem: abundant explanation, few decisions. A hundred slides describe the future and leave the actual choices implicit." },
      { type: "h2", text: "Write down the choice and the reasons" },
      { type: "p", text: "An architecture decision record is a short document with four parts: the context, the options considered, the decision, and its consequences. It takes an hour to write and saves months of re-litigation." },
      { type: "list", items: ["Context: what forces made a decision necessary now", "Options: at least two credible alternatives, honestly described", "Decision: what was chosen, by whom, and when it should be reviewed", "Consequences: what becomes easier, what becomes harder"] },
      { type: "quote", text: "A decision you cannot explain is a decision you cannot safely change." },
      { type: "h2", text: "Make records part of the work, not a report about it" },
      { type: "p", text: "Records work when they live next to the code and the roadmap, are short enough to read in five minutes, and are reviewed on a schedule. They fail when they become an approval gate or a compliance artefact nobody reads." },
      { type: "p", text: "The test is simple: when someone new joins and asks why, can they find the answer without finding the person?" },
    ],
  },
  {
    slug: "ai-use-case-portfolio",
    title: "Building an AI use-case portfolio that survives contact with data",
    category: "Guide",
    date: "2026-10-07",
    readingTime: 8,
    author: "Data & AI practice",
    excerpt:
      "A practical method for scoring AI ideas on value, risk and data readiness, and for saying no to the attractive ones that are not ready.",
    topics: ["AI", "Data"],
    image: images.dataHall,
    body: [
      { type: "p", text: "Most organisations now have a long list of AI ideas. Few have a portfolio: a deliberately chosen, balanced set of initiatives with known costs, risks and owners." },
      { type: "h2", text: "Start with data readiness" },
      { type: "p", text: "For each candidate, ask whether the data it needs exists, is accessible, has an owner, and is of known quality. Ideas that fail this test are not rejected; they become data initiatives with their own business case." },
      { type: "h2", text: "Score on four dimensions" },
      { type: "list", items: ["Value: the decision or process that changes, and how you would know", "Risk: who is affected if the system is wrong, and how badly", "Data readiness: as above, scored honestly", "Effort: including the cost of running and monitoring the service"] },
      { type: "p", text: "Publish the scores and the reasoning. Transparency turns disappointed sponsors into informed ones." },
      { type: "quote", text: "A pilot that cannot become a service is a demonstration, and should be funded as one." },
      { type: "h2", text: "Plan the path to production up front" },
      { type: "p", text: "Before a pilot starts, agree what production would require: monitoring, human oversight, documentation, support. If nobody will fund those, reconsider the pilot." },
    ],
  },
  {
    slug: "recovery-not-backup",
    title: "Test recovery, not backup",
    category: "Field note",
    date: "2026-09-23",
    readingTime: 5,
    author: "Cybersecurity & resilience practice",
    excerpt:
      "Backup success rates are a comforting metric. Rehearsing the recovery of a whole service is the one that matters.",
    topics: ["Security", "Resilience"],
    image: images.curve,
    body: [
      { type: "p", text: "Many organisations report backup success rates close to perfect. Far fewer can say how long it would take to bring an important service back after a destructive incident." },
      { type: "h2", text: "What a rehearsal reveals" },
      { type: "list", items: ["Identity systems that must be rebuilt before anything else", "Licence servers and DNS entries nobody documented", "Recovery runbooks written for infrastructure that no longer exists", "Teams who have never worked through a recovery together"] },
      { type: "p", text: "None of these appear in a backup report. All of them appear in the first hour of a real recovery." },
      { type: "h2", text: "Start small and isolated" },
      { type: "p", text: "Choose one important service, build an isolated environment, and recover it end to end. Time each stage. Write down every surprise. Then fix the surprises and do it again in six months." },
      { type: "quote", text: "The first rehearsal is always slower than anyone expected. That is the point of having it." },
    ],
  },
  {
    slug: "platforms-as-products",
    title: "Internal platforms are products, whether you treat them so or not",
    category: "Perspective",
    date: "2026-09-09",
    readingTime: 7,
    author: "Cloud & platform practice",
    excerpt:
      "Platform teams that ignore their users build platforms nobody adopts. A product mindset changes what gets built first.",
    topics: ["Cloud", "Platforms"],
    image: images.beams,
    body: [
      { type: "p", text: "An internal developer platform has users, competitors and a value proposition. Its users are delivery teams; its competitors are the workarounds those teams build when the platform is too slow or too rigid." },
      { type: "h2", text: "Find the paved road" },
      { type: "p", text: "Start with the most common journey: a team creating and deploying a new service. Make that journey fast, safe and well documented before adding anything else." },
      { type: "list", items: ["Interview delivery teams before designing anything", "Measure time from new repository to first production deploy", "Publish a roadmap and take requests in the open", "Retire features nobody uses"] },
      { type: "h2", text: "Adoption is the metric" },
      { type: "p", text: "Mandating a platform produces compliance, not adoption. A platform that teams choose freely is one that is genuinely saving them time." },
    ],
  },
  {
    slug: "operating-model-pilots",
    title: "Change the operating model with volunteers first",
    category: "Field note",
    date: "2026-08-26",
    readingTime: 6,
    author: "Operating model practice",
    excerpt:
      "Large reorganisations create disruption before they create value. Pilots with willing teams produce evidence and allies.",
    topics: ["Operating model", "Transformation"],
    image: images.workingSession,
    body: [
      { type: "p", text: "Operating model redesigns are often announced as a single event with a go-live date. The organisation then spends a year absorbing the disruption." },
      { type: "h2", text: "Pilot with volunteers" },
      { type: "p", text: "Invite two or three value streams that want to work differently. Agree success criteria in advance, and give them real decision rights and funding flexibility for a defined period." },
      { type: "list", items: ["Agree what success looks like before the pilot starts", "Protect pilots from unrelated governance for the period", "Review openly at the end, including what did not work"] },
      { type: "quote", text: "Evidence from your own organisation persuades in a way no external benchmark can." },
      { type: "p", text: "Scaling then becomes a decision based on local evidence, supported by people who have already lived the new model." },
    ],
  },
  {
    slug: "accessible-by-default",
    title: "Accessible by default: a delivery checklist",
    category: "Guide",
    date: "2026-08-12",
    readingTime: 7,
    author: "Digital product delivery practice",
    excerpt:
      "Accessibility is cheapest when it is part of the definition of done. A short checklist for teams who want to get it right from the first sprint.",
    topics: ["Accessibility", "Delivery"],
    image: images.stairs,
    body: [
      { type: "p", text: "Retrofitting accessibility is expensive and rarely complete. Building it in from the start costs little and benefits everyone who uses the service." },
      { type: "h2", text: "In every story" },
      { type: "list", items: ["Semantic HTML first; ARIA only where semantics fall short", "Every interaction works with a keyboard, with a visible focus indicator", "Colour contrast meets WCAG 2.2 AA", "Form errors are described in text and linked to their fields", "Motion respects reduced-motion preferences"] },
      { type: "h2", text: "In every release" },
      { type: "list", items: ["Automated checks in the pipeline", "Manual screen reader testing of changed journeys", "Testing at high zoom and narrow widths"] },
      { type: "p", text: "Automated tools catch only part of the problem. Research with disabled users catches the rest, and should be scheduled, not hoped for." },
    ],
  },
  {
    slug: "roadmaps-as-options",
    title: "Roadmaps as options, not promises",
    category: "Perspective",
    date: "2026-07-29",
    readingTime: 5,
    author: "Technology strategy practice",
    excerpt:
      "Funding the next two steps and treating the rest as options makes roadmaps more honest and boards less surprised.",
    topics: ["Strategy", "Governance"],
    image: images.facade,
    body: [
      { type: "p", text: "A three-year technology roadmap presented as a fixed plan is out of date within months. Yet organisations keep funding and reporting against it as if nothing had changed." },
      { type: "h2", text: "Fund steps, hold options" },
      { type: "p", text: "Fund and specify the next two steps in detail. Beyond them, describe options and the evidence that would justify exercising each one." },
      { type: "list", items: ["Each step has an explicit exit point", "Each option has a trigger and an owner", "The roadmap is reviewed quarterly against new evidence"] },
      { type: "p", text: "Boards see fewer surprises because changes of direction become planned decision points rather than admissions of failure." },
    ],
  },
  {
    slug: "legacy-exit-in-slices",
    title: "Leaving legacy systems one slice at a time",
    category: "Guide",
    date: "2026-07-15",
    readingTime: 8,
    author: "Cloud & platform practice",
    excerpt:
      "Wholesale replacements of core systems fail often. Incremental replacement behind a stable interface is slower to announce and faster to deliver.",
    topics: ["Modernisation", "Architecture"],
    image: images.publicSector,
    body: [
      { type: "p", text: "Core systems accumulate functions over decades. Replacing all of them at once means specifying everything up front, which is rarely possible and never cheap." },
      { type: "h2", text: "Put a stable interface in front" },
      { type: "p", text: "Introduce an interface layer that new services call instead of the legacy system directly. Behind it, functions can move from old to new without consumers noticing." },
      { type: "h2", text: "Choose slices carefully" },
      { type: "list", items: ["Independent enough to replace without touching everything else", "Valuable enough that users notice the improvement", "Small enough to deliver in months, not years"] },
      { type: "quote", text: "The best first slice is the one that teaches you the most about the next one." },
      { type: "p", text: "Each slice reduces risk, proves the approach and builds the team that will deliver the next one." },
    ],
  },
];

export const INSIGHTS_PER_PAGE = 6;

export function getInsight(slug: string) {
  return insights.find((i) => i.slug === slug);
}

export function sortedInsights() {
  return [...insights].sort((a, b) => b.date.localeCompare(a.date));
}
