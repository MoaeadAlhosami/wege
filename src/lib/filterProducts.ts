import type { Filters, Product, PriceFilter } from "@/lib/types";

function matchesPrice(price: number, priceFilter: PriceFilter) {
  if (priceFilter === "all") return true;
  if (priceFilter === "lt50") return price < 50;
  if (priceFilter === "50-100") return price >= 50 && price <= 100;
  if (priceFilter === "gt100") return price > 100;
  return true;
}

export function filterProducts(products: Product[], filters: Filters): Product[] {
  const q = filters.q.trim().toLowerCase();

  return products.filter((p) => {
    const categoryOk = filters.category === "all" ? true : p.category === filters.category;
    const priceOk = matchesPrice(p.price, filters.price);

    const queryOk =
      q.length === 0
        ? true
        : `${p.title} ${p.description} ${p.category}`.toLowerCase().includes(q);

    return categoryOk && priceOk && queryOk;
  });
}


