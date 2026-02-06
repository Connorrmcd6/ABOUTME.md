import { Metadata } from 'next';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with me',
};

export default function ContactPage() {
  // Extract email from mailto: link
  const emailAddress = siteConfig.links.email.replace('mailto:', '');
  const githubUsername = siteConfig.links.github.split('/').pop();
  const linkedinUsername = siteConfig.links.linkedin.split('/').pop();
  const twitterUsername = siteConfig.links.twitter?.split('/').pop();

  return (
    <div className="max-w-[740px] mx-auto px-5 md:px-8 py-8">
      <h1 className="text-[28px] font-extrabold mb-8">Get In Touch</h1>

      <div className="space-y-3 text-[15px]">
        {/* Email */}
        <div>
          <span className="font-medium">Email: </span>
          <a
            href={siteConfig.links.email}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {emailAddress}
          </a>
        </div>

        {/* GitHub */}
        <div>
          <span className="font-medium">GitHub: </span>
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            @{githubUsername}
          </a>
        </div>

        {/* LinkedIn */}
        <div>
          <span className="font-medium">LinkedIn: </span>
          <a
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            @{linkedinUsername}
          </a>
        </div>

        {/* Twitter (Optional) */}
        {siteConfig.links.twitter && twitterUsername && (
          <div>
            <span className="font-medium">Twitter: </span>
            <a
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              @{twitterUsername}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
