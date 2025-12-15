<template>
  <footer class="py-20 lg:py-32 bg-bg border-t-4 border-ink">
    <div class="container mx-auto px-6">
      <!-- Main Footer Grid -->
      <div class="grid lg:grid-cols-2 gap-16 lg:gap-24 mb-20">

        <!-- Left: Contact Info -->
        <div>
          <!-- Huge Email -->
          <a href="mailto:hello@lh.studio" class="
              block font-display font-bold
              text-4xl md:text-5xl lg:text-6xl xl:text-7xl
              text-ink leading-tight tracking-tighter
              hover:text-core transition-colors duration-200
              mb-12
            ">
            HELLO@LH.STUDIO
          </a>

          <!-- Social Links -->
          <div class="space-y-4 mb-12">
            <a v-for="social in socials" :key="social.name" :href="social.link" target="_blank"
              rel="noopener noreferrer" class="
                block font-display font-bold text-2xl md:text-3xl lg:text-4xl
                text-ink hover:text-core
                transition-colors duration-200
                group
              ">
              <span class="inline-flex items-center gap-4">
                {{ social.name }}
                <span class="
                  inline-block w-8 h-8
                  border-2 border-ink
                  group-hover:border-core group-hover:bg-core
                  transition-all duration-200
                  group-hover:translate-x-2
                ">
                  <svg class="w-full h-full p-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </span>
            </a>
          </div>

          <!-- Additional Info -->
          <div class="space-y-2">
            <p class="font-body text-lg text-ink/70">
              Веб-студія L&H
            </p>
            <p class="font-body text-lg text-ink/70">
              Україна, Київ
            </p>
            <p class="font-pixel text-[8px] text-ink/50 uppercase mt-6">
              © 2025 L&H STUDIO /// ALL RIGHTS RESERVED
            </p>
          </div>
        </div>

        <!-- Right: Contact Form -->
        <div>
          <h3 class="
            font-display font-bold text-3xl md:text-4xl lg:text-5xl
            text-ink leading-tight tracking-tighter mb-8
          ">
            ЗВ'ЯЖІТЬСЯ З НАМИ
          </h3>

          <form @submit.prevent="handleSubmit" class="space-y-8">
            <!-- Name Input -->
            <div class="group">
              <label for="name" class="
                  block font-display font-bold text-sm uppercase tracking-wider
                  text-ink mb-3
                ">
                ІМ'Я
              </label>
              <input id="name" v-model="formData.name" type="text" required class="
                  w-full bg-transparent
                  border-0 border-b-4 border-ink
                  font-body text-xl md:text-2xl text-ink
                  focus:border-core focus:outline-none
                  transition-colors duration-200
                  pb-2
                " placeholder="Ваше ім'я" />
            </div>

            <!-- Phone Input -->
            <div class="group">
              <label for="phone" class="
                  block font-display font-bold text-sm uppercase tracking-wider
                  text-ink mb-3
                ">
                ТЕЛЕФОН
              </label>
              <input id="phone" :value="formData.phone" @input="formData.phone = onPhoneInput($event)"
                @focus="onPhoneFocus" type="tel" inputmode="tel" required class="
                  w-full bg-transparent
                  border-0 border-b-4 border-ink
                  font-body text-xl md:text-2xl text-ink
                  focus:border-core focus:outline-none
                  transition-colors duration-200
                  pb-2
                " placeholder="+380" />
            </div>

            <!-- Message Input (optional) -->
            <div class="group">
              <label for="message" class="
                  block font-display font-bold text-sm uppercase tracking-wider
                  text-ink mb-3
                ">
                ПОВІДОМЛЕННЯ (опціонально)
              </label>
              <textarea id="message" v-model="formData.message" rows="3" class="
                  w-full bg-transparent
                  border-0 border-b-4 border-ink
                  font-body text-xl md:text-2xl text-ink
                  focus:border-core focus:outline-none
                  transition-colors duration-200
                  pb-2 resize-none
                " placeholder="Розкажіть про ваш проєкт..."></textarea>
            </div>

            <!-- Submit Button -->
            <button type="submit" class="
                w-full px-8 py-6
                bg-core text-ink
                font-display font-bold text-lg md:text-xl uppercase tracking-wide
                border-4 border-ink
                shadow-brutal-lg
                hover:translate-x-[-4px] hover:translate-y-[-4px]
                hover:shadow-[8px_8px_0px_#111111]
                transition-all duration-200
                disabled:opacity-50 disabled:cursor-not-allowed
              " :disabled="isSubmitting">
              {{ isSubmitting ? 'ВІДПРАВЛЯЄМО...' : 'ВІДПРАВИТИ ЗАЯВКУ' }}
            </button>

            <!-- Success Message -->
            <div v-if="showSuccess" class="
                p-4 border-4 border-core bg-core/10
                font-body text-lg text-ink text-center
              ">
              ✓ Заявку відправлено! Ми зв'яжемося з вами найближчим часом.
            </div>
          </form>
        </div>

      </div>

      <!-- Bottom Bar -->
      <div class="
        pt-8 border-t-4 border-ink
        flex flex-col md:flex-row justify-between items-center gap-4
      ">
        <div class="font-pixel text-[10px] text-ink/50 uppercase">
          CRAFTED WITH BRUTALIST DESIGN PRINCIPLES2
        </div>
        <div class="flex gap-6">
          <a v-for="link in legalLinks" :key="link.name" :href="link.href"
            class="font-body text-sm text-ink/70 hover:text-core transition-colors">
            {{ link.name }}
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useUaPhone } from '@/composables/useUaPhone';
const formData = ref({
  name: '',
  phone: '',
  message: ''
});

const isSubmitting = ref(false);
const showSuccess = ref(false);

const socials = [
  { name: 'INSTAGRAM', link: 'https://instagram.com' },
  { name: 'TELEGRAM', link: 'https://t.me' },
  { name: 'LINKEDIN', link: 'https://linkedin.com' }
];

const legalLinks = [
  { name: 'Політика конфіденційності', href: '#privacy' },
  { name: 'Умови використання', href: '#terms' }
];

const handleSubmit = async () => {
  isSubmitting.value = true;

  try {
    // TODO: Integrate with Telegram Bot API
    console.log('Form submitted:', formData.value);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Show success message
    showSuccess.value = true;

    // Reset form
    formData.value = {
      name: '',
      phone: '',
      message: ''
    };

    // Hide success message after 5 seconds
    setTimeout(() => {
      showSuccess.value = false;
    }, 5000);

  } catch (error) {
    console.error('Error submitting form:', error);
    alert('Помилка відправки. Спробуйте ще раз.');
  } finally {
    isSubmitting.value = false;
  }
};
const { onPhoneFocus, onPhoneInput } = useUaPhone();
</script>
