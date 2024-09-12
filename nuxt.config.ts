// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["@/assets/styles/tailwind.css"],
  plugins: ["~/plugins/pinia.ts"],
  modules: ["@nuxtjs/tailwindcss"],
  compatibilityDate: "2024-04-03",
});
