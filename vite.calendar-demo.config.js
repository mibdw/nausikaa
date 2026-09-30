import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import { transformSync } from "esbuild";

const jsxForScripts = {
  name: "jsx-for-scripts",
  enforce: "pre",
  transform(code, id) {
    if ((id.includes("/scripts/") || id.includes("/utilities/DatePicker/") || id.includes("/utilities/Editor/")) && id.endsWith(".js")) {
      const result = transformSync(code, {
        loader: "jsx",
        jsx: "automatic",
        sourcemap: false,
      });
      return { code: result.code, map: null };
    }
  },
};

export default defineConfig({
  plugins: [
    jsxForScripts,
    react({
      include: [/scripts\/.*\.js$/, /scripts\/.*\.jsx$/, /utilities\/(DatePicker|Editor)\/.*\.js$/],
    }),
  ],
  publicDir: false, // prevent copying public/* into outDir
  esbuild: {
    loader: "jsx",
    include: /(scripts\/.*\.jsx?$|utilities\/(DatePicker|Editor)\/.*\.js$)/,
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        ".js": "jsx",
      },
    },
  },
  resolve: {
    alias: {
      "@nausikaa/calendar": resolve(
        __dirname,
        "utilities/Calendar/dist/index.js"
      ),
    },
    dedupe: ["react", "react-dom"],
  },
  build: {
    outDir: resolve(__dirname, "public/scripts"),
    emptyOutDir: false,
    minify: false,
    sourcemap: true,
    rollupOptions: {
      input: {
        "calendar-demo": resolve(__dirname, "scripts/calendar-demo.js"),
        "date-picker-demo": resolve(__dirname, "scripts/date-picker-demo.js"),
        "editor-demo": resolve(__dirname, "scripts/editor-demo.js"),
      },
      output: {
        entryFileNames: "[name].js",
      },
    },
  },
});
