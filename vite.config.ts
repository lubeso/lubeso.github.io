import { defineConfig } from "vite";

export default defineConfig({
  root: "public",
  server: {
    hmr: true,
    port: 8000,
    host: "0.0.0.0",
  },
});
