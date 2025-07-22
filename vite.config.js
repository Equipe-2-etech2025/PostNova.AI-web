import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    watch: {
      usePolling: true
    },
    hmr: {
      clientPort: 5173
    },

    //  Configuration du proxy pour l'API
    proxy: {
      '/api': {
        target: 'http://postnova-webserver',
        changeOrigin: true,
        secure: false,
        configure: (proxy, options) => {
          proxy.on('error', (err, req, res) => {
            console.log('Proxy error:', err.message);
          });
          proxy.on('proxyReq', (proxyReq, req, res) => {
            console.log('Proxy Request:', req.method, req.url);
          });
          proxy.on('proxyRes', (proxyRes, req, res) => {
            console.log('Proxy Response:', proxyRes.statusCode, req.url);
          });
        },
      }
    }
  },
  preview: {
    port: 5173
  }
})
