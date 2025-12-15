<script setup lang="ts">
const text = "WEB DEVELOPMENT /// TELEGRAM BOTS /// AI SOLUTIONS /// AUTOMATION ///"

const techStack = [
  { name: 'SQL', icon: '/icons/sql.svg', color: '#FFD700' },
  { name: 'Mongo', icon: '/icons/mongo.svg', color: '#00FF00' },
  { name: 'Queue', icon: '/icons/queue.svg', color: '#FF006E' },
  { name: 'Java', icon: '/icons/java.svg', color: '#FFD700' },
  { name: 'Python', icon: '/icons/python.svg', color: '#FFD700' },
  { name: 'N8N', icon: '/icons/n8n.svg', color: '#FFD700' },
  { name: 'JS', icon: '/icons/js.svg', color: '#00F0FF' },
  { name: 'Telegram', icon: '/icons/telegram.svg', color: '#FFD700' },
  { name: 'AI', icon: '/icons/bot.svg', color: '#FF006E' },
  { name: 'Auto', icon: '/icons/auto.svg', color: '#00FF00' }
]
</script>

<template>
  <section class="bg-core border-y-8 border-black py-8 overflow-hidden relative">

    <!-- Top Marquee (Left) -->
    <div class="relative">
      <div class="flex animate-marquee whitespace-nowrap">
        <span
          v-for="i in 3"
          :key="i"
          class="text-6xl font-bold font-display text-black px-8"
          style="text-shadow: 8px 8px 0px rgba(0,0,0,0.3)"
        >
          {{ text }}
        </span>
      </div>
    </div>

    <!-- Bottom Marquee (Right) -->
    <div class="relative mt-4">
      <div class="flex animate-marquee-reverse whitespace-nowrap">
        <span
          v-for="i in 3"
          :key="i"
          class="text-6xl font-bold font-display text-white px-8"
          style="text-shadow: 8px 8px 0px #111111"
        >
          {{ text }}
        </span>
      </div>
    </div>

    <!-- Tech Icons Grid -->
    <div class="max-w-7xl mx-auto px-4 mt-12">
      <div class="grid grid-cols-5 md:grid-cols-10 gap-4">
        <div
          v-for="(tech, i) in techStack"
          :key="i"
          class="group relative aspect-square"
          :style="{ transform: `rotate(${i % 2 === 0 ? '2deg' : '-2deg'})` }"
        >
          <div
            :style="{ backgroundColor: tech.color }"
            class="
              w-full h-full border-4 border-black bg-white
              flex flex-col items-center justify-center
              group-hover:shadow-brutal-md
              group-hover:-translate-y-2
              transition-all duration-200
            "
          >
            <img :src="tech.icon" :alt="tech.name" class="w-10 h-10 sm:w-16 sm:h-16" />
            <span class="text-xs font-bold text-black mt-1 uppercase">{{ tech.name }}</span>
          </div>
        </div>
      </div>
    </div>

  </section>
</template>
