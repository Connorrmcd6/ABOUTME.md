import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { experience } from '@/config/experience';
import { format } from 'date-fns';

export function ExperienceTimeline() {
  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return 'Present';
    const date = new Date(dateStr);
    return format(date, 'MMM yyyy');
  };

  return (
    <section className="container py-12">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Experience</h2>
        <p className="text-muted-foreground mt-2">
          My professional journey
        </p>
      </div>

      <div className="space-y-8">
        {experience.map((item, index) => (
          <div key={index} className="relative">
            {/* Timeline connector */}
            {index !== experience.length - 1 && (
              <div className="absolute left-4 top-12 bottom-0 w-0.5 bg-border hidden md:block" />
            )}

            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Timeline dot */}
                  <div className="hidden md:flex items-start">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                      {index + 1}
                    </div>
                  </div>

                  <div className="flex-1 space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold">{item.title}</h3>
                      <p className="text-lg text-muted-foreground">
                        {item.company} • {item.location}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(item.startDate)} - {formatDate(item.endDate)}
                      </p>
                    </div>

                    <Separator />

                    <ul className="list-disc list-inside space-y-2 text-sm">
                      {item.description.map((desc, i) => (
                        <li key={i}>{desc}</li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2">
                      {item.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
}
