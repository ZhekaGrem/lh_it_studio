<script setup lang="ts">


interface Props {
  variant?: 'primary' | 'secondary' | 'yellow' | 'black' | 'outline'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  rotation?: string
  fullWidth?: boolean
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  rotation: '',
  fullWidth: false,
  disabled: false,
  type: 'button'
})

const buttonClasses = computed(() => {
  const base = [
    'inline-flex items-center justify-center',
    'font-bold uppercase',
    'border-4 border-black',
    'transition-all duration-300',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    props.fullWidth ? 'w-full' : ''
  ]

  // Variants
  const variants = {
    primary: [
      'bg-core text-black',
      'hover:shadow-brutal-lg',
      'hover:rotate-0'
    ],
    secondary: [
      'bg-transparent text-black',
      'hover:bg-yellow hover:shadow-brutal-lg',
      'hover:rotate-0'
    ],
    yellow: [
      'bg-yellow text-black',
      'hover:shadow-brutal-xl',
      'hover:rotate-0'
    ],
    black: [
      'bg-ink text-white',
      'hover:bg-core hover:text-black hover:shadow-brutal-md',
      'hover:rotate-0'
    ],
    outline: [
      'bg-transparent text-black',
      'hover:bg-ink hover:text-white',
      'hover:rotate-0'
    ]
  }

  // Sizes
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-2 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-12 py-5 text-2xl'
  }

  return [
    ...base,
    ...variants[props.variant],
    sizes[props.size],
    props.rotation
  ].join(' ')
})
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="buttonClasses"
  >
    <slot />
  </button>
</template>
