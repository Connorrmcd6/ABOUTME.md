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
ARTICLES_REPO_URL=https://github.com/user/repo
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
└── 2024-01-15-post-title/
    ├── metadata.json
    └── article.md
```

### metadata.json
```json
{
  "title": "Post Title",
  "summary": "Brief description",
  "date": "2024-01-15",
  "tags": ["tag1", "tag2"],
  "author": "Your Name"
}
```

## 🔄 ISR Revalidation Times

- Home page: **5 minutes**
- Portfolio: **10 minutes**
- Articles list: **5 minutes**
- Repo detail: **1 hour**
- Article detail: **2 hours**

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

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| "Invalid environment variables" | Create `.env.local` from `.env.local.example` |
| Articles not showing | Check repo is public, structure is correct |
| Rate limit errors | Ensure `GITHUB_TOKEN` is set correctly |
| Build fails | Check all env vars are set in Vercel/Docker |

## 📦 Project Structure

```
src/
├── app/           # Pages (Next.js App Router)
├── components/    # React components
│   ├── ui/       # shadcn/ui components
│   ├── layout/   # Header, Footer
│   ├── home/     # Home sections
│   ├── portfolio/ # Portfolio components
│   └── articles/ # Article components
├── lib/          # Utilities and API clients
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
3. Select `public_repo` scope
4. Copy token and add to `.env.local`

## 📊 API Rate Limits

- **With token**: 5,000 requests/hour
- **Without token**: 60 requests/hour
- **Caching**: Reduces actual API calls significantly

## 🎯 Next Steps After Setup

1. ✅ Set up environment variables
2. ✅ Create articles repository
3. ✅ Update personal information
4. ✅ Add profile picture
5. ✅ Test locally with `npm run dev`
6. ✅ Deploy to Vercel or Docker
7. ✅ Set up custom domain (optional)
8. ✅ Configure GitHub webhooks (optional)

## 📚 Documentation

- **README.md** - Full documentation
- **SETUP.md** - Step-by-step setup guide
- **PROJECT_STATUS.md** - Implementation status
- **This file** - Quick reference

## 💡 Tips

- Keep articles repository separate for easier content management
- Use descriptive folder names for articles (YYYY-MM-DD-title)
- Commit article changes directly - ISR handles updates automatically
- Test locally before deploying
- Monitor GitHub API rate limits in console
- Use webhooks for instant content updates

## 🆘 Need Help?

1. Check **SETUP.md** for detailed instructions
2. Review **README.md** for comprehensive documentation
3. Check **PROJECT_STATUS.md** for implementation details
4. Search issues on GitHub
5. Open a new issue if needed

---

**Built with:** Next.js • TypeScript • Tailwind CSS • shadcn/ui • GitHub API
