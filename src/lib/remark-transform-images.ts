import { visit } from 'unist-util-visit';
import type { Root, Image } from 'mdast';

interface TransformImagesOptions {
  owner: string;
  repo: string;
  slug: string;
  branch?: string;
}

/**
 * Remark plugin to transform relative image paths to GitHub raw URLs
 *
 * Transforms:
 *   ./assets/image.png  → https://raw.githubusercontent.com/owner/repo/main/slug/assets/image.png
 *   assets/image.png    → https://raw.githubusercontent.com/owner/repo/main/slug/assets/image.png
 */
export function remarkTransformImages(options: TransformImagesOptions) {
  const { owner, repo, slug, branch = 'main' } = options;

  return (tree: Root) => {
    visit(tree, 'image', (node: Image) => {
      const url = node.url;

      // Skip if it's already an absolute URL (http://, https://, //)
      if (/^(https?:)?\/\//i.test(url)) {
        return;
      }

      // Skip if it starts with / (absolute path)
      if (url.startsWith('/')) {
        return;
      }

      // Transform relative paths
      // Remove leading ./ if present
      const cleanPath = url.startsWith('./') ? url.slice(2) : url;

      // Build GitHub raw URL
      const githubRawUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${slug}/${cleanPath}`;

      // Update the image URL
      node.url = githubRawUrl;
    });
  };
}
