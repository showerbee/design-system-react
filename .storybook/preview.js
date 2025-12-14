// Tell React 19 this is not a testing environment
// This prevents false warnings about act() from state updates in Storybook
globalThis.IS_REACT_ACT_ENVIRONMENT = false;

// Configure Modal to use #storybook-root for accessibility
// This silences the "App element is not defined" warning
import Settings from '../components/settings';

// Set after DOM is ready
if (typeof document !== 'undefined') {
  // Use requestAnimationFrame to ensure #storybook-root exists
  requestAnimationFrame(() => {
    const root = document.getElementById('storybook-root') || document.body;
    Settings.setAppElement(root);
  });
}

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
