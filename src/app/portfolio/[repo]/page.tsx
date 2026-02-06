import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronLeft, Star, GitFork, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { MarkdownRenderer } from '@/components/markdown/MarkdownRenderer';
import { getRepo, getRepoReadme } from '@/lib/github/repos';
import { env } from '@/lib/env';
import { format } from 'date-fns';

interface RepoPageProps {
  params: Promise<{
    repo: string;
  }>;
}

// ISR: Revalidate every 1 hour
export const revalidate = 3600;

export async function generateMetadata({ params }: RepoPageProps): Promise<Metadata> {
  const { repo } = await params;
  const username = env.NEXT_PUBLIC_GITHUB_USERNAME;

  try {
    const repository = await getRepo(username, repo);
    return {
      title: repository.name,
      description: repository.description || `${repository.name} repository`,
    };
  } catch (error) {
    return {
      title: 'Repository Not Found',
    };
  }
}

export default async function RepoPage({ params }: RepoPageProps) {
  const { repo } = await params;
  const username = env.NEXT_PUBLIC_GITHUB_USERNAME;

  let repository;
  let readme;

  try {
    [repository, readme] = await Promise.all([
      getRepo(username, repo),
      getRepoReadme(username, repo),
    ]);
  } catch (error: any) {
    if (error.status === 404) {
      notFound();
    }
    throw error;
  }

  return (
    <div className="max-w-[740px] mx-auto px-5 md:px-8 py-8">
      {/* Back button */}
      <Button variant="ghost" asChild className="mb-6">
        <Link href="/portfolio">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Portfolio
        </Link>
      </Button>

      {/* Repository header */}
      <div className="mb-8">
        <div className="flex items-start justify-between gap-4 mb-4">
          <h1 className="text-4xl font-bold tracking-tight">{repository.name}</h1>
          <Button asChild>
            <a href={repository.html_url} target="_blank" rel="noopener noreferrer">
              View on GitHub
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>

        {repository.description && (
          <p className="text-xl text-muted-foreground mb-4">{repository.description}</p>
        )}

        {repository.homepage && (
          <a
            href={repository.homepage}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary hover:underline mb-4 inline-block"
          >
            🔗 {repository.homepage}
          </a>
        )}

        <div className="flex flex-wrap items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4" />
            <span className="font-medium">{repository.stargazers_count}</span>
            <span className="text-muted-foreground">stars</span>
          </div>
          <div className="flex items-center gap-1">
            <GitFork className="h-4 w-4" />
            <span className="font-medium">{repository.forks_count}</span>
            <span className="text-muted-foreground">forks</span>
          </div>
          {repository.language && <Badge variant="secondary">{repository.language}</Badge>}
          <span className="text-muted-foreground">
            Updated {format(new Date(repository.updated_at), 'MMM d, yyyy')}
          </span>
        </div>

        {repository.topics.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {repository.topics.map((topic) => (
              <Badge key={topic} variant="outline">
                {topic}
              </Badge>
            ))}
          </div>
        )}
      </div>

      <Separator className="mb-8" />

      {/* README content */}
      <div className="max-w-4xl">
        <MarkdownRenderer content={readme} />
      </div>
    </div>
  );
}
