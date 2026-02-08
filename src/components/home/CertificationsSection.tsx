import { Badge } from '@/components/ui/badge';
import { ExternalLink } from 'lucide-react';
import { format, isAfter } from 'date-fns';
import { certifications } from '@/config/certifications';

export function CertificationsSection() {
  if (certifications.length === 0) return null;

  return (
    <section>
      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight">Licenses & Certifications</h2>
      </div>

      <div className="space-y-6">
        {certifications.map((cert, index) => {
          const isExpired = cert.expiryDate && !isAfter(new Date(cert.expiryDate), new Date());
          const hasLink = !!cert.credentialUrl;

          return (
            <article key={index} className="group">
              <div className="space-y-2">
                {/* Certification Name & Link */}
                <h3 className="text-lg font-medium">
                  {hasLink ? (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group-hover:text-primary transition-colors inline-flex items-baseline gap-1.5"
                    >
                      {cert.name}
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  ) : (
                    cert.name
                  )}
                </h3>

                {/* Issuer */}
                <p className="text-sm text-muted-foreground">{cert.issuer}</p>

                {/* Dates and Status */}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm text-muted-foreground">
                  <span>Issued {format(new Date(cert.issuedDate), 'MMM yyyy')}</span>

                  {cert.expiryDate ? (
                    <>
                      <span>•</span>
                      <div className="flex items-center gap-2">
                        <span>
                          {isExpired ? 'Expired' : 'Expires'} {format(new Date(cert.expiryDate), 'MMM yyyy')}
                        </span>
                        {isExpired && (
                          <Badge variant="outline" className="text-xs px-2 py-0">
                            Expired
                          </Badge>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      <span>•</span>
                      <span>No expiration</span>
                    </>
                  )}

                  {cert.credentialId && (
                    <>
                      <span>•</span>
                      <span className="font-mono text-xs">ID: {cert.credentialId}</span>
                    </>
                  )}
                </div>
              </div>

              {/* Divider line between items (except last) */}
              {index !== certifications.length - 1 && (
                <div className="mt-6 border-t" />
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
