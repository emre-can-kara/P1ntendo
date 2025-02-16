import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
    },
  },
  build: {
    rollupOptions: {
      external: ['react-router-dom'],
    }
  },
  // Statik dosyalar için yapılandırma
  publicDir: 'public',
  assetsInclude: ['**/*.jpg', '**/*.png', '**/*.svg'],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      'react-router-dom': path.resolve(__dirname, 'node_modules/react-router-dom')
    }
  },
  optimizeDeps: {
    include: ['react-router-dom']
  }
})
