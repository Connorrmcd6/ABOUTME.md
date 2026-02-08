export interface Talk {
  title: string;
  date: string; // ISO date string (YYYY-MM-DD)
  description: string;
  url?: string; // Optional: link to recording, slides, or event page
}
