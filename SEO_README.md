# SEO & Google Analytics — Інструкція з налаштування

Цей проект повністю налаштований для SEO оптимізації та Google Analytics. Нижче інструкції як завершити налаштування.

---

## 📁 Структура SEO файлів

```
app/
└── config/
    └── seo.ts              # Головна SEO конфігурація

nuxt.config.ts              # SEO модулі та налаштування
.env.example                # Змінні середовища (приклад)
.env.local                  # Ваші реальні змінні (не в git)

public/
├── logo.webp               # Логотип для OG/Twitter
├── favicon.ico             # Favicon
└── robots.txt              # Генерується автоматично
```

---

## 🚀 Швидкий старт

### 1. Скопіюйте `.env.example` в `.env.local`

```bash
cp .env.example .env.local
```

### 2. Заповніть змінні в `.env.local`

```bash
# Обов'язково
NUXT_PUBLIC_SITE_URL=https://ваш-домен.com
NUXT_PUBLIC_GTAG_ID=G-XXXXXXXXXX

# Опціонально
GOOGLE_SITE_VERIFICATION=ваш_код_верифікації
TELEGRAM_BOT_TOKEN=ваш_токен
TELEGRAM_CHAT_ID=ваш_chat_id
```

### 3. Оновіть `app/config/seo.ts`

Відкрийте `app/config/seo.ts` та замініть placeholder значення:

```typescript
// Знайдіть рядки з ❗ та оновіть їх:
site: {
  url: 'https://ваш-реальний-домен.com', // ❗ Замінити
}

meta: {
  googleSiteVerification: 'ваш_код_з_Google_Search_Console', // ❗ Додати
}

schema: {
  organization: {
    email: 'ваш-email@домен.com', // ❗ Замінити
    telephone: '+380123456789',    // ❗ Замінити
    address: { ... },               // ❗ Оновити адресу
    sameAs: [                       // ❗ Додати реальні соц мережі
      'https://www.facebook.com/ваша-сторінка',
      'https://www.instagram.com/ваш-профіль',
    ]
  }
}
```

---

## 🔧 Налаштування Google Analytics

### Крок 1: Створіть Google Analytics акаунт

