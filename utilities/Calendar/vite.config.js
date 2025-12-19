import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

// Library-mode build for the calendar component
export default defineConfig({
  plugins: [react()],
  esbuild: {
    // Treat .js files in this package as JSX so we don't have to rename everything.
    loader: "jsx",
    include: /.*\.js$/,
    exclude: [/node_modules/],
  },
  build: {
    lib: {
      entry: resolve(__dirname, "index.js"),
      name: "NausikaaCalendar",
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format === "es" ? "js" : "cjs"}`,
    },
    minify: false,
    sourcemap: true,
    rollupOptions: {
      external: ["react", "react-dom", "date-fns"],
    },
  },
});
