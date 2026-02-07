# Portfolio Website

A modern, auto-updating portfolio website built with Next.js that showcases GitHub repositories and blog articles.

## Features

- 🔄 **Auto-sync with GitHub** - Automatically displays your public repositories and blog articles
- 📝 **MDX Blog** - Write articles in MDX with rich formatting, math equations, and interactive charts
- 📊 **Interactive Charts** - Embed bar, line, area, and pie charts directly in your articles
- 🎨 **Modern UI** - Built with Tailwind CSS and shadcn/ui components
- ⚡ **Fast & Performant** - ISR (Incremental Static Regeneration) for optimal performance
- 📱 **Responsive Design** - Works beautifully on all devices
- 🌙 **Dark Mode** - Automatic theme switching with persistent user preference
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

# Articles Repository (using a placeholder - create your own later)
ARTICLES_REPO_URL=https://github.com/your-username/articles

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Your Name
NEXT_PUBLIC_SITE_DESCRIPTION=Portfolio and Blog

# Optional: Revalidation API token
REVALIDATION_TOKEN=your-random-secret-token
```

#### Getting a GitHub Token

1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token with `repo` scope (for reading repository contents)
3. Copy the token and add it to `.env.local`

### 3. Create an Articles Repository

Create a new public GitHub repository (e.g., `articles`) with this structure:

```
articles/
├── my-first-article/
│   ├── metadata.json
│   └── index.mdx
└── another-article/
    ├── metadata.json
    └── index.mdx
```

**Important:** Each article requires:
- A unique folder name (the article slug)
- `metadata.json` with article metadata
- `index.mdx` with article content

Example `metadata.json`:

```json
{
  "title": "My First Blog Post",
  "summary": "A comprehensive guide to getting started with this portfolio system.",
  "date": "2026-02-07",
  "tags": ["javascript", "web-development"],
  "published": true,
  "authors": [
    {
      "name": "Your Name",
      "linkedIn": "https://www.linkedin.com/in/your-profile/"
    }
  ]
}
```

Example `index.mdx`:

```mdx
# My First Blog Post

This is the content of my blog post written in **MDX**.

## Features

- Full markdown support
- Math equations: $E = mc^2$
- Interactive charts
- And much more!

<Callout type="info">
MDX allows you to use JSX components directly in your markdown!
</Callout>
```

### 4. Reference the MDX Capabilities

Check the `/mdx-reference/` folder in this repository for a **complete example** of:
- Correct article structure (metadata.json + index.mdx)
- All available MDX features (markdown, math, charts, callouts)
- Chart theming and customization
- Best practices and examples

**This folder serves as a template** you can copy to your articles repository!

### 5. Update Personal Information

Edit these files with your information:

- `src/config/site.ts` - Update social links (LinkedIn, email, Twitter)
- `src/config/experience.ts` - Add your work experience
- `src/config/testimonials.ts` - Add testimonials
- `src/components/home/HeroSection.tsx` - Update bio and profile info

### 6. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Article Structure & MDX Capabilities

### Article Metadata

Your `metadata.json` must follow this structure:

```json
{
  "title": "Article Title",
  "summary": "Brief description for previews and SEO",
  "date": "YYYY-MM-DD",
  "tags": ["tag1", "tag2"],
  "published": true,
  "authors": [
    {
      "name": "Author Name",
      "linkedIn": "https://www.linkedin.com/in/profile/"
    }
  ]
}
```

**Important fields:**
- **`published`**: (Optional) Set to `true` to publish the article. **Defaults to `false`** - articles are drafts until explicitly published.
- **`authors`**: An array of objects, not a single `author` string. This supports multiple authors per article.

### MDX Features

Articles support rich MDX formatting:

**GitHub Flavored Markdown:**
- Tables, strikethrough, task lists
- Code blocks with syntax highlighting
- Headings with auto-generated anchor links

**Mathematical Equations:**
- Inline: `$E = mc^2$`
- Block: `$$\int_{0}^{\infty} e^{-x^2} dx$$`

**Custom Components:**
- `<CustomBarChart>` - Bar charts
- `<CustomLineChart>` - Line charts
- `<CustomAreaChart>` - Area charts
- `<CustomPieChart>` - Pie charts
- `<Callout type="info|warning|error|success">` - Highlighted callout boxes

**Enhanced Elements:**
- Images with lazy loading and responsive sizing
- External links auto-open in new tabs
- Automatic heading anchors for deep linking

See `/mdx-reference/index.mdx` for comprehensive examples of all features!

## Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_GITHUB_USERNAME` | Your GitHub username | Yes |
| `GITHUB_TOKEN` | GitHub personal access token (needs `repo` scope) | Yes |
| `ARTICLES_REPO_URL` | Full URL to your articles repository | Yes |
| `NEXT_PUBLIC_SITE_URL` | Your site URL | Yes |
| `NEXT_PUBLIC_SITE_NAME` | Your name | Yes |
| `NEXT_PUBLIC_SITE_DESCRIPTION` | Site description | Yes |
| `REVALIDATION_TOKEN` | Secret token for manual revalidation API | No |

