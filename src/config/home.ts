/**
 * Home page configuration
 *
 * Enable/disable sections and customize their behavior.
 * Sections are rendered in the order they appear in this config.
 */

export const homeConfig = {
  /**
   * Hero Section (Always shown)
   * Displays your name, current role, bio, and profile picture
   */
  hero: {
    enabled: true,
  },

  /**
   * Featured Repositories
   * Shows your top 3 GitHub repositories by stars
   */
  repos: {
    enabled: true,
  },

  /**
   * Latest Articles
   * Shows your most recent blog posts/articles
   */
  articles: {
    enabled: true,
    count: 3, // Number of articles to display (max: 10)
  },

  /**
   * Experience Timeline
   * Displays your work history and experience
   */
  experience: {
    enabled: true,
  },

  /**
   * Education
   * Displays your educational background
   */
  education: {
    enabled: true,
  },

  /**
   * Licenses & Certifications
   * Displays your professional credentials and certifications
   */
  certifications: {
    enabled: true,
  },

  /**
   * Talks & Presentations
   * Displays your speaking engagements and presentations
   */
  talks: {
    enabled: true,
  },

  /**
   * What I'm Building Now
   * Displays your current projects and activities
   */
  now: {
    enabled: true,
  },

  /**
   * Testimonials
   * Shows recommendations from colleagues and clients
   */
  testimonials: {
    enabled: true,
  },

  /**
   * Connect Section
   * Displays social links for visitors to connect with you recommended to put this last
   */
  connect: {
    enabled: true,
  },
} as const;

/**
 * Section order (top to bottom)
 * Reorder sections by changing the array order
 *
 * Available sections: 'repos', 'articles', 'experience', 'education', 'certifications', 'talks', 'now', 'testimonials', 'connect'
 */
export const sectionOrder = [
  'repos',
  'articles',
  'experience',
  'education',
  'certifications',
  'talks',
  'now',
  'testimonials',
  'connect',
] as const;
