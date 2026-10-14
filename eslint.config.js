import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
  },
  {
    // Código que corre en Node, no en el navegador: la función serverless de
    // Vercel (api/) y el módulo compartido con el servidor de desarrollo (lib/).
    files: ['api/**/*.js', 'lib/**/*.js', 'vite.config.js'],
    languageOptions: {
      globals: globals.node,
    },
  },
])
