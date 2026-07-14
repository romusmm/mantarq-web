import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    plugins: { react },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      // Sin esta regla, no-unused-vars no reconoce que una variable usada solo
      // como nombre de etiqueta JSX (<motion.nav>, <As>) está "usada" — la
      // marcaba como falso positivo.
      'react/jsx-uses-vars': 'error',
    },
  },
  {
    // Se ejecuta en Node durante `vite build` (prerenderizado), no en el navegador.
    files: ['prerender.jsx'],
    languageOptions: {
      globals: { ...globals.node, ...globals.browser },
    },
  },
])
