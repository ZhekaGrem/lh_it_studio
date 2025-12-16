export interface ContactFormData {
  name: string
  contactMethod: 'phone' | 'email' | 'telegram' | 'linkedin'
  contactValue: string
  service: string
  message?: string
}

export const useTelegram = () => {
  const sendContactForm = async (data: ContactFormData) => {
    try {
      const response = await $fetch('/api/telegram/send', {
        method: 'POST',
        body: data
      })

      return { success: true, data: response }
    } catch (error) {
      console.error('Failed to send form:', error)
      return { success: false, error }
    }
  }

  return {
    sendContactForm
  }
}
