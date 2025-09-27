import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/auto-compound-interest/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
})