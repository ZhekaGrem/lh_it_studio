<script setup lang="ts">
defineEmits<{
  openConsultation: []
}>()
</script>

<template>
  <section id="portfolio-cta" class="py-20 bg-bg relative overflow-hidden">

    <!-- Decorative Elements -->
    <div class="absolute top-20 left-10 w-32 h-32 bg-core border-4 border-black rotate-45 opacity-10"></div>
    <div class="absolute bottom-20 right-10 w-40 h-40 bg-yellow border-4 border-black -rotate-12 opacity-10"></div>

    <div class="max-w-7xl mx-auto px-4">

      <!-- CTA Section -->
      <div class="text-center">
        <div class="relative inline-block">

          <!-- Badge -->
          <div class="absolute -top-6 -right-6 bg-neon px-4 py-2 border-4 border-black rotate-12 shadow-brutal-md z-10">
            <span class="font-bold text-black uppercase text-sm">Безкоштовна консультація</span>
          </div>

          <!-- Main CTA -->
          <div class="bg-ink px-8 py-6 border-4 border-black shadow-brutal-xl-core -rotate-1">
            <h3 class="text-3xl font-bold font-display text-white mb-4">
              Хочете такий же проект?
            </h3>
            <p class="text-white/80 font-bold mb-6">
              Обговоримо ваші ідеї та створимо індивідуальне рішення
            </p>
            <Button variant="yellow" size="lg" rotation="rotate-2" @click="$emit('openConsultation')">
              Замовити проект
            </Button>
          </div>

          <!-- Decorative Element -->
          <div class="absolute -bottom-4 -left-4 w-20 h-20 bg-core border-4 border-black -z-10"></div>

        </div>
      </div>

    </div>

  </section>
</template>
