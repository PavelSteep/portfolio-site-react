import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  base: "/", // правильная база для Vercel
  plugins: [react()],
  assetsInclude: ["**/*.glb", "**/*.gltf"], // чтобы Vite не игнорировал модели
  build: {
    outDir: "dist", // папка для билда
    sourcemap: false, // карты отключены для стабильности
    minify: "terser", // стабильный минификатор
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
