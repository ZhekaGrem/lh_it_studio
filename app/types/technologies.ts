export interface TechCategory {
  title: string
  color: string
  rotation: string
  technologies: string[]
}

export const techStack: TechCategory[] = [
  {
    title: 'МОВИ ПРОГРАМУВАННЯ',
    color: '#FF4D00',
    rotation: '-rotate-2',
    technologies: [
      'Java 8/11/17',
      'JavaScript (ES6+)',
      'TypeScript',
      'Python',
      'HTML5',
      'CSS3'
    ]
  },
  {
    title: 'BACKEND & FRAMEWORKS',
    color: '#FFD700',
    rotation: 'rotate-1',
    technologies: [
      'Spring Boot',
      'Spring MVC',
      'Spring Security',
      'Spring Data',
      'Hibernate',
      'JPA',
      'EJB',
      'Node.js',
      'Express',
      'Prisma',
      'Google Guice',
      'JHipster',
      'Spring JDBC'
    ]
  },
  {
    title: 'FRONTEND',
    color: '#00FF00',
    rotation: '-rotate-1',
    technologies: [
      'React.js',
      'Next.js 13/14',
      'Redux Toolkit',
      'Zustand',
      'AngularJS',
      'D3.js',
      'Framer Motion',
      'React Router',
      'Shadcn/ui',
      'Styled Components',
      'Tailwind CSS',
      'SASS/SCSS',
      'Sanity CMS',
      'WordPress'
    ]
  },
  {
    title: 'БАЗИ ДАНИХ',
    color: '#FF006E',
    rotation: 'rotate-2',
    technologies: [
      'PostgreSQL',
      'MongoDB',
      'MySQL',
      'REDIS',
      'MS SQL',
      'RabbitMQ',
      'Supabase',
      'Oracle DB',
      'Firebase'
    ]
  },
  {
    title: 'CLOUD & DEVOPS',
    color: '#00D9FF',
    rotation: '-rotate-2',
    technologies: [
      'AWS (EC2, S3, Lambda)',
      'Google Cloud',
      'Kubernetes',
      'Docker',
      'Argo',
      'Jenkins',
      'Vercel',
      'WebLogic',
      'Git / GitHub',
      'Vite',
      'Webpack'
    ]
  },
  {
    title: 'ІНТЕГРАЦІЇ (API)',
    color: '#9D4EDD',
    rotation: 'rotate-1',
    technologies: [
      'REST API',
      'gRPC',
      'Salesforce API',
      'eBay API',
      'Amazon API',
      'Walmart API',
      'Zoom API',
      'HubSpot API',
      'Telegram Bot API',
      'QuickBooks',
      'OAuth2',
      'EmailJS'
    ]
  },
  {
    title: 'ТЕСТУВАННЯ & АНАЛІТИКА',
    color: '#06FFA5',
    rotation: '-rotate-1',
    technologies: [
      'JUnit',
      'Mockito / PowerMockito',
      'Jest',
      'React Testing Library',
      'Google Analytics',
      'Google Tag Manager',
      'Lighthouse / Web Vitals'
    ]
  }
]
