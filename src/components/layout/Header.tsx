import Link from 'next/link';
import { siteConfig, navItems } from '@/config/site';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-[740px] mx-auto px-5 md:px-8 flex h-16 items-center justify-between">
        {/* Left Navigation */}
        <nav className="flex items-center space-x-6">
          <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
            Home
          </Link>
          <Link href="/portfolio" className="text-sm font-medium transition-colors hover:text-primary">
            Portfolio
          </Link>
          <Link href="/articles" className="text-sm font-medium transition-colors hover:text-primary">
            Articles
          </Link>
        </nav>

        {/* Right Navigation */}
        <nav>
          <Link href="/contact" className="text-sm font-medium transition-colors hover:text-primary">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
