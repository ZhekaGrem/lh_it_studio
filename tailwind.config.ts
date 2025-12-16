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
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      // Підключаємо твої CSS-змінні зі Swiss-Brutalism стилю
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "var(--color-bg)",
        foreground: "var(--color-ink)",

        // Neo-Brutalism основні кольори
        ink: '#111111',
        bg: '#F8F9FA',
        core: '#FF4D00',
        error: '#FF2E2E',
        yellow: '#FFD700',
        neon: '#00FF00',
        pink: '#FF006E',

        primary: {
          DEFAULT: "var(--color-core)",
          foreground: "var(--color-ink)",
        },
        secondary: {
          DEFAULT: "var(--color-surface)",
          foreground: "var(--color-ink)",
        },
        destructive: {
          DEFAULT: "var(--color-error)",
          foreground: "var(--color-surface)",
        },
        muted: {
          DEFAULT: "#f3f4f6",
          foreground: "#6b7280",
        },
        accent: {
          DEFAULT: "var(--color-core)",
          foreground: "var(--color-ink)",
        },
        popover: {
          DEFAULT: "var(--color-surface)",
          foreground: "var(--color-ink)",
        },
        card: {
          DEFAULT: "var(--color-surface)",
          foreground: "var(--color-ink)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        pixel: ["var(--font-pixel)", "monospace"],
      },
      spacing: {
        xs: "var(--space-xs)",
        sm: "var(--space-sm)",
        md: "var(--space-md)",
        lg: "var(--space-lg)",
        xl: "var(--space-xl)",
        "2xl": "var(--space-2xl)",
        "3xl": "var(--space-3xl)",
      },
      boxShadow: {
        brutal: "4px 4px 0px #111111",
        "brutal-md": "8px 8px 0px #111111",
        "brutal-lg": "12px 12px 0px #111111",
        "brutal-xl": "16px 16px 0px #111111",
        "brutal-xl-white": "16px 16px 0px #F8F9FA",
        "brutal-xl-core": "16px 16px 0px #FF4D00",
        "brutal-xl-neon": "16px 16px 0px #00FF00",
        "brutal-core": "6px 6px 0px #FF4D00",
        "brutal-yellow": "8px 8px 0px #FFD700",
        "brutal-neon": "8px 8px 0px #00FF00",
      },
      letterSpacing: {
        tighter: '-0.02em',
      },
      lineHeight: {
        tight: '100%',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}