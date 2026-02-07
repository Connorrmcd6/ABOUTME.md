import { octokit } from '@/lib/github/api';
import { env } from '@/lib/env';

/**
 * Parse GitHub repo URL to extract owner and repo name
 */
function parseRepoUrl(url: string): { owner: string; repo: string } {
  const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
  if (!match) {
    throw new Error(`Invalid GitHub repo URL: ${url}`);
  }
  return { owner: match[1], repo: match[2] };
}

/**
 * Fetch chart data from an article's charts folder
 */
async function fetchChartData(articleSlug: string, chartPath: string): Promise<any> {
  const { owner, repo } = parseRepoUrl(env.ARTICLES_REPO_URL);

  try {
    const { data } = await octokit.repos.getContent({
      owner,
      repo,
      path: `${articleSlug}/${chartPath}`,
    });

    if (Array.isArray(data) || data.type !== 'file') {
      throw new Error(`Invalid chart file: ${chartPath}`);
    }

    const content = Buffer.from(data.content, 'base64').toString('utf-8');
    return JSON.parse(content);
  } catch (error: any) {
    console.error(`Failed to fetch chart data for ${articleSlug}/${chartPath}:`, error);
    throw new Error(`Chart file not found: ${chartPath}`);
  }
}

/**
 * Resolve @include directives in markdown chart blocks
 * Replaces @include statements with actual JSON data
 */
export async function resolveChartIncludes(markdown: string, articleSlug: string): Promise<string> {
  console.log('[Chart Debug] Original markdown:', markdown.substring(0, 500));

  // Match chart code blocks with @include directives
  // More flexible whitespace handling to match real markdown
  const chartBlockRegex = /```chart[\s\n]*@include\s+([^\s]+)[\s\n]*```/g;

  const matches = Array.from(markdown.matchAll(chartBlockRegex));
  console.log(`[Chart Debug] Found ${matches.length} chart includes`);

  if (matches.length === 0) {
    return markdown; // No includes to resolve
  }

  let resolvedMarkdown = markdown;

  // Process each @include directive
  for (const match of matches) {
    const fullMatch = match[0];
    const chartPath = match[1].trim();
    console.log('[Chart Debug] Processing include:', { fullMatch, chartPath });

    try {
      // Fetch the chart data
      const chartData = await fetchChartData(articleSlug, chartPath);
      console.log('[Chart Debug] Fetched chart data:', {
        chartPath,
        dataType: chartData.type,
        hasData: !!chartData.data,
        dataKeys: Object.keys(chartData)
      });

      // Validate chart data structure
      if (!chartData.type || !chartData.data) {
        throw new Error(`Invalid chart data structure in ${chartPath}: missing type or data`);
      }

      const validTypes = ['bar', 'line', 'area', 'pie'];
      if (!validTypes.includes(chartData.type)) {
        throw new Error(`Invalid chart type "${chartData.type}" in ${chartPath}. Must be one of: ${validTypes.join(', ')}`);
      }

      // Replace @include with JSON (will be detected and rendered as chart by structure)
      const replacement = `\`\`\`json\n${JSON.stringify(chartData, null, 2)}\n\`\`\``;
      console.log('[Chart Debug] Replacement string:', replacement.substring(0, 200));
      resolvedMarkdown = resolvedMarkdown.replace(fullMatch, replacement);
    } catch (error: any) {
      console.error(`[Chart Include Error] Failed to resolve ${chartPath}:`, {
        articleSlug,
        chartPath,
        error: error.message,
        status: error.status
      });
      // Replace with error message
      const errorBlock = `\`\`\`\nChart Error: Failed to load ${chartPath}\n${error.message}\n\`\`\``;
      resolvedMarkdown = resolvedMarkdown.replace(fullMatch, errorBlock);
    }
  }

  console.log('[Chart Debug] Resolved markdown:', resolvedMarkdown.substring(0, 500));
  return resolvedMarkdown;
}
