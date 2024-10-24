import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import checker from "vite-plugin-checker";

export default defineConfig({
  base: "./",

  plugins: [tsconfigPaths(), checker({ typescript: true })],

  server: {
    port: 5173,
    host: "localhost",
    hmr: {
      protocol: "ws",
      host: "localhost",
    },
  },

  build: {
    outDir: "build",
  },
});
