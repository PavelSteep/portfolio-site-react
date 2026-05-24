import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  base: "/", // база для Vercel
  plugins: [react()],
  assetsInclude: ["**/*.glb", "**/*.gltf"], // поддержка моделей
  build: {
    outDir: "dist", // папка билда
    sourcemap: false, // отключаем карты для стабильности
    minify: "terser", // минификатор
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (
              id.includes("react") ||
              id.includes("react-dom") ||
              id.includes("react-router-dom")
            ) {
              return "vendor-react";
            }
            if (id.includes("bootstrap")) {
              return "vendor-bootstrap";
            }
          }
        },
      },
    },
  },
});
