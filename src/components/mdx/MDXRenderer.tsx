'use client';

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { getMDXComponents } from './MDXComponents';
import 'katex/dist/katex.min.css';

interface MDXRendererProps {
  source: MDXRemoteSerializeResult;
}

export function MDXRenderer({ source }: MDXRendererProps) {
  const components = getMDXComponents();

  return (
    <div className="max-w-none">
      <MDXRemote {...source} components={components} />
    </div>
  );
}
