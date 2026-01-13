import type { Project } from '~/types/portfolio'

export const projects: Project[] = [
  {
    id: 'wordpress-school',
    title: 'Школа WordPress',
    shortDescription: 'Лендинг для освітнього курсу з розробки на WordPress',
    fullDescription: 'Висококонверсійний двосторінковий лендинг, розроблений для залучення студентів на курс. Фокус на швидкості завантаження, відгуках та демонстрації робіт учнів.',
    category: 'Education',
    technologies: [
      { name: 'WordPress', icon: '🌐', color: 'bg-blue-600' },
      { name: 'JavaScript', icon: 'JS', color: 'bg-yellow-500' },
      { name: 'PHP', icon: '🐘', color: 'bg-purple-500' },
      { name: 'CSS3', icon: '🎨', color: 'bg-blue-400' }
    ],
    
    features: [
      'Оптимізована галерея робіт учнів',
      'Блок інтерактивних відгуків',
      'Адаптивний дизайн для мобільних пристроїв',
      'Форма швидкої реєстрації'
    ],
    results: [
      { metric: 'Швидкість', value: '98/100', description: 'Показник Google PageSpeed' },
      { metric: 'Конверсія', value: '+25%', description: 'Завдяки оптимізації UX' }
    ],
    image: '/images/wrapper/phone-laptop.png',
    laptopImage: '/images/projects/drill-laptop.png',
    phoneImage: '/images/projects/drill-phone.png',
    backgroundColor: 'bg-blue-50',
    rotation: '-rotate-1'
  },
  {
    id: 'photo-school',
    title: 'Фото Школа',
    shortDescription: 'Презентаційний лендинг для навчання фотографії',
    fullDescription: 'Мінімалістичний проект, орієнтований на візуальний контент. Двосторінковий сайт, що демонструє професійні кейси та програму навчання.',
    category: 'Education',
    technologies: [
      { name: 'React', icon: '⚛️', color: 'bg-cyan-500' },
      { name: 'Tailwind CSS', icon: '🌊', color: 'bg-sky-400' },
      { name: 'Framer Motion', icon: '✨', color: 'bg-pink-500' }
    ],
    features: [
      'High-res фото галереї',
      'Оптимізація зображень без втрати якості',
      'Анімації появи контенту',
      'Контактна форма'
    ],
    results: [
      { metric: 'Mobile First', value: '100%', description: 'Ідеальне відображення на смартфонах' }
    ],
    image: '/images/wrapper/phone-laptop.png',
    laptopImage: '/images/projects/drill-laptop.png',
    phoneImage: '/images/projects/drill-phone.png',
    backgroundColor: 'bg-gray-100',
    rotation: 'rotate-1'
  },
  {
    id: 'photographer-portfolio',
    title: 'Портфоліо Фотографа',
    shortDescription: 'Мультимовне портфоліо на 5 мовах з фокусом на SEO',
    fullDescription: 'Професійна платформа для фотографа з розширеною локалізацією та SEO-оптимізацією для міжнародного ринку.',
    category: 'Portfolio',
    technologies: [
      { name: 'Next.js 14', icon: '▲', color: 'bg-black' },
      { name: 'i18n', icon: '🌍', color: 'bg-green-500' },
      { name: 'TypeScript', icon: 'TS', color: 'bg-blue-500' },
      { name: 'Vercel', icon: '▲', color: 'bg-gray-800' }
    ],
    features: [
      'Мультимовність (5 мов)',
      'SEO-структура для кожної мовної версії',
      'Динамічне завантаження важкого контенту',
      'Інтеграція з соціальними мережами'
    ],
    results: [
      { metric: 'SEO Rank', value: 'TOP 3', description: 'За локальними запитами' },
      { metric: 'Мови', value: '5', description: 'Повна локалізація контенту' }
    ],
    image: '/images/wrapper/phone-laptop.png',
    laptopImage: '/images/projects/drill-laptop.png',
    phoneImage: '/images/projects/drill-phone.png',
    backgroundColor: 'bg-stone-100',
    rotation: '-rotate-2'
  },
  {
    id: 'lumber-company',
    title: 'Компанія Пиломатеріалів',
    shortDescription: 'Міжнародний корпоративний сайт на 9 мовах [cite: 105, 108]',
    fullDescription: 'Корпоративна платформа з інтеграцією Sanity CMS, що дозволяє керувати контентом на 9 мовах для виходу на ринки Європи та Азії[cite: 105, 109].',
    category: 'Business',
    technologies: [
      { name: 'Next.js', icon: '▲', color: 'bg-black' },
      { name: 'Sanity CMS', icon: '☁️', color: 'bg-red-500' },
      { name: 'PostgreSQL', icon: '🐘', color: 'bg-blue-600' }
    ],
    features: [
      'Керування 9 мовними версіями через одну панель [cite: 108]',
      'Семантична SEO структура [cite: 110]',
      'Каталог продукції з фільтрацією',
      'Форми для B2B запитів'
    ],
    results: [
      { metric: 'Охоплення', value: '+40%', description: 'Зростання клієнтської бази [cite: 108]' },
      { metric: 'Ефективність', value: '75%', description: 'Швидше оновлення контенту [cite: 109]' },
      { metric: 'Трафік', value: '+65%', description: 'Органічний приріст [cite: 111]' }
    ],
    image: '/images/wrapper/phone-laptop.png',
    laptopImage: '/images/projects/drill-laptop.png',
    phoneImage: '/images/projects/drill-phone.png',
    backgroundColor: 'bg-orange-50',
    rotation: 'rotate-1'
  },
  {
    id: 'real-estate-ai-scraper',
    title: 'Оренда Квартир + AI Скрапер',
    shortDescription: 'Платформа з автоматичним збором оголошень (OLX та ін.) [cite: 86]',
    fullDescription: 'Система, що використовує AI для динамічного скрапінгу оголошень з OLX та Real-Estate.Lviv.ua. AI аналізує структуру будь-якого сайту та витягує дані автоматично.',
    category: 'PropTech',
    technologies: [
      { name: 'Node.js', icon: '🟢', color: 'bg-green-700' },
      { name: 'AI API', icon: '🧠', color: 'bg-purple-600' },
      { name: 'MongoDB', icon: '🍃', color: 'bg-green-500' },
      { name: 'Puppeteer', icon: '🎭', color: 'bg-gray-700' }
    ],
    features: [
      'AI-адаптивний скрапер для будь-яких сайтів',
      'Автоматичне додавання об’єктів у систему',
      'Фільтрація дублікатів та фейків',
      'Система сповіщень про нові квартири'
    ],
    results: [
      { metric: 'User Engagement', value: '+45%', description: 'Зростання активності [cite: 86]' },
      { metric: 'Automation', value: '100%', description: 'Збір даних без втручання людини' }
    ],
    image: '/images/wrapper/phone-laptop.png',
    laptopImage: '/images/projects/drill-laptop.png',
    phoneImage: '/images/projects/drill-phone.png',
    backgroundColor: 'bg-emerald-50',
    rotation: 'rotate-2'
  },
  {
    id: 'event-qr-bot',
    title: 'Event Control Bot',
    shortDescription: 'Система керування івентами через Telegram та QR-коди [cite: 89]',
    fullDescription: 'Бот для реєстрації на події. Генерує унікальний QR-код для кожного гостя, який сканується адміністратором на вході для перевірки статусу.',
    category: 'Tools',
    technologies: [
      { name: 'Telegram API', icon: '✈️', color: 'bg-blue-500' },
      { name: 'Node.js', icon: '🟢', color: 'bg-green-600' },
      { name: 'QR Engine', icon: '🏁', color: 'bg-black' }
    ],
    features: [
      'Миттєва реєстрація через ТГ',
      'Генерація та валідація QR-кодів',
      'Адмін-інтерфейс для сканування квитків',
      'Статистика відвідуваності в реальному часі'
    ],
    results: [
      { metric: 'Вхід гостя', value: '3 сек', description: 'Час на перевірку QR-коду' },
      { metric: 'Response Time', value: '5 хв', description: 'Замість 24 годин [cite: 89]' }
    ],
    image: '/images/wrapper/phone-laptop.png',
    laptopImage: '/images/projects/drill-laptop.png',
    phoneImage: '/images/projects/drill-phone.png',
    backgroundColor: 'bg-indigo-50',
    rotation: '-rotate-1'
  },
  {
    id: 'ukrainian-artists-map',
    title: 'Платформа Артистів & Events',
    shortDescription: 'Мапа івентів та база артистів з AI наповненням',
    fullDescription: 'Платформа для української музичної індустрії. AI скрапер автоматично наповнює базу новими артистами, а івенти відображаються на інтерактивній карті.',
    category: 'Media',
    technologies: [
      { name: 'React', icon: '⚛️', color: 'bg-cyan-500' },
      { name: 'Java Spring', icon: '🍃', color: 'bg-green-600' },
      { name: 'PostgreSQL', icon: '🐘', color: 'bg-blue-700' },
      { name: 'Leaflet/Map', icon: '🗺️', color: 'bg-yellow-600' }
    ],
    features: [
      'Інтерактивна мапа подій по Україні',
      'AI скрапінг профілів артистів',
      'Календар музичних подій',
      'Особисті профілі для музикантів'
    ],
    results: [
      { metric: 'База артистів', value: '1000+', description: 'Автоматично доданих AI' },
      { metric: 'Uptime', value: '99.9%', description: 'Надійність бекенду [cite: 20]' }
    ],
    image: '/images/wrapper/phone-laptop.png',
    laptopImage: '/images/projects/drill-laptop.png',
    phoneImage: '/images/projects/drill-phone.png',
    backgroundColor: 'bg-violet-50',
    rotation: 'rotate-1'
  },
  {
    id: 'fashion-meat-shops',
    title: 'Магазини + Telegram Mini App',
    shortDescription: 'E-commerce (Одяг/М’ясо) з бесшовною ТГ авторизацією',
    fullDescription: 'Два повноцінних магазини з єдиним бекендом. При переході з Telegram користувач автоматично авторизується через Mini App, отримує статус замовлень у бот та оплачує через Mono/LiqPay.',
    category: 'E-Commerce',
    technologies: [
      { name: 'Next.js 14', icon: '▲', color: 'bg-black' },
      { name: 'PostgreSQL', icon: '🐘', color: 'bg-blue-600' },
      { name: 'Telegram TMA', icon: '📱', color: 'bg-blue-400' },
      { name: 'MonoPay', icon: '🐱', color: 'bg-red-500' }
    ],
    features: [
      'Авторизація без пароля (Telegram ID)',
      'Сповіщення про замовлення в чат (не емейл)',
      'Єдиний бекенд для декількох магазинів',
      'Пряма оплата LiqPay / MonoPay'
    ],
    results: [
      { metric: 'Конверсія ТГ', value: '+50%', description: 'Завдяки відсутності реєстрації' },
      { metric: 'Retention', value: 'High', description: 'Клієнти повертаються через зручність бота' }
    ],
    image: '/images/wrapper/phone-laptop.png',
    laptopImage: '/images/projects/drill-laptop.png',
    phoneImage: '/images/projects/drill-phone.png',
    backgroundColor: 'bg-red-50',
    rotation: '-rotate-2'
  }
]