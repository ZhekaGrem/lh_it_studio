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
  <header :class="[
    'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
    isScrolled
      ? 'bg-ink border-b-4 border-core shadow-[0_8px_0px_#FF4D00]'
      : 'bg-transparent'
  ]">
    <div class="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">

      <!-- Logo -->
      <NuxtLink to="/" class="group">
        <div class="relative max-w-24">

          <img src="../assets/img/logo/unnamed.webp" alt="logo" class="w-full h-full object-cover" />

          <div class="absolute -bottom-1 left-0 w-0 h-1 bg-core group-hover:w-full transition-all duration-300"></div>
        </div>
      </NuxtLink>

      <!-- Navigation -->
      <nav :class="['hidden md:flex items-center gap-8', isScrolled
        ? 'text-white' : 'text-ink']">
        <a href="#services" class=" hover:text-core font-pixel transition-colors uppercase tracking-wide">
          Послуги
        </a>
        <a href="#portfolio" class=" hover:text-core font-pixel transition-colors uppercase tracking-wide">
          Проєкти
        </a>
        <a href="#contact" class=" hover:text-core font-pixel transition-colors uppercase tracking-wide">
          Контакти
        </a>
      </nav>

      <!-- CTA Buttons -->
      <div class="flex items-center gap-4">

        <!-- AI Chat Button -->
        <Button variant="yellow" size="sm" rotation="rotate-2" @click="emit('openAIChat')" class="relative">
          <img src="/icons/bot.svg" alt="AI Bot" class="w-5 h-5 sm:w-7 sm:h-7 inline-block " /> AI ЧАТ
          <div class="absolute -top-2 -right-2 w-4 h-4 bg-core rounded-full border-2 border-black animate-pulse"></div>
        </Button>

        <!-- Consultation Button -->
        <Button variant="primary" size="md" rotation="-rotate-1" @click="emit('openConsultation')">
          Консультація
        </Button>
      </div>
<!-- 
      Mobile Menu Toggle
      <button class="md:hidden text-white">
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button> -->

    </div>
  </header>
</template>
