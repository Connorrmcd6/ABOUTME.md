import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { testimonials } from '@/config/testimonials';

export function TestimonialsSection() {
  return (
    <section>
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Testimonials</h2>
        <p className="text-muted-foreground mt-2">
          What colleagues and clients say
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {testimonials.map((testimonial, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <p className="text-sm italic">"{testimonial.quote}"</p>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={testimonial.avatarUrl} alt={testimonial.author} />
                    <AvatarFallback>
                      {testimonial.author.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.title}
                      {testimonial.company && ` at ${testimonial.company}`}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
