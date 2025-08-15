import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Si TU REPO se llama "mantarq-web", usa base: '/mantarq-web/'
// Si tu repo es "tuusuario.github.io", usa base: '/'
export default defineConfig({
  plugins: [react()],
  base: '/mantarq-web/',
  resolve: { dedupe: ['react', 'react-dom'] },
})
