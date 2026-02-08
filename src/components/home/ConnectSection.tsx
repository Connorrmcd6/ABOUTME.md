import { Mail, Github, Linkedin, Twitter } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { Button } from '@/components/ui/button';

export function ConnectSection() {
  const socialLinks = [
    {
      name: 'Email',
      href: siteConfig.links.email,
      icon: Mail,
      show: true,
    },
    {
      name: 'GitHub',
      href: siteConfig.links.github,
      icon: Github,
      show: true,
    },
    {
      name: 'LinkedIn',
      href: siteConfig.links.linkedin,
      icon: Linkedin,
      show: true,
    },
    {
      name: 'Twitter',
      href: siteConfig.links.twitter,
      icon: Twitter,
      show: !!siteConfig.links.twitter,
    },
  ].filter(link => link.show);

  return (
    <section>
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold tracking-tight">Let's Connect</h2>
        <p className="text-muted-foreground mt-2">
          Get in touch for opportunities or just to say hi
        </p>
      </div>

      <div className="flex flex-wrap gap-3 justify-center">
        {socialLinks.map((link) => {
          const Icon = link.icon;
          return (
            <Button
              key={link.name}
              variant="outline"
              size="sm"
              asChild
              className="gap-2"
            >
              <a
                href={link.href}
                target={link.name !== 'Email' ? '_blank' : undefined}
                rel={link.name !== 'Email' ? 'noopener noreferrer' : undefined}
              >
                <Icon className="h-4 w-4" />
                {link.name}
              </a>
            </Button>
          );
        })}
      </div>
    </section>
  );
}
