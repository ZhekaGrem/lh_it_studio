# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**LH IT Studio** - це лендінг-візитка для міні ІТ студії, побудований на **Nuxt 4 + Vue 3** з використанням **shadcn-vue** компонентів та **Tailwind CSS**. Проект призначений для демонстрації портфоліо та залучення нових замовників.

### Основні можливості

- Презентація послуг студії
- Портфоліо реалізованих проектів
- Форма контакту (надсилає повідомлення в Telegram)
- Чат з ботом для уточнення деталей замовлення
- Адаптивний дизайн для всіх пристроїв

### Технічний стек

- **Framework**: Nuxt 4 (SSR/SSG)
- **UI**: Vue 3 + shadcn-vue + Tailwind CSS
- **Icons**: lucide-vue-next
- **Validation**: Zod
- **Utilities**: class-variance-authority, clsx, tailwind-merge
- **TypeScript**: повна типізація

## Development Commands

```bash
# Запустити dev сервер
npm run dev

# Зібрати для production
npm run build

# Попередній перегляд production білду
npm run preview

# Згенерувати статичний сайт (SSG)
npm run generate

# Підготувати Nuxt типи
npm run prepare

# Додати shadcn-vue компонент
npx shadcn-vue@latest add <component-name>
```

## Code Structure

Проект використовує **Nuxt 4 з `srcDir: 'app/'`** структуру:

```
app/                          # Source directory (всі Vue файли тут)
├── app.vue                   # Головний layout
├── assets/
│   └── css/
│       └── global.css        # Tailwind + shadcn теми
├── components/
│   ├── ui/                   # shadcn-vue компоненти (Button, Card, Dialog, тощо)
│   ├── sections/             # Секції лендінгу
│   │   └── HeroSection.vue   # Hero секція
│   ├── modals/               # Модальні вікна (ContactForm, ChatBot)
│   └── WireframeVisualization.vue  # SVG анімація
├── lib/
│   └── utils.ts              # cn() утиліта для Tailwind (shadcn-vue)
├── composables/              # Vue composables (useModal, useContactForm, useTelegram)
├── pages/                    # Nuxt pages (index.vue - головна сторінка)
└── types/                    # TypeScript типи (portfolio, services, contact)

public/                       # Статичні файли (доступні через /)
└── icons/
    └── pixel-sprites.svg     # SVG іконки (browser, robot, brain, etc.)

Root:                         # Конфігурація проекту
├── nuxt.config.ts            # Nuxt config (srcDir: 'app/')
├── tailwind.config.ts        # Tailwind config (custom colors, fonts, shadows)
├── components.json           # shadcn-vue config
└── tsconfig.json             # TypeScript config (paths aliases)
```

### Важливо про структуру:

**`srcDir: 'app/'`** в `nuxt.config.ts` означає:
- Всі Vue файли, components, composables, pages → в `app/`
- Статичні файли → в `public/` (root)
- Конфігурація → в root (nuxt.config.ts, tailwind.config.ts, etc.)
- CSS імпорт: `css: ['@/assets/css/global.css']` (@ вказує на app/)

### Ключові директорії

- **`app/components/ui/`** - shadcn-vue UI компоненти (Button, Card, Dialog, Input, тощо)
- **`app/components/sections/`** - Секції лендінгу (Hero, About, Portfolio, Services, Contact)
- **`app/components/modals/`** - Модальні вікна (форма контакту, чат з ботом)
- **`app/composables/`** - Vue composables для роботи з модалками, формами, Telegram API
- **`app/assets/css/`** - Глобальні стилі, Tailwind директиви, CSS змінні
- **`app/lib/`** - Utility функції (cn() для Tailwind класів)
- **`public/`** - Статичні ресурси (зображення проектів, іконки, логотипи)
- **`app/types/`** - TypeScript інтерфейси та типи

### Правила роботи зі структурою

**ЗАВЖДИ:**
- Нові компоненти створюй в `app/components/`
- Нові composables в `app/composables/`
- Статичні файли (images, fonts) в `public/`
- CSS тільки в `app/assets/css/global.css`

