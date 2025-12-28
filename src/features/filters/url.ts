import type { Filters, PriceFilter } from "@/lib/types";

export function sanitizePrice(value: string | null): PriceFilter {
  if (value === "lt50" || value === "50-100" || value === "gt100" || value === "all") return value;
  return "all";
}

export function parseFilters(searchParams: URLSearchParams): Filters {
  const category = (searchParams.get("category") ?? "all").trim() || "all";
  const price = sanitizePrice(searchParams.get("price"));
  const q = (searchParams.get("q") ?? "").trim();

  return { category, price, q };
}

export function filtersToSearchParams(filters: Filters): URLSearchParams {
  const sp = new URLSearchParams();
  if (filters.category && filters.category !== "all") sp.set("category", filters.category);
  if (filters.price && filters.price !== "all") sp.set("price", filters.price);
  if (filters.q.trim().length > 0) sp.set("q", filters.q.trim());
  return sp;
}


