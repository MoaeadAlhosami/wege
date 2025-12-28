import Link from "next/link";
import { cn } from "@/lib/cn";

export default function NotFound() {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center">
      <div className="text-sm font-semibold text-white/90">404</div>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white">
        Page not found
      </h1>
      <p className="mx-auto mt-3 max-w-md text-sm text-white/60">
        The page you’re looking for doesn’t exist or may have moved.
      </p>
      <div className="mt-6 flex justify-center">
        <Link
          href="/"
          className={cn(
            "inline-flex h-11 items-center justify-center rounded-xl bg-white px-4 text-sm font-medium text-black",
            "shadow-sm shadow-black/30 transition hover:bg-white/90 focus-visible:outline-none"
          )}
        >
          Back to products
        </Link>
      </div>
    </div>
  );
}


