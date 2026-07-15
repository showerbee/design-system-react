# Modernization Roadmap

> **Status: Experimental — scaffolding in progress. Do NOT treat as production-ready.**
>
> This branch (`feat/typescript-modernization`) begins a major modernization toward React 19,
> SLDS 2, and modern tooling (Vite / Vitest / TypeScript / Storybook 10). The **toolchain
> configuration** is in place, but the migration itself is at an early stage: as of the
> 2026-07-15 audit, **1 of 71 components** (`button`) is genuinely, fully migrated. The build,
> test suite, type-check gate, and publish pipeline are **not yet functional**.
>
> A full evidence-backed audit and the detailed plan behind this roadmap live in
> [`docs/superpowers/specs/2026-07-15-modernization-audit-and-roadmap.md`](docs/superpowers/specs/2026-07-15-modernization-audit-and-roadmap.md).

## Honest Status Snapshot (2026-07-15)

| Area | State | Notes |
|------|-------|-------|
| TypeScript entry points | 48 full-ts, 17 partial-ts, 6 js-only | 607 `.jsx` vs 112 `.tsx`; **416 files still `extends React.Component`** |
| Genuinely complete components | **1 / 71** (`button`) | Real TSX + Vitest/RTL test + CSF story. The migration template. |
| Tests | **1** collectable Vitest test | ~47 components still on Enzyme (no React 18/19 adapter); 55 `browser-test.jsx` uncollected |
| Type-checking | **Not enforced** | No root `tsconfig.json`; `tsc --noEmit` covers nothing meaningful |
| Build / publish | **Broken** | npm-publish CI runs Node 14 + a nonexistent script + deleted Babel `.tmp-npm` |
| Clean install | **Fails without `--legacy-peer-deps`** | `react-onclickoutside` caps its peer at React 18 |
| SLDS 2 CSS | **Vendored stopgap** | 952 KB internal `slds-plus.css`; library ships no CSS to consumers |

## Prioritized Plan

Work is dependency-ordered — earlier phases unblock later ones.

### P0 — Make the branch coherent and verifiable
- [ ] Add a root `tsconfig.json` covering `components/**` so type-checking actually runs
- [ ] Drop `react-onclickoutside` (finish the `useClickOutside` migration in `lookup`); declare `prop-types` explicitly → clean `npm install`
- [ ] Fix CJS output (`.cjs`) and `vite-plugin-dts` `include` so the package builds and ships correctly
- [ ] Add real CI (Node 20): install → lint → typecheck → test → build on PR

### P1 — Restore the test safety net
- [ ] Rewrite the ~47 Enzyme suites to Vitest + React Testing Library (template: `components/button/__tests__/button.test.jsx`)
- [ ] Add jsdom polyfills (IntersectionObserver, scrollIntoView, getBoundingClientRect)
- [ ] Delete `karma.conf.js` and the storyshots/puppeteer harness

### P2 — Finish the real TS + hooks conversion
- [ ] Convert the 17 partial-ts internals and 6 js-only components
- [ ] Delete `@ts-ignore` re-export stubs (`data-table`, `menu-dropdown`); rewrite the `data-table` class (XL)
- [ ] Replace the 98 sidecar `.d.ts` shims with real `.tsx`
- [ ] Fix `input` extension-resolution so `index.tsx` ships instead of the legacy `index.jsx`
- [ ] Remove or re-wire the orphaned `check-props.js` files (restores lost deprecation warnings)

### P3 — Positioning + SLDS 2
- [ ] Migrate the Dialog positioning layer off `popper.js` v1 to `@floating-ui/react` (shared by popover, combobox, date-picker, menu, tooltip, dialog)
- [ ] Swap the bundled `slds-plus.css` for the official package: `npm install @salesforce-ux/design-system-2` (latest `2.0.4`), CSS at `dist/css/bundled/slds2.cosmos.css`. Keep `@salesforce-ux/design-system` / `@salesforce-ux/icons` for icon assets.
- [ ] Restore design-token regeneration; decide on a runtime theming API (ThemeProvider) vs documented consumer responsibility

### P4 — Publish, hygiene, docs
- [ ] Rewrite npm-publish for Node 20 + Vite build + `files`/`prepack`; add `sideEffects`
- [ ] Upgrade toolchain: ESLint 9 (flat config), Vitest 3, Vite 6/7, typescript-eslint 8
- [ ] Delete dead scripts / `eslint-plugin/`; fix CODEOWNERS and `dependabot.yml`; wire husky (`.husky/` + `prepare`)
- [ ] Migration guide from v0.x; MDX docs; TypeDoc API docs

## Known Limitations

1. **Node.js** — Requires Node.js >= 20.19.0 (or >= 22.12.0).
2. **React 19 only** — No backward compatibility with React 16/17/18.
3. **Install requires `--legacy-peer-deps`** until `react-onclickoutside` is removed (P0).
4. **No shipped CSS** — the published package currently ships no SLDS CSS; styling is only wired up in Storybook via a vendored, internal-only `slds-plus.css`. Real package swap is P3.
5. **Popper.js v1** — all overlay positioning still uses the deprecated Popper.js v1 (P3).
6. **Tests do not run** — the suite collects one file; Enzyme cannot run on React 19 (P1).

## How to Help

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

**Good first issues (P1/P2 template-driven work):**
- Rewrite a component's Enzyme test to Vitest + RTL using `button` as the template
- Convert a partial-ts component's internals to real `.tsx`
- Migrate a `storiesOf` story to CSF format

## Timeline

Community-driven, no fixed deadlines. Progress depends on contributor availability.
