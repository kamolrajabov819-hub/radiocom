# v3 Polish & Conversion Pass

Focused on the 8 issues you raised. No backend changes.

## 1. Light theme rebuild
- Retune tokens in `src/styles.css`: warmer paper background `oklch(0.97 0.005 60)`, soft charcoal text, subtle warm shadow layer, and a dedicated `--photo-frame` overlay so product photos never sit on flat white.
- Wrap every `<img>` in hero / brand / industry / product cards with a `photo-frame` utility that adds a soft radial vignette + grain + hairline border in light mode (dark mode: no-op). This fixes the "washed-out photos" complaint without regenerating assets.
- Add `img.light-invert-safe` — a mix-blend-multiply layer over pure-white product backgrounds so they blend into the paper tone.
- Fix light-mode contrast on Nav, LeadFormSheet, filters, footer socials (currently rely on `text-crisp/60` which is too light on paper).

## 2. Industries home — full readable names
- `src/routes/industries.index.tsx`: the card title (`text-5xl md:text-5xl`) truncates long localized names like "Производство". Change to responsive clamp typography, `break-words`, `hyphens-auto`, and drop to `text-3xl` on mobile / `text-4xl` md / `text-5xl` xl. Remove aspect-ratio lock in favor of min-height so tall names never clip.

## 3. Industry detail page — sell harder
Rebuild `src/routes/industries.$slug.tsx` into a full sales page:
1. Hero (existing) + animated stat strip: "10,000+ deployed · 11 years · <industry> teams trust us".
2. NEW "Pain grid" — 3 pains specific to that industry (localized), each with icon + red underline reveal on scroll.
3. Existing Problem/Solution split kept but with parallax image band between them.
4. NEW "Outcome metrics" band — 3 big numbers (e.g. `-40% radio downtime`, `<24h deployment`, `3-year warranty`) with count-up animation.
5. Recommended radios (existing) + "Compare all" link into catalog pre-filtered by industry tag.
6. NEW testimonial quote card per industry (localized, 1 quote each).
7. NEW dual CTA: "Book free 7-day test" (primary) + "Download catalog PDF" (secondary), sticky on mobile.
8. FAQ accordion (3 questions per industry, localized).

All copy added to `ru/uz/en.json` under `industries.<slug>.{pains,outcomes,quote,faq}`.

## 4. Mobile catalog filters
`src/routes/catalog.tsx` currently renders the full sidebar inline on mobile. Rebuild:
- Sticky top filter bar on mobile: brand chip · category chip · price chip · "Filters" button.
- Tapping a chip opens a compact bottom sheet (Framer Motion `AnimatePresence`, drag-to-dismiss) with only that facet.
- "Filters" button opens full sheet with all facets + active-count badge and "Reset / Apply" footer.
- Desktop sidebar unchanged.
- Add horizontal scrollable "quick filter" chips row (Waterproof, Digital, Long-range, Under 2M сум) for one-tap conversion.

## 5. Hero headline overflow (RU / UZ / EN)
Root cause: `text-[10vw]` + long words like "communications" / "Небьющаяся связь" / "Buzilmas aloqa" overflow the viewport on narrow screens.
- Replace with `clamp(2.75rem, 9vw, 9rem)` and `hyphens: auto; word-break: break-word; overflow-wrap: anywhere` on hero headline only.
- Shorten localized headlines to two-line editorial pattern (line 1 short, line 2 long), same in all three JSONs, with an explicit `<br/>` split key `hero.title_line1` / `hero.title_line2`.
- Verify at 360 / 390 / 414 / 768 widths via Playwright screenshot after build.

## 6. Design + animation elevation
- Global scroll progress bar (thin signal-red line at top).
- Hero: add slow parallax on hero radio image + animated SVG radio-wave rings behind the headline.
- Sectional scroll-linked reveals using `useScroll` + `useTransform` (image scales from 1.15 → 1.0, text slides up).
- Marquee brand strip: add mask-image fade edges and pause-on-hover.
- Magnetic buttons: increase pull radius + add subtle red halo trail.
- Page transitions: fade + 12px slide via `AnimatePresence` in `__root.tsx` outlet.
- Cursor-follow radar dot on desktop only (respects `prefers-reduced-motion`).

## 7. Conversion pressure
- Above-the-fold on Home: add small "247 free tests booked this year" live-feel counter under CTA.
- Add a "Sticky bottom bar" on mobile Home + Catalog: "Free 7-day test · Book now →".
- Catalog cards: "Request price" button visible without hover on mobile; add "In stock in Tashkent" green dot on ~70% of items.
- Lead form: reduce to 3 fields (name, phone, product) + trust line "We reply in 15 min, Mon–Sat 9–18".
- Add exit-intent trigger (desktop only) opening LeadFormSheet with "Wait — get free test unit" offer, once per session.
- Home reorders: Hero → Sticky CTA visible → Brands → Trade-in offer → Industries → Featured catalog (6 items) → Testimonials → Final CTA. Featured catalog block is new and links straight into `/catalog`.

## 8. Localization
Every new string keyed and added to `src/i18n/{ru,en,uz}.json`:
- `industries.<slug>.pains[]`, `.outcomes[]`, `.quote`, `.quote_author`, `.faq[]`
- `hero.title_line1`, `hero.title_line2`, `hero.social_proof`
- `catalog.filters.open`, `.reset`, `.apply`, `.active`, `.quick.*`
- `home.sticky_cta`, `home.testimonials.*`, `home.featured_title`
- `lead.trust_line`, `lead.exit_intent_title`

## Technical notes
- No new deps.
- Framer Motion `useScroll`/`useTransform` for parallax + count-up.
- Playwright headless verification at 375px and 1280px after build; screenshot hero, industries index, industry detail, catalog mobile filters.
- Light-mode QA pass on every route.

## Out of scope
- No new product data.
- No backend / auth / schema changes.
- No new page routes beyond what exists.
