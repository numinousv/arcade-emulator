import { defineConfig } from "vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import viteTsConfigPaths from "vite-tsconfig-paths";
// import { fileURLToPath, URL } from "url";
import path from "path";

import tailwindcss from "@tailwindcss/vite";

const config = defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  //   server: {
  //   proxy: {
  //     // // Proxy GitHub releases through your dev server
  //     // '/github-roms': {
  //     //   target: 'https://github.com',
  //     //   changeOrigin: true,
  //     //   rewrite: (path) => path.replace(/^\/github-roms/, ''),
  //     //   headers: {
  //     //     'Accept': 'application/octet-stream',
  //     //   },
  //     // },
  //     // Proxy catbox too if needed
  //     '/catbox': {
  //       target: 'https://files.catbox.moe',
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/catbox/, ''),
  //     },
  //   },
  // },
  plugins: [
    devtools(),
    // this is the plugin that enables path aliases
    viteTsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
  ],
});

export default config;
