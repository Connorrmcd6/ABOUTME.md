export interface ArticleMetadata {
  title: string;
  summary: string;
  date: string;
  tags: string[];
  author?: string;
}

export interface Article {
  slug: string;
  metadata: ArticleMetadata;
  content: string;
}

export interface ArticlePreview {
  slug: string;
  metadata: ArticleMetadata;
}
