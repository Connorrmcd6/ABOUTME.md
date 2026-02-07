import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from 'lucide-react';
import { format } from 'date-fns';
import type { ArticlePreview } from '@/types/article';

interface ArticleCardProps {
  article: ArticlePreview;
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle>
          <Link
            href={`/articles/${article.slug}`}
            className="hover:underline line-clamp-2"
          >
            {article.metadata.title}
          </Link>
        </CardTitle>
        <CardDescription className="flex items-center gap-2 text-sm">
          <Calendar className="h-4 w-4" />
          {format(new Date(article.metadata.date), 'MMMM d, yyyy')}
          {article.metadata.authors[0] && (
            <>
              {' • '}
              <a
                href={article.metadata.authors[0].linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                {article.metadata.authors[0].name}
              </a>
            </>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-between gap-4">
        <p className="text-sm text-muted-foreground line-clamp-4">
          {article.metadata.summary}
        </p>
        {article.metadata.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {article.metadata.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
