# SLDS2 (SLDS+) Analysis & Alignment Review

> **Purpose**: This document captures insights from reviewing the official SLDS2 source of truth to identify discrepancies, patterns, and opportunities for alignment in our design-system-react modernization.
>
> **Reference Paths**:
> - Storybook: `/Users/shubick/salesforce-design-system/packages/sds-subsystems/.storybook`
> - Components: `/Users/shubick/salesforce-design-system/packages/sds-subsystems/src/slds+`

---

## Key Discrepancies & Considerations

### 1. Architecture Differences

| SLDS2 (Source of Truth) | design-system-react |
|-------------------------|---------------------|
| **Web Components** (LWC/lit-html) | **React Components** |
| CSS-first with styling hooks | JS-first with inline styles in many places |
| Blueprint templates (`.html` files) | JSX templates embedded in components |
| Separate `.css` files per component | Mixed CSS/SCSS with utility classes |

**Implication**: The SLDS2 approach is framework-agnostic CSS-first. Our React library should consume these same CSS classes/hooks rather than reimplementing styles.

---

### 2. Multi-Theme Architecture (Critical Gap)

SLDS2 has a sophisticated theming system we're currently missing:

```javascript
// themes.js - Two official themes
export default {
  slds: {   // "Lightning Blue" - legacy look
    import: [
      'slds/slds.hooks.custom-props.css',
      'slds/slds.shared.hooks.custom-props.css',
      'slds/slds.component.hooks.custom-props.css',
    ]
  },
  cosmos: { // "Cosmos" - SLDS2 modern look  
    import: [
      'cosmos/cosmos.hooks.custom-props.css',
      'cosmos/cosmos.shared.hooks.custom-props.css',
      'cosmos/cosmos.component.hooks.custom-props.css',
    ]
  },
};
```

**Plus color scheme modes**: `light`, `dark`, `system`

```javascript
// Storybook toolbar options
scheme: {
  items: [
    { value: 'light', icon: 'circlehollow', title: 'Light' },
    { value: 'dark', icon: 'circle', title: 'Dark' },
    { value: 'system', icon: 'contrast', title: 'System' },
  ],
}
```

**Recommendations**:
- Add a `ThemeProvider` that can switch between `slds` (legacy) and `cosmos` (SLDS2) themes
- Support `slds-color-scheme--dark`, `slds-color-scheme--light`, `slds-color-scheme--system` classes
- This aligns with our MODERNIZATION_PLAN.md theming goals

---

### 3. CSS Custom Properties (Styling Hooks)

SLDS2 heavily uses CSS custom properties for customization. Example from `modal.css`:

```css
.slds-modal .slds-modal__title {
  font-weight: var(--slds-c-modal-heading-font-weight, var(--slds-s-container-heading-font-weight));
  font-size: var(
    --slds-c-modal-heading-font-size,
    var(--slds-s-container-heading-font-size, var(--slds-g-font-scale-2))
  );
  line-height: var(--slds-g-font-lineheight-2);
}
```

**Naming Convention**:
| Prefix | Meaning | Example |
|--------|---------|---------|
| `--slds-g-*` | Global tokens | `--slds-g-font-scale-2` |
| `--slds-s-*` | Shared/semantic tokens | `--slds-s-container-heading-font-size` |
| `--slds-c-*` | Component-specific hooks | `--slds-c-modal-heading-font-size` |

**Recommendations**:
- Document which styling hooks each component supports
- Consider adding a `metadata.json` pattern like SLDS2 does
- Prefer CSS custom properties over JavaScript-computed styles

---

### 4. Component Metadata Pattern

SLDS2 includes `*.metadata.json` files tracking component information:

```json
{
  "name": "Button",
  "description": "Buttons are clickable items used to perform an action.",
  "css": {
    "root": "slds-button",
    "hooks": [],
    "deprecated": {
      "hooks": {
        "--slds-c-button-destructive-color-background-active": null,
        "--slds-c-button-line-height": null
      },
      "selectors": []
    }
  }
}
```

**Benefits**:
- Track CSS root class
- Document available styling hooks
- Track deprecated hooks with migration paths
- Provide structured component descriptions

---

### 5. Component Structure Comparison

**SLDS2 Component Structure**:
```
button/
├── __specs__/
│   └── button.mdx           # Design specifications
├── __stories__/
│   ├── button.stories.js    # Storybook stories
│   └── button-lbc.stories.js # Lightning Base Component stories
├── __templates__/
│   └── button.html          # HTML blueprint template
├── button.css               # Component styles
├── button.deprecated.css    # Deprecated styles (kept for backwards compat)
├── button.js                # LWC component implementation
└── button.metadata.json     # Component metadata
```

**Our Current Structure**:
```
button/
├── __docs__/
│   └── storybook-stories.jsx
├── __examples__/
│   └── *.jsx
├── __tests__/
│   └── button.browser-test.jsx
├── check-props.js
├── component.json
└── index.tsx
```

**Differences**:
- We don't have separate `__specs__` MDX documentation
- We don't have HTML blueprint templates
- We don't track deprecated CSS patterns systematically
- Our `component.json` differs from their `metadata.json` schema

