
# v4 — Apple Aesthetic Overhaul

Complete visual reset. All existing routes, `src/data/products.ts`, i18n dictionaries (RU/UZ/EN), Google Maps embed, and lead-gen (`LeadFormSheet`, `StickyLeadNet`) are preserved — only the presentation layer is rebuilt.

## 1. Design system reset (`src/styles.css`)

Wipe brutalist tokens. Rebuild around Apple palette:

- Light: `--background #FFFFFF`, `--surface #F5F5F7`, `--foreground #1D1D1F`, `--muted #86868B`, `--accent #0066CC`.
- Dark: `--background #000000`, `--surface #1C1C1E`, `--foreground #F5F5F7`, `--muted #86868B`, `--accent #2997FF`.
- Radii: `--radius-lg 1rem`, `--radius-2xl 1.25rem`, `--radius-3xl 1.75rem`.
- Typography: single family Inter (variable, via existing Google Fonts link). Remove Space Grotesk, Syne, JetBrains Mono, Clash Display. Utility `text-headline` → `font-weight:600; letter-spacing:-0.03em; text-wrap:balance`. Utility `text-subhead` → `text-muted, weight 400, tracking-tight`.
- New utilities: `.pill` (rounded-full, px-5, py-3), `.pill-primary`, `.pill-ghost`, `.frost-nav` (backdrop-blur-xl, bg-background/70, border-b border-black/5 dark:border-white/10), `.bento-card` (bg-surface, rounded-3xl, p-8/p-12), `.section` (py-24 md:py-32), `.section-alt` (bg-surface).
- Kill `photo-frame`, `hero-headline`, `wave-ring`, `radar-arc`, `signal-pulse`, `marquee-track`, `metric-num`, `hairline`. Keep only what the new system needs.
- Motion default: framer-motion spring `{ type:"spring", stiffness:100, damping:20 }` exposed via a shared `springs.ts` helper.

## 2. Global chrome

- **`Nav.tsx`** — rebuild as thin (h-12) frosted top bar. Left: text links (Home, Catalog, Industries dropdown, Advanced, Service). Center: Radiocom wordmark. Right: language toggle, theme toggle, blue pill "Get Quote". Mobile: hamburger opens full-screen fade-in menu.
- **`Footer.tsx`** — minimal Apple-style: thin dividers, small gray links grid (Shop / Services / Company / Contact), socials as icon row, legal line.
- Remove `ScrollProgress`, `StickyBottomCta`, `StickyLeadNet` visual noise from most routes; keep a single `StickyBottomCta` only on mobile Home + Catalog, restyled as a subtle pill.
- Root shell: light mode is now the default; dark mode via toggle. Flip the pre-hydration script to default light.

## 3. Home `/` — iPhone Pro launch style

Sections, alternating white / off-white / black:

1. Hero (white): centered `text-headline` (7xl) "Pro Communication. Unbreakable.", subhead in `text-muted`, two centered pills [Book Free Test] (solid black) + [Learn more ›] (blue link). Below, edge-to-edge hero radio image, scale 1.05→1.0 on scroll (`useScroll` + `useTransform`).
2. Feature strip (black): full-bleed dark section, huge centered headline "Built for the toughest sites.", supporting radio product photo.
3. Bento grid (off-white): 6-cell responsive grid replacing the industry hover grid — Trade-In, 35+ Models, 12-Month Warranty, Nationwide Delivery, Free 7-Day Test, Authorized Service. Cards `rounded-3xl bg-surface`, headline + one-line sub + subtle image or Lucide glyph.
4. Industries teaser (white): 3-up card grid linking into `/industries/$slug`, softer than current.
5. Featured catalog (off-white): 4 product cards from `products.ts` in new Apple card style.
6. Final CTA (black): centered headline + solid white pill "Talk to an engineer".

All animations: fade-up + spring, image scale-in on view.

## 4. Catalog `/catalog` — Mac comparison style

