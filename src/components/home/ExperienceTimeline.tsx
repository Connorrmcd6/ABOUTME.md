import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { experience } from '@/config/experience';
import { format } from 'date-fns';

export function ExperienceTimeline() {
  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return 'Present';
    const date = new Date(dateStr);
    return format(date, 'MMM yyyy');
  };

  return (
    <section>
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight">Experience</h2>
      </div>

      <div className="space-y-8">
        {experience.map((item, index) => (
          <div key={index} className="relative">
            {/* Subtle separator between items (except last) */}
            {index !== experience.length - 1 && (
              <div className="absolute -bottom-4 left-0 right-0 h-px bg-border" />
            )}

            <div className="flex gap-4">
              {/* Company Logo */}
              {item.companyLogo && (
                <div className="flex-shrink-0">
                  <div className="relative w-12 h-12 rounded-md overflow-hidden bg-muted flex items-center justify-center">
                    <Image
                      src={item.companyLogo}
                      alt={`${item.company} logo`}
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                </div>
              )}

              {/* Content */}
              <div className="flex-1 space-y-3">
                {/* Role and Company */}
                <div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <span>{item.company}</span>
                    <span>•</span>
                    <span>{item.location}</span>
                    <span>•</span>
                    <span>{formatDate(item.startDate)} - {formatDate(item.endDate)}</span>
                  </div>
                </div>

                {/* Description */}
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  {item.description.map((desc, i) => (
                    <li key={i}>{desc}</li>
                  ))}
                </ul>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {item.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
