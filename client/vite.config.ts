import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
  alias: {
    src: '/src'
  }
  },
  define:{
    'process.env.SERVER_URL': JSON.stringify(`${process.env.SERVER_URL}:${process.env.SERVER_PORT}`),
    'process.env.SERVER_API_PATH': JSON.stringify(process.env.SERVER_API_PATH)
  },
  server: {
    watch: {
      usePolling: true,
    },
    host: true,
    strictPort: true,
    port: 3000,
    hmr: {
      overlay: false
    },
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        secure: false
      }
    },
  },
  preview: {
    port: 3000
  }
})
