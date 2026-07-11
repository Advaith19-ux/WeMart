export default function ProductSkeleton() {
  return (
    <article className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm">

      {/* Image Skeleton */}
      <div className="relative aspect-square bg-gray-200 animate-pulse">

        <div className="absolute top-3 left-3 h-6 w-16 rounded-full bg-gray-300" />

        <div className="absolute top-3 right-3 h-6 w-12 rounded-full bg-gray-300" />

      </div>

      {/* Content */}
      <div className="p-5">

        {/* Category */}
        <div className="h-3 w-24 rounded bg-gray-200 animate-pulse" />

        {/* Title */}
        <div className="mt-4 space-y-2">

          <div className="h-5 w-full rounded bg-gray-200 animate-pulse" />

          <div className="h-5 w-3/4 rounded bg-gray-200 animate-pulse" />

        </div>

        {/* Description */}
        <div className="mt-4 space-y-2">

          <div className="h-3 w-full rounded bg-gray-200 animate-pulse" />

          <div className="h-3 w-full rounded bg-gray-200 animate-pulse" />

          <div className="h-3 w-2/3 rounded bg-gray-200 animate-pulse" />

        </div>

        {/* Price */}
        <div className="mt-6 flex items-center gap-3">

          <div className="h-7 w-24 rounded bg-gray-200 animate-pulse" />

          <div className="h-4 w-16 rounded bg-gray-200 animate-pulse" />

        </div>

        {/* Stock */}
        <div className="mt-4 h-4 w-24 rounded bg-gray-200 animate-pulse" />

        {/* Button */}
        <div className="mt-6 h-11 w-full rounded-xl bg-gray-200 animate-pulse" />

      </div>

    </article>
  );
}