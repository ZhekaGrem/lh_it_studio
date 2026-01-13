export interface Project {
  id: string
  title: string
  shortDescription: string
  fullDescription: string
  category: string
  technologies: Technology[]
  features: string[]
  results: ProjectResult[]
  image: string
  laptopImage?: string
  phoneImage?: string
  demoLink?: string
  githubLink?: string
  backgroundColor: string
  rotation: string
}

// --- Types ---
export interface ProjectSection {
  id: string
  title: string
  category: string
  description: string
  tech: string[]
  image: string
  laptopImage?: string
  phoneImage?: string
  url: string
  stats?: {
    label: string
    value: string
  }[]
}



export interface Technology {
  name: string
  icon: string
  color: string
}

export interface ProjectResult {
  metric: string
  value: string
  description: string
}
