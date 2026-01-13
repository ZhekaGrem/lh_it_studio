<script setup lang="ts">
import type { Project, ProjectSection } from '~/types/portfolio'
import { projects as allProjects } from '~/data/projects'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
// --- Mapper: Project → ProjectSection ---
const mapProjectToSection = (p: Project): ProjectSection => ({
  id: p.id,
  title: p.title,
  category: p.category,
  description: p.shortDescription,
  tech: p.technologies.map(t => t.name),
  image: p.image,
  laptopImage: p.laptopImage,
  phoneImage: p.phoneImage,
  url: `/projects/${p.id}`,
  stats: p.results.slice(0, 2).map(r => ({
    label: r.metric,
    value: r.value
  }))
})

// --- Data ---
const projects: ProjectSection[] = allProjects.map(mapProjectToSection)

// --- State ---
const currentIndex = ref(0)
const isAnimating = ref(false)
const direction = ref<'left' | 'right'>('right')
let autoAdvanceTimer: NodeJS.Timeout | null = null

const currentProject = computed(() => projects[currentIndex.value]!)

// --- Methods ---
const startAnimation = (dir: 'left' | 'right', nextIndex: number) => {
  if (isAnimating.value) return
  
  direction.value = dir
  isAnimating.value = true
  currentIndex.value = nextIndex

  // Reset animation lock after CSS transitions finish (600ms match CSS)
  setTimeout(() => {
    isAnimating.value = false
  }, 600)
}

const handleNext = () => {
  const next = (currentIndex.value + 1) % projects.length
  startAnimation('right', next)
  resetAutoAdvance()
}

const handlePrev = () => {
  const prev = (currentIndex.value - 1 + projects.length) % projects.length
  startAnimation('left', prev)
  resetAutoAdvance()
}

const goToSlide = (index: number) => {
  if (isAnimating.value || index === currentIndex.value) return
  const dir = index > currentIndex.value ? 'right' : 'left'
  startAnimation(dir, index)
  resetAutoAdvance()
}

// --- Auto Advance ---
const resetAutoAdvance = () => {
  if (autoAdvanceTimer) clearInterval(autoAdvanceTimer)
  autoAdvanceTimer = setInterval(handleNext, 5000)
}

onMounted(() => {
  resetAutoAdvance()
})

onUnmounted(() => {
  if (autoAdvanceTimer) clearInterval(autoAdvanceTimer)
})
</script>

