import { describe, expect, it } from "vitest";
import { filterProducts } from "@/lib/filterProducts";
import type { Filters, Product } from "@/lib/types";

const PRODUCTS: Product[] = [
  {
    id: "a",
    title: "Air Runner",
    price: 49,
    category: "Shoes",
    image: "https://placehold.co/600x400?text=A",
    description: "Light daily sneaker",
  },
  {
    id: "b",
    title: "Desk Speaker",
    price: 100,
    category: "Electronics",
    image: "https://placehold.co/600x400?text=B",
    description: "Compact speaker with punchy bass",
  },
  {
    id: "c",
    title: "Premium Hoodie",
    price: 150,
    category: "Shirts",
    image: "https://placehold.co/600x400?text=C",
    description: "Warm and soft",
  },
];

describe("filterProducts", () => {
  it("filters by category + price range + query", () => {
    const filters: Filters = { category: "Electronics", price: "50-100", q: "speaker" };
    const result = filterProducts(PRODUCTS, filters);
    expect(result.map((p) => p.id)).toEqual(["b"]);
  });

  it("matches < 50 correctly", () => {
    const filters: Filters = { category: "all", price: "lt50", q: "" };
    const result = filterProducts(PRODUCTS, filters);
    expect(result.map((p) => p.id)).toEqual(["a"]);
  });
});


