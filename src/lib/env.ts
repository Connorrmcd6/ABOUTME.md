import { z } from 'zod';

const envSchema = z.object({
  // GitHub Configuration
  NEXT_PUBLIC_GITHUB_USERNAME: z.string().min(1, 'GitHub username is required'),
  GITHUB_TOKEN: z.string().min(1, 'GitHub token is required'),

  // Articles Repository
  ARTICLES_REPO_URL: z.string().url('Articles repo URL must be a valid URL'),

  // Site Configuration
  NEXT_PUBLIC_SITE_URL: z.string().url('Site URL must be a valid URL'),
  NEXT_PUBLIC_SITE_NAME: z.string().min(1, 'Site name is required'),
  NEXT_PUBLIC_SITE_DESCRIPTION: z.string().min(1, 'Site description is required'),

  // Optional: Revalidation API token
  REVALIDATION_TOKEN: z.string().optional(),
});

// Validate environment variables at startup
const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Invalid environment variables:', parsed.error.flatten().fieldErrors);

  // During build time, provide helpful error message but use defaults
  if (process.env.NODE_ENV === 'production' && !process.env.NEXT_PUBLIC_GITHUB_USERNAME) {
    console.error('\n⚠️  Building without environment variables set.');
    console.error('   The build will succeed, but the site will not work correctly.');
    console.error('   Make sure to set all required environment variables before deploying.\n');
    console.error('   See .env.local.example for required variables.\n');
  } else {
    throw new Error('Invalid environment variables');
  }
}

export const env = parsed.success ? parsed.data : {
  NEXT_PUBLIC_GITHUB_USERNAME: process.env.NEXT_PUBLIC_GITHUB_USERNAME || '',
  GITHUB_TOKEN: process.env.GITHUB_TOKEN || '',
  ARTICLES_REPO_URL: process.env.ARTICLES_REPO_URL || '',
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  NEXT_PUBLIC_SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME || 'Portfolio',
  NEXT_PUBLIC_SITE_DESCRIPTION: process.env.NEXT_PUBLIC_SITE_DESCRIPTION || 'Portfolio Website',
  REVALIDATION_TOKEN: process.env.REVALIDATION_TOKEN,
};
