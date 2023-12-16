export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/supabase'],
  tailwindcss: {},
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_ANON_KEY,
    // redirect: false,
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      exclude: ['/', '/about'],
    },
  },
  // vue: {
  //   compilerOptions: {
  //     isCustomElement: (tag) => /^(StreamBarcodeReader|ImageBarcodeReader)$/.test(tag),
  //   },
  // },
})