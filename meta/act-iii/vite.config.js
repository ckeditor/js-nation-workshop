import { createRequire } from "node:module";
const require = createRequire(import.meta.url);

import { defineConfig } from "vite";
import ckeditor5 from "@ckeditor/vite-plugin-ckeditor5";

export default defineConfig({
  optimizeDeps: {
    esbuildOptions: {
      legalComments: "none",
    },
  },
  plugins: [
    ckeditor5({ theme: require.resolve("@ckeditor/ckeditor5-theme-lark") }),
  ],
});
