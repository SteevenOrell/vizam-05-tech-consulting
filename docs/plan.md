# Development plan — Halvaren (VIZAM concept project 05)

Written before implementation. Design identity: see `design-direction.md`.

## 1. Requirements summary

Premium corporate site for a fictional international technology and business consultancy. Feel: sophisticated,
corporate, innovative, trustworthy, minimal, technology-focused, international.

Functional: service directory and service detail pages; industry solution pages; case-study browsing with filters
and detail pages; insights listing (filters + pagination) and article pages; careers with fictional demo roles;
functional contact and consultation forms; responsive navigation; SEO (metadata, Open Graph, sitemap, robots,
JSON-LD); accessible interactions; error, loading and 404 states; reduced-motion support.

Constraints: no fabricated testimonials, client logos, statistics or achievements. Case studies are labelled
**"Illustrative scenario"** everywhere. Footer and README say "VIZAM concept project — fictional company".
Public repo: Unsplash/Pixabay photos only, compressed WebP, credited in `docs/media-credits.md`.

## 2. Sitemap

```
/                          Home
/about                     About (purpose, principles, how we work, studios — fictional)
/services                  Service directory (indexed list)
/services/[slug]           Service detail (6)
/industries                Industries overview
/industries/[slug]         Industry solution page (6)
/case-studies              Illustrative scenarios — filter by industry and service
/case-studies/[slug]       Scenario detail (6) with decision records
/insights                  Insights listing — category filter + pagination (?category=&page=)
/insights/[slug]           Article (8)
/careers                   Careers + demo roles (accordion), clearly labelled
/contact                   Contact form + general info
/consultation              Request a consultation (structured form)
/privacy                   Privacy and demo-data notice
not-found, error, loading  System states
/sitemap.xml /robots.txt /opengraph-image (generated)
```

## 3. Technology plan

- **Next.js 16.4 (App Router) + React 19 + TypeScript (strict).** `cacheComponents` and `partialPrefetching`
  (scaffold defaults in 16.4) are **turned off**: all content is local and static, so the previous, well-understood
  model is simpler — every route is statically generated with `generateStaticParams` and `dynamicParams = false`.
  Forms use Server Actions (the only request-time work).
- **Tailwind CSS v4** (`@theme` tokens in `app/globals.css`).
- **GSAP + ScrollTrigger** for the three signature animations; **Motion** for menu, filters, accordions, form states.
- **Lucide React** icons; **React Hook Form + Zod** (shared schema client + server); **next/image**; **next/font**
  (Geist, Geist Mono, Newsreader — self-hosted at build, no runtime Google requests).
- **Vitest + Testing Library** (unit), **Playwright + @axe-core/playwright** (e2e, a11y, screenshots).
- Vercel-compatible, no custom server, no environment variables required.

## 4. Component architecture

```
app/                       routes (server components by default)
components/
  layout/   SiteHeader (client: menu), MobileMenu (Motion), SiteFooter, SkipLink, Breadcrumbs
  ui/       Button/LinkButton, SectionIndex, Plate (image with registration marks), Tag, Prose,
            DecisionRecord, IllustrativeBadge, DemoBadge, Pagination, EmptyState
  motion/   Reveal (GSAP line reveal), GridLines (hero hairlines), MethodTimeline (ScrollTrigger),
            HighlightText, useReducedMotion hook
  sections/ Hero, ServicesIndex, MethodSection, IndustriesGrid, ScenarioCard(s), InsightCard(s),
            CommitmentsList, CtaBand, PageHeader
  forms/    ContactForm, ConsultationForm, Field primitives, FormStatus
lib/
  content/  services.ts, industries.ts, case-studies.ts, insights.ts, careers.ts, site.ts (typed data + getters)
  forms/    schemas.ts (Zod), rate-limit.ts, honeypot, actions.ts (server actions)
  seo.ts    metadata builder + JSON-LD helpers
  filters.ts pure filter/pagination helpers (unit tested)
```

## 5. Content model (CMS-ready)

Typed TypeScript modules; each record has a stable `slug`, so they map 1:1 to a headless CMS later.

- `Service { slug, index, title, summary, intro, outcomes[], activities[], deliverables[], engagement{shape,
  duration}, decision: DecisionRecord, relatedIndustries[], image }`
- `Industry { slug, title, summary, context, pressures[], solutions[{title, text}], relatedServices[], image }`
- `CaseStudy { slug, title, industry, services[], summary, situation, approach[{phase, text}], decisions:
  DecisionRecord[], intendedOutcomes[], measures[], image, illustrative: true }` — no numbers presented as results.
- `Insight { slug, title, category ('Perspective'|'Field note'|'Guide'), date, readingTime, author (role-based,
  e.g. "Data & AI practice"), excerpt, body: Block[] (p, h2, list, quote), image, related[] }`
- `Role { slug, title, team, location, type, summary, responsibilities[], requirements[] }` — `demo: true`.
- `DecisionRecord { id, title, context, options[], decision, consequences[] }`

## 6. Design system

Tokens (colour, type scale, spacing, radii) in Tailwind `@theme`; see `design-direction.md`. Components above are
the system; no third-party UI kit.

## 7. Security plan

- Server Actions validate every field with Zod server-side (client validation is UX only).
- Honeypot field (`company_website`, visually hidden, `tabIndex=-1`, `autocomplete=off`) + minimum fill time
  (submissions under 2 s are rejected silently as spam).
- In-memory sliding-window rate limit per client key (5 submissions / 10 min). The key is a SHA-256 hash of the
  forwarded IP with a per-process salt; nothing is persisted, nothing is logged. Documented limitation: per
  serverless instance only — a shared store (e.g. Upstash/Vercel KV) is needed in production.
- No personal data is stored, logged, emailed or sent anywhere; the response is a clearly labelled demo receipt.
- Security headers in `next.config.ts`: CSP (self + inline styles needed by Next; no third-party origins),
  `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `X-Frame-Options: DENY`,
  `Strict-Transport-Security`. `poweredByHeader: false`.
- No secrets in the repo; `.env*` ignored; secret scan of tree and history before delivery; `npm audit`.

## 8. Testing plan

- `npm run lint` (ESLint, next config), `npm run typecheck` (`tsc --noEmit`).
- `npm test` (Vitest): content integrity (unique slugs, cross-references resolve, every case study flagged
  illustrative, no numeric claims in outcomes), filter/pagination helpers, Zod schemas, rate limiter, honeypot,
  server action behaviour (spam, invalid, rate-limited, success), form components render errors.
- `npm run test:e2e` (Playwright, Chromium, production build on port 3105): navigation, mobile menu (open, Escape,
  focus return), case-study filters and URL state, insights pagination, form validation + demo submission, 404,
  axe scan of every route (WCAG 2.2 A/AA tags), horizontal overflow checks at 300–1440 px, equal card heights,
  500 px lock below 250 px, screenshots at 240/390/768/1440.
- `npm run build`, `npm audit`, secret scan (regex over tree + `git log -p`).

## 9. Deployment plan

- Vercel (zero config). Preview deployments from branch `vizam/initial-build` once Steeven links the project.
- Set `NEXT_PUBLIC_SITE_URL` (config visibility) to the deployed origin for absolute canonical/OG URLs; defaults to
  `https://halvaren.example` for this concept.
- Before any real launch: shared rate-limit store, an email provider for forms, legal review of privacy notice,
  independent security review.
