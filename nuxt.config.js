import local from "./schemes/local"

export default {
  head: {
    title: 'nuxt.auth',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: "preload", as: "font", href: "/fonts/circe.woff2", crossorigin: "true"},
      { rel: "preload", as: "font", href: "/fonts/fa-light-300.woff2", crossorigin: "true"},
      { rel: "preload", as: "font", href: "/fonts/fa-regular-400.woff2", crossorigin: "true"},
      { rel: "preload", as: "font", href: "/fonts/fa-solid-900.woff2", crossorigin: "true"}
    ]
  },

  css: [
    "~/assets/style/index.scss",
    '@/assets/fs/css/light.min.css',
    '@/assets/fs/css/solid.min.css',
    '@/assets/fs/css/regular.min.css',
    '@/assets/fs/css/fontawesome.min.css',
  ],

  plugins: [
    "@/plugins/editor.client"
  ],

  components: true,

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth',
  ],

  buildModules: [
    '@nuxtjs/style-resources',
  ],

  styleResources: {
    scss: ['~/assets/style/_vars.scss']
  },

  auth: {
    redirect: {
      login: "/signin",
      logout: "/signin",
      home: "/cabinet"
    },
    strategies: {
      local
    }
  },

  router: {
    middleware: ['auth']
  },

  axios: {
    baseURL: 'http://192.168.9.9/',
  },

  build: {
  },
  env: {
    baseURL: 'http://192.168.9.9/',
  }
}
