# Design direction — Halvaren (VIZAM concept project 05)

> Fictional company. Halvaren is an original brand invented by VIZAM for a portfolio concept. It is not a real
> consultancy and has no clients, staff or offices.

Theme 2, **"Aurora Ledger"** (2026-11-08). Replaces theme 1 ("the measured page", porcelain + phosphor, square
corners). Steeven supplied two mood references (a warm-orange bento slide set and a dark agency hero with a pill
navigation and a brushed-metal glyph) and asked for their *characteristics* in a different colour. Nothing from them
is reused: no brand, glyph, copy, slide content or composition. Everything below is original to Halvaren.

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

## 2. Positioning and content rules (unchanged)

An independent technology and business consultancy for enterprises in regulated and asset-heavy sectors.
Promise: **"Technology decisions, made deliberately."** The site earns trust through clarity, restraint and
explicit reasoning, not through logos, testimonials or statistics (none are shown, because none exist).

- No fabricated claims: no client logos, testimonials, awards, founding year, headcount, percentages or results.
  Scenarios stay labelled "Illustrative scenario"; careers stay "Demo listings"; forms stay demo submissions.
- The footer always carries "VIZAM concept project — fictional company". Corner micro text may only state true
  things about the concept (e.g. "fictional studios"), never "Est. 20xx".
- Voice: precise, plain, calm; short sentences; British/international English. No hype words.

## 3. Identity — what the new theme is

A midnight base lit by an **aurora field** (cobalt → electric teal → pale ice), with warm off-white content
sections. Very large, tight, semibold grotesque headings; tiny uppercase mono labels in brackets
`( 02 · Services )`; rounded bento cards; a floating pill navigation; oversized ghost numerals; and one
dimensional object — the **split-H monogram**, two halves of an H meeting at a hairline (the left half set higher),
rendered as extruded brushed metal. It keeps Halvaren's idea ("two halves, one decision"; decision records) but
trades the engineering-drawing look for a confident, product-grade one.

Different from the sibling VIZAM concepts: cold aurora palette on midnight, mono bracket labels, the split-H object.

## 4. Colour

Tokens live in `app/globals.css` (`@theme`). Theme-1 names are kept and remapped so unrestyled pages inherit the
palette.

| Token | Hex | Use |
|---|---|---|
| `paper` | `#F4F1EA` | Warm off-white page and content sections |
| `paper-2` | `#E9E5DB` | Alternate light bands, inputs |
| `surface` | `#FBFAF7` | Cards on paper (`.card`) |
| `rule` | `#D3CEC2` | Hairlines on light |
| `ink` | `#070B1C` | Midnight: text on light, dark sections, footer |
| `ink-2` | `#0F1631` | Raised dark surfaces, the pill header, `.card-ink` |
| `ink-3` | `#18214A` | Third dark level (hover, nested panels) |
| `rule-dark` | `#26305A` | Hairlines on dark |
| `graphite` | `#333A4D` | Secondary text on light |
| `slate` | `#556075` | Muted text, captions, labels on light |
| `mist` | `#A9B3CB` | Muted text on dark |
| `signal` | `#2340D6` | Cobalt for links, indices and focus on light |
| `cobalt` | `#2F4FF0` | Graphic cobalt (fields, glyph, fills). Not for small text |
| `teal` | `#1FB5D6` | Electric teal, graphics only |
| `phosphor` | `#7FE3F0` | Cyan-ice accent text and focus on dark |
| `ice` | `#D3F1F8` | Pale ice: primary buttons on dark, highlights |
| `danger` | `#B3261E` | Form errors |

Aurora ramp (`--aurora`, GradientField): `#0A1236 → #2340E8 → #1FB5D6 → #C9EFF7`.

**Contrast pairs checked** (WCAG 2.x formula, script run 2026-11-08):