- Sticky horizontal filter bar under nav: pill chips for brands and categories, horizontal scroll on mobile with mask-fade edges, active chip = filled black/white pill.
- Remove the mobile bottom-sheet filter system; the horizontal pills replace it. Price and "in stock" become secondary chip toggles in the same bar.
- Grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`, gap-6, cards `bg-surface rounded-3xl p-8`, image centered in a square, product name (semibold), price (regular), small blue "Request Quote" link opening `LeadFormSheet`.
- Slide-over detail panel restyled to match (white/dark surface, rounded-l-3xl, soft dividers).

## 5. Industries `/industries/*` — iPad deep-dive

- `industries.index.tsx`: full-bleed cinematic hero, then 2-col Apple bento of the 6 sectors, each rounded-3xl with lifestyle photo.
- `industries.$slug.tsx`: 
  - Cinematic hero photo, headline overlay fading in on scroll.
  - Sticky scroll storytelling section: left column pinned text (pains → solution → outcomes) using `position: sticky`; right column swaps recommended radio images via `AnimatePresence` crossfades tied to scroll progress.
  - Outcome metrics band (kept, restyled with big Inter numerals, no red).
  - Clean 3-col grid of recommended radios (Apple card).
  - FAQ accordion restyled with hairline dividers.
  - Dual pills CTA at end; sticky mobile CTA pill.
- All existing i18n keys reused; no copy churn beyond removing brutalist labels.

## 6. Advanced `/poc` — AirPods Pro tech style

- Hero: gradient text reveal on scroll for "Global Range. Zero Repeaters." via `background-clip:text` + `useScroll` mask animation.
- PoC vs PMR: side-by-side visual comparison cards (two rounded-3xl panels) with Lucide icons and crossfade on hover/scroll — no tables.
- Network Design & Rental: huge Inter type, generous whitespace, single supporting image per section.

## 7. Service `/service` — AppleCare style

- Clinical white layout, generous padding.
- Repair process as a horizontal timeline: Diagnostics → Analysis → Testing → Repair, thin connecting line, minimalist Lucide icons in circles.
- Address / hours block in a rounded-3xl surface card next to the map.
- `MapEmbed` wrapped in `rounded-3xl overflow-hidden` container, iframe filter tuned lighter (`grayscale(0)` in light, `invert(0.9) hue-rotate(180deg)` in dark) for Apple feel.

## 8. Components touched

Rewrite: `Nav.tsx`, `Footer.tsx`, `LeadFormSheet.tsx`, `ThemeToggle.tsx`, `LangToggle.tsx`, `BrandsStrip.tsx` (thin monochrome logo row, no 3D flips), `Socials.tsx`, `MapEmbed.tsx`.

Delete: `RadarLoader.tsx`, `MagneticButton.tsx`, `ScrollProgress.tsx`, `StickyLeadNet.tsx`, `CountUp.tsx` (or restyle CountUp to Inter numerals — keep for outcome metrics).

New: `components/Pill.tsx` (button primitive), `components/BentoCard.tsx`, `components/ProductCard.tsx`, `components/SectionHeadline.tsx`, `lib/springs.ts`.

## 9. i18n

Reuse existing RU/UZ/EN keys. Add only:
- `home.hero.title`, `home.hero.sub`, `home.hero.cta_primary`, `home.hero.cta_secondary`
- `home.bento.{tradein,models,warranty,delivery,test,service}.{title,sub}`
- `home.final_cta.{title,sub,button}`
- `nav.get_quote`
- `poc.hero.title` (updated), `poc.compare.{poc,pmr}.{title,points}`

Translations added in all three JSON files.

## 10. Technical notes

- Keep TanStack Start routing, TanStack Query wiring, i18n loader, theme hydration script (flip default to light).
- Framer Motion only; no GSAP. Shared spring config in `lib/springs.ts`.
- `text-wrap: balance` on all headlines for centered multi-line hero text.
- Verify at 375 / 768 / 1280 via Playwright screenshots for Home, Catalog, one Industry page, PoC, Service, in both light and dark. Confirm hero headline never overflows in RU/UZ/EN.
- Typecheck must be clean; no leftover imports from deleted components.

## Out of scope

- No changes to `src/data/products.ts` (product list, prices).
- No backend, auth, schema, or storage changes.
- No new routes.
- No brand-new copy beyond the small additions listed above.
