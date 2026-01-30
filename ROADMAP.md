# Modernization Roadmap

> **Status: Work in Progress**
> 
> This library is undergoing a major modernization effort to support React 19, SLDS 2, and modern tooling. Most components are ready for use, but some features are still being completed.

## What's Ready

### Core Infrastructure ✅

- **React 19** — All components updated to work with React 19
- **TypeScript** — 63 components converted with full type definitions
- **Vite** — Modern build system replacing Webpack
- **Vitest** — Modern test framework replacing Karma/Mocha
- **Storybook 10** — Updated documentation with CSF stories

### Component Status

| Category | Status |
|----------|--------|
| Core (Button, Input, Checkbox, etc.) | ✅ 100% |
| Navigation (GlobalHeader, Tabs, Menu, etc.) | ✅ 100% |
| Overlay (Modal, Popover, DatePicker, etc.) | ✅ 100% |
| Specialized (Avatar, Card, Carousel, etc.) | ✅ 100% |
| Layout (Accordion, Panel, Modal, etc.) | 88% |
| Data (DataTable, Tree, Combobox, etc.) | 83% |
| Feedback (Alert, Toast, Progress, etc.) | 86% |

### Features

- **Dark Mode** — Storybook dark mode toggle, SLDS dark theme support
- **Accessibility** — WCAG 2.1 AA compliant, keyboard navigation, screen reader tested
- **Tree Shaking** — Individual component imports for smaller bundles

---

## What's In Progress

### Components

- **Lookup** — Deprecated, will be removed (use Combobox instead)
- **Notification** — Deprecated, will be removed (use Toast or Alert instead)
- **AccordionPanel** — Internal component, TypeScript migration pending

### Infrastructure

- [ ] GitHub Actions CI/CD (replacing CircleCI)
- [ ] Automated npm publishing
- [ ] Visual regression testing

### Documentation

- [ ] Migration guide from v0.x
- [ ] MDX documentation pages in Storybook
- [ ] TypeDoc API documentation

### Theming

- [ ] ThemeProvider component for runtime theme switching
- [ ] SLDS version toggle (SLDS 1 vs SLDS 2)
- [ ] localStorage theme persistence

---

## Known Limitations

1. **Node.js Requirement** — Requires Node.js >= 20.19.0 (or >= 22.12.0)
2. **React 19 Only** — No backward compatibility with React 16/17/18
3. **Popper.js v1** — Tooltip and Popover still use Popper.js v1 (migration to @floating-ui planned)

---

## How to Help

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

**Good first issues:**
- Add missing TypeScript types
- Write Vitest tests for components
- Improve Storybook documentation
- Report accessibility issues

---

## Timeline

This is a community-driven project without fixed deadlines. Progress depends on contributor availability.

For detailed technical planning, see the internal `.planning/` folder (not included in published package).
