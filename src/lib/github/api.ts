import { Octokit } from '@octokit/rest';
import { env } from '@/lib/env';

// Initialize Octokit with authentication
export const octokit = new Octokit({
  auth: env.GITHUB_TOKEN,
});

// Simple in-memory cache with TTL
interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

class MemoryCache {
  private cache: Map<string, CacheEntry<any>> = new Map();
  private defaultTTL = 30 * 60 * 1000; // 30 minutes

  get<T>(key: string, ttl?: number): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    const maxAge = ttl || this.defaultTTL;
    const age = Date.now() - entry.timestamp;

    if (age > maxAge) {
      this.cache.delete(key);
      return null;
    }

    return entry.data as T;
  }

  set<T>(key: string, data: T): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    });
  }

  clear(): void {
    this.cache.clear();
  }
}

export const cache = new MemoryCache();

// Request deduplication map
const pendingRequests = new Map<string, Promise<any>>();

/**
 * Cached API request wrapper with deduplication
 */
export async function cachedRequest<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttl?: number
): Promise<T> {
  // Check cache first
  const cached = cache.get<T>(key, ttl);
  if (cached) {
    return cached;
  }

  // Check if request is already pending
  if (pendingRequests.has(key)) {
    return pendingRequests.get(key) as Promise<T>;
  }

  // Make the request
  const promise = fetcher()
    .then((data) => {
      cache.set(key, data);
      pendingRequests.delete(key);
      return data;
    })
    .catch((error) => {
      pendingRequests.delete(key);
      // Return cached data if available (stale data is better than no data)
      const staleData = cache.get<T>(key, Infinity);
      if (staleData) {
        console.warn(`API error, returning stale data for ${key}:`, error.message);
        return staleData;
      }
      throw error;
    });

  pendingRequests.set(key, promise);
  return promise;
}

/**
 * Handle rate limiting with exponential backoff
 */
export async function withRetry<T>(
  fn: () => Promise<T>,
  maxRetries = 3,
  baseDelay = 1000
): Promise<T> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error: any) {
      lastError = error;

      // Check if it's a rate limit error
      if (error.status === 403 && error.message?.includes('rate limit')) {
        const delay = baseDelay * Math.pow(2, attempt);
        console.warn(`Rate limit hit, retrying in ${delay}ms...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
        continue;
      }

      // For other errors, throw immediately
      throw error;
    }
  }

  throw lastError || new Error('Max retries exceeded');
}
