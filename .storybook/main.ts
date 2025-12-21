import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  // Stories follow ComponentName.stories.jsx/tsx naming convention
  // See: https://storybook.js.org/docs/writing-stories/naming-components-and-hierarchy
  stories: [
    '../components/accordion/__docs__/Accordion.stories.jsx',
    '../components/alert/__docs__/Alert.stories.jsx',
    '../components/app-launcher/__docs__/AppLauncher.stories.jsx',
    '../components/avatar/__docs__/Avatar.stories.jsx',
    '../components/badge/__docs__/Badge.stories.jsx',
    '../components/brand-band/__docs__/BrandBand.stories.jsx',
    '../components/breadcrumb/__docs__/Breadcrumb.stories.jsx',
    '../components/builder-header/__docs__/BuilderHeader.stories.jsx',
    '../components/button/__docs__/Button.stories.jsx',
    '../components/button-group/__docs__/ButtonGroup.stories.jsx',
    '../components/button-stateful/__docs__/ButtonStateful.stories.jsx',
    '../components/card/__docs__/Card.stories.jsx',
    '../components/carousel/__docs__/Carousel.stories.jsx',
    '../components/checkbox/__docs__/Checkbox.stories.jsx',
    '../components/color-picker/__docs__/ColorPicker.stories.tsx',
    '../components/combobox/__docs__/Combobox.stories.tsx',
    '../components/date-picker/__docs__/DatePicker.stories.tsx',
    '../components/docked-composer/__docs__/DockedComposer.stories.jsx',
    '../components/dynamic-icon/__docs__/DynamicIcon.stories.jsx',
    '../components/expandable-section/__docs__/ExpandableSection.stories.jsx',
    '../components/expression/__docs__/Expression.stories.jsx',
    '../components/files/__docs__/Files.stories.jsx',
    '../components/global-header/__docs__/GlobalHeader.stories.jsx',
    '../components/global-navigation-bar/__docs__/GlobalNavigationBar.stories.jsx',
    '../components/input/__docs__/Input.stories.tsx',
    '../components/input/__docs__/Search.stories.tsx',
    '../components/location-map/__docs__/LocationMap.stories.jsx',
    '../components/menu-dropdown/__docs__/MenuDropdown.stories.tsx',
    '../components/modal/__docs__/Modal.stories.jsx',
    '../components/page-header/__docs__/PageHeader.stories.jsx',
    '../components/panel/__docs__/Panel.stories.jsx',
    '../components/pill/__docs__/Pill.stories.jsx',
    '../components/pill-container/__docs__/PillContainer.stories.jsx',
    '../components/popover/__docs__/Popover.stories.jsx',
    '../components/progress-bar/__docs__/ProgressBar.stories.jsx',
    '../components/progress-indicator/__docs__/ProgressIndicator.stories.jsx',
    '../components/progress-ring/__docs__/ProgressRing.stories.jsx',
    '../components/radio/__docs__/Radio.stories.jsx',
    '../components/radio-group/__docs__/RadioGroup.stories.jsx',
    '../components/scoped-notification/__docs__/ScopedNotification.stories.jsx',
    '../components/setup-assistant/__docs__/SetupAssistant.stories.jsx',
    '../components/slider/__docs__/Slider.stories.jsx',
    '../components/spinner/__docs__/Spinner.stories.jsx',
    '../components/split-view/__docs__/SplitView.stories.jsx',
    '../components/tabs/__docs__/Tabs.stories.jsx',
    '../components/textarea/__docs__/Textarea.stories.jsx',
    '../components/time-picker/__docs__/TimePicker.stories.tsx',
    '../components/toast/__docs__/Toast.stories.jsx',
    '../components/tooltip/__docs__/Tooltip.stories.jsx',
    '../components/vertical-navigation/__docs__/VerticalNavigation.stories.jsx',
    '../components/visual-picker/__docs__/VisualPicker.stories.jsx',
  ],

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@vueless/storybook-dark-mode',
  ],

  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  staticDirs: [
    { from: '../node_modules/@salesforce-ux/design-system/assets', to: '/assets' },
    { from: '../assets', to: '/assets' },
  ],

  typescript: {
    check: false, // Disable type checking in Storybook (we do it separately)
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
      propFilter: (prop) => {
        // Filter out props from node_modules
        if (prop.parent) {
          return !prop.parent.fileName.includes('node_modules');
        }
        return true;
      },
    },
  }
};

export default config;
