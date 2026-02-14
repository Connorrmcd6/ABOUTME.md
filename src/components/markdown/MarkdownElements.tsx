import React, { type ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/utils';

type El<T extends keyof React.JSX.IntrinsicElements> = ComponentPropsWithoutRef<T>;

export const markdownComponents = {
  h1: ({ className, ...props }: El<'h1'>) => (
    <h1 className={cn('text-4xl font-bold mt-8 mb-4 [&>a]:text-inherit', className)} {...props} />
  ),
  h2: ({ className, ...props }: El<'h2'>) => (
    <h2 className={cn('text-3xl font-bold mt-8 mb-4 [&>a]:text-inherit', className)} {...props} />
  ),
  h3: ({ className, ...props }: El<'h3'>) => (
    <h3 className={cn('text-2xl font-semibold mt-6 mb-3 [&>a]:text-inherit', className)} {...props} />
  ),
  h4: ({ className, ...props }: El<'h4'>) => (
    <h4 className={cn('text-xl font-semibold mt-4 mb-2 [&>a]:text-inherit', className)} {...props} />
  ),
  p: ({ className, ...props }: El<'p'>) => (
    <p className={cn('my-4 leading-relaxed', className)} {...props} />
  ),
  ul: ({ className, ...props }: El<'ul'>) => (
    <ul className={cn('my-4 ml-6 list-disc', className)} {...props} />
  ),
  ol: ({ className, ...props }: El<'ol'>) => (
    <ol className={cn('my-4 ml-6 list-decimal', className)} {...props} />
  ),
  li: ({ className, ...props }: El<'li'>) => (
    <li className={cn('my-2', className)} {...props} />
  ),
  a: ({ className, href, ...props }: El<'a'>) => {
    const isExternal = href?.startsWith('http');
    return (
      <a
        href={href}
        className={cn('text-primary', className)}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        {...props}
      />
    );
  },
  code: ({ className, ...props }: El<'code'>) => {
    const isBlock = className?.includes('language-') || className?.includes('hljs');
    if (isBlock) {
      return (
        <code
          className={cn('p-0 bg-transparent', className)}
          style={{ color: 'var(--foreground)' }}
          {...props}
        />
      );
    }
    return (
      <code
        className={cn('px-1.5 py-0.5 rounded bg-muted text-sm font-mono', className)}
        {...props}
      />
    );
  },
  pre: ({ className, ...props }: El<'pre'>) => (
    <pre className={cn('my-4 p-4 rounded-lg bg-muted overflow-x-auto', className)} {...props} />
  ),
  blockquote: ({ className, ...props }: El<'blockquote'>) => (
    <blockquote
      className={cn('border-l-4 border-primary pl-4 italic my-4', className)}
      {...props}
    />
  ),
  img: ({ className, ...props }: El<'img'>) => (
    <img
      className={cn('rounded-lg max-w-full h-auto', className)}
      loading="lazy"
      {...props}
    />
  ),
  strong: ({ className, ...props }: El<'strong'>) => (
    <strong className={cn('font-bold', className)} {...props} />
  ),
  em: ({ className, ...props }: El<'em'>) => (
    <em className={cn('italic', className)} {...props} />
  ),
  hr: ({ className, ...props }: El<'hr'>) => (
    <hr className={cn('my-8 border-border', className)} {...props} />
  ),
  table: ({ className, ...props }: El<'table'>) => (
    <div className="my-4 overflow-x-auto">
      <table className={cn('w-full border-collapse', className)} {...props} />
    </div>
  ),
  thead: ({ className, ...props }: El<'thead'>) => (
    <thead className={cn('border-b-2 border-border', className)} {...props} />
  ),
  tr: ({ className, ...props }: El<'tr'>) => (
    <tr className={cn('border-b border-border', className)} {...props} />
  ),
  th: ({ className, ...props }: El<'th'>) => (
    <th className={cn('px-4 py-2 text-left font-semibold', className)} {...props} />
  ),
  td: ({ className, ...props }: El<'td'>) => (
    <td className={cn('px-4 py-2', className)} {...props} />
  ),
};
