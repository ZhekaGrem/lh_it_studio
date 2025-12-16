export interface ChatMessage {
  id: string
  content: string
  role: 'user' | 'assistant'
  timestamp: Date
}

export const useAiChat = () => {
  // Стан чату
  const isOpen = useState('aiChatOpen', () => false)
  const messages = useState<ChatMessage[]>('aiChatMessages', () => [])
  const isLoading = useState('aiChatLoading', () => false)
  const error = useState<string | null>('aiChatError', () => null)

  // Відкриття/закриття чату
  const openChat = () => {
    isOpen.value = true
    error.value = null
  }

  const closeChat = () => {
    isOpen.value = false
  }

  const toggleChat = () => {
    isOpen.value = !isOpen.value
    if (isOpen.value) {
      error.value = null
    }
  }

  // Додавання повідомлення
  const addMessage = (content: string, role: 'user' | 'assistant') => {
    const message: ChatMessage = {
      id: Date.now().toString(),
      content,
      role,
      timestamp: new Date()
    }
    messages.value = [...messages.value, message]
  }

  // Надсилання повідомлення до AI
  const sendMessage = async (content: string) => {
    if (!content.trim()) return

    // Додати повідомлення користувача
    addMessage(content, 'user')

    // Встановити стан завантаження
    isLoading.value = true
    error.value = null

    try {
      // Відправити запит до API
      const response = await $fetch<{ content: string }>('/api/chat', {
        method: 'POST',
        body: { message: content }
      })

      // Додати відповідь AI
      addMessage(response.content, 'assistant')
    }
    catch (err: any) {
      console.error('AI Chat error:', err)

      // Обробка помилок
      const errorMessage = err.data?.statusMessage || err.message || 'Виникла помилка при спілкуванні з AI'
      error.value = errorMessage

      // Додати повідомлення про помилку
      addMessage(errorMessage, 'assistant')
    }
    finally {
      isLoading.value = false
    }
  }

  // Очищення історії
  const clearMessages = () => {
    messages.value = []
  }

  return {
    // Стан
    isOpen,
    messages,
    isLoading,
    error,
    // Методи
    openChat,
    closeChat,
    toggleChat,
    sendMessage,
    clearMessages
  }
}
