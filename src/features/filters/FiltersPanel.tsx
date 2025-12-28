"use client";

import * as React from "react";
import type { Filters, PriceFilter, Product } from "@/lib/types";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";

const PRICE_OPTIONS: { value: PriceFilter; label: string }[] = [
  { value: "all", label: "All prices" },
  { value: "lt50", label: "< 50" },
  { value: "50-100", label: "50–100" },
  { value: "gt100", label: "> 100" },
];

function uniqueCategories(products: Product[]) {
  const set = new Set(products.map((p) => p.category));
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}

export function FiltersPanel({
  products,
  filters,
  onChange,
  onReset,
  isMobile,
}: {
  products: Product[];
  filters: Filters;
  onChange: (next: Filters) => void;
  onReset: () => void;
  isMobile?: boolean;
}) {
  const categories = React.useMemo(() => uniqueCategories(products), [products]);

  return (
    <div className="space-y-4">
      <div>
        <div className="mb-2 text-sm font-semibold tracking-tight text-white">Filters</div>
        <p className="text-xs text-white/60">
          Refine results by category, price, and search.
        </p>
      </div>

      <div className="space-y-3">
        <div>
          <div className="mb-1.5 text-xs font-medium text-white/70">Search</div>
          <Input
            value={filters.q}
            onChange={(e) => onChange({ ...filters, q: e.target.value })}
            placeholder="Search products…"
            inputMode="search"
            aria-label="Search products"
          />
          <div className="mt-1 text-[11px] text-white/45">Debounced: 300ms</div>
        </div>

        <Select
          label="Category"
          value={filters.category}
          onChange={(v) => onChange({ ...filters, category: v })}
          options={[{ value: "all", label: "All categories" }, ...categories.map((c) => ({ value: c, label: c }))]}
        />

        <Select
          label="Price"
          value={filters.price}
          onChange={(v) => onChange({ ...filters, price: v as PriceFilter })}
          options={PRICE_OPTIONS}
        />
      </div>

      <div className="flex items-center gap-2">
        <Button variant="secondary" className="flex-1" onClick={onReset}>
          Reset
        </Button>
        {isMobile ? (
          <div className="text-xs text-white/50">Apply closes drawer</div>
        ) : null}
      </div>
    </div>
  );
}


