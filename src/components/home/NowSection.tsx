import { ExternalLink } from 'lucide-react';
import { nowItems } from '@/config/now';

export function NowSection() {
  if (nowItems.length === 0) return null;

  return (
    <section>
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight">What I'm Building Now</h2>
      </div>

      <div className="space-y-4">
        {nowItems.map((item, index) => (
          <div key={index} className="group">
            {item.url ? (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-base font-medium group-hover:text-primary transition-colors inline-flex items-center gap-1.5">
                      {item.title}
                      <ExternalLink className="h-3.5 w-3.5" />
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mt-1">
                      {item.description}
                    </p>
                  </div>
                  {item.category && (
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {item.category}
                    </span>
                  )}
                </div>
              </a>
            ) : (
              <div className="block">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-base font-medium">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mt-1">
                      {item.description}
                    </p>
                  </div>
                  {item.category && (
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {item.category}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
