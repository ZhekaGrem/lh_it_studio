export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)

  const { name, contactMethod, contactValue, service, message } = body

  // Валідація
  if (!name || !contactMethod || !contactValue || !service) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required fields'
    })
  }

  // Маппінг назв послуг
  const serviceNames: Record<string, string> = {
    website: 'Веб-розробка',
    bot: 'Telegram Bot',
    ai: 'AI Рішення',
    other: 'Інше',
    general: 'Загальна консультація'
  }

  // Маппінг способів зв'язку
  const contactMethodNames: Record<string, string> = {
    phone: 'Телефон',
    email: 'Email',
    telegram: 'Telegram',
    linkedin: 'LinkedIn'
  }

  // Форматування повідомлення для Telegram
  const text = `
<b>Заявка з сайту</b>

<b>Ім'я:</b> ${name}
<b>${contactMethodNames[contactMethod] || 'Контакт'}:</b> ${contactValue}
<b>Послуга:</b> ${serviceNames[service] || service}
${message ? `\n<b>Повідомлення:</b>\n${message}` : ''}

 ${new Date().toLocaleString('uk-UA')}
  `.trim()

  try {
    // Відправка в Telegram Bot API
    const response = await $fetch(
      `https://api.telegram.org/bot${config.telegramBotToken}/sendMessage`,
      {
        method: 'POST',
        body: {
          chat_id: config.telegramChatId,
          text,
          parse_mode: 'HTML'
        }
      }
    )

    return {
      success: true,
      message: 'Message sent successfully'
    }
  } catch (error) {
    console.error('Telegram API error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to send message'
    })
  }
})
