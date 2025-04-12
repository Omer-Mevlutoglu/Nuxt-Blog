// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },

  modules: [
    "@nuxt/content",
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/image",
    "@nuxt/scripts",
    "@nuxt/test-utils",
    "@nuxt/icon",
    "@nuxtjs/i18n",
  ],
  i18n: {
    strategy: "prefix",
    locales: [
      { code: "en", name: "English", file: "en.json" },
      { code: "tr", name: "Türkçe", file: "tr.json" },
    ],
    defaultLocale: "en",
    lazy: true,
    langDir: "locales/",
  },

  css: ["~/assets/scss/global.scss"],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/scss/_variables.scss" as *;',
        },
      },
    },
  },

  components: [{ path: "~/src/components", pathPrefix: false }, "~/components"],
});
