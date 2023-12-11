// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/content','@nuxtjs/tailwindcss','@nuxtjs/supabase'],
  content: {
  },
  tailwindcss: {},
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
    // redirect: false,
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      exclude: ['/','/about'],
    },
  },
})
