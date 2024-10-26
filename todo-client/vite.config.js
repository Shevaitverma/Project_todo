import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:4001/api', // Your backend server
        changeOrigin: true,               // Changes the origin of the host header to the target URL
        rewrite: (path) => path.replace(/^\/api/, ''), // Remove `/api` from the beginning of the path
      },
    },
  },
})
