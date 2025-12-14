<script setup lang="ts">
const isScrolled = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const emit = defineEmits<{
  openConsultation: []
  openAIChat: []
}>()
</script>

<template>
  <header
    :class="[
      'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
      isScrolled
        ? 'bg-black border-b-4 border-core shadow-[0_8px_0px_#FF4D00]'
        : 'bg-transparent'
    ]"
  >
    <div class="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">

      <!-- Logo -->
      <NuxtLink to="/" class="group">
        <div class="relative">
          <span class="text-3xl font-bold font-display text-white">
            L&H
          </span>
          <div class="absolute -bottom-1 left-0 w-0 h-1 bg-core group-hover:w-full transition-all duration-300"></div>
        </div>
      </NuxtLink>

      <!-- Navigation -->
      <nav class="hidden md:flex items-center gap-8">
        <a
          href="#services"
          class="text-white hover:text-core font-bold transition-colors uppercase tracking-wide"
        >
          Послуги
        </a>
        <a
          href="#portfolio"
          class="text-white hover:text-core font-bold transition-colors uppercase tracking-wide"
        >
          Проєкти
        </a>
        <a
          href="#contact"
          class="text-white hover:text-core font-bold transition-colors uppercase tracking-wide"
        >
          Контакти
        </a>
      </nav>

      <!-- CTA Buttons -->
      <div class="flex items-center gap-4">

        <!-- AI Chat Button -->
        <Button
          variant="yellow"
          size="sm"
          rotation="rotate-2"
          @click="emit('openAIChat')"
          class="relative"
        >
          🤖 AI ЧАТ
          <div class="absolute -top-2 -right-2 w-4 h-4 bg-core rounded-full border-2 border-black animate-pulse"></div>
        </Button>

        <!-- Consultation Button -->
        <Button
          variant="primary"
          size="md"
          rotation="-rotate-1"
          @click="emit('openConsultation')"
        >
          Консультація
        </Button>
      </div>

      <!-- Mobile Menu Toggle -->
      <button class="md:hidden text-white">
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

    </div>
  </header>
</template>
