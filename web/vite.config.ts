import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    cors: {
      // the origin you will be accessing via browser
      origin: 'http://my-backend.example.com',
    },
  },
});
