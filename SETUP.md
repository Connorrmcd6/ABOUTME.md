# Portfolio Website Setup Guide

This guide will walk you through setting up your portfolio website from start to finish.

## Prerequisites

- Node.js 20+ installed
- A GitHub account
- Basic knowledge of Git and command line

## Step-by-Step Setup

### 1. Environment Configuration

First, set up your environment variables:

```bash
cp .env.local.example .env.local
```

Now edit `.env.local` with your information:

```env
NEXT_PUBLIC_GITHUB_USERNAME=your-actual-username
GITHUB_TOKEN=your-token-here
ARTICLES_REPO_URL=https://github.com/your-username/your-articles-repo
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Your Full Name
NEXT_PUBLIC_SITE_DESCRIPTION=Software Developer and Technical Writer
REVALIDATION_TOKEN=some-random-secret-string
```

#### Getting Your GitHub Token

1. Go to https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Give it a descriptive name like "Portfolio Website"
4. Select scopes:
   - ✅ `public_repo` (Access public repositories)
5. Click "Generate token"
6. **Copy the token immediately** (you won't see it again!)
7. Paste it into your `.env.local` file

### 2. Create Your Articles Repository

1. Go to GitHub and create a new repository (e.g., `portfolio-articles`)
2. Make it **public**
3. Clone it locally:

```bash
git clone https://github.com/your-username/portfolio-articles.git
cd portfolio-articles
```

4. Create the articles structure:

```bash
mkdir -p articles/2024-01-15-getting-started
```

5. Create `articles/2024-01-15-getting-started/metadata.json`:

```json
{
  "title": "Getting Started with My Portfolio",
  "summary": "Welcome to my new portfolio website! Here's how I built it.",
  "date": "2024-01-15",
  "tags": ["meta", "portfolio", "nextjs"],
  "author": "Your Name"
}
```

6. Create `articles/2024-01-15-getting-started/article.md`:

```markdown
# Getting Started with My Portfolio

Welcome to my portfolio website! This is my first blog post.

## Why I Built This

I wanted a central place to showcase my projects and share my thoughts.

## Tech Stack

- Next.js for the framework
- GitHub for content management
- Vercel for hosting

## What's Next

Stay tuned for more posts about web development, programming, and more!
```

7. Commit and push:

```bash
git add .
git commit -m "Add first article"
git push
```

8. Update `.env.local` with your articles repository URL:

```env
ARTICLES_REPO_URL=https://github.com/your-username/portfolio-articles
```

### 3. Customize Your Site

#### Update Site Configuration

Edit `src/config/site.ts`:

```typescript
export const siteConfig = {
  name: env.NEXT_PUBLIC_SITE_NAME,
  description: env.NEXT_PUBLIC_SITE_DESCRIPTION,
  url: env.NEXT_PUBLIC_SITE_URL,
  ogImage: `${env.NEXT_PUBLIC_SITE_URL}/og-image.png`,
  links: {
    github: `https://github.com/${env.NEXT_PUBLIC_GITHUB_USERNAME}`,
    linkedin: 'https://linkedin.com/in/your-linkedin-username', // ← Update
    email: 'mailto:your.email@example.com', // ← Update
    twitter: 'https://twitter.com/your-twitter-handle', // ← Update or remove
  },
};
```

#### Add Your Work Experience

Edit `src/config/experience.ts`:

```typescript
export const experience: ExperienceItem[] = [
  {
    title: 'Senior Software Engineer',
    company: 'Acme Corp',
    location: 'San Francisco, CA',
    startDate: '2022-01',
    endDate: null, // null means current position
    description: [
      'Led development of microservices architecture serving 1M+ users',
      'Reduced API response time by 60% through optimization',
      'Mentored team of 5 junior developers',
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS'],
  },
  {
    title: 'Software Engineer',
    company: 'Previous Company',
    location: 'Austin, TX',
    startDate: '2020-06',
    endDate: '2021-12',
    description: [
      'Built and maintained customer-facing web applications',
      'Implemented CI/CD pipeline reducing deployment time by 75%',
      'Collaborated with design team on UI/UX improvements',
    ],
    technologies: ['JavaScript', 'React', 'Express', 'MongoDB'],
  },
];
```

#### Add Testimonials

Edit `src/config/testimonials.ts`:

```typescript
export const testimonials: Testimonial[] = [
  {
    quote: 'One of the best developers I\'ve worked with. Delivers quality code consistently.',
    author: 'Jane Smith',
    title: 'Engineering Manager',
    company: 'Acme Corp',
  },
  {
    quote: 'Great problem solver with excellent communication skills.',
    author: 'John Doe',
    title: 'Lead Developer',
    company: 'Tech Solutions',
  },
];
```

#### Update Hero Section

Edit `src/components/home/HeroSection.tsx`:

Find these lines and update:

```typescript
const profileName = siteConfig.name;
const profileBio = 'Your actual bio here - 2-3 sentences about what you do and what you\'re passionate about.';
const profileImageUrl = '/profile.jpg'; // Add a profile.jpg to your public/ folder
```

### 4. Add Your Profile Picture

1. Add your profile picture to `public/profile.jpg`
2. Recommended size: 400x400 pixels
3. Format: JPG or PNG

### 5. Test Locally

Start the development server:

```bash
npm run dev
```

Open http://localhost:3000 and verify:

- [ ] Your name appears correctly
- [ ] Your GitHub repos are showing
- [ ] Your article appears in the articles section
- [ ] All links work correctly
- [ ] Experience timeline shows your work history
- [ ] Testimonials appear

### 6. Deploy to Vercel

1. Push your code to GitHub
2. Go to https://vercel.com
3. Click "Add New Project"
4. Import your repository
5. Add environment variables:
   - `NEXT_PUBLIC_GITHUB_USERNAME`
   - `GITHUB_TOKEN`
   - `ARTICLES_REPO_URL`
   - `NEXT_PUBLIC_SITE_URL` (use your Vercel URL)
   - `NEXT_PUBLIC_SITE_NAME`
   - `NEXT_PUBLIC_SITE_DESCRIPTION`
   - `REVALIDATION_TOKEN`
6. Click "Deploy"

### 7. Set Up Custom Domain (Optional)

1. Go to your Vercel project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Update DNS records as instructed
5. Update `NEXT_PUBLIC_SITE_URL` environment variable

### 8. Set Up GitHub Webhooks (Optional)

For instant updates when you publish new articles:

1. Go to your articles repository settings
2. Navigate to "Webhooks" → "Add webhook"
3. Payload URL: `https://your-domain.com/api/revalidate?secret=YOUR_REVALIDATION_TOKEN&path=/articles`
4. Content type: `application/json`
5. Events: Select "Just the push event"
6. Click "Add webhook"

Now when you push a new article, your site will update within seconds!

## Maintenance

### Adding New Articles

1. Create a new folder in your articles repo:
   ```bash
   mkdir articles/2024-02-20-new-post
   ```

2. Add `metadata.json` and `article.md`

3. Commit and push:
   ```bash
   git add .
   git commit -m "Add new article: Title"
   git push
   ```

4. Your article will appear on the site within 5 minutes (or instantly with webhooks)

### Updating Content

- **Experience**: Edit `src/config/experience.ts` and redeploy
- **Testimonials**: Edit `src/config/testimonials.ts` and redeploy
- **Bio**: Edit `src/components/home/HeroSection.tsx` and redeploy
- **Links**: Edit `src/config/site.ts` and redeploy

## Troubleshooting

### "Invalid environment variables" error

Make sure all required variables in `.env.local` are set correctly.

### Articles not showing

1. Check that your articles repository is public
2. Verify `ARTICLES_REPO_URL` in `.env.local`
3. Ensure articles folder structure is correct
4. Check `metadata.json` is valid JSON

### GitHub API rate limit

- Make sure `GITHUB_TOKEN` is set correctly
- Authenticated requests get 5,000/hour vs 60/hour

### Build fails in Vercel

1. Check all environment variables are set in Vercel dashboard
2. Make sure they match exactly (no extra spaces)
3. Check build logs for specific error messages

## Need Help?

- Check the main README.md for more information
- Review the plan document for architecture details
- Open an issue on GitHub if you find bugs

## What's Next?

- Add more articles to your blog
- Customize the styling to match your brand
- Add analytics (Google Analytics, Plausible, etc.)
- Set up monitoring and error tracking
- Add more sections to showcase your skills
- Implement dark mode
