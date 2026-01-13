<script setup lang="ts">
// AI Chat composable (централізований стан)
const { isOpen: isAIChatOpen, openChat: openAIChat, closeChat: closeAIChat } = useAiChat()

// Consultation modal state
const isConsultationOpen = ref(false)

const openConsultation = () => {
  isConsultationOpen.value = true
}

const closeConsultation = () => {
  isConsultationOpen.value = false
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
      <TechStackSection />
      <PortfolioMonitor />
      <ProjectCTA @open-consultation="openConsultation" />
      <WhyUsSection />
      <FooterSection @open-consultation="openConsultation" />
    </main>

    <!-- Modals -->
    <ConsultationModal :is-open="isConsultationOpen" @close="closeConsultation" />
    <AIChatModal />
  </div>
</template>
