import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    manifest: true, // Enable manifest generation
    outDir: 'dist', // Specify the output directory
  }
})
