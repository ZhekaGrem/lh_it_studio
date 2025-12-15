<script setup lang="ts">
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const reasons = [
  {
    badge: '01',
    title: 'ШВИДКІСТЬ',
    desc: 'Здаємо проєкт за 7 днів.',
    details: 'Ми використовуємо Agile методологію та сучасний стек технологій, що дозволяє розробляти MVP за тиждень. Готові компоненти shadcn-vue, налаштовані CI/CD пайплайни та автоматизоване тестування прискорюють процес у 3 рази порівняно зі стандартною розробкою.',
    color: '#FF4D00',
    rotation: '-rotate-2'
  },
  {
    badge: '02',
    title: 'ПРОЗОРІСТЬ',
    desc: 'Ніяких прихованих доплат.',
    details: 'Фіксована ціна обговорюється на старті. Ви отримуєте детальну кошторисну відомість з розбивкою по етапах. Щоденні звіти в Telegram, доступ до GitHub репозиторію в реальному часі. Оплата частинами після завершення кожного етапу.',
    color: '#FFD700',
    rotation: 'rotate-1'
  },
  {
    badge: '03',
    title: 'ТЕХНОЛОГІЇ',
    desc: 'Next.js, Python, AI.',
    details: 'Nuxt 4 + Vue 3 для швидких та SEO-оптимізованих сайтів. Python + FastAPI для потужних backend систем. Telegram Bot API для автоматизації бізнес-процесів. AI інтеграції (OpenAI, Claude) для інтелектуальних рішень. TypeScript для надійного коду без помилок.',
    color: '#00FF00',
    rotation: '-rotate-1'
  }
]
</script>

<template>
  <section class="py-20 bg-ink relative overflow-hidden">

    <!-- Section Header -->
    <div class="max-w-7xl mx-auto px-4 mb-16 text-center">
      <h2 class="text-6xl font-bold font-display text-white uppercase mb-4 ">
        Чому Ми?
      </h2>
      <div class="w-32 h-2 bg-core mx-auto"></div>
    </div>

    <!-- Stacked Cards -->
    <div class="max-w-5xl mx-auto px-4">
      <div class="space-y-8">
        <div
          v-for="(reason, i) in reasons"
          :key="i"
          :class="[
            'relative bg-white border-8 border-black p-8',
            reason.rotation,
            'hover:rotate-0',
            'transition-all duration-300',
            'group'
          ]"
          :style="{ boxShadow: `16px 16px 0px ${reason.color}` }"
        >
          <!-- Floating Badge -->
          <div
            :class="[
              'absolute -top-8 -left-8',
              'w-24 h-24 flex items-center justify-center',
              'border-8 border-black',
              'text-4xl font-bold text-black',
              i % 2 === 0 ? 'rotate-12' : '-rotate-12',
              'shadow-brutal-md',
              'z-10'
            ]"
            :style="{ backgroundColor: reason.color }"
          >
            {{ reason.badge }}
          </div>

          <div class="ml-16">
            <Accordion type="single" collapsible>
              <AccordionItem :value="`item-${i}`" class="border-none">
                <AccordionTrigger class="hover:no-underline py-0 pb-4">
                  <div>
                    <h3 class="text-4xl font-bold font-display text-black mb-2 uppercase text-left">
                      {{ reason.title }}
                    </h3>
                    <p class="text-2xl font-bold text-black/70 text-left">{{ reason.desc }}</p>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div class="pt-4 border-t-4 border-black mt-2">
                    <p class="text-lg text-black/80 leading-relaxed">
                      {{ reason.details }}
                    </p>
                    <!-- Accent Line -->
                    <div
                      class="mt-6 h-2 w-32"
                      :style="{ backgroundColor: reason.color }"
                    ></div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

        </div>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="max-w-7xl mx-auto px-4 mt-20">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div
          v-for="(stat, i) in [
            { number: '50+', label: 'Проєктів', color: '#FF4D00' },
            { number: '7', label: 'Днів', color: '#FFD700' },
            { number: '100%', label: 'Якість', color: '#00FF00' },
            { number: '24/7', label: 'Підтримка', color: '#FF006E' }
          ]"
          :key="i"
          :class="[
            'bg-white border-4 border-black p-6 text-center',
            i % 2 === 0 ? 'rotate-2' : '-rotate-2',
            'hover:rotate-0',
            'hover:shadow-brutal-lg',
            'transition-all'
          ]"
        >
          <p
            class="text-5xl font-bold mb-2"
            :style="{ color: stat.color }"
          >
            {{ stat.number }}
          </p>
          <p class="text-sm font-bold text-black uppercase">{{ stat.label }}</p>
        </div>
      </div>
    </div>

    <!-- Bottom Decoration -->
    <div class="mt-16 border-t-4 border-core pt-8 font-pixel">
      <div class="max-w-7xl mx-auto px-4 flex flex-wrap justify-between items-center gap-4">
        <span class="font-mono text-white text-sm">TECHNICAL SPEC /// V1.0</span>
        <span class="font-mono text-white text-sm">VERIFIED /// 2025</span>
      </div>
    </div>

  </section>
</template>
