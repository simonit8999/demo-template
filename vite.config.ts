import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  publicDir: 'public', // Жестко указываем, где лежит папка public
  build: {
    outDir: 'dist',
    emptyOutDir: true, // Очищаем dist перед сборкой
  }
})
