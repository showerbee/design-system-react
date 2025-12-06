// Tell React 19 this is not a testing environment
// This prevents false warnings about act() from state updates in Storybook
globalThis.IS_REACT_ACT_ENVIRONMENT = false;

/** @type { import('@storybook/react-vite').Preview } */
const preview = {
  parameters: {
    // Accessibility addon configuration
    a11y: {
      context: '#storybook-root',
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
    // Dark mode addon configuration (@vueless/storybook-dark-mode for Storybook 10)
    darkMode: {
      // Set class names for SLDS color schemes
      classTarget: 'body',
      darkClass: 'slds-color-scheme--dark',
      lightClass: 'slds-color-scheme--light',
      // Style the Storybook UI to match
      stylePreview: true,
      // Default to light mode
      current: 'light',
    },
  },
  tags: ['autodocs'],
};

export default preview;
