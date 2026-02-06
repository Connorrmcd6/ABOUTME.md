'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import 'highlight.js/styles/github-dark.css';
import { ChartRenderer } from './ChartRenderer';

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[
          rehypeHighlight,
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: 'wrap' }],
        ]}
        components={{
          // Custom link handling - external links open in new tab
          a: ({ node, href, children, ...props }) => {
            const isExternal = href?.startsWith('http');
            return (
              <a
                href={href}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                {...props}
              >
                {children}
              </a>
            );
          },
          // Responsive images
          img: ({ node, ...props }) => (
            <img
              {...props}
              className="rounded-lg max-w-full h-auto"
              loading="lazy"
            />
          ),
          // Code block with chart support
          code: ({ node, className, children, ...props }) => {
            const match = /language-chart-(bar|line|area|pie)/.exec(className || '');
            const chartType = match ? match[1] as 'bar' | 'line' | 'area' | 'pie' : null;

            if (chartType) {
              try {
                const config = JSON.parse(String(children).trim());
                return <ChartRenderer type={chartType} config={config} />;
              } catch (error) {
                return (
                  <div className="bg-destructive/10 text-destructive p-4 rounded-lg my-4">
                    <p className="font-semibold">Chart Error</p>
                    <p className="text-sm">Failed to parse chart configuration. Check your JSON syntax.</p>
                  </div>
                );
              }
            }

            return <code className={className} {...props}>{children}</code>;
          },
          // Code block wrapper
          pre: ({ node, children, ...props }) => {
            // Check if this is a chart code block
            const child = node?.children?.[0];
            if (child && 'tagName' in child && child.tagName === 'code') {
              const codeChild = child as any;
              const className = codeChild.properties?.className?.[0];
              if (className?.startsWith('language-chart-')) {
                // Return children directly (the chart component)
                return <>{children}</>;
              }
            }

            // Regular code block
            return (
              <div className="relative group">
                <pre {...props} className="overflow-x-auto p-4 rounded-lg">
                  {children}
                </pre>
              </div>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
