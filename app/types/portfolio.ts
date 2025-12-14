export interface Project {
  id: string
  title: string
  shortDescription: string
  fullDescription: string
  category: ProjectCategory
  technologies: Technology[]
  features: string[]
  results: ProjectResult[]
  image: string
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
  url: string
  stats?: {
    label: string
    value: string
  }[]
}


export type ProjectCategory =
  | 'E-Commerce'
  | 'AI & Automation'
  | 'Real Estate'
  | 'Event Management'

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
