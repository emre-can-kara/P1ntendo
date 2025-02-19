import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

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
    outDir: 'dist',
    sourcemap: true,
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true
    }
  },
  // Statik dosyalar için yapılandırma
  publicDir: 'public',
  assetsInclude: ['**/*.jpg', '**/*.png', '**/*.svg'],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, 'src/assets')
    },
    extensions: ['.mjs', '.js', '.jsx', '.json', '.ts', '.tsx']
  },
  optimizeDeps: {
    include: ['react-router-dom'] // react-router-dom'u include edelim
  }
})
