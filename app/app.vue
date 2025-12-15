<script setup lang="ts">
import { generateOrganizationSchema, generateWebsiteSchema } from '@/config/seo'

// Preloader state
const showPreloader = ref(true)
const handlePreloaderComplete = () => {
  showPreloader.value = false
}

// SEO: Structured Data (JSON-LD)
useSchemaOrg([
  generateOrganizationSchema(),
  generateWebsiteSchema()
])
</script>

<template>
  <div>
    <!-- Preloader -->
    <Preloader @complete="handlePreloaderComplete" />

    <!-- Page Content -->
    <NuxtPage />
  </div>
</template>
