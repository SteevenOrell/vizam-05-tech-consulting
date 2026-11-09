# Implementation report: Halvaren (VIZAM concept project 05)

_2026-11-06. Branch `worktree-agent-a21c44a2fb6535321`. Halvaren is a fictional company built by VIZAM as a portfolio
concept, not a client commission._

## 1. Architecture and design summary

- **Stack:** Next.js 16 (App Router, static generation), React 19, strict TypeScript, Tailwind CSS 4, GSAP + ScrollTrigger,
  Motion, Lucide, React Hook Form + Zod, next/image, next/font, Metadata API. Vercel-compatible, no environment variables required.
- **Content:** typed local content in `lib/content` (services, industries, case studies, insights, careers, images), CMS-ready,
  no CMS connected. 42 static pages, plus sitemap, robots, a generated Open Graph image and JSON-LD.
- **Forms:** `lib/forms` holds Zod schemas, server actions and shared processing (honeypot, timing check, rate limit, validation).
- **Design (theme 2, "Aurora Ledger", branch `vizam/theme-refresh`):** midnight base with cobalt-teal-ice gradient and pixel-mosaic
  fields (`GradientField`), warm paper sections, huge tight headings, mono bracket labels, ghost numerals, rounded bento cards,
  floating pill navigation, split-H monogram, "decision records" as the signature component. Every page uses the same primitives
  with its own composition (aurora headers on Home, About, Services, Case studies, Consultation and 404; ink headers elsewhere;
  light header on Privacy and articles). Spec: `docs/design-direction.md`. Theme 1 (porcelain and phosphor) is superseded.
  No logos, testimonials or statistics are shown, because none exist. Photography: Unsplash only (public repo), WebP only,
  credited in `docs/media-credits.md`. No video, voice or AI images.
- **Layout rule:** below 250 px the layout locks at 500 px and pans (`#root` in `app/layout.tsx`), as required by project rules.

## 2. Development status

All planned pages and components are built, tested and committed on the build branch. Phase D security review and QA
sign-off are done (verdict: SIGN-OFF, see section 4). Not yet done: integration into `vizam/initial-build`, push, PR, Vercel preview, and any deploy.
Lighthouse / performance measurement has **not** been run.

## 3a. Checks, theme refresh slice 2 (2026-11-08, branch `vizam/theme-refresh`, real output)

| Check | Command | Result |
|---|---|---|
| Lint | `npm run lint` | pass, no warnings |
| Typecheck | `npm run typecheck` | pass |
| Unit | `npm test` | pass, 5 files, 45 tests |
| Build | `npm run build` | pass, 42 static pages |
| E2E + axe | `npx playwright test` (production build, port 3105) | pass, 79/79 (6.1 min) |
| Audit | `npm audit` | 0 vulnerabilities |
| Secret scan | `node scripts/secret-scan.mjs` | pass: 132 tree files, 26 commits, 17 rules, none found |
| Quality gate | `gate.mjs --skip build,e2e` | 0 FAIL, 0 WARN: no horizontal scroll from 300 px (36 routes), 500 px lock below 250 px, no console errors, no broken images, equal-height cards, 52 internal links, tracked-file check |
| Content QA | `content-qa.mjs` (36 routes) | 0 FAIL, 213 WARN (kept, see below) |

Content QA fixes made in this slice: upscaled-image FAILs (22) traced to Next advertising srcset widths above the 1400 px
sources, fixed with `images.deviceSizes` capped at 1400; Home meta description shortened from 182 to under 160 characters; micro
labels raised to 12 px (11 px warnings gone). WARNs kept: "slightly soft on retina" (125, computed from the `sizes` hint, delivered
images are at least 2x the slot); "same image twice on a page" (industry photos reused by their scenario or service cards, 25 or so);
"testimonial" on About and Privacy (the copy says none exist). I looked at the Home and Insights contact sheets and full-page
screenshots of every route at 240, 300, 390, 768 (and 1440 for all pages). Lighthouse and manual assistive-technology testing: not run.

## 3. Checks (run 2026-11-06, real output, Slice 1, theme 1 for reference)

| Check | Command | Result |
|---|---|---|
| Install | `npm ci` | pass, 445 packages, 0 vulnerabilities |
| Lint | `npm run lint` | pass, no warnings |
| Typecheck | `npm run typecheck` | pass |
| Unit | `npm test` | pass, 4 files, 38 tests |
| Build | `npm run build` | pass, 42 static pages |
| E2E + axe | `npx playwright test` (production build, port 3105) | pass, 79/79 |
| Audit | `npm audit` | 0 vulnerabilities |
| Secret scan | `node scripts/secret-scan.mjs` | pass: 126 tree files, 9 commits (all refs), 13 rules, none found |
| Lighthouse / performance | not run | **not run** |

