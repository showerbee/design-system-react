import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  // Include stories for migrated components (CSF format)
  stories: [
    '../components/accordion/__docs__/storybook-stories.jsx',
    '../components/alert/__docs__/storybook-stories.jsx',
    '../components/app-launcher/__docs__/storybook-stories.jsx',
    '../components/avatar/__docs__/storybook-stories.jsx',
    '../components/badge/__docs__/storybook-stories.jsx',
    '../components/brand-band/__docs__/storybook-stories.jsx',
    '../components/breadcrumb/__docs__/storybook-stories.jsx',
    '../components/builder-header/__docs__/storybook-stories.jsx',
    '../components/button/__docs__/storybook-stories.jsx',
    '../components/button-group/__docs__/storybook-stories.jsx',
    '../components/button-stateful/__docs__/storybook-stories.jsx',
    '../components/card/__docs__/storybook-stories.jsx',
    '../components/carousel/__docs__/storybook-stories.jsx',
    '../components/checkbox/__docs__/storybook-stories.jsx',
    '../components/docked-composer/__docs__/storybook-stories.jsx',
    '../components/dynamic-icon/__docs__/storybook-stories.jsx',
    '../components/global-header/__docs__/storybook-stories.jsx',
    '../components/expandable-section/__docs__/storybook-stories.jsx',
    '../components/expression/__docs__/storybook-stories.jsx',
    '../components/files/__docs__/storybook-stories.jsx',
    '../components/global-navigation-bar/__docs__/storybook-stories.jsx',
    '../components/location-map/__docs__/storybook-stories.jsx',
    '../components/page-header/__docs__/storybook-stories.jsx',
    '../components/panel/__docs__/storybook-stories.jsx',
    '../components/pill/__docs__/storybook-stories.jsx',
    '../components/pill-container/__docs__/storybook-stories.jsx',
    '../components/popover/__docs__/storybook-stories.jsx',
    '../components/progress-bar/__docs__/storybook-stories.jsx',
    '../components/progress-indicator/__docs__/storybook-stories.jsx',
    '../components/progress-ring/__docs__/storybook-stories.jsx',
    '../components/radio/__docs__/storybook-stories.jsx',
    '../components/radio-group/__docs__/storybook-stories.jsx',
    '../components/scoped-notification/__docs__/storybook-stories.jsx',
    '../components/setup-assistant/__docs__/storybook-stories.jsx',
    '../components/slider/__docs__/storybook-stories.jsx',
    '../components/spinner/__docs__/storybook-stories.jsx',
    '../components/split-view/__docs__/storybook-stories.jsx',
    '../components/tabs/__docs__/storybook-stories.jsx',
    '../components/textarea/__docs__/storybook-stories.jsx',
    '../components/toast/__docs__/storybook-stories.jsx',
    '../components/vertical-navigation/__docs__/storybook-stories.jsx',
    '../components/visual-picker/__docs__/storybook-stories.jsx',
    // Add more components as they are migrated to CSF format
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

