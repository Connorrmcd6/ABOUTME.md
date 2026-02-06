import { HeroSection } from '@/components/home/HeroSection';
import { ReposPreview } from '@/components/home/ReposPreview';
import { ArticlesPreview } from '@/components/home/ArticlesPreview';
import { ExperienceTimeline } from '@/components/home/ExperienceTimeline';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { Separator } from '@/components/ui/separator';
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
    <div className="flex flex-col">
      <HeroSection />
      <Separator />

      {topRepos.length > 0 && (
        <>
          <ReposPreview repos={topRepos} />
          <Separator />
        </>
      )}

      {latestArticles.length > 0 && (
        <>
          <ArticlesPreview articles={latestArticles} />
          <Separator />
        </>
      )}

      <ExperienceTimeline />
      <Separator />

      <TestimonialsSection />
    </div>
  );
}
