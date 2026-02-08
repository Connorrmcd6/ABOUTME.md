import { ExternalLink } from 'lucide-react';
import { format } from 'date-fns';
import { talks } from '@/config/talks';

export function TalksSection() {
  if (talks.length === 0) return null;

  return (
    <section>
      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight">Talks & Presentations</h2>
      </div>

      <div className="space-y-6">
        {talks.map((talk, index) => (
          <article key={index} className="group">
            {talk.url ? (
              <a
                href={talk.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="flex items-baseline justify-between gap-4 mb-1">
                  <h3 className="text-lg font-medium group-hover:text-primary transition-colors">
                    {talk.title} <ExternalLink className="inline h-3.5 w-3.5 ml-1" />
                  </h3>
                  <time className="text-sm text-muted-foreground whitespace-nowrap">
                    {format(new Date(talk.date), 'MMM d, yyyy')}
                  </time>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {talk.description}
                </p>
              </a>
            ) : (
              <div className="block">
                <div className="flex items-baseline justify-between gap-4 mb-1">
                  <h3 className="text-lg font-medium">
                    {talk.title}
                  </h3>
                  <time className="text-sm text-muted-foreground whitespace-nowrap">
                    {format(new Date(talk.date), 'MMM d, yyyy')}
                  </time>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {talk.description}
                </p>
              </div>
            )}
            {/* Divider line between items (except last) */}
            {index !== talks.length - 1 && (
              <div className="mt-6 border-t" />
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
