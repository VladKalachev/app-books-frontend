import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import checker from 'vite-plugin-checker'
import mkcert from'vite-plugin-mkcert'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    https: true,
  },
  plugins: [react(),  checker({
    typescript: true,
  }), mkcert()],
  resolve: {
    alias: [
      { find: '@', replacement: './src' },
    ],
  }
})
