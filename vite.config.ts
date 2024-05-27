import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker';
import mkcert from 'vite-plugin-mkcert';
import { fileURLToPath, URL } from 'url';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    https: false,
  },
  plugins: [
    react(),
    checker({
      typescript: true,
    }),
    mkcert(),
    svgr(),
  ],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: fileURLToPath(new URL('./src', import.meta.url)),
      },
    ],
  },
});
