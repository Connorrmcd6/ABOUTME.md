import { env } from '@/lib/env';

export const siteConfig = {
  name: env.NEXT_PUBLIC_SITE_NAME,
  description: env.NEXT_PUBLIC_SITE_DESCRIPTION,
  url: env.NEXT_PUBLIC_SITE_URL,
  ogImage: `${env.NEXT_PUBLIC_SITE_URL}/og-image.png`,
  links: {
    github: `https://github.com/${env.NEXT_PUBLIC_GITHUB_USERNAME}`,
    linkedin: 'https://www.linkedin.com/in/connor-mcdonald-a770131a1/', 
    email: 'mailto:connormcd98@gmail.com', // TODO: Update with actual email
    // twitter: 'https://twitter.com/yourusername', // TODO: Update with actual Twitter URL (optional)
  },
};

export const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Articles', href: '/articles' },
];
