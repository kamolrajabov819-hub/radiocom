
# Radiocom.uz — v2 Upgrade Plan

Ten coordinated changes across theming, content, routes and i18n. Nothing outside frontend/presentation.

## 1. Dark & Light theme

- Refactor `src/styles.css` tokens into `:root` (light) and `.dark` (dark) blocks under `@theme inline`.
  - Light: bg `#FAFAFA`, panel `#E5E5E5`, text `#0A0A0A`, cool `#6B6B6B`.
  - Dark: bg `#0A0A0A`, panel `#1C1C1C`, text `#F5F5F5`, cool `#A8A8A8`.
  - Accent `--signal #E30613` shared.
- Add `@custom-variant dark (&:where(.dark, .dark *));`.
- New `ThemeToggle` component (sun/moon Lucide icons) next to `LangToggle` in `Nav`; state persisted in `localStorage("radiocom-theme")`, hydrated in a `useEffect` to avoid SSR mismatch. Default = dark.
- Sweep components that hardcode `bg-pitch / text-crisp` and switch to semantic tokens (`bg-background`, `text-foreground`, `bg-panel`).

## 2. Mobile responsiveness + animations

- Every grid: `grid-cols-1 md:grid-cols-12` with `min-w-0`, `shrink-0` per responsive-layout guidance.
- Nav becomes a hamburger drawer (`Sheet`) under `md`, containing links, Industries submenu, socials, theme+lang toggles.
- Reduce parallax translate range and disable magnetic hover on `(pointer: coarse)` via a `useReducedMotion` + `matchMedia` hook.
- All CTAs enforce `min-h-12` and 16px+ text.
- Hero headline scales `text-5xl → md:text-8xl → xl:text-[10rem]`.

## 3. Elevated offers

- `StickyLeadNet`: enlarge to 64px, add layered `box-shadow` red glow + slower `animate-ping`; text label hides on mobile leaving a pulsing dot.
- Hero "Book Free Testing" CTA: `w-full` mobile, glowing `shadow-[0_0_60px_-10px_var(--signal)]` on desktop.
- Add a red pill "🔥 Trade-In" badge in Nav that anchors to `#tradein` on `/` (or navigates + scrolls if elsewhere).

## 4. Industries expansion

- Add Nav "Industries" dropdown (Radix HoverCard on desktop, accordion in mobile drawer).
- New route pattern using dynamic segment: `src/routes/industries.$slug.tsx` + `src/routes/industries.index.tsx` (overview grid).
- Six slugs: `horeca`, `construction`, `security`, `mining`, `transport`, `manufacturing`.
- Each industry page: cinematic hero image (generated), problem/solution 2-col slab, recommended radios grid (filtered from `products.ts` via a `industries: string[]` tag), stats strip, embedded `LeadFormSheet` trigger "Book Free On-Site Test".
- Industry copy + hero image prompts stored in `src/data/industries.ts` and localized keys in each i18n file.

## 5. Brands strip with real logos

- Add SVG wordmarks under `src/assets/brands/` (Motorola, Hytera, Decross, Baofeng, Alinco, Samcom) — recreated as clean inline SVG components (avoids trademark image hosting). Radiocom uses existing logo.
- Replace `TrustRow` with an interactive strip: each logo wrapped in a Framer Motion tile with 3D flip on hover (`rotateY`) revealing product count, and magnetic pull on desktop.

## 6. Real catalog data

- Rewrite `src/data/products.ts` with the exact list (RC, Motorola Talkabout, Motorola Pro DP/DM, Repeaters SLR, Decross, Hytera, Caltta, Baby Monitors, Accessories, PDA).
- Schema: `{ id, name, brand, category, price, priceLabel, rangeCity, rangeOpen, features[], industries[], image }`.
- Prices formatted `2 000 000 сум` (localized: `сум / so'm / UZS`).
- Categories: `amateur | professional | mobile | repeater | poc | accessory | baby-monitor | pda`.
- Placeholder product renders generated via `imagegen` (transparent PNG on charcoal) — one per unique model family, reused across variants.

## 7. Download Catalog button

- Upload provided PDF as a Lovable asset (`src/assets/radiocom-catalog.pdf.asset.json`) via the assets CLI from `/mnt/user-uploads/`.
- Add "Download catalog" button (Lucide `FileDown`) in:
  - Top Nav (desktop, next to Contact — icon+label; icon-only on tablet).
  - Catalog sidebar (full-width primary outlined button at top).
  - Mobile drawer.
- Downloads via `<a href={catalog.url} download>` with i18n label.

## 8. Google Maps embed

- New `MapEmbed` component wrapping the provided iframe (sanitized, `loading="lazy"`, `referrerpolicy="no-referrer"`, `title` for a11y).
- Rendered inside `Footer` (full-width band above legal line) and on `/service` (dedicated "Visit us" section with address block + hours next to the map on desktop).

## 9. Social media

- New `Socials` component: inline SVGs for Instagram, Facebook, Telegram (Lucide has all three).
- Links open in new tab with `rel="noopener noreferrer"` and localized `aria-label`s.
- Placed in `Footer` (right column) and in the mobile Nav drawer footer.

## 10. i18n sweep

- Add new keys across `ru/uz/en.json`:
  - `nav.industries`, `nav.download`, `nav.theme_light`, `nav.theme_dark`, `nav.tradein_badge`.
  - `industries.overview.*` + per-slug `industries.<slug>.{name,hero,problem,solution,cta}`.
  - `catalog.download`, `catalog.currency`.
  - `footer.follow`, `footer.map_title`, socials `aria.*`.
- No English strings left in component JSX — all text via `t()`.

---

## Technical section

- Theme provider: tiny module `src/lib/theme.ts` toggling `document.documentElement.classList` and writing localStorage; hydrated via `useEffect` (same pattern as `hydrateLanguage`) to keep SSR safe.
- Route registration: TanStack file-based, use `industries.$slug.tsx` and `industries.index.tsx`; regenerated automatically. `useParams()` untyped-manually.
- Products dataset stays static; filtering happens client-side by `industries.includes(slug)` and `category`.
- Brand SVGs are simplified wordmarks; not the trademarked logotypes at full fidelity — this keeps assets in-repo and animatable.
- Map iframe: escape the embedded HTML and split the `<style>` block into scoped CSS on the component (Tailwind v4 — put shared rule in `styles.css` under `@utility map-embed`).
- PDF asset served from CDN via `lovable-assets create`; no repo bloat.
- No backend changes; lead form remains client-only.

## Out of scope

- Real trademarked brand logo files (using clean SVG wordmarks instead).
- Real product photography (using generated placeholders keyed by model family).
- Backend email delivery for the lead form (can enable Lovable Cloud later).

Reply **approve** to build, or tell me which items to drop/reorder.
