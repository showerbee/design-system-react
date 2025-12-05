# Design System React - Modernization Plan

This document outlines the complete plan to modernize `design-system-react` to React 19, update the tooling, and add advanced theming capabilities.

---

## Table of Contents

1. [Git & Versioning Strategy](#1-git--versioning-strategy)
2. [Infrastructure Modernization](#2-infrastructure-modernization)
3. [Component Migration](#3-component-migration)
4. [Theming & Styling](#4-theming--styling)
5. [Testing Strategy](#5-testing-strategy)
6. [Documentation](#6-documentation)
7. [CI/CD & Release](#7-cicd--release)

---

## 1. Git & Versioning Strategy

### Branch Strategy

- [ ] Create `modernization` branch from `main` for all React 19 work
- [ ] Keep `main` stable with current React 17/18 version for existing consumers
- [ ] Use feature branches off `modernization` for large component migrations
- [ ] Consider `legacy/v0.x` branch to preserve pre-modernization state

### Versioning

- [ ] Decide on version bump strategy:
  - **Option A**: Major version bump (v1.0.0) for React 19 breaking changes
  - **Option B**: Minor version with React 19 peer dependency range
- [ ] Update `package.json` version field
- [ ] Create CHANGELOG.md entries for all breaking changes
- [ ] Tag releases appropriately (`v1.0.0-beta.1`, `v1.0.0-rc.1`, etc.)

### Migration Path for Consumers

- [ ] Document upgrade guide for existing users
- [ ] Provide codemods if needed for breaking API changes
- [ ] Consider dual-publishing (CommonJS + ESM) during transition

---

## 2. Infrastructure Modernization

### Build System (Vite) ✅ DONE

- [x] Replace Webpack with Vite
- [x] Create `vite.config.js` for library builds
- [x] Configure Rollup external dependencies (react, react-dom, prop-types)
- [x] Handle CommonJS design tokens with `transformMixedEsModules`

### Testing (Vitest) ✅ DONE

- [x] Replace Karma/Mocha/Chai with Vitest
- [x] Replace Enzyme with React Testing Library
- [x] Create `vitest.config.js` and `vitest.setup.js`
- [ ] Migrate all component tests (see Component Migration section)
- [ ] Set up coverage thresholds

### Storybook ✅ DONE

- [x] Upgrade to Storybook 8 with Vite builder
- [x] Migrate stories from `storiesOf` to CSF format (Button done)
- [ ] Migrate remaining component stories to CSF format
- [ ] Configure Storybook addons (a11y, controls, actions)
- [ ] Add Storybook visual regression testing

### TypeScript ✅ DONE

- [x] Create `tsconfig.json` with strict mode
- [x] Create `tsconfig.node.json` for config files
- [x] Add TypeScript dependencies (@types/*, typescript, vite-plugin-dts)
- [x] Create type definitions in `types/` directory:
  - `common.ts` - Shared types (AssistiveText, IconCategory, ComponentCallbacks, etc.)
  - `components.ts` - Component props (ButtonProps, IconProps, InputProps, etc.)
  - `theme.ts` - Theme types (SLDSVersion, ColorMode, ThemeConfig, etc.)
- [x] Configure path aliases (@components, @utilities, @types)
- [x] Set up react-docgen-typescript for Storybook

### Linting & Formatting ✅ DONE

- [x] Configure ESLint with TypeScript parser
- [x] Add TypeScript ESLint rules
- [x] Configure Prettier for consistent formatting
- [x] Set up lint-staged configuration
- [ ] Add Husky pre-commit hooks (requires git write access)

### Dependencies Cleanup

- [ ] Remove all Webpack-related packages
- [ ] Remove Karma, Mocha, Chai, Enzyme packages
- [ ] Remove `create-react-class` (convert all components to modern syntax)
- [ ] Audit and update remaining dependencies
- [ ] Remove unused dependencies

---

## 3. Component Migration

### Migration Pattern (per component)

For each component:
1. Rename `.jsx` → `.tsx` (or create new `.tsx` alongside during transition)
2. Convert Class Component → Functional Component with Hooks
3. Replace lifecycle methods with `useEffect`
4. Replace `this.state` with `useState`
5. Use `forwardRef` for ref handling
6. Add TypeScript props interface (extend from `types/components.ts`)
7. Migrate tests to Vitest + React Testing Library
8. Migrate stories to CSF format with TypeScript

### Component Migration Checklist

#### Core Components (Priority 1)

- [x] **Button** - COMPLETE (pilot component)
- [ ] **Icon**
- [ ] **IconSettings**
- [ ] **Input**
- [ ] **Checkbox**
- [ ] **Radio**
- [ ] **RadioGroup**
- [ ] **RadioButtonGroup**
- [ ] **Textarea**
- [ ] **Spinner**

#### Layout Components (Priority 2)

- [ ] **Card**
- [ ] **Modal**
- [ ] **Panel**
- [ ] **Accordion**
- [ ] **AccordionPanel**
- [ ] **Tabs**
- [ ] **ExpandableSection**
- [ ] **MediaObject**

#### Navigation Components (Priority 3)

- [ ] **GlobalHeader**
- [ ] **GlobalNavigationBar**
- [ ] **VerticalNavigation**
- [ ] **Breadcrumb**
- [ ] **MenuDropdown**
- [ ] **MenuPicklist**

#### Data Components (Priority 4)

- [ ] **DataTable**
- [ ] **Tree**
- [ ] **Combobox**
- [ ] **Lookup** (deprecated - consider removal)
- [ ] **Pill**
- [ ] **PillContainer**

#### Feedback Components (Priority 5)

- [ ] **Alert**
- [ ] **Toast**
- [ ] **Notification** (deprecated)
- [ ] **ScopedNotification**
- [ ] **ProgressBar**
- [ ] **ProgressIndicator**
- [ ] **ProgressRing**

#### Overlay Components (Priority 6)

- [ ] **Popover**
- [ ] **Tooltip**
- [ ] **DatePicker**
- [ ] **TimePicker**
- [ ] **ColorPicker**
- [ ] **Filter**

#### Specialized Components (Priority 7)

- [ ] **AppLauncher**
- [ ] **Avatar**
- [ ] **Badge**
- [ ] **BrandBand**
- [ ] **BuilderHeader**
- [ ] **ButtonGroup**
- [ ] **ButtonStateful**
- [ ] **Carousel**
- [ ] **DockedComposer**
- [ ] **DynamicIcon**
- [ ] **Expression**
- [ ] **Files**
- [ ] **Illustration**
- [ ] **LocationMap**
- [ ] **PageHeader**
- [ ] **PortalSettings**
- [ ] **SetupAssistant**
- [ ] **Slider**
- [ ] **SplitView**
- [ ] **TrialBar**
- [ ] **VisualPicker**
- [ ] **WelcomeMat**

#### Utilities

- [ ] **Dialog** (internal utility)
- [ ] Review and update all `/utilities` helpers

---

## 4. Theming & Styling

### Multi-Theme Architecture

- [ ] Design theme context architecture
- [ ] Create `ThemeProvider` component
- [ ] Implement CSS custom properties (CSS variables) integration
- [ ] Support runtime theme switching

### Dark Mode Support

- [ ] Implement dark mode theme tokens
- [ ] Create `DarkModeToggle` component
- [ ] Add `prefers-color-scheme` media query support
- [ ] Persist theme preference (localStorage)
- [ ] Add Storybook toolbar toggle for dark mode

### SLDS 1 vs SLDS 2 Support

> **Note**: This section requires private features from other repos. Details TBD.

- [ ] Research SLDS2 token differences
- [ ] Create abstraction layer for SLDS version switching
- [ ] Implement SLDS version detection/configuration
- [ ] Document SLDS version compatibility matrix
- [ ] Add Storybook toolbar toggle for SLDS version

### Styling Hooks Integration

- [ ] Audit current inline styles and convert to CSS custom properties
- [ ] Create styling hooks mapping for component customization
- [ ] Document available styling hooks per component
- [ ] Add examples for common customization patterns

---

## 5. Testing Strategy

### Unit Tests

- [ ] Achieve 80%+ code coverage target
- [ ] Test all component props and variants
- [ ] Test accessibility (ARIA attributes, keyboard navigation)
- [ ] Test ref forwarding
- [ ] Test controlled vs uncontrolled patterns

### Integration Tests

- [ ] Test component composition patterns
- [ ] Test context providers (IconSettings, Theme)
- [ ] Test form submission workflows

### Visual Regression Tests

- [ ] Set up Chromatic or Percy integration
- [ ] Create visual snapshots for all stories
- [ ] Configure acceptable diff thresholds
- [ ] Add visual tests to CI pipeline

### Accessibility Tests

- [ ] Integrate axe-core with Vitest
- [ ] Add a11y checks to Storybook
- [ ] Test keyboard navigation flows
- [ ] Test screen reader announcements

---

## 6. Documentation

### Storybook Documentation

- [ ] Add MDX documentation pages for each component
- [ ] Document all props with descriptions and examples
- [ ] Add usage guidelines and best practices
- [ ] Create "Getting Started" guide
- [ ] Add migration guide from v0.x

### API Documentation

- [ ] Generate TypeScript types (or improve PropTypes)
- [ ] Consider TypeDoc or similar for API docs
- [ ] Document breaking changes clearly

### Examples

- [ ] Create example applications showing integration
- [ ] Add copy-paste code snippets in stories
- [ ] Document common patterns and recipes

---

## 7. CI/CD & Release

### Continuous Integration

- [ ] Set up GitHub Actions workflow
- [ ] Run tests on PR
- [ ] Run linting on PR
- [ ] Build Storybook on PR
- [ ] Deploy Storybook preview for PRs

### Release Process

- [ ] Set up semantic versioning with conventional commits
- [ ] Configure semantic-release or changesets
- [ ] Automate npm publishing
- [ ] Generate changelogs automatically
- [ ] Create GitHub releases with notes

### Quality Gates

- [ ] Require passing tests for merge
- [ ] Require linting pass for merge
- [ ] Consider bundle size checks
- [ ] Consider visual regression approval

---

## Immediate Next Steps

1. **Create `modernization` branch** from main
2. **Migrate Icon and IconSettings** (required by most components)
3. **Migrate Input components** (frequently used forms foundation)
4. **Set up CI pipeline** for automated testing
5. **Begin theming architecture** design

---

## Notes

- Add any private/internal requirements here
- Track blockers and dependencies
- Update estimates as work progresses

---

*Last Updated: December 4, 2024*

