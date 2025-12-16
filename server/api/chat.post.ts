import OpenAI from 'openai';

// Rate limiting (простий in-memory store)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 10; // 10 запитів на хвилину
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 хвилина

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const userLimit = rateLimitMap.get(ip);

  if (!userLimit || now > userLimit.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (userLimit.count >= RATE_LIMIT) {
    return false;
  }

  userLimit.count++;
  return true;
}

export default defineEventHandler(async (event) => {
  try {
    console.log('🤖 [AI Chat API] Request received');
    const config = useRuntimeConfig();

    // Перевірка наявності змінних оточення
    if (!config.openaiApiKey) {
      console.error('❌ [AI Chat API] OPENAI_API_KEY missing');
      throw createError({
        statusCode: 500,
        statusMessage: 'OPENAI_API_KEY is missing from environment variables'
      });
    }

    if (!config.assistantId) {
      console.error('❌ [AI Chat API] ASSISTANT_ID missing');
      throw createError({
        statusCode: 500,
        statusMessage: 'ASSISTANT_ID is missing from environment variables'
      });
    }

    console.log('✅ [AI Chat API] Config validated');

    // Ініціалізація OpenAI клієнта
    const openai = new OpenAI({
      apiKey: config.openaiApiKey
    });

    // Отримання даних з запиту
    const body = await readBody(event);
    const { message } = body;

    console.log('📩 [AI Chat API] User message:', message?.substring(0, 50) + '...');

    // Валідація повідомлення
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Повідомлення не може бути порожнім'
      });
    }

    if (message.length > 500) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Повідомлення занадто довге (максимум 500 символів)'
      });
    }

    // Rate limiting
    const ip = getHeader(event, 'x-forwarded-for') || 'unknown';
    if (!checkRateLimit(ip)) {
      throw createError({
        statusCode: 429,
        statusMessage: 'Занадто багато запитів. Спробуйте через хвилину.'
      });
    }

    // Створення thread для розмови
    console.log('🔄 [AI Chat API] Creating thread...');
    const thread = await openai.beta.threads.create();
    console.log('✅ [AI Chat API] Thread created:', thread.id);

    // Додавання повідомлення користувача в thread
    console.log('💬 [AI Chat API] Adding message to thread...');
    await openai.beta.threads.messages.create(thread.id, {
      role: 'user',
      content: message
    });

    // Запуск Assistant
    console.log('🚀 [AI Chat API] Starting assistant run...');
    const run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: config.assistantId
    });
    console.log('✅ [AI Chat API] Run started:', run.id);

    // Очікування завершення роботи Assistant (з таймаутом)
    const threadId = thread.id;
    const runId = run.id;
    console.log('🔍 [AI Chat API] ThreadId:', threadId, 'RunId:', runId);

    let runStatus = await openai.beta.threads.runs.retrieve(runId, { thread_id: threadId });
    console.log('⏳ [AI Chat API] Initial status:', runStatus.status);

    // Polling для очікування завершення (максимум 60 секунд)
    const startTime = Date.now();
    const MAX_POLLING_TIME = 60000; // 60 секунд
    let pollCount = 0;

    while (runStatus.status === 'queued' || runStatus.status === 'in_progress') {
      // Перевірка таймауту
      if (Date.now() - startTime > MAX_POLLING_TIME) {
        console.error('❌ [AI Chat API] Polling timeout after 60 seconds');
        throw createError({
          statusCode: 504,
          statusMessage: 'AI Assistant timeout. Спробуйте ще раз.'
        });
      }

      await new Promise((resolve) => setTimeout(resolve, 1000)); // Чекаємо 1 секунду
      runStatus = await openai.beta.threads.runs.retrieve(runId, { thread_id: threadId });
      pollCount++;

      if (pollCount % 5 === 0) {
        console.log(`⏳ [AI Chat API] Still waiting... (${pollCount}s) Status:`, runStatus.status);
      }
    }

    console.log('✅ [AI Chat API] Run completed with status:', runStatus.status);

    if (runStatus.status !== 'completed') {
      throw createError({
        statusCode: 500,
        statusMessage: `Assistant run failed with status: ${runStatus.status}`
      });
    }

    // Отримання відповіді
    console.log('📥 [AI Chat API] Retrieving messages...');
    const messages = await openai.beta.threads.messages.list(thread.id);
    const lastMessage = messages.data[0];

    if (!lastMessage || lastMessage.role !== 'assistant') {
      console.error('❌ [AI Chat API] No assistant response found');
      throw createError({
        statusCode: 500,
        statusMessage: 'No assistant response found'
      });
    }

    // Витягування тексту з відповіді
    const messageContent = lastMessage.content[0];
    if (messageContent.type !== 'text') {
      console.error('❌ [AI Chat API] Unexpected message type:', messageContent.type);
      throw createError({
        statusCode: 500,
        statusMessage: 'Unexpected message content type'
      });
    }

    let aiResponse = messageContent.text.value?.trim();

    // Видалення citations у форматі 【x:y†source】
    if (aiResponse) {
      aiResponse = aiResponse.replace(/【\d+:\d+†[^】]*】/g, '').trim();
    }

    if (!aiResponse) {
      console.error('❌ [AI Chat API] Empty AI response');
      throw createError({
        statusCode: 500,
        statusMessage: 'Не вдалося отримати відповідь від AI'
      });
    }

    console.log('✅ [AI Chat API] Response generated:', aiResponse.substring(0, 100) + '...');
    console.log('🎉 [AI Chat API] Request completed successfully\n');

    return {
      content: aiResponse
    };

  } catch (error: any) {
    console.error('OpenAI API error:', error);

    // Обробка специфічних помилок OpenAI
    if (error.message?.includes('insufficient_quota')) {
      throw createError({
        statusCode: 503,
        statusMessage: 'Вичерпано квоту API. Спробуйте пізніше.'
      });
    }

    if (error.message?.includes('rate_limit_exceeded')) {
      throw createError({
        statusCode: 429,
        statusMessage: 'Перевищено ліміт запитів. Спробуйте пізніше.'
      });
    }

    // Якщо це вже createError - пробрасуємо далі
    if (error.statusCode) {
      throw error;
    }

    // Інші помилки
    throw createError({
      statusCode: 500,
      statusMessage: 'Внутрішня помилка сервера'
    });
  }
});
