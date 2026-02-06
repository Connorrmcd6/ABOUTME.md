import { Metadata } from 'next';
import { RepoGrid } from '@/components/portfolio/RepoGrid';
import { getPublicRepos } from '@/lib/github/repos';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Browse my open source projects and repositories',
};

// ISR: Revalidate every 10 minutes
export const revalidate = 600;

export default async function PortfolioPage() {
  const repos = await getPublicRepos().catch((error) => {
    console.error('Failed to fetch repos:', error);
    return [];
  });

  return (
    <div className="max-w-[740px] mx-auto px-5 md:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-2">Portfolio</h1>
        <p className="text-xl text-muted-foreground">
          Browse my open source projects and contributions
        </p>
      </div>

      {repos.length > 0 ? (
        <RepoGrid repos={repos} />
      ) : (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">
            No public repositories found.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Check out my{' '}
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground"
            >
              GitHub profile
            </a>{' '}
            for more information.
          </p>
        </div>
      )}
    </div>
  );
}
