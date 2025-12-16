<script setup lang="ts">
import { X, Send } from 'lucide-vue-next'

// Використовуємо composable для роботи з AI
const { isOpen, messages, isLoading, sendMessage, closeChat } = useAiChat()

const input = ref('')
const messagesEndRef = ref<HTMLDivElement | null>(null)

// Додаємо привітальне повідомлення, якщо чат порожній
onMounted(() => {
  if (messages.value.length === 0) {
    messages.value = [{
      id: '0',
      role: 'assistant',
      content: 'Привіт! Я AI асистент L&H Studio. Чим можу допомогти?',
      timestamp: new Date()
    }]
  }
})

// Автоскрол до нових повідомлень
watch(() => messages.value.length, () => {
  nextTick(() => {
    messagesEndRef.value?.scrollIntoView({ behavior: 'smooth' })
  })
})

const handleSend = async () => {
  if (!input.value.trim() || isLoading.value) return

  const userInput = input.value
  input.value = ''

  // Відправка повідомлення до AI через composable
  await sendMessage(userInput)
}

const quickActions = ['Ціни', 'Термін розробки', 'Портфоліо', 'Технології']

const handleQuickAction = (action: string) => {
  input.value = action
}
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/80 backdrop-blur-sm"
  >
    <div class="relative w-full max-w-3xl h-[80vh]">

      <!-- Floating Badge -->
      <div class="absolute -top-6 -right-6 bg-neon px-4 py-2 border-4 border-black -rotate-12 shadow-brutal-md z-10 animate-pulse">
        <span class="font-bold text-black uppercase text-sm">● ONLINE</span>
      </div>

      <!-- Chat Container -->
      <div class="bg-foreground border-8 border-yellow shadow-brutal-xl h-full flex flex-col rotate-1">

        <!-- Header -->
        <div class="bg-yellow px-6 py-4 border-b-4 border-black flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 bg-foreground border-4 border-black flex items-center justify-center rotate-3">
              <img src="/icons/bot.svg" alt="AI Bot" class="w-8 h-8" />
            </div>
            <div>
              <h2 class="text-2xl font-bold font-display text-black uppercase">
                AI Assistant
              </h2>
              <p class="text-xs font-bold text-black/70">Powered by Claude</p>
            </div>
          </div>
          <button
            @click="closeChat"
            class="w-10 h-10 bg-foreground text-yellow hover:bg-core hover:text-black border-4 border-black transition-colors -rotate-6"
          >
            <X class="w-6 h-6 mx-auto" />
          </button>
        </div>

        <!-- Messages Area -->
        <div class="flex-1 overflow-y-auto p-6 space-y-4 bg-ink">
          <div
            v-for="(msg, i) in messages"
            :key="i"
            :class="[
              'flex',
              msg.role === 'user' ? 'justify-end' : 'justify-start'
            ]"
          >
            <div
              :class="[
                'max-w-[80%] px-4 py-3 border-4 border-black shadow-brutal',
                msg.role === 'user'
                  ? 'bg-core text-black rotate-1'
                  : 'bg-bg text-black -rotate-1'
              ]"
            >
              <p class="font-bold text-sm leading-relaxed">{{ msg.content }}</p>
              <span class="text-xs opacity-50 mt-2 block">
                {{ msg.timestamp.toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' }) }}
              </span>
            </div>
          </div>

          <!-- Typing Indicator -->
          <div v-if="isLoading" class="flex justify-start">
            <div class="bg-bg px-4 py-3 border-4 border-black -rotate-1 shadow-brutal">
              <div class="flex gap-1">
                <div class="w-2 h-2 bg-foreground rounded-full animate-bounce"></div>
                <div class="w-2 h-2 bg-foreground rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                <div class="w-2 h-2 bg-foreground rounded-full animate-bounce" style="animation-delay: 0.4s"></div>
              </div>
            </div>
          </div>

          <div ref="messagesEndRef" />
        </div>

        <!-- Input Area -->
        <div class="p-4 bg-foreground border-t-4 border-yellow">
          <div class="flex gap-2">
            <input
              v-model="input"
              type="text"
              @keypress.enter="handleSend"
              placeholder="Напишіть повідомлення..."
              class="
                flex-1 px-4 py-3 bg-bg border-4 border-black
                focus:border-yellow focus:shadow-brutal-yellow
                outline-none font-bold rotate-1
              "
            />
            <Button
              variant="primary"
              size="md"
              rotation="-rotate-2"
              :disabled="!input.trim() || isLoading"
              @click="handleSend"
            >
              <Send class="w-5 h-5" />
            </Button>
          </div>

          <!-- Quick Actions -->
          <div class="mt-3 flex gap-2 flex-wrap">
            <button
              v-for="action in quickActions"
              :key="action"
              @click="handleQuickAction(action)"
              class="
                px-3 py-1 bg-yellow text-black text-xs font-bold uppercase
                border-2 border-black hover:shadow-brutal
                transition-all
              "
            >
              {{ action }}
            </button>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>