<template>
  <section class="py-20 bg-ink relative overflow-hidden text-white">
    <div class="bg-gradient-to-b from-transparent via-white to-transparent animate-scanline w-full h-full absolute"/>
    <div class="container">
      <div class="flex items-end justify-between flex-wrap gap-4">
        <div>
          <div class="inline-block bg-yellow px-6 py-3 border-4 border-white rotate-2 shadow-brutal-core mb-4">
            <h2 class="text-4xl md:text-5xl font-bold font-display text-ink uppercase">Проєкти</h2>
          </div>
          <p class="text-xl md:text-2xl font-bold text-white/70 font-display ">
            <span class="text-core">///</span>Наші реалізовані рішення
          </p>
        </div>
        <div class="bg-core px-6 py-3 border-4 border-white -rotate-2 shadow-brutal">
          <span class="text-2xl md:text-3xl font-bold font-mono text-ink">
            {{ String(currentIndex + 1).padStart(2, '0') }} / {{ String(projects.length).padStart(2, '0') }}
          </span>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="relative ">
        
        <div class="relative">
          <div class="absolute top-0 left-0 right-0 h-12  pointer-events-none" />
          
          <div class="absolute top-4 left-1/2 -translate-x-1/2 bg-ink px-4 py-1 rounded-full border-2 border-core z-10">
            <span class="text-xs font-bold text-core font-mono tracking-widest">LH_STUDIO</span>
          </div>

          <div class="relative border-4 border-[#1A1A1A] overflow-hidden ">
            
            <div class="absolute inset-0 pointer-events-none z-20 opacity-10">
              <div class="absolute inset-0 " />
            </div>
            <div class="absolute inset-0 pointer-events-none z-10 " />

            <div class="grid lg:grid-cols-2 h-full relative z-0">
              
              <div class="relative flex flex-col justify-center   border-core/20">
                <div :key="currentIndex"> <div 
                    class="inline-block mb-6 bg-core px-4 py-2  border-white origin-left"
                    :class="direction === 'right' ? 'animate-slide-in-left' : 'animate-slide-in-right'"
                    style="transform: rotate(-2deg);"
                  >
                    <span class="text-xl font-bold font-mono text-ink">PROJECT #{{ currentProject.id }}</span>
                  </div>

                  <h3 
                    class="text-3xl md:text-5xl font-bold font-display text-white mb-4 leading-tight"
                    :class="direction === 'right' ? 'animate-slide-in-left-delayed' : 'animate-slide-in-right-delayed'"
                  >
                    {{ currentProject.title }}
                  </h3>

                  <div 
                    class="inline-block mb-6 px-4 py-1 bg-yellow border-2 border-black"
                    :class="direction === 'right' ? 'animate-slide-in-left-delayed-2' : 'animate-slide-in-right-delayed-2'"
                  >
                    <span class="text-sm font-bold text-ink uppercase font-mono">{{ currentProject.category }}</span>
                  </div>

                  <p 
                    class="text-lg text-white/80 font-medium mb-6 leading-relaxed"
                    :class="direction === 'right' ? 'animate-fade-in-up' : 'animate-fade-in-down'"
                  >
                    {{ currentProject.description }}
                  </p>

                  <div 
                    class="flex flex-wrap gap-2 mb-8"
                    :class="direction === 'right' ? 'animate-fade-in-up-delayed' : 'animate-fade-in-down-delayed'"
                  >
                    <span 
                      v-for="(tech, i) in currentProject.tech" 
                      :key="i"
                      class="px-3 py-1 bg-ink border-2 border-neon text-neon text-xs font-bold font-mono uppercase"
                    >
                      {{ tech }}
                    </span>
                  </div>

                  <div 
                    v-if="currentProject.stats"
                    class="grid grid-cols-2 gap-4 mb-8"
                    :class="direction === 'right' ? 'animate-fade-in-up-delayed-2' : 'animate-fade-in-down-delayed-2'"
                  >
                    <div v-for="(stat, i) in currentProject.stats" :key="i" class="bg-ink/50 border-2 border-core p-3">
                      <p class="text-2xl font-bold text-core mb-1">{{ stat.value }}</p>
                      <p class="text-xs font-bold text-white/60 uppercase font-mono">{{ stat.label }}</p>
                    </div>
                  </div>

                  <NuxtLink 
                    :to="currentProject.url"
                    class="inline-flex items-center gap-3 px-6 py-3 bg-core text-ink font-bold text-lg uppercase border-4 border-white hover:shadow-brutal-yellow transition-all duration-300 group"
                    :class="direction === 'right' ? 'animate-fade-in-up-delayed-3' : 'animate-fade-in-down-delayed-3'"
                    style="transform: rotate(-1deg);"
                  >
                    Дивитись
                    <ExternalLink class="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </NuxtLink>
                </div>
              </div>

              <div class="relative overflow-hidden min-h-[500px] lg:min-h-auto flex items-center justify-center">
                <div
                  :key="currentIndex"
                  class="absolute inset-0 w-full h-full flex items-center justify-center"
                  :class="direction === 'right' ? 'animate-slide-in-right-image' : 'animate-slide-in-left-image'"
                >
                  <img v-if="currentProject.laptopImage" :src="currentProject.laptopImage" :alt="`${currentProject.title} - ноутбук`" class="laptop-3d absolute left-[30%] top-[45%]  object-contain z-0" />
                  <img v-if="currentProject.phoneImage" :src="currentProject.phoneImage" :alt="`${currentProject.title} - телефон`" class="phone-rotate absolute right-[16%] top-[55%] w-[11%] h-auto object-contain z-0" />
                  <img v-if="currentProject.image" :src="currentProject.image" :alt="`${currentProject.title}`" class="absolute inset-0 w-full h-full object-contain z-20 pointer-events-none" />
                </div>
                
                <div class="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div class="absolute inset-0 bg-core mix-blend-screen opacity-20 animate-glitch-fast" />
                </div>
              </div>

            </div>

            <div class="absolute bottom-6 right-6 flex items-center gap-3 z-30">
              <button 
                @click="handlePrev" 
                :disabled="isAnimating"
                class="w-12 h-12 bg-ink border-4 border-white text-white hover:bg-core hover:text-ink hover:border-core disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center rotate-2 hover:rotate-0 shadow-sm"
              >
                <ChevronLeft class="w-6 h-6" />
              </button>
              <button 
                @click="handleNext" 
                :disabled="isAnimating"
                class="w-12 h-12 bg-core border-4 border-white text-ink hover:bg-yellow hover:border-yellow disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center -rotate-2 hover:rotate-0 shadow-sm"
              >
                <ChevronRight class="w-6 h-6" />
              </button>
            </div>

            <div class="absolute bottom-6 left-6 flex items-center gap-2 z-30">
              <button 
                v-for="(p, i) in projects" 
                :key="i"
                @click="goToSlide(i)"
                class="h-2 transition-all duration-300 border-2 border-white"
                :class="i === currentIndex ? 'w-10 bg-core' : 'w-2 bg-white/20 hover:bg-white/40'"
              />
            </div>

          </div> 
      

        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* --- KEYFRAMES --- */