**НІКОЛИ:**
- НЕ створюй Vue файли в root (тільки в `app/`)
- НЕ створюй `assets/` в root (тільки `app/assets/`)
- НЕ змінюй `srcDir: 'app/'` в nuxt.config.ts

## Architecture Patterns

### Composables Pattern

Для управління станом модальних вікон використовуємо Vue composables:

**`composables/useModal.ts`**
```typescript
export const useContactModal = () => useState('contactModal', () => false);
export const useChatBotModal = () => useState('chatBotModal', () => false);
```

**Використання в компонентах:**
```vue
<script setup lang="ts">
const isContactOpen = useContactModal();

const openContact = () => {
  isContactOpen.value = true;
};
</script>
```

### Telegram Integration

Надсилання повідомлень з форми контакту в Telegram:

**`composables/useTelegram.ts`**
```typescript
export const useTelegramNotification = () => {
  const sendContactForm = async (data: ContactFormData) => {
    // Відправка через Telegram Bot API або webhook
    await $fetch('/api/telegram/send', {
      method: 'POST',
      body: data
    });
  };

  return { sendContactForm };
};
```

### Component Structure

Кожна секція лендінгу - окремий Vue компонент:

```
components/sections/
├── HeroSection.vue         # Головний екран з CTA
├── AboutSection.vue        # Про студію
├── ServicesSection.vue     # Послуги
├── PortfolioSection.vue    # Проекти
└── ContactSection.vue      # Контактна інформація
```

## Important Configuration Details

### TypeScript Paths

Проект використовує path aliases:

```typescript
@/          → ./              (root)
~/          → ./              (root)
@/components/ → ./components/
@/composables/ → ./composables/
```
### Nuxt Configuration

**`nuxt.config.ts`** ключові налаштування:

- **Modules**: @nuxtjs/tailwindcss, @nuxt/content, @nuxtjs/seo, nuxt-schema-org, @nuxt/eslint
- **CSS**: Global Tailwind styles з shadcn темами
- **TypeScript**: строга типізація
- **SSG**: можливість генерації статичного сайту

### Tailwind Configuration

**`tailwind.config.ts`** - налаштування shadcn-vue тем:
**version Tailwind 3.4.17**

- Використовує CSS змінні для кольорів (`--background`, `--foreground`, тощо)
- Кастомні радіуси (`--radius`)
- Кольорова палітра для компонентів
- використовуй app/lib/utils.ts - cn

### shadcn-vue Configuration

**`components.json`** - конфігурація shadcn-vue:

- **Style**: new-york
- **TypeScript**: enabled
- **CSS Variables**: enabled (для тем)
- **Base Color**: neutral
- **Icon Library**: lucide-vue-next

## Key Data Flows

### 1. Contact Form Flow

```
User fills form → Validation (Zod) → Submit → Telegram API → Success message
```

**Компоненти:**
- `components/modals/ContactFormModal.vue` - модальне вікно з формою
- `composables/useContactForm.ts` - логіка валідації та submit
- `composables/useTelegram.ts` - відправка в Telegram

### 2. ChatBot Flow

```
User opens chat → Bot asks questions → Collect answers → Send to Telegram
```

**Компоненти:**
- `components/modals/ChatBotModal.vue` - чат інтерфейс
- `composables/useChatBot.ts` - логіка бота (питання, відповіді)
- `composables/useTelegram.ts` - надсилання результатів

### 3. Portfolio Display

```
Static data → PortfolioSection → Card components → Modal with details
```

**Структура даних:**
```typescript
interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  link?: string;
}
```

## Common Tasks

### Додавання нової секції лендінгу

1. Створи компонент у `components/sections/NewSection.vue`
2. Імплементуй структуру з Tailwind класами
3. Використовуй shadcn-vue компоненти де можливо
4. Додай секцію в `pages/index.vue`

```vue
<!-- components/sections/NewSection.vue -->
<template>
  <section class="py-20 bg-background">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-foreground">Section Title</h2>
      <!-- Content -->
    </div>
  </section>
</template>
```

### Додавання нового shadcn-vue компонента

