import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import type { ArticlePreview } from '@/types/article';

interface ArticlesPreviewProps {
  articles: ArticlePreview[];
}

export function ArticlesPreview({ articles }: ArticlesPreviewProps) {
  return (
    <section className="container py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Latest Articles</h2>
          <p className="text-muted-foreground mt-2">
            Thoughts on development, technology, and more
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/articles">
            View All
            <ExternalLink className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <Card key={article.slug} className="flex flex-col">
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
                {format(new Date(article.metadata.date), 'MMM d, yyyy')}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-between">
              <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                {article.metadata.summary}
              </p>
              {article.metadata.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {article.metadata.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
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
