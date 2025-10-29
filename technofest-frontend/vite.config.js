import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite config with dev proxy to backend API to avoid CORS in development
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