```bash
# Переглянути доступні компоненти
npx shadcn-vue@latest add

# Додати конкретний компонент
npx shadcn-vue@latest add button
npx shadcn-vue@latest add card
npx shadcn-vue@latest add dialog
```

Компоненти встановлюються в `components/ui/`

### Створення нового composable

```typescript
// composables/useFeature.ts
export const useFeature = () => {
  const state = useState('featureState', () => false);

  const toggle = () => {
    state.value = !state.value;
  };

  return {
    state,
    toggle
  };
};
```

### Додавання проекту в портфоліо

1. Створи об'єкт проекту у `types/portfolio.ts`
2. Додай дані в `data/portfolio.ts` (або прямо в компонент)
3. Додай зображення в `public/images/portfolio/`
4. Компонент автоматично відобразить новий проект

## Important Notes

### Project Type

- **Static Landing Page** (без backend)
- Всі дані статичні або hardcoded
- Форми відправляють дані в Telegram
- Немає аутентифікації та бази даних

### Telegram Integration

- Використовується Telegram Bot API для отримання повідомлень з форм
- Налаштування: Bot Token у `.env` (якщо потрібно)
- Повідомлення надходять у приватний чат або канал

### SEO Optimization

- Використовується `@nuxtjs/seo` для meta tags
- `nuxt-schema-org` для structured data
- Кожна секція має семантичну HTML структуру

---

## 🎨 Дизайн система

### Кольори (Brutalist Design)

**Основна палітра (в `tailwind.config.ts`):**
```typescript
colors: {
  ink: '#111111',      // Основний чорний (текст, рамки, тіні)
  bg: '#F8F9FA',       // Off-white фон
  core: '#FF4D00',     // Acid Lime (акцентний колір, кнопки, анімації)
  error: '#FF2E2E'     // Червоний для помилок
}
```

**Використання:**
```vue
<!-- Текст -->
<h1 class="text-ink">Заголовок</h1>

<!-- Фон -->
<section class="bg-bg">...</section>

<!-- Акцент -->
<button class="bg-core text-ink">CTA</button>
```

### Типографіка

**Шрифти:**
```typescript
fontFamily: {
  display: ['Space Grotesk', 'sans-serif'],  // Заголовки (жирний, тісний)
  body: ['Inter', 'sans-serif'],             // Основний текст
  pixel: ['Press Start 2P', 'monospace']     // Декоративний піксельний
}
```

**Letter spacing & Line height:**
```typescript
letterSpacing: {
  tighter: '-0.02em'  // -2% для заголовків (компактніше)
}
lineHeight: {
  tight: '100%'       // Заголовки "б'ються" (плотні рядки)
}
```

**Використання:**
```vue
<!-- Заголовок: Space Grotesk, bold, тісний -->
<h1 class="font-display font-bold text-7xl leading-tight tracking-tighter">
  САЙТИ ТА БОТИ
</h1>

<!-- Текст: Inter, нормальний -->
<p class="font-body text-xl">Автоматизуємо бізнес...</p>
```

### Brutalist тіні

**Box shadows:**
```typescript
boxShadow: {
  'brutal': '4px 4px 0px #111111',           // Стандартна
  'brutal-lg': '6px 6px 0px #111111',        // Велика
  'brutal-core': '6px 6px 0px #FF4D00'       // З Acid Lime
}
```

**Використання:**
```vue
<!-- Кнопка з тінню -->
<button class="bg-core shadow-brutal hover:shadow-brutal-lg border-2 border-ink">
  [ОБГОВОРИТИ ПРОЄКТ]
</button>
```

**Hover ефект (зміщення тіні):**
```vue
<button class="shadow-brutal hover:shadow-brutal-lg
               hover:translate-x-[-2px] hover:translate-y-[-2px]
               transition-all duration-200">
```

---

## 🎨 Правила стилізації

### Пріоритет (від вищого до нижчого)

1. **Tailwind utility classes** — головний спосіб стилізації (`p-4`, `text-lg`, `bg-ink`, тощо)
2. **Кастомні Tailwind класи** — з `tailwind.config.ts` (`text-core`, `shadow-brutal`, `font-display`)
3. **CSS змінні shadcn-vue** — для UI компонентів (`bg-background`, `text-foreground`, `border-border`)
4. **Tailwind @apply** — у `<style>` блоці для повторюваних патернів (рідко!)
5. **Inline style** — **ТІЛЬКИ** для динамічних значень з runtime JS

