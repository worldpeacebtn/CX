import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    // raise warning limit so heavy chunks don't spam logs
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            // create a vendor chunk for r3f / three / drei
            if (id.includes("three") || id.includes("@react-three")) return "three-vendors";
            return "vendor";
          }
        }
      }
    },
    target: "es2020"
  }
});
