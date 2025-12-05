import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  // Include stories for migrated components (CSF format)
  stories: [
    '../components/badge/__docs__/storybook-stories.jsx',
    '../components/button/__docs__/storybook-stories.jsx',
    '../components/card/__docs__/storybook-stories.jsx',
    '../components/checkbox/__docs__/storybook-stories.jsx',
    '../components/spinner/__docs__/storybook-stories.jsx',
    '../components/textarea/__docs__/storybook-stories.jsx',
    // Add more components as they are migrated to CSF format
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    'storybook-dark-mode',
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
  },
  docs: {
    autodocs: 'tag',
  },
};

export default config;

