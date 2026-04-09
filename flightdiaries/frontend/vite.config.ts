import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // All requests starting with /api will be sent to the backend
      '/api': {
        target: 'http://localhost:3000', // Your Express server port
        changeOrigin: true,
        secure: false,
      },
    },
  }
});
