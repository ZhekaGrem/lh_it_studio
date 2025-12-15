<script setup lang="ts">
import type { Project } from '~/types/portfolio'
import { ExternalLink, ArrowRight } from 'lucide-vue-next'

interface Props {
  project: Project
}

const props = defineProps<Props>()

const emit = defineEmits<{
  viewDetails: [project: Project]
}>()

const handleClick = () => {
  emit('viewDetails', props.project)
}
</script>

<template>
  <div
    class="group relative cursor-pointer"
    :class="project.rotation"
    @click="handleClick"
  >
    <!-- Project Card -->
    <div
      class="border-4 border-black shadow-brutal-md transition-all duration-300 hover:shadow-brutal-xl hover:translate-x-[-4px] hover:translate-y-[-4px]"
      :class="project.backgroundColor"
    >

      <!-- Image Section -->
      <div class="relative h-64 overflow-hidden border-b-4 border-black bg-ink">
        <!-- Placeholder for project image -->
        <div class="absolute inset-0 flex items-center justify-center text-8xl opacity-20">
          {{ project.technologies[0]?.icon }}
        </div>

        <!-- Category Badge -->
        <div class="absolute top-4 left-4 bg-foreground px-3 py-1 border-2 border-black">
          <span class="text-xs font-bold text-white uppercase">
            {{ project.category }}
          </span>
        </div>

        <!-- Hover Overlay -->
        <div class="absolute inset-0 bg-foreground/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div class="text-white text-center space-y-2">
            <ArrowRight class="w-12 h-12 mx-auto animate-pulse" />
            <p class="font-bold uppercase text-sm">Детальніше</p>
          </div>
        </div>
      </div>

      <!-- Content Section -->
      <div class="p-6 space-y-4 bg-bg">

        <!-- Title -->
        <h3 class="text-2xl font-bold font-display text-black leading-tight">
          {{ project.title }}
        </h3>

        <!-- Short Description -->
        <p class="text-sm font-bold text-black/70 leading-relaxed line-clamp-3">
          {{ project.shortDescription }}
        </p>

        <!-- Technologies -->
        <div class="flex flex-wrap gap-2">
          <span
            v-for="tech in project.technologies.slice(0, 4)"
            :key="tech.name"
            class="px-2 py-1 text-xs font-bold border-2 border-black bg-white"
          >
            {{ tech.icon }} {{ tech.name }}
          </span>
          <span
            v-if="project.technologies.length > 4"
            class="px-2 py-1 text-xs font-bold border-2 border-black bg-white"
          >
            +{{ project.technologies.length - 4 }}
          </span>
        </div>

        <!-- View Details Button -->
        <div class="pt-2">
          <Button
            variant="black"
            size="sm"
            rotation=""
            full-width
            @click.stop="handleClick"
          >
            Дивитись проект
            <ArrowRight class="w-4 h-4 inline-block ml-2" />
          </Button>
        </div>

      </div>

    </div>

    <!-- Decorative Element -->
    <div
      class="absolute -bottom-2 -right-2 w-16 h-16 border-4 border-black -z-10"
      :class="project.backgroundColor"
    ></div>

  </div>
</template>
