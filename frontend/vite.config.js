// Import the necessary functions and modules
import { defineConfig } from 'vite'          // Main Vite config function
import react from '@vitejs/plugin-react'     // React plugin for Vite
import path from 'path'                      // Node.js path module for handling file paths

export default defineConfig({
  // Configure Vite plugins
  plugins: [
    react()  // Enable React support in Vite
  ],

  // Set up path aliases for cleaner imports
  resolve: {
    alias: {
      // Map '@' to point to the src directory
      // This allows you to use imports like: import Component from '@/components/Component'
      // Instead of: import Component from '../../components/Component'
      '@': path.resolve(__dirname, './src')
    }
  },

  // Development server configuration
  server: {
    host: true,     // Allow access from any IP address (not just localhost)
    port: 5173,     // Set the development server port
    watch: {
      usePolling: true  // Enable file system polling for better compatibility
                        // Especially useful in certain environments like Docker or WSL
    }
  }
})