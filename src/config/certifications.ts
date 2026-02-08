import type { Certification } from '@/types/certification';

/**
 * Your licenses and certifications
 *
 * Add your professional licenses, certifications, and credentials here.
 */
export const certifications: Certification[] = [
  // Example:
  {
    name: 'AWS Certified Solutions Architect - Professional',
    issuer: 'Amazon Web Services',
    issuedDate: '2023-06-15',
    expiryDate: '2026-06-15',
    credentialId: 'AWS-SAP-12345',
    credentialUrl: 'https://aws.amazon.com/verification',
  },
  {
    name: 'Professional Scrum Master I',
    issuer: 'Scrum.org',
    issuedDate: '2022-03-20',
    credentialId: 'PSM-54321',
    credentialUrl: 'https://scrum.org/certificates/54321',
  },
];
