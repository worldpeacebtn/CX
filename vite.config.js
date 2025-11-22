import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
  exclude: ["three"]
},
build: {
  rollupOptions: {
    external: ["three"],
  build: {
    target: "es2020"
  }
});
