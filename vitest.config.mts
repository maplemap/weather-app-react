import { resolve } from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, './src/'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/lib/test/vitest.setup.mjs',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
    },
  },
});
