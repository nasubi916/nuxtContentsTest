// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,//true,
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/supabase'],
  tailwindcss: {},
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_ANON_KEY,
    // redirect: false,
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      exclude: ['/', '/about', '/about/*'],
    },
  },
})
