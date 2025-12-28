import { ProductGridSkeleton } from "@/components/ProductGridSkeleton";

export default function Loading() {
  return (
    <div className="space-y-4">
      <div className="h-6 w-48 animate-pulse rounded bg-white/10" />
      <ProductGridSkeleton count={3} />
    </div>
  );
}


