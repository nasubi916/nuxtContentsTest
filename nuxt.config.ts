export default defineNuxtConfig({
  ssr: true,
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@nuxtjs/supabase", "notivue/nuxt"],
  css: ["notivue/notifications.css", "notivue/animations.css"],
  ui: {
    global: true,
  },
  colorMode: {
    preference: "dark",
  },
  notivue: {
    position: "bottom-right",
    limit: 3,
    notifications: {
      global: {
        duration: 2000,
      },
    },
  },
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_ANON_KEY,
    redirectOptions: {
      login: "/login",
      callback: "/confirm",
      exclude: ["/", "/login", "/confirm"],
    },
  },
  tailwindcss: {},
  typescript: {},
});
