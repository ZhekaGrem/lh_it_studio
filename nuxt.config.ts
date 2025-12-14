export default defineNuxtConfig({
  compatibilityDate: '2025-12-14',

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/content',
    '@nuxtjs/seo',
    'nuxt-schema-org',
    '@nuxt/eslint'
  ],
  
  eslint: {
    config: {
      stylistic: true // Або false, якщо хочеш повний контроль через Prettier
    }
  },

  vite: {
    vue: {
      customElement: true,
    },
    vueJsx: {
      mergeProps: true,
    },
  },
  app: {
    head: {
      link: [
        // Google Fonts
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com'
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: ''
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700;900&family=Inter:wght@400;500&family=Press+Start+2P&display=swap'
        }
      ]
    }
  },

  css: ['@/app/assets/css/global.css'],
})
