import { defineConfig } from 'vitest/config'
import { resolve } from 'path'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node', 
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'dist/',
        '**/*.config.{js,ts}',
        'apps/*/node_modules/'
      ]
    }
  },
  resolve: {
    alias: {
      '@api': resolve(__dirname, './apps/api'),
      '@web': resolve(__dirname, './apps/web'),
    }
  }
})