import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from 'lucide-react';
import { format } from 'date-fns';
import type { ArticlePreview } from '@/types/article';

interface ArticleCardProps {
  article: ArticlePreview;
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Card className="flex flex-col h-full hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
      <CardHeader className="space-y-3">
        <CardTitle className="text-lg">
          <Link
            href={`/articles/${article.slug}`}
            className="hover:underline line-clamp-2"
          >
            {article.metadata.title}
          </Link>
        </CardTitle>
        <div className="flex flex-col gap-1 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="h-3 w-3" />
            {format(new Date(article.metadata.date), 'yyyy-MM-dd')}
          </div>
          {article.metadata.authors.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {article.metadata.authors.map((author, index) => (
                <span key={index}>
                  <a
                    href={author.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition-colors"
                  >
                    {author.name}
                  </a>
                  {index < article.metadata.authors.length - 1 && ', '}
                </span>
              ))}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-between gap-3">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {article.metadata.summary}
        </p>
        {article.metadata.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {article.metadata.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs px-2 py-0">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
