# Radiocom.uz — Build Plan

An award-style, brutalist-editorial marketing site for Uzbekistan's leading pro radio distributor. Static content only (no e-commerce, no backend). All CTAs feed a "Request Quote / Book Testing" lead form (client-side, opens a slide-over — submission is a stub for now unless you want Lovable Cloud email delivery, which we can add later).

## Design system (locked)

- **Palette**: Pitch Black `#0A0A0A`, Charcoal `#141414`, Panel `#1C1C1C`, Cool Gray `#A8A8A8`, Crisp White `#F5F5F5`, **Signal Red `#E30613`** (matches logo dot) — used ONLY for primary CTAs, hovers, accents. No blue, no gradients.
- **Type**: `Clash Display` (massive display headers, 8xl–[12rem]) + `Space Grotesk` (UI) + `JetBrains Mono` (specs/technical labels). Extreme scale contrast (12rem headline next to 12px mono caption).
- **Grid**: 12-col brutalist asymmetric — offset headlines, overlapping panels, hairline dividers, generous negative space. No bento symmetry, no 50/50 splits, no wavy shapes.
- **Motion**: Framer Motion — staggered word/line reveals on scroll, parallax on hero imagery, magnetic red buttons, horizontal scroll product rails, "radar sweep" loader micro-interaction (concentric red arcs, matching logo).

## i18n

Sleek top-right toggle `RU · UZ · EN` (RU default — the source content is Russian). Implemented with `react-i18next`, JSON dictionaries under `src/i18n/{ru,uz,en}.json`. Instant swap, no reload, persists to localStorage.

## Pages / routes

```
/                 Home — immersive sales engine
/catalog          Multi-brand filterable catalog
/poc              Advanced Systems (PoC + network design + rental)
/service          Authorized Service Center
```
Each route has its own `head()` with unique title/description/OG.

### 1. Home `/`

1. **Hero** — asymmetric. Dark cinematic photo (radio silhouette / operator) with parallax. Massive left-aligned headline **"Unbreakable Communication."** breaking across two lines with a red underscore accent. Mono subline: "11 years · 10,000+ clients · Motorola · Hytera · Radiocom RC." CTAs: solid red **Book Free Testing** (magnetic hover) + ghost outline **Explore Industries**.
2. **Authority marquee** — infinite ticker: "35 Radio Types • 12-Month Warranty • Authorized Service Center • 10,000+ Clients • Free Nationwide Delivery" — mono type, hairline borders.
3. **Industry hover grid** — HoReCa / Construction / Security as full-bleed horizontal bands. Hover shifts background image + slides in curated product thumbs on the right. Keyboard accessible.
4. **Trade-In section** — high-contrast black/red. Split animation: cracked walkie-talkie SVG on the left morphs (spring-scale) into a sleek Motorola on the right when in view. Copy: "Exchange old walkie-talkies. Get a massive discount." CTA: **Start Trade-In**.
5. **Stats slab** — brutalist counters: `35 / 10K / 11` with mono labels, animated count-up.
6. **Trust row** — brand wordmarks (Motorola, Hytera, Decross, Baofeng, Alinco, Samcom) on hairline row.
7. **Footer** (global) — minimalist dark: contacts, address, hours, red logo dot.

### 2. Catalog `/catalog`

- **Sticky left sidebar filters** (desktop) / bottom-sheet (mobile):
  - Categories: Amateur, Professional, PoC, Accessories, Baby Monitors, PDAs
  - Brands: Motorola, Hytera, Decross, Baofeng, Alinco, Samcom, Radiocom RC
  - Features chips: GPS, PoC Network, IP67, Bluetooth
- **Grid**: architectural cards, no watermarks, benefit tags (`✓ GPS`, `✓ PoC`). Placeholder images generated via `generate_image` per model (transparent PNG on charcoal).
- **Product detail**: clicking opens a **slide-over side panel** (Radix Sheet) with specs table (mono), gallery, and a **Request Quote** form (name, company, phone, qty, message). No cart, no checkout.
- Product data lives in `src/data/products.ts` as a typed array — seeded with ~18–24 realistic entries across brands/categories drawn from the uploaded price list.

### 3. Advanced Systems `/poc`

- Hero: "Global Range. Zero Repeaters. Push-to-Talk over Cellular."
- **PoC vs PMR interactive comparison** — side-by-side animated table; rows reveal on scroll with red check / gray dash; hoverable rows expand a mono explanation.
- **Network Design & Commissioning** — scroll-triggered editorial section with blueprint SVG overlay + parallax antenna photo. Bullet list of the project workflow (survey → design → docs → frequency licensing → commissioning).
- **Rental** — "1 day to 5+ years" — big mono duration slider (visual only) with pricing tiers copy.
- Contact strip with the two PoC phone numbers.

### 4. Service `/service`

- Editorial hero: high-quality technician-at-workbench photo, red frame accent.
- **Animated checklist** — Certified Techs / Original Parts / 24/7 Fast Repair / Fixed Pricing — checkmarks stroke-draw on scroll.
- Process timeline (Diagnostics → Analysis → Testing → Repair) as a horizontal scroll rail.
- Warranty & return-policy accordion (condensed from the provided legal copy).
- Service center phone numbers strip.

## Global elements

- **Top nav**: left = Radiocom mark (logo asset), center = links (Home / Catalog / PoC / Service / About), right = language toggle + red **Contact** button. Sticky, blurred charcoal on scroll.
- **Sticky Lead Net**: floating red circular button, bottom-right on every route — opens the same slide-over lead form pre-filled with "Free On-Site Test."
- **Radar sweep loader**: shown during route transitions & form submits (concentric red arcs sweeping, matching logo iconography).
- **Footer**: contacts, address (Uzbekiston Ovozi 2, Tashkent), hours, emails, phone numbers, brand row, small legal.

## Technical notes

- Stack: TanStack Start (existing), Tailwind v4, Framer Motion, react-i18next, Radix (Sheet, Dialog, Accordion), lucide-react icons.
- Fonts loaded via `<link>` in `__root.tsx` head (Clash Display via Fontshare, Space Grotesk + JetBrains Mono via Google Fonts).
- Design tokens added to `src/styles.css` (`--signal`, `--pitch`, `--charcoal`, `--panel`, `--cool`, `--crisp`) with matching Tailwind theme entries.
- Logo asset uploaded via `lovable-assets` from `/mnt/user-uploads/logo-black.jpg` (used inverted / on-dark).
- Product/spec imagery generated with `generate_image` (dark studio, red rim light).
- No backend this pass. Lead-form submissions log to console + show a success state; if you want real email delivery + storage, we can enable Lovable Cloud in a follow-up.

## Out of scope (this pass)

- Real inventory / pricing sync from the PDF (we'll seed representative products; full catalog import can follow).
- CMS, admin, auth, checkout.
- Actual email dispatch for lead forms.

Reply **approve** to build, or tell me what to adjust (pages to drop, extra sections, different fonts, backend on/off).