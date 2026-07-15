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
      // Emit declarations for the real published surface: the components barrel
      // and its sidecar .d.ts / .tsx types, the utilities, and the shared types
      // folder. Restricted to TS/TSX/d.ts so the 600+ untyped .jsx files are not
      // churned (they contribute no types yet — see the modernization roadmap).
      entryRoot: '.',
      outDir: 'dist/types',
      // Copy hand-written .d.ts (e.g. the components/index.d.ts barrel and the
      // sidecar component declarations) into the output — the plugin only
      // *generates* from .ts/.tsx and would otherwise drop these.
      copyDtsFiles: true,
      include: [
        'components/**/*.ts',
        'components/**/*.tsx',
        'components/**/*.d.ts',
        'utilities/**/*.ts',
        'utilities/**/*.d.ts',
        'types/**/*.ts',
      ],
      exclude: [
        '**/*.test.*',
        '**/*.spec.*',
        '**/*.browser-test.*',
        '**/__tests__/**',
        '**/__examples__/**',
        '**/__docs__/**',
      ],
    }),
  ],
  resolve: {
    // Force a single copy of React/ReactDOM. `react-highlighter-ts` declares
    // `react@^17` as a hard dependency (not a peer); a package.json `overrides`
    // entry pins it to the root React 19 so no nested copy is installed, and
    // deduping keeps a single React instance regardless.
    dedupe: ['react', 'react-dom'],
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

