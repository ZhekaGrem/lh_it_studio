/**
 * SEO Configuration for LH IT Studio
 *
 * Містить всі метатеги, Open Graph, Twitter Cards, Structured Data
 * Використовується в nuxt.config.ts та компонентах
 */

export interface SeoConfig {
  site: {
    name: string
    url: string
    description: string
    locale: string
    localeAlternate: string[]
  }
  meta: {
    title: string
    titleTemplate: string
    description: string
    keywords: string[]
    author: string
    robots: string
    googleSiteVerification?: string
  }
  openGraph: {
    type: string
    siteName: string
    title: string
    description: string
    url: string
    image: string
    imageAlt: string
    locale: string
  }
  twitter: {
    card: string
    site: string
    creator: string
    title: string
    description: string
    image: string
    imageAlt: string
  }
  schema: {
    organization: {
      name: string
      url: string
      logo: string
      description: string
      email: string
      telephone?: string
      address?: {
        streetAddress: string
        addressLocality: string
        addressRegion: string
        postalCode: string
        addressCountry: string
      }
      sameAs: string[]
    }
    website: {
      name: string
      url: string
      description: string
      inLanguage: string
    }
  }
}

/**
 * Головна SEO конфігурація
 */
export const seoConfig: SeoConfig = {
  // Основні налаштування сайту
  site: {
    name: 'LH IT Studio',
    url: 'https://lh-it-studio.com', // ❗ Замінити на реальний домен
    description: 'Розробка сайтів, боті в Telegram, автоматизація бізнесу. Перетворюємо ідеї в цифрові рішення.',
    locale: 'uk_UA',
    localeAlternate: ['en_US', 'ru_RU']
  },

  // Meta теги
  meta: {
    title: 'LH IT Studio — Розробка сайтів та ботів в Telegram',
    titleTemplate: '%s | LH IT Studio',
    description: 'Розробка сайтів, чат-боті в Telegram, автоматизація бізнес-процесів. Створюємо сучасні веб-додатки на Vue.js та Nuxt. Швидко, якісно, з душею.',
    keywords: [
      'розробка сайтів',
      'створення сайтів',
      'веб-розробка',
      'telegram боти',
      'чат-боти',
      'автоматизація бізнесу',
      'IT студія',
      'Vue.js розробка',
      'Nuxt розробка',
      'лендінг',
      'корпоративний сайт',
      'інтернет-магазин',
      'веб-додатки',
      'frontend розробка',
      'IT аутсорсинг'
    ],
    author: 'LH IT Studio',
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    googleSiteVerification: '' // ❗ Додати код з Google Search Console
  },

  // Open Graph (Facebook, LinkedIn)
  openGraph: {
    type: 'website',
    siteName: 'LH IT Studio',
    title: 'LH IT Studio — Розробка сайтів та ботів в Telegram',
    description: 'Розробка сайтів, чат-боті в Telegram, автоматизація бізнесу. Створюємо сучасні веб-додатки на Vue.js та Nuxt.',
    url: 'https://lh-it-studio.com',
    image: 'https://lh-it-studio.com/logo.webp',
    imageAlt: 'LH IT Studio — Розробка сайтів та ботів',
    locale: 'uk_UA'
  },

  // Twitter Cards
  twitter: {
    card: 'summary_large_image',
    site: '@lh_it_studio', // ❗ Замінити на реальний Twitter handle або видалити
    creator: '@lh_it_studio',
    title: 'LH IT Studio — Розробка сайтів та ботів в Telegram',
    description: 'Розробка сайтів, чат-боті в Telegram, автоматизація бізнесу.',
    image: 'https://lh-it-studio.com/logo.webp',
    imageAlt: 'LH IT Studio — Розробка сайтів та ботів'
  },

  // Schema.org Structured Data (JSON-LD)
  schema: {
    // Організація
    organization: {
      name: 'LH IT Studio',
      url: 'https://lh-it-studio.com',
      logo: 'https://lh-it-studio.com/logo.webp',
      description: 'Розробка сайтів, боті в Telegram, автоматизація бізнесу',
      email: 'info@lh-it-studio.com', // ❗ Замінити на реальний email
      telephone: '+380XXXXXXXXX', // ❗ Додати телефон або видалити
      address: {
        streetAddress: 'вул. Прикладна, 1',
        addressLocality: 'Київ',
        addressRegion: 'Київська область',
        postalCode: '01001',
        addressCountry: 'UA'
      },
      sameAs: [
        // ❗ Додати реальні посилання на соціальні мережі
        'https://www.facebook.com/lh-it-studio',
        'https://www.instagram.com/lh_it_studio',
        'https://www.linkedin.com/company/lh-it-studio',
        'https://t.me/lh_it_studio',
        'https://github.com/lh-it-studio'
      ]
    },

    // Веб-сайт
    website: {
      name: 'LH IT Studio',
      url: 'https://lh-it-studio.com',
      description: 'Розробка сайтів, боті в Telegram, автоматизація бізнесу',
      inLanguage: 'uk-UA'
    }
  }
}

/**
 * Генерує метатеги для конкретної сторінки
 * @param pageTitle - Заголовок сторінки
 * @param pageDescription - Опис сторінки
 * @param pageImage - Зображення для OG (опціонально)
 */
export function generatePageMeta(
  pageTitle?: string,
  pageDescription?: string,
  pageImage?: string
) {
  const title = pageTitle || seoConfig.meta.title
  const description = pageDescription || seoConfig.meta.description
  const image = pageImage || seoConfig.openGraph.image

  return {
    title,
    meta: [
      { name: 'description', content: description },
      { name: 'keywords', content: seoConfig.meta.keywords.join(', ') },

      // Open Graph
      { property: 'og:type', content: seoConfig.openGraph.type },
      { property: 'og:site_name', content: seoConfig.openGraph.siteName },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: image },
      { property: 'og:image:alt', content: seoConfig.openGraph.imageAlt },
      { property: 'og:url', content: seoConfig.site.url },
      { property: 'og:locale', content: seoConfig.openGraph.locale },

      // Twitter
      { name: 'twitter:card', content: seoConfig.twitter.card },
      { name: 'twitter:site', content: seoConfig.twitter.site },
      { name: 'twitter:creator', content: seoConfig.twitter.creator },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image },
      { name: 'twitter:image:alt', content: seoConfig.twitter.imageAlt },
    ]
  }
}

/**
 * Генерує JSON-LD structured data для організації
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: seoConfig.schema.organization.name,
    url: seoConfig.schema.organization.url,
    logo: seoConfig.schema.organization.logo,
    description: seoConfig.schema.organization.description,
    email: seoConfig.schema.organization.email,
    telephone: seoConfig.schema.organization.telephone,
    address: {
      '@type': 'PostalAddress',
      ...seoConfig.schema.organization.address
    },
    sameAs: seoConfig.schema.organization.sameAs
  }
}

/**
 * Генерує JSON-LD structured data для веб-сайту
 */
export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: seoConfig.schema.website.name,
    url: seoConfig.schema.website.url,
    description: seoConfig.schema.website.description,
    inLanguage: seoConfig.schema.website.inLanguage,
    publisher: {
      '@type': 'Organization',
      name: seoConfig.schema.organization.name,
      logo: {
        '@type': 'ImageObject',
        url: seoConfig.schema.organization.logo
      }
    }
  }
}

/**
 * Генерує BreadcrumbList Schema
 */
export function generateBreadcrumbSchema(breadcrumbs: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  }
}