### 🚫 ЗАБОРОНИ стилізації

- **НЕ використовуй inline `style=""`** якщо можна через Tailwind
- **НЕ створюй нові CSS класи** якщо є Tailwind utility
- **НЕ перевизначай shadcn-vue теми** без крайньої необхідності
- **НЕ міксуй підходи** - або Tailwind, або CSS модулі (не обидва)
- **НЕ використовуй SCSS** - проект на чистому CSS + Tailwind

### ✅ Приклади правильної стилізації

```vue
<!-- ❌ ПОГАНО - inline styles -->
<div style="padding: 16px; margin-bottom: 24px; background-color: #f5f5f5;">

<!-- ✅ ДОБРЕ - Tailwind utilities -->
<div class="p-4 mb-6 bg-muted">

<!-- ❌ ПОГАНО - custom CSS класи для простих речей -->
<style scoped>
.my-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

<!-- ✅ ДОБРЕ - Tailwind utilities -->
<div class="flex justify-center items-center">

<!-- ❌ ПОГАНО - хардкод кольорів -->
<h1 class="text-[#FF6B00]">

<!-- ✅ ДОБРЕ - shadcn-vue CSS змінні -->
<h1 class="text-primary">
```

### Використання shadcn-vue CSS змінних

**Доступні кольори:**
- `bg-background` / `text-foreground` - основні кольори
- `bg-primary` / `text-primary-foreground` - головний акцент
- `bg-secondary` / `text-secondary-foreground` - вторинний акцент
- `bg-muted` / `text-muted-foreground` - приглушені кольори
- `bg-accent` / `text-accent-foreground` - акцентні елементи
- `bg-card` / `text-card-foreground` - картки
- `border-border` - рамки
- `ring-ring` - focus кільця

### Коли inline style допустимий

```vue
<!-- ✅ Динамічне значення з JS -->
<div :style="{ width: `${progress}%` }">

<!-- ✅ Значення з props -->
<div :style="{ backgroundColor: project.color }">

<!-- ✅ Calculated значення -->
<div :style="{ height: `calc(100vh - ${headerHeight}px)` }">
```

### Responsive Design

```vue
<!-- Використовуй Tailwind breakpoints -->
<div class="text-sm md:text-base lg:text-lg">
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
<div class="p-4 md:p-6 lg:p-8">
```

**Breakpoints:**
- `sm:` - 640px
- `md:` - 768px
- `lg:` - 1024px
- `xl:` - 1280px
- `2xl:` - 1536px

### Перед стилізацією перевір

1. **shadcn-vue компоненти** - чи є готовий UI компонент?
2. **Tailwind utilities** - чи можна скласти з utility класів?
3. **CSS змінні** (`global.css`) - чи визначені кольори/змінні?
4. **Існуючі компоненти** - чи є схожий паттерн в проекті?

---

## 📝 Правила роботи з кодом

При будь-якому запиті використовуй цей підхід:

<analysis_first>
ОБОВ'ЯЗКОВО перед написанням коду:

1. Проаналізуй проблему та існуючий код
2. Знайди всі дублювання операцій або патернів
3. Запропонуй найпростіше та найефективніше рішення
4. Запитай підтвердження перед реалізацією
</analysis_first>

<requirements>
- Найпростіше рішення без over-engineering
- НЕ додавати нічого зайвого від себе
- Повністю працююча система для продакшену
- Готовий код без заглушок та TODO
</requirements>

<duplicate_check>
Перевір на дублювання:
- Однакові операції або функції
- Повторювані патерни коду
- Можливість винести спільну логіку

Якщо знайдеш - обов'язково повідом!
</duplicate_check>

<constraints>
- Production-ready код з обробкою помилок
- Мінімальні зміни в існуючій структурі
- Збереження Vue/Nuxt best practices
- Type-safe TypeScript код
- Accessibility (a11y) де можливо
</constraints>

