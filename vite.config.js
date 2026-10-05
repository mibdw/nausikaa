import { defineConfig } from "vite";
import { resolve } from "node:path";

// Builds the optional React utilities into dist/, next to the stylesheet.
// Everything they import from npm (React, date-fns, Tiptap) stays external:
// those are peer dependencies of whoever uses a utility.
export default defineConfig({
  esbuild: {
    // The utilities are JSX in .js files.
    loader: "jsx",
    include: /utilities\/.*\.js$/,
    exclude: [/node_modules/],
    jsx: "automatic",
  },
  build: {
    outDir: "dist",
    // dist/ also holds nausikaa.min.css, written by tools/build-css.js.
    emptyOutDir: false,
    lib: {
      entry: {
        calendar: resolve(import.meta.dirname, "utilities/Calendar/index.js"),
        "date-picker": resolve(import.meta.dirname, "utilities/DatePicker/index.js"),
        editor: resolve(import.meta.dirname, "utilities/Editor/index.js"),
      },
      formats: ["es"],
    },
    minify: false,
    sourcemap: true,
    rollupOptions: {
      external: (id) => !id.startsWith(".") && !id.startsWith("/"),
    },
  },
});
