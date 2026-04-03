import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'plugin/dist',
    rollupOptions: {
      input: {
        ui: 'src/ui/index.html',
      },
    },
  },
})