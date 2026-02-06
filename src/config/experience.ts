export interface ExperienceItem {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string | null; // null = current position
  description: string[];
  technologies: string[];
}

export const experience: ExperienceItem[] = [
  {
    title: 'Data Engineer',
    company: 'Nansen.ai',
    location: 'City, State',
    startDate: '2022-01',
    endDate: null, // Current position
    description: [
      'Led development of key features that improved user engagement by 40%',
      'Architected and implemented scalable microservices infrastructure',
      'Mentored junior developers and conducted code reviews',
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker'],
  },
  {
    title: 'Data Engineer',
    company: 'Luno',
    location: 'City, State',
    startDate: '2022-08',
    endDate: '2026-01',
    description: [
      'Built and maintained full-stack web applications',
      'Collaborated with design team to implement pixel-perfect UIs',
      'Optimized application performance, reducing load times by 50%',
    ],
    technologies: ['JavaScript', 'React', 'Express', 'MongoDB'],
  },
  {
    title: 'Software Engineer',
    company: 'OQLIS',
    location: 'City, State',
    startDate: '2020-11',
    endDate: '2022-07',
    description: [
      'Built and maintained full-stack web applications',
      'Collaborated with design team to implement pixel-perfect UIs',
      'Optimized application performance, reducing load times by 50%',
    ],
    technologies: ['JavaScript', 'React', 'Express', 'MongoDB'],
  },
];
