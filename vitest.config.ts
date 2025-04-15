// vitest.config.ts
import { defineConfig } from "vitest/config";
import { fileURLToPath, URL } from "node:url";
import vue from "@vitejs/plugin-vue";
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "~": fileURLToPath(new URL("./", import.meta.url)),
      "@": fileURLToPath(new URL("./", import.meta.url)),
      "#imports": fileURLToPath(
        new URL("./.nuxt/imports.d.ts", import.meta.url)
      ),
    },
  },
  test: {
    environment: "happy-dom",
  },
});
