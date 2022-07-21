import colors from 'vuetify/es5/util/colors'
import pkg from './package.json'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  ssr: false,
  target: "static",
  head: {
    titleTemplate: '%s - VoxTube',
    title: 'VoxTube',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
  },

  // https://nuxtjs.org/deployments/netlify/#for-a-statically-generated-site
  // netlify: fallback must be set to true else some ssr generated pages will return 404
  generate: {
    fallback: true
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    { src: 'simplebar/dist/simplebar.min.css', lang: 'css' },
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/capitalize',
    '~/plugins/naira',
    { src: '~/plugins/flutterwave', ssr: false }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify'
  ],


  // loading bar
  loading: {
    color: '#253358',
    continuous: true
    // throttle: 0
  },

  loadingIndicator: {
    name: 'chasing-dots',
    background: '#211B34',
    color: '#fff'
  },

  // transition
  // transition: {
  //   name: 'page',
  //   mode: 'out-in'
  // },
  pageTransition: "fade",
  layoutTransition: {
    name: 'my-layouts',
    mode: 'out-in'
  },

  // global router config
  router: {
    // Run the middleware/user-agent.js on every page
    middleware: 'auth'
  },

  env: {
    BASE_URL: process.env.BASE_URL,
    UPLOAD_SERVER: process.env.UPLOAD_SERVER,
    CLD_NAME: process.env.CLD_NAME,
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/auth-next',
    '@nuxtjs/dayjs',
    'nuxt-paystack',
    '@nuxtjs/cloudinary'
  ],

  // https://cloudinary.nuxtjs.org/setup
  // cloudinary config
  cloudinary: {
    // Cloudinary configuration options
    cloudName: process.env.CLD_NAME,
    secure: true,
    useComponent: true,
  },

  dayjs: {
    locales: ['en'],
    defaultLocale: 'en',
    plugins: ['relativeTime', 'advancedFormat']
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.BASE_URL
  },

  // Auth modul configuration: https://auth.nuxtjs.org/
  auth: {
    // Options
    strategies: {
      local: {
        token: {
          maxAge: false,
          property: 'token',
          required: true,
          type: 'Bearer'
        },
        user: {
          property: false
          // autoFetch: true
        },
        endpoints: {
          login: { url: '/auth/login', method: 'post' },
          logout: { url: '/auth/logout', method: 'post' },
          user: { url: '/auth/profile', method: 'get' }
        }
      }
    },
    redirect: {
      login: '/auth/login',
      logout: '/',
      callback: `/`,
      home: '/'
    }
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
      name: `VoxTube`,
      short_name: `VoxTube`,
      description: pkg.description
    }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    theme: {
      dark: false,
      themes: {
        light: {
          primary: '#211B34',
          secondary: '#403D50',
          accent: '#D1D5DB',
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        },
        dark: {
          primary: '#211B34',
          secondary: '#403D50',
          accent: '#D1D5DB',
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        },
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['lodash-es'],
    extractCSS: true
    // Other build options
  }
}
