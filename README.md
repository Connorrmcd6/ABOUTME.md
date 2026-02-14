# ABOUTME.md

> A highly configurable, open-source portfolio template built with Next.js. Auto-syncs with GitHub, features a powerful MDX blog, and offers modular sections you can mix, match, and customize.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-15+-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue)](https://www.typescriptlang.org/)

**Built for developers, writers, and creators who want full control.**

[Quick Start](#quick-start) · [Report Bug](../../issues) · [Request Feature](../../issues)

---

## Features

- **Fully Modular** - Enable/disable sections, reorder them, or add your own
- **GitHub Auto-Sync** - Repositories and blog articles sync automatically
- **MDX Blog** - Write with markdown, embed charts, math equations, and components
- **Professional UI** - Beautiful design with dark mode and responsive layouts
- **Lightning Fast** - ISR (Incremental Static Regeneration) for optimal performance
- **Config-Driven** - Customize everything through simple config files
- **Deploy Anywhere** - Vercel, Docker, Raspberry Pi, or any Node.js host

## Philosophy

**Less is more.** This template embraces minimalism and simplicity. Choose 3-5 sections that best represent you—not all of them. A focused portfolio is more impactful than a cluttered one.

The modular architecture gives you complete control: enable what matters, disable what doesn't, and add custom sections as needed.

---

## Quick Start

### 1. Use This Template

Click the green **"Use this template"** button at the top of this repo and select **"Create a new repository"**. This gives you a clean copy with no fork link—and you can make it private from the start.

> **Only fork or clone directly if you want to [contribute](#contributing) back to this template.** For personal use, always use the template button.

```bash
git clone https://github.com/YOUR_USERNAME/your-repo-name.git
cd your-repo-name
npm install
```

### 2. Configure Environment

```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your GitHub username and [personal access token](https://github.com/settings/tokens) (needs `repo` scope):

```env
NEXT_PUBLIC_GITHUB_USERNAME=your-username
GITHUB_TOKEN=ghp_your_token
ARTICLES_REPO_URL=https://github.com/your-username/articles
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Your Name
```

### 3. Create Articles Repository

**Option A: Automated**

```bash
./scripts/setup-articles-repo.sh  # Requires GitHub CLI
```

**Option B: Manual** - Create a public repo with this structure:

```
articles/
└── my-first-article/
    ├── metadata.json
    └── index.mdx
```

### 4. Run & Customize

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) and start customizing!

---

## Configuration

### Modular Home Page

**The key differentiator.** Configure your home page sections in `src/config/home.ts`:

```typescript
export const homeConfig = {
  repos: { enabled: true },
  articles: { enabled: true, count: 3 },
  experience: { enabled: true },
  education: { enabled: false },      // Disable sections you don't need
  certifications: { enabled: false },
  talks: { enabled: false },
  now: { enabled: true },
  testimonials: { enabled: false },
  connect: { enabled: true },
}

// Reorder sections by changing array order
export const sectionOrder = [
  'repos', 'articles', 'experience', 'now', 'connect'
]
```

**Available sections:**
- All components in `src/components/home/`
- Each has its own config file (e.g., `src/config/experience.ts`, `src/config/testimonials.ts`)
- Add custom sections by creating new components and config files

**Best practice:** Choose 3-5 sections max. Keep it minimal and impactful.

### Personal Information

Edit these config files:
- `src/config/site.ts` - Social links, site metadata
- `src/config/experience.ts` - Work history
- `src/config/education.ts` - Education background
- `src/config/testimonials.ts` - Recommendations
- `src/config/certifications.ts` - Professional credentials
- `src/config/talks.ts` - Speaking engagements
- `src/config/now.ts` - Current projects
- `src/components/home/HeroSection.tsx` - Bio and intro

### Styling

#### Color Theme

This template uses [shadcn/ui](https://ui.shadcn.com/themes) theming. To change your color palette:

1. Go to [ui.shadcn.com/themes](https://ui.shadcn.com/themes)
2. Pick a theme (e.g. Blue, Green, Orange) and select **Copy code** with the `oklch` format
3. Replace the `:root` and dark mode CSS variables in `src/app/globals.css`

For example, applying the **Blue** theme:

```css
:root {
  --radius: 0.65rem;
  --background: oklch(1 0 0);
  --foreground: oklch(0.141 0.005 285.823);
  --primary: oklch(0.488 0.243 264.376);
  --primary-foreground: oklch(0.97 0.014 254.604);
  /* ... paste the rest of the variables from shadcn */
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: oklch(0.141 0.005 285.823);
    --foreground: oklch(0.985 0 0);
    --primary: oklch(0.488 0.243 264.376);
    /* ... dark mode variables */
  }
}
```

> **Note:** Only replace the `:root { ... }` and `@media (prefers-color-scheme: dark) { :root { ... } }` blocks. Leave the `@theme inline`, `@layer base`, and other sections untouched.

#### Custom Fonts

The default font is [Geist](https://vercel.com/font). You can swap it with any Google Font or your own local font files.

**Option A: Google Fonts (free)**

Edit `src/app/layout.tsx`:

```typescript
import { Inter } from "next/font/google";

const inter = Inter({
  variable: "--font-sans-var",  // Reuse the same CSS variable
  subsets: ["latin"],
});

// In the <body> tag:
<body className={`${inter.variable} antialiased`}>
```

You can use any font from [fonts.google.com](https://fonts.google.com). Just replace `Inter` with your chosen font's import name (e.g. `Roboto`, `Outfit`, `Space_Grotesk`).

**Option B: Local font files (purchased/custom)**

Place your font files in `src/app/fonts/` and use `next/font/local`:

```typescript
import localFont from "next/font/local";

const myFont = localFont({
  src: [
    { path: "./fonts/MyFont-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/MyFont-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/MyFont-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-sans-var",
});

// In the <body> tag:
<body className={`${myFont.variable} antialiased`}>
```

> **Tip:** The `--font-sans-var` CSS variable is what the entire site reads from, so swapping the font source in `layout.tsx` is the only change needed.

---

## Writing Articles

### Structure

```
articles/
└── my-article/
    ├── metadata.json  # Title, date, tags, authors
    ├── index.mdx      # Article content
    └── assets/        # Optional: images, files
```

**metadata.json:**
```json
{
  "title": "Article Title",
  "summary": "Brief description",
  "date": "2026-02-07",
  "tags": ["javascript"],
  "published": true,
  "authors": [{ "name": "Your Name", "linkedIn": "..." }]
}
```

### MDX Features

- **Markdown:** Tables, code blocks, task lists
- **Math:** Inline `$E=mc^2$` and block equations `$$...$$`
- **Charts:** `<CustomBarChart>`, `<CustomLineChart>`, `<CustomAreaChart>`, `<CustomPieChart>`
- **Callouts:** `<Callout type="info|warning|error|success">`
- **Images:** `![alt](./assets/image.png)` for local files

See `/mdx-reference/` for a complete example with all features.

---

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import in [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy

### Docker

```bash
docker build -f docker/Dockerfile.pi -t portfolio .
docker run -p 3000:3000 --env-file .env portfolio
```

Or with Docker Compose:
```bash
cd docker && docker-compose up -d
```

## How It Works

**Incremental Static Regeneration (ISR)** automatically updates content from GitHub:
- Articles sync every 5 minutes
- Repos sync every 10 minutes
- Graceful fallbacks if GitHub API is unavailable

**MDX articles** are fetched from your GitHub repo and compiled server-side with support for GFM, math equations (KaTeX), syntax highlighting, and interactive charts.

## Adding Custom Sections

1. Create a component in `src/components/home/YourSection.tsx`
2. Create a config file in `src/config/yourSection.ts`
3. Add to `src/config/home.ts`:
   ```typescript
   export const homeConfig = {
     // ... other sections
     yourSection: { enabled: true },
   }
   export const sectionOrder = [..., 'yourSection']
   ```
4. Import and render in `src/app/page.tsx`

**Add UI components:** `npx shadcn@latest add [component]` from [ui.shadcn.com](https://ui.shadcn.com)

---

## Tech Stack

Next.js 15 · TypeScript · Tailwind CSS · shadcn/ui · MDX · Recharts · KaTeX · GitHub API

---

## Contributing

**This template is designed to be used via the "Use this template" button.** You don't need to contribute back—make it your own!

**Only fork/clone this repo directly if you'd like to improve the template for everyone:**

### We Welcome

- New modular sections (education, skills, projects, etc.)
- Config improvements that make customization easier
- Bug fixes and performance improvements
- Documentation enhancements
- Accessibility improvements

### How to Contribute

1. Fork this repo
2. Create a branch: `git checkout -b feature/your-feature`
3. Make your changes (follow existing code style)
4. Test: `npm run dev && npm run build`
5. Commit: `git commit -m "feat: description"`
6. Push and open a PR

**Focus areas:**
- New home page sections that others would find useful
- Easier configuration patterns
- Better defaults and examples
- Improved modularity

[Open an issue](../../issues) to discuss ideas or report bugs.

## License & Attribution

MIT License - use freely for personal or commercial projects.

The contact page includes a small "Made with ABOUTME.md" attribution. You're free to remove it — no hard feelings. If you enjoy the template, a [star on GitHub](https://github.com/Connorrmcd6/ABOUTME.md/stargazers) goes a long way in helping others discover it.

---

**Questions?** [Open an issue](../../issues) · **Need inspiration?** Check `/mdx-reference/` for examples

Built with Next.js, Tailwind CSS, shadcn/ui, MDX, and Recharts.