<output_format>
Показувати тільки:
- 1 рядок до зміни
- Змінені рядки
- 1 рядок після зміни

Повний код - тільки якщо змінюється >50% файлу
</output_format>

<project_context>
- **Stack**: Nuxt 4, Vue 3, TypeScript, shadcn-vue, Tailwind CSS, Zod
- **Architecture**: Nuxt standard (composables, components, pages)
- **Domain**: Лендінг ІТ студії з портфоліо
- **No Backend**: статичний сайт, дані hardcoded
- **Telegram**: тільки відправка повідомлень з форм
</project_context>

---

### ⚡ Головний принцип

**МІНІМУМ КОДУ = МАКСИМУМ ЯКОСТІ**

Перед кожною зміною запитай: *"Чи можна вирішити це меншою кількістю рядків?"*

---

### 🚫 ЗАБОРОНИ

#### Не ускладнюй

- **НЕ додавай властивості/параметри "на всяк випадок"** - якщо одна prop вирішує задачу, друга не потрібна
- **НЕ дублюй функціонал** - якщо composable A робить роботу, composable B для того ж = зайве
- **НЕ додавай fallbacks** без реальної браузерної потреби
- **НЕ пиши defensive code** там де він не потрібен
- **НЕ створюй абстракції** для одноразового використання

#### Не відволікайся

- **НЕ рефактор** код який працює і не пов'язаний з задачею
- **НЕ пропонуй "покращення"** які не просили
- **НЕ змінюй стиль/форматування** існуючого коду без потреби
- **НЕ додавай коментарі** до очевидного коду
- **НЕ додавай TypeScript коментарі** якщо типи говорять самі за себе

#### Не гадай

- **Пропонуй 2-3 варіанти** - і вкажи який ОДИН найкращий для цієї задачі
- **НЕ пиши "можливо", "напевно", "варто б"** - або знаєш, або питай
- **НЕ припускай** що потрібно - питай якщо неясно
- **НЕ додавай фічі** які не в скоупі задачі

---

### ✅ Алгоритм перед написанням коду

1. **Яка конкретна проблема?** (одне речення)
2. **Який мінімальний код її вирішує?** (ідеально 1-5 рядків)
3. **Чи є вже щось в проекті що робить схожу роботу?** (перевір composables, components)
4. **Чи кожен рядок необхідний?** (видали все зайве)
5. **Чи зрозуміло це іншому розробнику?** (якщо потрібні коментарі - спрости код)

---

### 🎯 Вимоги до коду

- **Найпростіше рішення** яке працює
- **Production-ready** без заглушок, TODO, console.log
- **Type-safe TypeScript** - всі типи явні
- **Vue 3 Composition API** - `<script setup>` синтаксис
- **Reactivity** - правильне використання `ref`, `computed`, `watch`
- **Accessibility** - семантичний HTML, ARIA атрибути де потрібно
- **Performance** - `defineAsyncComponent` для важких компонентів
- **Мінімальні зміни** в існуючій структурі

---

### 🔍 Перевірка на дублювання

Перед створенням нового:

**Composable:**
- Чи є схожий composable?
- Чи можна розширити існуючий?

**Component:**
- Чи є shadcn-vue компонент?
- Чи є схожий в `components/`?
- Чи можна додати prop в існуючий?

**Utility function:**
- Чи є в `app/lib/utils.ts`?
- Чи є вбудована JS/Vue функція?

**Знайшов дублювання - повідом перед реалізацією!**

---

### 📤 Формат виводу змін

**Мінімальний контекст:**
```vue
// 1 рядок до
- старий код
+ новий код
// 1 рядок після
```

**Повний код** - тільки якщо:
- Новий файл
- Змінюється >50% існуючого файлу

**Без пояснень** - якщо зміна очевидна.

---

### 🧩 Vue/Nuxt Best Practices

#### Composition API

```vue
<!-- ✅ ДОБРЕ - script setup -->
<script setup lang="ts">
const count = ref(0);
const doubled = computed(() => count.value * 2);
</script>

<!-- ❌ ПОГАНО - Options API (не використовуємо) -->
<script>
export default {
  data() {
    return { count: 0 }
  }
}
</script>
```