Phase D re-run (2026-11-06, after the Phase D fixes, commit `8e38347`): `npm run lint` pass; `npm run typecheck` pass;
`npm test` pass, 4 files, 40 tests; `npm run build` pass, 42 static pages; `npx playwright test` pass, 79/79 (12.0 min);
`npm audit` 0 vulnerabilities; `node scripts/secret-scan.mjs` pass, 127 tree files, 18 commits, 17 rules, none found.

E2E runs against `next start`, so `npm run build` must precede it. Browser checks use Playwright headless Chromium at 240
(500 px lock), 390, 768 and 1440 px, with overflow checks from 300 px and equal-height card checks.

## 4. Security review summary

This is a developer self-review plus automated checks. It is not an independent security assessment.

- **Form validation:** every public form goes through server-side Zod validation (`lib/forms/schemas.ts`, `process.ts`);
  field errors are returned without echoing unexpected input. Non-object payloads are rejected.
- **Honeypot:** hidden `company_website` field; a filled value gets an indistinguishable demo receipt so bots learn nothing.
- **Timing check:** submissions completed in under 2 seconds (`MIN_FILL_MS`) are treated as automated and silently discarded.
- **Rate limit:** 5 submissions per 10 minutes per client key (first `x-forwarded-for` entry, else `x-real-ip`), in-memory with a
  5000-key cap. Limitation: it is per server instance, so it is best-effort on serverless hosting; a shared store would be needed in production.
- **No storage or logging of personal data:** submissions are validated and discarded; no database, no email, no `console` logging in `app/` or `lib/`.
  Results are labelled demo submissions with a `DEMO-` reference.
- **Headers** (`next.config.ts`): Content-Security-Policy (self-hosted assets, `frame-ancestors 'none'`, `object-src 'none'`,
  `form-action 'self'`), X-Content-Type-Options, Referrer-Policy, X-Frame-Options DENY, Permissions-Policy, HSTS.
  Known weakness: CSP allows `'unsafe-inline'` for scripts and styles (Next inline bootstrap without a nonce setup).
- **Secret scan:** `scripts/secret-scan.mjs` over the tree and all git history, none found (see table). No env vars are required.
- **Dependencies:** `npm audit` reports 0 vulnerabilities; `package.json` pins `minimatch ^11.0.1` via `overrides`.
- Not covered: penetration testing, CSRF review beyond Next.js server-action defaults, production configuration. A public
  production launch with real form delivery would need an independent review.

### Phase D review (2026-11-06, separate Opus run)

Code read: `lib/forms/*`, both form components, `next.config.ts`, `app/layout.tsx`, `lib/seo.ts`, robots, sitemap, the
four dynamic routes, filter/pagination helpers, header/menu, motion helpers, error pages, `scripts/secret-scan.mjs`.

Fixed:
- **Low, unbounded `industry` field** (`lib/forms/schemas.ts`): the consultation `industry` accepted any non-empty string of
  any length. Now an enum of the offered options; a unit test keeps it in sync with `lib/content/industries.ts`.
- **Low, personal data could reach a URL** (`components/forms/*-form.tsx`): the `<form>` elements had no `method`, so a submit
  before hydration or without JS issued a GET with name, email and message in the query string (history, logs, referrers).
  Both forms now use `method="post"`.
- **Low, rate-limiter memory** (`lib/forms/rate-limit.ts`): pruning removed only expired keys, so a flood of distinct
  addresses inside one window grew the map without bound. Oldest entries are now dropped past the 5000-key cap.
- **Low, a11y: menu focus trap** (`components/layout/site-header.tsx`): the trap cycled through panel links only, so the
  visible Close button was unreachable by Tab (Escape was the only keyboard exit). The button is now part of the cycle.
- **Tooling, secret-scan gaps** (`scripts/secret-scan.mjs`): added encrypted private keys, npm/GitLab/SendGrid/Resend tokens,
  more env names (Envato, Unsplash secret, Vercel, Resend), `.claude/`, `CLAUDE.md`, `.npmrc`, key stores, and any
  non-WebP media file. Verified it fires on fake samples, then re-ran clean on tree and history.

