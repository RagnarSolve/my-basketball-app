import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()], // Ensure React plugin is used
  test: {
    environment: "jsdom", // Use jsdom for DOM testing
    globals: true, // Enable global variables like `describe`, `it`, etc.
  },
});