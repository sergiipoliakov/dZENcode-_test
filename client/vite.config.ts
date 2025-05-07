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
    port: Number(process.env.CLIENT_PORT),
    hmr: {
      overlay: false
    },
    proxy: {
      [process.env.SERVER_API_PATH as string]: {
        target: `${process.env.SERVER_URL}:${process.env.SERVER_PORT}`,
        changeOrigin: true,
        secure: false
      }
    },
  },
  preview: {
    port: Number(process.env.CLIENT_PORT)
  }
})
