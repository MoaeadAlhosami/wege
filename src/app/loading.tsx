import { ProductGridSkeleton } from "@/components/ProductGridSkeleton";

export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <div className="h-4 w-40 animate-pulse rounded bg-white/10" />
        <div className="mt-3 h-4 w-80 animate-pulse rounded bg-white/10" />
      </div>
      <ProductGridSkeleton />
    </div>
  );
}


