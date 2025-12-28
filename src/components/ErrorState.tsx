"use client";

import { Button } from "@/components/ui/Button";

export function ErrorState({ onRetry }: { onRetry?: () => void }) {
  return (
    <div className="rounded-2xl border border-rose-400/20 bg-rose-500/10 p-8 text-center">
      <div className="text-base font-semibold text-white">Something went wrong</div>
      <p className="mx-auto mt-2 max-w-md text-sm text-white/70">
        We couldn’t load products. Please try again.
      </p>
      {onRetry && (
        <div className="mt-5 flex justify-center">
          <Button variant="secondary" onClick={onRetry}>
            Retry
          </Button>
        </div>
      )}
    </div>
  );
}


