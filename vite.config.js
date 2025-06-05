import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
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
              // Add API key to all requests
              const url = new URL(proxyReq.path, 'https://api.giphy.com');
              url.searchParams.append('api_key', env.VITE_GIPHY_API_KEY);
              proxyReq.path = url.pathname + url.search;
            });
          },
        }
      }
    },
    build: {
      outDir: 'build',
      sourcemap: true,
      rollupOptions: {
        input: {
          main: './index.html'
        },
        output: {
          manualChunks: undefined,
          entryFileNames: 'assets/[name].[hash].js',
          chunkFileNames: 'assets/[name].[hash].js',
          assetFileNames: 'assets/[name].[hash].[ext]'
        }
      }
    },
    define: {
      'import.meta.env.VITE_GIPHY_API_KEY': JSON.stringify(env.VITE_GIPHY_API_KEY)
    }
  }
}) 