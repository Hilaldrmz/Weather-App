import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css:{
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/scss/main.scss";`
      }
    }
  },

  base: process.env.NODE_ENV === 'production'
    ? '/Weather-App/'
    : '/',
  build: {
    outDir: 'docs'
  }
})