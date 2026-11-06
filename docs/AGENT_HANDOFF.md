# Agent handoff — vizam-05-tech-consulting (Halvaren, VIZAM concept project 05)

_Last updated: 2026-11-06 by the Project 05 coordinating Claude session_

## Objective
Premium corporate site for a fictional international technology and business consulting firm ("Halvaren
Advisory"), built as a VIZAM portfolio concept. Fictional company: say so in the footer and README.

## Repository
- Path: `C:\Users\SteevenWemin\Documents\Projects\vizam-05-tech-consulting` (repo is PUBLIC on GitHub; remote `origin`)
- Build worktree: `.claude/worktrees/agent-a21c44a2fb6535321`, branch `worktree-agent-a21c44a2fb6535321`
- Commit: `0ec8dbe` (Build all pages, content model, design system, forms and SEO routes)
- Integration branch: `vizam/initial-build` (still at `9199268`, the empty initial commit). `main`: never push or merge.
- `.claude/` is excluded via `.git/info/exclude`; never commit it.

## Approved decisions
- Stack: Next.js 16 App Router, TypeScript, Tailwind 4, GSAP, Motion, Lucide, RHF + Zod, structured local content.
- Design: original direction, no external reference — see `docs/design-direction.md` and `docs/plan.md`.
- Brand name "Halvaren" checked by web search (recorded in `docs/design-direction.md`).
- Media: Unsplash/Pixabay only (public repo), WebP only, credits in `docs/media-credits.md`. No video, voice or AI images.
- Forms: server-side Zod, honeypot, rate limit, labelled demo submission; nothing stored or logged.
- Dev/preview port 3105. Playwright headless for checks, not the shared browser pane.

## Done
- Scaffold, design direction, plan, Unsplash media (commit `d12d1bb`).
- All pages: home, about, services + `[slug]`, industries + `[slug]`, case studies (filters) + `[slug]`, insights +
  `[slug]`, careers, contact, consultation, privacy; sitemap/robots/SEO routes (commit `0ec8dbe`).
- Uncommitted (keep them): `eslint.config.mjs` change, `playwright.config.ts`, `vitest.config.mts`,
  `tests/unit/*` (components, content, filters, forms), `tests/e2e/*` (a11y, forms, interactions, layout,
  navigation, routes).

## Pending (priority order)
1. Run and fix: `npm run lint`, `npm run typecheck`, `npm test`, Playwright e2e + axe; commit tests.
2. Playwright screenshots at 240/390/768/1440 px (incl. <250 px 500 px lock, no horizontal scroll from 300 px,
   equal-size cards); commit compact WebP set to `docs/screenshots/`.
3. `npm run build`, `npm audit`, secret scan of tree and full git history.
4. Write `README.md`, `docs/report.md` (incl. 80–120 word portfolio blurb), `docs/handoff.md` (or point it here).
5. Coordinator: re-run checks, fast-forward `vizam/initial-build`, secret scan, push branch, open PR into `main`
   (do not merge, no deploy).

## Last verified checks
| Check | Command | Result | When |
|---|---|---|---|
| Lint | `npm run lint` | not run (verified) | — |
| Typecheck | `npm run typecheck` | not run (verified) | — |
| Unit | `npm test` | not run (verified) | — |
| E2E + axe | `npx playwright test` | not run (verified) | — |
| Build | `npm run build` | not run (verified) | — |
| Audit | `npm audit` | not run (verified) | — |
| Secret scan | — | not run | — |

The build agent stopped at the 5-hour usage limit while checking pages visually; any results it saw are not recorded.

## Known issues and risks
- None recorded yet; checks above still to run.

## Setup
- `npm ci`, `npm run dev` (port 3105), `npm run build && npm start` (port 3105).
- Env var names: none required (site-media keys stay outside the repo).

## Next step
In the worktree, run `npm run lint && npm run typecheck && npm test`, fix failures, then commit the test setup.

## Waiting for approval
- Vercel link/preview and any production deploy (Steeven).
- Email provider for form delivery (none yet; forms are demo-only).
