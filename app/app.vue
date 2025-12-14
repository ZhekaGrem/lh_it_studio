<script setup lang="ts">
// Import Google Fonts
useHead({
  link: [
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com'
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossorigin: ''
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700&family=Inter:wght@400;500;600;700&family=Press+Start+2P&display=swap'
    }
  ]
})

// Preloader state
const showPreloader = ref(true)
const handlePreloaderComplete = () => {
  showPreloader.value = false
}

// Modal states
const isConsultationOpen = ref(false)
const isAIChatOpen = ref(false)

const openConsultation = () => {
  isConsultationOpen.value = true
}

const closeConsultation = () => {
  isConsultationOpen.value = false
}

const openAIChat = () => {
  isAIChatOpen.value = true
}

const closeAIChat = () => {
  isAIChatOpen.value = false
}
</script>

<template>
  <div>
    <!-- Preloader -->
    <Preloader @complete="handlePreloaderComplete" />

    <!-- Header -->
    <Header
      @open-consultation="openConsultation"
      @open-ai-chat="openAIChat"
    />

    <!-- Main Content -->
    <main>
      <HeroSection @open-consultation="openConsultation" />
      <MarqueeSection />
      <ServicesSection @open-consultation="openConsultation" />
      <WhyUsSection />
      <Footer @open-consultation="openConsultation" />
    </main>

    <!-- Modals -->
    <ConsultationModal
      :is-open="isConsultationOpen"
      @close="closeConsultation"
    />

    <AIChatModal
      :is-open="isAIChatOpen"
      @close="closeAIChat"
    />
  </div>
</template>
