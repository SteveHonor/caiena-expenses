import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

import { defineConfig } from "vite";

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  resolve: {
    extensions: ["*", ".ts", ".vue", ".json"],
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
