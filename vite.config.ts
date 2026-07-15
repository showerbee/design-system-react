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
  // Optimize dependencies for dev server (Storybook).
  // NOTE: do NOT self-include 'design-system-react' here — stories import
  // components via relative paths, and pre-bundling the package by its own
  // name forces Vite to resolve the (unbuilt) dist/ entry and crashes startup.
  optimizeDeps: {
    esbuildOptions: {
      // Handle JSX authored in .js files (legacy source) during dev
      loader: {
        '.js': 'jsx',
      },
    },
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/, /design-tokens/],
      transformMixedEsModules: true,
    },
    lib: {
      entry: path.resolve(__dirname, 'components/index.js'),
      name: 'DesignSystemReact',
      // Emit ESM as .es.js and CommonJS as .cjs. Under "type": "module" a
      // plain .js is treated as ESM, so the CJS build MUST use the .cjs
      // extension or `require('design-system-react')` throws ERR_REQUIRE_ESM.
      formats: ['es', 'cjs'],
      fileName: (format) =>
        format === 'cjs'
          ? 'design-system-react.cjs'
          : `design-system-react.${format}.js`,
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

