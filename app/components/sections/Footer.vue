<script setup lang="ts">
import { useUaPhone } from '@/composables/useUaPhone';

const formData = reactive({
  name: '',
  phone: '',
  message: ''
})

const emit = defineEmits<{
  openConsultation: []
}>()

const handleSubmit = (e: Event) => {
  e.preventDefault()
  emit('openConsultation')
}

const { onPhoneFocus, onPhoneInput } = useUaPhone();
</script>

<template>
  <footer id="contact" class="bg-bg relative overflow-hidden">

    <!-- Decorative Elements -->
    <div class="absolute top-10 right-20 w-40 h-40 bg-yellow border-4 border-black rotate-45 -z-10 opacity-20"></div>

    <div class="max-w-7xl mx-auto px-4">
      <div class="grid lg:grid-cols-2 gap-16">

        <!-- Left - Contact Info -->
        <div class="space-y-12">

          <!-- Email -->
          <div>
            <a href="mailto:hello@lh.studio" class="
                inline-block text-6xl md:text-8xl font-bold font-display text-black
                hover:text-core
                transition-colors
                leading-none
                -rotate-2
                hover:rotate-0
              ">
              HELLO@
              <br />
              LH.STUDIO
            </a>
          </div>

          <!-- Social Links -->
          <div class="space-y-4">
            <a v-for="social in [
              { name: 'Instagram', url: '#' },
              { name: 'Telegram', url: '#' },
              { name: 'LinkedIn', url: '#' }
            ]" :key="social.name" :href="social.url" class="
                group flex items-center gap-4 text-4xl font-bold text-black
                hover:text-core
                transition-colors
              ">
              {{ social.name }}
              <span class="inline-block group-hover:translate-x-2 transition-transform">
                →
              </span>
            </a>
          </div>

          <!-- Info -->
          <div class="space-y-2 text-black/70 font-bold">
            <p>Веб-студія L&H</p>
            <p>Україна, Київ</p>
            <p>© 2025 L&H STUDIO</p>
          </div>

        </div>

        <!-- Right - Contact Form -->
        <div class="relative">

          <!-- Form Header -->
          <div class="bg-core px-6 py-4 border-4 border-black rotate-1 shadow-brutal-md mb-8">
            <h3 class="text-3xl font-bold font-display text-black uppercase">
              Зв'яжіться з Нами
            </h3>
          </div>

          <!-- Form -->
          <form @submit="handleSubmit" class="space-y-6">

            <!-- Name -->
            <div class="rotate-1">
              <label class="block text-sm font-bold text-black mb-2 uppercase">
                /// Ім'я
              </label>
              <input v-model="formData.name" type="text" required class="
                  w-full bg-transparent border-b-4 border-black
                  focus:border-core
                  outline-none pb-2 text-xl font-bold
                  transition-colors
                " placeholder="Ваше ім'я" />
            </div>

            <!-- Phone -->
            <div class="-rotate-1">
              <label class="block text-sm font-bold text-black mb-2 uppercase">
                /// Телефон
              </label>
              <input :value="formData.phone" @input="formData.phone = onPhoneInput($event)" @focus="onPhoneFocus"
                type="tel" inputmode="tel" required class="
                  w-full bg-transparent border-b-4 border-black
                  focus:border-yellow
                  outline-none pb-2 text-xl font-bold
                  transition-colors
                " placeholder="+380" />
            </div>

            <!-- Message -->
            <div class="rotate-1">
              <label class="block text-sm font-bold text-black mb-2 uppercase">
                /// Повідомлення
              </label>
              <textarea v-model="formData.message" rows="4" class="
                  w-full bg-transparent border-b-4 border-black
                  focus:border-core
                  outline-none pb-2 font-bold resize-none
                  transition-colors
                " placeholder="Розкажіть про ваш проєкт..." />
            </div>

            <!-- Submit -->
            <Button type="submit" variant="primary" size="lg" rotation="-rotate-2" full-width>
              Відправити Заявку
            </Button>

          </form>

        </div>

      </div>

      <!-- Bottom Bar -->
      <div class="mt-20 pt-8 border-t-4 border-black flex flex-wrap justify-between items-center gap-4">
        <span class="font-mono text-sm text-black/50 uppercase">
          Crafted with Brutalist Design Principles
        </span>
        <div class="flex gap-6 text-sm font-bold text-black/70">
          <a href="#" class="hover:text-core">Політика конфіденційності</a>
          <a href="#" class="hover:text-core">Умови використання</a>
        </div>
      </div>

    </div>
  </footer>
</template>