#### Reactivity

```typescript
// ✅ ДОБРЕ - примітиви в ref
const name = ref('');
const isOpen = ref(false);

// ✅ ДОБРЕ - об'єкти в reactive (якщо багато полів)
const form = reactive({
  name: '',
  email: '',
  message: ''
});

// ❌ ПОГАНО - забув .value
name = 'New'; // Помилка!

// ✅ ДОБРЕ
name.value = 'New';
```

#### Props & Emits

```vue
<script setup lang="ts">
// ✅ ДОБРЕ - типізовані props
interface Props {
  title: string;
  count?: number;
}
const props = withDefaults(defineProps<Props>(), {
  count: 0
});

// ✅ ДОБРЕ - типізовані emits
interface Emits {
  (e: 'update', value: string): void;
  (e: 'close'): void;
}
const emit = defineEmits<Emits>();
</script>
```

#### Composables

```typescript
// ✅ ДОБРЕ - чітка відповідальність
export const useContactModal = () => {
  const isOpen = useState('contactModal', () => false);

  const open = () => { isOpen.value = true; };
  const close = () => { isOpen.value = false; };

  return { isOpen, open, close };
};

// ❌ ПОГАНО - забагато логіки в одному composable
export const useEverything = () => {
  // modal + form + validation + api + ...
};
```

---

## Telegram Integration Details

### Відправка повідомлень з форми

**Option 1: Через Telegram Bot API (рекомендовано)**

```typescript
// composables/useTelegram.ts
export const useTelegramNotification = () => {
  const config = useRuntimeConfig();

  const sendMessage = async (text: string) => {
    await $fetch(`https://api.telegram.org/bot${config.public.telegramBotToken}/sendMessage`, {
      method: 'POST',
      body: {
        chat_id: config.public.telegramChatId,
        text,
        parse_mode: 'HTML'
      }
    });
  };

  return { sendMessage };
};
```

**Option 2: Через власний API endpoint (якщо додається backend)**

```typescript
// server/api/telegram/send.post.ts
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  // Відправка через Telegram Bot API
  // ...
});
```

### Налаштування в nuxt.config.ts

```typescript
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      telegramBotToken: process.env.TELEGRAM_BOT_TOKEN,
      telegramChatId: process.env.TELEGRAM_CHAT_ID
    }
  }
});
```

### .env файл

```bash
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_CHAT_ID=your_chat_id_here
```

---

## shadcn-vue Components Usage

### Найчастіше використовувані компоненти

**Button**
```vue
<Button variant="default" size="lg" @click="handleClick">
  Click me
</Button>

<!-- Варіанти: default, destructive, outline, secondary, ghost, link -->
<!-- Розміри: default, sm, lg, icon -->
```

**Card**
```vue
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    Content
  </CardContent>
  <CardFooter>
    Footer
  </CardFooter>
</Card>
```

**Dialog (Modal)**
```vue
<Dialog v-model:open="isOpen">
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
      <DialogDescription>Description</DialogDescription>
    </DialogHeader>

    <!-- Content -->

    <DialogFooter>
      <Button @click="isOpen = false">Close</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

**Input & Form**
```vue
<div class="space-y-4">
  <div class="space-y-2">
    <Label for="email">Email</Label>
    <Input
      id="email"
      v-model="email"
      type="email"
      placeholder="your@email.com"
    />
  </div>
</div>
```

---

## Final Checklist

Перед commit перевір:

- [ ] Код відформатовано (Prettier/ESLint)
- [ ] Немає console.log / debugger
- [ ] Немає TODO коментарів
- [ ] TypeScript помилок немає
- [ ] Компоненти мають правильні типи props
- [ ] Tailwind класи використані замість inline styles
- [ ] shadcn-vue компоненти використані де можливо
- [ ] Responsive design працює (mobile, tablet, desktop)
- [ ] Accessibility: alt texts, aria-labels, semantic HTML
- [ ] Немає дублювання коду
- [ ] Код зрозумілий без коментарів

---

**Пам'ятай**: Простота > Складність. Якщо рішення виглядає складним - шукай простіший спосіб.
