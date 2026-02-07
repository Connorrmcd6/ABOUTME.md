# Quick Reference Card

## 🚀 Essential Commands

```bash
# Development
npm install              # Install dependencies
npm run dev             # Start dev server (http://localhost:3000)
npm run build           # Build for production
npm run start           # Start production server
npm run lint            # Run ESLint

# Docker
docker build -f docker/Dockerfile.pi -t portfolio .
docker run -p 3000:3000 --env-file .env portfolio
cd docker && docker-compose up -d
```

## 📝 Environment Variables (Required)

```bash
NEXT_PUBLIC_GITHUB_USERNAME=your-username
GITHUB_TOKEN=ghp_xxxxx
GITHUB_OWNER=your-username
GITHUB_REPO=articles
NEXT_PUBLIC_SITE_URL=https://yoursite.com
NEXT_PUBLIC_SITE_NAME=Your Name
NEXT_PUBLIC_SITE_DESCRIPTION=Your description
REVALIDATION_TOKEN=secret      # Optional
```

## 📂 Files to Customize

| File | What to Update |
|------|---------------|
| `src/config/site.ts` | Social links (LinkedIn, email, Twitter) |
| `src/config/experience.ts` | Work experience entries |
| `src/config/testimonials.ts` | Testimonials from colleagues |
| `src/components/home/HeroSection.tsx` | Bio and profile info |
| `public/profile.jpg` | Your profile picture (400x400px) |

## 📁 Articles Repository Structure

```
articles/
└── article-slug/
    ├── metadata.json
    └── index.mdx
```

### metadata.json

```json
{
  "title": "Article Title",
  "summary": "Brief description",
  "date": "2026-02-07",
  "tags": ["tag1", "tag2"],
  "published": true,
  "authors": [
    {
      "name": "Your Name",
      "linkedIn": "https://www.linkedin.com/in/profile/"
    }
  ]
}
```

**Important:**
- **`published`**: Set to `true` to publish (defaults to `false` - drafts by default)
- **`authors`**: Array of objects, not single `author` field
- Each author needs `name` and `linkedIn` properties
- See `/mdx-reference/` folder for complete working example

### index.mdx

Your article content using MDX. Supports:
- Full markdown (GitHub Flavored Markdown)
- Math equations: `$E = mc^2$` or `$$...$$`
- Charts: `<CustomBarChart>`, `<CustomLineChart>`, `<CustomAreaChart>`, `<CustomPieChart>`
- Callouts: `<Callout type="info|warning|error|success">`
- Code blocks with syntax highlighting

**See `/mdx-reference/index.mdx` for comprehensive examples!**

## 🔄 ISR Revalidation Times

- Articles list: **5 minutes**
- Individual articles: **5 minutes**
- Portfolio: **10 minutes**
- Repo detail: **1 hour**

After pushing new articles to GitHub, wait up to 5 minutes for them to appear.

## 🎨 Adding shadcn/ui Components

```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add badge
# See https://ui.shadcn.com for all components
```

## 🔗 Important URLs

| Path | Description |
|------|-------------|
| `/` | Home page with overview |
| `/portfolio` | All repositories |
| `/portfolio/[repo]` | Repository README |
| `/articles` | All blog articles |
| `/articles/[slug]` | Individual article |
| `/api/revalidate?secret=XXX&path=/` | Manual revalidation |

## 🎨 Chart Theme Colors

Customize in `src/app/globals.css`:

**Light mode colors:** Lines 72-76
```css
--chart-1: oklch(0.646 0.222 41.116);   /* Warm orange */
--chart-2: oklch(0.6 0.118 184.704);     /* Cool cyan */
--chart-3: oklch(0.398 0.07 227.392);    /* Deep blue */
--chart-4: oklch(0.828 0.189 84.429);    /* Bright yellow */
--chart-5: oklch(0.769 0.188 70.08);     /* Light orange */
```

**Dark mode colors:** Lines 106-110
```css
--chart-1: oklch(0.488 0.243 264.376);   /* Purple */
--chart-2: oklch(0.696 0.17 162.48);     /* Teal/green */
--chart-3: oklch(0.769 0.188 70.08);     /* Orange */
--chart-4: oklch(0.627 0.265 303.9);     /* Magenta */
--chart-5: oklch(0.645 0.246 16.439);    /* Red-orange */
```

Charts automatically cycle through these 5 colors for multiple data series.

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| "Invalid environment variables" | Create `.env.local` from `.env.local.example` |
| Articles not showing | Check repo is public, structure is correct, wait 5 min |
| Rate limit errors | Ensure `GITHUB_TOKEN` is set correctly |
| Build fails | Check all env vars are set in Vercel/Docker |
| MDX errors | Verify syntax, check `/mdx-reference/` for examples |

## 📦 Project Structure

```
src/
├── app/           # Pages (Next.js App Router)
├── components/    # React components
│   ├── ui/       # shadcn/ui components
│   ├── layout/   # Header, Footer
│   ├── home/     # Home sections
│   ├── portfolio/ # Portfolio components
│   ├── articles/ # Article components
│   └── mdx/      # MDX components (charts, callouts)
├── lib/          # Utilities and API clients
│   └── github/   # GitHub API integration
├── config/       # Configuration files
└── types/        # TypeScript types
```

## 🚢 Deployment Checklist

### Vercel
- [ ] Push code to GitHub
- [ ] Import project in Vercel
- [ ] Add all environment variables
- [ ] Deploy

### Docker
- [ ] Create `.env` file with all variables
- [ ] Build image: `docker build -f docker/Dockerfile.pi -t portfolio .`
- [ ] Run container: `docker run -p 3000:3000 --env-file .env portfolio`

### Raspberry Pi
- [ ] Install Docker
- [ ] Clone repository
- [ ] Create `.env` file
- [ ] Run: `cd docker && docker-compose up -d`

## 🔐 Getting GitHub Token

1. Go to https://github.com/settings/tokens
2. Generate new token (classic)
3. Select `repo` scope (read repository contents)
4. Copy token and add to `.env.local`

## 📊 API Rate Limits

- **With token**: 5,000 requests/hour
- **Without token**: 60 requests/hour
- **Caching**: Reduces actual API calls significantly

## 🎯 Next Steps After Setup

1. ✅ Set up environment variables
2. ✅ Create articles repository with correct structure
3. ✅ Copy `/mdx-reference/` folder as template
4. ✅ Update personal information in config files
5. ✅ Add profile picture
6. ✅ Test locally with `npm run dev`
7. ✅ Deploy to Vercel or Docker
8. ✅ Set up custom domain (optional)
9. ✅ Configure GitHub webhooks (optional)

## 📚 Documentation

- **README.md** - Complete documentation
- **QUICK_REFERENCE.md** - This file
- **/mdx-reference/** - Complete MDX example and template

## 💡 Tips

- Keep articles repository separate for easier content management
- Use `/mdx-reference/` folder as a copy-paste template
- Articles use `index.mdx` (not `article.md`)
- Metadata uses `authors` array (not single `author`)
- Test locally before deploying
- Monitor GitHub API rate limits in console
- Use webhooks for instant content updates

## 🆘 Need Help?

1. Check **README.md** for complete documentation
2. Review **/mdx-reference/index.mdx** for MDX examples
3. Search issues on GitHub
4. Open a new issue if needed

---

**Built with:** Next.js • TypeScript • Tailwind CSS • shadcn/ui • GitHub API • MDX
