import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, GitFork, ExternalLink } from 'lucide-react';
import type { Repository } from '@/types/repository';
import { format } from 'date-fns';

interface RepoCardProps {
  repo: Repository;
}

export function RepoCard({ repo }: RepoCardProps) {
  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="flex items-start justify-between gap-2">
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
            className="text-muted-foreground hover:text-foreground shrink-0"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        </CardTitle>
        <CardDescription className="line-clamp-3 min-h-[3rem]">
          {repo.description || 'No description provided'}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-between gap-4">
        <div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4" />
              <span>{repo.stargazers_count}</span>
            </div>
            <div className="flex items-center gap-1">
              <GitFork className="h-4 w-4" />
              <span>{repo.forks_count}</span>
            </div>
          </div>
          {repo.language && (
            <div className="mb-3">
              <Badge variant="secondary">{repo.language}</Badge>
            </div>
          )}
        </div>

        {repo.topics.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {repo.topics.map((topic) => (
              <Badge key={topic} variant="outline" className="text-xs">
                {topic}
              </Badge>
            ))}
          </div>
        )}

        <div className="text-xs text-muted-foreground pt-2 border-t">
          Updated {format(new Date(repo.updated_at), 'MMM d, yyyy')}
        </div>
      </CardContent>
    </Card>
  );
}
