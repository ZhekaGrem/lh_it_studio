<script setup lang="ts">
import { projects } from '~/data/projects'
import { ChevronLeft } from 'lucide-vue-next'
const route = useRoute()
const router = useRouter()

// Get project by ID
const project = computed(() =>
  projects.find(p => p.id === route.params.id)
)

// Redirect if project not found
if (!project.value) {
  navigateTo('/')
}

// Modal state
const isConsultationOpen = ref(false)

const openConsultation = () => {
  isConsultationOpen.value = true
}

const closeConsultation = () => {
  isConsultationOpen.value = false
}

const goBack = () => {
  router.back()
}
</script>

<template>
  <div v-if="project" class="min-h-screen bg-bg">

    <!-- Header -->
    <Header @open-consultation="openConsultation" />

    <!-- Hero Section -->
    <section class="pt-32 pb-16 bg-ink text-white relative overflow-hidden">

      <!-- Decorative Elements -->
      <div class="absolute top-20 right-10 w-40 h-40 bg-core border-4 border-white rotate-12 opacity-20"></div>
      <div class="absolute bottom-10 left-20 w-32 h-32 bg-yellow border-4 border-white -rotate-12 opacity-20"></div>

      <div class="max-w-7xl mx-auto px-4">

        <!-- Back Button -->
        <button
          @click="goBack"
          class="mb-8 inline-flex items-center gap-2 px-6 py-3 bg-white text-ink font-bold uppercase border-4 border-white hover:bg-core hover:border-core transition-all shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px]"
        >
          <ChevronLeft class="w-5 h-5" />
          Назад
        </button>

        <div class="grid lg:grid-cols-2 gap-12 items-center">

          <!-- Left: Info -->
          <div>
            <!-- Category Badge -->
            <div class="inline-block mb-6 bg-yellow px-6 py-2 border-4 border-white rotate-2 shadow-brutal-md">
              <span class="text-sm font-bold text-ink uppercase font-mono">{{ project.category }}</span>
            </div>

            <!-- Title -->
            <h1 class="text-5xl md:text-7xl font-bold font-display text-white mb-6 leading-tight">
              {{ project.title }}
            </h1>

            <!-- Short Description -->
            <p class="text-2xl text-white/80 font-bold mb-8 leading-relaxed">
              {{ project.shortDescription }}
            </p>

            <!-- Technologies -->
            <div class="flex flex-wrap gap-3">
              <span
                v-for="tech in project.technologies.slice(0, 4)"
                :key="tech.name"
                class="px-4 py-2 bg-ink border-2 border-neon text-neon text-sm font-bold font-mono uppercase flex items-center gap-2"
              >
                <img v-if="tech.icon.startsWith('/')" :src="tech.icon" :alt="tech.name" class="w-5 h-5" />
                <span v-else>{{ tech.icon }}</span>
                {{ tech.name }}
              </span>
            </div>
          </div>

          <!-- Right: Image -->
          <div class="relative">
            <div class="bg-white border-8 border-white shadow-brutal-xl rotate-2 overflow-hidden">
              <img
                :src="project.image"
                :alt="project.title"
                class="w-full h-auto object-cover"
              />
            </div>
            <div class="absolute -bottom-4 -left-4 w-full h-full bg-core border-4 border-white -z-10"></div>
          </div>

        </div>
      </div>
    </section>

    <!-- Results Section -->
    <section class="py-20 bg-bg relative">

      <div class="max-w-7xl mx-auto px-4">

        <!-- Section Title -->
        <div class="text-center mb-16">
          <div class="inline-block bg-core px-6 py-3 border-4 border-black shadow-brutal-md -rotate-1">
            <span class="text-sm font-bold text-black uppercase tracking-wider">/// Результати</span>
          </div>
          <h2 class="text-4xl md:text-6xl font-bold font-display text-black mt-6 leading-tight">
            Що отримав бізнес?
          </h2>
        </div>

        <!-- Results Grid -->
        <div class="grid md:grid-cols-3 gap-8">
          <div
            v-for="(result, index) in project.results"
            :key="index"
            class="bg-white border-4 border-black shadow-brutal p-8 hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
            :class="[
              index % 3 === 0 ? 'rotate-1' : '',
              index % 3 === 1 ? '-rotate-1' : '',
              index % 3 === 2 ? 'rotate-2' : ''
            ]"
          >
            <div class="text-6xl font-bold font-display text-core mb-4">
              {{ result.value }}
            </div>
            <h3 class="text-xl font-bold text-black mb-3 uppercase">
              {{ result.metric }}
            </h3>
            <p class="text-black/70 font-medium leading-relaxed">
              {{ result.description }}
            </p>
          </div>
        </div>

      </div>
    </section>

    <!-- About Project Section -->
    <section class="py-20 bg-ink text-white">

      <div class="max-w-5xl mx-auto px-4">

        <!-- Section Title -->
        <div class="mb-12">
          <div class="inline-block bg-yellow px-6 py-3 border-4 border-white rotate-2 shadow-brutal-core mb-6">
            <span class="text-sm font-bold text-ink uppercase tracking-wider">/// Про проект</span>
          </div>
          <h2 class="text-4xl md:text-5xl font-bold font-display text-white leading-tight">
            Як це працює?
          </h2>
        </div>

        <!-- Full Description -->
        <div class="prose prose-invert prose-lg max-w-none">
          <p class="text-xl text-white/90 leading-relaxed whitespace-pre-line">
            {{ project.fullDescription }}
          </p>
        </div>

      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20 bg-bg">

      <div class="max-w-7xl mx-auto px-4">

        <!-- Section Title -->
        <div class="text-center mb-16">
          <div class="inline-block bg-neon px-6 py-3 border-4 border-black shadow-brutal-md rotate-1">
            <span class="text-sm font-bold text-black uppercase tracking-wider">/// Можливості</span>
          </div>
          <h2 class="text-4xl md:text-6xl font-bold font-display text-black mt-6 leading-tight">
            Що входить в систему?
          </h2>
        </div>

        <!-- Features Grid -->
        <div class="grid md:grid-cols-2 gap-6">
          <div
            v-for="(feature, index) in project.features"
            :key="index"
            class="flex items-start gap-4 bg-white border-4 border-black shadow-brutal p-6 hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
          >
            <!-- Icon -->
            <div class="flex-shrink-0 w-10 h-10 bg-core border-4 border-black flex items-center justify-center font-bold text-black text-xl">
              ✓
            </div>

            <!-- Feature Text -->
            <p class="text-lg font-medium text-black leading-relaxed">
              {{ feature }}
            </p>
          </div>
        </div>

      </div>
    </section>

    <!-- Technologies Section -->
    <section class="py-20 bg-white">

      <div class="max-w-5xl mx-auto px-4">

        <!-- Section Title -->
        <div class="text-center mb-12">
          <div class="inline-block bg-ink px-6 py-3 border-4 border-black shadow-brutal-md -rotate-1">
            <span class="text-sm font-bold text-white uppercase tracking-wider">/// Технології</span>
          </div>
          <h2 class="text-3xl md:text-5xl font-bold font-display text-black mt-6 leading-tight">
            На чому побудовано?
          </h2>
          <p class="text-xl text-black/70 font-bold mt-4">
            Сучасні технології для надійності та швидкості
          </p>
        </div>

        <!-- Technologies Grid -->
        <div class="flex flex-wrap justify-center gap-4">
          <div
            v-for="tech in project.technologies"
            :key="tech.name"
            class="px-6 py-4 bg-bg border-4 border-black shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
          >
            <div class="flex items-center gap-3">
              <img v-if="tech.icon.startsWith('/')" :src="tech.icon" :alt="tech.name" class="w-10 h-10" />
              <span v-else class="text-3xl">{{ tech.icon }}</span>
              <span class="text-lg font-bold text-black uppercase">{{ tech.name }}</span>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-ink relative overflow-hidden">

      <!-- Decorative Elements -->
      <div class="absolute top-10 left-10 w-40 h-40 bg-core border-4 border-white rotate-45 opacity-20"></div>
      <div class="absolute bottom-10 right-10 w-32 h-32 bg-yellow border-4 border-white -rotate-12 opacity-20"></div>

      <div class="max-w-4xl mx-auto px-4 text-center relative z-10">

        <!-- Badge -->
        <div class="inline-block mb-8 bg-neon px-6 py-3 border-4 border-white rotate-2 shadow-brutal-md">
          <span class="font-bold text-black uppercase text-sm">Безкоштовна консультація</span>
        </div>

        <!-- Title -->
        <h2 class="text-4xl md:text-6xl font-bold font-display text-white mb-6 leading-tight">
          Хочете такий же проект?
        </h2>

        <!-- Description -->
        <p class="text-xl text-white/80 font-bold mb-10 leading-relaxed">
          Обговоримо ваші ідеї та створимо індивідуальне рішення для вашого бізнесу
        </p>

        <!-- CTA Button -->
        <Button
          variant="yellow"
          size="lg"
          rotation="rotate-2"
          @click="openConsultation"
        >
          Замовити схожий проект
        </Button>

      </div>
    </section>

    <!-- Footer -->
    <FooterSection @open-consultation="openConsultation" />

    <!-- Modals -->
    <ConsultationModal :is-open="isConsultationOpen" @close="closeConsultation" />

  </div>
</template>
