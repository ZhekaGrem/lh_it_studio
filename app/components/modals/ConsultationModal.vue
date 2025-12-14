<script setup lang="ts">
import { X } from 'lucide-vue-next'

interface Props {
  isOpen: boolean
}

const props = defineProps<Props>()

const formData = reactive({
  name: '',
  phone: '',
  service: '',
  message: ''
})

const isSubmitting = ref(false)
const isSuccess = ref(false)

const emit = defineEmits<{
  close: []
}>()

const handleSubmit = async (e: Event) => {
  e.preventDefault()
  isSubmitting.value = true

  // TODO: Telegram API або email
  await new Promise(resolve => setTimeout(resolve, 1500))

  isSubmitting.value = false
  isSuccess.value = true

  setTimeout(() => {
    emit('close')
    isSuccess.value = false
    Object.assign(formData, { name: '', phone: '', service: '', message: '' })
  }, 2000)
}
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
  >
    <!-- Modal Container -->
    <div class="relative w-full max-w-2xl">

      <!-- Floating Badge -->
      <div class="absolute -top-6 -left-6 bg-yellow px-4 py-2 border-4 border-black rotate-12 shadow-brutal-md z-10">
        <span class="font-bold text-black uppercase text-sm">Безкоштовно</span>
      </div>

      <!-- Main Form -->
      <div class="bg-bg border-8 border-black shadow-brutal-xl -rotate-1">

        <!-- Header -->
        <div class="bg-core px-6 py-4 border-b-4 border-black flex items-center justify-between">
          <h2 class="text-3xl font-bold font-display text-black uppercase">
            Замовити Консультацію
          </h2>
          <button
            @click="emit('close')"
            class="w-10 h-10 bg-black text-core hover:bg-yellow hover:text-black border-4 border-black transition-colors"
          >
            <X class="w-6 h-6 mx-auto" />
          </button>
        </div>

        <!-- Form Body -->
        <form @submit="handleSubmit" class="p-8 space-y-6">

          <!-- Name Input -->
          <div class="relative">
            <label class="block text-sm font-bold text-black mb-2 uppercase tracking-wide">
              /// Ім'я
            </label>
            <input
              v-model="formData.name"
              type="text"
              required
              class="
                w-full px-4 py-3 bg-white border-4 border-black
                focus:border-core focus:shadow-brutal
                outline-none transition-all duration-200
                font-bold text-lg rotate-1
              "
              placeholder="Ваше ім'я"
            />
          </div>

          <!-- Phone Input -->
          <div class="relative -rotate-1">
            <label class="block text-sm font-bold text-black mb-2 uppercase tracking-wide">
              /// Телефон
            </label>
            <input
              v-model="formData.phone"
              type="tel"
              required
              class="
                w-full px-4 py-3 bg-white border-4 border-black
                focus:border-yellow focus:shadow-brutal-yellow
                outline-none transition-all duration-200
                font-bold text-lg
              "
              placeholder="+380"
            />
          </div>

          <!-- Service Select -->
          <div class="relative rotate-1">
            <label class="block text-sm font-bold text-black mb-2 uppercase tracking-wide">
              /// Послуга
            </label>
            <select
              v-model="formData.service"
              required
              class="
                w-full px-4 py-3 bg-white border-4 border-black
                focus:border-core focus:shadow-brutal
                outline-none transition-all duration-200
                font-bold text-lg
              "
            >
              <option value="">Оберіть послугу</option>
              <option value="website">Веб-розробка</option>
              <option value="bot">Telegram Bot</option>
              <option value="ai">AI Рішення</option>
              <option value="other">Інше</option>
            </select>
          </div>

          <!-- Message Textarea -->
          <div class="relative -rotate-1">
            <label class="block text-sm font-bold text-black mb-2 uppercase tracking-wide">
              /// Повідомлення (опціонально)
            </label>
            <textarea
              v-model="formData.message"
              rows="4"
              class="
                w-full px-4 py-3 bg-white border-4 border-black
                focus:border-yellow focus:shadow-brutal-yellow
                outline-none transition-all duration-200
                font-bold resize-none
              "
              placeholder="Розкажіть про ваш проєкт..."
            />
          </div>

          <!-- Submit Button -->
          <Button
            type="submit"
            variant="primary"
            size="lg"
            rotation="rotate-2"
            full-width
            :disabled="isSubmitting || isSuccess"
          >
            {{ isSubmitting ? '/// ВІДПРАВКА...' : isSuccess ? '✓ ВІДПРАВЛЕНО!' : 'ВІДПРАВИТИ ЗАЯВКУ' }}
          </Button>

        </form>

        <!-- Footer Badge -->
        <div class="px-8 pb-6">
          <div class="bg-yellow border-4 border-black px-4 py-2 inline-block -rotate-2">
            <span class="text-sm font-bold text-black uppercase">
              Відповімо протягом 1 години
            </span>
          </div>
        </div>

      </div>

      <!-- Decorative Element -->
      <div class="absolute -bottom-6 -right-6 w-24 h-24 bg-yellow border-4 border-black rotate-45 -z-10"></div>

    </div>
  </div>
</template>
