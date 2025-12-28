import { describe, expect, it } from "vitest";
import { createCartStore } from "@/features/cart/store";
import type { Product } from "@/lib/types";

const PRODUCT: Product = {
  id: "p1",
  title: "Test Product",
  price: 25,
  category: "Electronics",
  image: "https://placehold.co/600x400?text=Test",
  description: "Test",
};

describe("cart store", () => {
  it("adds product and increments quantity if added again", () => {
    const store = createCartStore();
    store.getState().add(PRODUCT);
    store.getState().add(PRODUCT);

    const items = store.getState().items;
    expect(items).toHaveLength(1);
    expect(items[0]?.quantity).toBe(2);
  });

  it("decrement removes item when quantity reaches 0", () => {
    const store = createCartStore();
    store.getState().add(PRODUCT);
    store.getState().decrement(PRODUCT.id);
    expect(store.getState().items).toHaveLength(0);
  });

  it("computes total price", () => {
    const store = createCartStore();
    store.getState().add(PRODUCT);
    store.getState().add(PRODUCT);
    expect(store.getState().total()).toBe(50);
  });
});


