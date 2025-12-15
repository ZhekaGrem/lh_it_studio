<script setup lang="ts">

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
    <!-- Header -->
    <Header @open-consultation="openConsultation" @open-ai-chat="openAIChat" />

    <!-- Main Content -->
    <main>
      <HeroSection @open-consultation="openConsultation" />
      <MarqueeSection />
      <ServicesSection @open-consultation="openConsultation" />
      <PortfolioMonitor />
      <ProjectCTA @open-consultation="openConsultation" />
      <WhyUsSection />
      <FooterSection @open-consultation="openConsultation" />
    </main>

    <!-- Modals -->
    <ConsultationModal :is-open="isConsultationOpen" @close="closeConsultation" />
    <AIChatModal :is-open="isAIChatOpen" @close="closeAIChat" />
  </div>
</template>
