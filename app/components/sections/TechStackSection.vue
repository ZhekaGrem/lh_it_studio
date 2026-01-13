<script setup lang="ts">
import { techStack } from '@/types/technologies'
</script>

<template>
  <section class="py-20 bg-ink relative overflow-hidden">
      <!-- Section Header -->
      <div class="max-w-7xl mx-auto px-4 mb-16">
      <div class="inline-block bg-core px-6 py-3 border-4 border-black rotate-2 shadow-brutal-md mb-6">
        <h2 class="text-5xl font-bold font-display text-black uppercase">Tech Stack</h2>
      </div>
      <p class="text-2xl font-bold text-neon">
        <span class="text-core">///</span> Технології, з якими ми працюємо
      </p>
    </div>

    <!-- Tech Categories Grid -->
    <div class="max-w-7xl mx-auto px-4">
      <div class="grid lg:grid-cols-2 gap-8">

        <div
          v-for="(category, i) in techStack"
          :key="i"
          :class="[
            'bg-white border-8 border-black p-8',
            category.rotation,
            'hover:rotate-0',
            'transition-all duration-300',
            'group'
          ]"
          :style="{ boxShadow: `12px 12px 0px ${category.color}` }"
        >
          <!-- Category Badge -->
          <div
            :class="[
              'inline-block px-4 py-2 border-4 border-black mb-6',
              i % 2 === 0 ? 'rotate-3' : '-rotate-3',
              'group-hover:rotate-0',
              'transition-transform'
            ]"
            :style="{ backgroundColor: category.color }"
          >
            <h3 class="text-2xl font-bold font-display text-black uppercase">
              {{ category.title }}
            </h3>
          </div>

          <!-- Technologies Pills -->
          <div class="flex flex-wrap gap-3">
            <span
              v-for="(tech, j) in category.technologies"
              :key="j"
              class="inline-flex items-center px-4 py-2 bg-bg border-2 border-black font-tech text-sm font-medium text-black hover:bg-black hover:text-white transition-colors duration-200 cursor-default"
            >
              {{ tech }}
            </span>
          </div>
        </div>

      </div>
    </div>

    <!-- Bottom Decoration -->
      <div class="mt-16 border-t-4 border-core pt-8">
        <div class="max-w-7xl mx-auto px-4 flex flex-wrap justify-between items-center gap-4">
          <span class="font-tech text-black/70 text-sm">STACK /// UPDATED 2025</span>
          <span class="font-tech text-black/70 text-sm">50+ TECHNOLOGIES</span>
        </div>
      </div>
  </section>
</template>
