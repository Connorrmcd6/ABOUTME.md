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
  articleSlug?: string; // Optional: needed for @include directives
}

/**
 * Recursively extract text content from rehype-highlighted nodes
 */
function extractTextFromNode(node: any): string {
  if (!node) return '';

  if (typeof node === 'string') return node;

  if (node.type === 'text') return node.value || '';

  if (node.children && Array.isArray(node.children)) {
    return node.children.map((child: any) => extractTextFromNode(child)).join('');
  }

  return '';
}

export function MarkdownRenderer({ content, articleSlug }: MarkdownRendererProps) {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[
          [rehypeHighlight, {
            ignoreMissing: true,
            subset: false
          }],
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
          // Code block wrapper - handle charts here
          pre: ({ node, children, ...props }) => {
            // Check if this is a chart code block
            const child = node?.children?.[0];
            if (child && 'tagName' in child && child.tagName === 'code') {
              const codeChild = child as any;

              // Extract text content from all child nodes (handles rehype-highlight's span wrapping)
              const codeContent = extractTextFromNode(codeChild);

              console.log('[Chart Debug] Processing code block:', {
                contentLength: codeContent.length,
                contentPreview: codeContent.substring(0, 100)
              });

              // Try to parse as JSON and check if it's chart data
              try {
                const parsed = JSON.parse(codeContent.trim());
                console.log('[Chart Debug] Parsed JSON:', {
                  hasType: !!parsed.type,
                  type: parsed.type,
                  hasData: !!parsed.data,
                  isValidType: ['bar', 'line', 'area', 'pie'].includes(parsed.type)
                });

                // Check if this JSON has chart structure (type + data fields)
                if (parsed.type && parsed.data &&
                    ['bar', 'line', 'area', 'pie'].includes(parsed.type)) {

                  console.log('[Chart Debug] ✅ Rendering chart!');
                  return <ChartRenderer type={parsed.type} config={parsed} />;
                }
              } catch (error) {
                console.log('[Chart Debug] Not JSON or parse error:', error);
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
