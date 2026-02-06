import { HeroSection } from '@/components/home/HeroSection';
import { ReposPreview } from '@/components/home/ReposPreview';
import { ArticlesPreview } from '@/components/home/ArticlesPreview';
import { ExperienceTimeline } from '@/components/home/ExperienceTimeline';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { getTopRepos } from '@/lib/github/repos';
import { getLatestArticles } from '@/lib/github/articles';

// ISR: Revalidate every 5 minutes
export const revalidate = 300;

export default async function HomePage() {
  // Fetch data in parallel
  const [topRepos, latestArticles] = await Promise.all([
    getTopRepos(3).catch((error) => {
      console.error('Failed to fetch repos:', error);
      return [];
    }),
    getLatestArticles(3).catch((error) => {
      console.error('Failed to fetch articles:', error);
      return [];
    }),
  ]);

  return (
    <div className="max-w-[740px] mx-auto px-5 md:px-8 py-8">
      <HeroSection />

      {topRepos.length > 0 && (
        <div className="mt-16">
          <ReposPreview repos={topRepos} />
        </div>
      )}

      {latestArticles.length > 0 && (
        <div className="mt-16">
          <ArticlesPreview articles={latestArticles} />
        </div>
      )}

      <div className="mt-16">
        <ExperienceTimeline />
      </div>

      <div className="mt-16">
        <TestimonialsSection />
      </div>
    </div>
  );
}
