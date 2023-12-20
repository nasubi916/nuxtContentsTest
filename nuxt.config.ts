export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@nuxtjs/supabase", "notivue/nuxt"],
  css: ["notivue/notifications.css", "notivue/animations.css"],
  notivue: {
    position: "bottom-right",
    limit: 3,
    notifications: {
      global: {
        duration: 2000,
      },
    },
  },
  ui: {
    global: true,
  },
  colorMode: {
    preference: "light",
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
