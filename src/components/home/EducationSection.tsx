import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { education } from '@/config/education';
import { format } from 'date-fns';

export function EducationSection() {
  if (education.length === 0) return null;

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return 'Present';
    const date = new Date(dateStr);
    return format(date, 'MMM yyyy');
  };

  return (
    <section>
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight">Education</h2>
      </div>

      <div className="space-y-8">
        {education.map((item, index) => (
          <div key={index} className="relative">
            {/* Subtle separator between items (except last) */}
            {index !== education.length - 1 && (
              <div className="absolute -bottom-4 left-0 right-0 h-px bg-border" />
            )}

            <div className="flex gap-4">
              {/* School Logo */}
              {item.schoolLogo && (
                <div className="flex-shrink-0">
                  <div className="relative w-12 h-12 rounded-md overflow-hidden bg-muted flex items-center justify-center">
                    <Image
                      src={item.schoolLogo}
                      alt={`${item.school} logo`}
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                </div>
              )}

              {/* Content */}
              <div className="flex-1 space-y-3">
                {/* Degree and School */}
                <div>
                  <h3 className="text-lg font-semibold">{item.degree}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <span>{item.school}</span>
                    <span>•</span>
                    <span>{item.location}</span>
                    <span>•</span>
                    <span>{formatDate(item.startDate)} - {formatDate(item.endDate)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <span>{item.fieldOfStudy}</span>
                    {item.gpa && (
                      <>
                        <span>•</span>
                        <span>GPA: {item.gpa}</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Description/Achievements */}
                {item.description && item.description.length > 0 && (
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    {item.description.map((desc, i) => (
                      <li key={i}>{desc}</li>
                    ))}
                  </ul>
                )}

                {/* Activities */}
                {item.activities && item.activities.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {item.activities.map((activity) => (
                      <Badge key={activity} variant="secondary" className="text-xs">
                        {activity}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
