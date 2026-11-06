# Halvaren — technology & business consulting (VIZAM concept project 05)

> **VIZAM concept project — fictional company.** Halvaren is an invented brand created by VIZAM as a portfolio
> concept. It has no clients, staff or offices. Case studies are **illustrative scenarios**, job listings are
> **demos**, and the contact and consultation forms are **demo submissions** that are validated and then discarded.

A premium corporate website for a fictional international technology and business consultancy. The identity is a
"measured page": a porcelain-and-ink palette with one phosphor accent, a visible coordinate grid, mono section
indices and **decision records** as the signature component — credibility through structure, not through logos,
testimonials or statistics (none are shown, because none exist).

## Stack

Next.js 16.4 (App Router, static generation) · React 19 · TypeScript (strict) · Tailwind CSS 4 · GSAP + ScrollTrigger
· Motion · Lucide React · React Hook Form + Zod · next/image · next/font · Metadata API · Vitest · Playwright + axe.

## Pages

Home · About · Services (directory) + 6 service pages · Industries + 6 industry solution pages · Case studies
(filter by industry and service) + 6 scenario pages · Insights (category filter + pagination) + 8 articles · Careers
(demo roles) · Contact · Request a consultation · Privacy & demo notice · 404 / error / loading states ·
`sitemap.xml`, `robots.txt`, generated Open Graph image, JSON-LD.

## Getting started

Requirements: Node.js 20.9+ (developed on Node 24), npm.

```bash
npm ci
npm run dev          # http://localhost:3105 (3000/3001 are reserved for other servers)
npm run build && npm start   # production build on port 3105
```

No environment variables are required. Optional: `NEXT_PUBLIC_SITE_URL` (public, "config" visibility on Vercel) sets
the absolute origin used in canonical URLs, Open Graph and the sitemap; it defaults to `https://halvaren.example`.

## Scripts

| Command | What it does |
|---|---|
| `npm run lint` | ESLint (Next.js core-web-vitals + TypeScript rules) |
| `npm run typecheck` | `next typegen` + `tsc --noEmit` |
| `npm test` | Vitest unit tests (content integrity, filters, Zod schemas, rate limiter, form processing, components) |
| `npm run test:e2e` | Playwright on the production build (run `npm run build` first): routes, menu, filters, pagination, forms, axe WCAG 2.2 AA, overflow 300–1440 px, equal card heights, 500 px lock, screenshots |
| `npm run secret-scan` | Regex secret scan of the working tree and full git history (prints paths and rule names only) |

## Project structure

```
app/                 routes, metadata, sitemap/robots/OG image, error/loading/404
components/layout    header + accessible mobile menu, footer, skip link
components/motion    GSAP: word reveal, grid draw-in, scroll-linked statement, method timeline
components/sections  cards, filters/pagination browsers, page header, CTA band, roles accordion
components/forms     contact + consultation forms (RHF + Zod), field primitives, demo receipt
components/ui        primitives (plates, tags, badges), decision record, pagination, logo
lib/content          typed, CMS-ready content (services, industries, case studies, insights, careers, images)
lib/forms            Zod schemas, server actions, honeypot/timing/rate-limit processing
docs/                design direction, plan, report, handoff, media credits, screenshots
tests/unit, tests/e2e
```

## Documentation

- `docs/design-direction.md` — identity, brand-name check, colour, type, spacing, motion
- `docs/plan.md` — requirements, sitemap, architecture, content model, security, testing, deployment
- `docs/report.md` — implementation report: checks with results, security, accessibility, performance, limitations
- `docs/AGENT_HANDOFF.md` — current status and next steps (`docs/handoff.md` points to it)
- `docs/media-credits.md` — Unsplash photographer credits
- `docs/screenshots/` — WebP screenshots at 240 (500 px lock), 390, 768 and 1440 px

## Deployment

Vercel-compatible with zero configuration (framework preset: Next.js). Not deployed: a Vercel preview needs the
project to be linked by the owner, and production deploys need approval. See `docs/report.md` for the checklist.

## Credits and licence notes

Photography from [Unsplash](https://unsplash.com) under the Unsplash License — photographers credited in
`docs/media-credits.md`. Only compressed WebP derivatives are committed. The wordmark, diagrams and all copy are
original work for this concept. Designed and built by VIZAM.
