import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
  includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
  manifest: {
    name: 'Task Management App',
    short_name: 'Task Manager',
    description: 'My Awesome Task Manager App',
    theme_color: '#ffffff',
    icons: [
      {
        src: 'logo.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: 'logo.png',
        sizes: '512x512',
        type: 'image/png'
      },
      {
        src: 'logo.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable'
      }
    ]
  }
    })
  ]
})