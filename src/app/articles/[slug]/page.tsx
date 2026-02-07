import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronLeft, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArticleContent } from '@/components/articles/ArticleContent';
import { getArticle, getArticles } from '@/lib/github/articles';
import { format } from 'date-fns';

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

// ISR: Revalidate every 2 hours
export const revalidate = 7200;

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const article = await getArticle(slug);
    return {
      title: article.metadata.title,
      description: article.metadata.summary,
      authors: article.metadata.authors.map(author => ({ name: author.name })),
      openGraph: {
        type: 'article',
        title: article.metadata.title,
        description: article.metadata.summary,
        publishedTime: article.metadata.date,
        tags: article.metadata.tags,
      },
    };
  } catch (error) {
    return {
      title: 'Article Not Found',
    };
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;

  let article;
  try {
    article = await getArticle(slug);
  } catch (error: any) {
    if (error.status === 404) {
      notFound();
    }
    throw error;
  }

  return (
    <div className="max-w-[740px] mx-auto px-5 md:px-8 py-8">
      <div>
        {/* Back button */}
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/articles">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Articles
          </Link>
        </Button>

        {/* Article header */}
        <article>
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              {article.metadata.title}
            </h1>

            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {format(new Date(article.metadata.date), 'MMMM d, yyyy')}
              </div>
              {article.metadata.authors.length > 0 && (
                <span>
                  • By{' '}
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
                </span>
              )}
            </div>

            {article.metadata.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {article.metadata.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            <p className="text-lg text-muted-foreground">{article.metadata.summary}</p>
          </header>

          <Separator className="mb-8" />

          {/* Article content */}
          <ArticleContent mdxSource={article.mdxSource} />
        </article>

        <Separator className="my-12" />

        {/* Back to articles */}
        <div className="text-center">
          <Button variant="outline" asChild>
            <Link href="/articles">View All Articles</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
