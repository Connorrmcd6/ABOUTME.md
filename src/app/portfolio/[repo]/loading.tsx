import { Skeleton } from '@/components/ui/skeleton';

export default function RepoLoading() {
  return (
    <div className="max-w-[740px] mx-auto px-5 md:px-8 py-8">
      {/* Back button */}
      <Skeleton className="h-10 w-40 mb-6" />

      {/* Repository header */}
      <div className="mb-8">
        <div className="flex items-start justify-between gap-4 mb-4">
          <Skeleton className="h-10 w-1/2" />
          <Skeleton className="h-10 w-40" />
        </div>

        <Skeleton className="h-6 w-full mb-4" />
        <Skeleton className="h-5 w-48 mb-4" />

        <div className="flex flex-wrap items-center gap-4">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-5 w-32" />
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-18" />
          <Skeleton className="h-6 w-22" />
        </div>
      </div>

      {/* Separator */}
      <Skeleton className="h-px w-full mb-8" />

      {/* README content */}
      <div className="space-y-4">
        <Skeleton className="h-8 w-1/2 mb-4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-full" />

        <div className="py-4">
          <Skeleton className="h-7 w-1/3 mb-3" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </div>

        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />

        <div className="py-4">
          <Skeleton className="h-7 w-1/3 mb-3" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
    </div>
  );
}
