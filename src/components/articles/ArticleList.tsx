'use client';

import { useState, useMemo } from 'react';
import { ArticleCard } from './ArticleCard';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import type { ArticlePreview } from '@/types/article';
import { Search } from 'lucide-react';

interface ArticleListProps {
  articles: ArticlePreview[];
}

export function ArticleList({ articles }: ArticleListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Get all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    articles.forEach((article) => {
      article.metadata.tags.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [articles]);

  // Filter articles
  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesSearch =
        article.metadata.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.metadata.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.metadata.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesTag = !selectedTag || article.metadata.tags.includes(selectedTag);

      return matchesSearch && matchesTag;
    });
  }, [articles, searchQuery, selectedTag]);

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search articles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Tag filters */}
      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <Badge
            variant={selectedTag === null ? 'default' : 'outline'}
            className="cursor-pointer"
            onClick={() => setSelectedTag(null)}
          >
            All
          </Badge>
          {allTags.map((tag) => (
            <Badge
              key={tag}
              variant={selectedTag === tag ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => setSelectedTag(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
      )}

      {/* Results count */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredArticles.length} {filteredArticles.length === 1 ? 'article' : 'articles'}
      </div>

      {/* Articles grid */}
      {filteredArticles.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No articles found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
