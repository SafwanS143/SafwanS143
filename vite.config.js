import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Repo: github.com/SafwanS143/SafwanS143
// → GitHub Pages serves it at https://safwans143.github.io/SafwanS143/
// Production build prefixes asset URLs with /SafwanS143/; dev stays at '/'
// so localhost:5173 works without a subpath. Switch to '/' here if you ever
// rename the repo to `<username>.github.io` or use a custom domain.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/SafwanS143/' : '/',
  plugins: [react(), tailwindcss()],
}))
