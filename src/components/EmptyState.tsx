"use client";

import { Button } from "@/components/ui/Button";

export function EmptyState({ onReset }: { onReset?: () => void }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
      <div className="text-base font-semibold text-white">No results</div>
      <p className="mx-auto mt-2 max-w-md text-sm text-white/60">
        Try adjusting your category, price range, or search query.
      </p>
      {onReset && (
        <div className="mt-5 flex justify-center">
          <Button variant="secondary" onClick={onReset}>
            Reset filters
          </Button>
        </div>
      )}
    </div>
  );
}


