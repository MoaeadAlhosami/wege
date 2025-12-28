"use client";

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Category } from "@/data/categories";
import { cn } from "@/lib/cn";

export function CategorySquares({
  categories,
  onPicked,
}: {
  categories: Category[];
  onPicked?: () => void;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentCategory = (searchParams.get("category") ?? "all").trim() || "all";

  const setCategory = (category: string) => {
    const sp = new URLSearchParams(searchParams.toString());
    if (category === "all") sp.delete("category");
    else sp.set("category", category);
    const next = sp.toString();
    router.replace(next ? `${pathname}?${next}` : pathname, { scroll: false });
    onPicked?.();
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section aria-label="Categories" className="space-y-3">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-sm font-semibold tracking-tight text-white">Shop by category</h2>
          <p className="mt-1 text-sm text-white/60">Tap a tile to filter instantly.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <button
          type="button"
          onClick={() => setCategory("all")}
          className={cn(
            "group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 text-left",
            "shadow-sm shadow-black/30 transition duration-200 hover:-translate-y-0.5 hover:bg-white/7.5 hover:shadow-lg hover:shadow-black/40 motion-reduce:transform-none",
            currentCategory === "all" && "ring-2 ring-sky-400/60"
          )}
          aria-label="All categories"
        >
          <div className="text-xs font-medium text-white/70">All</div>
          <div className="mt-1 text-sm font-semibold text-white">Everything</div>
          <div className="pointer-events-none absolute -right-10 -bottom-10 h-24 w-24 rounded-full bg-white/10 blur-2xl transition group-hover:bg-white/15" />
        </button>

        {categories.map((c) => {
          const active = currentCategory === c.id;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => setCategory(c.id)}
              className={cn(
                "group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 text-left",
                "shadow-sm shadow-black/30 transition duration-200 hover:-translate-y-0.5 hover:bg-white/7.5 hover:shadow-lg hover:shadow-black/40 motion-reduce:transform-none",
                active && "ring-2 ring-sky-400/60"
              )}
              aria-label={`Category: ${c.title}`}
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-xs font-medium text-white/70">Category</div>
                  <div className="mt-1 text-sm font-semibold text-white">{c.title}</div>
                </div>
                <div className="relative h-12 w-12 overflow-hidden rounded-xl border border-white/10 bg-black/10">
                  <Image
                    src={c.image}
                    alt={`${c.title} icon`}
                    fill
                    sizes="48px"
                    className="object-cover"
                    unoptimized
                  />
                </div>
              </div>

              <div className="pointer-events-none absolute -right-12 -bottom-12 h-28 w-28 rounded-full bg-white/10 blur-2xl transition group-hover:bg-white/15" />
            </button>
          );
        })}
      </div>
    </section>
  );
}


