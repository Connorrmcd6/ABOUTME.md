import { octokit, cachedRequest, withRetry } from './api';
import { env } from '@/lib/env';
import type { Article, ArticleMetadata, ArticlePreview } from '@/types/article';
import { serialize } from 'next-mdx-remote/serialize';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { notFound } from 'next/navigation';
import { remarkTransformImages } from '@/lib/remark-transform-images';

/**
 * Parse GitHub repo URL to extract owner and repo name
 */
function parseRepoUrl(url: string): { owner: string; repo: string } {
  const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
  if (!match) {
    throw new Error(`Invalid GitHub repo URL: ${url}`);
  }
  return { owner: match[1], repo: match[2] };
}

/**
 * Compile MDX content to serialized format
 */
async function compileMDX(
  content: string,
  options: { owner: string; repo: string; slug: string }
): Promise<MDXRemoteSerializeResult> {
  try {
    // Extract scope variables from export const declarations
    const scope: Record<string, any> = {};

    return await serialize(content, {
      parseFrontmatter: false, // We handle metadata separately in metadata.json
      scope, // Pass empty scope object
      mdxOptions: {
        remarkPlugins: [
          remarkGfm,
          remarkMath,
          [remarkTransformImages, { owner: options.owner, repo: options.repo, slug: options.slug }],
        ],
        rehypePlugins: [
          rehypeHighlight,
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: 'wrap' }],
          rehypeKatex,
        ],
        format: 'mdx',
      },
    });
  } catch (error: any) {
    console.error('MDX Compilation Error:', error);
    throw new Error(`Failed to compile MDX: ${error.message || error}`);
  }
}

/**
 * Fetch all articles from the articles repository
 */
export async function getArticles(): Promise<ArticlePreview[]> {
  const { owner, repo } = parseRepoUrl(env.ARTICLES_REPO_URL);

  return cachedRequest(
    `articles:list`,
    async () => {
      return withRetry(async () => {
        try {
          // Get the contents of the repository root
          const { data } = await octokit.repos.getContent({
            owner,
            repo,
            path: '',
          });

          if (!Array.isArray(data)) {
            return [];
          }

          // Filter for directories (each article is a directory)
          const articleDirs = data.filter((item: any) => item.type === 'dir');

          // Fetch metadata for each article
          const articles = await Promise.all(
            articleDirs.map(async (dir: any) => {
              try {
                const slug = dir.name;
                const metadata = await getArticleMetadata(owner, repo, slug);
                return { slug, metadata };
              } catch (error) {
                console.error(`Failed to fetch metadata for ${dir.name}:`, error);
                return null;
              }
            })
          );

          // Filter out failed fetches, unpublished articles, and sort by date (newest first)
          return articles
            .filter((article): article is ArticlePreview => article !== null)
            .filter((article) => article.metadata.published === true)
            .sort((a, b) => new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime());
        } catch (error: any) {
          if (error.status === 404) {
            console.warn('Repository not found or empty');
            return [];
          }
          throw error;
        }
      });
    },
    30 * 60 * 1000 // 30 minutes TTL
  );
}

/**
 * Fetch metadata for a specific article
 */
async function getArticleMetadata(owner: string, repo: string, slug: string): Promise<ArticleMetadata> {
  const { data } = await octokit.repos.getContent({
    owner,
    repo,
    path: `${slug}/metadata.json`,
  });

  if (Array.isArray(data) || data.type !== 'file') {
    throw new Error(`Invalid metadata file for ${slug}`);
  }

  const content = Buffer.from(data.content, 'base64').toString('utf-8');
  const metadata = JSON.parse(content);

  // Validate required fields
  if (!metadata.title || !metadata.summary || !metadata.date || !metadata.tags || !Array.isArray(metadata.authors)) {
    throw new Error(`Invalid metadata structure for ${slug}`);
  }

  // Normalize author field names (handle both 'linkedin' and 'linkedIn')
  metadata.authors = metadata.authors.map((author: any) => ({
    name: author.name,
    linkedIn: author.linkedIn || author.linkedin, // Support both formats
  }));

  return metadata;
}

/**
 * Fetch a specific article with its full content
 */
export async function getArticle(slug: string): Promise<Article> {
  const { owner, repo } = parseRepoUrl(env.ARTICLES_REPO_URL);

  return cachedRequest(
    `article:${slug}`,
    async () => {
      return withRetry(async () => {
        // Fetch metadata
        const metadata = await getArticleMetadata(owner, repo, slug);

        // Check if article is published - trigger 404 if not
        if (metadata.published !== true) {
          notFound();
        }

        // Fetch article content
        const { data } = await octokit.repos.getContent({
          owner,
          repo,
          path: `${slug}/index.mdx`,
        });

        if (Array.isArray(data) || data.type !== 'file') {
          throw new Error(`Invalid article file for ${slug}`);
        }

        const content = Buffer.from(data.content, 'base64').toString('utf-8');

        // Compile MDX with image transformation
        const mdxSource = await compileMDX(content, { owner, repo, slug });

        return {
          slug,
          metadata,
          content,
          mdxSource,
        };
      });
    },
    30 * 60 * 1000 // 30 minutes TTL
  );
}

/**
 * Get latest N articles
 */
export async function getLatestArticles(count: number = 3): Promise<ArticlePreview[]> {
  const articles = await getArticles();
  return articles.slice(0, count);
}

/**
 * Filter articles by tag
 */
export async function getArticlesByTag(tag: string): Promise<ArticlePreview[]> {
  const articles = await getArticles();
  return articles.filter((article) =>
    article.metadata.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase())
  );
}
