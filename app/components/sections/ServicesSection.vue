<script setup lang="ts">
const services = [
  {
    title: 'ВЕБ-РОЗРОБКА',
    icon: '🖥️',
    items: ['Лендінги', 'Інтернет-магазини', 'CRM-системи', 'Корпоративні сайти'],
    price: '8K+',
    bgColor: 'bg-bg',
    borderColor: 'border-core',
    rotation: '-rotate-2',
    size: 'lg:col-span-2'
  },
  {
    title: 'ТЕЛЕГРАМ БОТИ',
    icon: '🤖',
    items: ['Чат-боти', 'Автоворонки', 'Support AI', 'Інтеграції CRM'],
    price: '5K+',
    bgColor: 'bg-yellow',
    borderColor: 'border-black',
    rotation: 'rotate-1',
    size: 'lg:col-span-1'
  },
  {
    title: 'AI РІШЕННЯ',
    icon: '🧠',
    items: ['Інтеграція GPT', 'Аналітика даних', 'Автоматизація', 'ML рішення'],
    price: 'Custom',
    bgColor: 'bg-black',
    borderColor: 'border-neon',
    rotation: '-rotate-1',
    size: 'lg:col-span-1',
    textWhite: true
  }
]

const emit = defineEmits<{
  openConsultation: []
}>()
</script>

<template>
  <section id="services" class="py-20 bg-bg relative overflow-hidden">

    <!-- Section Header -->
    <div class="max-w-7xl mx-auto px-4 mb-16">
      <div class="inline-block bg-core px-6 py-3 border-4 border-black rotate-2 shadow-brutal-md mb-6">
        <h2 class="text-5xl font-bold font-display text-black uppercase">Послуги</h2>
      </div>
      <p class="text-2xl font-bold text-black/70">
        <span class="text-core">///</span> Все, що потрібно для вашого бізнесу
      </p>
    </div>

    <!-- Bento Grid -->
    <div class="max-w-7xl mx-auto px-4">
      <div class="grid lg:grid-cols-4 gap-8">

        <div
          v-for="(service, i) in services"
          :key="i"
          :class="[
            service.size,
            service.rotation,
            service.bgColor,
            'border-8',
            service.borderColor,
            'p-8',
            'hover:shadow-brutal-xl',
            'hover:-translate-y-2',
            'transition-all duration-300',
            'group'
          ]"
        >
          <!-- Icon Badge -->
          <div class="inline-block mb-6">
            <div
              :class="[
                'w-20 h-20',
                service.textWhite ? 'bg-yellow' : 'bg-black',
                'border-4 border-black',
                'flex items-center justify-center',
                'text-4xl',
                i % 2 === 0 ? 'rotate-6' : '-rotate-6',
                'group-hover:rotate-0',
                'transition-transform'
              ]"
            >
              {{ service.icon }}
            </div>
          </div>

          <!-- Title -->
          <h3
            :class="[
              'text-3xl font-bold font-display mb-6',
              service.textWhite ? 'text-white' : 'text-black'
            ]"
          >
            {{ service.title }}
          </h3>

          <!-- Items List -->
          <ul class="space-y-3 mb-8">
            <li
              v-for="(item, j) in service.items"
              :key="j"
              :class="[
                'text-lg font-bold',
                service.textWhite ? 'text-white/90' : 'text-black/80'
              ]"
            >
              <span class="text-core">///</span> {{ item }}
            </li>
          </ul>

          <!-- Price Badge -->
          <div
            :class="[
              'inline-block',
              service.textWhite ? 'bg-neon' : 'bg-core',
              'px-6 py-3 border-4 border-black',
              i % 2 === 0 ? '-rotate-3' : 'rotate-3',
              'shadow-brutal-core',
              'mb-6'
            ]"
          >
            <span class="text-2xl font-bold text-black">
              {{ service.price }}
            </span>
          </div>

          <!-- CTA Button -->
          <Button
            :variant="service.textWhite ? 'yellow' : 'black'"
            size="md"
            :rotation="i % 2 === 0 ? 'rotate-1' : '-rotate-1'"
            full-width
            @click="emit('openConsultation')"
          >
            Замовити →
          </Button>

        </div>

      </div>

      <!-- Bottom CTA -->
      <div class="mt-16 text-center">
        <Button
          variant="yellow"
          size="xl"
          rotation="rotate-2"
          @click="emit('openConsultation')"
        >
          Безкоштовна Консультація →
        </Button>
      </div>
    </div>

  </section>
</template>
