import { seoConfig } from './app/config/seo'

export default defineNuxtConfig({
  compatibilityDate: '2025-12-14',

  srcDir: 'app/',

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/content',
    '@nuxtjs/seo',
    'nuxt-schema-org',
    'nuxt-gtag',
    '@nuxt/eslint'
  ],

  eslint: {
    config: {
      stylistic: true
    }
  },

  components: [
    {
      path: '~/components',
      pathPrefix: false,
    }
  ],

  vite: {
    vueJsx: {
      mergeProps: true,
    },
  },

  // Runtime Config
  runtimeConfig: {
    // Server-side only (безпечно для API keys)
    openaiApiKey: process.env.NUXT_OPENAI_API_KEY || '',
    assistantId: process.env.NUXT_ASSISTANT_ID || '',
    telegramBotToken: process.env.TELEGRAM_BOT_TOKEN || '',
    telegramChatId: process.env.TELEGRAM_CHAT_ID || '',

    public: {
      // Google Analytics ID
      gtag: process.env.NUXT_PUBLIC_GTAG_ID || '',
      // Site URL
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || seoConfig.site.url,
    }
  },

  // Google Analytics (gtag.js)
  gtag: {
    id: process.env.NUXT_PUBLIC_GTAG_ID || '',
    enabled: !!process.env.NUXT_PUBLIC_GTAG_ID, // Увімкнено тільки якщо є ID
    config: {
      anonymize_ip: true, // Анонімізація IP (GDPR)
      send_page_view: true, // Автоматичне відстеження переглядів сторінок
      linker: {
        domains: [seoConfig.site.url.replace('https://', '')]
      }
    }
  },

  // SEO Module (@nuxtjs/seo)
  site: {
    url: seoConfig.site.url,
    name: seoConfig.site.name,
    description: seoConfig.site.description,
    defaultLocale: 'uk',
    trailingSlash: false
  },

  // Robots.txt
  robots: {
    enabled: true,
    groups: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_nuxt/'],
        comments: 'Allow all crawlers'
      }
    ],
    sitemap: `${seoConfig.site.url}/sitemap.xml`
  },

  // Sitemap
  sitemap: {
    enabled: true,
    hostname: seoConfig.site.url,
    gzip: true,
    exclude: ['/api/**'],
    defaults: {
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date()
    }
  },

  // Schema.org Module
  schemaOrg: {
    enabled: true,
    identity: {
      type: 'Organization',
      name: seoConfig.schema.organization.name,
      url: seoConfig.schema.organization.url,
      logo: seoConfig.schema.organization.logo,
      sameAs: seoConfig.schema.organization.sameAs
    }
  },

  // Open Graph & Twitter Cards
  ogImage: {
    enabled: true,
    defaults: {
      component: 'NuxtSeo',
      width: 1200,
      height: 630,
      cacheMaxAgeSeconds: 60 * 60 * 24 * 7 // 7 днів
    }
  },

  app: {
    head: {
      htmlAttrs: {
        lang: 'uk'
      },
      title: seoConfig.meta.title,
      titleTemplate: seoConfig.meta.titleTemplate,
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'description', content: seoConfig.meta.description },
        { name: 'keywords', content: seoConfig.meta.keywords.join(', ') },
        { name: 'author', content: seoConfig.meta.author },
        { name: 'robots', content: seoConfig.meta.robots },

        // Open Graph
        { property: 'og:type', content: seoConfig.openGraph.type },
        { property: 'og:site_name', content: seoConfig.openGraph.siteName },
        { property: 'og:title', content: seoConfig.openGraph.title },
        { property: 'og:description', content: seoConfig.openGraph.description },
        { property: 'og:url', content: seoConfig.openGraph.url },
        { property: 'og:image', content: seoConfig.openGraph.image },
        { property: 'og:image:alt', content: seoConfig.openGraph.imageAlt },
        { property: 'og:locale', content: seoConfig.openGraph.locale },

        // Twitter
        { name: 'twitter:card', content: seoConfig.twitter.card },
        { name: 'twitter:site', content: seoConfig.twitter.site },
        { name: 'twitter:creator', content: seoConfig.twitter.creator },
        { name: 'twitter:title', content: seoConfig.twitter.title },
        { name: 'twitter:description', content: seoConfig.twitter.description },
        { name: 'twitter:image', content: seoConfig.twitter.image },
        { name: 'twitter:image:alt', content: seoConfig.twitter.imageAlt },

        // Додаткові meta
        { name: 'theme-color', content: '#FF4D00' },
        { name: 'msapplication-TileColor', content: '#FF4D00' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
      ],
      link: [
        // Favicon
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'manifest', href: '/site.webmanifest' },

        // Google Fonts
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700;900&family=Inter:wght@400;500&family=Press+Start+2P&display=swap'
        },

        // Canonical
        { rel: 'canonical', href: seoConfig.site.url }
      ]
    }
  },

  css: ['@/assets/css/global.css'],
})
