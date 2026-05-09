import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Custom domain: www.safwanshiblee.com (served at root).
// public/CNAME is committed so each `npm run deploy` preserves the
// GitHub Pages custom-domain binding on the gh-pages branch.
export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
})
