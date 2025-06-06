import { defineNuxtConfig } from "nuxt/config"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'My Nuxt App',
    },
  },

  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    'dayjs-nuxt',
    '@nuxtjs/i18n'
  ],

  i18n: {
    locales: [
      { code: 'ru', name: 'Рус', file: 'ru.json' },
      { code: 'kk', name: 'Қаз', file: 'kk.json' }
    ],
    defaultLocale: 'ru',
    langDir: './locales',
    lazy: true,
    strategy: 'prefix_except_default',
  },

  runtimeConfig: {
    public: {
      API_BASE_URL: process.env.API_BASE_URL || 'http://94.247.129.222:8080/api/v1',
    },
  },

  plugins: [
    '~/plugins/v-calendar.js',
    '~/plugins/v-mask.js',
    '~/plugins/axios',
    '~/plugins/vue-toastification.client.js',
  ],

  schemaOrg: {
  },

  robots: {
    UserAgent: '*',
    Disallow: '/admin',
    allow: '/'
  },

  sitemap: {
    hostname: 'https://example.com',
    routes: async () => {
    }
  },

  vite: {
    envPrefix: ['VITE_', 'NUXT_'],
  },
})