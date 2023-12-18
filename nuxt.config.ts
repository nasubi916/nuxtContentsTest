export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@nuxtjs/supabase"],
  ui: {
    global: true,
  },
  colorMode: {
    preference: "light",
  },
  typescript: {
    strict: true,
    typeCheck: true,
  },
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_ANON_KEY,
    redirectOptions: {
      login: "/login",
      callback: "/confirm",
      exclude: ["/", "/about", "/about/*"],
    },
  },
});
