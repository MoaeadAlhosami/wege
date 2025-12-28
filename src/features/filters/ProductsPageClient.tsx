"use client";

import * as React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Filters, Product } from "@/lib/types";
import { filterProducts } from "@/lib/filterProducts";
import { useDebouncedValue } from "@/lib/useDebouncedValue";
import { filtersToSearchParams, parseFilters } from "@/features/filters/url";
import { ProductCard } from "@/components/ProductCard";
import { ProductGridSkeleton } from "@/components/ProductGridSkeleton";
import { EmptyState } from "@/components/EmptyState";
import { Drawer } from "@/components/ui/Drawer";
import { Button } from "@/components/ui/Button";
import { FiltersPanel } from "@/features/filters/FiltersPanel";

const DEFAULT_FILTERS: Filters = { category: "all", price: "all", q: "" };

export function ProductsPageClient({ products }: { products: Product[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [filters, setFilters] = React.useState<Filters>(() =>
    parseFilters(new URLSearchParams(searchParams?.toString()))
  );
  const [hydrated, setHydrated] = React.useState(false);
  const debouncedQ = useDebouncedValue(filters.q, 300);

  React.useEffect(() => setHydrated(true), []);

  // Sync FROM URL (back/forward etc.)
  React.useEffect(() => {
    const fromUrl = parseFilters(new URLSearchParams(searchParams?.toString()));
    setFilters((prev) => {
      const same =
        prev.category === fromUrl.category && prev.price === fromUrl.price && prev.q === fromUrl.q;
      return same ? prev : fromUrl;
    });
  }, [searchParams]);

  // Sync TO URL (debounced for q)
  React.useEffect(() => {
    const effective: Filters = { ...filters, q: debouncedQ };
    const sp = filtersToSearchParams(effective);
    const next = sp.toString();
    const current = new URLSearchParams(searchParams?.toString()).toString();
    if (next === current) return;
    const url = next.length > 0 ? `${pathname}?${next}` : pathname;
    router.replace(url, { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.category, filters.price, debouncedQ, pathname, router]);

  const derivedFilters: Filters = React.useMemo(
    () => ({ ...filters, q: debouncedQ }),
    [filters, debouncedQ]
  );

  const results = React.useMemo(() => filterProducts(products, derivedFilters), [products, derivedFilters]);

  const onReset = () => setFilters(DEFAULT_FILTERS);

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      {/* Desktop sidebar */}
      <aside className="hidden lg:block">
        <div className="sticky top-[92px] rounded-2xl border border-white/10 bg-white/5 p-5">
          <FiltersPanel products={products} filters={filters} onChange={setFilters} onReset={onReset} />
        </div>
      </aside>

      <section id="products" aria-label="Product results">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-white">Products</h1>
            <p className="mt-1 text-sm text-white/60">
              {results.length} result{results.length === 1 ? "" : "s"}
              {derivedFilters.category !== "all" ? ` · ${derivedFilters.category}` : ""}
              {derivedFilters.price !== "all" ? ` · ${derivedFilters.price}` : ""}
              {derivedFilters.q.trim().length > 0 ? ` · “${derivedFilters.q.trim()}”` : ""}
            </p>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <Button variant="secondary" onClick={() => setMobileOpen(true)}>
              Filters
            </Button>
          </div>
        </div>

        {!hydrated ? (
          <ProductGridSkeleton />
        ) : results.length === 0 ? (
          <EmptyState onReset={onReset} />
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((p) => (
              <div key={p.id} className="motion-safe:animate-[fadeUp_.22s_ease-out]">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Mobile filters bottom-sheet */}
      <Drawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        title="Filters"
        side="bottom"
      >
        <div className="p-5">
          <FiltersPanel
            products={products}
            filters={filters}
            onChange={setFilters}
            onReset={onReset}
            isMobile
          />
          <div className="mt-5">
            <Button className="w-full" onClick={() => setMobileOpen(false)}>
              Apply
            </Button>
          </div>
        </div>
      </Drawer>
    </div>
  );
}


