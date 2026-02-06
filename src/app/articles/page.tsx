import { Metadata } from 'next';
import { ArticleList } from '@/components/articles/ArticleList';
import { getArticles } from '@/lib/github/articles';

export const metadata: Metadata = {
  title: 'Articles',
  description: 'Read my thoughts on development, technology, and more',
};

// ISR: Revalidate every 5 minutes
export const revalidate = 300;

export default async function ArticlesPage() {
  const articles = await getArticles().catch((error) => {
    console.error('Failed to fetch articles:', error);
    return [];
  });

  return (
    <div className="max-w-[740px] mx-auto px-5 md:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-2">Articles</h1>
        <p className="text-xl text-muted-foreground">
          Thoughts on development, technology, and everything in between
        </p>
      </div>

      {articles.length > 0 ? (
        <ArticleList articles={articles} />
      ) : (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">
            No articles published yet. Check back soon!
          </p>
        </div>
      )}
    </div>
  );
}
