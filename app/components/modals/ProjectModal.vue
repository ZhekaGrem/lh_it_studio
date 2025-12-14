<script setup lang="ts">
import type { Project } from '~/types/portfolio'
import { X, ExternalLink, Github, CheckCircle2, TrendingUp } from 'lucide-vue-next'

interface Props {
  isOpen: boolean
  project: Project | null
}

const props = defineProps<Props>()

const emit = defineEmits<{
  close: []
}>()
</script>

<template>
  <div
    v-if="isOpen && project"
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
  >
    <!-- Modal Container -->
    <div class="relative w-full max-w-5xl my-8">

      <!-- Floating Badge -->
      <div class="absolute -top-6 -right-6 bg-neon px-4 py-2 border-4 border-black rotate-12 shadow-brutal-md z-10 animate-pulse">
        <span class="font-bold text-black uppercase text-sm">{{ project.category }}</span>
      </div>

      <!-- Main Modal -->
      <div class="bg-bg border-8 border-black shadow-brutal-xl -rotate-1">

        <!-- Header -->
        <div class="bg-black px-6 py-4 border-b-4 border-black flex items-center justify-between">
          <h2 class="text-3xl font-bold font-display text-white uppercase pr-4">
            {{ project.title }}
          </h2>
          <button
            @click="emit('close')"
            class="w-10 h-10 bg-core text-black hover:bg-yellow border-4 border-white transition-colors flex-shrink-0"
          >
            <X class="w-6 h-6 mx-auto" />
          </button>
        </div>

        <!-- Modal Body -->
        <div class="p-8 space-y-8 max-h-[70vh] overflow-y-auto">

          <!-- Full Description -->
          <div class="space-y-4">
            <div class="inline-block bg-core px-4 py-2 border-4 border-black rotate-1">
              <h3 class="font-bold text-black uppercase text-sm">/// Про проект</h3>
            </div>
            <div class="bg-white border-4 border-black p-6 -rotate-1 shadow-brutal">
              <p class="text-black font-bold leading-relaxed whitespace-pre-line">
                {{ project.fullDescription }}
              </p>
            </div>
          </div>

          <!-- Technologies -->
          <div class="space-y-4">
            <div class="inline-block bg-yellow px-4 py-2 border-4 border-black -rotate-1">
              <h3 class="font-bold text-black uppercase text-sm">/// Технології</h3>
            </div>
            <div class="flex flex-wrap gap-3">
              <div
                v-for="tech in project.technologies"
                :key="tech.name"
                class="px-4 py-2 bg-white border-4 border-black hover:shadow-brutal transition-all"
              >
                <span class="text-lg mr-2">{{ tech.icon }}</span>
                <span class="font-bold text-black">{{ tech.name }}</span>
              </div>
            </div>
          </div>

          <!-- Features -->
          <div class="space-y-4">
            <div class="inline-block bg-pink px-4 py-2 border-4 border-black rotate-1">
              <h3 class="font-bold text-black uppercase text-sm">/// Можливості</h3>
            </div>
            <div class="grid md:grid-cols-2 gap-4">
              <div
                v-for="(feature, index) in project.features"
                :key="index"
                class="flex items-start gap-3 bg-white border-4 border-black p-4 hover:shadow-brutal transition-all"
                :class="index % 2 === 0 ? 'rotate-1' : '-rotate-1'"
              >
                <CheckCircle2 class="w-5 h-5 text-black flex-shrink-0 mt-1" />
                <p class="font-bold text-black text-sm leading-relaxed">
                  {{ feature }}
                </p>
              </div>
            </div>
          </div>

          <!-- Results -->
          <div class="space-y-4">
            <div class="inline-block bg-neon px-4 py-2 border-4 border-black -rotate-1">
              <h3 class="font-bold text-black uppercase text-sm">/// Результати</h3>
            </div>
            <div class="grid md:grid-cols-3 gap-6">
              <div
                v-for="(result, index) in project.results"
                :key="index"
                class="bg-black border-4 border-black p-6 text-center shadow-brutal-md"
                :class="index === 1 ? 'rotate-2' : index === 2 ? '-rotate-2' : ''"
              >
                <div class="flex items-center justify-center mb-3">
                  <TrendingUp class="w-8 h-8 text-core" />
                </div>
                <div class="text-4xl font-bold font-display text-core mb-2">
                  {{ result.value }}
                </div>
                <div class="text-sm font-bold text-white uppercase mb-2">
                  {{ result.metric }}
                </div>
                <div class="text-xs text-white/70 font-bold">
                  {{ result.description }}
                </div>
              </div>
            </div>
          </div>

          <!-- Links -->
          <div v-if="project.demoLink || project.githubLink" class="flex gap-4 pt-4">
            <Button
              v-if="project.demoLink"
              variant="primary"
              size="md"
              rotation="rotate-1"
              @click="() => window.open(project.demoLink, '_blank')"
            >
              <ExternalLink class="w-5 h-5 mr-2" />
              Переглянути проект
            </Button>
            <Button
              v-if="project.githubLink"
              variant="outline"
              size="md"
              rotation="-rotate-1"
              @click="() => window.open(project.githubLink, '_blank')"
            >
              <Github class="w-5 h-5 mr-2" />
              GitHub
            </Button>
          </div>

        </div>

        <!-- Footer CTA -->
        <div class="px-8 pb-6">
          <div class="bg-core border-4 border-black p-6 rotate-1 shadow-brutal-md">
            <div class="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h4 class="text-xl font-bold font-display text-black mb-1">
                  Потрібен подібний проект?
                </h4>
                <p class="text-sm font-bold text-black/70">
                  Обговоримо ваші завдання та створимо індивідуальне рішення
                </p>
              </div>
              <Button
                variant="black"
                size="lg"
                rotation="-rotate-2"
                @click="$emit('openConsultation'); emit('close')"
              >
                Замовити консультацію
              </Button>
            </div>
          </div>
        </div>

      </div>

      <!-- Decorative Element -->
      <div class="absolute -bottom-6 -left-6 w-24 h-24 bg-yellow border-4 border-black rotate-45 -z-10"></div>

    </div>
  </div>
</template>
