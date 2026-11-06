export type ImageRef = {
  src: string;
  alt: string;
  /** Short mono caption shown on "plates", e.g. "Concrete, water, light". */
  caption: string;
  width: number;
  height: number;
};

export type DecisionRecord = {
  id: string;
  title: string;
  context: string;
  options: string[];
  decision: string;
  consequences: string[];
};

export type Service = {
  slug: string;
  index: string;
  title: string;
  short: string;
  summary: string;
  intro: string[];
  questions: string[];
  activities: { title: string; text: string }[];
  deliverables: string[];
  engagement: { shape: string; duration: string; team: string };
  decision: DecisionRecord;
  relatedIndustries: string[];
  image: ImageRef;
};

export type Industry = {
  slug: string;
  title: string;
  short: string;
  summary: string;
  context: string[];
  pressures: string[];
  solutions: { title: string; text: string }[];
  relatedServices: string[];
  image: ImageRef;
};

export type CaseStudy = {
  slug: string;
  title: string;
  industry: string;
  services: string[];
  summary: string;
  situation: string[];
  approach: { phase: string; text: string }[];
  decisions: DecisionRecord[];
  intendedOutcomes: string[];
  measures: string[];
  image: ImageRef;
  /** Always true: every case study on this site is an illustrative scenario, not client work. */
  illustrative: true;
};

export type InsightCategory = "Perspective" | "Field note" | "Guide";

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string };

export type Insight = {
  slug: string;
  title: string;
  category: InsightCategory;
  date: string;
  readingTime: number;
  author: string;
  excerpt: string;
  body: Block[];
  image: ImageRef;
  topics: string[];
};

export type Role = {
  slug: string;
  title: string;
  team: string;
  location: string;
  type: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  /** Always true: roles are fictional and not open for application. */
  demo: true;
};
