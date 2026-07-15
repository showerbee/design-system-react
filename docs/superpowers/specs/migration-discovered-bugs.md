# Component bugs discovered during P1 test migration

These are genuine pre-existing bugs surfaced (not caused) by the Enzyme→RTL migration.
The migration `it.skip(...)`s the affected tests with a NOTE so the suite stays green;
each must be fixed in P2 (real TS + hooks conversion) and the skipped tests re-enabled.

## Status — all discovered runtime bugs FIXED ✅

Every React-19 runtime bug found during the migration is now fixed and its tests
re-enabled. Suite: **696 passed, 11 skipped, 0 failed; `tsc --noEmit` clean.**

Fixed (details below): Portal (createPortal), lookup string ref, menu-dropdown/menu-picklist
keyboard nav, data-table + visual-picker Fragment prop leaks, react-highlighter-ts React-19
mismatch (npm `overrides`), global-header Fragment-child drop.

Also proven false and re-enabled (test-harness/assumption bugs, not real limitations):
split-view multi-select (3), data-table keyboard nav + actionable mode (2), app-launcher
title highlight (3). Added a modal Escape-close test.

The **11 remaining skips are genuine jsdom limitations**, not bugs:
- modal (3): Tab focus traversal / focus trap / Enter-activates-button — jsdom doesn't
  move focus on Tab or synthesize click from Enter.
- data-table (2): keyboard column resize — `column-resizer` needs real element widths
  (0 in jsdom).
- app-launcher (6): description / more-link / tooltip / description-highlight — all render
  through `Truncate`, which measures text via the Canvas API + `getBoundingClientRect`.
These need a browser-mode runner (e.g. Vitest browser mode / Playwright), tracked for later.

## ✅ FIXED (P2) — Portal used React APIs REMOVED in React 19

- **File:** `components/utilities/dialog/portal.jsx`
- **Was:** used `unstable_renderSubtreeIntoContainer` and `unmountComponentAtNode` —
  both **removed in React 19**. A real runtime blocker (not test-only): any overlay
  rendering through this Portal (filter+popover, and the dialog `overflowBoundaryElement`
  position path) would crash on modern React.
- **Fix (done):** rewritten as a function component on `ReactDOM.createPortal` with
  `useEffect`-managed container node creation/teardown; React now unmounts the portal
  content automatically when the owner unmounts. Sole consumer is `dialog/index.jsx`.
- **Re-enabled tests:** the 2 `components/filter/__tests__/filter.test.jsx` tests now pass
  (stable across repeated runs).


## ✅ FIXED (P2) — lookup menu crashed on React 19 ref validation

- **File:** `components/lookup/private/item.jsx`
- **Was:** the menu item anchor used a **string ref** (`ref={id}`, line 120). String refs
  were **removed in React 19**, so opening the menu threw "Expected ref to be a function,
  an object returned by React.createRef(), or undefined/null". (Not the Header/Footer refs
  as first suspected — those are valid class-component refs.)
- **Fix (done):** removed the string ref. It was dead — `this.refs` is never read anywhere,
  and the anchor's `id` attribute (used by `aria-activedescendant`) is set independently.
- **Re-enabled tests:** all 15 `components/lookup/__tests__/lookup.test.jsx` tests that open
  the menu now pass (21/21 in the suite).

## modal — focus-trap tests (jsdom limitation, not a bug)

- **File:** `components/modal/__tests__/modal.test.jsx` — 3 skipped (tab focusing / focus trap).
- jsdom cannot meaningfully simulate browser focus traversal; these work in real browsers.
  Revisit with a browser-mode test runner if desired (not required for P1).

## ✅ FIXED (P2) — global-header dropped all action items grouped in a Fragment

- **File:** `components/global-header/index.tsx`
- **Was:** the `ul.slds-global-actions` rendered but the 6 action items
  (Favorites/Task/Help/Setup/Notifications/Profile) did not appear as `<li>` children —
  a **real component bug**, not jsdom. `React.Children.forEach` sorted children into
  buckets by `displayName`, but when the children were grouped in a `React.Fragment`
  (`<>...</>` — exactly how the tests and typical usage pass them) it saw a single
  Fragment child with no `displayName` and silently dropped everything inside.
  (Confirmed: passing the same children as a plain array rendered all 6; as a Fragment,
  0.)
- **Fix (done):** added a `sortChild` helper that recurses into a Fragment's children
  before bucketing by `displayName`.
- **Re-enabled tests:** the two previously warn-and-proceed tests now strictly assert 6
  `<li class="slds-global-actions__item">` items render in the correct (reordered) order.