/* Slide Content */
@keyframes slide-in-left { from { opacity: 0; transform: translateX(-100px) rotate(-2deg); } to { opacity: 1; transform: translateX(0) rotate(-2deg); }}
@keyframes slide-in-left-d { from { opacity: 0; transform: translateX(-80px); } to { opacity: 1; transform: translateX(0); }}
@keyframes slide-in-right { from { opacity: 0; transform: translateX(100px) rotate(-2deg); } to { opacity: 1; transform: translateX(0) rotate(-2deg); }}
@keyframes slide-in-right-d { from { opacity: 0; transform: translateX(80px); } to { opacity: 1; transform: translateX(0); }}

/* Slide Image */
@keyframes slide-right-img { from { opacity: 0; transform: translateX(100%); } to { opacity: 1; transform: translateX(0); }}
@keyframes slide-left-img { from { opacity: 0; transform: translateX(-100%); } to { opacity: 1; transform: translateX(0); }}

/* Fade Vertical */
@keyframes fade-up { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); }}
@keyframes fade-down { from { opacity: 0; transform: translateY(-30px); } to { opacity: 1; transform: translateY(0); }}
@keyframes fade-up-rot { from { opacity: 0; transform: translateY(20px) rotate(-1deg); } to { opacity: 1; transform: translateY(0) rotate(-1deg); }}

/* Effects */
@keyframes scanline { 0% { transform: translateY(-100%); } 100% { transform: translateY(100%); }}
@keyframes glitch-fast { 0%, 100% { transform: translate(0); } 20% { transform: translate(-3px, 3px); } 40% { transform: translate(3px, -3px); } 60% { transform: translate(-2px, 2px); } 80% { transform: translate(2px, -2px); }}

/* --- ANIMATION CLASSES --- */
.animate-scanline { animation: scanline 8s linear infinite; }
.animate-glitch-fast { animation: glitch-fast 0.2s ease-in-out infinite; }

/* Dynamic Animations (Left Dir) */
.animate-slide-in-left { animation: slide-in-left 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
.animate-slide-in-left-delayed { animation: slide-in-left-d 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards; opacity: 0; }
.animate-slide-in-left-delayed-2 { animation: slide-in-left-d 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards; opacity: 0; }
.animate-slide-in-left-image { animation: slide-left-img 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

/* Dynamic Animations (Right Dir) */
.animate-slide-in-right { animation: slide-in-right 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
.animate-slide-in-right-delayed { animation: slide-in-right-d 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards; opacity: 0; }
.animate-slide-in-right-delayed-2 { animation: slide-in-right-d 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards; opacity: 0; }
.animate-slide-in-right-image { animation: slide-right-img 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

/* Fades */
.animate-fade-in-up { animation: fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards; opacity: 0; }
.animate-fade-in-up-delayed { animation: fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards; opacity: 0; }
.animate-fade-in-up-delayed-2 { animation: fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.4s forwards; opacity: 0; }
.animate-fade-in-up-delayed-3 { animation: fade-up-rot 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.5s forwards; opacity: 0; }

.animate-fade-in-down { animation: fade-down 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards; opacity: 0; }
.animate-fade-in-down-delayed { animation: fade-down 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards; opacity: 0; }
.animate-fade-in-down-delayed-2 { animation: fade-down 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.4s forwards; opacity: 0; }
.animate-fade-in-down-delayed-3 { animation: fade-up-rot 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.5s forwards; opacity: 0; }

/* --- 3D TRANSFORMS --- */
.laptop-3d { transform: translateY(-47%) rotateY(-30deg) rotateZ(5deg) rotateX(-4deg); transform-origin: left center; }
.phone-rotate { transform: translateY(-50%) rotate(2deg); }
</style>