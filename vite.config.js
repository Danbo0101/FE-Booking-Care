import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['@mui/lab', '@mui/material', 'prop-types'],
  },
  server: {
    host: true,
    port: 5173 // hoặc bạn có thể chọn cổng khác nếu muốn
  }
})
