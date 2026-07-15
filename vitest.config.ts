import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
    include: ['components/**/__tests__/*.{test,spec}.{ts,tsx,js,jsx}'],
    exclude: ['**/node_modules/**', '**/dist/**'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'dist/',
        '**/__docs__/**',
        '**/__examples__/**',
        '**/*.d.ts',
        'vite.config.ts',
        'vitest.config.ts',
        'vitest.setup.ts',
      ],
    },
  },
  resolve: {
    // Force a single copy of React/ReactDOM. `react-highlighter-ts` declares
    // `react@^17` as a hard dependency (not a peer). A package.json `overrides`
    // entry now forces it onto the root React 19 (no nested copy), and deduping
    // keeps a single React instance regardless.
    dedupe: ['react', 'react-dom'],
    alias: {
      '~': path.resolve(__dirname, './'),
      '@components': path.resolve(__dirname, './components'),
      '@utilities': path.resolve(__dirname, './utilities'),
      '@types': path.resolve(__dirname, './types'),
    },
  },
});

