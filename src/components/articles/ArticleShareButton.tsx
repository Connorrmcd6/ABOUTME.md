'use client';

import { useState } from 'react';
import { Share2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ArticleShareButtonProps {
  title: string;
}

export function ArticleShareButton({ title }: ArticleShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;

    // Try to use native share API if available
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          url: url,
        });
        return;
      } catch (err) {
        // User cancelled or share failed, fall back to copy
      }
    }

    // Fallback to copying to clipboard
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleShare}
      className="shrink-0"
      aria-label="Share article"
    >
      {copied ? (
        <>
          <Check className="h-4 w-4 mr-2" />
          Copied
        </>
      ) : (
        <>
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </>
      )}
    </Button>
  );
}
