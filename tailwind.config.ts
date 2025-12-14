import type { Config } from 'tailwindcss'

export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#111111',
        bg: '#F8F9FA',
        core: '#CCFF00',
        error: '#FF2E2E'
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        pixel: ['Press Start 2P', 'monospace']
      },
      boxShadow: {
        brutal: '4px 4px 0px #111111',
        'brutal-lg': '6px 6px 0px #111111',
        'brutal-core': '6px 6px 0px #CCFF00'
      },
      letterSpacing: {
        tighter: '-0.02em'  // -2% для заголовків
      },
      lineHeight: {
        tight: '100%'  // Заголовки "б'ються"
      }
    }
  },
  plugins: [],
} satisfies Config
