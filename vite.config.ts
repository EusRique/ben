/// <reference types="vitest" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vitePluginEslint from 'vite-plugin-eslint'

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
        }
      }
    }),
    vitePluginEslint()
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      include: ['src/**/*.{ts,vue}'],
      exclude: ['src/miragejs/**/*', 'src/mocks/**/*'],
      all: true,
      provider: 'istanbul',
      thresholdAutoUpdate: true,
    },
  }
})
