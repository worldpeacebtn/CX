import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    // Increase warning limit so your R3F chunk doesn't scare you
    chunkSizeWarningLimit: 1500,

    rollupOptions: {
      output: {
        // This allows smart splitting
        manualChunks(id) {
          if (id.includes("three") || id.includes("@react-three")) {
            return "three-vendors";
          }
        }
      }
    },
    target: "es2020"
  }
});
