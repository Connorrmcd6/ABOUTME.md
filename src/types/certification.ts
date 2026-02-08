export interface Certification {
  name: string;
  issuer: string;
  issuedDate: string; // ISO date string (YYYY-MM-DD)
  expiryDate?: string; // ISO date string (YYYY-MM-DD)
  credentialId?: string;
  credentialUrl?: string;
}
