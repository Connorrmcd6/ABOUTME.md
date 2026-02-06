# Portfolio Website

A modern, auto-updating portfolio website built with Next.js that showcases GitHub repositories and blog articles.

## Features

- 🔄 **Auto-sync with GitHub** - Automatically displays your public repositories and blog articles
- 📝 **Markdown Blog** - Write articles in markdown, commit to GitHub, and they appear automatically
- 📊 **Interactive Charts** - Embed bar, line, area, and pie charts directly in your articles
- 🎨 **Modern UI** - Built with Tailwind CSS and shadcn/ui components
- ⚡ **Fast & Performant** - ISR (Incremental Static Regeneration) for optimal performance
- 📱 **Responsive Design** - Works beautifully on all devices
- 🐳 **Easy Deployment** - Deploy to Vercel or self-host with Docker

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Copy the example environment file and fill in your details:

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:

```env
# GitHub Configuration
NEXT_PUBLIC_GITHUB_USERNAME=your-github-username
GITHUB_TOKEN=ghp_your_github_token

# Articles Repository
ARTICLES_REPO_URL=https://github.com/your-username/your-articles-repo

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Your Name
NEXT_PUBLIC_SITE_DESCRIPTION=Portfolio and Blog
```

#### Getting a GitHub Token

1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token with `public_repo` scope
3. Copy the token and add it to `.env.local`

### 3. Create an Articles Repository

Create a new GitHub repository with this structure:

```
articles/
├── 2024-01-15-my-first-post/
│   ├── metadata.json
│   └── article.md
└── 2024-02-20-another-post/
    ├── metadata.json
    └── article.md
```

Example `metadata.json`:

```json
{
  "title": "My First Blog Post",
  "summary": "This is a summary of my first blog post.",
  "date": "2024-01-15",
  "tags": ["javascript", "web-development"],
  "author": "Your Name"
}
```

Example `article.md`:

```markdown
# My First Blog Post

This is the content of my blog post written in markdown.

## Code Examples

\`\`\`javascript
console.log("Hello, World!");
\`\`\`
```

### 4. Update Personal Information

Edit these files with your information:

- `src/config/site.ts` - Update social links
- `src/config/experience.ts` - Add your work experience
- `src/config/testimonials.ts` - Add testimonials
- `src/components/home/HeroSection.tsx` - Update bio and profile info

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

### Option 1: Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel dashboard
3. Add environment variables
4. Deploy!

### Option 2: Docker (Self-Hosted)

Build and run with Docker:

```bash
# Build the image
docker build -f docker/Dockerfile.pi -t portfolio-site .

# Run the container
docker run -p 3000:3000 --env-file .env portfolio-site
```

Or use Docker Compose:

```bash
cd docker
docker-compose up -d
```

With Nginx reverse proxy:

```bash
cd docker
docker-compose --profile with-nginx up -d
```

### Option 3: Raspberry Pi

1. Install Docker on your Raspberry Pi
2. Clone the repository
3. Create `.env` file with your configuration
4. Run with Docker Compose

```bash
cd docker
docker-compose up -d
```

## Project Structure

```
src/
├── app/                        # Next.js App Router pages
│   ├── page.tsx               # Home page
│   ├── portfolio/             # Portfolio pages
│   └── articles/              # Blog articles pages
├── components/                # React components
│   ├── ui/                    # shadcn/ui components
│   ├── layout/                # Header, Footer
│   ├── home/                  # Home page sections
│   ├── portfolio/             # Portfolio components
│   └── articles/              # Article components
├── lib/                       # Utility functions
│   └── github/                # GitHub API integration
├── config/                    # Configuration files
└── types/                     # TypeScript types
```

## Key Technologies

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Data Source**: GitHub API
- **Markdown**: react-markdown with syntax highlighting
- **Deployment**: Vercel or Docker

## How It Works

### Auto-Update Mechanism

The site uses **Incremental Static Regeneration (ISR)** to automatically update content:

- **Home page**: Revalidates every 5 minutes
- **Portfolio page**: Revalidates every 10 minutes
- **Article pages**: Revalidate every 2 hours
- **Repository pages**: Revalidate every 1 hour

When you push a new article to your GitHub repository or create a new repo, it will automatically appear on your site within the revalidation period.

### Caching Strategy

1. **Memory cache** (5-10 min) for repeated requests within same session
2. **ISR cache** managed by Next.js for automatic updates
3. **Graceful fallbacks** - serves stale data if GitHub API is unavailable

## Customization

### Adding Pages

Create new pages in `src/app/`:

```typescript
// src/app/about/page.tsx
export default function AboutPage() {
  return <div>About Me</div>;
}
```

### Styling

Customize colors in `src/app/globals.css`:

```css
@layer base {
  :root {
    --primary: 220 90% 56%;
    /* ... more variables */
  }
}
```

### Components

Add shadcn/ui components:

```bash
npx shadcn@latest add [component-name]
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_GITHUB_USERNAME` | Your GitHub username | Yes |
| `GITHUB_TOKEN` | GitHub personal access token | Yes |
| `ARTICLES_REPO_URL` | URL to your articles repository | Yes |
| `NEXT_PUBLIC_SITE_URL` | Your site URL | Yes |
| `NEXT_PUBLIC_SITE_NAME` | Your name | Yes |
| `NEXT_PUBLIC_SITE_DESCRIPTION` | Site description | Yes |
| `REVALIDATION_TOKEN` | Secret token for manual revalidation API | No |

## Troubleshooting

### GitHub API Rate Limits

- With authentication: 5,000 requests/hour
- Without: 60 requests/hour
- The site uses aggressive caching to stay within limits

### Articles Not Showing

1. Check that `ARTICLES_REPO_URL` is correct
2. Verify repository is public
3. Ensure `articles/` directory exists
4. Check `metadata.json` format is valid

### Build Errors

If the build fails due to missing environment variables, create `.env.local` with all required variables.

## License

MIT

## Support

For issues or questions, please open an issue on GitHub.