Verified, no change needed: server-side Zod on both actions with length limits on every free-text field (name 100,
email 200, organisation 120, role 100, message 2000, challenge 3000) and unknown keys stripped; honeypot and 2-second
timing check answer with an indistinguishable demo receipt; nothing is stored, logged or echoed (error messages are
fixed strings, no `console` calls); client keys are salted SHA-256 hashes. Only three `dangerouslySetInnerHTML` uses: a
constant `js` class script and two JSON-LD blocks serialised by `jsonLdString` (escapes `<`) from static content. No
markdown/HTML rendering of content (typed blocks rendered as React nodes). No redirects or user-controlled URLs; query
parameters pass through an allow-list (`allowed`) and `paginate` clamps the page. All four `[slug]` routes use
`generateStaticParams`, `dynamicParams = false` and `notFound()`. Robots and sitemap cover all 10 static and 26 dynamic
routes. Error pages show only the digest. `npm audit`: 0 vulnerabilities.

Accepted (documented, not changed):
- **CSP `'unsafe-inline'`** (`next.config.ts`). Scripts: Next's App Router streams inline `self.__next_f` bootstrap
  scripts whose contents differ per page, so hashes cannot be precomputed; the only alternative is a per-request nonce set
  in `proxy.ts`, which forces every page to render dynamically and gives up static generation and CDN caching. Adding a
  hash for our one inline script would make browsers ignore `'unsafe-inline'` and break Next's scripts. Styles: Motion and
  React set inline `style` attributes. Residual risk is low: no user content is rendered, there are no third-party scripts,
  and `object-src 'none'`, `base-uri 'self'`, `form-action 'self'` and `frame-ancestors 'none'` are set. Revisit with
  nonces if the site ever renders user-supplied content.
- **Rate-limit key from `x-forwarded-for`.** On Vercel the platform overwrites this header, so it cannot be spoofed; on a
  self-hosted proxy that passes client headers through, the limit can be bypassed by rotating the header. Per-instance
  memory is already documented as best-effort.
- **Timing check uses a client-supplied `startedAt`.** Deliberately simple spam friction, not a security control.
- **HSTS with `preload`** is harmless on `*.vercel.app`; drop `preload` before using a custom domain that is not meant to
  be submitted to the preload list.

## 5. Performance and accessibility

- **Accessibility:** Playwright + axe (WCAG 2.2 AA rules) run in the e2e suite, which passed 79/79. Semantic landmarks, skip link,
  accessible mobile menu, visible focus states, `prefers-reduced-motion` handled in CSS and GSAP setup. Automated axe does not
  replace a manual screen-reader and keyboard audit, which has not been done.
- **Performance:** all pages are statically generated; fonts via next/font (self-hosted); images are compressed WebP through
  next/image; no third-party scripts. **No Lighthouse or Core Web Vitals measurement has been run**, so no scores are claimed.

## 6. Known limitations

- Contact and consultation forms are demo-only: no email provider, nothing is delivered.
- Not deployed; no Vercel link or preview exists.
- Fictional content: company, people, offices, careers and metrics are invented. Case studies are illustrative scenarios.
- Rate limiter is in-memory and per instance; CSP uses `'unsafe-inline'`; default site origin is `https://halvaren.example`.
- No Lighthouse run; no manual assistive-technology testing.
- Without JavaScript the forms do not submit (they POST to the static page and nothing is processed); the demo forms need JS.
- Rate-limit key trusts `x-forwarded-for`, which is safe on Vercel but spoofable behind a proxy that passes it through.
- Canonical URLs, sitemap and robots point to `https://halvaren.example` until `NEXT_PUBLIC_SITE_URL` is set.

## 7. Items that need Steeven

1. Link the project in Vercel (preview link plus a phone checklist can then be prepared); set `NEXT_PUBLIC_SITE_URL` as "config" if a real domain is chosen.
2. Choose an email provider if forms should deliver (currently demo-only).
3. Approve any production deploy.
4. Approve merge of the build branch into `vizam/initial-build`, the push, and the PR into `main` (no merge without approval).

## 8. VIZAM portfolio case-study blurb (105 words)

Halvaren is a fictional international technology and business consultancy, designed and built by VIZAM as a portfolio concept. The brief was credibility without clichés: no logo walls, invented testimonials or statistics. Instead, the identity is a measured page, with a porcelain-and-ink palette, one phosphor accent, a visible coordinate grid and decision records as the signature component. The site spans 42 statically generated pages across services, industries, illustrative case studies and insights, built with Next.js, TypeScript, Tailwind, GSAP and Motion. Forms validate on the server with a honeypot and rate limiting, and nothing is stored. Automated tests cover accessibility and layout from 240 to 1440 pixels.
