import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { Github, Linkedin, Mail } from 'lucide-react';

export function HeroSection() {
  // TODO: Update with actual profile information
  const profileName = siteConfig.name;
  const profileBio = 'Full-stack developer passionate about building elegant solutions to complex problems. Specialized in modern web technologies and cloud architecture.';
  const profileImageUrl = '/profile.jpg'; // TODO: Add actual profile image

  return (
    <section className="container py-16 md:py-24">
      <div className="flex flex-col items-center text-center gap-8">
        <Avatar className="h-32 w-32">
          <AvatarImage src={profileImageUrl} alt={profileName} />
          <AvatarFallback className="text-4xl">
            {profileName.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>

        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
            {profileName}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {profileBio}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Button asChild>
            <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer">
              <Linkedin className="mr-2 h-4 w-4" />
              LinkedIn
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a href={siteConfig.links.email}>
              <Mail className="mr-2 h-4 w-4" />
              Contact
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
