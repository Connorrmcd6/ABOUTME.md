'use client';

import dynamic from 'next/dynamic';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';

// Dynamically import MDXRenderer with no SSR
const MDXRenderer = dynamic(
  () => import('@/components/mdx/MDXRenderer').then(mod => ({ default: mod.MDXRenderer })),
  {
    ssr: false,
    loading: () => (
      <div>
        <div className="flex items-center justify-center p-8">
          <div className="animate-pulse text-muted-foreground">Loading article content...</div>
        </div>
      </div>
    )
  }
);

interface ArticleContentProps {
  mdxSource: MDXRemoteSerializeResult;
}

export function ArticleContent({ mdxSource }: ArticleContentProps) {
  return (
    <div>
      <MDXRenderer source={mdxSource} />
    </div>
  );
}
