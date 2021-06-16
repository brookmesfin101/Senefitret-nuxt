const bodyParser = require('body-parser');

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Senefitret-Nuxt',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script : [
      {
        src: '/js/jquery.min.js',        
      },
      {
        src: '/js/bootstrap.min.js'
      }
    ]
  },

  server: {
    port: 8080 // default: 3000
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/flatly-bootswatch.css',
    '@/assets/css/main.css',
    '@/assets/fonts/fonts.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [

  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/fontawesome',
  ],

  serverMiddleware: [    
    { path: '/api', handler: '~/api/index.js' }
  ],

  router: {
    middleware: 'auth'
  },

  fontawesome: {
    icons: {
      solid: ["fas"],
      brands: true
    }
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxt/content',
    '@nuxtjs/axios',
    '@nuxtjs/firebase'
  ],

  firebase : {
    config: {
      apiKey: "AIzaSyCF-bGMaRvMG8H_nhILuwaMXiRKypzvCvQ",
      authDomain: "senefitret.firebaseapp.com",
      projectId: "senefitret",
      storageBucket: "senefitret.appspot.com",
      messagingSenderId: "318602691517",
      appId: "1:318602691517:web:5bd2d81c7e951f9a27c8d4",
      measurementId: "G-82RX60NHGM"
    },
    services: {
      auth: {
        persistence: 'local', // default
        initialize: {          
          onAuthStateChangedAction: 'onAuthStateChangedAction',
          subscribeManually: false
        },
        ssr: false // default
      },
      firestore: true
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['pdfjs-dist'],
    extend(config, { isDev, isClient }) {
      // config.module.rules.push({
      //   test: /pdf\.worker(\.min)?\.js$/,
      //   loader: 'file-loader'
      // });
    }
  }
}
