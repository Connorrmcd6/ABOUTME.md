import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { siteConfig } from '@/config/site';

export function HeroSection() {
  // TODO: Update with actual profile information
  const profileName = siteConfig.name;
  const currentRole = 'Software Engineer'; // TODO: Update with your current role
  const currentCompany = 'Google'; // TODO: Update with your current company
  const companyFavicon = '/logos/google.png'; // TODO: Update with company logo path
  const profileBio = 'Full-stack developer passionate about building elegant solutions to complex problems. Specialized in modern web technologies and cloud architecture.';
  const profileImageUrl = '/profile.png'; // TODO: Add actual profile image

  return (
    <section>
      <div className="flex items-start gap-8 md:gap-12">
        {/* Left Column - Text */}
        <div className="flex-1 space-y-3">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            {profileName}
          </h1>

          {/* Current Role */}
          <div className="flex items-center gap-2 text-sm md:text-base text-muted-foreground">
            {companyFavicon && (
              <div className="relative w-4 h-4 flex-shrink-0">
                <Image
                  src={companyFavicon}
                  alt={currentCompany}
                  fill
                  className="object-contain"
                />
              </div>
            )}
            <span>{currentRole} @ {currentCompany}</span>
          </div>

          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            {profileBio}
          </p>
        </div>

        {/* Right Column - Profile Picture */}
        <div className="flex-shrink-0">
          <Avatar className="h-24 w-24 md:h-32 md:w-32">
            <AvatarImage src={profileImageUrl} alt={profileName} />
            <AvatarFallback className="text-2xl md:text-4xl">
              {profileName.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </section>
  );
}