1. Перейдіть на [https://analytics.google.com/](https://analytics.google.com/)
2. Натисніть **"Start measuring"** (Почати вимірювання)
3. Створіть новий **Property** (Ресурс)
4. Оберіть **GA4** (Google Analytics 4)
5. Заповніть дані про сайт

### Крок 2: Отримайте Measurement ID

1. У налаштуваннях Property знайдіть **Data Streams** (Потоки даних)
2. Виберіть **Web** → Додайте ваш домен
3. Скопіюйте **Measurement ID** (формат: `G-XXXXXXXXXX`)

### Крок 3: Додайте ID в `.env.local`

```bash
NUXT_PUBLIC_GTAG_ID=G-XXXXXXXXXX
```

### Крок 4: Перевірте роботу

Запустіть dev сервер:

```bash
npm run dev
```

Відкрийте браузер з **Developer Tools** → **Network** → фільтр `gtag` — ви побачите запити до Google Analytics.

Або перевірте в **Realtime** звітах Google Analytics (дані з'являться через 1-2 хв).

---

## 🔍 Налаштування Google Search Console

### Крок 1: Додайте сайт

1. Перейдіть на [https://search.google.com/search-console](https://search.google.com/search-console)
2. Натисніть **"Add property"** (Додати ресурс)
3. Введіть URL сайту

### Крок 2: Верифікація через meta tag

1. Оберіть спосіб верифікації: **HTML tag**
2. Скопіюйте `content` з тега:
   ```html
   <meta name="google-site-verification" content="ВАШ_КОД_ТУТ" />
   ```

### Крок 3: Додайте код в `app/config/seo.ts`

```typescript
meta: {
  googleSiteVerification: 'ВАШ_КОД_ТУТ', // Замість порожнього рядка
}
```

### Крок 4: Задеплойте сайт і верифікуйте

1. Задеплойте сайт на production
2. Поверніться в Search Console і натисніть **"Verify"**
3. Готово! Google почне індексувати ваш сайт

### Крок 5: Надішліть Sitemap

1. У Search Console перейдіть у розділ **Sitemaps**
2. Додайте URL sitemap: `https://ваш-домен.com/sitemap.xml`
3. Натисніть **Submit**

---

## 📊 Що вже налаштовано автоматично

### ✅ SEO Метатеги

- `<title>` та `<meta description>`
- Keywords
- Canonical URL
- Language (lang="uk")
- Viewport, charset, format-detection

### ✅ Open Graph (Facebook, LinkedIn)

- `og:type`, `og:site_name`, `og:title`
- `og:description`, `og:image`, `og:url`
- `og:locale`

### ✅ Twitter Cards

- `twitter:card`, `twitter:site`, `twitter:creator`
- `twitter:title`, `twitter:description`, `twitter:image`

### ✅ Structured Data (JSON-LD)

- **Organization Schema** — інформація про компанію
- **Website Schema** — дані про сайт
- **BreadcrumbList** — хлібні крихти (можна додати на сторінки)

### ✅ Robots.txt

Генерується автоматично через `@nuxtjs/seo`:

```
User-Agent: *
Allow: /
Disallow: /api/
Disallow: /_nuxt/

Sitemap: https://ваш-домен.com/sitemap.xml
```

### ✅ Sitemap.xml

Генерується автоматично для всіх сторінок сайту:

- Формат: XML
- Gzip стиснення: увімкнено
- Автоматичне оновлення при змінах
- Доступний за адресою: `https://ваш-домен.com/sitemap.xml`

### ✅ Favicon & Icons

Готові посилання в `<head>`:

- `/favicon.ico`
- `/apple-touch-icon.png`
- `/favicon-32x32.png`
- `/favicon-16x16.png`
- `/site.webmanifest`

**Потрібно додати ці файли в `public/` перед деплоєм.**

---

## 🎨 Генерація favicon

Рекомендую використати онлайн генератор:

1. [https://realfavicongenerator.net/](https://realfavicongenerator.net/)
2. Завантажте ваш логотип (мінімум 512x512px)
3. Налаштуйте для всіх платформ
4. Скачайте архів і розпакуйте в `public/`

---

## 📝 Додаткові SEO можливості

### Кастомні метатеги для сторінок

У будь-якому компоненті/сторінці:

```vue
<script setup lang="ts">
import { generatePageMeta } from '@/config/seo'

useHead(
  generatePageMeta(
    'Заголовок сторінки',
    'Опис сторінки',
    'https://ваш-домен.com/custom-image.jpg' // опціонально
  )
)
</script>
```

### Breadcrumbs (Хлібні крихти)

```vue
<script setup lang="ts">
import { generateBreadcrumbSchema } from '@/config/seo'

useSchemaOrg([
  generateBreadcrumbSchema([
    { name: 'Головна', url: 'https://ваш-домен.com/' },
    { name: 'Портфоліо', url: 'https://ваш-домен.com/portfolio' },
    { name: 'Проєкт', url: 'https://ваш-домен.com/portfolio/project-1' }
  ])
])
</script>
```

---

## 🧪 Перевірка SEO

### Інструменти для тестування

1. **Google Rich Results Test**
   [https://search.google.com/test/rich-results](https://search.google.com/test/rich-results)
   Перевіряє structured data (Schema.org)

2. **Facebook Sharing Debugger**
   [https://developers.facebook.com/tools/debug/](https://developers.facebook.com/tools/debug/)
   Перевіряє Open Graph метатеги

3. **Twitter Card Validator**
   [https://cards-dev.twitter.com/validator](https://cards-dev.twitter.com/validator)
   Перевіряє Twitter Cards

4. **Google PageSpeed Insights**
   [https://pagespeed.web.dev/](https://pagespeed.web.dev/)
   Аналіз швидкості та SEO

5. **Lighthouse (Chrome DevTools)**
   F12 → Lighthouse → Generate report
   Комплексний аудит SEO, Performance, Accessibility

---

## 📈 Моніторинг Analytics

### Google Analytics Dashboard

1. **Realtime** — поточні відвідувачі
2. **Acquisition** — звідки приходять користувачі
3. **Engagement** — які сторінки переглядають
4. **Conversions** — налаштуйте цілі (форми, кнопки)

### Налаштування Events (події)

Для відстеження кліків, форм, кнопок додайте в компонент:

```vue
<script setup lang="ts">
const { gtag } = useGtag()

const trackButtonClick = () => {
  gtag('event', 'button_click', {
    event_category: 'engagement',
    event_label: 'Consultation Button',
    value: 1
  })
}
</script>

<template>
  <button @click="trackButtonClick">Консультація</button>
</template>
```

---

## ✅ Чек-лист перед деплоєм

- [ ] Заповнено `.env.local` з Google Analytics ID
- [ ] Оновлено `app/config/seo.ts` (URL, email, телефон, соц мережі)
- [ ] Додано favicon файли в `public/`
- [ ] Додано `logo.webp` в `public/` (для OG/Twitter)
- [ ] Перевірено SEO метатеги в HTML (`<head>`)
- [ ] Перевірено structured data через Google Rich Results Test
- [ ] Налаштовано Google Search Console
- [ ] Надіслано sitemap в Search Console
- [ ] Перевірено роботу Google Analytics (Realtime)
- [ ] Додано реальний домен в SEO конфігурацію

---

## 🛠️ Troubleshooting

### Google Analytics не працює

1. Перевірте `.env.local` — чи правильний `NUXT_PUBLIC_GTAG_ID`
2. Перезапустіть dev сервер після зміни `.env`
3. Відкрийте Network в DevTools → фільтр `gtag` — чи є запити?
4. Перевірте чи увімкнено Analytics в налаштуваннях браузера (не заблоковано AdBlock)

### Sitemap не генерується

1. Перевірте чи модуль `@nuxtjs/seo` встановлено
2. Перевірте налаштування `sitemap` в `nuxt.config.ts`
3. Перебудуйте проект: `npm run build`
4. Перевірте `/sitemap.xml` після деплою

### Open Graph не показує зображення

1. Зображення має бути **абсолютний URL** (починатися з `https://`)
2. Розмір: мінімум **1200x630px** для OG, **1200x600px** для Twitter
3. Формат: JPG, PNG, або WebP
4. Перевірте через Facebook Debugger — він покаже помилки

### Schema.org помилки

1. Перевірте через Google Rich Results Test
2. Переконайтеся що всі обов'язкові поля заповнені
3. URL повинні бути валідними та доступними

---

## 📚 Корисні посилання

- [Nuxt SEO Documentation](https://nuxtseo.com/)
- [Google Analytics GA4 Guide](https://support.google.com/analytics/answer/9304153)
- [Schema.org Documentation](https://schema.org/)
- [Open Graph Protocol](https://ogp.me/)
- [Twitter Cards Guide](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)

---

**Готово!** Ваш сайт повністю налаштований для SEO та Google Analytics. 🎉