## ✅ FIXED (P2) — menu-dropdown keyboard navigation crash

- **File:** `components/menu-dropdown/menu-dropdown.tsx:609` (`focusMenuItem`),
  `components/utilities/menu-list/{index,item}.jsx`, `utilities/keyboard-navigate.js`
- **Was:** `TypeError: menuItem.getElementsByTagName is not a function` when opening the
  menu via Enter/Down or navigating with arrows. Three compounding React-19 causes:
  1. `menu-list` attached `ref=` to the `ListItem` **class component**, so `itemRefs`
     received the class *instance* (no `getElementsByTagName`) instead of the `<li>` DOM
     node. Fixed by adding a `nodeRef` callback prop to `ListItem`, attaching it to all
     three `<li>` roots, and changing `menu-list/index.jsx` to pass `nodeRef=` (forwards
     the real DOM node). This also fixes menu-picklist's identical latent bug.
  2. `keyboard-navigate.js` used `ReactDOM.findDOMNode`, **removed in React 19**. Replaced
     with a `resolveTriggerNode` helper (trigger is already a DOM node via callback ref).
  3. `openMenuKeys` omitted `KEYS.DOWN`, so the Down-arrow-opens-menu WAI-ARIA pattern
     never fired. Added it.
- **Re-enabled tests:** all 5 menu-dropdown keyboard tests (27/27) **and** the 3
  menu-picklist tests (8/8) that share the same code path.

## ✅ FIXED (P2) — data-table `style` prop passed to `React.Fragment`

- **File:** `components/data-table/private/header-cell.tsx` (`getHeaderCellContent`)
- **Was:** on the `fixedLayout`/`fixedHeader` path, `getHeaderCellContent` wrapped its
  single child in a Fragment (`<>{getFixedLayoutSubRenders()}</>`). Callers then
  `React.cloneElement(..., { style })` onto that result — so `style` landed on the
  Fragment, which React ignores (and warns about). The fixed-header cell styles
  therefore never applied (latent visual bug, not just a warning).
- **Fix (done):** return `getFixedLayoutSubRenders(isHidden)` directly (it's already a
  single element — a sort link or span, both of which accept `style`).
- **Verified:** 0 Fragment warnings across the data-table suite; 31 passed / 5 skipped.
- **Remaining skips (in `components/data-table/__tests__/data-table.test.jsx`):** 5 total —
  2 column-resize keyboard tests, 2 keyboard-navigation mode tests (both require Enzyme
  instance/state access unavailable in RTL), and 1 HighlightCell test hitting a
  React-version mismatch in the test env. These are jsdom/RTL limitations, not the
  Fragment bug; re-evaluate during P2 when data-table is converted off the class component.
- **Action:** fix the Fragment prop leak in P2; reassess the 5 skips after conversion.

## ✅ FIXED (P2) — visual-picker `index` prop passed to `React.Fragment`

- **File:** `components/visual-picker/index.tsx`
- **Was:** `React.Children.map` cloned the picker props (`index`, `coverable`, `name`,
  `size`, `vertical`) onto each child. When children were grouped in a `React.Fragment`
  (`<>...</>`), those props landed on the Fragment (warned + ignored) instead of the
  real option elements — so `index`/`name` never reached the wrapped Radios/Checkboxes.
- **Fix (done):** added a `decorateOption` helper that recurses into a Fragment's
  children and clones the props onto the real elements inside it.
- **Verified:** 0 Fragment warnings; 2/2 tests pass.

## ✅ FIXED (P2) — Highlighter / React-version mismatch (tree searchTerm, data-table HighlightCell)

- **Files:** `components/tree/` (`searchTerm` highlight path), `components/data-table/`
  (HighlightCell), both via `react-highlighter-ts`.
- **Was:** rendering the highlight path threw "A React Element from an older version of
  React was rendered." Root cause: `react-highlighter-ts@2.2.0` declares `react@^17` as a
  hard **dependency** (not a peer), so npm installed a nested React 17 under it; its
  `react/jsx-runtime` produced React-17 elements that React 19 rejects. (Confirmed by
  temporarily removing the nested copy → all tests passed.)
- **Fix (done):** added a package.json `overrides` block pinning `react`/`react-dom` to
  `^19.2.0`, so no nested copy is installed. Also added `resolve.dedupe: ['react',
  'react-dom']` to both `vite.config.ts` and `vitest.config.ts` as belt-and-suspenders.
- **Re-enabled tests:** tree "highlights the matching search term with a `<mark>`" (10/10)
  and data-table "marks the appropriate text in a cell" HighlightCell test.
