# Design direction — Halvaren (VIZAM concept project 05)

> Fictional company. Halvaren is an original brand invented by VIZAM for a portfolio concept. It is not a real
> consultancy and has no clients, staff or offices.

There is no external design reference for this project (brief, Project 05). This document records the original
direction that replaces steps 1 (reference analysis) and the identity part of step 2.

## 1. Brand name and check

- **Name:** Halvaren (full form "Halvaren Advisory"). Invented word; reads as Northern-European, neutral in
  English, French and German, easy to pronounce, no meaning that ties it to one market.
- **Web search check (2026-11-05):**
  - `"Halvaren" consulting` — no consultancy or technology firm of that name. Nearest results were different names
    (Halgren & Associates, Halvorsen Consulting, Hvalen Consulting, Hallvarsson & Halvarsson).
  - `"Halvaren"` — only an obscure invented-word/place page and unrelated Norwegian names; no company in consulting,
    IT services or professional services.
  - A rejected alternative, "Veltrane", was too close to the real firm Veltris (IT consulting), so it was dropped.
- **Fake contact data:** domain `halvaren.example` (reserved `.example` TLD, cannot resolve to a real business).

## 2. Positioning

An independent technology and business consultancy for enterprises in regulated and asset-heavy sectors.
Promise: **"Technology decisions, made deliberately."** The site earns trust through clarity, restraint and
explicit reasoning, not through logos, testimonials or statistics (none are shown, because none exist).

Voice: precise, plain, calm; short sentences; verbs over adjectives; British/international English
("organisation", "modernisation"). No hype words ("revolutionary", "world-class", "cutting-edge").

## 3. Visual concept — "the measured page"

The site borrows the visual grammar of engineering drawings and decision records, not of marketing templates:

- **Coordinate grid.** A visible hairline 12-column grid sits behind hero areas; tick marks and mono coordinates
  (e.g. `A/01`, `N 00°`) appear at section edges. It signals measurement and method.
- **Section indices.** Every section carries a mono index (`§ 02 — Services`) on a left rail. Pages read like a
  well-structured technical document.
- **Registration marks.** Photographs sit in "plates" with small `+` crosshair corners and a mono caption
  (`PL. 03 — Concrete, water, light`). Photography is architectural and calm: concrete, glass, infrastructure,
  people at work seen from a distance. No logos, no stock "handshake" clichés.
- **Decision records.** A signature component modelled on Architecture Decision Records (Context / Options
  considered / Decision / Consequences). Used in case studies and service pages to show *how* the firm reasons.
- **Lists over cards.** Services are an indexed table of rows, not a card grid. Cards are used only where browsing
  needs them (industries, scenarios, insights) and are always equal height.

What makes it different from the four sibling VIZAM concepts: a technical-document identity (mono indices,
coordinates, decision records), a porcelain/ink palette with a single phosphor accent, and almost no rounded corners.

## 4. Colour

| Token | Value | Use |
|---|---|---|
| `paper` | `#F2F1EC` | Main background (warm porcelain) |
| `paper-2` | `#E8E6DF` | Alternate bands, input backgrounds |
| `ink` | `#0C1014` | Text, dark bands |
| `ink-2` | `#1A2027` | Dark surfaces on dark bands |
| `graphite` | `#3A424C` | Secondary text on paper |
| `slate` | `#5A6370` | Muted text / captions on paper (5.4:1 on paper) |
| `rule` | `#CFCCC2` | Hairlines on paper |
| `rule-dark` | `#2C333B` | Hairlines on ink |
| `signal` | `#0A6B58` | Accent on light backgrounds (links, focus, markers; 6.1:1 on paper) |
| `phosphor` | `#7DF0C4` | Accent on dark backgrounds only (13:1 on ink) |
| `danger` | `#A3261B` | Form errors (6.4:1 on paper) |

Rules: one accent per surface; phosphor never on paper; large dark bands (`ink`) for emphasis sections (method,
CTA, footer). All text pairs meet WCAG 2.2 AA (4.5:1) or better.

## 5. Typography

- **Geist** (variable, 400–600) for display and body. Display sizes are large and tightly tracked (−0.035em),
  weight 500, never bold-black. Body 17–18 px, line-height 1.6, max 68 characters.
- **Geist Mono** for indices, coordinates, metadata, tags, form labels' helper text and numbers.
- **Newsreader** (serif, 400 + italic) only for long-form article body text and pull quotes in Insights, giving the
  editorial pages a reading rhythm distinct from the interface.
- Fluid scale with `clamp()`: display-xl `clamp(2.6rem, 7.2vw, 6.6rem)`, display `clamp(2.1rem, 4.6vw, 4.2rem)`,
  h2 `clamp(1.7rem, 3vw, 2.6rem)`, h3 `1.25rem`, body `1.0625rem`, small `0.875rem`, mono-xs `0.72rem`
  (uppercase, +0.08em tracking).

## 6. Spacing and layout

- 4 px base unit; section padding `clamp(4.5rem, 10vw, 9rem)`; gutters 16 px (mobile) → 32 px (≥768) → 48 px (≥1280).
- 12-column grid, max content width 1360 px; long text max 68ch.
- Corners: 0 radius on plates and cards; 2 px on inputs and buttons. Borders are 1 px hairlines.
- Below 250 px the layout locks at 500 px and pans horizontally (Steeven's global rule).

## 7. Motion principles

Purposeful, quiet, mechanical (like instruments settling), never bouncy.

- **GSAP:** hero headline line reveal and grid hairlines drawing in; scroll-linked "method" timeline with a progress
  line (ScrollTrigger); highlighted words in the positioning statement brightening as they scroll into place.
- **Motion (React):** mobile menu sheet, filter result re-ordering (layout animations), accordion open/close,
  form state transitions.
- Durations 200–700 ms, easing `power3.out` / `[0.22, 1, 0.36, 1]`; no parallax on text; no infinite loops.
- **`prefers-reduced-motion: reduce`:** all GSAP timelines are skipped (content rendered in final state), Motion
  uses instant transitions, smooth scrolling is disabled.

## 8. Accessibility stance

Semantic landmarks, one `h1` per page, skip link, visible 2 px `signal`/`phosphor` focus rings, keyboard-operable
menu (Escape closes, focus returns), filters as real buttons with `aria-pressed`, form errors linked with
`aria-describedby` and announced via a live region.
