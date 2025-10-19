import { defineConfig } from 'vite'

export default defineConfig({
  // Static site configuration
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      input: {
        main: './index.html'
      },
      output: {
        manualChunks: undefined
      }
    }
  },
  
  // Development server configuration
  server: {
    port: 3000,
    open: true
  },
  
  // Preview server configuration
  preview: {
    port: 3000,
    open: true
  },
  
  // Asset handling
  assetsInclude: ['**/*.json'],
  
  // CSS configuration
  css: {
    devSourcemap: true
  }
})
