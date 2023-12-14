// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr:false,
  runtimeConfig:{
    public:{
      baseURL:process.env.BASE_URL
    }
  },
  modules:[
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@vant/nuxt'
  ],
  pinia: {
    storesDirs: ['./stores/**'],
  },
  css:['/assets/styles/reset.scss',
    '/assets/styles/max-ui.scss','/assets/styles/app.scss'],

})
