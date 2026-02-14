import { Metadata } from 'next';
import { Mail, Github as GithubIcon, Linkedin as LinkedinIcon, Twitter as TwitterIcon } from 'lucide-react';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with me',
};

export default function ContactPage() {
  // Extract email from mailto: link
  const emailAddress = siteConfig.links.email.replace('mailto:', '');
  const githubUsername = siteConfig.links.github.split('/').pop();
  const linkedinUsername = siteConfig.name;
  const twitterUsername = siteConfig.links.twitter?.split('/').pop();

  return (
    <div className="max-w-[740px] mx-auto px-5 md:px-8 py-8">
      <h1 className="text-[28px] font-extrabold mb-8">Get In Touch</h1>

      <div className="space-y-3">
        {/* Email */}
        <a
          href={siteConfig.links.email}
          className="flex items-center gap-3 py-2 text-[15px] text-muted-foreground hover:text-foreground transition-colors group"
        >
          <Mail className="w-5 h-5 flex-shrink-0" />
          <span className="break-all">{emailAddress}</span>
        </a>

        {/* GitHub */}
        <a
          href={siteConfig.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 py-2 text-[15px] text-muted-foreground hover:text-foreground transition-colors group"
        >
          <GithubIcon className="w-5 h-5 flex-shrink-0" />
          <span>{githubUsername}</span>
        </a>

        {/* LinkedIn */}
        <a
          href={siteConfig.links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 py-2 text-[15px] text-muted-foreground hover:text-foreground transition-colors group"
        >
          <LinkedinIcon className="w-5 h-5 flex-shrink-0" />
          <span>{linkedinUsername}</span>
        </a>

        {/* Twitter (Optional) */}
        {siteConfig.links.twitter && twitterUsername && (
          <a
            href={siteConfig.links.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 py-2 text-[15px] text-muted-foreground hover:text-foreground transition-colors group"
          >
            <TwitterIcon className="w-5 h-5 flex-shrink-0" />
            <span>@{twitterUsername}</span>
          </a>
        )}
      </div>

      {/* Attribution */}
      <div className="mt-12 pt-6 border-t space-y-1">
        <p className="text-sm text-muted-foreground text-center">
          Made with{' '}
          <a
            href="https://github.com/Connorrmcd6/ABOUTME.md"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors underline decoration-dotted"
          >
            ABOUTME.md
          </a>
        </p>
        <p className="text-xs text-muted-foreground/60 text-center">
          Enjoying it?{' '}
          <a
            href='https://www.linkedin.com/in/connor-mcdonald-a770131a1/'
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors underline decoration-dotted"
          >
            Tag me on LinkedIn
          </a>
          {' '}with your portfolio!
        </p>
      </div>
    </div>
  );
}
