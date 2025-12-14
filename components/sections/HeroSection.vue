<template>
  <section class="relative min-h-screen bg-bg flex items-center overflow-hidden">
    <div class="container mx-auto px-6 lg:px-12 py-20">
      <div class="grid lg:grid-cols-[70%_30%] gap-12 items-center">

        <!-- Left Content: 70% -->
        <div class="space-y-8">
          <!-- Main Headline -->
          <h1 class="font-display font-bold text-ink leading-tight tracking-tighter">
            <span class="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
              САЙТИ ТА БОТИ,
            </span>
            <span class="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
              ЩО ЗАРОБЛЯЮТЬ.
            </span>
          </h1>

          <!-- Sub-headline -->
          <p class="font-body text-xl md:text-2xl text-ink/80 max-w-2xl">
            Автоматизуємо бізнес, поки ви спите. <br class="hidden sm:block">
            Веб-студія <span class="font-bold">L&H.</span>
          </p>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-4">
            <!-- Primary Button: Acid Lime -->
            <button
              class="px-8 py-4 bg-core text-ink font-display font-bold text-sm tracking-wide uppercase
                     shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px]
                     transition-all duration-200 border-2 border-ink"
              @click="handleDiscussProject"
            >
              [ОБГОВОРИТИ ПРОЄКТ]
            </button>

            <!-- Secondary Button: Outline -->
            <button
              class="px-8 py-4 bg-transparent text-ink font-display font-bold text-sm tracking-wide uppercase
                     border-2 border-ink hover:bg-ink hover:text-bg
                     transition-all duration-200"
              @click="handleViewWorks"
            >
              [ДИВИТИСЯ РОБОТИ]
            </button>
          </div>

          <!-- Pixel Icons Row (optional decorative) -->
          <div class="flex gap-6 pt-4 opacity-60">
            <svg class="w-10 h-10 text-ink">
              <use href="/icons/pixel-sprites.svg#icon-browser" />
            </svg>
            <svg class="w-10 h-10 text-ink">
              <use href="/icons/pixel-sprites.svg#icon-robot" />
            </svg>
            <svg class="w-10 h-10 text-ink">
              <use href="/icons/pixel-sprites.svg#icon-brain" />
            </svg>
          </div>
        </div>

        <!-- Right Visual: 30% - Wireframe -->
        <div class="relative hidden lg:block">
          <WireframeVisualization />
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const handleDiscussProject = () => {
  // TODO: Open contact modal
  console.log('Open contact form');
};

const handleViewWorks = () => {
  // TODO: Scroll to portfolio section
  console.log('Scroll to portfolio');
};
</script>
