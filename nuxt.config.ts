// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/content', '@nuxtjs/tailwindcss', 'nuxt-auth-utils'],
  content: {
  },
  tailwindcss: {},
  runtimeConfig: {
    oauth: {
      auth0: {
        clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
        clientSecret: import.meta.env.VITE_AUTH0_CLIENT_SECRET,
      }
    }
  }
})
 