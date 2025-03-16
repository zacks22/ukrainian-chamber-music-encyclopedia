import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // set equal to '/' for deployment and '/ukrainian-chamber-music-encyclopedia/' for development
  base: '/',
})
