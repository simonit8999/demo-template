import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  publicDir: 'public',
  // ВАЖНО: добавляем имя репозитория в base
  base: '/demo-template/',
  build: { outDir: 'dist', emptyOutDir: true }
})
