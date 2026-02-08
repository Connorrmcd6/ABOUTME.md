import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, GitFork, ExternalLink } from 'lucide-react';
import type { Repository } from '@/types/repository';
import { format } from 'date-fns';

const languageColors: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  Java: '#b07219',
  Go: '#00ADD8',
  Rust: '#dea584',
  Ruby: '#701516',
  PHP: '#4F5D95',
  C: '#555555',
  'C++': '#f34b7d',
  'C#': '#178600',
  Swift: '#ffac45',
  Kotlin: '#A97BFF',
  Dart: '#00B4AB',
  Shell: '#89e051',
  HTML: '#e34c26',
  CSS: '#563d7c',
  SCSS: '#c6538c',
  Vue: '#41b883',
  MDX: '#fcb32c',
};

interface RepoCardProps {
  repo: Repository;
}

export function RepoCard({ repo }: RepoCardProps) {
  const languageColor = repo.language ? languageColors[repo.language] || '#8b949e' : '#8b949e';

  return (
    <Card className="flex flex-col h-full hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
      <CardHeader className="space-y-3">
        <CardTitle className="text-lg flex items-start justify-between gap-2">
          <Link
            href={`/portfolio/${repo.name}`}
            className="hover:underline line-clamp-2"
          >
            {repo.name}
          </Link>
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground shrink-0 mt-0.5"
            aria-label="View on GitHub"
          >
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </CardTitle>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3" />
            <span>{repo.stargazers_count}</span>
          </div>
          <div className="flex items-center gap-1">
            <GitFork className="h-3 w-3" />
            <span>{repo.forks_count}</span>
          </div>
          {repo.language && (
            <div className="flex items-center gap-1.5">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: languageColor }}
                aria-hidden="true"
              />
              <span>{repo.language}</span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-between gap-3">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {repo.description || 'No description provided'}
        </p>
        {repo.topics.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {repo.topics.slice(0, 3).map((topic) => (
              <Badge key={topic} variant="secondary" className="text-xs px-2 py-0">
                {topic}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
