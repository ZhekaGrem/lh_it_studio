export function useUaPhone() {
  // При фокусі: якщо пусто, ставимо +380
  const onPhoneFocus = (event) => {
    const input = event.target;
    if (!input.value) {
      input.value = '+380';
      // Повертаємо значення, щоб оновити v-model у батьку
      input.dispatchEvent(new Event('input')); 
    }
  };

  // При вводі: не даємо стерти +380 і дозволяємо тільки цифри
  const onPhoneInput = (event) => {
    const input = event.target;
    let value = input.value;

    // Якщо стерли префікс — відновлюємо
    if (!value.startsWith('+380')) {
      value = '+380';
    } else {
      // Чистимо все після +380 від не-цифр
      const raw = value.slice(4).replace(/\D/g, '');
      value = '+380' + raw;
    }

    // Якщо значення змінилося після очистки — оновлюємо інпут вручну
    if (input.value !== value) {
      input.value = value;
    }
    
    return value;
  };

  return {
    onPhoneFocus,
    onPhoneInput
  };
}