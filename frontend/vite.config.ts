import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Folder root project Vite sekarang di public/
  // sehingga index.html dan src/ dibaca dari sana
  root: 'public',
  // publicDir: folder di dalam root yang berisi static assets murni
  // (gambar, favicon, dll) — sekarang menjadi public/assets-static
  publicDir: 'assets-static',
  build: {
    // Output build tetap ke dist/ di root frontend (bukan di dalam public/)
    outDir: '../dist',
    emptyOutDir: true
  },
  server: {
    port: 5173,
    proxy: {
      // Semua request /api/* diteruskan ke backend :3000
      // Contoh: /api/generate-text → http://localhost:3000/generate-text
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
