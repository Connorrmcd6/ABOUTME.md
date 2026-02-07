# ABOUTME.md

> An open-source, modern portfolio website template built with Next.js that auto-syncs with your GitHub repositories and MDX blog articles.

**Turn your GitHub profile into a stunning portfolio in minutes.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-15+-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue)](https://www.typescriptlang.org/)

[Documentation](#documentation) · [Report Bug](../../issues) · [Request Feature](../../issues)

---

## Why ABOUTME.md?

Building a portfolio from scratch is time-consuming. ABOUTME.md gives you a production-ready foundation that:

✨ **Auto-syncs with GitHub** - Your repos appear automatically
📝 **Powerful MDX blog** - Write with markdown, embed charts, and use LaTeX math
🎨 **Beautiful by default** - Professional UI with dark mode
⚡ **Fast & SEO-friendly** - Built on Next.js with ISR
🔧 **Fully customizable** - Your portfolio, your way
🚀 **Deploy anywhere** - Vercel, Docker, or your own server

**Perfect for:** Developers, designers, researchers, and anyone who wants a modern portfolio with a blog.

## Features

- 🔄 **Auto-sync with GitHub** - Automatically displays your public repositories and blog articles
- 📝 **MDX Blog** - Write articles in MDX with rich formatting, math equations, and interactive charts
- 📊 **Interactive Charts** - Embed bar, line, area, and pie charts directly in your articles
- 🎨 **Modern UI** - Built with Tailwind CSS and shadcn/ui components
- ⚡ **Fast & Performant** - ISR (Incremental Static Regeneration) for optimal performance
- 📱 **Responsive Design** - Works beautifully on all devices
- 🌙 **Dark Mode** - Automatic theme switching with persistent user preference
- 🐳 **Easy Deployment** - Deploy to Vercel or self-host with Docker

## Getting Started

**ABOUTME.md** is an open-source portfolio template designed to be forked and customized. There are two ways to engage with this project:

### 🎯 Using ABOUTME.md for Your Portfolio

**This is the primary use case!** Fork this repository to create your own portfolio website.

**License:** MIT - Use it freely for personal or commercial purposes. No attribution required (but appreciated! ⭐).

**What you'll do:**

1. Fork this repository to your GitHub account
2. Customize with your information and branding
3. Create your articles repository
4. Deploy to your own domain
5. Write and publish articles

Follow the [Quick Start](#quick-start) guide below for step-by-step instructions.

### 🤝 Contributing to ABOUTME.md

Want to make ABOUTME.md better for everyone? We welcome contributions!

**Perfect for:**

- Reporting bugs
- Suggesting features
- Submitting improvements
- Adding documentation

See the [Contributing](#contributing) section for detailed guidelines.

---

## Quick Start

### 1. Fork & Clone the Repository

**Fork this repository:**

1. Click the "Fork" button at the top right of this page
2. This creates your own copy of ABOUTME.md

**Clone your fork:**

```bash
git clone https://github.com/YOUR_USERNAME/aboutme.md.git
cd aboutme.md
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

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

### 4. Create an Articles Repository

#### Option A: Automated Setup (Recommended)

Run the setup script to automatically create and configure your articles repository:

```bash
./scripts/setup-articles-repo.sh
```

This script will:

- ✅ Create a new GitHub repository for your articles
- ✅ Initialize it with a README and `.gitignore`
- ✅ Copy the MDX reference template as your first article
- ✅ Push everything to GitHub
- ✅ Update your `.env.local` automatically

**Requirements:** GitHub CLI (`gh`) must be installed. Install it with:

```bash
# macOS
brew install gh

# Linux/Windows - see https://github.com/cli/cli#installation
```

#### Option B: Manual Setup

Create a new public GitHub repository (e.g., `articles`) manually with this structure:

```
articles/
├── my-first-article/
│   ├── metadata.json
│   ├── index.mdx
│   └── assets/           # Optional: Store images here
│       ├── diagram.png
│       └── screenshot.jpg
└── another-article/
    ├── metadata.json
    └── index.mdx
```

**Important:** Each article requires:

- A unique folder name (the article slug)
- `metadata.json` with article metadata
- `index.mdx` with article content
- `assets/` folder (optional) for storing images and other media

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

### 5. Reference the MDX Capabilities

Check the `/mdx-reference/` folder in this repository for a **complete example** of:

- Correct article structure (metadata.json + index.mdx)
- All available MDX features (markdown, math, charts, callouts)
- Chart theming and customization
- Best practices and examples

**This folder serves as a template** you can copy to your articles repository!

### 6. Update Personal Information

Edit these files with your information:

- `src/config/site.ts` - Update social links (LinkedIn, email, Twitter)
- `src/config/experience.ts` - Add your work experience
- `src/config/testimonials.ts` - Add testimonials
- `src/components/home/HeroSection.tsx` - Update bio and profile info

### 7. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🎨 Customizing Your Portfolio

Once you have the basic setup running, customize it to make it yours! Here's a complete checklist:

### ✅ Essential Customizations

**1. Personal Information** (`src/config/site.ts`)

```typescript
export const siteConfig = {
  links: {
    github: "https://github.com/YOUR_USERNAME", // ← Update
    linkedin: "https://linkedin.com/in/YOUR_PROFILE", // ← Update
    email: "mailto:your.email@example.com", // ← Update
    twitter: "https://twitter.com/YOUR_HANDLE", // ← Update or remove
  },
};
```

**2. Work Experience** (`src/config/experience.ts`)

- Replace example entries with your actual work history
- Include job titles, companies, dates, and achievements
- Add relevant technologies for each role

**3. Testimonials** (`src/config/testimonials.ts`)

- Add testimonials from colleagues or clients
- Include their name, title, and company
- Remove or comment out if you don't want this section

**4. Hero Section** (`src/components/home/HeroSection.tsx`)

- Update your bio (2-3 sentences about what you do)
- Update your name
- Change profile image path if needed

**5. Profile Picture** (`public/`)

- Add your profile picture as `public/profile.jpg` or `public/profile.png`
- Recommended size: 400x400 pixels
- Update the path in `HeroSection.tsx` if using different filename

**6. Site Metadata** (`.env.local`)

```bash
NEXT_PUBLIC_SITE_NAME=Your Full Name
NEXT_PUBLIC_SITE_DESCRIPTION=Your professional tagline
NEXT_PUBLIC_SITE_URL=https://yourdomain.com  # Update when deployed
```

### 🎯 Optional Customizations

**7. Styling & Colors** (`src/app/globals.css`)

- Customize theme colors (lines 8-20 for light mode, 40-52 for dark mode)
- Adjust chart colors (lines 72-76 for light, 106-110 for dark)
- Modify fonts, spacing, or other design tokens

**8. Home Page Layout** (`src/app/page.tsx`)

- Reorder sections
- Remove sections you don't want (Portfolio, Articles, Experience, Testimonials)
- Add custom sections

**9. Navigation** (`src/components/layout/Header.tsx`)

- Add or remove nav links
- Update logo or branding
- Customize mobile menu

**10. Footer** (`src/components/layout/Footer.tsx`)

- Update copyright information
- Add/remove social links
- Customize footer content

**11. SEO & Meta Tags** (`src/app/layout.tsx`)

- Update site title and description
- Add Open Graph image
- Customize meta tags for social sharing

### 🗑️ Removing Template Content

**Remove example data:**

```bash
# Clear example work experience
# Edit: src/config/experience.ts → export const experience: ExperienceItem[] = [];

# Clear example testimonials
# Edit: src/config/testimonials.ts → export const testimonials: Testimonial[] = [];

# Remove mdx-reference from your articles repo (after creating your first real article)
```

**Remove features you don't need:**

- Don't want a blog? Remove the Articles link from navigation
- Don't want portfolio section? Remove from home page
- Don't want testimonials? Remove the section and clear the config

### 🚀 Before Deploying

**Final checklist:**

- [ ] All personal information updated
- [ ] Profile picture added
- [ ] Work experience reflects your history
- [ ] Social links point to your profiles
- [ ] At least one article published (or remove Articles section)
- [ ] Test all pages and links
- [ ] Verify responsive design on mobile
- [ ] Check both light and dark modes
- [ ] Run `npm run build` to check for errors
- [ ] Set `NEXT_PUBLIC_SITE_URL` to your production URL

### 💡 Pro Tips

**Start Simple:** Don't try to customize everything at once. Get the basics working first, then iterate.

**Use Git:** Commit your changes regularly so you can revert if needed.

**Test Locally:** Always test changes with `npm run dev` before deploying.

**Refer to Examples:** Check `/mdx-reference/` and existing components for patterns to follow.

---

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

- **Images:** Lazy loading, responsive sizing, support for local assets
  - External URLs: `![Alt](https://example.com/image.png)`
  - Local images: `![Alt](./assets/image.png)` (stored in article's assets folder)
- **Links:** External links auto-open in new tabs with security attributes
- **Headings:** Automatic anchor links for deep linking

**Images & Assets:**
Store images in an `assets/` folder within your article directory:

```
article-slug/
├── metadata.json
├── index.mdx
└── assets/
    └── image.png
```

Reference them in your MDX with relative paths: `![Description](./assets/image.png)`

Relative paths are automatically transformed to GitHub raw URLs during compilation.

See `/mdx-reference/index.mdx` for comprehensive examples of all features!

## Configuration

### Environment Variables

| Variable                       | Description                                       | Required |
| ------------------------------ | ------------------------------------------------- | -------- |
| `NEXT_PUBLIC_GITHUB_USERNAME`  | Your GitHub username                              | Yes      |
| `GITHUB_TOKEN`                 | GitHub personal access token (needs `repo` scope) | Yes      |
| `ARTICLES_REPO_URL`            | Full URL to your articles repository              | Yes      |
| `NEXT_PUBLIC_SITE_URL`         | Your site URL                                     | Yes      |
| `NEXT_PUBLIC_SITE_NAME`        | Your name                                         | Yes      |
| `NEXT_PUBLIC_SITE_DESCRIPTION` | Site description                                  | Yes      |
| `REVALIDATION_TOKEN`           | Secret token for manual revalidation API          | No       |

### Personal Configuration Files

| File                                  | Purpose                                       |
| ------------------------------------- | --------------------------------------------- |
| `src/config/site.ts`                  | Social media links and site metadata          |
| `src/config/experience.ts`            | Work experience timeline                      |
| `src/config/testimonials.ts`          | Testimonials from colleagues                  |
| `src/components/home/HeroSection.tsx` | Hero section with bio                         |
| `public/profile.jpg`                  | Your profile picture (recommended: 400x400px) |

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

## Contributing

**ABOUTME.md** is open source and contributions are welcome! Whether you've found a bug, have a feature suggestion, or want to improve the code, your input is valued.

### For Users: Customizing Your Portfolio

If you're using ABOUTME.md for your own portfolio, you **don't need to contribute back**. This is your codebase now! Feel free to:

✅ Customize everything to your needs
✅ Remove features you don't want
✅ Add new features for your use case
✅ Keep your changes private

**Optional:** If you make improvements that might benefit others, consider contributing them back!

### For Contributors: Improving the Template

Want to make this template better for everyone? Here's how:

#### Reporting Issues

Found a bug or have a suggestion? Please [open an issue](../../issues) with:

- **Bug Reports:**
  - Description of the issue
  - Steps to reproduce
  - Expected vs actual behavior
  - Screenshots if applicable
  - Environment (OS, Node version, browser)

- **Feature Requests:**
  - Clear description of the feature
  - Use cases and benefits
  - Any implementation ideas

#### Submitting Pull Requests

1. **Fork the repository**

   ```bash
   # Click "Fork" on GitHub, then:
   git clone https://github.com/YOUR_USERNAME/portfolio-template.git
   cd portfolio-template
   ```

2. **Create a feature branch**

   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

3. **Make your changes**
   - Follow existing code style
   - Add comments for complex logic
   - Update documentation if needed
   - Test your changes locally

4. **Test thoroughly**

   ```bash
   npm run dev      # Test in development
   npm run build    # Test production build
   npm run lint     # Check for linting errors
   ```

5. **Commit with clear messages**

   ```bash
   git add .
   git commit -m "feat: add feature description"
   # or
   git commit -m "fix: fix bug description"
   ```

   Use conventional commits:
   - `feat:` - New feature
   - `fix:` - Bug fix
   - `docs:` - Documentation changes
   - `style:` - Code style changes (formatting, etc.)
   - `refactor:` - Code refactoring
   - `test:` - Adding tests
   - `chore:` - Maintenance tasks

6. **Push and create PR**
   ```bash
   git push origin feature/your-feature-name
   ```
   Then create a Pull Request on GitHub with:
   - Clear title and description
   - Reference any related issues
   - Screenshots for UI changes
   - Description of testing done

#### Development Guidelines

**Code Style:**

- Use TypeScript for type safety
- Follow existing file structure
- Use functional components with hooks
- Keep components small and focused
- Add JSDoc comments for complex functions

**Commit Guidelines:**

- Keep commits atomic (one logical change per commit)
- Write clear commit messages
- Reference issue numbers when applicable

**Testing:**

- Test in both light and dark mode
- Test responsive design (mobile, tablet, desktop)
- Verify MDX compilation works
- Check that charts render correctly
- Test with empty states (no articles, no repos)

**Documentation:**

- Update README.md for user-facing changes
- Update QUICK_REFERENCE.md for command changes
- Update `/mdx-reference/` for MDX feature changes
- Add code comments for complex logic

#### Areas We'd Love Help With

- 🐛 Bug fixes
- 📝 Documentation improvements
- ♿ Accessibility enhancements
- 🎨 UI/UX improvements
- 🚀 Performance optimizations
- 🧪 Adding tests
- 🌍 Internationalization (i18n)
- 📱 Mobile experience improvements

#### Questions?

Not sure about something? Feel free to:

- Open a discussion
- Ask in your PR
- Open an issue for clarification

Thank you for considering contributing! 🙏

## License

**ABOUTME.md** is released under the [MIT License](LICENSE).

**What this means:**

- ✅ Use it freely for personal or commercial projects
- ✅ Modify it however you want
- ✅ Distribute your modified versions
- ✅ Private use is allowed
- ❌ No warranty provided
- ❌ Liability is limited

**Attribution:** Not required, but if you find this useful, a star ⭐ or a mention would be appreciated!

## Support & Community

- 🐛 **Found a bug?** [Open an issue](../../issues)
- 💡 **Have an idea?** [Request a feature](../../issues)
- 💬 **Need help?** [Start a discussion](../../discussions)
- ⭐ **Like this project?** Give it a star on GitHub!

## Acknowledgments

Built with these amazing open-source projects:

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [shadcn/ui](https://ui.shadcn.com/) - UI component library
- [Recharts](https://recharts.org/) - Chart library
- [MDX](https://mdxjs.com/) - Markdown for the component era
- [KaTeX](https://katex.org/) - Math typesetting

---

<div align="center">

**Made with ❤️ by the open source community**

[Documentation](#documentation) · [Contributing](#contributing) · [License](LICENSE)

</div>
