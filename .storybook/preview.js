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
    // TODO: Re-add dark mode support when storybook-dark-mode is compatible with Storybook 10
    // or implement using Storybook 10's built-in theming
  },
  tags: ['autodocs'],
};

export default preview;
