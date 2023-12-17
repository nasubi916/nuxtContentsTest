export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxtjs/supabase'],
  ui: {
    global: true,
  },
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
  // vue: {
  //   compilerOptions: {
  //     isCustomElement: (tag) => /^(StreamBarcodeReader|ImageBarcodeReader)$/.test(tag),
  //   },
  // },
})