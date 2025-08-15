// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/mantarq-web/',     // cámbialo si tu repo tiene otro nombre
  resolve: { dedupe: ['react', 'react-dom'] },
})
