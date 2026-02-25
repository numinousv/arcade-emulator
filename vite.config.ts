import { defineConfig } from "vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import React from "@vitejs/plugin-react";
import viteTsConfigPaths from "vite-tsconfig-paths";
// import { fileURLToPath, URL } from "url";
import path from "path";

import tailwindcss from "@tailwindcss/vite";

const config = defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  plugins: [
    devtools(),
    // this is the plugin that enables path aliases
    viteTsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
    tailwindcss(),
    tanstackRouter(),
    React(),
  ],
});

export default config;
