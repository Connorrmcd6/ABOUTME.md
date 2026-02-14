import { Skeleton } from '@/components/ui/skeleton';

export default function ArticleLoading() {
  return (
    <div className="max-w-[740px] mx-auto px-5 md:px-8 py-8">
      <article className="max-w-none">
        {/* Article header */}
        <div className="mb-8 space-y-4">
          <Skeleton className="h-12 w-3/4" />
          <div className="flex items-center gap-4 text-sm">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-40" />
          </div>
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-2/3" />
        </div>

        {/* Article content skeleton */}
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />

          <div className="py-4">
            <Skeleton className="h-8 w-1/2 mb-2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>

          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </article>
    </div>
  );
}
