# Modernization Roadmap

> **Status: Active modernization — the bulk of the migration is complete.**
>
> This branch (`feat/typescript-modernization`) modernizes the library to React 19,
> SLDS 2, and a modern toolchain (Vite / Vitest / TypeScript 5 strict / Storybook 10).
> As of the **2026-08-06** audit, essentially every component ships as real `.tsx`
> with a Storybook (CSF) story, the type-check gate is clean, and 56 Vitest test
> files run in place of the old Enzyme suites. The remaining work is the popper.js →
> @floating-ui migration (which blocks the last 3 source files), test/story gap-fill,
> the SLDS 2 package swap follow-through, and the major-version toolchain bumps.

## Status Snapshot (2026-08-06)

| Area | State | Notes |
|------|-------|-------|
| Component sources | **~68 / 71 on `.tsx`** | Only `lookup/index`, `lookup/lookup`, and `utilities/dialog` remain `.jsx` — all blocked by popper.js |
| TypeScript | **`tsc --noEmit` clean** | Root `tsconfig.json` present; `strict: true` |
| Storybook | **10.5.5**, CSF stories | 68 components have stories; 3 do not (see below) |
| Tests | **56 Vitest files**, 0 Enzyme | Migration off Enzyme complete; ~15 components still lack a test |
| SLDS 2 CSS | **npm package** | Storybook loads `@salesforce-ux/design-system-2@2.264.0` bundled Lightning Blue; static `slds-plus.css` no longer referenced |
| Positioning | **popper.js v1** | Still the deprecated Popper.js v1 — sole blocker for the last 3 `.jsx` (P1) |
| React / tooling | React 19.2.8, Vite 5.4, Vitest 1.6, ESLint 8.57 | Major upgrades (Vite 8, Vitest 4, ESLint 10) pending — P4 |
| `react-onclickoutside` / `enzyme` | **removed** | Clean `npm install` no longer needs `--legacy-peer-deps` for these |

## Prioritized Plan

### P1 — Unblock the last sources: popper.js → @floating-ui
The three remaining `.jsx` sources all depend, directly or transitively, on the
Dialog positioning layer which still uses **popper.js v1** (deprecated, unmaintained).

- [ ] Migrate `components/utilities/dialog/index.jsx` off `popper.js` to `@floating-ui/dom`
      (`computePosition` + `autoUpdate`), keeping the existing class and building a
      `popperData`-shaped adapter so `utilities/dialog-helpers.js` (nubbin math) stays
      untouched. Convert to `.tsx` in the same change. *(Design doc in progress —
      see `docs/superpowers/specs/`.)*
- [ ] Convert `components/lookup/lookup.jsx` → `.tsx` (depends on Dialog).
- [ ] Convert `components/lookup/index.jsx` → `.tsx` (depends on lookup).
- [ ] Remove `popper.js` from dependencies once no source imports it.

### P2 — Close the story & test gaps
**Components with no Storybook story** — add CSF stories:
- [ ] `grid`
- [ ] `navigation`
- [ ] `popover-tooltip`

**Components with no Vitest test** — add tests (template: `components/button/__tests__`):
- [ ] `badge`, `brand-band`, `breadcrumb`, `checkbox`, `dynamic-icon`, `files`,
      `icon-settings`, `panel`, `portal-settings`, `progress-bar`, `progress-ring`,
      `radio`, `scoped-notification`, `trial-bar`

### P3 — SLDS 2 delivery follow-through
- [x] Storybook renders on the npm `@salesforce-ux/design-system-2` package (latest,
      2.264.0) via `/slds2` static dir instead of the committed `slds-plus.css`.
- [ ] Delete the vendored `assets/styles/slds-plus.css` once nothing references it
      (README and the audit spec still mention it).
- [ ] Decide what CSS, if any, the **published package** ships to consumers (peer
      dependency on `@salesforce-ux/design-system-2` vs. documented consumer
      responsibility vs. a re-exported entry stylesheet).
- [ ] Offer a theme choice (Lightning Blue default; Cosmos alternate) and document it.

### P4 — Toolchain major upgrades & publish
- [ ] Vite 5 → 8, `@vitejs/plugin-react` 4 → 6, `vite-plugin-dts` 3 → 5
- [ ] Vitest 1 → 4, `jsdom` 24 → 29
- [ ] ESLint 8 → 10 (flat config), `@typescript-eslint/*` 7 → 8, `eslint-plugin-react-hooks` 4 → 7
- [ ] `@babel/core` 7 → 8, `@types/node` 20 → 26, `nanoid` 5 → 6, `@testing-library/jest-dom` 6 → 7
- [ ] Verify/repair the npm-publish pipeline (Node 20, Vite build, `files`/`prepack`, `sideEffects`)
- [ ] **GitHub Pages:** the repo has no Pages site; publish the built Storybook
      (`storybook build`) to GitHub Pages via CI so the fork has a live component gallery.

## Known Limitations

1. **Node.js** — Requires Node.js >= 20.19.0 (or >= 22.12.0).
2. **React 19 only** — no backward compatibility with React 16/17/18.
3. **Popper.js v1** — Dialog/Lookup positioning still uses the deprecated library (P1).
4. **Published CSS** — the published package does not yet ship SLDS 2 CSS to consumers;
   Storybook wires it up locally from the npm package (P3).
5. **Toolchain majors pending** — Vite/Vitest/ESLint are a major version behind (P4).

## How to Help

**Good first issues (P2 template-driven work):**
- Add a Vitest + RTL test for a component that lacks one (template: `components/button/__tests__`)
- Add a CSF story for `grid`, `navigation`, or `popover-tooltip`

## Timeline

Community-driven, no fixed deadlines. Progress depends on contributor availability.
