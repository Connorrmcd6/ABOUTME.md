import { HeroSection } from '@/components/home/HeroSection';
import { ReposPreview } from '@/components/home/ReposPreview';
import { ArticlesPreview } from '@/components/home/ArticlesPreview';
import { ExperienceTimeline } from '@/components/home/ExperienceTimeline';
import { EducationSection } from '@/components/home/EducationSection';
import { CertificationsSection } from '@/components/home/CertificationsSection';
import { TalksSection } from '@/components/home/TalksSection';
import { NowSection } from '@/components/home/NowSection';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { ConnectSection } from '@/components/home/ConnectSection';
import { getTopRepos } from '@/lib/github/repos';
import { getLatestArticles } from '@/lib/github/articles';
import { homeConfig, sectionOrder } from '@/config/home';

// ISR: Revalidate every 30 minutes
export const revalidate = 1800;

export default async function HomePage() {
  // Fetch data in parallel (only if sections are enabled)
  const [topRepos, latestArticles] = await Promise.all([
    homeConfig.repos.enabled
      ? getTopRepos(3).catch((error) => {
          console.error('Failed to fetch repos:', error);
          return [];
        })
      : Promise.resolve([]),
    homeConfig.articles.enabled
      ? getLatestArticles(Math.min(homeConfig.articles.count, 10)).catch((error) => {
          console.error('Failed to fetch articles:', error);
          return [];
        })
      : Promise.resolve([]),
  ]);

  // Map section IDs to their components
  const sections: Record<string, React.ReactNode> = {
    repos: homeConfig.repos.enabled && topRepos.length > 0 && (
      <ReposPreview repos={topRepos} />
    ),
    articles: homeConfig.articles.enabled && latestArticles.length > 0 && (
      <ArticlesPreview articles={latestArticles} />
    ),
    experience: homeConfig.experience.enabled && <ExperienceTimeline />,
    education: homeConfig.education.enabled && <EducationSection />,
    certifications: homeConfig.certifications.enabled && <CertificationsSection />,
    talks: homeConfig.talks.enabled && <TalksSection />,
    now: homeConfig.now.enabled && <NowSection />,
    testimonials: homeConfig.testimonials.enabled && <TestimonialsSection />,
    connect: homeConfig.connect.enabled && <ConnectSection />,
  };

  return (
    <div className="max-w-[740px] mx-auto px-5 md:px-8 py-8">
      <HeroSection />

      {sectionOrder.map((sectionId) => {
        const section = sections[sectionId];
        return section ? (
          <div key={sectionId} className="mt-16">
            {section}
          </div>
        ) : null;
      })}
    </div>
  );
}
