import { defineConfig } from "tsup";

export default defineConfig([
  {
    entry: {
      "consent.esm": "src/index.ts",
      "wrappers/react": "src/wrappers/react.ts",
      "wrappers/angular": "src/wrappers/angular.ts",
      "wrappers/next": "src/wrappers/next.ts",
      "wrappers/wordpress": "src/wrappers/wordpress.ts",
    },
    format: ["esm", "cjs"],
    dts: true,
    sourcemap: true,
    clean: true,
    target: "es2017",
    minify: false,
    external: ["react", "@angular/core", "next/script"],
  },
  {
    entry: {
      "consent.min": "src/index.ts",
    },
    format: ["iife"],
    globalName: "ConsentSDK",
    target: "es2017",
    minify: true,
    sourcemap: true,
    outExtension() {
      return {
        js: ".js",
      };
    },
  },
]);
