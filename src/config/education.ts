export interface EducationItem {
  degree: string; // e.g., "Bachelor of Science", "Master of Computer Science"
  school: string;
  schoolLogo?: string; // Optional: path to school logo (e.g., '/logos/university.png')
  location: string;
  startDate: string; // Format: YYYY-MM
  endDate: string | null; // null = currently enrolled
  fieldOfStudy: string; // e.g., "Computer Science", "Software Engineering"
  gpa?: string; // Optional: e.g., "3.8/4.0"
  description?: string[]; // Optional: achievements, honors, notable coursework
  activities?: string[]; // Optional: clubs, organizations, relevant activities
}

export const education: EducationItem[] = [
  // Example:
  {
    degree: 'Master of Science',
    school: 'University of California, Berkeley',
    schoolLogo: '/logos/berkeley.webp',
    location: 'Berkeley, CA',
    startDate: '2020-09',
    endDate: '2022-06',
    fieldOfStudy: 'Computer Science',
    gpa: '3.8/4.0',
  },
  {
    degree: 'Bachelor of Science',
    school: 'Stanford University',
    schoolLogo: '/logos/stanford.png',
    location: 'Stanford, CA',
    startDate: '2016-09',
    endDate: '2020-06',
    fieldOfStudy: 'Computer Science',
    gpa: '3.7/4.0',
  },
];
