import { defineNuxtConfig } from "nuxt/config"
import vue from '@vitejs/plugin-vue';

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
    'dayjs-nuxt'
  ],

  plugins: [
    '~/plugins/v-calendar.js',
    vue()
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
  }
})