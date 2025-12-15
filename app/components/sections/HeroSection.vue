<script setup lang="ts">
const emit = defineEmits<{
  openConsultation: []
}>()
</script>

<template>
  <section class="min-h-screen bg-bg relative overflow-hidden pt-32 pb-20">

    <!-- Decorative Elements -->
    <div class="absolute top-20 right-10 w-32 h-32 bg-yellow border-4 border-black rotate-45 -z-10"></div>
    <div class="absolute bottom-20 left-10 w-24 h-24 bg-core border-4 border-black rotate-12 -z-10"></div>

    <div class="max-w-7xl mx-auto px-4">
      <div class="grid lg:grid-cols-2 gap-12 items-center">

        <!-- Left Content -->
        <div class="space-y-8">

          <!-- Floating Badge -->
          <div class="inline-block bg-neon px-4 py-2 border-4 border-black rotate-3 shadow-brutal-md">
            <span class="font-bold text-black uppercase text-sm">Available Now ✓</span>
          </div>

          <!-- H1 with Colored Blocks -->
          <h1 class="text-5xl md:text-7xl font-bold font-display leading-tight text-black">
            САЙТИ ТА
            <span class="inline-block bg-core px-3 rotate-2 border-4 border-black shadow-brutal-core">
              БОТИ
            </span>,<br />
            ЩО
            <span class="inline-block bg-yellow px-3 -rotate-2 border-4 border-black shadow-brutal-yellow">
              ЗАРОБЛЯЮТЬ
            </span>.
          </h1>

          <!-- Subtitle -->
          <p class="text-xl md:text-2xl text-black/80 font-bold max-w-xl">
            <span class="text-core">///</span> Автоматизуємо бізнес, поки ви спите. Веб-студія L&H.
          </p>

          <!-- CTA Buttons -->
          <div class="flex flex-wrap gap-4">
            <Button
              variant="primary"
              size="lg"
              rotation="rotate-2"
              @click="emit('openConsultation')"
              class="group"
            >
              Обговорити Проєкт
              <span class="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </Button>

            <a
              href="#portfolio"
              class="
                inline-flex items-center justify-center
                px-8 py-4 bg-transparent text-black font-bold text-lg uppercase
                border-4 border-black -rotate-1
                hover:rotate-0 hover:bg-yellow hover:shadow-brutal-lg
                transition-all duration-300
              "
            >
              Дивитися Роботи
            </a>
          </div>

          <!-- Tech Icons (Pixelated) -->
          <div class="flex gap-6 pt-4">
            <div
              v-for="(icon, i) in ['🖥️', '🤖', '🧠']"
              :key="i"
              :class="[
                'w-16 h-16 bg-foreground border-4 border-black flex items-center justify-center text-3xl',
                'hover:bg-core hover:-translate-y-2 transition-all cursor-pointer',
                i % 2 === 0 ? 'rotate-2' : '-rotate-2'
              ]"
            >
              {{ icon }}
            </div>
          </div>

        </div>

        <!-- Right Content - 3D Wireframe -->
        <div class="relative h-[500px] flex items-center justify-center">
          <div class="absolute inset-0 bg-gradient-to-br from-core/20 to-yellow/20 blur-3xl"></div>

          <!-- Animated 3D Element -->
          <div class="relative w-full h-full border-4 border-black bg-foreground/5 rotate-3 shadow-brutal-xl">
            <svg viewBox="0 0 400 400" class="w-full h-full">
              <!-- Grid -->
              <g stroke="#FF4D00" stroke-width="2" opacity="0.3">
                <line v-for="i in 10" :key="`v-${i}`" :x1="i * 40" y1="0" :x2="i * 40" y2="400" />
                <line v-for="i in 10" :key="`h-${i}`" x1="0" :y1="i * 40" x2="400" :y2="i * 40" />
              </g>

              <!-- Rotating Cube -->
              <g class="animate-spin-slow origin-center">
                <rect x="150" y="150" width="100" height="100" fill="none" stroke="#FFD700" stroke-width="4" />
                <rect x="170" y="130" width="100" height="100" fill="none" stroke="#FF4D00" stroke-width="4" />
                <line x1="150" y1="150" x2="170" y2="130" stroke="#111" stroke-width="2" />
                <line x1="250" y1="150" x2="270" y2="130" stroke="#111" stroke-width="2" />
                <line x1="150" y1="250" x2="170" y2="230" stroke="#111" stroke-width="2" />
                <line x1="250" y1="250" x2="270" y2="230" stroke="#111" stroke-width="2" />
              </g>

              <!-- Orbiting Circle -->
              <circle cx="200" cy="200" r="120" fill="none" stroke="#FF4D00" stroke-width="2" stroke-dasharray="5,5">
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 200 200"
                  to="360 200 200"
                  dur="10s"
                  repeatCount="indefinite"
                />
              </circle>
            </svg>
          </div>

          <!-- Floating Stats -->
          <div class="absolute -bottom-8 -left-8 bg-yellow px-6 py-3 border-4 border-black rotate-6 shadow-brutal-md">
            <p class="text-4xl font-bold text-black">50+</p>
            <p class="text-sm font-bold text-black/70 uppercase">Проєктів</p>
          </div>

          <div class="absolute -top-8 -right-8 bg-core px-6 py-3 border-4 border-black -rotate-6 shadow-brutal-md">
            <p class="text-4xl font-bold text-black">7</p>
            <p class="text-sm font-bold text-black/70 uppercase">Днів</p>
          </div>

        </div>

      </div>
    </div>
  </section>
</template>
