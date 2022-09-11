import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
		port: 8085,
		watch: {
			usePolling: true,
			interval: 10,
		},
		proxy: {
			'/api': {
				target: "http://localhost:3000",
				changeOrigin: false,
				secure: false,
				ws: true,
			},
      '/events': {
				target: "http://localhost:3000",
				changeOrigin: false,
				secure: false,
				ws: true,
			},
		}
	}
})
