import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "/portfolio-dj-lucas-franco/",
  plugins: [react()],
  build: {
    target: "es2019",
    cssCodeSplit: true,
  },
});
