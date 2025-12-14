<script setup lang="ts">
const TERMINAL_LINES = [
  '> Initializing L&H Studio...',
  '> Loading dependencies... [████████] 100%',
  '> Connecting to server... OK',
  '> Fetching brutalist assets...',
  '> Compiling Neo-Brutalism styles... ✓',
  '> Rendering chaos... COMPLETE',
  '> Welcome to L&H Studio.'
]

const lines = ref<string[]>([])
const isComplete = ref(false)

onMounted(() => {
  let currentIndex = 0
  const interval = setInterval(() => {
    if (currentIndex < TERMINAL_LINES.length) {
      lines.value = [...lines.value, TERMINAL_LINES[currentIndex]]
      currentIndex++
    } else {
      setIsComplete(true)
      setTimeout(() => {
        // Fade out preloader буде через emit
        emit('complete')
      }, 500)
    }
  }, 300)

  // Cleanup
  const cleanup = () => clearInterval(interval)
  return cleanup
})

const setIsComplete = (value: boolean) => {
  isComplete.value = value
}

const emit = defineEmits<{
  complete: []
}>()
</script>

<template>
  <div
    v-if="!isComplete"
    class="fixed inset-0 z-50 bg-black flex items-center justify-center font-mono"
  >
    <div class="w-full max-w-2xl px-4">
      <!-- Terminal header -->
      <div class="border-4 border-core bg-black p-6">
        <div class="flex items-center gap-2 mb-4 border-b-2 border-core pb-2">
          <div class="w-3 h-3 rounded-full bg-red-500"></div>
          <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div class="w-3 h-3 rounded-full bg-green-500"></div>
          <span class="text-core text-sm ml-2">root@lh-studio:~$</span>
        </div>

        <!-- Terminal output -->
        <div class="space-y-2">
          <div
            v-for="(line, i) in lines"
            :key="i"
            class="text-neon text-sm md:text-base animate-glitch"
            :style="{ animationDelay: `${i * 0.1}s` }"
          >
            {{ line }}
            <span
              v-if="i === lines.length - 1"
              class="inline-block w-2 h-4 bg-neon ml-1 animate-blink"
            ></span>
          </div>
        </div>
      </div>

      <!-- Progress bar -->
      <div class="mt-4 h-2 bg-ink border-4 border-core overflow-hidden">
        <div
          class="h-full bg-core transition-all duration-300"
          :style="{ width: `${(lines.length / TERMINAL_LINES.length) * 100}%` }"
        ></div>
      </div>
    </div>
  </div>
</template>
