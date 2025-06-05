import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api/giphy': {
        target: 'https://api.giphy.com/v1',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/giphy/, ''),
        configure: (proxy, _options) => {
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            const url = new URL(proxyReq.path, 'https://api.giphy.com');
            url.searchParams.append('api_key', process.env.VITE_GIPHY_API_KEY);
            proxyReq.path = url.pathname + url.search;
          });
        },
      }
    }
  },
  build: {
    outDir: 'build',
    sourcemap: true
  },
  define: {
    'import.meta.env.VITE_GIPHY_API_KEY': JSON.stringify(process.env.VITE_GIPHY_API_KEY)
  }
}) 