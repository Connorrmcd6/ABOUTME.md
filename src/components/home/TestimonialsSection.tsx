import { Card, CardContent } from '@/components/ui/card';
import { testimonials } from '@/config/testimonials';

export function TestimonialsSection() {
  return (
    <section>
      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight">Testimonials</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col">
            <CardContent className="p-5 flex-1 flex flex-col justify-between gap-4">
              {/* Quote */}
              <p className="text-sm leading-relaxed italic text-muted-foreground">
                "{testimonial.quote}"
              </p>

              {/* Author Info - Pinned to bottom */}
              <div className="space-y-1 mt-auto">
                {testimonial.profileUrl ? (
                  <a
                    href={testimonial.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold hover:underline inline-block"
                  >
                    {testimonial.author}
                  </a>
                ) : (
                  <p className="font-semibold">{testimonial.author}</p>
                )}
                <p className="text-sm text-muted-foreground">
                  {testimonial.title}
                  {testimonial.company && ` at ${testimonial.company}`}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