---

### 6. Components in SLDS2 We Don't Have

| Category | Components |
|----------|------------|
| **New/AI** | `agentforce` |
| **Timeline** | `activityTimeline` |
| **Grouping** | `avatarGroup` |
| **Communication** | `chat`, `publisher` |
| **Inputs** | `checkboxButton`, `checkboxButtonGroup`, `checkboxToggle`, `counter` |
| **File Handling** | `dropZone`, `fileSelector` |
| **Selection** | `duelingPicklist` |
| **Navigation** | `dynamicMenu`, `path`, `pathSimple` |
| **Feedback** | `prompt` |
| **Text** | `richTextEditor` |
| **Layout** | `summaryDetail`, `tile` |
| **Data** | `treeGrid` |
| **Workflow** | `wizard` |

---

### 7. Storybook Configuration Patterns

**Addons We Should Consider**:
```javascript
addons: [
  '@storybook/addon-links',
  '@storybook/addon-a11y',
  '@storybook/addon-docs',
  'storybook-addon-rtl',  // RTL support - we don't have this
],
```

**Chromatic Visual Regression Testing**:
```javascript
parameters: {
  chromatic: {
    modes: {
      slds: allModes.slds,
      cosmos: allModes.cosmos,
      dark: allModes.dark,
    },
  },
}
```

**Background Colors Using CSS Variables**:
```javascript
backgrounds: {
  default: 'surface-1',
  values: [
    { name: 'surface-1', value: 'var(--slds-g-color-surface-1)' },
    { name: 'surface-2', value: 'var(--slds-g-color-surface-2)' },
  ],
},
```

---

### 8. Utility CSS Structure

SLDS2 `/utilities` folder organization:

```
utilities/
├── alignment.css
├── borders.css
├── box.css
├── color.css
├── darkMode.css          # Dedicated dark mode utilities!
├── descriptionList.css
├── floats.css
├── grid.css
├── horizontalList.css
├── hyphenation.css
├── interactions.css
├── layout.css
├── lineClamp.css
├── margin.css
├── mediaObject.css
├── nameValueList.css
├── padding.css
├── position.css
├── print.css
├── reset.css
├── scrolling.css
├── sizing.css
├── text.css
├── truncate.css
├── utilities.deprecated.css
├── verticalList.css
└── visibility.css
```

**Note**: They have `utilities.deprecated.css` to track deprecated utility classes.

---

## Recommendations Summary

### High Priority

1. **Theme Provider**: Create a `ThemeProvider` component supporting:
   - `slds` (Lightning Blue) theme
   - `cosmos` (SLDS2) theme
   - Color scheme modes: `light`, `dark`, `system`

2. **Styling Hooks Documentation**: Document CSS custom property hooks for each component.

3. **RTL Testing**: Add `storybook-addon-rtl` for bidirectional layout testing.

### Medium Priority

4. **Metadata Schema**: Consider adopting the `*.metadata.json` pattern for:
   - Tracking supported styling hooks
   - Documenting deprecations with migration paths
   - Structured component descriptions

5. **CSS Variables over Inline Styles**: Refactor components to prefer SLDS utility classes and CSS custom properties over JavaScript-computed styles.

6. **Visual Regression Testing**: Consider Chromatic integration with theme/mode snapshots.

### Low Priority (Future)

7. **Component Gap Analysis**: Evaluate adding:
   - `agentforce` (AI components)
   - `prompt` (dialog prompts)
   - `wizard` (multi-step workflows)
   - `checkboxToggle` (toggle switches)

8. **Deprecation Tracking**: Add deprecation CSS files and metadata tracking.

---

## Theme Implementation Reference

From SLDS2 Storybook decorator:

```javascript
decorators: [
  (story, context) => {
    const selectedScheme = context.globals.scheme || 'light';

    // Update body class for color scheme
    if (selectedScheme === 'dark') {
      document.body.classList.remove('slds-color-scheme--light', 'slds-color-scheme--system');
      document.body.classList.add('slds-color-scheme--dark');
    } else if (selectedScheme === 'light') {
      document.body.classList.remove('slds-color-scheme--dark', 'slds-color-scheme--system');
      document.body.classList.add('slds-color-scheme--light');
    } else if (selectedScheme === 'system') {
      document.body.classList.remove('slds-color-scheme--dark', 'slds-color-scheme--light');
      document.body.classList.add('slds-color-scheme--system');
    }

    // Load theme-specific CSS hooks
    const selectedTheme = context.globals.theme || 'cosmos';
    const theme = MyThemes[selectedTheme];

    return html`
      <style>
        ${theme.import.map((path) => `@import "${path}";`).join('\n')}
      </style>
      ${story()}
    `;
  },
],
```

---

## References

- [SLDS2 Components](https://www.lightningdesignsystem.com/components/)
- [SLDS Styling Hooks](https://www.lightningdesignsystem.com/platforms/lightning/styling-hooks/)
- [Design Tokens](https://www.lightningdesignsystem.com/design-tokens/)

---

*Last Updated: December 2024*
*Analysis performed during design-system-react modernization*

