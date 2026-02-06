import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, GitFork, ExternalLink } from 'lucide-react';
import type { Repository } from '@/types/repository';

interface ReposPreviewProps {
  repos: Repository[];
}

export function ReposPreview({ repos }: ReposPreviewProps) {
  return (
    <section className="container py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Featured Projects</h2>
          <p className="text-muted-foreground mt-2">
            Check out some of my recent work
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/portfolio">
            View All
            <ExternalLink className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {repos.map((repo) => (
          <Card key={repo.id} className="flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-start justify-between">
                <Link
                  href={`/portfolio/${repo.name}`}
                  className="hover:underline line-clamp-1"
                >
                  {repo.name}
                </Link>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 text-muted-foreground hover:text-foreground"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </CardTitle>
              <CardDescription className="line-clamp-2">
                {repo.description || 'No description provided'}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-between">
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4" />
                  <span>{repo.stargazers_count}</span>
                </div>
                <div className="flex items-center gap-1">
                  <GitFork className="h-4 w-4" />
                  <span>{repo.forks_count}</span>
                </div>
                {repo.language && (
                  <Badge variant="secondary">{repo.language}</Badge>
                )}
              </div>
              {repo.topics.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {repo.topics.slice(0, 3).map((topic) => (
                    <Badge key={topic} variant="outline">
                      {topic}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
