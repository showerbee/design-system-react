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
- [x] **Upgraded to Storybook 10.1.4** ✅
- [x] Migrate stories from `storiesOf` to CSF format
- [x] Configure Storybook addons (a11y, controls, actions, docs)
- [x] Re-add dark mode toggle (@vueless/storybook-dark-mode for v10) ✅
- [ ] Add Storybook visual regression testing
- [ ] Migrate remaining component stories to CSF format (in progress)

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

- [x] **Button** - TypeScript + CSF stories ✅
- [x] **Icon** - TypeScript ✅
- [x] **IconSettings** - TypeScript ✅
- [ ] **Input** - Complex, has sub-components
- [x] **Checkbox** - TypeScript + CSF stories ✅
- [x] **Radio** - TypeScript + CSF stories ✅
- [x] **RadioGroup** - TypeScript + CSF stories ✅
- [x] **RadioButtonGroup** - TypeScript ✅
- [x] **Textarea** - TypeScript + CSF stories ✅
- [x] **Spinner** - TypeScript + CSF stories ✅

#### Layout Components (Priority 2)

- [x] **Card** - TypeScript + CSF stories ✅
- [x] **MediaObject** - TypeScript ✅
- [ ] **Modal** - Complex, has sub-components
- [x] **Panel** - TypeScript ✅
- [x] **Accordion** - TypeScript + CSF stories ✅
- [ ] **AccordionPanel** - (internal, uses JSX)
- [x] **Tabs** - TypeScript + CSF stories ✅
- [x] **ExpandableSection** - TypeScript + CSF stories ✅

#### Navigation Components (Priority 3)

- [x] **GlobalHeader** - TypeScript + CSF stories ✅
- [x] **GlobalNavigationBar** - TypeScript + CSF stories ✅
- [x] **VerticalNavigation** - TypeScript + CSF stories ✅
- [x] **Breadcrumb** - TypeScript + CSF stories ✅
- [ ] **MenuDropdown**
- [ ] **MenuPicklist**

#### Data Components (Priority 4)

- [ ] **DataTable**
- [ ] **Tree**
- [ ] **Combobox**
- [ ] **Lookup** (deprecated - consider removal)
- [x] **Pill** - TypeScript + CSF stories ✅
- [x] **PillContainer** - TypeScript + CSF stories ✅

#### Feedback Components (Priority 5)

- [x] **Alert** - TypeScript + CSF stories ✅
- [x] **ProgressBar** - TypeScript + CSF stories ✅
- [x] **Toast** - TypeScript + CSF stories ✅
- [ ] **Notification** (deprecated)
- [x] **ScopedNotification** - TypeScript + CSF stories ✅
- [x] **ProgressIndicator** - TypeScript + CSF stories ✅
- [x] **ProgressRing** - TypeScript + CSF stories ✅

#### Overlay Components (Priority 6)

- [x] **Popover** - TypeScript + CSF stories ✅ (Note: Uses Popper.js v1 - future: @floating-ui/react)
- [ ] **Tooltip**
- [ ] **DatePicker**
- [ ] **TimePicker**
- [ ] **ColorPicker**
- [ ] **Filter**

#### Specialized Components (Priority 7)

- [x] **AppLauncher** - TypeScript + CSF stories ✅
- [x] **Avatar** - TypeScript + CSF stories ✅
- [x] **Badge** - TypeScript + CSF stories ✅
- [x] **BrandBand** - TypeScript + CSF stories ✅
- [x] **BuilderHeader** - TypeScript + CSF stories ✅
- [x] **ButtonGroup** - TypeScript + CSF stories ✅
- [x] **ButtonStateful** - TypeScript + CSF stories ✅
- [x] **Carousel** - TypeScript + CSF stories ✅
- [x] **DockedComposer** - TypeScript + CSF stories ✅
- [x] **DynamicIcon** - TypeScript + CSF stories ✅
- [x] **Expression** - TypeScript + CSF stories ✅
- [x] **Files** - TypeScript + CSF stories ✅
- [x] **Illustration** - TypeScript ✅
- [x] **LocationMap** - TypeScript + CSF stories ✅
- [x] **PageHeader** - TypeScript + CSF stories ✅
- [x] **PortalSettings** - TypeScript ✅
- [x] **SetupAssistant** - TypeScript + CSF stories ✅
- [x] **Slider** - TypeScript + CSF stories ✅
- [x] **SplitView** - TypeScript + CSF stories ✅
- [x] **TrialBar** - TypeScript ✅
- [x] **VisualPicker** - TypeScript + CSF stories ✅
- [x] **WelcomeMat** - TypeScript ✅

#### Utilities

- [x] **UtilityIcon** - TypeScript ✅
- [ ] **Dialog** (internal utility)
- [x] Convert design-tokens to ES modules ✅
- [ ] Review and update remaining `/utilities` helpers

---

## 4. Theming & Styling

### Multi-Theme Architecture

- [ ] Design theme context architecture
- [ ] Create `ThemeProvider` component
- [ ] Implement CSS custom properties (CSS variables) integration
- [ ] Support runtime theme switching

### Dark Mode Support ✅ PARTIAL

- [x] Re-add Storybook dark mode toggle (@vueless/storybook-dark-mode for v10) ✅
- [x] Configure SLDS color scheme classes (slds-color-scheme--dark/light)
- [x] Add dark mode CSS for Storybook Docs pages
- [ ] Implement dark mode theme tokens (SLDS Plus tokens in use)
- [ ] Create `DarkModeToggle` component for apps
- [ ] Add `prefers-color-scheme` media query support
- [ ] Persist theme preference (localStorage)

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

1. ~~**Create `modernization` branch** from main~~ (working on master for now)
2. ~~**Migrate Icon and IconSettings**~~ ✅ DONE
3. **Migrate Input component** (complex, has sub-components)
4. **Migrate Radio/RadioGroup** (complete form input set)
5. **Migrate Modal** (commonly used overlay)
6. **Set up CI pipeline** for automated testing
7. **Begin theming architecture** design

---

## Progress Summary

| Category | Completed | Total | Progress |
|----------|-----------|-------|----------|
| Core Components | 10 | 10 | **100%** ✅ |
| Layout Components | 7 | 8 | **88%** |
| Navigation Components | 4 | 6 | **67%** |
| Data Components | 2 | 6 | 33% |
| Feedback Components | 6 | 7 | **86%** |
| Overlay Components | 0 | 6 | 0% |
| Specialized Components | 20 | 22 | **91%** |

**Total Components Migrated: 54** (with TypeScript)

---

## Notes

- Design tokens converted to ES modules for Vite compatibility
- Using SLDS Plus CSS for dark mode support
- Some components have type declaration files (.d.ts) as placeholders until full migration

## References
Storybook reference: (this is our single source of truth for SLDS components and stories, for reference purposes)
/Users/shubick/salesforce-design-system/packages/sds-subsystems/.storybook

SLDS 2 (aka SLDS+) is the single source of truth for components and /utilities, again for reference:
/Users/shubick/salesforce-design-system/packages/sds-subsystems/src/slds+
---

*Last Updated: December 5, 2024*

