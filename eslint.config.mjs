import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  // Вмикаємо підтримку стилізації (Prettier інтеграція)
  stylistic: false, 
})
.append({
  // Твої кастомні правила тут
  rules: {
    'vue/multi-word-component-names': 'off', // Вимикаємо вимогу двох слів у назві компонентів (для Nuxt це ок)
    'vue/no-v-html': 'off',
    'no-console': 'warn',
  }
})