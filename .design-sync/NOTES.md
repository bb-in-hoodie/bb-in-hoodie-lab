# design-sync notes — bb-in-hoodie-lab

This repo is a **Vite application** (the lab site), not a packaged component
library. There is no published `dist/` with component exports, so the converter
is fed a purpose-built library bundle. Read this before re-syncing.

## Build setup (how the bundle is produced)

- **`[GENERAL]` The DS bundle is built by a dedicated Vite library build**, not
  the app build. `cfg.buildCmd` runs `.design-sync/vite.ds.config.ts` (entry
  `.design-sync/ds-entry.tsx`, a barrel re-exporting the 7 storied components)
  into `.design-sync/ds-dist/`, then copies the hand-authored
  `.design-sync/ds-meta/{package.json,ds.d.ts}` alongside the emitted
  `ds.js` / `bb-in-hoodie-lab.css`.
  - Why a barrel + custom build: the components import `*.module.scss`, and the
    converter's own esbuild bundle (`lib/bundle.mjs`, fork-forbidden) has **no
    scss loader**. Pre-compiling with Vite resolves scss → class strings + a
    single extracted CSS, which esbuild can then wrap as `window.BbInHoodieLab`.
  - **`[GENERAL]` The whole React family is externalized** in the lib build
    (`react`, `react-dom`, `react-dom/client`, `react/jsx-runtime`,
    `react/jsx-dev-runtime`, `react-is`, `scheduler`). The converter only shims
    React by import specifier; inlining it would create a second React instance
    and break hooks. Everything else (framer-motion, classnames) is bundled.
- **`[GENERAL]` `ds-meta/ds.d.ts` is hand-authored** — the app has no emitted
  type declarations. It mirrors each component's props (see
  `src/common/components/<Name>/<Name>.tsx`). The converter discovers component
  exports and prop types from this file (it walks up from `--entry` to
  `ds-dist/package.json`, whose `types` points here).
- **`[GENERAL]` Config path resolution gotcha:** `cfg.cssEntry` / `cfg.tsconfig`
  resolve **relative to PKG_DIR** (`.design-sync/ds-dist`), not cwd. Hence
  `cssEntry: "bb-in-hoodie-lab.css"` and `tsconfig: "../../tsconfig.json"`.
  (`cfg.entry` and `cfg.storybookStatic` are cwd-relative — different rule.)

## Styling / fonts

- **`[GENERAL]` Base styles ship via the bundle CSS.** `ds-entry.tsx` imports
  `@/common/styles/globals.scss` (dark theme: bg `#131313`, text `#d9d9d9`,
  Smooch Sans body font, ul/button resets) so every design renders on-brand.
  The component `.module.scss` files alone do not carry these.
- **`[GENERAL]` Fonts are remote (Google Fonts).** The app loads Figtree +
  Smooch Sans via a `<link>` in `index.html`. We ship the same as an `@import`
  at the top of the bundle CSS (`.design-sync/ds-meta/ds-base.css`, imported
  first in `ds-entry.tsx`). The validator reports `[FONT_REMOTE]` (ok).
- **`[GENERAL]` Storybook reference needs the fonts too.** Added
  `.storybook/preview-head.html` (same Google Fonts `<link>`) so the reference
  render — the grading oracle — uses the real typefaces instead of a fallback
  that would falsely match a fallback-rendered preview.

## Storybook build

- **`[GENERAL]` `.storybook/main.ts` `viteFinal` strips app-only Vite plugins**
  (`inject-metadata`, `prerender-routes`). `prerender-routes.closeBundle` reads
  `./dist/index.html`, which doesn't exist during a Storybook build and made it
  exit non-zero. Without this, the reference build (and re-sync) fails
  `[SB_BUILD_FAIL]`.

## Assets

- **`[GENERAL]` All assets are inlined as data URLs** (`assetsInlineLimit:
  10_000_000` in `vite.ds.config.ts`). The design bundle ships only `ds.js`, so
  vite's default (externalize images >4KB, e.g. `github-logo.png`) produced
  asset paths that 404 in claude.ai/design → broken images. Inlining makes the
  bundle self-contained.

## Card background (dark theme)

- **`[GENERAL]` The preview-card template hardcodes `body{background:#fff}`** in
  an inline `<style>`, which wins over `globals.scss`'s `body` rule by load
  order. This DS is dark-themed, so light-on-dark components vanished on the
  white card. Fixed with a higher-specificity `html body { background-color:
  #131313 }` (0,0,2 beats the inline 0,0,1) added to
  `.design-sync/ds-meta/ds-base.css`. Harmless in rendered designs.

## Card layout overrides

- `Article` → `cardMode: "column"` (stories wider than a grid cell).
- `CommonLayout` → `cardMode: "single"`, `primaryStory: "Default"`,
  `viewport: "1200x800"`. It is a full-page layout (`.wrap` is
  `position: fixed; inset: 0`). An **owned preview**
  (`.design-sync/previews/CommonLayout.tsx`) wraps the story in a sized
  `transform: translateZ(0)` container so the fixed layout gets a real
  containing block and renders (the single-mode card alone left it 0-height /
  blank).
- `IconLink` / `GitHub` / `Home` → `viewport: "200x140"`. These are ~30px icon
  links; a small card frames the icon clearly instead of stranding it top-left
  in a large viewport. (At <768px width they render the 24px mobile size — fine
  for an icon card.)

## Re-sync risks (watch-list for the next run)

- **`ds-meta/ds.d.ts` is hand-authored** and can drift from the component
  sources. If a component's props change, update `ds.d.ts` to match — nothing
  checks this automatically.
- **`[REFERENCE_STALE?]` is expected** whenever only the build config changed
  (e.g. `assetsInlineLimit`) without a DS-source change — the bundle sha moves
  but the design doesn't. Rebuild the reference only when component sources or
  styles change.
- **Fonts and reference font-faithfulness** depend on `.storybook/preview-head.html`
  and the remote `@import` in `ds-base.css`. The grading oracle needs egress to
  `fonts.googleapis.com` / `fonts.gstatic.com`; a network-sandboxed shell would
  blank fonts on both panels (see `[ASSETS_BLOCKED]`).
- **CommonLayout's owned preview** is tied to the story's structure; if the
  CommonLayout story or its `.wrap`/`.scene` CSS changes, re-verify the card.
- The icon components' `viewport` framing is a presentation choice — re-grading
  isn't needed for it, but it's the capture viewport, so a viewport edit
  re-grades.
- **Palette:** `src/common/styles/colors.scss` defines more colors than the
  synced components use — `#1a1a1a` (grey-dark), `#0a0a0a` (black), and the
  lime accent `#e9ed64` are absent from the compiled bundle CSS, so they were
  deliberately left out of `conventions.md` (header names only what's in the
  build). If a future component uses them, they'll appear and can be added.
