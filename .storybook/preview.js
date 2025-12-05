/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    // Accessibility addon configuration
    a11y: {
      element: '#storybook-root',
      options: {},
    },
    // Controls addon configuration
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // Documentation configuration
    docs: {
      toc: true,
    },
    // Dark mode addon configuration
    darkMode: {
      // Set class names for SLDS color schemes
      classTarget: 'body',
      darkClass: 'slds-color-scheme--dark',
      lightClass: 'slds-color-scheme--light',
      // Style the Storybook UI to match
      stylePreview: true,
    },
  },
  tags: ['autodocs'],
};

export default preview;
