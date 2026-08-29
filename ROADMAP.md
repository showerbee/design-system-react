# Modernization Roadmap

> **Status: Active modernization — the bulk of the migration is complete.**
>
> This branch (`feat/typescript-modernization`) modernizes the library to React 19,
> SLDS 2, and a modern toolchain (Vite / Vitest / TypeScript 5 strict / Storybook 10).
> As of the **2026-08-11** audit, essentially every component ships as real `.tsx`
> with a Storybook (CSF) story, the type-check gate is clean, lint is at **zero
> errors** (blocking in CI), and 56 Vitest test files run in place of the old
> Enzyme suites. Storybook now also auto-deploys to GitHub Pages on every push to
> `master`. The remaining work is the popper.js → @floating-ui migration (which
> blocks the last 3 source files — design in progress, see
> `docs/superpowers/specs/`), test/story gap-fill, the SLDS 2 package swap
> follow-through, and the major-version toolchain bumps.

## Status Snapshot (2026-08-11)

| Area | State | Notes |
|------|-------|-------|
| Component sources | **~68 / 71 on `.tsx`** | Only `lookup/index`, `lookup/lookup`, and `utilities/dialog` remain `.jsx` — all blocked by popper.js |
| TypeScript | **`tsc --noEmit` clean** | Root `tsconfig.json` present; `strict: true` |
| Storybook | **10.5.5**, CSF stories | 68 components have stories; 3 do not (see below); auto-published to GitHub Pages from `master` |
| Tests | **56 Vitest files**, 0 Enzyme | Migration off Enzyme complete; ~15 components still lack a test |
| Lint | **0 errors / 199 warnings, blocking in CI** | Fixed `storybook-static/` build output leaking into the lint glob; warnings are pre-existing quality debt (unused vars, a11y) |
| SLDS 2 CSS | **npm package** | Storybook loads `@salesforce-ux/design-system-2@2.264.0` bundled Lightning Blue; static `slds-plus.css` no longer referenced |
| Positioning | **popper.js v1** | Still the deprecated Popper.js v1 — sole blocker for the last 3 `.jsx` (P1); Floating UI migration design in progress |
| React / tooling | React 19.2.8, Vite 5.4, Vitest 1.6, ESLint 8.57 | Major upgrades (Vite 8, Vitest 4, ESLint 10) pending — P4 |
| `react-onclickoutside` / `enzyme` | **removed** | Clean `npm install` no longer needs `--legacy-peer-deps` for these |
| Accessibility | **One-off axe audit run 2026-08-12** | 62 violations remain across 447 stories (down from 93 after this session's fixes), mostly `color-contrast` in SLDS 2 tokens; see [Accessibility](#accessibility) below. No CI gate yet. |

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
- [ ] `icon` — story file exists (`components/icon/__docs__/Icon.stories.jsx`) but is not
      registered in `.storybook/main.ts`'s `stories` glob, so it never builds/renders. One-line fix.

**Components with no Vitest test** — add tests (template: `components/button/__tests__`):
- [ ] `badge`, `brand-band`, `breadcrumb`, `checkbox`, `dynamic-icon`, `files`,
      `icon-settings`, `panel`, `portal-settings`, `progress-bar`, `progress-ring`,
      `radio`, `scoped-notification`, `trial-bar`

**Story/feature gaps vs. SLDS 2** — from the component-by-component comparison in
[`docs/superpowers/specs/2026-08-07-slds2-vs-react-comparison.md`](docs/superpowers/specs/2026-08-07-slds2-vs-react-comparison.md)
(48 matched pairs). Ordered by leverage; skip anything filed "Legacy Components" upstream.

- [ ] **Token-theming ("Customization") story pattern.** SLDS 2 attaches a live
      styling-hook / design-token panel to ~20 components; React has none. Build a shared
      decorator + exemplar "Theming" stories for `button`, `card`, `input`, `avatar` first,
      then extend. *(Highest-leverage, most on-theme for "components using SLDS 2".)*
- [x] **Wire existing `__examples__` into stories (near-zero cost):**
  - [x] `builder-header` — toolbar, utilities, successful/after-successful/failed-save stories added (`a594203e3`). `base-with-page-type-editable` intentionally deferred — depends on Popover/Dialog positioning, tied to P1.
  - [x] `combobox` — custom-menu-item, disabled-options, and RTL stories added (`8a25a5d11`). Remaining 25+ example files still unwired (dialog-boundary variants, additional icon/subheader combos) — lower leverage, revisit after P1 unblocks Dialog.
- [ ] **Add missing high-value state stories:**
  - [ ] `docked-composer` — voice/telephony call-state suite (~10 states), popped-out, overflow menu, log-a-task.
  - [ ] `card` — Loading, Collapsed, NestedCards, DataTiles.
  - [ ] `checkbox` — fieldset group variants, read-only "view mode", help-text/tooltip.
  - [ ] `expression` — error, disabled-inputs, nested groups, locked filters, formula.
  - [ ] `accordion` — ActionMenu, Nested, WrappedInCard, heading truncation.
  - [ ] `modal` — SizeFull; `tabs` — conditional tab, scoped-with-overflow.
  - [ ] `radio-group` — help-icon(+tooltip), disabled-checked, error-checked, label-placement.

**Component feature gaps (capability missing, not just a story)** — file as
enhancement issues, not story fill-ins:
- [ ] `vertical-navigation` — badge / compact / icon / shaded / overflow / validation variants.
- [ ] `visual-picker` — small size tier, disabled state, non-coverable content.
- [ ] `date-picker` — date-**range** selection (SLDS 2 is a dual single/range picker; React is single-only).
- [ ] `app-launcher` — drag-and-drop tile reordering.
- [ ] `input` — native `type` variants (checkbox / toggle / range / color / file).
- [ ] `global-header` — interactive search + notification panel *(blocked by `react-onclickoutside` / React 19 — ties to P1 dependency work).*

### Accessibility

This repo is still experimental and in the pitching phase, so a11y work so far is a
**manual one-off audit**, not an enforced gate. Below is what was found, what was
fixed, what's still open, and the plan for making this automatic once the project
graduates past "pitching."

**How the audit works today (run once, by hand):**
- [`scripts/a11y-audit.mjs`](scripts/a11y-audit.mjs) builds on `axe-core` + Playwright:
  it reads `storybook-static/index.json` for the full story list, then for each story
  navigates a headless Chromium page to `iframe.html?id=<story>`, waits for Storybook's
  `sb-show-main` render-complete signal, and runs `axe.run()` scoped to `#storybook-root`
  against the WCAG 2.1/2.2 A/AA + best-practice rule sets.
- Usage: `npm run build-storybook`, serve `storybook-static/` with `http-server -s`
  (not `serve`, which 301-redirects clean URLs and breaks Storybook's routing), then
  `node scripts/a11y-audit.mjs --url <served-url> --out a11y-report.json`.
- This is deliberately a standalone script, not wired into `npm test` or CI — see
  "Future: automate this" below for the plan to change that.

**2026-08-12 audit results and fixes applied this pass:**
- Initial run: 447 stories, 93 violations across 25 components, plus **4 stories that
  crashed outright** (`Components/Expression` — `default`, `all-conditions`,
  `any-condition`, `custom-logic`) due to a missing `events` default prop causing a
  `TypeError` at render time. Fixed in `components/expression/condition.tsx`.
- `aria-progressbar-name`: fixed across `ProgressBar`, `ProgressRing` (+ its private
  `ring-shape.tsx`), and `ProgressIndicator`'s private progress-bar — all four had
  `role="progressbar"` elements relying on visually-hidden child text for their
  accessible name, which the ARIA spec does not credit to a progressbar (only
  `aria-label`/`aria-labelledby`/`title` count). Added proper `aria-label`s.
- `button-name`: fixed `Tree`'s leaf-item decorative chevron button (`aria-hidden="true"`
  + non-empty assistive text, since it's a permanently-disabled visual-alignment
  placeholder that never actually expands anything on a leaf node).
- Investigating the `MenuDropdown` `button-name` finding on `CustomTrigger`/`WithNubbins`
  surfaced a real, separate **functional bug**, not just a missing label: in the built
  Storybook/Vite bundle (not under Vitest+RTL), `menu-dropdown.tsx`'s custom-trigger
  detection compared a child's `displayName` against the frozen `MENU_DROPDOWN_TRIGGER`
  string constant — but Storybook's `reactDocgenTypescriptOptions` docgen plugin mutates
  every component's `.displayName` at runtime after module load (for docs metadata),
  so the frozen-constant comparison silently stopped matching in the production build.
  `button-trigger.tsx`'s equivalent check already compared against `Button.displayName`
  live and kept working. Fixed `menu-dropdown.tsx` to compare against `DefaultTrigger.displayName`
  (live) instead of the constant, which also fixes the trigger's icon/label rendering
  in the correct place instead of leaking into the opened dropdown's menu content.
- Re-ran the audit after fixes and rebuilding Storybook: **62 violations, 0 crashes**,
  down from 93 violations + 4 crashes. Verified via `npx vitest run` on
  `menu-dropdown`, `time-picker`, `global-header`, `global-navigation-bar` (all of
  which share the same displayName-matching pattern) — 79 tests, all passing.

**Remaining 62 violations (not fixed this pass — triaged, not yet actioned):**
- `color-contrast` (46 of 62, ~20 components: `Accordion`, `Avatar`, `Badge`,
  `Breadcrumb`, `Button`, `Card`, `Checkbox`, `DataTable`, `ExpandableSection`,
  `LocationMap`, `MenuDropdown`, `PageHeader`, `PillContainer`, `ScopedNotification`,
  `SplitView`, `VisualPicker`, and others) — this is almost certainly an SLDS 2
  design-token issue (color pairs defined upstream), not a component-code bug. Needs
  a scoping decision: fix at the token level (upstream `@salesforce-ux/design-system-2`
  concern) vs. component-level color overrides.
- `Pill` — `nested-interactive` + `aria-required-parent` (a focusable `role="option"`
  element with focusable descendants, outside a `role="listbox"` parent).
- `VisualPicker` — `label` (radio inputs without associated `<label>`).
- `Panel` — `select-name` (unlabeled `<select>`).
- `ColorPicker` — `aria-input-field-name` (unlabeled text input).
- `Card` — `scrollable-region-focusable` (scrollable region not keyboard-focusable).
- `DockedComposer` — `target-size` (touch targets below the 24×24px minimum).

**Future: automate this (not started — deliberately deferred while the project is in
the pitching phase; revisit once there's a committed team/CI budget):**
- [ ] Wire `scripts/a11y-audit.mjs` (or a `@storybook/test-runner` + `axe-playwright`
      equivalent — both researched and version-compatible with this repo's Storybook
      `^10.2.1`, but not yet installed) into CI as a real merge gate, generating one
      check per story or one aggregate report. Upstream `salesforce-design-system`'s
      legacy `packages/design-system/__tests__/a11y/` harness (axe + `@sa11y/preset-rules`,
      one Playwright spec per story batch) is worth adapting the pattern from — but note
      upstream itself never wired it into a workflow file either, so this would be new
      ground, not a lift-and-shift.
  - [ ] Baseline the current 62 known violations as an accepted-debt allowlist so the
        gate only fails on *new* violations at first, then ratchet down.
- [ ] Triage the ~91 pre-existing `jsx-a11y` ESLint warnings (currently `warn`, not
      `error` — intentional while getting the repo to zero *errors* was the priority):
      fix the cheap ones, then flip the rule to `error` once the remainder is at or
      near zero, so new a11y lint issues fail CI immediately instead of relying on the
      (currently manual) axe pass.
- [ ] Register `components/icon/__docs__/Icon.stories.jsx` in `.storybook/main.ts` (see
      P2) — orphaned stories are invisible to any future story-driven a11y gate.

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
- [x] **GitHub Pages:** `.github/workflows/pages.yml` builds Storybook and deploys on
      every push to `master`; Pages source set to "GitHub Actions" on the fork. Live at
      https://showerbee.github.io/design-system-react/ once `master` picks up this branch.

## Known Limitations

1. **Node.js** — Requires Node.js >= 20.19.0 (or >= 22.12.0).
2. **React 19 only** — no backward compatibility with React 16/17/18.
3. **Popper.js v1** — Dialog/Lookup positioning still uses the deprecated library (P1).
4. **Published CSS** — the published package does not yet ship SLDS 2 CSS to consumers;
   Storybook wires it up locally from the npm package (P3).
5. **Toolchain majors pending** — Vite/Vitest/ESLint are a major version behind (P4).
6. **No automated a11y gate** — a one-off manual axe/Playwright audit (see
   [Accessibility](#accessibility)) found 62 open violations, mostly `color-contrast`;
   nothing currently blocks a PR from introducing new ones.

## How to Help

**Good first issues (P2 template-driven work):**
- Add a Vitest + RTL test for a component that lacks one (template: `components/button/__tests__`)
- Add a CSF story for `grid`, `navigation`, or `popover-tooltip`

## Timeline

Community-driven, no fixed deadlines. Progress depends on contributor availability.
