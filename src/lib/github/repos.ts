import { octokit, cachedRequest, withRetry } from './api';
import { env } from '@/lib/env';
import type { Repository, RepositoryReadme } from '@/types/repository';

/**
 * Fetch all public non-archived repositories for a user
 */
export async function getPublicRepos(username: string = env.NEXT_PUBLIC_GITHUB_USERNAME): Promise<Repository[]> {
  return cachedRequest(
    `repos:${username}`,
    async () => {
      return withRetry(async () => {
        const { data } = await octokit.repos.listForUser({
          username,
          sort: 'updated',
          per_page: 100,
        });

        // Filter out archived, forked, and private repos
        return data.filter((repo: any) => !repo.archived && !repo.fork && !repo.private) as Repository[];
      });
    },
    10 * 60 * 1000 // 10 minutes TTL
  );
}

/**
 * Fetch a specific repository
 */
export async function getRepo(owner: string, repo: string): Promise<Repository> {
  return cachedRequest(
    `repo:${owner}/${repo}`,
    async () => {
      return withRetry(async () => {
        const { data } = await octokit.repos.get({
          owner,
          repo,
        });

        return data as Repository;
      });
    },
    1 * 60 * 60 * 1000 // 1 hour TTL
  );
}

/**
 * Fetch README content for a repository
 */
export async function getRepoReadme(owner: string, repo: string): Promise<string> {
  return cachedRequest(
    `readme:${owner}/${repo}`,
    async () => {
      return withRetry(async () => {
        try {
          const { data } = await octokit.repos.getReadme({
            owner,
            repo,
          });

          // Decode base64 content
          const content = Buffer.from(data.content, 'base64').toString('utf-8');
          return content;
        } catch (error: any) {
          if (error.status === 404) {
            return '# No README found\n\nThis repository does not have a README file.';
          }
          throw error;
        }
      });
    },
    1 * 60 * 60 * 1000 // 1 hour TTL
  );
}

/**
 * Get top N repositories by stars
 */
export async function getTopRepos(count: number = 3): Promise<Repository[]> {
  const repos = await getPublicRepos();
  return repos
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, count);
}