### Personal Configuration Files

| File | Purpose |
|------|---------|
| `src/config/site.ts` | Social media links and site metadata |
| `src/config/experience.ts` | Work experience timeline |
| `src/config/testimonials.ts` | Testimonials from colleagues |
| `src/components/home/HeroSection.tsx` | Hero section with bio |
| `public/profile.jpg` | Your profile picture (recommended: 400x400px) |

## Deployment

### Option 1: Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com) dashboard
3. Add environment variables in Vercel project settings
4. Deploy!

Vercel automatically handles ISR and provides optimal performance.

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

## How It Works

### Auto-Update Mechanism

The site uses **Incremental Static Regeneration (ISR)** to automatically update content:

- **Articles list**: Revalidates every 5 minutes
- **Individual articles**: Revalidate every 5 minutes
- **Portfolio page**: Revalidates every 10 minutes
- **Repository pages**: Revalidate every 1 hour

When you push a new article to your GitHub repository, it will automatically appear on your site within the revalidation period (up to 5 minutes for new articles).

### Caching Strategy

1. **Memory cache** (5-10 min) for repeated requests within same session
2. **ISR cache** managed by Next.js for automatic background updates
3. **Graceful fallbacks** - serves stale data if GitHub API is unavailable

### MDX Compilation

Articles are fetched from GitHub and compiled server-side with:
- `next-mdx-remote` - MDX compilation
- `remark-gfm` - GitHub Flavored Markdown
- `remark-math` + `rehype-katex` - Math equations
- `rehype-highlight` - Code syntax highlighting
- `rehype-slug` + `rehype-autolink-headings` - Heading anchors

## Customization

### Adding Pages

Create new pages in `src/app/`:

```typescript
// src/app/about/page.tsx
export default function AboutPage() {
  return <div>About Me</div>;
}
```

### Styling & Colors

Customize colors in `src/app/globals.css`:

```css
@layer base {
  :root {
    --primary: 220 90% 56%;
    --chart-1: oklch(0.646 0.222 41.116);
    /* ... more variables */
  }
}
```

**Chart theme colors** (5 colors that cycle automatically):
- Light mode: Lines 72-76
- Dark mode: Lines 106-110

### Adding UI Components

Add shadcn/ui components:

```bash
npx shadcn@latest add [component-name]
```

Browse available components at [ui.shadcn.com](https://ui.shadcn.com).

## Project Structure

```
src/
├── app/                        # Next.js App Router pages
│   ├── page.tsx               # Home page (ISR: 5 min)
│   ├── portfolio/             # Portfolio pages (ISR: 10 min)
│   └── articles/              # Blog articles pages (ISR: 5 min)
├── components/                # React components
│   ├── ui/                    # shadcn/ui components
│   ├── layout/                # Header, Footer
│   ├── home/                  # Home page sections
│   ├── portfolio/             # Portfolio components
│   ├── articles/              # Article components
│   └── mdx/                   # MDX components (charts, callouts)
├── lib/                       # Utility functions
│   └── github/                # GitHub API integration
├── config/                    # Configuration files
│   ├── site.ts               # Site metadata and links
│   ├── experience.ts         # Work experience
│   └── testimonials.ts       # Testimonials
└── types/                     # TypeScript types
```

## Key Technologies

- **Framework**: Next.js 15+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + OKLCH color space
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Data Source**: GitHub API (via Octokit)
- **MDX**: next-mdx-remote with remark/rehype plugins
- **Charts**: Recharts with custom theme integration
- **Math**: KaTeX for LaTeX rendering
- **Code Highlighting**: highlight.js with GitHub Dark theme
- **Deployment**: Vercel or Docker

## Troubleshooting

### GitHub API Rate Limits

- **With authentication**: 5,000 requests/hour
- **Without**: 60 requests/hour
- The site uses aggressive caching to stay within limits
- Make sure `GITHUB_TOKEN` is set correctly

### Articles Not Showing

1. Check that `ARTICLES_REPO_URL` is correct in `.env.local` (must be full URL)
2. Verify the articles repository is **public**
3. Ensure articles follow the correct structure:
   - Each article in its own folder
   - Contains `metadata.json` and `index.mdx`
   - `metadata.json` has correct format (especially `authors` array)
4. Wait up to 5 minutes for ISR cache to update
5. Check browser console and terminal for error messages

### Build Errors

- Ensure all required environment variables are set in `.env.local`
- For Vercel: Add all environment variables in project settings
- For Docker: Create `.env` file with all variables
- Check that your GitHub token has `repo` scope permissions

### MDX Rendering Issues

- Verify `index.mdx` file has valid MDX syntax
- Check that custom components are spelled correctly (case-sensitive)
- Review `/mdx-reference/index.mdx` for working examples
- Math equations must use proper LaTeX syntax
- Chart data must be valid JavaScript objects

## Documentation

- **README.md** (this file) - Complete documentation
- **QUICK_REFERENCE.md** - Quick commands and reference card
- **/mdx-reference/** - Complete MDX capabilities example and template

## License

MIT

## Support

For issues or questions, please open an issue on GitHub.
