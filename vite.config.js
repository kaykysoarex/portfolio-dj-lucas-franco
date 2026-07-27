import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// No GitHub Pages, o site fica em usuario.github.io/nome-do-repo/ (uma subpasta),
// não na raiz do domínio — por isso o "base" precisa mudar só nesse cenário.
// A Action de deploy define GITHUB_PAGES=true só quando builda para o Pages;
// local (npm run dev/build) e outros hosts (Netlify/Vercel) continuam em "/".
const isGithubPages = process.env.GITHUB_PAGES === "true";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: isGithubPages ? "/portfolio-dj-lucas-franco/" : "/",
  build: {
    target: "es2019",
    cssCodeSplit: true,
  },
});
