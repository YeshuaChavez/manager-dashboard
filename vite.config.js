import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/manager-dashboard/', // requerido para servir la app desde GitHub Pages
  plugins: [react()],
})