| Text on background | Ratio | | Text on background | Ratio |
|---|---|---|---|---|
| ink / paper | 17.34 | | paper / ink | 17.34 |
| ink / paper-2 | 15.55 | | paper / ink-2 | 15.78 |
| graphite / paper | 10.05 | | paper / ink-3 | 13.74 |
| slate / paper | 5.61 | | mist / ink | 9.31 |
| slate / paper-2 | 5.03 | | mist / ink-2 | 8.48 |
| signal / paper | 6.71 | | mist / ink-3 | 7.38 |
| signal / surface | 7.25 | | phosphor / ink-2 | 12.00 |
| danger / paper | 5.79 | | ink / ice (button) | 16.49 |
| paper / signal (button hover) | 6.71 | | paper / cobalt | 5.32 |

Rules: `cobalt`/`teal` never carry small text; `mist` never sits on cobalt (3.8:1, fails). Text over a field sits on
its dark side, on a solid colour, or on a `.card-glass` panel; on the Home hero only `paper` and `ice` text is
used (both ≥ 5.3:1 even on full cobalt).

## 5. Typography

- **Geist** (variable, via `next/font`, self-hosted, no external requests). Headings weight 600, tracking −0.035em.
  The hero heading is uppercase, line-height 0.92.
- **Geist Mono** for micro labels, nav links, buttons, tags and metadata: uppercase, 0.75–0.8rem, +0.06–0.08em.
- **Newsreader (serif) dropped**: the new identity is all-grotesque; Insights articles use Geist at 1.125rem / 1.7.
- Scale (`clamp()`): hero `clamp(1.9rem, 9.4vw, 4.75rem)`, from 1024 px `clamp(3.5rem, 5.5vw, 6.5rem)` (sized so
  "DELIBERATELY." fits its column at 300 px); display-xl `clamp(2.6rem, 7.2vw, 6.6rem)`; display
  `clamp(2.1rem, 4.6vw, 4.2rem)`; h2 `clamp(1.75rem, 3.2vw, 2.75rem)`; body 1.0625rem / 1.6; micro 0.75rem.

## 6. Spacing, layout and shape

- 4 px base unit; section padding `clamp(4.5rem, 10vw, 9rem)`; gutters 16 → 32 (≥768) → 48 px (≥1280);
  max content width 1360 px (`.container-x`), long text max 68ch.
- Radii: cards `--radius-card` 1.5rem; large panels and hero bottom corners `--radius-panel` 2rem; fields
  `--radius-field` 0.75rem; buttons, tags, nav and badges are full pills.
- Header: a floating dark pill (`ink-2`, 95% opaque + backdrop blur on the pill only) inside a sticky, transparent
  header. Its total height is `--header-h` (4.75rem); a dark hero can slide under it with
  `-mt-[var(--header-h)]` and add the same to its top padding.
- Below 250 px the layout locks at 500 px and pans (`#root`, every `.fixed-lock` element, `html { overflow-x: auto }`).

## 7. The field system

`GradientField` paints the aurora: a soft wash built **only from radial and linear gradients** (no `filter: blur`,
so scrolling stays cheap) plus an optional **pixel mosaic**: a coarse grid of square cells, rendered once on the
server as one SVG (`shape-rendering: crispEdges`), coloured from the same ramp and thinning out with distance from
the bright core. A seeded PRNG keeps every field stable between server and client.

- Tones: `aurora` (hero, feature panels), `ink` (quiet: menu, footer, dark bands), `ice` (light sections).
- `focus` places the bright core; keep it away from text. `columns`/`aspect` set cell size; `seed` varies pattern.

## 8. Ghost numerals and the monogram

- `GhostNumeral`: oversized SVG numerals or words ("02", "HALVAREN") behind sections and cards, filled at 6–30%
  opacity (or outlined for digits). Decorative and `aria-hidden`; the real number is always also in the text.
- Monogram geometry (`components/ui/halvaren-mark.ts`) is shared by the flat `Logo`, the favicon and the extruded
  `HeroGlyph`. The glyph is code only: inline SVG with gradient faces, a brushed-hairline pattern, a rim light and
  a sheen; no raster, no AI image, no external asset.

## 9. Motion principles

Purposeful, quiet, mechanical; never bouncy; no infinite loops (WCAG 2.2.2).

- **GSAP:** hero heading word reveal; HeroGlyph halves slide together once (1.3 s, `power3.out`) and a sheen
  crosses the faces; a scrubbed scroll drift of the glyph (−8% y, −2.5°). Existing method timeline and highlight
  text keep working.
