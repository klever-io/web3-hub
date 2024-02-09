import { resolve } from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: [{ find: '@', replacement: resolve(__dirname, './src') }],
  },
  test: {
    globals: true,
    setupFiles: './.vitest/setup.ts',
  },
});
