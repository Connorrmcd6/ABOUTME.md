import Link from 'next/link';
import { format } from 'date-fns';
import type { ArticlePreview } from '@/types/article';

interface ArticlesPreviewProps {
  articles: ArticlePreview[];
}

export function ArticlesPreview({ articles }: ArticlesPreviewProps) {
  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold tracking-tight">Latest Articles</h2>
        <Link
          href="/articles"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          View all →
        </Link>
      </div>

      <div className="space-y-2">
        {articles.map((article) => (
          <article key={article.slug} className="group">
            <Link
              href={`/articles/${article.slug}`}
              className="block p-4 -mx-4 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-baseline justify-between gap-4 mb-1">
                <h3 className="text-lg font-medium group-hover:text-primary transition-colors">
                  {article.metadata.title}
                </h3>
                <time className="text-sm text-muted-foreground whitespace-nowrap">
                  {format(new Date(article.metadata.date), 'MMM d, yyyy')}
                </time>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {article.metadata.summary}
              </p>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
