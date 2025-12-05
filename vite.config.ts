import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      outDir: 'dist/types',
      include: ['types/**/*.ts'],
      exclude: ['**/*.test.*', '**/*.spec.*', '**/__tests__/**', '**/__examples__/**', '**/__docs__/**'],
    }),
  ],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './'),
      '@components': path.resolve(__dirname, './components'),
      '@utilities': path.resolve(__dirname, './utilities'),
      '@types': path.resolve(__dirname, './types'),
    },
  },
  // Optimize dependencies for dev server (Storybook)
  optimizeDeps: {
    include: ['design-system-react'],
    esbuildOptions: {
      // Handle CommonJS modules in dev
      loader: {
        '.js': 'jsx',
      },
    },
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/, /design-tokens/],
      transformMixedEsModules: true,
      // Named exports for design tokens
      namedExports: {
        './utilities/design-tokens/dist/palette-colors.common.js': [
          'colorGray1', 'colorGray2', 'colorGray3', 'colorGray4', 'colorGray5',
          'colorGray6', 'colorGray7', 'colorGray8', 'colorGray9', 'colorGray10',
          'colorGray11', 'colorGray12', 'brandPrimary', 'brandAccessible',
        ],
        './utilities/design-tokens/dist/salesforce-skin.common.js': [
          'tableBorderRadius',
        ],
      },
    },
    lib: {
      entry: path.resolve(__dirname, 'components/index.js'),
      name: 'DesignSystemReact',
      fileName: (format) => `design-system-react.${format}.js`,
    },
    rollupOptions: {
      // Externalize peer dependencies
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime',
        },
      },
    },
    sourcemap: true,
  },
});

