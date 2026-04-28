import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // This tells Vite to allow Cloudflare Tunnel URLs
    allowedHosts: [
      '.trycloudflare.com' // The dot at the start means it will allow ANY trycloudflare link, even if it changes tomorrow!
    ]
  }
})