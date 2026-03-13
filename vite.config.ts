import { defineConfig } from "vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import React from "@vitejs/plugin-react";
import viteTsConfigPaths from "vite-tsconfig-paths";
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
    viteTsConfigPaths({ projects: ["./tsconfig.json"] }),
    tailwindcss(),
    tanstackRouter(),
    React(),
  ],

  server: {
    cors: {
      origin: /https?:\/\/([A-Za-z0-9\-\.]+)?(\.ddev\.site)(:\d+)?$/,
    },
    proxy: {
      // API proxy
      "/api/codeberg": {
        target: "https://codeberg.org", //vafan det funkade ju :/
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/codeberg/, ""),
      },
      "/api/catbox": {
        target: "https://catbox.moe",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/catbox/, ""),
      },
      "/api/archive": {
        target: "https://archive.org",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/archive/, ""),
        followRedirects: true, // status 302 = archive.org redirects to ia*.us.archive.org./14/.nds/.nds = cors error, redirect fix
      },
    },
  },
});
export default config;
