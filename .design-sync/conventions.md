# bb-in-hoodie-lab — design system conventions

A small, **dark-themed** component set from the bb-in-hoodie lab site. Components
are self-contained and already styled (CSS Modules, compiled into the bundle) —
you compose them and pass props; you do **not** write this DS's internal class
names.

## Setup & wrapping

- **No provider or theme wrapper is required.** Loading `styles.css` establishes
  the whole look: a dark surface (`body` background `#131313`, text `#d9d9d9`),
  the base fonts, and element resets (`ul`, `button`, etc.). Just render the
  components.
- **Fonts load remotely** (Google Fonts, via an `@import` in the shipped CSS):
  **Smooch Sans** (the default body/UI font) and **Figtree** (used for display
  text). They resolve at runtime — no setup needed.
- **`CommonLayout` is a full-page shell**, not an inline component: its root is
  `position: fixed; inset: 0` and it fills the viewport. Use it as the page
  container (it renders a background "scene" via `children` plus an `Article`
  overlay). The other components are normal inline-flow elements.

## Styling idiom

There is **no utility-class or token-prop system** — component styling is internal
and not author-facing. Style your own layout glue against the dark theme:

- Surface / text colors that appear in the shipped CSS: background `#131313`,
  primary text `#d9d9d9`, brighter text `#f0f0f0`, muted text `#979797`.
- Fonts via CSS variables on `:root`: `var(--font-smooch-sans)` (body/UI) and
  `var(--font-figtree)` (display/headings).
- Several components accept a **`className`** prop (`Article`, `GitHub`, `Home`,
  `IconLink`) — use it for spacing/positioning glue, not for restyling internals.

## Where the truth lives

- `styles.css` (and the `_ds_bundle.css` it imports) — the compiled theme +
  component styles. Read it before adding any styling of your own.
- Each component ships a `<Name>.prompt.md` (usage + variants) and `<Name>.d.ts`
  (the exact prop contract). Components, all on `window.BbInHoodieLab`:
  `Article`, `CommonLayout`, `Description`, `GitHub`, `Home`, `IconLink`, `Tags`.

## Idiomatic example

```jsx
// A lab-style page: full-screen scene with the article overlay.
<CommonLayout
  title="FBO Particles"
  tags={["THREE.JS", "FBO", "PARTICLES", "REACT"]}
  description="Frame Buffer Objects allow rendering to an off-screen buffer…"
  githubUrl="https://github.com/bb-in-hoodie/bb-in-hoodie-lab"
>
  {/* your background scene — a canvas, a gradient, etc. */}
  <div style={{ width: "100%", height: "200vh",
                background: "linear-gradient(135deg,#305354,#0f3460)" }} />
</CommonLayout>
```
