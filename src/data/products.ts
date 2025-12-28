import type { Product } from "@/lib/types";
import productsJson from "@/data/products.json";

export function getProducts(): Product[] {
  return productsJson as Product[];
}

export function getProductById(id: string): Product | undefined {
  return getProducts().find((p) => p.id === id);
}


