export interface Testimonial {
  quote: string;
  author: string;
  title: string;
  company?: string;
  avatarUrl?: string;
}

export const testimonials: Testimonial[] = [
  {
    quote: 'An exceptional developer who consistently delivers high-quality work. Their attention to detail and problem-solving skills are outstanding.',
    author: 'John Doe',
    title: 'Engineering Manager',
    company: 'Tech Company',
  },
  {
    quote: 'Great team player with excellent communication skills. Always willing to help others and share knowledge.',
    author: 'Jane Smith',
    title: 'Senior Developer',
    company: 'Software Inc',
  },
  // TODO: Add more testimonials
];
