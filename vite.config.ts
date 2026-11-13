import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  publicDir: 'public',
  base: process.env.VITE_BASE || '/',
  build: { outDir: 'dist', emptyOutDir: true }
})
