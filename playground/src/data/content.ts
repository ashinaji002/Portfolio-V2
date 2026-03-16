export type TechItem = {
  name: string
  icon: string
  color: string
  description: string
}

export type ProjectItem = {
  title: string
  summary: string
  details: string
  tags: string[]
  link: string
}

export type TimelineItem = {
  year: string
  title: string
  description: string
}

export const techStack: TechItem[] = [
  {
    name: 'React',
    icon: 'R',
    color: '#61dafb',
    description: 'Component-first UI architecture with powerful state-driven rendering.',
  },
  {
    name: 'TypeScript',
    icon: 'TS',
    color: '#3178c6',
    description: 'Strong typing for scalable codebases and maintainable developer workflows.',
  },
  {
    name: 'Tailwind',
    icon: 'TW',
    color: '#38bdf8',
    description: 'Utility-driven styling that keeps design systems fast and consistent.',
  },
  {
    name: 'Framer Motion',
    icon: 'FM',
    color: '#f0abfc',
    description: 'Physics-based motion and layout animation for premium interactions.',
  },
  {
    name: 'Three.js',
    icon: '3D',
    color: '#22c55e',
    description: 'Real-time 3D rendering used for playful interfaces and visual depth.',
  },
  {
    name: 'Node.js',
    icon: 'N',
    color: '#84cc16',
    description: 'Server-side JavaScript runtime for APIs, tooling, and full-stack apps.',
  },
]

export const projects: ProjectItem[] = [
  {
    title: 'Neon Commerce',
    summary: 'Immersive storefront with cinematic transitions and realtime cart sync.',
    details:
      'Built a high-performance e-commerce frontend with animated product stories, personalized recommendations, and responsive checkout logic.',
    tags: ['React', 'TypeScript', 'Motion'],
    link: '#',
  },
  {
    title: 'Pulse Analytics',
    summary: 'Data dashboard that turns live metrics into animated insight cards.',
    details:
      'Designed a modular analytics workspace with filtered streams, chart interactions, and role-based component visibility.',
    tags: ['Charts', 'Tailwind', 'API'],
    link: '#',
  },
  {
    title: 'Orbit Studio',
    summary: 'Creative tool for building and previewing micro-interactions instantly.',
    details:
      'Implemented drag-drop scene composition, timeline scrubbing, and reusable animation presets for product teams.',
    tags: ['Framer', 'UX', 'Prototype'],
    link: '#',
  },
]

export const timeline: TimelineItem[] = [
  {
    year: '2022',
    title: 'Frontend Engineer',
    description: 'Shipped polished interfaces for SaaS products used by 100k+ users.',
  },
  {
    year: '2024',
    title: 'Interactive Specialist',
    description: 'Focused on performance-friendly animation systems and experimental UI.',
  },
  {
    year: '2026',
    title: 'Creative Developer',
    description: 'Building playful digital experiences that blend design, code, and 3D.',
  },
]

export const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/' },
  { name: 'X', href: 'https://x.com/' },
]