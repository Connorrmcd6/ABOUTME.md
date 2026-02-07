import type { MDXRemoteSerializeResult } from 'next-mdx-remote';

export interface Author {
  name: string;
  linkedIn: string;
}

export interface ArticleMetadata {
  title: string;
  summary: string;
  date: string;
  tags: string[];
  authors: Author[];
}

export interface Article {
  slug: string;
  metadata: ArticleMetadata;
  content: string; // Raw MDX string
  mdxSource: MDXRemoteSerializeResult; // Compiled MDX
}

export interface ArticlePreview {
  slug: string;
  metadata: ArticleMetadata;
}