- **Motion (React):** mobile menu sheet, filters, accordion, form states.
- Durations 200–1300 ms; easing `power3.out` / `[0.22, 1, 0.36, 1]`.
- **`prefers-reduced-motion: reduce`:** GSAP is skipped and the glyph renders assembled and static; Motion uses
  instant transitions; smooth scrolling off. Without JavaScript the CSS fallback shows everything after 2.5 s.

## 10. Primitives and how pages use them

| Primitive | File | Use |
|---|---|---|
| `GradientField` | `components/ui/gradient-field.tsx` | First child of a `relative overflow-hidden` dark (or `ice`) block |
| `GhostNumeral` | `components/ui/ghost-numeral.tsx` | Big decorative number behind a section/card; size with `h-…`/`w-…` |
| `HeroGlyph` | `components/motion/hero-glyph.tsx` | Home hero only (one hero object per site) |
| `Section` | `components/ui/primitives.tsx` | Section wrapper, tones `paper`, `paper-2`, `ink`, `aurora` (+ `background`) |
| `Card` | `components/ui/primitives.tsx` | Rounded card, tones `paper`, `ink`, `glass`; always `h-full` for equal rows |
| `.card`, `.card-ink`, `.card-glass` | `app/globals.css` | Same surfaces as classes for existing card markup |
| `SectionIndex` | `components/ui/primitives.tsx` | `( 02 · Services )` label above every section heading |
| `MicroLabel` | `components/ui/primitives.tsx` | Free bracketed mono line, e.g. hero kicker |
| `LinkButton` | `components/ui/primitives.tsx` | Pill buttons: `primary`, `secondary` (light), `on-dark`, `ghost-dark` |
| `PageHeader` | `components/sections/page-header.tsx` | Every inner page. `tone`: `aurora` (bright field, key pages), `ink` (quiet field), `paper` (light, long-form). Optional `ghost` word and `size` |
| `CtaBand` | `components/sections/cta-band.tsx` | Closing rounded aurora panel inside a paper strip, ends every page except Contact, Consultation and Privacy |
| `ServicesIndex` | `components/sections/cards.tsx` | Bento of six service cards with aurora ghost index; `feature` makes cards 0, 3 and 5 wide on desktop |
| `Tag`, `IllustrativeBadge`, `Notice`, `TextLink`, `Plate` | `components/ui/primitives.tsx` | Pill tags, labels, rounded notice and photo frame |
| `.bg-aurora`, `.aurora-rule`, `.pill` | `app/globals.css` | Gradient fill, gradient hairline, full radius |

Slice 2 applied this to every page (2026-11-08). Section rhythm used: paper → paper-2 → dark ink band → paper → ice-field band →
dark aurora band → paper → aurora CTA panel. Aurora headers: Home, About, Services, Case studies, Consultation, 404; ink
headers: Industries, Insights, Careers, Contact and the detail pages; paper header: Privacy; the article header is paper with
an ice field. Dark-band cards are `Card tone="ink"` or `"glass"`; text inside a header or band that inherits `text-paper`
must sit on a card that sets its own colour (`Notice` sets `text-ink`).

Page recipe: a page header on `ink` or `aurora` with a `GradientField` (focus away from the heading) and the
heading in `text-display-xl`; light content sections on `paper`/`paper-2` with `SectionIndex` + `text-h2`; lists
of items as bento grids of `Card` (equal height, `data-card` kept for the layout test); at most one aurora-tone
section between light ones; end with the dark CTA band and footer. `grid-hairlines`, `DrawLines` and square `rounded-[2px]`
corners are retired (removed in slice 2).

## 11. Accessibility stance

Semantic landmarks, one `h1` per page, skip link (ice pill), visible 2 px `signal`/`phosphor` focus rings,
keyboard-operable menu (focus trap includes the Close button, Escape closes, focus returns), filters as real
links (shareable URLs) with the active one marked `aria-current`, form errors linked with `aria-describedby` and announced via a live region. All
decorative SVG (fields, ghost numerals, glyph) is `aria-hidden`; the hero heading carries the meaning.
