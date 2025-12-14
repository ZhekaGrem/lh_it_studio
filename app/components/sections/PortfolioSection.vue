<script setup lang="ts">
import type { Project } from '~/types/portfolio'
import { projects } from '~/data/projects'

const emit = defineEmits<{
  openProject: [project: Project]
  openConsultation: []
}>()

const handleViewDetails = (project: Project) => {
  emit('openProject', project)
}

const categories = ['Всі', 'E-Commerce', 'AI & Automation', 'Real Estate', 'Event Management']
const selectedCategory = ref('Всі')

const filteredProjects = computed(() => {
  if (selectedCategory.value === 'Всі') {
    return projects
  }
  return projects.filter(p => p.category === selectedCategory.value)
})
</script>

<template>
  <section id="portfolio" class="py-20 bg-bg relative overflow-hidden">

    <!-- Decorative Elements -->
    <div class="absolute top-20 left-10 w-32 h-32 bg-core border-4 border-black rotate-45 opacity-10"></div>
    <div class="absolute bottom-20 right-10 w-40 h-40 bg-yellow border-4 border-black -rotate-12 opacity-10"></div>

    <div class="max-w-7xl mx-auto px-4">

      <!-- Section Header -->
      <div class="text-center mb-16 space-y-6">

        <!-- Title -->
        <div class="inline-block bg-core px-6 py-3 border-4 border-black shadow-brutal-md rotate-1">
          <span class="text-sm font-bold text-black uppercase tracking-wider">
            /// Портфоліо
          </span>
        </div>

        <h2 class="text-5xl md:text-7xl font-bold font-display text-black leading-tight">
          НАШІ
          <span class="inline-block bg-yellow px-4 -rotate-2 border-4 border-black shadow-brutal-yellow">
            ПРОЕКТИ
          </span>
        </h2>

        <p class="text-xl font-bold text-black/70 max-w-2xl mx-auto">
          Реальні кейси автоматизації та розробки для бізнесу
        </p>

      </div>

      <!-- Category Filter -->
      <div class="flex flex-wrap justify-center gap-3 mb-12">
        <button
          v-for="category in categories"
          :key="category"
          @click="selectedCategory = category"
          :class="[
            'px-6 py-3 font-bold uppercase text-sm border-4 border-black transition-all',
            selectedCategory === category
              ? 'bg-black text-white shadow-brutal-md'
              : 'bg-white text-black hover:shadow-brutal hover:translate-x-[-2px] hover:translate-y-[-2px]'
          ]"
        >
          {{ category }}
        </button>
      </div>

      <!-- Projects Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
        <ProjectCard
          v-for="project in filteredProjects"
          :key="project.id"
          :project="project"
          @view-details="handleViewDetails"
        />
      </div>

      <!-- Empty State -->
      <div
        v-if="filteredProjects.length === 0"
        class="text-center py-20"
      >
        <div class="inline-block bg-yellow px-8 py-4 border-4 border-black shadow-brutal-md rotate-2">
          <p class="text-2xl font-bold text-black">
            Проектів не знайдено
          </p>
        </div>
      </div>

      <!-- CTA Section -->
      <div class="mt-20 text-center">
        <div class="relative inline-block">

          <!-- Badge -->
          <div class="absolute -top-6 -right-6 bg-neon px-4 py-2 border-4 border-black rotate-12 shadow-brutal-md z-10">
            <span class="font-bold text-black uppercase text-sm">Безкоштовна консультація</span>
          </div>

          <!-- Main CTA -->
          <div class="bg-black px-8 py-6 border-4 border-black shadow-brutal-xl -rotate-1">
            <h3 class="text-3xl font-bold font-display text-white mb-4">
              Хочете такий же проект?
            </h3>
            <p class="text-white/80 font-bold mb-6">
              Обговоримо ваші ідеї та створимо індивідуальне рішення
            </p>
            <Button
              variant="yellow"
              size="lg"
              rotation="rotate-2"
              @click="$emit('openConsultation')"
            >
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
